
import Sidebar from '../../../components/Sidebar/Sidebar'
import './Assistant.css'
import React, { useState } from 'react';

function Assistant() {

    // Example driver data (can be fetched from API)
    const assistants = [
        { id: 1, name: 'A-muthu', Tel_number: 'A',  status: 'Available',workinghours:'0' },
        { id: 2, name: 'B-muthu', Tel_number: 'B',  status: 'Available',workinghours:'0'  },
        { id: 3, name: 'C-muthu', Tel_number:'C',  status: 'Available',workinghours:'0'  },
        { id: 4, name: 'D-muthu', Tel_number: 'D',  status: 'Available',workinghours:'0'  },
        { id: 5, name: 'E-muthu', Tel_number: 'E', status: 'Busy' ,workinghours:'0' },
        { id: 6, name: 'F-muthu', Tel_number:'F', status: 'Busy' ,workinghours:'0' },
        { id: 7, name: 'G-muthu', Tel_number: 'G', status: 'Out of Service',workinghours:'0'  }
    ];

    


    return (
        <div className='acontainer'>
            <div className='leftadriver'>
                <Sidebar activePanel ={3}/>
            </div>
            <div className='rightadriver'>

                <div className="shipment-task-container">
                    <h2>Assistant details</h2>
                    <p>Store Name</p>


                    <table className="assistant-table">
                        <thead>
                            <tr>
                                <th>Assistants</th>
                                <th>Tel_number</th>
                                <th>status</th>
                                
                                <th>Working hours</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assistants.map(assistant => (
                                <tr key={assistant.id}>
                                    <td>{assistant.name}</td>
                                    <td>{assistant.Tel_number}</td>
                                    
                                    <td className={assistant.status.toLowerCase()}>{assistant.status}</td>
                                    <td>{assistant.workinghours}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    
            </div>


            


        </div>
    </div>
    
  )
}

export default Assistant