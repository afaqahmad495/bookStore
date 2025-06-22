import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Profile/Sidebar'
import axios from 'axios'
import { Outlet } from 'react-router-dom'

const Profile = () => {
  // const isLoggedIn = useSelector();
  const [profile, setProfile] = useState()
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `bearer ${localStorage.getItem("token")}`
  }
  useEffect(()=>{
    const fetch = async ()=>{
      const response =await axios.get("http://localhost:3000/api/v1/get-user-information",{headers})
      setProfile(response.data)
    }
    fetch();
  }, []);
  return (
    <div className='bg-zinc-900 px-4 md:px-14 flex flex-col md:flex-row  py-8 text-white overflow-x-hidden'>
      {profile &&(
         <>
         <div className=' w-full md:w-1/6'>
         <Sidebar data={profile} />
      </div>
      <div className=' w-full md:w-5/6 px-4'>
      <Outlet/>
      </div>
      </>
      )}
    
    </div>
  )
}

export default Profile
