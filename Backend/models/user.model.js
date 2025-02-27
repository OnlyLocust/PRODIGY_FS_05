import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
        },
        profile:{
            type:String,
        },
        password:{
            type:String,
            required:true,
            select:false
        },
        dob:{
            type:String,
            default:'',
            // set: function (value) {
            //     return new Date(value.toISOString().split('T')[0]); // Strips time
            // }

            // set: (value) => {
            //     if (!value) return value; // Handle null/undefined
            //     const date = new Date(value);
            //     date.setUTCHours(0, 0, 0, 0); // Remove time part
            //     return date;
            //   }
          
        },
        gender:{
            type:String,
            enum:['Male' , 'Female' , 'N/A'],
            default: 'N/A'
        }
    },
    {
        timestamps:true
    }
)

const User = mongoose.model('User' , userSchema)
export default User