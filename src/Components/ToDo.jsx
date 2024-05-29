import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import Cookies from "js-cookie";
import axios from "axios";
import NewModal from "./NewModal.jsx";
import EditModal from "./EditModal.jsx";
import SearchModal from "./SearchModal.jsx";
import { useNavigate } from "react-router-dom";

const ToDo = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState({ status: false });
  const [editData,setEditData] = useState({id:"",title:"",description:"",status:"",date:""});
  const [openAdd, setAddOpen] = useState(false);
  const handleAddOpen = () => setAddOpen(true);
  const handleAddClose = () => setAddOpen(false);
  const [openSearch, setSearchOpen] = useState(false);
  const handleSearchOpen = () => setSearchOpen(true);
  const handleSearchClose = () => setSearchOpen(false);
  const [openEdit, setEditOpen] = useState(false);
  const handleEditOpen = (id,title,description,status,date) => {
    setEditData({id:id,title:title,description:description,status:status,date:date})
    return setEditOpen(true)
  };
  const handleEditClose = () => setEditOpen(false);
  const [deleted, setDeleted] = useState(false);
  const [added, setAdded] = useState(false);
  const [edited, setEdited] = useState(false);
  useEffect(() => {
    if (deleted) setTasks({ status: false });
    if (added) setTasks({ status: false });
    if (edited) setTasks({status:false});
    const token = Cookies.get("token");
    axios
      .get("https://to-do-list-application-0y11.onrender.com/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setTasks(response.data);
        setDeleted(false);
        setAdded(false);
        setEdited(false);
      })
      .catch((err) =>{});
  }, [deleted, added,edited]);

  const deleteTask = (id) => {
    setDeleted(true);
    const token = Cookies.get("token");
    axios
      .delete(`https://to-do-list-application-0y11.onrender.com/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
      })
      .catch((err) => console.log(err));
  };

  const addTask = (task) => {
    setAdded(true);
    handleAddClose();
    const token = Cookies.get("token");
    axios
      .post(`https://to-do-list-application-0y11.onrender.com/tasks`,task, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
      })
      .catch((err) => console.log(err));
  };

  const editTask = (id,task) => {
    setEdited(true);
    handleEditClose();
    const token = Cookies.get("token");
    axios
      .put(`https://to-do-list-application-0y11.onrender.com/tasks/${id}`,task, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
      })
      .catch((err) => console.log(err));
  };  
  const changeFormatDate = (d) => {
    const date = new Date(d);
    const pad = number=>{
        return number < 10 ? '0' + number : number;
      }
      const months=['January','February','March','April','May','June','July','August','September','Octobar','November','December'];
    const year = date.getFullYear();
const month = pad(date.getMonth());
const day = pad(date.getDate());
const formattedDate = `${day} ${months[parseInt(month)]}, ${year}`;
return formattedDate;
}

const logout=() => {
  Cookies.remove("token");
  navigate("/email")
}

  return (
    <div className="to-do-page">
      <div className="header">
        <h1 className="h1-to-do-page">To Do List <IconButton aria-label="delete" size="large" className="logout-button" onClick={logout}>
  <LogoutIcon fontSize="inherit" />
</IconButton></h1>
        <p>
          Effortlessly manage your <span>tasks</span> and stay organized with our intuitive
         <span> to-do list</span> application.
        </p>
      </div>
      <div className="new-button-container">
        <Button variant="contained" className="add-button" onClick={handleAddOpen}>
          New
        </Button>
      </div>
      <div className="search-tasks">
        <NewModal open={openAdd} handleAddClose={handleAddClose} addTask={addTask} />
        <EditModal open={openEdit} handleEditClose={handleEditClose} task={editData} setTask={setEditData} editTask={editTask} />
        <SearchModal open={openSearch} handleClose={handleSearchClose} />
        <div className="tasks">
          <div className="tasks-heading"><h1>Your tasks</h1><Button variant="contained" type="submit" className="submit-button" onClick={handleSearchOpen}>
            Search
          </Button></div>
          
          {!tasks.status ? (
            <div className="spinner-container">
              <CircularProgress className="spinner" />
            </div>
          ) : !tasks.tasks[0] ? (
            <div className="empty-tasks-container">You don't have any task</div>
          ) : (
            tasks.tasks.map((task) => (
              <div className="task" key={task.id}>
                <div style={{color:"gray"}}>Id: {task.id}</div>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <div className="task-icons">
                  <span>due date: {changeFormatDate(task.date)}</span>
                  <span
                    className={
                      "status " +
                      (task.status === "Pending"
                        ? "pending"
                        : task.status === "Completed"
                        ? "completed"
                        : "in-progress")
                    }
                  >
                    {task.status}
                  </span>
                </div>
                <div>
                  <IconButton
                    aria-label="delete"
                    variant="contained"
                    onClick={() => deleteTask(task.id)}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                  <IconButton aria-label="delete" variant="contained" onClick={()=>handleEditOpen(task.id,task.title,task.description,task.status,task.date)}>
                    <EditIcon color="success" />
                  </IconButton>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ToDo;
