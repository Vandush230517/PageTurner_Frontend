import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Card from '../components/Card'
import { whoAmI, logout } from '../api'


export default function MyBook() {

    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [errorUser, setErrorUser] = useState('')

    const [randomBooks, setRandomBooks] = useState([]) 

    useEffect(() => {
        async function loadUser() {
            const data = await whoAmI()

            if (data.error) {
                setUser(null)
                setErrorUser(data.error)
            } else {
                setUser(data)
                setErrorUser('')
            }
        }

        loadUser()

        fetch("http://localhost:3000/mybooks")
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

    return(
        <div style={{ backgroundColor: '#EFCEA8', minHeight: '100vh'}}>
            <NavBar user={user} onLogout={onLogout} />
            {errorUser && <div className="alert alert-danger text-center my-2">{errorUser}</div>}

            <div
                className="d-flex justify-content-center m-5 align-items-start"
                style={{ gap: '400px' }}
            >
                
                <div
                    className="p-3 rounded"
                    style={{ backgroundColor: '#f0e5d8', width: 'fit-content' }}
                >
                    <h4 style={{ textAlign: 'left', marginBottom: '1rem', fontWeight: 'bold' }}>
                        Könyvek:
                    </h4>
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
    )
}