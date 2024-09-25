// import './App.css';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Customer from './pages/Customer';
// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Customer />,
    
//   },
//   {
//     path: "/register",
//     element: <Register />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
// ]);

// function App() {
//   return (
//     <div className="App">
//       <div className='container'>
//         <RouterProvider router={router} /> 
//       </div>
//     </div>
    

//   );
// }

// export default App;


// // // Register.js
// // import React from 'react';
// // import Login from './pages/Login';

// // export default function App() {
// //   return (
// //     <div>
// //       <Login />
// //     </div>
// //   );
// // }


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';

import Register from './pages/Register';
import Customer from './pages/Customer';
import Navbar from './pages/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/customer" element={<Customer />} />
      </Routes>
    </Router>
  );
};

export default App;