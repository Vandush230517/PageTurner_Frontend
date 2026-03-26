import { Link } from 'react-router-dom'
import Gomb from "./Gomb";
import Logo from '../assets/logo.png'

export default function NavBar({ user, onLogout }) {
  const isLoggedIn = !!user
  const isAdmin = user?.role === 'admin'

  return (
    <div className="container-fluid px-4" style={{ backgroundColor: '#AC703B', height: 100 }}>
    <div className="d-flex align-items-center justify-content-between h-100 px-3">

      {/* logo */}
      <img src={Logo} alt="logo" style={{ height: 70, width: 'auto' }} />

      {/* menü sáv */}
      <div className="d-flex align-items-center" style={{ gap: 10 }}>

        {isLoggedIn ? (
          <>
            <Link to='/profile' className='px-3 py-1 text-decoration-none rounded text-dark fs-5 mt-2'>Fiókom</Link>

            {isAdmin && <Link to='/admin' className='px-3 py-1 text-decoration-none rounded text-dark fs-5 mt-2'>Admin panel</Link>}

            <Gomb szin='btn btn-dark px-4 mb-4' onClick={onLogout} text='Kijelentkezés' />
          </>
        ) : (
          <Link to='/login' className='btn btn-dark px-4'>Bejelentkezés</Link>
        )}
      </div>

    </div>
  </div>
  )
}