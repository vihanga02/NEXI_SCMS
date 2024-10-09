import React from 'react';
import './Signup.css';
import { useState } from 'react';

const Signup = () => {
  
  const [action, setAction] = useState("Login");

  const districts = ["Colombo", "Negombo", "Galle", "Matara", "Jaffna", "Trinco", "Kandy", "Kurunegala"];
  const cities = ["Colombo", "Kotte", "Dehiwala", "Moratuwa", "Nugegoda"];
  const routes = ["a", "b", "c", "d"];

  return (
    <div className='background'>
      <div className='signupbody'>
        <div className="signup-form-outer">
          <form className="signup-form-inner" action="" method="post" onSubmit={() => setAction('Sign')}>
            <h2>Sign Up</h2>
            
            <div className="form-group">
              <label htmlFor="fullname">Full Name:</label>
              <input type="text" id="fullname" name="fullname" placeholder="Enter full name" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" placeholder="Email Address" required />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number:</label>
              <input type="tel" id="phone" name="phone" placeholder="Phone number" required />
            </div>

            <div className="form-group">
              <label htmlFor="date">Birthday:</label>
              <input type="date" id="date" name="date" required />
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender:</label>
              <select name="gender" id="gender" required>
                <option value="" disabled selected>Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Rather not say">Rather not say</option>
              </select>
            </div>

            <div className="form-group">
              <label>Address:</label>
              <input type="text" placeholder="Address line 1" />
              <input type="text" placeholder="Address line 2" />
            </div>

            <div className="form-group">
              <label htmlFor="district">District:</label>
              <select name="districtSelect" id="district" required>
                <option value="" disabled selected>Select District</option>
                {districts.map((district) => (
                  <option value={district} key={district}>{district}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="city">City:</label>
              <select name="citySelect" id="city" required>
                <option value="" disabled selected>Select City</option>
                {cities.map((city) => (
                  <option value={city} key={city}>{city}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="route">Route from city to home:</label>
              <select name="route" id="route">
                <option value="" disabled selected>Select Route</option>
                {routes.map((route) => (
                  <option value={route} key={route}>{route}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="uname">Create Username:</label>
              <input type="text" id="uname" name="uname" placeholder="Username" required />
            </div>

            <div className="form-group">
              <label htmlFor="password">Create Password:</label>
              <input type="password" id="password" name="password" placeholder="Create Strong password" required />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Retype password" required />
            </div>

            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
