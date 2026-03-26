import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import { Routes, Route} from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'

import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home.jsx'
import Admin from './pages/Admin'

import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='home' element={<Home />} />
        <Route path='admin' element={<Admin />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
