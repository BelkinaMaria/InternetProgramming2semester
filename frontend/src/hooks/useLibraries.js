import { useState, useEffect, useCallback } from "react";
import { libraryService } from "../services/api";

export const useLibraries = () => {
    const [libraries, setLibraries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadLibraries = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const librariesData = await libraryService.getAllLibraries();
            setLibraries(librariesData);
        } catch (err) {
            setError(err.message || "Ошибка загрузки библиотек");
            console.error("Ошибка загрузки библиотек:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadLibraries();
    }, [loadLibraries]);

    const addLibrary = async (libraryData) => {
        try {
            setLoading(true);
            const newLibrary = await libraryService.addLibrary(libraryData);
            setLibraries((prev) => [...prev, newLibrary]);
            return newLibrary;
        } catch (err) {
            setError(err.message || "Ошибка добавления библиотеки");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateLibrary = async (id, libraryData) => {
        try {
            setLoading(true);
            const updatedLibrary = await libraryService.updateLibrary(id, libraryData);
            setLibraries((prev) => prev.map((lib) => (lib.id === id ? updatedLibrary : lib)));
            return updatedLibrary;
        } catch (err) {
            setError(err.message || "Ошибка обновления библиотеки");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteLibrary = async (id) => {
        try {
            setLoading(true);
            await libraryService.deleteLibrary(id);
            setLibraries((prev) => prev.filter((lib) => lib.id !== id));
        } catch (err) {
            setError(err.message || "Ошибка удаления библиотеки");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const getLibraryById = async (id) => {
        try {
            return await libraryService.getLibraryById(id);
        } catch (err) {
            setError(err.message || "Ошибка загрузки библиотеки");
            throw err;
        }
    };

    return {
        libraries,
        loading,
        error,
        loadLibraries,
        addLibrary,
        updateLibrary,
        deleteLibrary,
        getLibraryById,
    };
};
