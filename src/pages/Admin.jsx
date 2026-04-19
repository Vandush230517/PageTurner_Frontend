import { useState, useEffect } from 'react'
import { Navigate, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import Table from "../components/Table";
import BookTable from "../components/BookTable";
import NavBar from "../components/NavBar"

import { getAllUsers, getAllBooks, userEdit, deleteUser, bookEdit, deleteBook, createBook } from '../api';

export default function Admin() {
    const { user, loading, onLogout } = useAuth()
    const navigate = useNavigate()

    const [activeTab, setActiveTab] = useState('users')

    const [allUsers, setAllUsers] = useState(null)
    const [allBooks, setAllBooks] = useState(null)
    const [error, setError] = useState('')

    const [selectedUser, setSelectedUser] = useState(null)
    const [selectedBook, setSelectedBook] = useState(null)
    const [showUserModal, setShowUserModal] = useState(false)
    const [showBookModal, setShowBookModal] = useState(false)
    const [showCreateModal, setShowCreateModal] = useState(false)

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [description, setDescription] = useState('')

    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newDescription, setNewDescription] = useState('')
    const [newCategory, setNewCategory] = useState('1')
    const [newCover, setNewCover] = useState(null)

    const categories = [
        { id: 1, name: 'Sci-Fi' },
        { id: 2, name: 'Fantasy' },
        { id: 3, name: 'Thriller' },
        { id: 4, name: 'Romantikus' },
        { id: 5, name: 'Horror' },
        { id: 6, name: 'Történelmi' },
        { id: 7, name: 'Krimi' },
        { id: 8, name: 'Ifjúsági' },
    ]

    useEffect(() => {
        async function loadUsers() {
            const data = await getAllUsers()
            if (!data.error) return setAllUsers(data)
            return setError(data.error)
        }
        async function loadBooks() {
            const data = await getAllBooks()
            if (!data.error) return setAllBooks(data)
            return setError(data.error)
        }
        loadUsers()
        loadBooks()
    }, [])

    if (loading) {
        return (
            <div className="container py-5">
                <div className="spinner-border text-danger"></div>
            </div>
        )
    }

    if (!user || user.role !== 'admin') {
        return <Navigate to='/' />
    }

    function onBooks() {
        navigate('/books')
    }

    function handleEditUser(user) {
        setSelectedUser(user)
        setShowUserModal(true)
    }

    async function handleDeleteUser(user) {
        const confirmDelete = window.confirm(`Biztosan törölni akarod a ${user.username} felhasználót?`)
        if (!confirmDelete) return
        const data = await deleteUser(user.user_id)
        if (data.error) return alert(data.error)
        alert('Sikeres törlés')
        setAllUsers(prev => prev.filter(u => u.user_id !== user.user_id))
    }

    async function editUserHandler(user_id) {
        const data = await userEdit(user_id, username, email, role)
        if (data.error) return alert(data.error)
        alert('Sikeres módosítás')
        setShowUserModal(false)
    }

    function handleEditBook(book) {
        setSelectedBook(book)
        setShowBookModal(true)
    }

    async function handleDeleteBook(book) {
        const confirmDelete = window.confirm(`Biztosan törölni akarod a ${book.title} könyvet?`)
        if (!confirmDelete) return
        const data = await deleteBook(book.book_id)
        if (data.error) return alert(data.error)
        alert('Sikeres törlés')
        setAllBooks(prev => prev.filter(b => b.book_id !== book.book_id))
    }

    async function editBookHandler(book_id) {
        const data = await bookEdit(book_id, title, author, null, description)
        if (data.error) return alert(data.error)
        alert('Sikeres módosítás')
        setShowBookModal(false)
    }

    async function createBookHandler() {
        if (!newTitle || !newAuthor || !newDescription || !newCover) {
            return alert('Minden mezőt tölts ki és tölts fel képet!')
        }

        const formData = new FormData()
        formData.append('title', newTitle)
        formData.append('author', newAuthor)
        formData.append('description', newDescription)
        formData.append('categories_id', newCategory)
        formData.append('cover', newCover)

        const data = await createBook(formData)
        if (data.error) return alert(data.error)
        alert('Sikeres könyv létrehozás!')
        setShowCreateModal(false)

        const updatedBooks = await getAllBooks()
        if (!updatedBooks.error) setAllBooks(updatedBooks)
    }

    return (
        <div style={{ backgroundColor: '#EFCEA8', minHeight: '100vh' }}>
            <NavBar user={user} onLogout={onLogout} onBooks={onBooks}/>
            <div className="container py-5">
                <h1>Admin panel</h1>
                {error && <div className="alert alert-danger">{error}</div>}

                <ul className="nav nav-pills mb-4">
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'users' ? 'active' : 'text-dark'}`}
                            style={activeTab === 'users' ? { backgroundColor: '#AC703B', color: 'white' } : {}}
                            onClick={() => setActiveTab('users')}
                        >
                            Felhasználók
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'books' ? 'active' : 'text-dark'}`}
                            style={activeTab === 'books' ? { backgroundColor: '#AC703B', color: 'white' } : {}}
                            onClick={() => setActiveTab('books')}
                        >
                            Könyvek
                        </button>
                    </li>
                </ul>

                {activeTab === 'users' && (
                    <Table allUsers={allUsers} onEdit={handleEditUser} onDelete={handleDeleteUser}/>
                )}

                {activeTab === 'books' && (
                    <>
                        <button
                            className='btn btn-success mb-3'
                            onClick={() => setShowCreateModal(true)}
                        >
                            + Könyv hozzáadása
                        </button>
                        <BookTable allBooks={allBooks} onEdit={handleEditBook} onDelete={handleDeleteBook}/>
                    </>
                )}

                {/* user modal */}
                {showUserModal && selectedUser && (
                    <div className='modal d-block' tabIndex='-1'>
                        <div className="modal-dialog">
                            <div className="modal-content p-3">
                                <h5>Felhasználó szerkesztése</h5>
                                <label className="form-label fw-bold">Username:</label>
                                <input type="text" className='form-control' defaultValue={selectedUser.username} onChange={(e) => setUsername(e.target.value)}/>
                                <label className="form-label fw-bold">Email:</label>
                                <input type="email" className='form-control' defaultValue={selectedUser.email} onChange={(e) => setEmail(e.target.value)}/>
                                <label className="form-label fw-bold">Role:</label>
                                <input type="text" className='form-control' defaultValue={selectedUser.role} onChange={(e) => setRole(e.target.value)}/>
                                <div className="d-flex justify-content-between mt-3">
                                    <button type='button' className='btn btn-secondary' onClick={() => setShowUserModal(false)}>Bezárás</button>
                                    <button type='button' className='btn btn-warning' onClick={() => editUserHandler(selectedUser.user_id)}>Módosít</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* book szerkesztés modal */}
                {showBookModal && selectedBook && (
                    <div className='modal d-block' tabIndex='-1'>
                        <div className="modal-dialog">
                            <div className="modal-content p-3">
                                <h5>Könyv szerkesztése</h5>
                                <label className="form-label fw-bold">Cím:</label>
                                <input type="text" className='form-control' defaultValue={selectedBook.title} onChange={(e) => setTitle(e.target.value)}/>
                                <label className="form-label fw-bold">Szerző:</label>
                                <input type="text" className='form-control' defaultValue={selectedBook.author} onChange={(e) => setAuthor(e.target.value)}/>
                                <label className="form-label fw-bold">Leírás:</label>
                                <textarea className='form-control' defaultValue={selectedBook.description} onChange={(e) => setDescription(e.target.value)}/>
                                <div className="d-flex justify-content-between mt-3">
                                    <button type='button' className='btn btn-secondary' onClick={() => setShowBookModal(false)}>Bezárás</button>
                                    <button type='button' className='btn btn-warning' onClick={() => editBookHandler(selectedBook.book_id)}>Módosít</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* book létrehozás modal */}
                {showCreateModal && (
                    <div className='modal d-block' tabIndex='-1'>
                        <div className="modal-dialog">
                            <div className="modal-content p-3">
                                <h5>Könyv hozzáadása</h5>
                                <label className="form-label fw-bold">Cím:</label>
                                <input type="text" className='form-control' placeholder='Cím' onChange={(e) => setNewTitle(e.target.value)}/>
                                <label className="form-label fw-bold">Szerző:</label>
                                <input type="text" className='form-control' placeholder='Szerző' onChange={(e) => setNewAuthor(e.target.value)}/>
                                <label className="form-label fw-bold">Leírás:</label>
                                <textarea className='form-control' placeholder='Leírás' onChange={(e) => setNewDescription(e.target.value)}/>
                                <label className="form-label fw-bold">Kategória:</label>
                                <select className='form-select' onChange={(e) => setNewCategory(e.target.value)}>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                                <label className="form-label fw-bold mt-2">Borító kép:</label>
                                <input type="file" className='form-control' accept='image/*' onChange={(e) => setNewCover(e.target.files[0])}/>
                                <div className="d-flex justify-content-between mt-3">
                                    <button type='button' className='btn btn-secondary' onClick={() => setShowCreateModal(false)}>Bezárás</button>
                                    <button type='button' className='btn btn-success' onClick={createBookHandler}>Létrehozás</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}