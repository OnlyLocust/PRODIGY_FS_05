import express from 'express'
import { login, logout, signup, updateProfile } from '../controllers/user.controller.js'
import checkAuth from '../utils/auth.js'

const userRoutes = express.Router()

userRoutes.post('/signup' , signup)
userRoutes.post('/login' , login)
userRoutes.put('/update' , checkAuth , updateProfile)
userRoutes.get('/logout' , logout)
userRoutes.get('/auth' , checkAuth , (req,res) => {
    const user = req.user;
    if(!user) {
        return res.status(500).json({message:"Unauthorized"})
    }
    else{
        return res.status(200).json({message:"Authorized" , user})
    }
})

export default userRoutes