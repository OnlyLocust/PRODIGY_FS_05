import React, { useEffect, useState } from 'react'
import Notification from '../components/Notification'
import Social from '../components/Social'
import Profile from '../components/Profile'

import {useDispatch, useSelector } from 'react-redux'
import {useNavigate } from 'react-router-dom'
import axios from 'axios'
import { setSmall, setUser } from '../../store/authSlice'
import AddPost from '../components/AddPost'
import { setPosts } from '../../store/postSlice'
import Comments from '../components/Comments'

const Home = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const loginStatus = useSelector((store) => store.auth.isLogin)
  const commentBox = useSelector((store) => store.posts.openComment)
  const isSmall = useSelector((store) => store.auth.isSmall)

const refresh = useSelector((store) => store.auth.isRefresh)

  useEffect(() => {
    const auth = async() => {
      try {
        const res = await axios.get('http://localhost:9090/api/user/auth' , {withCredentials:true})    
         dispatch(setUser(res.data.user))    
      } catch (error) {
        navigate('/login')
      }
    }
    

    
    auth()

  },[loginStatus , refresh])

  useEffect(() => {
    const handleResize = () => {
      
       const width= window.innerWidth
       if(width <= '1024'){
        dispatch(setSmall(true))
        // alert('hi')
       }
       else{
        dispatch(setSmall(false))
       }
       
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const openProfile = useSelector((store) => store.auth.openProfile)
  const openPost = useSelector((store) => store.auth.openUploadPost)

  return (
    <div className="grid grid-cols-7 gap-1 h-screen text-white bg-red-600">
        <div className=' hidden lg:block lg:col-span-2 bg-[#444444] h-screen'> {commentBox && <Comments/> }</div>
        {/* <div className='col-span-7 lg:col-span-3 bg-[#444444] h-screen '>{ openPost ? <AddPost/> : <Social/> } </div> */}
        <div className='col-span-7 lg:col-span-3 bg-[#444444] h-screen '>{
  isSmall ? (openPost ? <AddPost/> : (openProfile ?  <Profile/> :( commentBox ? <Comments/> : <Social/>) )) :  (openPost ? <AddPost/> : <Social/>) 
} </div>
        <div className='hidden lg:block lg:col-span-2 bg-[#444444] h-screen  '>{openProfile && <Profile/>}</div>
    </div>
  )
}

export default Home

