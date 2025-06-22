import React, { useEffect, useState } from 'react'
import BookCard from '../BookCard/BookCard'
import axios from "axios";
import { Link } from 'react-router-dom';
const RecentlyAdded = () => {
   const [Data, setData] =  useState();
   useEffect(()=>{
        const fetch = async ()=>{
        const response = await axios.get("http://localhost:3000/api/v1/get-recent-book")
         setData(response.data.data);
        }
        fetch();
   }, [])
  return (
    <div className='px-4 mt-8 flex flex-col gap-4 py-4'>
        <h1 className='text-yellow-100 text-4xl ' >Recently Added</h1>
        <div className='md:mt-6 grid sm:grid-cols-1 grid-cols-2 md:grid-cols-4 gap-4 '>
            {Data && Data.map((items, i)=> <div key={i}>
                <BookCard data={items} />{" "}
                </div>)}
        </div>
        <div className='flex items-center justify-center '>
        <Link to="/all-books" className='text-xl text-yellow-100'>Show more >> </Link>
        </div>
    </div>
  )
}

export default RecentlyAdded;
