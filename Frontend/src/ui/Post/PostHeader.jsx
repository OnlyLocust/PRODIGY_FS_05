import React from 'react'
import initialProfile from './../../../public/initial.jpg'


const PostHeader = ({post}) => {
  return (
    <>
    <div className='flex items-center gap-4 m-1'>
      <img src={post?.poster?.profile  ? post?.poster?.profile : initialProfile } alt="profile" className=' h-[50px] w-[50px] rounded-[50%]'/>
      <div className='mx-2 font-bold text-lg font-mono'>{post?.poster?.username}</div>
    </div>
    {/* {console.log(poster.username)} */}
    <hr className='my-2' />
    </>
  )
}

export default PostHeader
