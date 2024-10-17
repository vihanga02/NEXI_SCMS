import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar.js'
import Topbar from '../../components/Topbar/Topbar.js';
import './Report.css'

function Report() {
  return (
    <div className='Rcontainer'>
      <Sidebar />
      <div className='rcontainer'>
        <Topbar/>
       
      </div>
    </div>
  )
}

export default Report