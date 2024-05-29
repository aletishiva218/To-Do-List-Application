import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";



const NewModal = (props) => {
    const {handleAddClose,open,addTask} = props;
    const [task,setTask] = useState({title:"",description:"",date:""});
    const onChange = (event) => {
      const {name,value} = event.target;
      setTask(prevTask=>{
        return {
          ...prevTask,
          [name]:value
        }
      })
    }

    const onSubmit = (event) => {
      event.preventDefault();
     const addT= ()=> {
        addTask(task)
        console.log(task)
       }
       addT();
    }
    const currentDate = () => {
      const today = new Date();
const pad = number=>{
  return number < 10 ? '0' + number : number;
}
const year = today.getFullYear();
const month = pad(today.getMonth() + 1);
const day = pad(today.getDate());
const formattedDate = `${year}-${month}-${day}`;
return formattedDate
    }
    return <Modal
    aria-labelledby="transition-modal-title"
    aria-describedby="transition-modal-description"
    open={open}
    onClose={handleAddClose}
    closeAfterTransition
    slots={{ backdrop: Backdrop }}
    slotProps={{
      backdrop: {
        timeout: 500,
      },
    }}
  >
    <Fade in={open}>
      <form className='new-form' onSubmit={onSubmit}>
        <h1  className='color-primary'>New Task</h1>
        <div>
        <TextField id="outlined-basic" label="Title" variant="outlined" name='title' onChange={onChange} required/>
        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={4}
          name='description' onChange={onChange}
          required
        />
        <input type="date" id="myDate" name="date" min={currentDate()} onChange={onChange} className='date-input' required/>
          <Button variant="contained" className="add-button" type='submit'>
          Add
        </Button>
        </div>
      </form>
    </Fade>
  </Modal>
}

export default NewModal;