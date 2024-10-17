import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar.js'
import Topbar from '../../components/Topbar/Topbar.js';
import './Delivery_schedule.css'

function delivery_schedule() {
  return (
    <div className='DScontainer'>
      <Sidebar />
      <div className='dscontainer'>
        <Topbar/>
        <div className='datebutton'>
          <input className='datebutton' type='date' placeholder='Select date'/>
        </div>
      </div>
    </div>
  )
}

export default delivery_schedule