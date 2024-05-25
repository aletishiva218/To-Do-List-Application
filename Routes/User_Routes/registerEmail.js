import { LocalStorage } from "node-localstorage";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()
const localStorage = new LocalStorage("./scratch");

const registerEmail = (req,res) => {
    const user = {
        useremail:req.body.useremail,
        tasks:[]
    }
    const users = JSON.parse(localStorage.getItem("users"));
    const isalreadyuser = users.filter(obj=>obj.useremail==user.useremail)
    if(!isalreadyuser[0])
        {
            users.push(user)
            localStorage.setItem("users",JSON.stringify(users))
        }
        const token = jwt.sign({useremail:user.useremail},process.env.SECRET_KEY)
    res.status(200).json({status:true,token})
}

export default registerEmail;