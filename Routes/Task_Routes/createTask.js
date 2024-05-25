import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { v4 } from "uuid";
import { LocalStorage } from "node-localstorage";
dotenv.config()
const localStorage = new LocalStorage("./scratch");


const createTask = (req,res) => {
    const toISTDate = (ustDate) => {
        const istDate = new Date(ustDate);
        istDate.setHours(istDate.getHours() + 5);
        istDate.setMinutes(istDate.getMinutes() + 30);
        return istDate;
      };
      const task = {
        id:v4(),
        title: req.body.title,
        description: req.body.description,
        status: "Pending",
        date: toISTDate(req.body.date),
      };

    const token = req.headers.authorization.split(" ")[1];
    const {useremail} = jwt.verify(token,process.env.SECRET_KEY)
    let users = JSON.parse(localStorage.getItem("users"));
    users = users.map(obj=>{
        if(obj.useremail==useremail)
             {
                  obj.tasks.push(task);
                  return obj;
             }
        else
            return obj;
    })
    localStorage.setItem("users",JSON.stringify(users))
    res.status(200).json({status:true})
}

export default createTask;