import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import theme from './Components/Themes.js'
import Login from './Components/Login/Login.jsx';
import Dashboard from './Components/Dashboard/Dashboard.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './assets/assetsLocal/loginBg.jpg'

function App() {
  const [settings,setSettings]=useState({
    settingid:'1',
business_name:'sdfghbgvc',
business_mobile:'7249772495',
business_email:'omkarpagade141@gmail.com',
business_address:'Wagholi',
business_gst_number:'12121212',
business_logo: logo


  })
  // useEffect(()=>{
  //   axios.get('http://localhost:3001/api/getSettings')
  // })

  
   

  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <div>
            <Routes>
              <Route path="/" element={<Login settings={settings} />} />
              <Route path="/dashboard/*" element={<Dashboard  settings={settings}/>} />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </>

  )
}

export default App
