import userStudent from "../models/userStudent.js";
import bcrypt from "bcryptjs"
import { createError } from "./../Utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req,res,next)=>{
   try{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);


    const newStudent= new userStudent({
        userName:req.body.userName,
        email:req.body.email,
        password:hash
    })
    await newStudent.save()
    res.status(200).send("user has been created");
   }catch(err){
    next(err);
   }
};

//Login
export const login = async (req,res,next)=>{
   try{
    const user = await userStudent.findOne({email:req.body.email});
    if(!user) return next(createError(404,"user not found"));

    const isPasswordCorrect = await bcrypt.compare(req.body.password,user.password);
    if(!isPasswordCorrect) return next(createError(404,"wrong password or userNmae"));

    const token = jwt.sign
        ({
            id:user._id, 
            isAdmin:user.isAdmin
        },
        process.env.JWT)

    const{password,isAdmin,...otherDetails}=user._doc;
    res.cookie("access_token",token,{httpOnly:true}).status(200).json(otherDetails);
   }catch(err){
    next(err);
   }
}