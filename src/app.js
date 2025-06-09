import express from "express";

import cors from "cors";
import cookieParser from "cookie-parser";
//ye jo hamare server jo user ka browsere  uske andr ki  cookies se acess kr pau aur uski cookies set bhi kr pau
const app = express();


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true , limit : 
"16kb" }))
app.use(express.static("public"))
app.use(cookieParser())





export {app};

