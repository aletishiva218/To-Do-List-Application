import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Cookies from 'js-cookie';
import axios from 'axios';
import CircularProgress from "@mui/material/CircularProgress";


const SearchModal = (props) => {
    const {handleClose,open} = props;
    const [id,setId] = useState("");
    const [task,setTask] = useState({status:null})
    const [submit,setSubmit] = useState(false)
    const onChange = (event) => {
      setId(event.target.value)
    }
    const onSubmit = (event) => {
      event.preventDefault();
      setSubmit(true)
      setTask({status:null})
      const token = Cookies.get("token");
      axios
        .get(`https://to-do-list-application-0y11.onrender.com/tasks/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
            setTask(response.data)
            setSubmit(false)
        })
        .catch((err) =>{
            setTask(err.response.data)
            setSubmit(false)
        });
    }

    const clearAndClose = () => {
        setTask({status:null})
        setSubmit(false)
        return handleClose()
    }

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

    return <Modal
    aria-labelledby="transition-modal-title"
    aria-describedby="transition-modal-description"
    open={open}
    onClose={
       clearAndClose
}
    closeAfterTransition
    slots={{ backdrop: Backdrop }}
    slotProps={{
      backdrop: {
        timeout: 500,
      },
    }}
  >
    <Fade in={open}>
      <form className='new-form bg-dark-light' onSubmit={onSubmit}>
        <h1 className='color-primary'>Search Task</h1>
        <div>
        <TextField id="outlined-basic" label="Enter Id..." variant="outlined" name='id' onChange={onChange} required/>
          <Button variant="contained" className="add-button" type='submit'>
          Search
        </Button>
        </div>
        {
            (task.status)? <div className="task">
            <h3>{task.task.title}</h3>
            <p>{task.task.description}</p>
            <div className="task-icons">
              <span>due date: {changeFormatDate(task.task.date)}</span>
              <span
                className={
                  "status " +
                  (task.task.status ==="Pending"
                    ? "pending"
                    : task.task.status === "Completed"
                    ? "completed"
                    : "in-progress")
                }
              >
                {task.task.status}
              </span>
            </div>
          </div>:(task.status===false)?<div style={{color:"red",textAlign:"center"}}>not found with this Id</div>:(submit===true)?<div className='just-self-container'><CircularProgress className="just-start" /></div>:null
        }
      </form>
    </Fade>
  </Modal>
}

export default SearchModal;