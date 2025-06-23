import type { ChangeEvent } from "react";

  interface inputlabeltype{
    label : string
    name: string
    placeholder: string
    type?:string 
    onChange: (event: ChangeEvent<HTMLInputElement>)=> void
  }
const InputLabel = ({label,placeholder,type, name,onChange}:inputlabeltype) => {

  return (
    <div>
        <label className="block mb-2 text-left pl-2 text-sm text-black font-semibold pt-4">{label}</label>
        <input onChange={onChange} type={type || "text"} name={name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-600 block w-full p-2.5 outline-none" placeholder={placeholder} required />
    </div>
  )
}

export default InputLabel