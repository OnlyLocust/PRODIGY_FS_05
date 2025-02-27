import jwt from 'jsonwebtoken'

export const generateToken = async (data) => {
    try {
        
        const token = await jwt.sign({username:data.username , _id:data._id , gender:data.gender, dob:data.dob || "" , profile:data.profile || ""} , process.env.SECRET_KEY , {expiresIn:'1h'})
        return token
    } catch (error) {
        return ''
    }
}