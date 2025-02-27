import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:{},
    isLogin:false,
    isRefresh:true,
    openProfile:false,
    openUploadPost:false,
    isSmall:false,
};

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUser: (state,action) => {
            state.user = action.payload
        },
        setLoginInfo:(state,action) => {
            state.isLogin = action.payload
        },
        refresh:(state,action) => {
            state.isRefresh = !refresh
        },
        changeOpenProfile:(state,action) => {
            state.openProfile = action.payload
        },
        changeOpenUploadPost:(state,action) => {
            state.openUploadPost = action.payload
        },
        setSmall: (state,action) => {
            state.isSmall = action.payload
        }
    }
})

export const {setUser, setLoginInfo, refresh, changeOpenProfile, changeOpenUploadPost, setSmall} = authSlice.actions
export default authSlice.reducer