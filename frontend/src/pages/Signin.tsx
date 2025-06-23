import Auth from "../components/Auth"
import { Quote } from "../components/Qoute"

const Signin = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2" >
      <div className="text-center">
        <Auth type="signin" />
      </div>
      <div className="hidden lg:block">
        <Quote/>
      </div>
    </div>
  )
}

export default Signin