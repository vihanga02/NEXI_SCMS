
import Sidebar from '../../components/Sidebar/Sidebar.js'
import Topbar from '../../components/Topbar/Topbar.js';
import './Driver.css'
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Driver() {


  const navigate = useNavigate();


  useEffect(() => {
    axios.get("/admin/profile",{withCredentials:true})
    .then((response) => {
    })
    .catch((error) => {
      navigate("/"); 
        console.error("Error fetching customer profile:", error);
    });
  }, []); 



  return (
    <div className='Dcontainer'>
      <div className='dcontainer'>
      </div>
    </div>
  )
}

export default Driver