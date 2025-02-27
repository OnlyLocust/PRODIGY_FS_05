import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeOpenProfile, changeOpenUploadPost } from '../../../store/authSlice'
import { RiAddBoxLine } from "react-icons/ri";
import initialProfile from './../../../public/initial.jpg'


const Header = () => {
const dispatch = useDispatch()
const user = useSelector((store) => store.auth.user)

  return (
    <div className='flex justify-between h-[60px] border items-center px-4 bg-[#141414]'>
      <div className='text-2xl font-bold font-serif'>POSTYY</div>
      {/* <button className='bg-red-500 p-auto w-[90px] rounded-xl hover:bg-red-400 cursor-pointer py-1'>Logout</button> */}
      <div className="flex">
      <div className='text-2xl flex justify-center items-center hover:scale-120 cursor-pointer mx-4 ' onClick={() => dispatch(changeOpenUploadPost(true)) }><RiAddBoxLine/></div>
      <img src={user.profile ? user.profile : initialProfile}  alt="profile" className=' h-[40px] w-[40px] rounded-[50%] cursor-pointer  ' onClick={() => dispatch(changeOpenProfile(true)) }/>
      </div>
      {/* <div className='border' >profile</div> */}

    </div>
  )
}

export default Header
