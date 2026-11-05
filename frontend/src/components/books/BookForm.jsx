import React, { useState, useEffect } from 'react'
import { authorService, libraryService } from '../../services/api'

const BookForm = ({ book, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        authorId: '',
        libraryIds: [],
        hasEbook: false,
        image: '',
        description: '',
        genre: '',
        illustrations: false,
        language: '',
        pages: ''
    })

    const [authors, setAuthors] = useState([])
    const [libraries, setLibraries] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadData = async () => {
            try {
                const [authorsData, librariesData] = await Promise.all([
                    authorService.getAllAuthors(),
                    libraryService.getAllLibraries()
                ])
                setAuthors(authorsData)
                setLibraries(librariesData)
            } catch (error) {
                console.error('Ошибка загрузки данных:', error)
            } finally {
                setLoading(false)
            }
        }
        loadData()
    }, [])

    useEffect(() => {
        if (book) {
            setFormData({
                title: book.title || '',
                authorId: book.authorId || '',
                libraryIds: book.libraryIds || [],
                hasEbook: book.hasEbook || false,
                image: book.image || '',
                description: book.description || '',
                genre: book.genre || '',
                illustrations: book.illustrations || false,
                language: book.language || '',
                pages: book.pages || ''
            })
        }
    }, [book])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleLibraryChange = (e) => {
        const options = e.target.options
        const selectedValues = []
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedValues.push(parseInt(options[i].value))
            }
        }
        setFormData(prev => ({
            ...prev,
            libraryIds: selectedValues
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const submitData = {
            ...formData,
            authorId: parseInt(formData.authorId),
            pages: formData.pages ? parseInt(formData.pages) : null
        }
        
        onSubmit(submitData)
    }

    if (loading) {
        return (
            <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body text-center py-4">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Загрузка...</span>
                            </div>
                            <p className="mt-2">Загрузка данных...</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {book ? 'Редактировать книгу' : 'Добавить новую книгу'}
                        </h5>
                        <button type="button" className="btn-close" onClick={onCancel}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">Название книги*</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="title"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="authorId" className="form-label">Автор*</label>
                                        <select
                                            className="form-select"
                                            id="authorId"
                                            name="authorId"
                                            value={formData.authorId}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Выберите автора</option>
                                            {authors.map(author => (
                                                <option key={author.id} value={author.id}>
                                                   {author.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="genre" className="form-label">Жанр</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="genre"
                                            name="genre"
                                            value={formData.genre}
                                            onChange={handleChange}
                                            placeholder="роман, детектив, фантастика..."
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="language" className="form-label">Язык</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="language"
                                            name="language"
                                            value={formData.language}
                                            onChange={handleChange}
                                            placeholder="Русский, English..."
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="pages" className="form-label">Количество страниц</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="pages"
                                            name="pages"
                                            value={formData.pages}
                                            onChange={handleChange}
                                            placeholder="320"
                                            min="1"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <div className="form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="hasEbook"
                                                name="hasEbook"
                                                checked={formData.hasEbook}
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label" htmlFor="hasEbook">
                                                Доступна в электронном варианте
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="illustrations"
                                                name="illustrations"
                                                checked={formData.illustrations}
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label" htmlFor="illustrations">
                                                С иллюстрациями
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="libraryIds" className="form-label">Библиотеки</label>
                                <select
                                    className="form-select"
                                    id="libraryIds"
                                    name="libraryIds"
                                    multiple
                                    size="4"
                                    value={formData.libraryIds}
                                    onChange={handleLibraryChange}
                                >
                                    {libraries.map(library => (
                                        <option key={library.id} value={library.id}>
                                            {library.name} ({library.address})
                                        </option>
                                    ))}
                                </select>
                                <div className="form-text">
                                    Удерживайте Ctrl для выбора нескольких библиотек
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Описание</label>
                                <textarea
                                    className="form-control"
                                    id="description"
                                    name="description"
                                    rows="3"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Аннотация книги..."
                                ></textarea>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">URL изображения</label>
                                <input
                                    type="url"
                                    className="form-control"
                                    id="image"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    placeholder="https://..."
                                />
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={onCancel}>
                                    Отмена
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    {book ? 'Сохранить изменения' : 'Добавить книгу'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookForm