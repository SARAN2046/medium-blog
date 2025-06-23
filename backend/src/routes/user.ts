import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "../zod";

export const userRouter = new Hono<{
  Bindings: {
    JWT_SECRET: string;
    DATABASE_URL: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "invalid input" });
  }
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: body.password,
      },
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ token: token });
  } catch (e) {
    return c.json({ error: "error while signing up :" + e }, 403);
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "invalid input" });
  }
  try {
    const user = await prisma.user.findUnique({ where: { email: body.email } });
    if (!user) {
      return c.json({ message: "user not found" });
    }
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ message: "user signedin", token });
  } catch (e) {
    return c.json({ error: "error while sign in" }, 400);
  }
});
