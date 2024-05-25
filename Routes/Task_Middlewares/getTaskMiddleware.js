import jwt from "jsonwebtoken";
import Joi from "joi";
import dotenv from "dotenv";
import { LocalStorage } from "node-localstorage";
dotenv.config()
const localStorage = new LocalStorage("./scratch");

const getTaskMiddleware =  {
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
    },
    isID:(req,res,next)=>{
        const {id} = req.params;
        if(!id)
            return res.status(404).json({status:false,message:"id is required"})
        next()
    },
    isTaskExists:(req,res,next)=>{
        const {id} = req.params;
        const token = req.headers.authorization.split(" ")[1];
        const {useremail} = jwt.verify(token,process.env.SECRET_KEY)
        const users = JSON.parse(localStorage.getItem("users"))
        const user = users.find(user=>user.useremail==useremail)
        const task = user.tasks.find(task=>task.id==id)
        if(!task)
            return res.status(404).json({status:false,message:"task not exists with given id"})
        next()
    }
}

export default getTaskMiddleware;