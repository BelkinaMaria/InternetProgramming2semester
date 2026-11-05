import { useState, useEffect, useCallback } from "react";
import { bookService, authorService } from "../services/api";

export const useBooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadBooks = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const booksData = await bookService.getAllBooks();

            // Загружаю авторов для каждой книги.
            const booksWithAuthors = await Promise.all(
                booksData.map(async (book) => {
                    try {
                        const author = await authorService.getAuthorById(book.authorId);
                        return { ...book, author };
                    } catch (err) {
                        console.warn(`Ошибка загрузки автора для книги ${book.id}:`, err);
                        return { ...book, author: null };
                    }
                })
            );

            setBooks(booksWithAuthors);
        } catch (err) {
            setError(err.message || "Ошибка загрузки книг");
            console.error("Ошибка загрузки книг:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadBooks();
    }, [loadBooks]);

    return {
        books,
        loading,
        error,
        loadBooks,
    };
};
