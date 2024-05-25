import jwt from "jsonwebtoken";
import Joi from "joi";
import dotenv from "dotenv";
import { LocalStorage } from "node-localstorage";
dotenv.config()
const localStorage = new LocalStorage("./scratch");

const createTaskMiddleware = {
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
    isAllDetails:(req,res,next)=>{
        const {title,description,date} = req.body;
        const errors=[];
        if(!title) errors.push("Title is required")
        if(!description) errors.push("Description is required")
        if(!date) errors.push("Date is required")
        if(errors.length)
            return res.status(404).json({status:false,errors:errors})
        next()
    },
    greaterDate:(req,res,next)=>{
        const {date} = req.body;
        const schema = Joi.object().keys({
            date:Joi.date().min('now').required()
        })
        const decreaseOne = (ustDate) => {
            const istDate = new Date(ustDate);
            istDate.setHours(istDate.getHours() +24);
            return istDate;
          };
        const {error} =schema.validate({date:decreaseOne(date)})
        if(error)
            return res.status(406).json({status:false,message:"invalid date or minimum than current date"})
        next()
    }
}

export default createTaskMiddleware;