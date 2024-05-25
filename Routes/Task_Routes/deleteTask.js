import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { LocalStorage } from "node-localstorage";
dotenv.config()
const localStorage = new LocalStorage("./scratch");


const deleteTask = (req,res) => {
    const toISTDate = (ustDate) => {
        const istDate = new Date(ustDate);
        istDate.setHours(istDate.getHours() + 5);
        istDate.setMinutes(istDate.getMinutes() + 30);
        return istDate;
      };
    const {id} = req.params;
    const token = req.headers.authorization.split(" ")[1];
    const {useremail} = jwt.verify(token,process.env.SECRET_KEY);
    let users =JSON.parse(localStorage.getItem("users"));
    
    users = users.map(obj=>{
        if(obj.useremail==useremail)
             {
               let {tasks} = obj;
               tasks = tasks.filter(task=>task.id!=id)
                  return {useremail:obj.useremail,tasks:tasks};
             }
        else
            return obj;
    })
    localStorage.setItem("users",JSON.stringify(users))
    res.status(200).json({status:"Ok"})
}

export default deleteTask;