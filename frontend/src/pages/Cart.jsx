import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";



const Cart = () => {
  const [Cart, setCart] =useState()
  const [Total, setTotal] =useState(0)
  const headers = { 
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    
   }
   useEffect(()=>{
    const fatch = async ()=>{
      const response = await axios.get("http://localhost:3000/api/v1/get-user-cart",{headers})
      setCart(response.data.message)
    }
    fatch();
   },[Cart])

   const deleteItem = async (bookid)=>{
    const response =await axios.delete(`http://localhost:3000/api/v1/remove-cart/${bookid}`,{headers})
    alert(response.data.message)
   }
   const navigate = useNavigate();
   
   
  useEffect(()=>{
    if(Cart && Cart.length > 0){
      let total = 0;
      Cart.map((items)=>{
        total += items.price;
      });
      setTotal(total);
      total = 0
    }
   },[Cart])
   const PlaceOrder = async ()=>{
    try{
      const response = await axios.post("http://localhost:3000/api/v1/place-order",
        {order:Cart},
        {headers});
        
      alert(response.data.message)
      
      navigate("/profile/orderHistory")
      
    }catch (error){
       console.log(error)
    }
   }

   if (!Cart) {
    return <div className="text-white px-4 py-8">Loading...</div>;
  }
  return (
    <div className="bg-zinc-900 px-4 md:px-10 min-h-screen py-10">
    {Cart && Cart.length === 0 && (
      <div className="flex items-center justify-center h-screen text-zinc-400 text-xl md:text-5xl font-semibold ">Empty Cart</div>
    )}
  
    {Cart && Cart.length > 0 && (
      <>
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-300 mb-8">
          Your Cart
        </h1>
  
        <div className="space-y-6">
          {Cart.map((items, i) => (
            <div
              key={i}
              className="bg-zinc-800 rounded-xl p-4 flex flex-col md:flex-row items-center gap-4"
            >
              <img
                src={items.url}
                alt="/"
                className="h-40 md:h-24 object-cover rounded-md"
              />
  
              <div className="flex-1">
                <h1 className="text-2xl font-semibold text-zinc-100 mb-2">
                  {items.title}
                </h1>
                <p className="text-zinc-400 hidden lg:block">
                  {items.desc.slice(0, 100)}...
                </p>
                <p className="text-zinc-400 block lg:hidden">
                  {items.desc.slice(0, 65)}...
                </p>
              </div>
  
              <div className="flex flex-col items-center gap-2">
                <h2 className="text-zinc-100 text-2xl font-bold">
                  Rs {items.price}
                </h2>
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                  onClick={() => deleteItem(items._id)}
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      </>
    )}
    {Cart && Cart.length > 0 && (
      <div className='mt-4 w-full flex items-center justify-end'>
        <div className='p-4 bg-zinc-800 rounded'>
          <h1 className='text-4xl text-zinc-200 font-semibold '>Total Amount</h1>
          <div className='mt-3 flex items-center justify-between text-xl text-zinc-200'>
            <h2>{Cart.length} books</h2>
            <h2>Rs {Total}</h2>
          </div>
          <div className='w-[100%] mt-3 flex justify-center' >
            <button onClick={PlaceOrder} className='bg-zinc-100 rounded px-4 py-2  font-semibold hover:bg-zinc-400'>Place Your Order</button>
          </div>
        </div>
      </div>
    )}
  </div>
  
  )
}

export default Cart
