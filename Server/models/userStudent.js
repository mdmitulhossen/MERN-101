import mongoose from "mongoose";
const {Schema} = mongoose;

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    city:{
        type:String
    },
    address:{
        type:String 
    },
    
    number:{
        type:Number
        
    },  
    isAdmin:{
        type:Boolean,
        default:false
        
    },  
},{
    timestamps:true
}
);

export default mongoose.model("user",userSchema);