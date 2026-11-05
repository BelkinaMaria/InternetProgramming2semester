import { useEffect, useState } from 'react'
import { profileService } from '../services/api'

const Profile = () => {
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const loadProfile = async () => {
            try {
                setLoading(true)
                setError(null)
            
                const response = await profileService.getProfile()
            
                const profileData = Array.isArray(response) ? response[0] : response
                    
                if (!profileData || typeof profileData !== 'object') {
                    throw new Error('Неверный формат данных профиля')
                }
            
                setProfile(profileData)
            
            } catch (err) {
                setError(err.message || 'Не удалось загрузить данные профиля')
                
                const fallbackProfile = {
                id: 1,
                firstName: "Иван",
                lastName: "Иванов", 
                phone: "+7 777 777 77-77",
                email: "ivan.ivanov@email.ru",
                booksCount: 2,
                avatar: "/imgs/empty-profile-photo.jpg",
                borrowedBooks: [
                    {
                        id: 1,
                        title: "Повелитель Мух",
                        author: "Голдинг У.",
                        dueDate: "2025-06-23",
                        isOverdue: true
                    },
                    {
                        id: 2, 
                        title: "Гранатовый Браслет",
                        author: "Куприн А.И.",
                        dueDate: "2025-10-04",
                        isOverdue: false
                    }]
                }
                setProfile(fallbackProfile)
            } finally {
                setLoading(false)
            }
        }

        loadProfile()
    }, [])

    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString)
            return isNaN(date.getTime()) ? 'дата не указана' : date.toLocaleDateString('ru-RU')
        } catch {
            return 'дата не указана'
        }
    }

    if (loading) {
        return (
        <main className="container py-3">
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Загрузка...</span>
                </div>
                <p className="mt-3">Загрузка профиля...</p>
            </div>
        </main>)
    }

    if (!profile) {
        return (
            <main className="container py-3">
                <div className="alert alert-danger" role="alert">
                    <h4 className="alert-heading">Ошибка</h4>
                    <p>{error || 'Профиль не найден'}</p>
                    <div className="mt-3">
                        <button className="btn btn-primary" onClick={() => window.location.reload()}>
                            Обновить страницу
                        </button>
                    </div>
                </div>
            </main>
        )
    }

    const safeProfile = {
        firstName: profile.firstName || 'Не указано',
        lastName: profile.lastName || 'Не указано', 
        phone: profile.phone || 'Не указан',
        email: profile.email || 'Не указана',
        booksCount: profile.booksCount || 0,
        avatar: profile.avatar || '/imgs/empty-profile-photo.jpg',
        borrowedBooks: Array.isArray(profile.borrowedBooks) ? profile.borrowedBooks : []
    }

    return (
        <main className="container py-3">
            <div className="profile-header">
                <h2>{safeProfile.firstName} {safeProfile.lastName}</h2>
            </div>

            <div className="row g-3 align-items-start">
                <div className="col-12 col-sm-auto text-center">
                    <img 
                        src={safeProfile.avatar} 
                        alt="Аватарка" 
                        className="img-fluid rounded profile-img"
                        onError={(e) => {
                        e.target.style.display = 'none'
                        }}
                    />
                </div>

                <div className="col-12 col-sm">
                    <div className="table-responsive">
                        <table className="table table-bordered mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th colSpan="2" className="text-center">Информация</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="fw-bold" style={{ width: '40%' }}>Имя</td>
                                    <td>{safeProfile.firstName}</td>
                                </tr>
                                <tr>
                                    <td className="fw-bold">Фамилия</td>
                                    <td>{safeProfile.lastName}</td>
                                </tr>
                                <tr>
                                    <td className="fw-bold">Номер телефона</td>
                                    <td>{safeProfile.phone}</td>
                                </tr>
                                <tr>
                                    <td className="fw-bold">Электронная почта</td>
                                    <td>{safeProfile.email}</td>
                                </tr>
                                <tr>
                                    <td className="fw-bold">Книг на руках</td>
                                    <td>{safeProfile.booksCount}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {safeProfile.borrowedBooks.length > 0 && (
                <div className="accordion" style={{ marginTop: '20px' }} id="booksAccordion">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseOne"
                                aria-expanded="false"
                                aria-controls="collapseOne"
                            >
                                Мои книги ({safeProfile.borrowedBooks.length})
                            </button>
                        </h2>
                        <div
                            id="collapseOne"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingOne"
                            data-bs-parent="#booksAccordion"
                        >
                            <div className="accordion-body">
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Название</th>
                                                <th>Автор</th>
                                                <th>Срок возврата</th>
                                                <th>Статус</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {safeProfile.borrowedBooks.map(book => {
                                                const safeBook = {
                                                    id: book.id || Math.random(),
                                                    title: book.title || 'Неизвестная книга',
                                                    author: book.author || 'Неизвестный автор',
                                                    dueDate: book.dueDate,
                                                    isOverdue: Boolean(book.isOverdue)
                                                }
                                                
                                                const isOverdue = safeBook.isOverdue || 
                                                (safeBook.dueDate && new Date(safeBook.dueDate) < new Date())
                                                
                                                return (
                                                    <tr key={safeBook.id}>
                                                        <td className="fw-bold">{safeBook.title}</td>
                                                        <td>{safeBook.author}</td>
                                                        <td className={isOverdue ? 'text-danger fw-bold' : ''}>
                                                            до {formatDate(safeBook.dueDate)}
                                                        </td>
                                                        <td>
                                                            {isOverdue ? (
                                                                <span className="badge bg-danger">Просрочена</span>
                                                            ) : (
                                                                <span className="badge bg-success">В срок</span>
                                                            )}
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {safeProfile.borrowedBooks.length === 0 && (
                <div className="alert alert-info mt-4" role="alert">
                    <h5>У вас пока нет книг</h5>
                </div>
            )}
        </main>
    )
}

export default Profile