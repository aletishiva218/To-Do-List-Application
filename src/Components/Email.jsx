import React from "react";
import {useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';


const Email = () => {
    const navigate = useNavigate();
    const [useremail,setUseremail] = useState("")
    const [clicked,setClicked] = useState(false)
    useEffect(()=>{
        const token = Cookies.get("token");
        if(token)   
            navigate("/todo")
    },[])
    const onChange = (event) => {
        setUseremail(event.target.value);
    }

    const onSubmit = (event)=>{
        event.preventDefault();
        setClicked(true)
        axios.post("https://to-do-list-application-0y11.onrender.com/email",{useremail:useremail}).then(response=>{
            const {token} = response.data;    
        Cookies.set("token",token)
        navigate("/todo")
        }).catch(err=>console.log(err))
    }
    return <div className="email-page">
        {
            (clicked)?<CircularProgress className="spinner" />:
            <form onSubmit={onSubmit}>
            <TextField id="standard-basic" label="email id" variant="standard" type="email"  onChange={onChange} required/>
            <Button variant="contained" type="submit" className="submit-button">Get Started</Button>
            </form>
        }
    </div>;
}

export default Email;