import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Card from '../components/Card'

import { whoAmI, logout } from '../api'



export default function Home() {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [errorUser, setErrorUser] = useState('')

    const [randomBooks, setRandomBooks] = useState([]) 
    const [userRatedBooks, setUserRatedBooks] = useState([])

    useEffect(() => {
        async function loadUser() {
            const data = await whoAmI()

            if (data.error) {
                setUser(null)
                setErrorUser(data.error)
            } else {
                setUser(data)
                setErrorUser('')

                fetch("http://localhost:3000/book/userRatedBooks", {
                    credentials: 'include'
                })
                .then(res => res.ok ? res.json() : [])
                .then(data => setUserRatedBooks(data))
                .catch(() => setUserRatedBooks([]))
            }
        }

        loadUser()

        fetch("http://localhost:3000/book/randomBooks")
            .then(res => res.json())
            .then(data => setRandomBooks(data))
            .catch(() => setRandomBooks([]))
    }, [])

    async function onLogout() {
        const data = await logout()
        if (data?.error) setErrorUser(data.error)
        setUser(null)
        navigate('/')
    }

    async function onBooks() {
        navigate('/books')
    }

    return (
        <div style={{ backgroundColor: '#EFCEA8', minHeight: '100vh'}}>
            <NavBar user={user} onLogout={onLogout} onBooks={onBooks} />
            {errorUser && <div className="alert alert-danger text-center my-2">{errorUser}</div>}

            <div className="container py-4">
                <div className="row justify-content-between">
                    
                    {/* BAL OLDAL */}
                    <div className="col-12 col-lg-5">
                        <div className="p-3 rounded" style={{ backgroundColor: '#f0e5d8' }}>
                            <h4 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Könyvek:</h4>
                            {randomBooks.map((book, index) => (
                                <Card
                                    key={`${book.book_id}-${index}`}
                                    image={`http://127.0.0.1:3000/${book.cover}`}
                                    title={book.title}
                                    author={book.author}
                                    ratings={book.ratings}
                                />
                            ))}
                            {randomBooks.map((book, index) => (
                                <Card
                                    key={`${book.book_id}-${index}`}
                                    image={`http://127.0.0.1:3000/${book.cover}`}
                                    title={book.title}
                                    author={book.author}
                                    ratings={book.ratings}
                                />
                            ))}
                            {randomBooks.map((book, index) => (
                                <Card
                                    key={`${book.book_id}-${index}`}
                                    image={`http://127.0.0.1:3000/${book.cover}`}
                                    title={book.title}
                                    author={book.author}
                                    ratings={book.ratings}
                                />
                            ))}
                        </div>
                    </div>

                    {/* JOBB OLDAL */}
                    <div className="col-12 col-lg-5">
                        <div className="p-3 rounded" style={{ backgroundColor: '#f0e5d8' }}>
                            <h4 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Értékelt könyveim:</h4>
                            {randomBooks.map((book, index) => (
                                <Card
                                    key={`${book.book_id}-${index}`}
                                    image={`http://127.0.0.1:3000/${book.cover}`}
                                    title={book.title}
                                    author={book.author}
                                    ratings={book.ratings}
                                />
                            ))}
                            {randomBooks.map((book, index) => (
                                <Card
                                    key={`${book.book_id}-${index}`}
                                    image={`http://127.0.0.1:3000/${book.cover}`}
                                    title={book.title}
                                    author={book.author}
                                    ratings={book.ratings}
                                />
                            ))}
                            {randomBooks.map((book, index) => (
                                <Card
                                    key={`${book.book_id}-${index}`}
                                    image={`http://127.0.0.1:3000/${book.cover}`}
                                    title={book.title}
                                    author={book.author}
                                    ratings={book.ratings}
                                />
                               
                            ))}
                            
                        </div>
                        
                    </div>
                    

                </div>
            </div>
        </div>
    )
}