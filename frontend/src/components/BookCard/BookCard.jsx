import React from 'react'
import {Link} from 'react-router-dom'
import  axios  from 'axios'

const BookCard = ({data, favourite}) => {
    // console.log(data)
   
    const headers = { 
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`,
      bookid:data._id,
     }
    const handleRemove = async ()=>{
      const response = await axios.delete("http://localhost:3000/api/v1/remove-book-favourite/",{headers})
      alert(response.data.message)
    }
    
  return (
   <div className='bg-zinc-800 flex flex-col p-4 mb-4'>
    <Link to={`/view-book-detail/${data._id} `}>
    <div className='bg-zinc-800 rounded    '>
        <div className='bg-zinc-900  md:h-[20vh] flex justify-center items-center overflow-hidden '>
            <img className='h-[40vh] md:h-[30vh]  w-auto object-center' src={data.url} alt="book image" />
            </div>
            
            <h2 className='font-semibold mt-2 text-white' >{data.title}</h2>
            <p className='text-zinc-500 text-sm'>by {data.author}</p>
            <p className='mt-3'>Rs: {data.price}</p>

      
        </div>
        </Link>
        {favourite && (
        <button className='bg-yellow-100 px-4 py-2 rounded border-yellow-500 text-yellow-500 mt-4 text-sm '
        onClick={handleRemove}
        >Remove from favourite</button>
      ) }
       </div>

  )
}

export default BookCard
