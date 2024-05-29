import React from "react";
import {Routes,BrowserRouter,Route} from "react-router-dom";
import Protected from "./Components/Protected";
import ToDo from "./Components/ToDo";
import Email from "./Components/Email";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ChangeRoute = () =>{
    const navigate = useNavigate();
    useEffect(()=>{
       navigate("/todo")
    },[])
    return null;
}

const App = () => {
    return <BrowserRouter>
    <Routes>
    <Route path="/" element={<ChangeRoute />} />
        <Route path="/todo" element={<Protected Component={<ToDo />} />} />
        <Route path="/email" element={<Email />} />
    </Routes>
    </BrowserRouter>
}

export default App;