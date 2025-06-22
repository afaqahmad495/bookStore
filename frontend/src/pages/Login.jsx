import React,{useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {authActions} from "../Store/Auth"
import {useDispatch} from "react-redux"



const Login = () => {
  const [Value, setValue] = useState({
      username: "",
      password: "",
      
    })
    const change = (e)=>{
      const {name, value} = e.target;
      setValue({...Value, [name]: value})
    }
  
    const handleSubmit = (e) => {
      e.preventDefault(); // page reload se rokta hai
      console.log("Form submitted");
    };
    const dispatch = useDispatch()
    const navigate = useNavigate()
  
    const submit = async ()=>{
      try{
        if(Value.username === "" ||
           Value.password === ""
          ) 
             {
              alert("All fields are required");
             }else{
              const response = await axios.post("http://localhost:3000/api/v1/sign-in", Value)
              // console.log(response.data)
              dispatch(authActions.login())
              dispatch(authActions.changeRole(response.data.roll))
              localStorage.setItem("id",response.data.id )
              localStorage.setItem("token",response.data.token )
              localStorage.setItem("roll",response.data.roll )
              navigate("/profile")
  
             }
  
      }catch (error){
        alert("Invalid user ")
      }
    }
  return (
   <>
    <div className="flex items-center justify-center min-h-screen bg-zinc-900">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-800 p-6 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {/* {message && (
          <div className="mb-4 text-center text-sm text-green-600">{message}</div>
        )} */}

        <div className="mb-4">
          <label className="block text-gray-600 mb-1">username</label>
          <input
            type="text"
            name="username"
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter email"
            value={Value.email}
            onChange={change}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Password</label>
          <input
            type="password"
            name="password"
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter password"
            value={Value.password}
            onChange={change}
            required
          />
        </div>

        <button
          type="submit"
          onClick={submit}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
        >
          Login
        </button>
      </form>
    </div>
   </>
  )
}

export default Login
