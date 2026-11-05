import React, { useState, useEffect } from 'react'
import BookCard from '../components/books/BookCard'
import BookForm from '../components/books/BookForm'
import BookContextMenu from '../components/books/BookContextMenu'
import { bookService } from '../services/api'
import { useAuthors } from '../hooks/useAuthors'
import { useBooks } from '../hooks/useBooks'

const Search = () => {
    // Использую кастомные хуки.
    const { books, loading, loadBooks } = useBooks()
    const { authors } = useAuthors()
    
    const [filteredBooks, setFilteredBooks] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [filters, setFilters] = useState({
        hasEbook: false,
        availableInLibrary: false,
        author: ''
    })
    const [showFilters, setShowFilters] = useState(false)
    
    const [showForm, setShowForm] = useState(false)
    const [editingBook, setEditingBook] = useState(null)

    useEffect(() => {
        setFilteredBooks(books)
    }, [books])

    useEffect(() => {
        let result = books

        if (searchTerm) {
            const term = searchTerm.toLowerCase()
            result = result.filter(book =>
                book.title.toLowerCase().includes(term) ||
                (book.author && book.author.name.toLowerCase().includes(term))
            )
        }

        if (filters.hasEbook) {
            result = result.filter(book => book.hasEbook)
        }

        if (filters.availableInLibrary) {
            result = result.filter(book => book.libraryIds && book.libraryIds.length > 0)
        }

        if (filters.author) {
            result = result.filter(book => book.authorId.toString() === filters.author)
        }

        setFilteredBooks(result)
    }, [searchTerm, filters, books])

    const handleSearchSubmit = (e) => {
        e.preventDefault()
    }

    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: value
        }))
    }

    const handleEditBook = (bookId) => {
        const book = books.find(b => b.id.toString() === bookId.toString())
        if (book) {
            setEditingBook(book)
            setShowForm(true)
        }
    }

    const handleDeleteBook = async (bookId) => {
        if (!window.confirm('Вы уверены, что хотите удалить эту книгу?')) {
            return
        }

        try {
            await bookService.deleteBook(bookId)
            loadBooks()  // Использую loadBooks.
        } catch (error) {
            console.error('Ошибка удаления книги:', error)
        }
    }

    const handleFormSubmit = async (formData) => {
        try {
            if (editingBook) {
                await bookService.updateBook(editingBook.id, formData)
            } else {
                await bookService.addBook(formData)
            }
            setShowForm(false)
            setEditingBook(null)
            loadBooks()  // Использую loadBooks.
        } catch (error) {
            console.error('Ошибка сохранения книги:', error)
        }
    }

    const handleFormCancel = () => {
        setShowForm(false)
        setEditingBook(null)
    }

    const handleAddBook = () => {
        setEditingBook(null)
        setShowForm(true)
    }

    if (loading) {
        return (
            <main className="container mt-4">
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Загрузка...</span>
                    </div>
                    <p className="mt-3">Загрузка книг...</p>
                </div>
            </main>
        )
    }

    return (
        <main className="container mt-4">
            <div className="d-flex align-items-center p-2 mb-4">
                <button
                    className="btn btn-primary me-2"
                    type="button"
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <i className="bi bi-funnel"></i>
                </button>

                <form className="d-flex flex-grow-1" onSubmit={handleSearchSubmit}>
                    <div className="input-group">
                        <input 
                            className="form-control" 
                            type="search" 
                            placeholder="Поиск по названию или автору..." 
                            aria-label="Поиск"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="btn btn-primary" type="submit">
                            <i className="bi bi-search"></i>
                        </button>
                    </div>
                </form>
            </div>

            {showFilters && (
                <div className="card mb-4">
                    <div className="card-body">
                        <div className="row g-3">
                            <div className="col-md-4">
                                <label className="form-label">Электронная версия</label>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="hasEbookFilter"
                                        checked={filters.hasEbook}
                                        onChange={(e) => handleFilterChange('hasEbook', e.target.checked)}
                                    />
                                    <label className="form-check-label" htmlFor="hasEbookFilter">
                                        Только с электронной версией
                                    </label>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <label className="form-label">Наличие в библиотеках</label>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="availableInLibraryFilter"
                                        checked={filters.availableInLibrary}
                                        onChange={(e) => handleFilterChange('availableInLibrary', e.target.checked)}
                                    />
                                    <label className="form-check-label" htmlFor="availableInLibraryFilter">
                                        В наличии в библиотеках
                                    </label>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <label className="form-label">Автор</label>
                                <select
                                    className="form-select"
                                    value={filters.author}
                                    onChange={(e) => handleFilterChange('author', e.target.value)}
                                >
                                    <option value="">Все авторы</option>
                                    {authors.map(author => (
                                        <option key={author.id} value={author.id}>
                                        {author.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                {filteredBooks.map(book => (
                    <BookCard
                        key={book.id}
                        book={book}
                    />
                ))}
            </div>

            {filteredBooks.length === 0 && !loading && (
                <div className="text-center py-5">
                    <i className="bi bi-search fs-1 text-muted mb-3 d-block"></i>
                    <h5 className="text-muted">Книги не найдены</h5>
                </div>
            )}

            <div className="fixed-bottom d-flex justify-content-end pe-4 pb-4" style={{ zIndex: 1030 }}>
                <button
                    className="btn btn-primary rounded-circle"
                    style={{
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
                        width: '56px',
                        height: '56px',
                        fontSize: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onClick={handleAddBook}
                >
                    <i className="bi bi-plus"></i>
                </button>
            </div>

            {showForm && (
                <BookForm
                    book={editingBook}
                    onSubmit={handleFormSubmit}
                    onCancel={handleFormCancel}
                />
            )}

            <BookContextMenu
                onEdit={handleEditBook}
                onDelete={handleDeleteBook}
            />
        </main>
    )
}

export default Search