import Auth from "../components/Auth"
import { Quote } from "../components/Qoute"

const Signup = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2" >
      <div className="text-center">
        <Auth type="signup" />
      </div>
      <div className="invisible lg:visible">
        <Quote/>
      </div>
    </div>
  )
}

export default Signup