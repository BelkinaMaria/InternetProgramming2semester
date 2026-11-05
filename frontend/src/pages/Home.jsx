import React, { useState } from 'react'
import BookList from '../components/books/BookList'
import BookContextMenu from '../components/books/BookContextMenu'
import { bookService } from '../services/api'
import { useBooks } from '../hooks/useBooks'

const Home = () => {
    const { books, loading, error, loadBooks } = useBooks()
    
    const [editingBook, setEditingBook] = useState(null)
    const [showForm, setShowForm] = useState(false)

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
            loadBooks()  // Использую loadBooks вместо перезагрузки страницы.
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

    if (loading && books.length === 0) {
        return (
            <div className="container mt-4">
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Загрузка...</span>
                    </div>
                    <p className="mt-3">Загрузка книг...</p>
                </div>
            </div>
        )
    }

    if (error && books.length === 0) {
        return (
            <div className="container mt-4">
                <div className="alert alert-danger" role="alert">
                    <h4 className="alert-heading">Ошибка загрузки</h4>
                    <p>{error}</p>
                    <button 
                        className="btn btn-primary" 
                        onClick={() => loadBooks()}  // Использую loadBooks.
                    >
                        Повторить загрузку
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="container mt-4">
            <h1 className="mb-4 p-3">Популярное</h1>
            
            {error && (
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    {error}
                    <button 
                        type="button" 
                        className="btn-close" 
                        onClick={() => {}}  // Здесь можно очистить ошибку..
                    ></button>
                </div>
            )}
            
            <BookList 
                books={books} 
                showForm={showForm}
                editingBook={editingBook}
                onFormSubmit={handleFormSubmit}
                onFormCancel={handleFormCancel}
                onAddBook={handleAddBook}
            />
            
            <BookContextMenu
                onEdit={handleEditBook}
                onDelete={handleDeleteBook}
            />
        </div>
    )
}

export default Home