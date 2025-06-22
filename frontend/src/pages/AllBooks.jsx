import React, { useEffect, useState } from 'react'
import BookCard from '../components/BookCard/BookCard'
import axios from "axios";
const AllBooks = () => {
   const [Data, setData] =  useState();
   useEffect(()=>{
        const fetch = async ()=>{
        const response = await axios.get("http://localhost:3000/api/v1/get-book-information")
         setData(response.data.data);
        }
        fetch();
   }, [])
  return (
    <div className='px-4  bg-zinc-900 '>
        <h1 className='text-yellow-100 text-4xl  ' >All Books</h1>
        <div className=' mt-4  grid sm:grid-cols-1 grid-cols-2 md:grid-cols-4 gap-4 min-h-screen'>
            {Data && Data.map((items, i)=> <div key={i}>
                <BookCard data={items} />{" "}
                </div>)}
        </div>
    </div>
  )
}
export default AllBooks
