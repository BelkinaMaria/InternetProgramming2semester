const API_BASE = "http://localhost:8080/api";

// Функция для обработки HTTP запросов с повторными попытками.
const fetchData = async (url, options = {}, retries = 3) => {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                },
                ...options,
            });

            if (!response.ok) {
                const error = new Error(`HTTP error! status: ${response.status}`);
                error.status = response.status;

                if (response.status === 404) {
                    error.message = "Ресурс не найден";
                } else if (response.status === 500) {
                    error.message = "Внутренняя ошибка сервера";
                }

                throw error;
            }

            // Проверяю, есть ли контент для парсинга.
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const data = await response.json();
                return data;
            }

            return null;
        } catch (error) {
            if (i === retries - 1) {
                console.error(`API Error (${url}):`, error);
                throw error;
            }

            // Жду перед повторной попыткой.
            await new Promise((resolve) => setTimeout(resolve, 1000 * Math.pow(2, i)));
        }
    }
};

// Валидация данных.
const validateBookData = (bookData) => {
    if (!bookData.title || !bookData.authorId) {
        throw new Error("Название книги и автор обязательны");
    }

    if (bookData.pages && (bookData.pages < 1 || bookData.pages > 10000)) {
        throw new Error("Некорректное количество страниц");
    }

    return true;
};

const validateAuthorData = (authorData) => {
    if (!authorData.name) {
        throw new Error("Имя автора обязательно");
    }

    if (authorData.birthYear && (authorData.birthYear < 1000 || authorData.birthYear > new Date().getFullYear())) {
        throw new Error("Некорректный год рождения");
    }

    return true;
};

const validateLibraryData = (libraryData) => {
    if (!libraryData.name || !libraryData.address || !libraryData.workingHours) {
        throw new Error("Название, адрес и график работы обязательны");
    }

    return true;
};

export const bookService = {
    async getBookById(id) {
        if (!id) throw new Error("ID книги обязателен");
        return await fetchData(`${API_BASE}/books/${id}`);
    },

    async addBook(bookData) {
        validateBookData(bookData);
        return await fetchData(`${API_BASE}/books`, {
            method: "POST",
            body: JSON.stringify(bookData),
        });
    },

    async getAllBooks() {
        return await fetchData(`${API_BASE}/books`);
    },

    async updateBook(id, bookData) {
        validateBookData(bookData);
        return await fetchData(`${API_BASE}/books/${id}`, {
            method: "PUT",
            body: JSON.stringify(bookData),
        });
    },

    async deleteBook(id) {
        if (!id) throw new Error("ID книги обязателен");
        return await fetchData(`${API_BASE}/books/${id}`, {
            method: "DELETE",
        });
    },

    async searchBooks(query, filters = {}) {
        const allBooks = await this.getAllBooks();

        return allBooks.filter((book) => {
            // Поиск по названию и автору.
            const matchesSearch =
                !query ||
                book.title.toLowerCase().includes(query.toLowerCase()) ||
                (book.author && book.author.name && book.author.name.toLowerCase().includes(query.toLowerCase()));

            // Фильтрация.
            const matchesEbook = !filters.hasEbook || book.hasEbook;
            const matchesLibrary = !filters.availableInLibrary || (book.libraryIds && book.libraryIds.length > 0);
            const matchesAuthor = !filters.author || book.authorId.toString() === filters.author.toString();

            return matchesSearch && matchesEbook && matchesLibrary && matchesAuthor;
        });
    },
};

export const authorService = {
    async getAllAuthors() {
        return await fetchData(`${API_BASE}/authors`);
    },

    async getAuthorById(id) {
        if (!id) throw new Error("ID автора обязателен");
        return await fetchData(`${API_BASE}/authors/${id}`);
    },

    async addAuthor(authorData) {
        validateAuthorData(authorData);
        return await fetchData(`${API_BASE}/authors`, {
            method: "POST",
            body: JSON.stringify(authorData),
        });
    },

    async updateAuthor(id, authorData) {
        validateAuthorData(authorData);
        return await fetchData(`${API_BASE}/authors/${id}`, {
            method: "PUT",
            body: JSON.stringify(authorData),
        });
    },

    async deleteAuthor(id) {
        if (!id) throw new Error("ID автора обязателен");
        return await fetchData(`${API_BASE}/authors/${id}`, {
            method: "DELETE",
        });
    },
};

export const libraryService = {
    async getAllLibraries() {
        return await fetchData(`${API_BASE}/libraries`);
    },

    async getLibraryById(id) {
        if (!id) throw new Error("ID библиотеки обязателен");
        return await fetchData(`${API_BASE}/libraries/${id}`);
    },

    async addLibrary(libraryData) {
        validateLibraryData(libraryData);
        return await fetchData(`${API_BASE}/libraries`, {
            method: "POST",
            body: JSON.stringify(libraryData),
        });
    },

    async updateLibrary(id, libraryData) {
        validateLibraryData(libraryData);
        return await fetchData(`${API_BASE}/libraries/${id}`, {
            method: "PUT",
            body: JSON.stringify(libraryData),
        });
    },

    async deleteLibrary(id) {
        if (!id) throw new Error("ID библиотеки обязателен");
        return await fetchData(`${API_BASE}/libraries/${id}`, {
            method: "DELETE",
        });
    },
};

export const profileService = {
    async getProfile() {
        return await fetchData(`${API_BASE}/profile`);
    },

    async updateProfile(profileData) {
        return await fetchData(`${API_BASE}/profile`, {
            method: "PUT",
            body: JSON.stringify(profileData),
        });
    },

    async borrowBook(bookId) {
        return await fetchData(`${API_BASE}/profile/borrow`, {
            method: "POST",
            body: JSON.stringify({ bookId }),
        });
    },

    async returnBook(bookId) {
        // Логика возврата книги.
        return await fetchData(`${API_BASE}/profile/return`, {
            method: "POST",
            body: JSON.stringify({ bookId }),
        });
    },
};

export const subscriptionService = {
    async getSubscriptions() {
        return await fetchData(`${API_BASE}/subscriptions`);
    },

    async subscribe(data) {
        return await fetchData(`${API_BASE}/subscriptions`, {
            method: "POST",
            body: JSON.stringify(data),
        });
    },

    async unsubscribe(id) {
        return await fetchData(`${API_BASE}/subscriptions/${id}`, {
            method: "DELETE",
        });
    },
};
