import {configureStore} from '@reduxjs/toolkit'
import auth from './authSlice.js'
import posts from './postSlice.js'

const store = configureStore({
    reducer:{
        auth,
        posts
    }
})

export default store