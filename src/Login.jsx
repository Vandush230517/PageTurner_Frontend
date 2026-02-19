import './css/Login.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from './assets/logo.png'





function Login() {
    const navigate = useNavigate()
    const[email , setEmail] = useState("")
    const[pw , setPw] = useState("")

    return (
        <>
        <div className="page">
  
          <div className="side"></div>
          <div className="center">
            
                <div className="form-container">
  
                <img src={Logo} alt="Logo" className="logo" />
                <button className='button login'onClick={()=>navigate('/login')}>Bejelentkezés</button>
                
                </div>
  
          </div>
          <div className="side"></div>
  
        </div>
      </>
      )
}
export default Login