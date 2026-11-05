
const Footer = () => {
    return (
        <footer className="bg-indigo py-3 py-md-4 mt-4 mt-md-5 text-white">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-6 mb-3 mb-md-0">
                        <div className="contacts">
                            <p className="mb-1">
                                <i className="bi bi-telephone me-2"></i>+7 (777) 777-77-77
                            </p>
                            <p className="mb-0">
                                <i className="bi bi-envelope me-2"></i>email@email.e
                            </p>
                        </div>
                    </div>

                    <div className="col-md-6 text-md-end">
                        <div className="social-networks">
                            <a href="https://vk.com" className="text-decoration-none">
                                <img 
                                    src="/imgs/VK-Logo.png" 
                                    alt="VK" 
                                    className="img-fluid" 
                                    style={{ maxHeight: '30px' }} 
                                />
                            </a>
                            <a href="#" className="text-decoration-none ms-3">
                                <i className="bi bi-telegram" style={{ fontSize: '1.5rem', color: '#0088cc' }}></i>
                            </a>
                            <a href="#" className="text-decoration-none ms-3">
                                <i className="bi bi-whatsapp" style={{ fontSize: '1.5rem', color: '#25d366' }}></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer