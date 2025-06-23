import { useParams } from "react-router-dom";
import Appbar from "../components/Appbar";
import { useBlogsId } from "../hooks/hook";
import SingleBlog from "../components/SingleBlog";
import { Skeleton } from "../components/Skeleton";

const Blog = () => {
    const {id}= useParams()
  const{loading, blog}= useBlogsId({ id: id || "" })

  if(loading || !blog){
    return <div className="grid grid-cols-12 w-full px-10 pt-10 items-start">
              <div className='col-span-8 p-2'>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
              </div>
              <div className='col-span-4 p-2'>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
              </div>
            </div>
    
  }
  return <div>
            <Appbar/>
            <SingleBlog blog={blog}  />
          </div>
};

export default Blog;
