import logo from './logo.svg';
import './App.css';
import Login from './pages/Login';

import Register from './pages/Register';
import Customer from './pages/Customer';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <customer/>,
    
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return (
    <div className="App">
      <div className='container'>
        <RouterProvider router={router} /> 
      </div>
    </div>
    

  );
}

export default App;
