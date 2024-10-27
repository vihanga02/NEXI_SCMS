import './Assistant.css';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Assistant() {
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
    <div className='AScontainer'>
      <div className='Ascontainer'>
      </div>
    </div>
  )
}

export default Assistant