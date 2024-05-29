import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const Protected = (props) => {
    const {Component} = props;
    const navigate = useNavigate();
    useEffect(()=>{
        const token = Cookies.get("token");
        if(!token)
            navigate("/email")
    axios
      .get("https://to-do-list-application-0y11.onrender.com/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
      })
      .catch((err) => {
        if(err.response.data.message && err.response.data.message==="user not exists")
          {
            Cookies.remove("token")
            navigate("/email")
          }
      });
    },[])
    return Component;
}

export default Protected;