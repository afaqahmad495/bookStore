import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {authActions} from '../../Store/Auth'

const Sidebar = ({data}) => {
  const dispatch = useDispatch(); 
  const history = useNavigate()
  const roll = useSelector((state)=> state.auth.roll)
  return (
    <div className='bg-zinc-800 p-4 flex flex-col items-center justify-between md:h-[77vh] rounded  '>
      <div className='flex flex-col items-center justify-center'>
      <img src={data.avatar} className='h-[14vh]' alt="" />
      <p className='font-semibold text-xl'>{data.username}</p>
      <p className='text-zinc-400'>{data.email}</p>
      <div className='w-full h-[1px] mt-2 bg-zinc-500 hidden lg:block'></div>
      </div>
      {roll === "user" && (
        <div className='flex md:flex-col items-center justify-center mt-2'>
        <Link to="/profile" 
        className='text-zinc-100 font-semibold w-full py-2 md:px-2 text-center hover:bg-zinc-900 rounded transition-all' >
        Favourites
        </Link>
        <Link to="/profile/orderHistory" 
        className='text-zinc-100 font-semibold w-full py-2 px-2 text-center hover:bg-zinc-900 rounded transition-all' >
        order history
        </Link>
        <Link to="/profile/settings" 
        className='text-zinc-100 font-semibold w-full py-2 px-2 text-center hover:bg-zinc-900 rounded transition-all' >
        settings
        </Link>
      </div>
      )}
      {roll === "admin" && (
          <div className='flex md:flex-col items-center justify-center mt-2  w-[70%]'>
          <Link to="/profile" 
          className='text-zinc-100 font-semibold w-full py-2 md:px-2 text-center hover:bg-zinc-900 rounded transition-all' >
          All Orders
          </Link>
          <Link to="/profile/add-book" 
          className='text-zinc-100 font-semibold w-full py-2 px-2 text-center hover:bg-zinc-900 rounded transition-all' >
          Add book
          </Link>
          
        </div>
      )}
      <button className='w-full hover:bg-zinc-100 hover:text-black border-none p-3 transition-all rounded font-semibold'
      onClick={()=>{
        dispatch(authActions.logout());
        dispatch(authActions.changeRole("user"));
        localStorage.clear("id")
        localStorage.clear("token")
        localStorage.clear("roll")
        history("/");
      }}>
        log out
        </button>
    </div>
  )
}

export default Sidebar
