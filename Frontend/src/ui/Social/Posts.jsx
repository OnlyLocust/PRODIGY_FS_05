import React, { useEffect } from "react";
import PostCard from "../Post/PostCard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setPosts } from "../../../store/postSlice";

const Posts = () => {
  
  const dispatch = useDispatch()

  
  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get('http://localhost:9090/api/post/get/all' , {withCredentials:true})
        const posts = res.data.posts    
        dispatch(setPosts(posts))    
        // console.log(posts);
        
      } catch (error) {
        console.log(error);
        
      }
    }
    
    getPosts()
    
  }, [])
  const posts = useSelector((store) => store.posts.posts)

  return (
    <div className=" h-[90%] overflow-x-scroll hide-scrollbar ">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
        // console.log(post._id)
        
        
      ))}
      
    </div>
  );
};

export default Posts;
