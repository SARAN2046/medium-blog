import { Link, useNavigate } from "react-router-dom"
import InputLabel from "./InputLabel"
import { useState } from "react"
import type { SignupType } from "../zod"
import axios from "axios"
import { backendUrl } from "../config"

const Auth = ({type}:{type:"signup" | "signin"}) => {
  const navigate= useNavigate()
  const [postInput,setPostInput]= useState<SignupType>({
    name:"",
    email:"",
    password:""
  })
  async function sendRequest() {
    try{
      const payload =
      type === "signup"
        ? postInput
        : { email: postInput.email, password: postInput.password };
    const response= await axios.post(`${backendUrl}/api/v1/user/${type}`,payload)
      const token= response.data.token 
      localStorage.setItem("token",token)
      navigate("/blogs")
    }catch(e){
      console.log(postInput)
      console.log("error is : ",e)}
  }
  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex flex-col justify-center items-center ">
        <div className="w-2/4">
          <div className="text-3xl font-bold">
          {type === "signup"? "Create an account": "Signin"}
        </div>
        <div className="text-sm font-light text-slate-500 under">
          {type === "signup" ? <>Already have an account? <Link to={"/signin"} className="underline">Signin</Link></>: <>Don't have an account? <Link to={"/signup"} className="underline">Sign Up</Link></>}
           
        </div>
        <div>
          {type==="signup" && <InputLabel label="Username" placeholder="Enter your Username" type="" name="name" onChange={(e)=>{setPostInput({...postInput,[e.target.name]:e.target.value})}}/>}
          <InputLabel label="Email" placeholder="Enter your Email" type="" name="email" onChange={(e)=>{setPostInput({...postInput,[e.target.name]:e.target.value})}}/>
          <InputLabel label="Password" placeholder="Enter your Password" type="password" name="password" onChange={(e)=>{setPostInput({...postInput,[e.target.name]:e.target.value})}}/>
        </div>
        <button onClick={sendRequest} type="button" className="text-white mt-4 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full">{type === "signup" ? "Sign up": "Sign in"}</button>
        </div>
      </div>
    </div>
  )
}

export default Auth