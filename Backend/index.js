import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import fileUpload from 'express-fileupload'


import connectDatabase from './database/db.js'
import userRoute from './routes/user.routes.js'
import postRoute from './routes/post.routes.js'


const app = express()
dotenv.config()

// app.use(cors({
//     // origin:'https://postiy.netlify.app',
//     origin:'https://postiy.netlify.app',
//     credentials:true
// }))


const allowedOrigins = [
    "https://postiy.netlify.app",
    "http://localhost:5173", // Add this for development
  ];
  
  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true, // If using cookies or authentication headers
    })
  );

app.use(fileUpload({
    useTempFiles:true
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())
// app.use(express.static("uploads")); 

const port = process.env.PORT || 9090


app.use('/api/user' , userRoute)
app.use('/api/post' , postRoute)

app.listen(port , () => {
    console.log('server started on  port ', port);
    connectDatabase()
})