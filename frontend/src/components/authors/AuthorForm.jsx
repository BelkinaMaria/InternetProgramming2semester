import { useEffect, useState } from 'react'

const AuthorForm = ({ author, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        country: '',
        birthYear: '',
        bio: ''
    })

    useEffect(() => {
        if (author) {
            setFormData({
                name: author.name || '',
                country: author.country || '',
                birthYear: author.birthYear || '',
                bio: author.bio || ''
            })
        }
    }, [author])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const submitData = {
            ...formData,
            birthYear: formData.birthYear ? parseInt(formData.birthYear) : null
        }
        
        onSubmit(submitData)
    }

    return (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {author ? 'Редактировать автора' : 'Добавить нового автора'}
                        </h5>
                        <button type="button" className="btn-close" onClick={onCancel}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="authorName" className="form-label">Имя автора*</label>
                                <input
                                type="text"
                                className="form-control"
                                id="authorName"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="authorCountry" className="form-label">Страна</label>
                                <input
                                type="text"
                                className="form-control"
                                id="authorCountry"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                placeholder="Россия"
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="authorBirthYear" className="form-label">Год рождения</label>
                                <input
                                type="number"
                                className="form-control"
                                id="authorBirthYear"
                                name="birthYear"
                                value={formData.birthYear}
                                onChange={handleChange}
                                placeholder="1821"
                                min="1000"
                                max="2024"
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="authorBio" className="form-label">Биография</label>
                                <textarea
                                className="form-control"
                                id="authorBio"
                                name="bio"
                                rows="3"
                                value={formData.bio}
                                onChange={handleChange}
                                placeholder="Краткая биография автора..."
                                ></textarea>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={onCancel}>
                                    Отмена
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    {author ? 'Сохранить изменения' : 'Добавить автора'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthorForm