import React, { useState, useEffect, useRef, useCallback } from 'react'

const BookContextMenu = ({ onEdit, onDelete }) => {
    const [isVisible, setIsVisible] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [selectedId, setSelectedId] = useState(null)
    const menuRef = useRef(null)
    const timeoutRef = useRef(null)

    // Мемоизирую функции, чтобы они не менялись при каждом рендере.
    const showMenu = useCallback((x, y, id) => {
        setPosition({ x, y })
        setSelectedId(id)
        setIsVisible(true)

        // Использую ref для timeout.
        timeoutRef.current = setTimeout(() => {
            if (menuRef.current) {
                const rect = menuRef.current.getBoundingClientRect()
                const pad = 8
                
                let newX = x
                let newY = y

                // Проверяею выход за границы окна.
                if (rect.right > window.innerWidth) {
                    newX = Math.max(pad, window.innerWidth - rect.width - pad)
                }
                if (rect.bottom > window.innerHeight) {
                    newY = Math.max(pad, window.innerHeight - rect.height - pad)
                }

                // Обновляю позицию только если нужно.
                if (newX !== x || newY !== y) {
                    setPosition({ x: newX, y: newY })
                }
            }
        }, 0)
    }, [])

    const hideMenu = useCallback(() => {
        setIsVisible(false)
        setSelectedId(null)
    }, [])

    const handleEdit = useCallback(() => {
        if (selectedId && onEdit) {
            onEdit(selectedId)
        }
        hideMenu()
    }, [selectedId, onEdit, hideMenu])

    const handleDelete = useCallback(() => {
        if (selectedId && onDelete) {
            onDelete(selectedId)
        }
        hideMenu()
    }, [selectedId, onDelete, hideMenu])

    // Обработчик контекстного меню.
    const handleContextMenu = useCallback((e) => {
        const card = e.target.closest('.card[data-id]')
        if (!card) return

        e.preventDefault()
        const id = card.getAttribute('data-id')
        if (id) {
            showMenu(e.pageX, e.pageY, id)
        }
    }, [showMenu])

    // Обработчик клика вне меню.
    const handleClickOutside = useCallback((e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            hideMenu()
        }
    }, [hideMenu])

    // Обработчик нажатия Escape.
    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Escape') {
            hideMenu()
        }
    }, [hideMenu])

    useEffect(() => {
        // Добавляем обработчики.
        document.addEventListener('contextmenu', handleContextMenu)
        document.addEventListener('click', handleClickOutside)
        document.addEventListener('keydown', handleKeyDown)

        // Cleanup функция.
        return () => {
            document.removeEventListener('contextmenu', handleContextMenu)
            document.removeEventListener('click', handleClickOutside)
            document.removeEventListener('keydown', handleKeyDown)
            
            // Очищаю timeout при размонтировании.
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [handleContextMenu, handleClickOutside, handleKeyDown])

    // Ещё один useEffect для обработки изменения размера окна.
    useEffect(() => {
        const handleResize = () => {
            if (isVisible) {
                hideMenu()
            }
        }

        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [isVisible, hideMenu])

    // Не рендерю ничего если меню не видимо.
    if (!isVisible) return null

    return (
        <div 
            ref={menuRef}
            id="book-card-context-menu"
            className="card-context-menu"
            style={{
                position: 'absolute',
                left: position.x + 'px',
                top: position.y + 'px',
                zIndex: 2000
            }}
        >
            <ul className="context-list">
                <li>
                    <button 
                        type="button" 
                        onClick={handleEdit}
                        className="context-menu-button"
                    >
                        <i className="bi bi-pencil me-2"></i>
                        Редактировать
                    </button>
                </li>
                <li>
                    <button 
                        type="button" 
                        onClick={handleDelete}
                        className="context-menu-button"
                    >
                        <i className="bi bi-trash me-2"></i>
                        Удалить
                    </button>
                </li>
            </ul>
        </div>
    )
}

// Добавляю React.memo для предотвращения лишних ререндеров.
export default React.memo(BookContextMenu)