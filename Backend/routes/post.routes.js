import express from 'express'
import { addComment, addLike, addPost, deletePost, getAllPost, getMyPost, removeLike } from '../controllers/post.controller.js'
import checkAuth from '../utils/auth.js'
// import upload from '../utils/multer.js'

const postRoutes = express.Router()

postRoutes.post('/upload' ,checkAuth, addPost)
postRoutes.get('/get/my' ,checkAuth , getMyPost)
postRoutes.get('/get/all' ,checkAuth , getAllPost)
postRoutes.delete('/delete/:id' , checkAuth, deletePost)
postRoutes.put('/like/:id' , checkAuth, addLike)
postRoutes.put('/unlike/:id' , checkAuth, removeLike)
postRoutes.put('/comment/:id' , checkAuth, addComment)

export default postRoutes

// , upload.single("file")
// ,  upload.single("image") 