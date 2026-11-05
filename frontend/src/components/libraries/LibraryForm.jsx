import React, { useState, useEffect } from 'react'

const LibraryForm = ({ library, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        workingHours: '',
        phone: ''
    })

    useEffect(() => {
        if (library) {
            setFormData({
                name: library.name || '',
                address: library.address || '',
                workingHours: library.workingHours || '',
                phone: library.phone || ''
            })
        }
    }, [library])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
          ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(formData)
    }

    return (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {library ? 'Редактировать библиотеку' : 'Добавить новую библиотеку'}
                        </h5>
                        <button type="button" className="btn-close" onClick={onCancel}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="libraryName" className="form-label">Название библиотеки*</label>
                                <input
                                type="text"
                                className="form-control"
                                id="libraryName"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="libraryAddress" className="form-label">Адрес*</label>
                                <input
                                type="text"
                                className="form-control"
                                id="libraryAddress"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="libraryWorkingHours" className="form-label">График работы*</label>
                                <input
                                type="text"
                                className="form-control"
                                id="libraryWorkingHours"
                                name="workingHours"
                                value={formData.workingHours}
                                onChange={handleChange}
                                placeholder="9.00-17.00"
                                required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="libraryPhone" className="form-label">Телефон</label>
                                <input
                                type="tel"
                                className="form-control"
                                id="libraryPhone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+7 (XXX) XXX-XX-XX"
                                />
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={onCancel}>
                                    Отмена
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    {library ? 'Сохранить изменения' : 'Добавить библиотеку'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LibraryForm