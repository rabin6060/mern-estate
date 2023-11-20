import express from 'express'
import mongoose from 'mongoose'
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

app.listen(3000,()=>{
    console.log(`server running on the port ${process.env.PORT}`)
    connect()
})