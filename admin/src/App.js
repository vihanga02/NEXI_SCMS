import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Login from './pages/Login/Login.js';
import Signup from './pages/Signup/Signup.js';

import Admindashboard from './pages/Admindashboard/Admindashboard.js';
import Driver from './pages/Driver/Driver.js';
import Assistant from './pages/Assistant/Assistant.js';
import Report from './pages/Report/Report.js';
import Order from './pages/Order/Order.js';
import DeliverySchedule from './pages/Delivery_schedule/DeliverySchedule.js';

import Sidebar from './components/Sidebar/Sidebar.js';
import Topbar from './components/Topbar/Topbar.js';

const App = () => {
  const location = useLocation();
  const hideSidebarAndTopbar = location.pathname === '/' || location.pathname === '/signup';

  return (
    <>
      {!hideSidebarAndTopbar && <Sidebar />}
      {!hideSidebarAndTopbar && <Topbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/admindashboard' element={<Admindashboard />} />
        <Route path='/driver' element={<Driver />} />
        <Route path='/assistant' element={<Assistant />} />
        <Route path='/order' element={<Order />} />
        <Route path='/delivery_schedule' element={<DeliverySchedule />} />
        <Route path='/report' element={<Report />} />
      </Routes>
    </>
  );
};

// Wrap the App component with Router outside
const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
