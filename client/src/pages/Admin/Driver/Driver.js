
import Sidebar from '../../../components/Sidebar/Sidebar'
import './Driver.css'
import React, { useState } from 'react';

function Driver() {

    // Example driver data (can be fetched from API)
    const drivers = [
        { id: 1, name: 'A-muthu', Tel_number: 'A',  status: 'Available',workinghours:'0' },
        { id: 2, name: 'B-muthu', Tel_number: 'B',  status: 'Available',workinghours:'0'  },
        { id: 3, name: 'C-muthu', Tel_number:'C',  status: 'Available',workinghours:'0'  },
        { id: 4, name: 'D-muthu', Tel_number: 'D',  status: 'Available',workinghours:'0'  },
        { id: 5, name: 'E-muthu', Tel_number: 'E', status: 'Busy' ,workinghours:'0' },
        { id: 6, name: 'F-muthu', Tel_number:'F', status: 'Busy' ,workinghours:'0' },
        { id: 7, name: 'G-muthu', Tel_number: 'G', status: 'Out of Service',workinghours:'0'  }
    ];

    


    return (
        <div className='dcontainer'>
            <div className='leftdriver'>
                <Sidebar activePanel ={0}/>
            </div>
            <div className='rightdriver'>

                <div className="shipment-task-container">
                    <h2>Driver details</h2>
                    <p>Store Name</p>


                    <table className="driver-table">
                        <thead>
                            <tr>
                                <th>Drivers</th>
                                <th>Tel_number</th>
                                <th>status</th>
                                
                                <th>Working hours</th>
                            </tr>
                        </thead>
                        <tbody>
                            {drivers.map(driver => (
                                <tr key={driver.id}>
                                    <td>{driver.name}</td>
                                    <td>{driver.Tel_number}</td>
                                    
                                    <td className={driver.status.toLowerCase()}>{driver.status}</td>
                                    <td>{driver.workinghours}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    
            </div>


            


        </div>
    </div>
    
  )
}

export default Driver