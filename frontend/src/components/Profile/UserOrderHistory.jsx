import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

const UserOrderHistory = () => {
  
  const [orderHistory, setOrderHistory] = useState()
  const headers = { 
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    
   }
  useEffect(()=>{
     const fatch = async ()=>{
      const response = await axios.get("http://localhost:3000/api/v1/get-order-history",{headers});
      // console.log(response.data.data)
      setOrderHistory(response.data.data)
      
     }
     
     fatch();
  },[])
  


  if (!orderHistory) {
    return <div className="text-white px-4 py-8">Loading...</div>;
  }
  return (
    <>
      {orderHistory && orderHistory.length === 0 && (
        <div className='h-[80vh] p-4 text-zinc-100'>
          <div className='h-[100%] flex flex-col items-center justify-center'>
            <h1 className='text-5xl font-semibold text-zinc-500 mb-8'>No Order History</h1>
          </div>
        </div>
      )}
      {orderHistory.length > 0 && (
        <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
         <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 md:mb-8 '>
          Your Order History
         </h1>
         <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2'>
          <div className='w-[4%]'>
            <h1 className='text-center'>Sr.</h1>
          </div>
          <div className='w-[22%]'>
            <h1 className='text-center'>Books</h1>
          </div>
          <div className='w-[45%]'>
            <h1 className='text-center'>Description</h1>
          </div>
          <div className='w-[9%]'>
            <h1 className='text-center'>Price</h1>
          </div>
          <div className='w-[16%]'>
            <h1 className='text-center'>Status</h1>
          </div>
          <div className='w-none md:w-[5%] hidden md:block'>
            <h1 className=''>Mode</h1>
          </div>
         </div>
         {orderHistory.map((items, i)=>(
          <div key={i} className='bg-zinc-800 w-full rounded py-2 px-4 hover:bg-zinc-900 hover:cursor-pointer transition-all flex'>
            <div className='w-[4%]'>
              <h1 className='text-center'>{i + 1}.</h1>
            </div>
            <div className='w-[22%]'>
              <Link to={`/view-book-detail/${items.book._id}`} className="hover:text-blue-300">
              {items.book.title}
              </Link>
            </div>
            <div className='w-[45%]'>
             <h1 className=''> {items.book.desc.slice(0,50)} ...</h1>
             </div>
            <div className='w-[9%]'>
             <h1 className=''> {items.book.price}</h1>
             </div>
            <div className='w-[16%]'>
             <h1 className='font-semibold text-green-500'>
              {items.status === "placed order" ? (
                <div className='text-yellow-500'>{items.status}</div>
              ) : items.status === "cancelled" ? (
                <div className='test-red-500'>{items.status}</div>
              ) : (

                items.status
              ) }
               </h1>
             </div>
             <div className='w-[5%]'>
             <h1 className=''>COD</h1>
             </div>
          </div>
         ))}
        </div>
      )}


      </>
    
  )
}

export default UserOrderHistory
