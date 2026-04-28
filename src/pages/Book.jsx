import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Card from '../components/Card'
import { whoAmI, logout, getBooksByCategory, searchBooks } from '../api'

export default function Book() {

    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [errorUser, setErrorUser] = useState('')
    const [randomBooks, setRandomBooks] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')
    const [searchQuery, setSearchQuery] = useState('')

    const categories = [
        { id: 1, name: 'Sci-Fi' },
        { id: 2, name: 'Fantasy' },
        { id: 3, name: 'Disztópia' },
        { id: 4, name: 'Thriller' },
        { id: 5, name: 'Romantikus' },
        { id: 6, name: 'Horror' },
        { id: 7, name: 'Történelmi' },
        { id: 8, name: 'Krimi' },
        { id: 9, name: 'Ifjúsági' },
    ]

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
        loadBooks()
    }, [])

    async function loadBooks() {
        const res = await fetch("https://nodejs302.dszcbaross.edu.hu/book/randomBooksAll")
        const data = await res.json()
        setRandomBooks(data)
    }

    async function handleCategoryChange(e) {
        const val = e.target.value
        setSelectedCategory(val)
        setSearchQuery('')

        if (!val) {
            loadBooks()
            return
        }

        const data = await getBooksByCategory(val)
        if (!data.error) setRandomBooks(data)
    }

    async function handleSearch(e) {
        const val = e.target.value
        setSearchQuery(val)
        setSelectedCategory('')

        if (!val) {
            loadBooks()
            return
        }

        const data = await searchBooks(val)
        if (!data.error) setRandomBooks(data)
    }

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

            <div className="container py-5">
                {/* szűrők */}
                <div className="d-flex align-items-center mb-4 gap-3 flex-wrap">
                    <h4 style={{ fontWeight: 'bold', margin: 0 }}>Könyvek:</h4>
                    <input
                        type="text"
                        className="form-control"
                        style={{ width: '200px' }}
                        placeholder="Keresés..."
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    <select
                        className="form-select"
                        style={{ width: 'auto' }}
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                    >
                        <option value=''>Összes kategória</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                {/* fehér doboz */}
                <div className="p-4 rounded" style={{ backgroundColor: '#f0e5d8' }}>
                    <div className="row g-4">
                        {randomBooks.map((book, index) => (
                            <div className="col-12 col-md-6 col-lg-4" key={`${book.book_id}-${index}`}>
                                <Card
                                    book_id={book.book_id}
                                    image={`https://nodejs302.dszcbaross.edu.hu/${book.cover}`}
                                    title={book.title}
                                    author={book.author}
                                    ratings={book.ratings}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}