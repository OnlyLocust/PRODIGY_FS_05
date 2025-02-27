import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FcLike } from "react-icons/fc";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  changeOpenComment,
  setComment,
  setCommentPost,
} from "../../../store/postSlice";

const Reacts = ({ post }) => {
  const [like, setLike] = useState(false);
  const [likes, setMore] = useState(post?.likes?.length);
  const user = useSelector((store) => store.auth.user._id);
  const dispatch = useDispatch();

  const isMyLike = async () => {
    if (!like) {
      try {
        await axios.put(
          `https://posty-0rlh.onrender.com/api/post/like/${post._id}`,
          {},
          { withCredentials: true }
        );
        setLike(true);
        setMore(likes + 1);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await axios.put(
          `https://posty-0rlh.onrender.com/api/post/unlike/${post._id}`,
          {},
          { withCredentials: true }
        );
        setLike(false);
        setMore(likes - 1);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const checkMyLike = () => {
      if (post?.likes && post.likes.length > 0) {
        const isLiked = post.likes.some((like) => like.likeUser === user);
        setLike(isLiked);
      }
    };

    checkMyLike();
  }, []);

  return (
    <>
      <hr className="my-2" />
      <div className="flex justify-between px-4 my-1 items-center">
        <div className="flex items-center gap-4">
          {" "}
          <div onClick={() => isMyLike()} className="cursor-pointer">
            {!like ? (
              <CiHeart className="scale-200" />
            ) : (
              <FcLike className="scale-200" />
            )}
          </div>
          {likes}
        </div>
        <div
          className="flex items-center gap-2 font-bold text-lg justify-center cursor-pointer hover:scale-110"
          onClick={() => {
            dispatch(setComment(post._id)),
              dispatch(setCommentPost(post.comments));
            dispatch(changeOpenComment(true));
            // console.log(post.comments)
          }}
        >
          comments <FaArrowRight />{" "}
        </div>
      </div>
    </>
  );
};

export default Reacts;
