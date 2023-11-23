import express from 'express'
import mongoose from 'mongoose'
import userRoute from './routes/user.route.js'
import authRoute from './routes/auth.routes.js'
import listingRoute from './routes/listing.routes.js'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'

dotenv.config();

const connect = async() => {
  await mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
}


const app = express()  

app.use(express.json())
app.use(cookieParser())

app.listen(3000,()=>{
    console.log(`server running on the port ${process.env.PORT}`)
    connect()
})

app.use('/api/user',userRoute)
app.use('/api/auth',authRoute)
app.use('/api/listing',listingRoute)

app.use((err,req,res,next)=>{
  const statusCode = err.statusCode || 500
  const message = err.message || "internal server error."
  return res.status(statusCode).json({
    success:false,
    statusCode,
    message
  })
})