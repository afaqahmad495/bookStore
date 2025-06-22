import React, { useState } from 'react'
import { IoMdMenu } from "react-icons/io";
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux'

const Navbar = () => {
    const links = [
        {
            title: "Home",
            link: "/"
        },
        
        {
            title: "All Books",
            link: "/all-books"
        },
        {
            title: "Cart",
            link: "/cart"
        },
        {
            title: "Profile",
            link: "/profile"
        },
        {
            title: "Admin Profile",
            link: "/Profile"
        },
          
    ]
    const isLoggedIn  =  useSelector((state)=> state.auth.isLoggedIn);
    const roll  =  useSelector((state)=> state.auth.roll);
    
    if(isLoggedIn === false ){
        links.splice(2,3);
    }
    if(isLoggedIn == true && roll === "user"){
        links.splice(4,1);
    }
    if(isLoggedIn == true && roll === "admin"){
        links.splice(3,1);
    }
    const [MobileNav, setMobailNav] = useState("hidden")
    
  return (
    <>
    <nav className='z-50 relative flex justify-between items-center bg-zinc-800 py-3 px-4 text-white'>
        <div className='flex items-center gap-4'>
            <img className='h-10' src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png" alt="logo" />
            <Link to={"/"} className='text-2xl font-semibold text-zinc-400 '><span className='text-4xl text-blue-300'>b</span>00k<span className='text-4xl text-blue-300'>S</span>t0re</Link>
            </div>
          
        <div className=' nav-links-bookheaven block md:flex gap-4 items-center '>
         <div className='hidden md:flex gap-4 '>
         {links.map((items, i)=>(
           <Link to={items.link} className='hover:text-blue-500 transition-all duration-400 ' 
           key={i}>{items.title}
           </Link> 
         ))}
         </div>
         { isLoggedIn === false && (
            <div className='hidden md:flex gap-4 '>
            <Link to={"/login"} className='bg-transparent border rounded  border-blue-500 px-4 py-1 text-sm hover:bg-white hover:text-black transition-all duration-400  '>Login</Link>
            <Link to={"/Signup"} className='bg-blue-500 border  rounded border-blue-500 px-4 py-1 text-sm hover:bg-transparent hover:text-white transition-all duration-400'>SignUp</Link>
         </div>
         )}
         <button className='text-4xl lg:hidden ' onClick={()=>(MobileNav === "hidden" ? setMobailNav("block") : setMobailNav("hidden") )} >
         <IoMdMenu />
         </button>
        </div>
      
    </nav>
    <div className={` ${MobileNav} bg-zinc-800 text-white h-screen absolute left-0 top-0 w-full flex flex-col justify-center items-center gap-4 z-40`}>
    {links.map((items, i)=>(
           <Link to={items.link} className={`  ${MobileNav} hover:text-blue-500 text-4xl text-white transition-all duration-400 `} 
           key={i}
           onClick={()=>(MobileNav === "hidden" ? setMobailNav("block") : setMobailNav("hidden") )}
           >{items.title}{" "} 
           
           </Link> 
         ))}
         {isLoggedIn === false && (
            <div className=' flex flex-col gap-4 items-center justify-center '>
            <Link to={"/login"} className={`  ${MobileNav} bg-transparent border rounded  border-blue-500 px-8 py-1 text-2xl  hover:bg-white hover:text-black transition-all duration-400   `}>Login</Link>
            <Link to={"/Signup"} className={`  ${MobileNav} bg-blue-500 border  rounded border-blue-500 px-8 py-1 text-2xl hover:bg-transparent hover:text-white transition-all duration-400`}>SignUp</Link>
         </div>
         )}
         
    </div>
    </>
  ) 
}

export default Navbar
