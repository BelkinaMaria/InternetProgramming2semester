import { useState, useEffect, useCallback } from "react";
import { authorService } from "../services/api";

export const useAuthors = () => {
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadAuthors = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const authorsData = await authorService.getAllAuthors();
            setAuthors(authorsData);
        } catch (err) {
            setError(err.message || "Ошибка загрузки авторов");
            console.error("Ошибка загрузки авторов:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadAuthors();
    }, [loadAuthors]);

    return {
        authors,
        loading,
        error,
        loadAuthors,
    };
};
