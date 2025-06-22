import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {
  const [Value, setValue] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  })
  const change = (e)=>{
    const {name, value} = e.target;
    setValue({...Value, [name]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // page reload se rokta hai
    console.log("Form submitted");
  };
  const navigate = useNavigate()

  const submit = async ()=>{
    try{
      if(Value.username === "" ||
         Value.email === "" ||
          Value.password === ""||
           Value.address ==="")
           {
            alert("All fields are required");
           }else{
            const response = await axios.post("http://localhost:3000/api/v1/sign-up", Value)
            console.log(response.data);
            navigate("/login")

           }

    }catch (error){
      console.log(error)
    }
  }
  return (
    <div className='bg-zinc-900 h-screen'>
      <div className="flex overflow-hidden lg:items-center justify-center py-4  min-w-screen  ">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-700 p-6 rounded-2xl shadow-lg lg:w-full lg:max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-white text-center">Signup</h2>

        <div className="mb-4">
          <label className="block text-zinc-400 mb-1">Username</label>
          <input
            type="text"
            name="username"
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter username"
            value={Value.username}
            onChange={change}
          />
        </div>

        <div className="mb-4">
          <label className="block text-zinc-400 mb-1">Email</label>
          <input
            type="email"
            name="email"
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter email"
            value={Value.email}
            onChange={change}
          />
        </div>

        <div className="mb-4">
          <label className="block text-zinc-400 mb-1">Password</label>
          <input
            type="password"
            name="password"
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter password"
            value={Value.password}
            onChange={change}
          />
        </div>

        <div className="mb-4">
          <label className="block text-zinc-400 mb-1">Address</label>
          <textarea
            name="address"
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter address"
            value={Value.address}
            onChange={change}
          />
        </div>

        <button
          type="submit"
          onClick={submit}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
        >
          Sign Up
        </button>
      </form>
    </div>

    </div>
  )
}

export default SignUp
