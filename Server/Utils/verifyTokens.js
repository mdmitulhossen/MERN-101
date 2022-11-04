import jwt from "jsonwebtoken";
import { createError } from "./error.js";


export const verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token;
    if(!token){
        return next(createError(401,"You are not authenticate"))
    }

    jwt.verify(token,process.env.JWT,(err,user)=>{
        if(err){
            return next(createError(401,"You are not authenticate"))
        }
        req.user = user;
        next();
    });
};