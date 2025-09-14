import React from 'react'
import Menubar from './components/Menubar/Menubar'
import { Route, Routes } from 'react-router-dom'
import Dashbord from './pages/Dashbord/Dashbord'
import ManageCategory from './pages/ManageCategory/ManageCategory'
import ManageUsers from './pages/ManageUsers/ManageUsers'
import ManageItems from './pages/ManageItems/ManageItems'
import Explore from './pages/Explore/Explore'

const App = () => {
  return (
    <div>
      <Menubar/>
      <Routes>
        <Route path='/dashbord' element={<Dashbord />} />
        <Route path='/category' element={<ManageCategory />} />
        <Route path='/users' element={<ManageUsers />} />
        <Route path='/items' element={<ManageItems />} />                
        <Route path='/explore' element={<Explore />} />
        <Route path='/' element={<Dashbord />} />
      </Routes>
    </div>
  )
}

export default App
