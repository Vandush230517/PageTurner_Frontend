import { Link, useLocation } from 'react-router-dom'
import Gomb from "./Gomb";
import Logo from '../assets/logo.png'

export default function NavBar({ user, onLogout, onBooks }) {
  const isLoggedIn = !!user
  const isAdmin = user?.role === 'admin'
  const { pathname } = useLocation()

  const navLinkClass = (path) =>
    `px-3 py-1 text-decoration-none rounded fs-5 ${pathname === path ? 'text-white fw-bold' : 'text-dark'}`

  return (
    <nav className="navbar navbar-expand-lg px-4" style={{ backgroundColor: '#AC703B' }}>
      <div className="container-fluid">

        {/* logo */}
        <Link to='/home' className="navbar-brand">
          <img src={Logo} alt="logo" style={{ height: 70, width: 'auto' }} />
        </Link>

        {/* hamburger gomb */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* menü */}
        <div className="collapse navbar-collapse" id="navMenu">
          <div className="d-flex align-items-center ms-auto gap-2 flex-wrap py-2">

            {isLoggedIn ? (
              <>
                <Link to='/profile' className={navLinkClass('/profile')}>Fiókom</Link>

                {isAdmin && (
                  <Link to='/admin' className={navLinkClass('/admin')}>Admin panel</Link>
                )}


                <Link to='/books' className={navLinkClass('/books')}>Összes könyv</Link>
                <Gomb szin='btn btn-dark px-4' onClick={onLogout} text='Kijelentkezés' />
              </>
            ) : (
              <Link to='/login' className='btn btn-dark px-4'>Bejelentkezés</Link>
            )}

          </div>
        </div>

      </div>
    </nav>
  )
}