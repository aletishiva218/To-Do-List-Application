import jwt from "jsonwebtoken";
import Joi from "joi";
import dotenv from "dotenv";
import { LocalStorage } from "node-localstorage";
dotenv.config()
const localStorage = new LocalStorage("./scratch");

const deleteEmailMiddleware = {
    isAuth:(req,res,next)=>{
        const token = req.headers.authorization?req.headers.authorization.split(" ")[1]:null;
        if(!token)
            return res.status(401).json({status:false,message:"token is required"})
    const {useremail} = jwt.verify(token,process.env.SECRET_KEY)
    if(!useremail)
        return res.status(401).json({status:false,message:"Invalid token"}) 
        next();
    },
    isExists:(req,res,next)=>{
        const token = req.headers.authorization.split(" ")[1];
        const {useremail} = jwt.verify(token,process.env.SECRET_KEY)
        const users = JSON.parse(localStorage.getItem("users"))
        const user = users.find(user=>user.useremail==useremail)
        if(!user)
        return res.status(404).json({status:false,message:"user not exists"})
        next()
    }
}

export default deleteEmailMiddleware;