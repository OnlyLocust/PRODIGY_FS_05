import React from 'react'
import { changeOpenProfile, changeOpenUploadPost } from '../../../store/authSlice'
import { useDispatch } from 'react-redux'
import { MdRemoveCircleOutline } from "react-icons/md";


const AddPostHeader = () => {

  const dispatch = useDispatch()
  return (
    <>
     <div className='flex justify-between h-[60px] border items-center px-4 bg-[#141414]'>
      <div className='text-2xl font-bold font-serif'>Add Post Here</div>
      <div className='flex'>
      <div className='text-2xl flex justify-center items-center hover:scale-120 cursor-pointer mx-4' onClick={() => dispatch(changeOpenUploadPost(false)) }><MdRemoveCircleOutline/></div>
      <img src="https://tse1.mm.bing.net/th?id=OIP.7-GJxGbh12meiad6XccZagHaKe&pid=Api&P=0&h=180" alt="profile" className=' h-[40px] w-[40px] rounded-[50%] cursor-pointer'  onClick={() => dispatch(changeOpenProfile(true)) }/>
      </div>
    </div>
    {/* <hr className='my-2' /> */}
    </>
  )
}

export default AddPostHeader
