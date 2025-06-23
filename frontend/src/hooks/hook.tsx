import axios from "axios"
import { useEffect, useState } from "react"
import { backendUrl } from "../config"

export interface BlogType {
    author: {
      name:string
    }
    id:string;
    title: string;
    content: string;
}

export const useBlogs = () => {
  const [loading,setLoading]= useState(true)
  const [blogs,setBlogs]= useState<BlogType[]>([])
  useEffect(()=>{
   axios.get(`${backendUrl}/api/v1/blog/bulk`,{
      headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then((response)=>{
      setBlogs(response.data.post)
      setLoading(false)
    }).catch((e)=>console.log(e))
  },[])
  return {
    loading,
    blogs
}
}

export const useBlogsId = ({ id }: { id: string} ) => {
  const [loading,setLoading]= useState(true)
  const [blog,setBlog]= useState<BlogType>()
  useEffect(()=>{
   axios.get(`${backendUrl}/api/v1/blog/${id}`,{
      headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then((response)=>{
      setBlog(response.data.post)
      setLoading(false)
    }).catch((e)=>console.log(e))
  },[id])
  return {
    loading,
    blog
}
}
