import React, { useState, useEffect } from 'react'

const ContextMenu = ({ onEdit, onDelete, type = 'library' }) => {
    const [isVisible, setIsVisible] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [selectedId, setSelectedId] = useState(null)

    const showMenu = (x, y, id) => {
        setPosition({ x, y })
        setSelectedId(id)
        setIsVisible(true)

        setTimeout(() => {
            const menu = document.getElementById(`${type}-context-menu`)
            if (menu) {
                const rect = menu.getBoundingClientRect()
                const pad = 8
                
                let newX = x
                let newY = y

                if (rect.right > window.innerWidth) {
                    newX = Math.max(pad, window.innerWidth - rect.width - pad)
                }
                if (rect.bottom > window.innerHeight) {
                    newY = Math.max(pad, window.innerHeight - rect.height - pad)
                }

                if (newX !== x || newY !== y) {
                    setPosition({ x: newX, y: newY })
                }
            }
        }, 0)
    }

    const hideMenu = () => {
        setIsVisible(false)
        setSelectedId(null)
    }

    const handleEdit = () => {
        if (selectedId) {
            onEdit(selectedId)
        }
        hideMenu()
    }

    const handleDelete = () => {
        if (selectedId) {
            onDelete(selectedId)
        }
        hideMenu()
    }

    useEffect(() => {
        const handleContextMenu = (e) => {
            let element = null
            let id = null

            if (type === 'library') {
                element = e.target.closest('tr[data-library-id]')
                id = element?.getAttribute('data-library-id')
            } else if (type === 'author') {
                element = e.target.closest('tr[data-author-id]')
                id = element?.getAttribute('data-author-id')
            }

            if (!element || !id) return

            e.preventDefault()
            showMenu(e.pageX, e.pageY, id)
        }

        const handleClick = (e) => {
            if (!e.target.closest(`#${type}-context-menu`)) {
                hideMenu()
            }
        }

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') hideMenu()
        }

        document.addEventListener('contextmenu', handleContextMenu)
        document.addEventListener('click', handleClick)
        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu)
            document.removeEventListener('click', handleClick)
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [onEdit, onDelete, type])

    if (!isVisible) return null

    return (
        <div 
            id={`${type}-context-menu`}
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
                    <button type="button" onClick={handleEdit}>
                        <i className="bi bi-pencil me-2"></i>
                        Редактировать
                    </button>
                </li>
                <li>
                    <button type="button" onClick={handleDelete}>
                        <i className="bi bi-trash me-2"></i>
                        Удалить
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default ContextMenu