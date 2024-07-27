import React, { useEffect, useState } from 'react';
import './login.css';
import axios from 'axios'
import theme from '../Themes.js'; // Adjust the path to your theme.js

function Login({settings}) {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  useEffect(() => {
    // Set CSS custom properties
    document.documentElement.style.setProperty('--primary-color', theme.palette.primary.main);
    document.documentElement.style.setProperty('--primaryDarker-color', theme.palette.primary.darker);
    document.documentElement.style.setProperty('--secondary-color', theme.palette.secondary.main);
    document.documentElement.style.setProperty('--background-color', theme.palette.background.default);
  }, []);

  const handleLogin= async (event)=>{
    event.preventDefault()
    console.log(email,password)
    try {
      const response = await axios.post(' http://localhost:8080/api/user/login', {
        'userName': `${email}`,
        'userPassword': `${password}`
      })
      console.log(response)
      if ( response.status == 200 ) {
        window.location.href = '/dashboard';
        
      }
      else{
      console.log('@@@@@@@@@@@@@@@@@@@');
      }
      
      
    } catch (error) {
      console.log(error);
      
    }

  }

  return (
    <div className="loginBodyDiv">
      <div className="login-form-container">
        <form className="login-form" onSubmit={(event)=>handleLogin(event)}>
          <h2 className="form-title">Login</h2>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" required 
            onChange={(e)=>setEmail(e.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Enter your password" required 
            onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          <button type="submit" className="submit-button">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
