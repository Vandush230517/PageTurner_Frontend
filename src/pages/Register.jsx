import '../css/Register.css'
import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Logo from '../assets/logo.png'
import InputMezo from '../components/InputMezo'
import Gomb from '../components/Gomb'
import { register } from '../api'



export default function Register() {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [pw, setPw] = useState("")
  const [pwagain, setPwAgain] = useState("")

  const [hiba, setHiba] = useState('')
  const [uzenet, setUzenet] = useState('')

  async function onReg() {
    setHiba('')
    setUzenet('')

    if (!email || !name || !pw || !pwagain) {
      return setHiba('Minden mezot tolts ki')
    }
    try {
      const data = await register(name, pw, email)
      if (data.error) {
        setHiba(data.error)
      }
      setUzenet(data.message)
    }
    catch (err) {
      setHiba('Nem sikerult kapcsolodni a backendhez')
    }
  }


  return (
    <>
      <div className="page">

        <div className="side"></div>
        <div className="left">
          <div className="container text-center">
          <img src={Logo} alt="" />
          <h2>Regisztráció</h2>
          <form className='form'>
            {hiba && <div className="alert alert-danger text-center my-2">{hiba}</div>}
            {uzenet && <div className="alert alert-success text-center my-2">{uzenet}</div>} 
            <InputMezo label='E-mail' type='email' value={email} setValue={setEmail} placeholder='example@example.com' />
            <InputMezo label='Felhasználónév' type='text' value={name} setValue={setName} placeholder='Jhon DOe' />
            <InputMezo label='Jelszó' type='password' value={pw} setValue={setPw} placeholder='*****' />
            <InputMezo label='Jelszó megerősítése' type='password' value={pwagain} setValue={setPwAgain} placeholder='*****' />
            </form>
            <div className="text-center mt-5">
              <Gomb szin='btn btn-dark px-4' onClick={onReg} text='Regisztráció' />
            </div>
            <div className="text-center mt-3">
                <Link to='/login' className="text-dark text-decoration-none">Már van fiókom</Link>
            </div>
          </div>
        </div>
        <div className="side"></div>

      </div>
    </>
  )
}
