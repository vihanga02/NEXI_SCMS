import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar.js'
import Topbar from '../../components/Topbar/Topbar.js';
import './Driver.css'

function Driver() {
  return (
    <div className='Dcontainer'>
      <Sidebar />
      <div className='dcontainer'>
        <Topbar/>
      </div>
    </div>
  )
}

export default Driver