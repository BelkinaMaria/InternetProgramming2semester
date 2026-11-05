import React, { useState, useEffect } from 'react'
import LibraryForm from '../components/libraries/LibraryForm'
import AuthorForm from '../components/authors/AuthorForm'
import ContextMenu from '../components/common/ContextMenu'
import { useAuthors } from '../hooks/useAuthors'
import { useLibraries } from '../hooks/useLibraries'  // Импортирую хук.
import { authorService } from '../services/api'  // Оставляю для удаления авторов.

const Libraries = () => {
    // Использую хук для библиотек.
    const { 
        libraries, 
        loading: libraryLoading, 
        error: libraryError,
        loadLibraries,
        addLibrary,
        updateLibrary,
        deleteLibrary
    } = useLibraries()
    
    // Использую хук для авторов.
    const { 
        authors, 
        loading: authorLoading, 
        error: authorError,
        loadAuthors,
        addAuthor,
        updateAuthor
    } = useAuthors()
    
    const [showLibraryForm, setShowLibraryForm] = useState(false)
    const [editingLibrary, setEditingLibrary] = useState(null)
    const [showAuthorForm, setShowAuthorForm] = useState(false)
    const [editingAuthor, setEditingAuthor] = useState(null)

    // Загружаю библиотеки при монтировании.
    useEffect(() => {
        loadLibraries()
        loadAuthors()
    }, [loadLibraries, loadAuthors])

    const handleEditLibrary = (libraryId) => {
        const library = libraries.find(lib => lib.id.toString() === libraryId.toString())
        if (library) {
            setEditingLibrary(library)
            setShowLibraryForm(true)
        }
    }

    const handleDeleteLibrary = async (libraryId) => {
        if (!window.confirm('Вы уверены, что хотите удалить эту библиотеку?')) {
            return
        }

        try {
            await deleteLibrary(libraryId)
        } catch (err) {
            console.error('Ошибка удаления библиотеки:', err)
        }
    }

    const handleLibraryFormSubmit = async (formData) => {
        try {
            if (editingLibrary) {
                await updateLibrary(editingLibrary.id, formData)
            } else {
                await addLibrary(formData)
            }
            setShowLibraryForm(false)
            setEditingLibrary(null)
        } catch (err) {
            console.error('Ошибка сохранения библиотеки:', err)
        }
    }

    const handleLibraryFormCancel = () => {
        setShowLibraryForm(false)
        setEditingLibrary(null)
    }

    const handleAddLibrary = () => {
        setEditingLibrary(null)
        setShowLibraryForm(true)
    }

    const handleEditAuthor = (authorId) => {
        const author = authors.find(auth => auth.id.toString() === authorId.toString())
        if (author) {
            setEditingAuthor(author)
            setShowAuthorForm(true)
        }
    }

    // Для удаления авторов пока использую старый подход.
    const handleDeleteAuthor = async (authorId) => {
        if (!window.confirm('Вы уверены, что хотите удалить этого автора?')) {
            return
        }

        try {
            await authorService.deleteAuthor(authorId)
            await loadAuthors()  // Перезагружаю авторов через хук.
        } catch (err) {
            console.error('Ошибка удаления автора:', err)
        }
    }

    const handleAuthorFormSubmit = async (formData) => {
        try {
            if (editingAuthor) {
                await updateAuthor(editingAuthor.id, formData)
            } else {
                await addAuthor(formData)
            }
            setShowAuthorForm(false)
            setEditingAuthor(null)
        } catch (err) {
            console.error('Ошибка сохранения автора:', err)
        }
    }

    const handleAuthorFormCancel = () => {
        setShowAuthorForm(false)
        setEditingAuthor(null)
    }

    const handleAddAuthor = () => {
        setEditingAuthor(null)
        setShowAuthorForm(true)
    }

    const isLoading = libraryLoading || authorLoading

    if (isLoading) {
        return (
            <main className="container py-3">
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Загрузка...</span>
                    </div>
                    <p className="mt-3">Загрузка данных...</p>
                </div>
            </main>
        )
    }

    return (
        <main className="container py-3">
            <section className="mb-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Библиотеки</h2>
                    <button 
                        className="btn btn-primary"
                        onClick={handleAddLibrary}
                    >
                        <i className="bi bi-plus-circle me-2"></i>
                        Добавить библиотеку
                    </button>
                </div>

                {libraryError && (
                    <div className="alert alert-warning alert-dismissible fade show" role="alert">
                        {libraryError}
                        <button 
                            type="button" 
                            className="btn-close" 
                            onClick={() => {}}
                        ></button>
                    </div>
                )}
                
                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Название библиотеки</th>
                                <th>Адрес</th>
                                <th>График работы</th>
                                <th>Телефон</th>
                            </tr>
                        </thead>
                        <tbody>
                            {libraries.map(library => (
                                <tr 
                                    key={library.id}
                                    data-library-id={library.id}
                                    style={{ cursor: 'context-menu' }}
                                    title="Щелкните правой кнопкой мыши для действий"
                                >
                                    <td className="fw-bold">{library.name}</td>
                                    <td>{library.address}</td>
                                    <td>{library.workingHours}</td>
                                    <td>{library.phone}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {libraries.length === 0 && (
                    <div className="text-center py-5">
                        <i className="bi bi-building fs-1 text-muted mb-3 d-block"></i>
                        <p className="text-muted">Библиотеки не добавлены</p>
                        <button 
                        className="btn btn-primary"
                        onClick={handleAddLibrary}
                        >
                            Добавить первую библиотеку
                        </button>
                    </div>
                )}
            </section>

            <hr className="my-5" />

            <section>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Авторы</h2>
                    <button 
                        className="btn btn-primary"
                        onClick={handleAddAuthor}
                    >
                        <i className="bi bi-plus-circle me-2"></i>
                        Добавить автора
                    </button>
                </div>

                {authorError && (
                    <div className="alert alert-warning alert-dismissible fade show" role="alert">
                        {authorError}
                        <button 
                            type="button" 
                            className="btn-close" 
                            onClick={() => {}}
                        ></button>
                    </div>
                )}
                
                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Имя автора</th>
                                <th>Страна</th>
                                <th>Год рождения</th>
                                <th>Биография</th>
                            </tr>
                        </thead>
                        <tbody>
                            {authors.map(author => (
                                <tr 
                                    key={author.id}
                                    data-author-id={author.id}
                                    style={{ cursor: 'context-menu' }}
                                    title="Щелкните правой кнопкой мыши для действий"
                                >
                                    <td className="fw-bold">{author.name}</td>
                                    <td>{author.country}</td>
                                    <td>{author.birthYear || '-'}</td>
                                    <td>
                                        {author.bio ? (
                                            <span title={author.bio}>
                                                {author.bio.length > 50 ? author.bio.substring(0, 50) + '...' : author.bio}
                                            </span>
                                        ) : '-'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {authors.length === 0 && (
                    <div className="text-center py-5">
                        <i className="bi bi-person fs-1 text-muted mb-3 d-block"></i>
                        <p className="text-muted">Авторы не добавлены</p>
                        <button 
                            className="btn btn-primary"
                            onClick={handleAddAuthor}
                        >
                            Добавить первого автора
                        </button>
                    </div>
                )}
            </section>

            {showLibraryForm && (
                <LibraryForm
                    library={editingLibrary}
                    onSubmit={handleLibraryFormSubmit}
                    onCancel={handleLibraryFormCancel}
                />
            )}

            {showAuthorForm && (
                <AuthorForm
                    author={editingAuthor}
                    onSubmit={handleAuthorFormSubmit}
                    onCancel={handleAuthorFormCancel}
                />
            )}

            <ContextMenu
                type="library"
                onEdit={handleEditLibrary}
                onDelete={handleDeleteLibrary}
            />

            <ContextMenu
                type="author"
                onEdit={handleEditAuthor}
                onDelete={handleDeleteAuthor}
            />
        </main>
    )
}

export default Libraries