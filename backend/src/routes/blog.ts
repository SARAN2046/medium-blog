import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { verify } from 'hono/jwt';
import { createPostInput, updatePostInput } from '../zod';

export const blogRouter = new Hono<{
  Bindings: {
    JWT_SECRET: string;
    DATABASE_URL: string;
  };
  Variables: { userId: string };
}>();

blogRouter.use('*', async (c, next) => {
  const header = c.req.header('Authorization') || '';
  if (!header) {
    c.status(401);
    return c.json({ error: 'unauthorized' });
  }
  try {
    const token = header.split(' ')[1];
    const response = (await verify(token, c.env.JWT_SECRET)) as { id: string };
    if (!response) {
      return c.json({ error: 'token failed' }, 401);
    }

    c.set('userId', response.id);
    await next();
  } catch (e) {
    return c.json({ error: 'user verification failed' });
  }
});

blogRouter.post('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = createPostInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: 'invalid input' });
  }
  const userId = c.get('userId');

  try {
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        published: true,
        authorId: userId,
      },
    });
    return c.json({ message: 'created a new post', id: post.id });
  } catch (e) {
    return c.json({ error: e + ' error while creating post' });
  }
});

blogRouter.put('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = updatePostInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: 'invalid input' });
  }

  const userId = c.get('userId');

  try {
    const post = await prisma.post.update({
      where: {
        id: body.id,
        authorId: userId,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return c.text('post Updated');
  } catch (e) {
    return c.json({ error: e + ' error while updating post' });
  }
});

blogRouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const post = await prisma.post.findMany({
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return c.json({ message: 'received all posts', post: post });
  } catch (e) {
    return c.json({ error: e + ' error while fetching all posts' });
  }
});

blogRouter.get('/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param('id');

  try {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
      select: {
        title: true,
        content: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return c.json({ message: 'received the post', post: post });
  } catch (e) {
    return c.json({ error: e + ' error while fetching post' }, 403);
  }
});
