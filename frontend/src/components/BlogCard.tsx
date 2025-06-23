import { Link } from "react-router-dom";
import Avatar from "./Avatar";

interface BlogCardProps {
    id:string
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}
const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
  return (
    <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
           <Link to={`/blog/${id}`}>
            <div className="flex ">
                <Avatar name={authorName} />
                <div className="font-extralight pl-2 text-sm flex justify-center flex-col">{authorName}</div>
                <div className="text-xs px-1 flex justify-center flex-col">&#9679;</div>
                <div className="font-thin text-slate-500 text-sm flex justify-center flex-col">
                    {publishedDate}
                </div>
            </div>
            <div className="text-xl font-semibold pt-2">
                {title}
            </div>
            <div className="text-md font-thin">
                {content.slice(0, 200) + "..."}
            </div>
            <div className="text-slate-500 text-sm font-thin pt-4">
                {`${Math.ceil(content.length / 100)} minute(s) read`}
            </div></Link>
        </div>
  )
}

export default BlogCard