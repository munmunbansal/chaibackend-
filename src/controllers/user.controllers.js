import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import { uploadOncloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async(req, res)=>{
   //get user details from frontend if not have taken from postman

   //validation- not empty 
   //check if user already exist :username , email
   //check for images , check fro avatar
   //upload them to cloudinary , avatar
    //create user object - create entry in db 
    //remove password and  refresh token field from reponse
    //check fro user creation
    //return response 


    const {fullname , email, username , password}=req.body
    console.log("email:", email);
    
  if (
    [fullname, email, username,password ].some((field)=>
        field?.trim() === "")
  ){
      throw new ApiError(400,"all field are required")
  }



  const existedUser = User.findOne({
    $or: [{ username }, { email }]
  })


  if(existedUser){
    throw new ApiError(409, "User with eamil or username already exist ")
  }


  //multer hume request.files ka access de deata h 
  const avatarLocalPath = req.files?.avatar[0]?.path
  const coverImageLocalPath = req.files?.coverImage[0]?.path


   if (!avatarLocalPath){
      throw new ApiError(400, "Avatar file is required")
   }

//upload the file on cloudinary
    const avatar = await uploadOncloudinary(avatarLocalPath)
    const coverImage = await uploadOncloudinary(coverImageLocalPath)
    
    if(!avatar){
      throw new ApiError(400, "Avatar file is required")
    }


    const user = await User.create({
      fullName,
      avatar :avatar.url,
      coverImage:coverImage?.url || "",
      email,
      password,
      username: username.toLowerCase()
    })


   const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
   )


   if (!createdUser){
      throw new ApiError(500, "Something went wrong while registering the user ")
   }

   return res.status(201).json(
    new ApiResponse(200, createdUser, "User Registered Sucessfully ")
   )




})



export {
    registerUser,
}