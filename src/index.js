// require('dotenv').config({path: './env'})  
//this one hamare code ki consistency ko kharab karta h - resolve like below
import dotenv from "dotenv"

// import mongoose from "mongoose";
// import {DB_NAME} from "./constants";

import connectDB  from "./db/index.js";


dotenv.config({
   path: './env'
})


connectDB()
.then(()=>{
   app.listen(process.env.PORT || 8000,()=>{
      console.log(`server is running at port : ${process.env.PORT}`);
   } )
})
.catch((err)=>{
   console.log("MONGO db connection failed !! ", err)
})



/*
import express from "express";
(async ()=>{
   try{
     await mongoose.connect(`$(process.env.
      MONGODB_URI)/${DB_NAME}`)
      app.on("errror", (error)=>{
         console.log("ERRR:", error);
         throw error;
      })


      app.listen(process.env.PORT,()=>{
         console.log(`app is listening on port ${process.env.PORT}`);
      })

   } catch (error){
      console.log("ERROR:", error);
      throw error;

   }
})()

*/
