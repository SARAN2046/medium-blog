import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Blog from "./pages/Blog"
import Blogs from "./pages/Blogs"
import Publish from "./pages/Publish"
import GetStarted from "./pages/GetStarted"

const App = () => {
  const appRouter= createBrowserRouter([
   {
      path:"/",
      element:<GetStarted/>
    },
    {
      path:"/signin",
      element:<Signin/>
    },
    {
      path:"/signup",
      element:<Signup/>
    },
    {
      path:"/blogs",
      element:<Blogs/>
    },
    {
      path:"/blog/:id",
      element:<Blog/>
    },
    {
      path:"/publish",
      element:<Publish/>
    }
  ])
  return (
    <RouterProvider router={appRouter}/>
  )
}

export default App