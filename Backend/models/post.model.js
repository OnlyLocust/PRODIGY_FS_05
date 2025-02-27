import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        poster:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        postImg:{
            type:String,
            required:true,
        },
        desc:{
            type:String
        },
        uploadDate:{
            type:Date,
            default:Date.now()
        },
        likes:[
            {
                likeUser:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:'User',
                    unique:true
                }
            }
        ],
        comments:[
            {
                commenter:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:'User'
                },
                msg:{
                    type:String,
                    require:true
                }
            }
        ]
    },
    {
        timestamps:true
    }
)

const Post = mongoose.model('Post' , postSchema)
export default Post