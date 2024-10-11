import React from 'react'
import Sidebar from '../../../components/Sidebar/Sidebar.js'
import './AdminDashboard.css';
import admin from '../../../assets/admin.jpg';

function AdminDashboard() {
  return (
    <div className='cc'>
    <div className='left'>
      <Sidebar/>
    </div>
    <div className='right'>
        <div className='top'>
        <h1>Welcome MUTHU</h1>
        
        </div>
        <div className='bottom'>
        <img
            src={admin}  // Path to your actual logo image
            alt='admin'
            className='admin'
          />
        </div>
    </div>
</div>

  )
}

export default AdminDashboard