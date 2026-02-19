import './css/Register.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from './assets/logo.png'


function Register() {
    const navigate = useNavigate()
    const[name , setName] = useState("")
    const[email , setEmail] = useState("")
    const[pw , setPw] = useState("")
    const[pwagain , setPwAgain] = useState("")

    return (
        <>
        <div className="page">
  
          <div className="side"></div>
          <div className="center">
            
                <div className="form-container">
  
                <img src={Logo} alt="Logo" className="logo" />
                <input
                type="text"
                placeholder='Név'
                />
                <input
                type="text"
                placeholder='Email'
                />
                <input
                type="text"
                placeholder='Jelszó'
                />
                <input
                type="text"
                placeholder='Jelszó újra'
                />
                <button className='button register' onClick={()=>navigate('/register')}>Regisztráció</button>

                </div>
  
          </div>
          <div className="side"></div>
  
        </div>
      </>
      )
}
export default Register