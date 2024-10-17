import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar.js'
import Topbar from '../../components/Topbar/Topbar.js';
import './Assistant.css';

function Assistant() {
  return (
    <div className='AScontainer'>
      <Sidebar />
      <div className='Ascontainer'>
        <Topbar/>
      </div>
    </div>
  )
}

export default Assistant