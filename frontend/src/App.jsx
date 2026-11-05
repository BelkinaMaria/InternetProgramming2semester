import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import Home from './pages/Home'
import BookDetails from './pages/BookDetails'
import Libraries from './pages/Libraries'
import Profile from './pages/Profile'
import Search from './pages/Search'

function App() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <main className="flex-grow-1">
                <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/book/:id" element={<BookDetails />} />
                <Route path="/libraries" element={<Libraries />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/search" element={<Search />} />
                </Routes>
            </main>
            <Footer />
        </div>
    )
}

export default App