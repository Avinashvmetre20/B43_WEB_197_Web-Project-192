const asyncHandler = require("express-async-handler");
const User = require("../module/user.module.js");
const genarateToken = require("../utils/genarateToken.js");
const bycript = require("bcryptjs");

const register = asyncHandler(async (req,res)=>{
    const {name,email,password}= req.body;
    const userexist = await User.findOne({email});
    if(userexist){
        res.status(400);
        throw new Error("User already exist");
    }

    const hasedPassword = await bycript.hash(password,10);
    const user = await User.create({name,email,password:hasedPassword});
    if(user){
        res.status(201).json({
           _id:user._id,
           name : user.name,
           email :user.email,
           password:password,
           token:genarateToken(user._id)
        });
        // res.status(201).json({data:user})
    }
    else{
        res.status(400);
        throw new Error("Invalid user")
    }
});

const login = asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    const user = await User.findOne({email});
    if(user && await bycript.compare(password,user.password)){
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:genarateToken(user._id)
        })
    }
    else{
        res.status(401);  //.json({msg:"error mag"})
        throw new Error('Invalid email or password')
    }
})

module.exports = {register,login}