import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const userSchema = new Schema(
    {
    username:{
        type:String,
        required:true,
        unique: true,
        lowercase: true,
        trim:true,
        index: true   //if app jyad aaaap serching ke liye use krte h

    },
    email:{
        type:String,
        required:true,
        unique: true,
        lowercase: true,
        trim:true,
         

    },
    fullName:{
        type:String,
        required:true,
        trim:true,
        index: true   
    },
    avatar:{
        type: String,  //cloudinary yrl
        required:true,
    },
    coverImage:{
        type: String,  //cloudinary yrl
      
    },
    watchHistory: [{
        type: Schema.Types.ObjectId,
        ref:"Video"
    }
    ],
    password :{
    type: String,
    required: [true,'Password is required']
    },
    refreshToken:{
        type: String
    }
},
{
   timestamps: true
}
)


userSchema.pre('save', async function (next){
    if(this.modified("password")) return next()

    this.password = await bcrypt.hash(this.password, 10)
    next()
})


userSchema.methods.isPasswordCorrect = async function
(password){
    return await bcrypt.compare(password, this.password)
}


userSchema.methods.generateAccessToken = function(){
    jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)
}
userSchema.methods.generateRefreshToken = function(){
    jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)
}

export  const user = mongoose.model("User",userSchema )