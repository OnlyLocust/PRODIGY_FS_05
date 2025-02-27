import User from "../models/user.model.js";
import bcrypt from 'bcrypt'
import { generateToken } from "../utils/jwt.js";
import cloudinary from "../utils/cloudinary.js";


export const signup = async (req , res) => {
    try {
        const {username  , password} = req.body

        const existUser = await User.find({username:username})

        if(!existUser) {

            return res.status(400).json({
                message : "User already exists with this username"
            })
        }

        const salt = await bcrypt.genSalt(10)

        const hashPass = await bcrypt.hash(password , salt)

        const newUser = new User({username,  password:hashPass })

        const user = await newUser.save()

        const token = await generateToken(user)

        res.cookie("token",token, {
            httpOnly: true, // Prevents client-side JS access
            secure: true,   // Ensures cookie is sent only over HTTPS (enable in production)
            sameSite: "None", // Helps prevent CSRF attacks
            expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
          })

        return res.status(200).json({
            message : 'User signup successfull',
            user:{
                username:user,username,
                _id:user._id
            },
            token
        })

    } catch (error) {
        return res.status(400).json(error)
    }
}

export const login = async (req , res) => {
    try {
        const {username  , password} = req.body

        const existUser = await User.find({username:username}).select('+password')

        if(existUser.length <= 0) {
            return res.status(400).json({
                message : "User does not exists with this username"
            })
        }

        const hashPass = existUser[0].password
        

        const isSame = await bcrypt.compare(password , hashPass)

        if(!isSame) {
            
            return res.status(400).json({
                message : "Username and Password does not match"
            })
        }

        const user = await User.findOne({username:username})
        
        const token = await generateToken(user)
        

        res.cookie("token",token, {
            httpOnly: true, // Prevents client-side JS access
            secure: true,   // Ensures cookie is sent only over HTTPS (enable in production)
            sameSite: "None", // Helps prevent CSRF attacks
            expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
          })

        return res.status(200).json({
            message : 'User login successfull',
            user:{
                username:user,username,
                _id:user._id
            },
            token
        })

    } catch (error) {
        return res.status(400).json(error)
    }
}


export const updateProfile = async (req , res) => {
    
    try {

    const {username , gender ,dob} = req.body;

    let updateUser = {}

    const id = req.user._id
        if(username){
            const existUser = await User.findOne({username})

            if(existUser){
                if(existUser._id !== id){
                    return res.status(400).json({
                        message:"User exists with this username"
                    })
                }
                
            }
            else{
                updateUser.username = username;
            }
        }
        if(gender){
            updateUser.gender = gender
        }
        if(dob){
            updateUser.dob = dob
        }
    
    const file = req.files?.file

    if(file){
            await cloudinary.uploader.upload(file.tempFilePath , (err , result) => {
                if(!err){
                    updateUser.profile = result.url
                    // console.log(result.url);                    
                }
                else{
                    return res.status(400).json({
                        message : 'Post cannot upload due to some internal server error',
                        error
                    }) 
                }
            })
    }

    const updated = await User.updateOne({_id: id} , updateUser , {new:true})
    const updatedUser = await User.findById(id)
    

    const token = await generateToken(updatedUser)

        res.cookie("token",token, {
            httpOnly: true, // Prevents client-side JS access
            secure: true,   // Ensures cookie is sent only over HTTPS (enable in production)
            sameSite: "None", // Helps prevent CSRF attacks
            expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
          })
          res.status(200).json({
            message : 'User updation successful',
            user:{
                username:updateUser.username,
                _id:updateUser._id
            },
            token,
            updatedUser
        })
        
    } catch (error) {
        
        return res.status(400).json(error)
    }
    
}

export const logout = async (req , res) => {
    
    res.cookie("token","", {
        httpOnly: true, // Prevents client-side JS access
        secure: true,   // Ensures cookie is sent only over HTTPS (enable in production)
        sameSite: "None", // Helps prevent CSRF attacks
        expires: new Date(Date.now()), // 0 hour from now
      })
    
     return res.status(200).json({ message: "Logged out successfully" });
}