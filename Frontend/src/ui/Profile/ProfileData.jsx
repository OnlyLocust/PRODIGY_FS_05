import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import initialProfile from './../../../public/initial.jpg'

const ProfileData = ({isUpdate , setUpdate}) => {

  
  const user = useSelector((store) => store.auth.user)
  const [username , setUsername] = useState(user.username)
  const [profile , setProfile] = useState(user.profile)
  const [dob , setdob] = useState(user.dob)
  const [gender , setGender] = useState(user.gender)
  

  return (
    <div>

      {/* <input type="text" value={username} /> */}
      <div className="flex justify-center items-center py-8">
      <img src={user.profile ? user.profile : initialProfile}  alt="profile" className=' h-[150px] w-[150px] rounded-[50%] '/>
      </div>
      <div className='text-4xl flex flex-col gap-3 m-8 '>
      <hr />

        <div><span className='font-bold mx-4'>name :</span> <span className='text-xl p-auto align-middle font-thin font-mono'>{user.username}</span></div>
        <hr />
        {/* <div><span className='font-bold mx-4'>password :</span> <span className='text-xl p-auto align-middle font-thin font-mono'>********</span></div>
        <hr /> */}
        <div><span className='font-bold mx-4'>dob :</span> <span className='text-xl p-auto align-middle font-thin font-mono'>{user.dob ? user.dob : 'xx/xx/xxx'} </span></div>
        <hr />
        <div><span className='font-bold mx-4'>gender :</span> <span className='text-xl p-auto align-middle font-thin font-mono'>{user.gender}</span> </div>
        <hr />

      </div>
    </div>
  )
}

export default ProfileData
