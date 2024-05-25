import express from "express";
import cors from "cors";

import registerEmail from "./Routes/User_Routes/registerEmail.js";
import getTasks from "./Routes/Task_Routes/getTasks.js";
import getTask from "./Routes/Task_Routes/getTask.js";
import createTask from "./Routes/Task_Routes/createTask.js";
import updateTask from "./Routes/Task_Routes/updateTask.js";
import deleteTask from "./Routes/Task_Routes/deleteTask.js";
import deleteEmail from "./Routes/User_Routes/deleteEmail.js";

import registerEmailMiddleware from "./Routes/User_Middlewares/registerEmailMiddleware.js";
import createTaskMiddleware from "./Routes/Task_Middlewares/createTaskMiddleware.js";
import getTasksMiddleware from "./Routes/Task_Middlewares/getTasksMiddleware.js";
import getTaskMiddleware from "./Routes/Task_Middlewares/getTaskMiddleware.js";
import updateTaskMiddleware from "./Routes/Task_Middlewares/updateTaskMiddleware.js";
import deleteTaskMiddleware from "./Routes/Task_Middlewares/deleteTaskMiddleware.js";
import deleteEmailMiddleware from "./Routes/User_Middlewares/deleteEmailMiddleware.js";

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.post("/email",registerEmailMiddleware.isEmail,registerEmailMiddleware.isCorrectFormat,registerEmail)
app.delete("/email",deleteEmailMiddleware.isAuth,deleteEmailMiddleware.isExists,deleteEmail)

app.get("/tasks",getTasksMiddleware.isAuth,getTasksMiddleware.isExists,getTasks)
app.get("/tasks/:id",getTaskMiddleware.isAuth,getTaskMiddleware.isExists,getTaskMiddleware.isID,getTaskMiddleware.isTaskExists,getTask)
app.post("/tasks",createTaskMiddleware.isAuth,createTaskMiddleware.isExists,createTaskMiddleware.isAllDetails,createTaskMiddleware.greaterDate,createTask)
app.put("/tasks/:id",updateTaskMiddleware.isAuth,updateTaskMiddleware.isExists,updateTaskMiddleware.isID,updateTaskMiddleware.isTaskExists,updateTaskMiddleware.greaterDate,updateTask)
app.delete("/tasks/:id",deleteTaskMiddleware.isAuth,deleteTaskMiddleware.isExists,deleteTaskMiddleware.isID,deleteTaskMiddleware.isTaskExists,deleteTask)

app.listen(4000,()=>console.log("Server is started at port 4000"))