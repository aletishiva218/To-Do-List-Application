import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { LocalStorage } from "node-localstorage";
dotenv.config()
const localStorage = new LocalStorage("./scratch");


const getTask = (req,res) => {
    const {id} = req.params;
    const token = req.headers.authorization.split(" ")[1];
    const {useremail} = jwt.verify(token,process.env.SECRET_KEY);
    const users = JSON.parse(localStorage.getItem("users"));
    const user = users.filter(obj=>obj.useremail==useremail)[0];
    const task = user.tasks.filter(obj=>obj.id==id)[0]
    res.status(200).json({status:true,task:task})
}

export default getTask;