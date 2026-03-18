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
        <img src={Logo} alt="logo" style={{ height: 50, width: 'auto' }} />

        {/* kereső form */}
        <form className="d-flex align-items-center" style={{ maxWidth: 400, flex: 1, marginLeft: 20, marginRight: 20 }}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>

        {/* menü sáv */}
        <div className="d-flex align-items-center" style={{ gap: 10 }}>

          {isLoggedIn ? (
            <>
              <Link to='/profile' className='px-3 py-1 text-decoration-none rounded text-dark fs-5'>Fiókom</Link>

              {isAdmin && <Link to='/admin' className='px-3 py-1 text-decoration-none rounded text-dark fs-5'>Admin panel</Link>}

              <Gomb szin='btn btn-dark px-4' onClick={onLogout} text='Kijelentkezés' />
            </>
          ) : (
            <Link to='/login' className='btn btn-dark px-4'>Bejelentkezés</Link>
          )}
        </div>

      </div>
    </div>
  )
}