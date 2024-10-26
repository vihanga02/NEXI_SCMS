import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar.js';
import Topbar from '../../components/Topbar/Topbar.js';
import './Report.css';

function Report() {
    const navigate = useNavigate();

    return (
        <div className='Rcontainer'>
            <Sidebar />
            <div className='rcontainer'>
                <Topbar />
                <div className='button-container'>
                    <button className='report-button' onClick={() => navigate('/report/quarterlysales')}>Quarterly Sales</button>
                    <button className='report-button' onClick={() => navigate('/report/mostorders')}>Most Orders</button>
                    <button className='report-button' onClick={() => navigate('/report/maincitiesreports')}>Reports of Main Cities</button>
                    <button className='report-button' onClick={() => navigate('/report/hoursofdrivers')}>Driver Working Hours</button>
                    <button className='report-button' onClick={() => navigate('/report/hoursofassistants')}>Assistants Working Hours</button>
                    <button className='report-button' onClick={() => navigate('/report/usedhoursoftrucks')}>Used Hours of Trucks</button>
                    <button className='report-button' onClick={() => navigate('/report/customerorderreports')}>Customer Order Reports</button>
                    <button className='report-button' onClick={() => navigate('/report/reportsofroutes')}>Reports of Routes</button>
                </div>
            </div>
        </div>
    );
}

export default Report;