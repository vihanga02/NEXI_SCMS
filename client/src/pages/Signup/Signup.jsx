import React from 'react'
import './Signup.css';
import { useState } from 'react';

const Signup = () => {
  
  const [action, setAction] = useState("Login");
  
  return (

    <div>
      <div class="signup-form-heading">Be a registered member of Nexi family !!</div>
    <div class="signup-form-outer">
        <form class="signup-form-inner" action="" method="post" onsubmit={()=>setAction('Sign')}>    
            <h2>Sign Up</h2>                    
            <table>
                <tr>
                    <td>Full name :</td><td><input type="text" id="fullname" name="fullname" placeholder="Enter full Name" required/></td>
                </tr>                
                <tr>
                    <td>Email :</td><td><input type="email" id="email" name="email" placeholder="Email Address" required/></td>
                </tr>
                <tr>
                    <td>Phone number :</td><td><input type="phone number" id="phone number" name="phone number" placeholder="Phone number" required/></td>
                </tr>
                <tr>
                    <td>Birthday :</td><td><input type="date" id="date" name="date" required/></td>
                </tr>
                <tr>
                    <td>Gender :</td>
                    <td>
                        <select name="Gender" id="gender" required>
                            <option value="" disabled selected>Select gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Rather not say">Rather not say</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td >Address :</td><td><input type="Address" placeholder="Address line 1"/><br/><input type="Address" placeholder="Address line 2"/></td>
                </tr>
                <tr>
                    <td>District :</td>
                    <td>
                        <select name="DistrictSelect" id="district" onchange="populateCities()" required>
                            <option value="" disabled selected>Select District</option>
                            <option value="Colombo">Colombo</option>
                            <option value="Negombo">Negombo</option>
                            <option value="Galle">Galle</option>
                            <option value="Matara">Matara</option>
                            <option value="Jaffna">Jaffna</option>
                            <option value="Trinco">Trinco</option>
                            <option value="Kandy">Kandy</option>
                            <option value="Kurunegala">Kurunegala</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>City :</td>
                    <td>
                        <select name="citySelect" id="city" onchange="populateRoutes()" required>
                            <option value="" disabled selected>Select city</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Route from city to home :</td>
                    <td>
                        <select name="route" id="route">
                            <option value="" disabled selected>Select Route</option>
                        </select>
                    </td>
                </tr>
            </table>   
            <button type="submit">Sign Up</button>
        </form>
    </div>
    <script src="index.js"></script>
      
    </div>
  )
}


export default Signup;