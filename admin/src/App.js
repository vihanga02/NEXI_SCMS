import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login/Login.js';
import Signup from './pages/Signup/Signup.js';
import axios from 'axios';

import Admindashboard from './pages/Admindashboard/Admindashboard.js';
import Driver from './pages/Driver/Driver.js';
import Assistant from './pages/Assistant/Assistant.js';
import Report from './pages/Report/Report.js';
import Order from './pages/Order/Order.js';
import DeliverySchedule from './pages/Delivery_schedule/DeliverySchedule.js';
import QuarterlySales from './pages/QuarterlySales/QuarterlySales.js';
import MostOrders from './pages/MostOrders/MostOrders.js';
import MainCitiesReports from './pages/MainCitiesReports/MainCitiesReports.js';
import HoursOfDrivers from './pages/HoursOfDrivers/HoursOfDrivers.js';
import HoursofAssistants from './pages/HoursOfAssistants/HoursOfAssistants.js';
import data from './data.json';
const path = data.backend;
axios.defaults.baseURL = path;
const App = () => {
  return (
    <>
      
      <Routes>
        
        
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/admindashboard' element={<Admindashboard/>}/>
        <Route path='/driver' element={<Driver/>}/>
        <Route path='/assistant' element={<Assistant/>}/>
        <Route path='/order' element={<Order/>}/>
        <Route path='/delivery_schedule' element={<DeliverySchedule/>}/>
        <Route path='/report' element={<Report/>}/>
        <Route path='report/quarterlysales' element={<QuarterlySales/>}/>
        <Route path='report/mostorders' element={<MostOrders/>}/>
        <Route path='report/maincitiesreports' element={<MainCitiesReports/>}/>
        <Route path='report/hoursofdrivers' element={<HoursOfDrivers/>}/>
        <Route path='report/hoursofassistants' element={<HoursofAssistants/>}/>
        
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
