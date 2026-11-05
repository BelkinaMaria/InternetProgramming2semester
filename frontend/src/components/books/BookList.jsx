import React from 'react'
import BookCard from './BookCard'
import BookForm from './BookForm'

const BookList = ({ 
    books, 
    showForm,
    editingBook,
    onFormSubmit,
    onFormCancel,
    onAddBook
}) => {
    return (
        <>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            {books.map(book => (
                <BookCard
                    key={book.id}
                    book={book}
                />
            ))}
        </div>

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
                onClick={onAddBook}
            >
                <i className="bi bi-plus"></i>
            </button>
        </div>

        {showForm && (
            <BookForm
                book={editingBook}
                onSubmit={onFormSubmit}
                onCancel={onFormCancel}
            />
        )}
        </>
    )
}

export default BookList