import { Link } from 'react-router-dom'
import Gomb from "./Gomb";
import '../css/navbar.css'
import Logo from '../assets/logo.png'

export default function NavBar({ user, onLogout }) {
    const isLoggedIn = !!user
   //console.log(isLoggedIn)
    const isAdmin = user?.role === 'admin'


    return (
        <div className="container-fluid px-4 hatterNavBar">
            <div className="d-flex align-items-center justify-content-between py-3">
                {/* logo */}
                <img src={Logo} alt="logo" className='img img-fluid'  />

                {/* menü sáv */}
                <div className="d-flex align-items-center gap-3">

                    {isLoggedIn ? (
                        <>
                            {/* Fiókom oldal */}
                            <Link to='/profile' className='px-3 py-1 text-decoration-none rounded text-dark fs-4'>Fiókom</Link>

                            {/* Admin oldal */}
                            {isAdmin && <Link to='/admin' className='px-3 py-1 text-decoration-none rounded text-dark fs-4'>Admin panel</Link>}

                            {/* Logout */}
                            <Gomb szin='btn btn-dark px-4 gomb' onClick={onLogout} text='Kijelentkezés'/>
                        </>
                    ) : (
                        <>
                            {/* login */}
                                <Link to='/login' className='btn btn-dark px-4'>Bejelentkezés</Link>
                        </>
                    )}
                </div>
            </div>

          
        </div>
    )
}