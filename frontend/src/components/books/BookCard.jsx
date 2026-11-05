import React from 'react'
import { Link } from 'react-router-dom'

const BookCard = ({ book }) => {
    const getLibraryText = (count) => {
        const lastDigit = count % 10
        const lastTwoDigits = count % 100

        if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
            return `${count} библиотеках`
        }

        switch (lastDigit) {
            case 1:
                return `${count} библиотеке`
            case 2:
            case 3:
            case 4:
                return `${count} библиотеках`
            default:
                return `${count} библиотеках`
        }
    }

    const renderDescription = () => {
        if (!book.description) return null

        const maxLength = 60
        if (book.description.length <= maxLength) {
            return (
                <li className="text-muted mt-2" style={{ fontSize: '0.85rem' }}>
                    {book.description}
                </li>
            )
        }

        return (
            <li className="text-muted mt-2" style={{ fontSize: '0.85rem' }}>
                {book.description.substring(0, maxLength)}...
            </li>
        )
    }

    return (
        <div className="col">
            <div 
                className="card h-100" 
                data-id={book.id}
                style={{ cursor: 'context-menu' }}
                title="Щелкните правой кнопкой мыши для действий"
            >
                <Link 
                to={`/book/${book.id}`} 
                className="text-decoration-none text-dark"
                >
                    <div className="card-img-container">
                        {book.image ? (
                            <img
                                src={book.image}
                                alt={book.title}
                                className="img-fluid"
                            />
                        ) : (
                           <i className="bi bi-book card-placeholder-icon"></i>
                        )}
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{book.title}</h5>
                        <p className="card-text text-muted">
                        {book.author ? book.author.name : (book.authorId ? `Автор ID: ${book.authorId}` : 'Неизвестный автор')}
                        </p>
                        <ul className="list-unstyled small">
                        {book.libraryIds && book.libraryIds.length > 0 && (
                            <li>В наличии в {getLibraryText(book.libraryIds.length)}</li>
                        )}
                        {book.hasEbook && <li>В электронном варианте</li>}
                        {book.illustrations && <li>С иллюстрациями</li>}
                        {book.genre && (
                            <li className="text-muted">
                            <small>{book.genre}</small>
                            </li>
                        )}
                        {renderDescription()}
                        </ul>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default BookCard