import '../css/App.css'
import { useState } from 'react'
import { Link,  useNavigate } from "react-router-dom";
import Logo from '../assets/logo.png'
import InputMezo from '../components/InputMezo'
import Gomb from '../components/Gomb'
import { login } from '../api'

export default function Login() {
  const navigate = useNavigate()

  const [email, setEmail] =useState('')
  const [psw, setPsw] = useState('')

  const [hiba, setHiba] = useState('')
  const [uzenet, setUzenet] = useState('')

  async function onLog() {
    setHiba('')
    setUzenet('')

    if (!email || !psw ) {
      return setHiba('Minden mezot tolts ki')
    }
    try {
      const data = await login(email,psw)
      if (data.error) {
        setHiba(data.error)
        return
      }
      setUzenet(data.message)
      setTimeout(() => navigate('/home'), 1000)
      
    }
    catch (err) {
     // console.log(err);
      setHiba('Nem sikerult kapcsolodni a backendhez')
    }
  }


  return (
    <>
      <div className="page">

        <div className="side"></div>
        <div className="center">

          <div className="container text-center">
            {hiba && <div className="alert alert-danger text-center my-2">{hiba}</div>}
            {uzenet && <div className="alert alert-success text-center my-2">{uzenet}</div>}

            <img src={Logo} alt="" />
            <InputMezo label='E-mail' type='email' value={email} setValue={setEmail} placeholder='example@example.com' />
            
            <InputMezo label='Jelszó' type='password' value={psw} setValue={setPsw} placeholder='*****' />
            
            <div className="text-center mt-5">
              <Gomb szin='btn btn-dark px-4' onClick={onLog} text='Bejelentkezés' />
            </div>

          </div>
          <div className="text-center mt-3">
                
                <Link to='/home'className="text-dark text-decoration-none">Vissza a főoldalra</Link>
            
            </div>
            <div className="text-center mt-2">
                <Link to='/register' className="text-dark text-decoration-none">Még nincs fiókom</Link>
            
            </div>



        </div>
        <div className="side"></div>

      </div>
    </>
  )
}
