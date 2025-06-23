import type { BlogType } from "../hooks/hook";
import Avatar from "./Avatar";

const SingleBlog = ({blog}:{blog:BlogType}) => {
  console.log(blog)
  return (
   <div>
     <div className="grid grid-cols-12 w-full px-10 pt-10 items-start">
      <div className='col-span-8 p-2' >
        <div className='text-4xl font-extrabold'>
          {blog.title}
        </div>
        <div className="text-slate-500 pt-2">
            Post on 2nd December 2023
        </div>
        <div className="pt-4">
            {blog.content}
        </div>
      </div>
      <div className='col-span-4 p-2' >
        <div className="text-slate-600 text-md mb-2">
            Author
        </div>
        <div className="flex w-full">
            <div className="pr-4 flex flex-col">
                <Avatar name={blog.author.name || "Anonymous"} />
            </div>
            <div>
                <div className="text-xl font-bold">
                    {blog.author.name || "Anonymous"}
                </div>
                <div className="pt-2 text-slate-500">
                    Random catch phrase about the author's ability to grab the user's attention
                </div>
            </div>
        </div> 
      </div>
    </div>
   </div>
  );
};

export default SingleBlog;