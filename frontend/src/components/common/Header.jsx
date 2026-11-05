import { Link, useLocation } from 'react-router-dom'

const Header = () => {
    const location = useLocation()

    return (
        <header className="sticky-top">
            <nav className="navbar navbar-expand-lg navbar-dark bg-brand">
                <div className="container">
                    <Link className="navbar-brand d-flex align-items-center" to="/">
                        <img
                            src="/imgs/logo.png"
                            alt="Логотип"
                            className="brand-logo me-2"
                            style={{ width: '30px', borderRadius: '40%' }}
                        />
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav" data-bs-auto-close="true">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item mx-lg-2 my-1 my-lg-0">
                                <Link 
                                    className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                                    to="/"
                                >
                                    Главная
                                </Link>
                            </li>

                            <li className="nav-item dropdown mx-lg-2 my-1 my-lg-0">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="navbarDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Популярные книги
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li>
                                        <Link className="dropdown-item" to="/book/1">
                                            Повелитель мух
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/book/2">
                                            Преступление и наказание
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item mx-lg-2 my-1 my-lg-0">
                                <Link 
                                    className={`nav-link ${location.pathname === '/search' ? 'active' : ''}`}
                                    to="/search"
                                >
                                    Поиск
                                </Link>
                            </li>

                            <li className="nav-item mx-lg-2 my-1 my-lg-0">
                                <Link 
                                    className={`nav-link ${location.pathname === '/libraries' ? 'active' : ''}`}
                                    to="/libraries"
                                >
                                    Библиотеки
                                </Link>
                            </li>

                            <li className="nav-item mx-lg-2 my-1 my-lg-0">
                                <Link 
                                    className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`}
                                    to="/profile"
                                >
                                    Профиль
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header