import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";



const EditModal = (props) => {
    const {handleEditClose,open,editTask,task,setTask} = props;
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
     const editT= ()=> {
        editTask(task.id,task)
       }
       editT();
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
    const changeFormatDate = (d) => {
        const date = new Date(d);
        const pad = number=>{
            return number < 10 ? '0' + number : number;
          }
        const year = date.getFullYear();
const month = pad(date.getMonth() + 1);
const day = pad(date.getDate());
const formattedDate = `${year}-${month}-${day}`;
return formattedDate;
    }
    return <Modal
    aria-labelledby="transition-modal-title"
    aria-describedby="transition-modal-description"
    open={open}
    onClose={handleEditClose}
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
        <h1>Edit Task</h1>
        <div>
        <TextField id="outlined-basic" label="Title" variant="outlined" name='title' value={task.title} onChange={onChange} required/>
        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={4}
          name='description' onChange={onChange}
          value={task.description}
          required
        />
        <select name="status" id="status" required value={task.status} onChange={onChange} className='select-input'>
    <option value="Pending">Pending</option>
    <option value="Completed">Completed</option>
    <option value="In-Progress">In Progress</option>
  </select>
        <input type="date" id="myDate" name="date" min={currentDate()} onChange={onChange} value={changeFormatDate(task.date)} className='date-input' required/>
          <Button variant="contained" className="add-button" type='submit'>
          Done
        </Button>
        </div>
      </form>
    </Fade>
  </Modal>
}

export default EditModal;