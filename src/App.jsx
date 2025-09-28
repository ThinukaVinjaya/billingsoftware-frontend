import React, { useEffect, useLayoutEffect } from 'react'
import Menubar from './components/Menubar/Menubar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Dashbord from './pages/Dashbord/Dashbord'
import ManageCategory from './pages/ManageCategory/ManageCategory'
import ManageUsers from './pages/ManageUsers/ManageUsers'
import ManageItems from './pages/ManageItems/ManageItems'
import Explore from './pages/Explore/Explore'
import { Toaster } from 'react-hot-toast'
import Login from './pages/Login/Login'
import OrderHistory from './pages/OrderHistory/OrderHistory'

const App = () => {
   
   const location = useLocation();

  return (
    <div>
      {location.pathname !== "/login" && <Menubar />}
      <Toaster/>
      <Routes>
        <Route path='/dashbord' element={<Dashbord />} />
        <Route path='/category' element={<ManageCategory />} />
        <Route path='/users' element={<ManageUsers />} />
        <Route path='/items' element={<ManageItems />} />                
        <Route path='/explore' element={<Explore />} />
        <Route path='/login' element={<Login />} />
        <Route path='/orders' element={<OrderHistory />} />
        <Route path='/' element={<Dashbord />} />

      </Routes>
    </div>
  )
}

export default App
