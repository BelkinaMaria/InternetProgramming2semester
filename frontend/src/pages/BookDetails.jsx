import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { bookService } from '../services/api'
import { useAuthors } from '../hooks/useAuthors'
import { useLibraries } from '../hooks/useLibraries'  

const BookDetails = () => {
    const { id } = useParams()
    const [book, setBook] = useState(null)
    const [author, setAuthor] = useState(null)
    const [libraries, setLibraries] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const { getAuthorById } = useAuthors()
    
    const { libraries: allLibraries } = useLibraries()

    useEffect(() => {
        const loadBookData = async () => {
            try {
                setLoading(true)
                setError(null)
                
                console.log('Загрузка книги с ID:', id)

                const bookData = await bookService.getBookById(id)
                console.log('Данные книги загружены:', bookData)
                
                if (!bookData || typeof bookData !== 'object') {
                    throw new Error('Данные книги не получены')
                }

                setBook(bookData)

                if (bookData.authorId) {
                    try {
                        const authorData = await getAuthorById(bookData.authorId)
                        console.log('Данные автора загружены:', authorData)
                        setAuthor(authorData)
                    } catch (err) {
                        console.warn('Не удалось загрузить автора:', err)
                    }
                }

                if (bookData.libraryIds && Array.isArray(bookData.libraryIds)) {
                    const availableLibraries = allLibraries.filter(library => 
                        bookData.libraryIds.includes(library.id)
                    )
                    console.log('Библиотеки для книги:', availableLibraries)
                    setLibraries(availableLibraries)
                }

            } catch (err) {
                console.error('Ошибка загрузки книги:', err)
                setError(err.message || 'Не удалось загрузить книгу')
            } finally {
                setLoading(false)
            }
        }

        loadBookData()
    }, [id, getAuthorById, allLibraries])
    
    const handleImageError = (e) => {
        e.target.style.display = 'none'
        e.target.nextSibling.style.display = 'flex'
    }

    if (loading) {
        return (
            <main className="container py-3">
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Загрузка...</span>
                    </div>
                    <p className="mt-3">Загрузка книги #{id}...</p>
                </div>
            </main>
        )
    }

    if (error || !book) {
        return (
            <main className="container py-3">
                <div className="alert alert-danger" role="alert">
                    <h4 className="alert-heading">Ошибка загрузки</h4>
                    <p>{error || 'Книга не найдена'}</p>
                    <div className="mt-3">
                        <Link to="/" className="btn btn-primary me-2">
                            На главную
                        </Link>
                    </div>
                </div>
            </main>
        )
    }

    return (
        <main className="container py-3">
            <div className="profile-header">
                <h2>{book.title || 'Без названия'}</h2>
            </div>
            
            <div className="row align-items-start">
                <div className="col-12 col-sm-5 col-md-3  text-center mb-4">
                    {book.image ? (
                        <img
                        src={book.image}
                        alt={`Обложка книги ${book.title}`}
                        className="img-fluid rounded profile-img"
                        style={{ maxHeight: '300px', objectFit: 'cover'}}
                        onError={handleImageError}
                        />
                    ) : (
                        <div 
                            className="bg-light rounded d-flex align-items-center justify-content-center" 
                            style={{ height: '300px' }}
                        >
                            <i className="bi bi-book fs-1 text-muted"></i>
                        </div>
                    )}
                </div>

                <div className="col-12 col-sm-7 col-md-9">
                    <div className="mb-4">
                        <h3>Аннотация</h3>
                        <p className="lead">
                            {book.description || 'Описание книги отсутствует.'}
                        </p>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead className="table-light">
                                <tr>
                                    <th colSpan="2" className="text-center">Характеристики</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="fw-bold" style={{ width: '40%' }}>Автор</td>
                                    <td>{author ? author.name : 'Неизвестный автор'}</td>
                                </tr>
                                
                                {book.genre && (
                                    <tr>
                                        <td className="fw-bold">Жанр</td>
                                        <td>{book.genre}</td>
                                    </tr>
                                )}
                                
                                {book.illustrations && (
                                    <tr>
                                        <td className="fw-bold">Иллюстрации</td>
                                        <td>С иллюстрациями</td>
                                    </tr>
                                )}
                                
                                {book.language && (
                                    <tr>
                                        <td className="fw-bold">Язык</td>
                                        <td>{book.language}</td>
                                    </tr>
                                )}
                                
                                {book.pages && (
                                    <tr>
                                        <td className="fw-bold">Страниц</td>
                                        <td>{book.pages}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-12">
                    <div className="accordion" id="bookAccordions">
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#librariesCollapse"
                                >
                                    Доступно в библиотеках
                                </button>
                            </h2>
                            <div
                                id="librariesCollapse"
                                className="accordion-collapse collapse"
                                data-bs-parent="#bookAccordions"
                            >
                                <div className="accordion-body">
                                    {libraries.length > 0 ? (
                                        libraries.map(library => (
                                            <p key={library.id} style={{ borderBottom: '1px dotted #aaa', paddingBottom: '0.5rem' }}>
                                                <strong>{library.name}</strong> - {library.address}
                                                {library.workingHours && ` (${library.workingHours})`}
                                            </p>
                                        ))
                                    ) : (
                                        <p className="text-muted">Книга отсутствует в библиотеках</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#ebookCollapse"
                                >
                                    Электронная версия
                                </button>
                            </h2>
                            <div
                                id="ebookCollapse"
                                className="accordion-collapse collapse"
                                data-bs-parent="#bookAccordions"
                            >
                                <div className="accordion-body">
                                    {book.hasEbook ? (
                                        <div>
                                            <p style={{ borderBottom: '1px dotted #aaa', paddingBottom: '0.5rem' }}>
                                                <a href="#" className="text-decoration-none">Скачать PDF</a>
                                            </p>
                                            <p style={{ borderBottom: '1px dotted #aaa', paddingBottom: '0.5rem' }}>
                                                <a href="#" className="text-decoration-none">Скачать FB2</a>
                                            </p>
                                            <p style={{ borderBottom: '1px dotted #aaa', paddingBottom: '0.5rem' }}>
                                                <a href="#" className="text-decoration-none">Скачать EPUB</a>
                                            </p>
                                        </div>
                                    ) : (
                                        <p className="text-muted">Электронная версия недоступна</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-12">
                    <div className="d-flex gap-2 flex-wrap">
                        <Link to="/" className="btn btn-outline-primary">
                            Назад к списку
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default BookDetails