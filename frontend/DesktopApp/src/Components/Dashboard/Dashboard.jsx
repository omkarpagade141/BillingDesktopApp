import React from 'react'
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import NavigationBar from '../Navbar/NavigationBar'
import BillingHome from '../BilliingHome/BillingHome'
import Category from '../Category/Category';
import Products from '../Prodoucts/Products';
import ReportPage from '../Reports/ReportPage';

function Dashboard({settings}) {
  return (
    <>
    <NavigationBar settings={settings} /> 
    <div style={{ paddingTop: '40px' }}>
     
      <Routes>
        <Route path="/" element={<BillingHome settings={settings}/>} />
        <Route path="/category" element={<Category settings={settings} />} />
        <Route path="/products" element={<Products settings={settings} />} />
        <Route path="/reports" element={<ReportPage settings={settings} />} />
      </Routes>
      <Outlet />  
    </div>
    </>
  )
}

export default Dashboard
