import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import initialProfile from './../../../public/initial.jpg'
import { changeOpenProfile } from '../../../store/authSlice'
import { MdRemoveCircleOutline } from 'react-icons/md'

const ProfileHeader = () => {

  const dispatch = useDispatch()
    const user = useSelector((store) => store.auth.user)

  return (
    <div className='flex justify-between h-[60px] border items-center px-4 bg-[#141414]'>
      <div className='text-2xl font-bold font-serif'>{user.username}</div>
      <div className='flex'>
      <div className='text-2xl flex justify-center items-center hover:scale-120 cursor-pointer mx-4' onClick={() => dispatch(changeOpenProfile(false)) }><MdRemoveCircleOutline/></div>
      <img src={user.profile ? user.profile : initialProfile} alt="profile" className=' h-[40px] w-[40px] rounded-[50%]'/>
      </div>
    </div>
  )
}

export default ProfileHeader
