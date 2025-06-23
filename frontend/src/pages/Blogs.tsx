import Appbar from "../components/Appbar";
import BlogCard from "../components/BlogCard";
import { Skeleton } from "../components/Skeleton";
import { useBlogs } from "../hooks/hook";

const Blogs = () => {
  const{loading,blogs}=useBlogs()

  if(loading){
    return  <div className="flex flex-col justify-center items-center pt-10">
              <Skeleton/>
              <Skeleton/>
              <Skeleton/>
              <Skeleton/>
              <Skeleton/>
            </div>
  }
  return <div>
              <Appbar/>
              <div className="flex flex-col justify-center items-center">
                {blogs.map((x)=>(
                  <BlogCard key={x.id} id={x.id} authorName= {x.author.name}
                  title= {x.title}
                  content= {x.content}
                  publishedDate="june 9 2020" />
                ))}
                
              </div>
          </div>
};

export default Blogs;
