import React, { useState } from "react";
import { MdCancel } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  changeOpenComment,
  pushComment,
  setComment,
  setCommentPost,
} from "../../store/postSlice";

const Comments = () => {
  const dispatch = useDispatch();
  const [comment, setMyComment] = useState("");
  const postId = useSelector((store) => store.posts.commentId);
  const userId = useSelector((store) => store.auth.user.username);

  const postCommments = useSelector((store) => store.posts.commentPost);

  const addComment = async () => {
    try {
      if (!comment) {
        toast.error("Add some comment");
        return;
      }

      await axios.put(
        `https://posty-0rlh.onrender.com/api/post/comment/${postId}`,
        { comment: comment },
        { withCredentials: true }
      );
      dispatch(pushComment({ comment: comment, id: userId }));
      toast.success("Comment uploaded");
    } catch (error) {
      toast.error("Failed to add comment");
      console.log(error);
    } finally {
      setMyComment("");
    }
  };

  const isSmall = useSelector((store) => store.auth.isSmall);

  return (
    <div className={`border h-full grid-rows-5`}>
      <div className="row-span-1 flex justify-between p-4 text-2xl h-[10%]">
        <div className="flex justify-baseline items-center gap-2">
          Comments <FaArrowRight />
        </div>
        <div className="hover:scale-110 cursor-pointer">
          <MdCancel
            onClick={() => {
              dispatch(setComment(""));
              dispatch(setCommentPost(""));
              dispatch(changeOpenComment(false));
            }}
          />
        </div>
      </div>
      <hr />
      <div className="row-span-3 h-[80%] overflow-y-scroll hide-scrollbar">
        {
          // console.log(postCommments)

          postCommments.length > 0 ? (
            postCommments.map((comm) => (
              <div className="px-2 py-1 flex gap-2">
                <span className="text-md font-bold font-serif">
                  {comm.commenter.username}
                </span>{" "}
                : <span className="text-cyan-300">{comm.msg}</span>{" "}
              </div>
            ))
          ) : (
            <div className="text-xl text-green-500 flex justify-center items-center">
              No Comments Here
            </div>
          )
        }
      </div>
      <div className="row-span-1 h-[10%] flex justify-stretch p-2">
        <input
          type="text"
          placeholder="Add Comment"
          className="border w-[80%] text-lg h-[50px] px-2 font-mono rounded-lg"
          value={comment}
          onChange={(e) => setMyComment(e.target.value)}
        />{" "}
        <FaArrowRight
          className="border w-[15%] p-2 rounded-lg h-[50px] hover:scale-105 cursor-pointer "
          onClick={addComment}
        />
      </div>
    </div>
  );
};

export default Comments;
