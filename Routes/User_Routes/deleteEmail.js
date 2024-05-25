import { LocalStorage } from "node-localstorage";
import dotenv from "dotenv";
dotenv.config()
const localStorage = new LocalStorage("./scratch");

const deleteEmail = (req,res) => {
    let users = JSON.parse(localStorage.getItem("users"));
    users = users.filter(obj=>obj.useremail!=req.body.useremail)
    localStorage.setItem("users",JSON.stringify(users))
    res.status(200).json({status:true})
}

export default deleteEmail;