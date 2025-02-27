import React from 'react'
import PostHeader from './PostHeader'
import Post from './Post'
import Reacts from './Reacts'
import Desc from './Desc'

const PostCard = ({post}) => {
  return (
    <div className='w-[80%] border m-auto my-8 p-4 bg-[#6F6F6F]' key={post._id}>
      <PostHeader post={post}></PostHeader>
      <Post img={post.postImg}/>
      <Desc desc={post.desc}/>
      <Reacts post={post}/>
    </div>
  )
}

export default PostCard
