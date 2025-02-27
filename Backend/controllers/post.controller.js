import Post from "../models/post.model.js";
import cloudinary from "../utils/cloudinary.js";

export const addPost = async (req , res) => {

    const file = req.files.file
    if (!file) return res.status(400).json({ error: "No file uploaded" });
    
    
    
    
    
    
    try {
        let imageUrl = "";
        const id = req.user._id
        const {desc} = req.body
        await cloudinary.uploader.upload(file.tempFilePath , (err , result) => {
            if(!err){
                imageUrl = result.url
                
            }
            else{
                return res.status(400).json({
                    message : 'Post cannot upload due to some internal server error',
                    error
                }) 
            }
        })
        const newPost = new Post({poster:id , postImg:imageUrl , desc})
        const savePost = await newPost.save()
        return res.status(200).json({
            message : 'Post uploaded',
            post:savePost
        })
    } catch (error) {
        console.log(error);
        
        return res.status(400).json({
            message : 'Post cannot upload due to some internal server error',
            error
        })
    }
}

export const getMyPost = async (req,res) => {
    try {
        const id = req.user._id
        const myPosts = await Post.find({poster:id})
        return res.status(200).json({
            message : 'Post given',
            posts:myPosts
        })
    } catch (error) {
        return res.status(400).json({
            message : 'Post cannot give due to some internal server error'
        })
    }
}


export const deletePost = async (req,res) => {
    try {
        const postId = req.params.id
        const deletedPost = await Post.findByIdAndDelete(postId)
        return res.status(200).json({
            message : 'Post deleted',
            post:deletedPost
        })
    } catch (error) {
        return res.status(400).json({
            message : 'Post cannot delete due to some internal server error'
        })
    }
}

export const getAllPost = async (req,res) => {
    try {
        const allPosts = await Post.find().populate("poster" , "username profile").populate("comments.commenter", "username")
        return res.status(200).json({
            message : 'Post given',
            posts:allPosts
        })
    } catch (error) {
        return res.status(400).json({
            message : 'Post cannot give due to some internal server error'
        })
    }
}

export const addLike = async (req,res) => {
    try {
        const id = req.user._id
        const postId = req.params.id
        await Post.findByIdAndUpdate(postId , {$push :{likes : {likeUser:id}}}, {new:true})
        return res.status(200).json({
            message : "You liked"
        })
    } catch (error) {
        return res.status(400).json({
            message : 'Failed to like the post',
            error
        })
    }
}

export const removeLike = async (req,res) => {
    try {
        const id = req.user._id
        const postId = req.params.id
        await Post.findByIdAndUpdate(postId , {$pull :{likes : {likeUser:id}}}, {new:true})
        return res.status(200).json({
            message : "You unliked"
        })
    } catch (error) {
        return res.status(400).json({
            message : 'Failed to unlike the post',
            error
        })
    }
}

export const addComment = async (req,res) => {
    try {
        
        const id = req.user._id
        const postId = req.params.id
        
        const {comment} = req.body
        await Post.findByIdAndUpdate(postId , {$push :{comments : {commenter:id , msg:comment}}})
        return res.status(200).json({
            message : "You commented"
        })
    } catch (error) {
        
        return res.status(400).json({
            message : 'Failed to add comment to the post',
            error
        })
    }
}