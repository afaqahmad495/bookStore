import React, { useEffect } from 'react'
import  axios  from 'axios'
import { useState } from 'react'
import BookCard from '../BookCard/BookCard'

const Favourite = () => {
    const [Favourite, setFavourite] = useState()
    const headers = { 
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        
       }
    useEffect(()=>{
        const fatch =async ()=>{
            const response = await axios.get("http://localhost:3000/api/v1/get-favourite-book",{headers})
            setFavourite(response.data.Data)
        }
       fatch()   
    },[Favourite])
    if (!Favourite) {
        return <div className="text-white px-4 py-8">Loading...</div>;
      }
  return (
    <>
    {Favourite && Favourite.length === 0 && (
        <div className='text-5xl font-semibold text-zinc-700 flex items-center justify-center'>No Favourite Book</div>
      )}
      <div className='grid grid-cols-2 gap-4 my-4'>
      
      {Favourite && Favourite.map((items,i)=>(
        <div key={i} className=''>
            <BookCard data={items} favourite={true}  />
        </div>
      ))}
    </div>
    </>
    
  )
}

export default Favourite
