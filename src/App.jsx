import './css/App.css'
import Logo from './assets/logo.png'
import { useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate()

  return (
    <>
      <div className="page">

        <div className="side"></div>
        <div className="center">
          
              <div className="form-container">

              <img src={Logo} alt="Logo" className="logo" />
              <button className='button login'onClick={()=>navigate('/login')}>Bejelentkezés</button>
              <button className='button register' onClick={()=>navigate('/register')}>Regisztráció</button>
             
              </div>

        </div>
        <div className="side"></div>

      </div>
    </>
  )
}

export default App
