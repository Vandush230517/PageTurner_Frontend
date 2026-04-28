import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'

import App from './pages/App.jsx'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home.jsx'
import Admin from './pages/Admin'
import Book from './pages/Book.jsx'
import BookDetail from './pages/BookDetail'
import Profile from './pages/Profile'

import 'bootstrap/dist/css/bootstrap.min.css'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/home' element={<Home />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/books' element={<Book />} />
          <Route path='/book/:id' element={<BookDetail />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
