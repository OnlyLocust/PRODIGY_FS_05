import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts:[{}],
    isLoading:false,
    commentId:"",
    commentPost:[{}],
    openComment:false
};

const postSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setLoading:(state,action) => {
            state.isLoading = action.payload
        },
        changeOpenComment:(state,action) => {
            state.openComment = action.payload
        },
        setPosts: (state,action) => {
            state.posts = action.payload.reverse()
        },
        setComment:(state,action) => {
            state.commentId = action.payload
        },
        setCommentPost:(state,action) => {
            state.commentPost = action.payload
        },
        pushComment : (state , action) => {

            const {id,comment} = action.payload

            const post = state.posts.find((p) => p._id == state.commentId)

            if(post){
                
                post.comments.push({msg:comment , commenter: {username:id}})
                state.commentPost.push({msg:comment , commenter: {username:id}})
                console.log('refreshed');
                
            }
        }
    }
})

export const {setLoading,setPosts, setComment ,setCommentPost,pushComment,changeOpenComment} = postSlice.actions
export default postSlice.reducer