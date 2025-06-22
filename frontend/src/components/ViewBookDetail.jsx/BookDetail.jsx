import React, {useEffect, useState} from 'react'
import {useParams, useNavigate, Link} from 'react-router-dom'
import axios from 'axios'
import { FaHeart } from "react-icons/fa6";
import { BsCartFill } from "react-icons/bs";
import {useSelector} from 'react-redux'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


const BookDetail = () => {
    const {id} = useParams()
    const navigate = useNavigate()
     const [Data, setData] =  useState();
     const isLoggedIn =  useSelector((state)=> state.auth.isLoggedIn)
     const roll =  useSelector((state)=> state.auth.roll)
    //  console.log(isLoggedIn)
    //  console.log(roll)
       useEffect(()=>{
            const fetch = async ()=>{
            const response = await axios.get(`http://localhost:3000/api/v1/get-book-by-id/${id}`)
            // console.log(response)
             setData(response.data.data);
            }
            fetch();
       }, []);
       const headers = { 
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id
       }
       const handleFavourite = async ()=>{
         const response = await axios.put("http://localhost:3000/api/v1/add-book-favourite",{},{headers})
         alert(response.data.message)
       }
       const handleCart = async ()=>{
        const response = await axios.put("http://localhost:3000/api/v1/add-to-cart", {},{headers})
        alert(response.data.message)
       }
      
       const deletebook = async ()=>{
        const response =  await axios.delete("http://localhost:3000/api/v1/delete-book",{headers})
        alert(response.data.message)
        navigate("/all-books")
       }

       if (!Data) {
        return <div className="text-white px-4 py-8">Loading...</div>;
      }
  return (
    <div className="px-8 bg-zinc-900 flex flex-col items-start lg:flex-row md:gap-4 md:px-4 md:py-8 ">
  
    {/* Left Side */}
    <div className="w-full md:w-3/6">
      <div className=" flex flex-col  justify-around bg-zinc-800 rounded p-6 mt-4 md:flex-row lg:h-[77vh]   ">
        <img src={Data.url} alt="" className="h-[40vh] md:max-w-[50vh] md:h-[50vh] lg:h-[70vh] rounded " />
  
        {isLoggedIn === true && roll === "user" && (
          <div className="flex items-center justify-between  flex-row gap-4 mt-4 md:justify-start md:flex-col">
          <button className="bg-zinc-100 rounded md:rounded-full text-red-500  p-3 text-sm md:text-3xl flex items-center justify-center gap-1"
          onClick={handleFavourite}>
            <FaHeart /><span className='block md:hidden'>Favourites</span>
          </button>
          <button className="bg-zinc-100 rounded md:rounded-full text-blue-500 text-sm md:text-3xl p-3 flex items-center justify-center gap-1"
          onClick={handleCart}>
            <BsCartFill /><span className='block md:hidden'>Add to cart</span>
          </button>
        </div>
        )}
        {isLoggedIn === true && roll === "admin" && (
          <div className="flex items-center justify-between  flex-row gap-4 mt-4 md:justify-start md:flex-col">
          <Link to={`/update-book/${id}`}   className="bg-zinc-100 rounded md:rounded-full text-black  p-3 text-sm md:text-3xl flex items-center justify-center gap-1">
          <FaEdit /><span className='block md:hidden'>edit</span>
          </Link>
          <button  onClick={deletebook} className="bg-zinc-100 rounded md:rounded-full text-red-500 text-sm md:text-3xl p-3 flex items-center justify-center gap-1">
          <MdDelete /><span className='block md:hidden'>delete</span>
          </button>
        </div>
        )}
      </div>
    </div>
  
    {/* Right Side */}
    <div className="flex flex-col gap-4 mt-4  md:w-3/6">
      <h1 className="text-5xl font-semibold text-yellow-100">{Data.title}</h1>
      <p className="text-3xl text-yellow-100 md:text-4xl">
        <span className="text-zinc-400">by</span> {Data.author}
      </p>
      <p className="text-zinc-400 md:text-lg">{Data.desc}</p>
      <p className="text-lg text-yellow-300">Language: {Data.language}</p>
      <p className="mb-11 text-xl font-semibold text-zinc-400">Price: {Data.price}</p>
    </div>
  
  </div>
  
  )
}

export default BookDetail;
