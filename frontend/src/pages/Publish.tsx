import { useState } from "react";
import { backendUrl } from "../config";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Appbar from "../components/Appbar";
import { TextEditor } from "../components/TextEditor";

const Publish = () => {
  const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
  return (
    <div>
      <Appbar/>
              <div className="flex justify-center w-full pt-8"> 
            <div className="max-w-screen-lg w-full">
                <input onChange={(e) => {
                    setTitle(e.target.value)
                }} type="text" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" placeholder="Title" />

                <TextEditor onChange={(e) => {
                    setDescription(e.target.value)
                }} />
                <button onClick={async () => {
                    const response = await axios.post(`${backendUrl}/api/v1/blog`, {
                        title,
                        content: description
                    }, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    });
                    navigate(`/blog/${response.data.id}`)
                }} type="submit" className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-green-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                    Publish post
                </button>
            </div>
        </div>
    </div>
  )
}

export default Publish

