import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar.js'
import Topbar from '../../components/Topbar/Topbar.js';
import './Order.css'

function Order() {
  return (
    <div className='Ocontainer'>
    <Sidebar />
    <div className='ocontainer'>
      <Topbar/>
    </div>
  </div>
  )
}

export default Order