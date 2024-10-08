import React from 'react'
import './Signup.css';
import { useState } from 'react';
import photo from '../../assets/Login.webp';

const Signup = () => {
  
const [action, setAction] = useState("Login");

const districts = ["Colombo", "Negombo", "Galle", "Matara", "Jaffna", "Trinco", "Kandy", "Kurunegala"];
const cities = ["Colombo", "Kotte", "Dehiwala", "Moratuwa", "Nugegoda"];
const routes = ["a", "b", "c", "d"];

  return (

    <div className='background'>
        <div className='signupbody'>
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
                                <select name="DistrictSelect" id="district" required>
                                    <option value="" disabled selected>Select District</option>
                                    {districts.map((district) => (
                                        <option value={district}>{district}</option>))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>City :</td>
                            <td>
                                <select name="citySelect" id="city" required>
                                    <option value="" disabled selected>Select City</option>
                                    {cities.map((city) => (
                                        <option value={city}>{city}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Route from city to home :</td>
                            <td>
                                <select name="route" id="route">
                                    <option value="" disabled selected>Select Route</option>
                                    {routes.map((route) => (
                                        <option value={route}>{route}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Create Username :</td>
                            <td><input type="text" id="uname" name="uname" placeholder="Username" required/></td>
                        </tr>
                        <tr>
                            <td>Create Password :</td>
                            <td><input type="text" id="password" name="password" placeholder="Create Strong password" required/></td>
                        </tr>
                        <tr>
                            <td>Confirm Password :</td>
                            <td><input type="text" id="password" name="password" placeholder="Retype password" required/></td>
                        </tr>
                    </table>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    </div>
  )
}


export default Signup;