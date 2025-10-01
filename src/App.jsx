import React, { useContext } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import Menubar from './components/Menubar/Menubar'
import Dashbord from './pages/Dashbord/Dashbord'
import ManageCategory from './pages/ManageCategory/ManageCategory'
import ManageUsers from './pages/ManageUsers/ManageUsers'
import ManageItems from './pages/ManageItems/ManageItems'
import Explore from './pages/Explore/Explore'
import Login from './pages/Login/Login'
import OrderHistory from './pages/OrderHistory/OrderHistory'

// ✅ Import your AppContext (not AppConstants)
import { AppContext } from './context/AppContext'
import NotFound from './pages/NotFound/NotFound'

const App = () => {
  const location = useLocation()
  const { auth } = useContext(AppContext) // ✅ Correct usage

  // ✅ Route wrapper for login
  const LoginRoute = ({ element }) => {
    if (auth?.token) {
      return <Navigate to="/dashbord" replace />
    }
    return element
  }

  // ✅ Route wrapper for protected routes
  const ProtectedRoute = ({ element, allowedRoles }) => {
    if (!auth?.token) {
      return <Navigate to="/login" replace />
    }
    if (allowedRoles && !allowedRoles.includes(auth?.role)) {
      return <Navigate to="/dashbord" replace />
    }
    return element
  }

  return (
    <div>
      {location.pathname !== '/login' && <Menubar />}
      <Toaster />
      <Routes>
        <Route path="/dashbord" element={<Dashbord />} />
        <Route path="/explore" element={<Explore />} />

        <Route
          path="/category"
          element={<ProtectedRoute element={<ManageCategory />} allowedRoles={['ROLE_ADMIN']} />}
        />
        <Route
          path="/users"
          element={<ProtectedRoute element={<ManageUsers />} allowedRoles={['ROLE_ADMIN']} />}
        />
        <Route
          path="/items"
          element={<ProtectedRoute element={<ManageItems />} allowedRoles={['ROLE_ADMIN']} />}
        />

        <Route path="/login" element={<LoginRoute element={<Login />} />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/" element={<Dashbord />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
