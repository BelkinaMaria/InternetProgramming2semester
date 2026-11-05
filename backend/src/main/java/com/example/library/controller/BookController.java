package com.example.library.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import com.example.library.dto.BookDto;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

/**
 * REST-контроллер для сущности "книга".
 */
@RestController
@RequestMapping("/api/books")
@Tag(name = "Books", description = "CRUD-операции над книгами.")
public class BookController {

    // Коллекция хранится в памяти приложения (подойдёт ArrayList/LinkedList/и т.д.)
    private final List<BookDto> books = new ArrayList<>();
    private final AtomicLong idGenerator = new AtomicLong();

    public BookController() {
        books.addAll(Arrays.asList(
                new BookDto(nextId(), "Повелитель мух", 1L, Arrays.asList(1L, 2L), true,
                        "/imgs/lord-of-the-flies.jpeg",
                        "В результате авиакатастрофы группа детей оказывается на необитаемом острове.",
                        "аллегорический роман, антиутопия, приключения", false, "Русский", 320),
                new BookDto(nextId(), "Преступление и наказание", 2L, Arrays.asList(1L, 2L, 3L), true,
                        "/imgs/crime-and-punishment.jpg",
                        "Психологический роман о студенте Родионе Раскольникове, совершившем убийство старухи-процентщицы.",
                        "психологический роман, философская проза", true, "Русский", 672),
                new BookDto(nextId(), "Гранатовый браслет", 3L, Arrays.asList(1L), false,
                        "/imgs/the-garnet-bracelet.jpg",
                        "Повесть о безответной любви мелкого чиновника к замужней княгине.",
                        "повесть, любовная проза", false, "Русский", null)
        ));
    }

    private long nextId() {
        return idGenerator.incrementAndGet();
    }

    @Operation(summary = "Получить список всех книг.")
    @GetMapping
    public List<BookDto> getAll() {
        return books;
    }

    @Operation(summary = "Получить книгу по id.")
    @GetMapping("/{id}")
    public BookDto getById(@PathVariable Long id) {
        return findOrThrow(id);
    }

    @Operation(summary = "Добавить новую книгу.")
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public BookDto create(@Valid @RequestBody BookDto bookDto) {
        bookDto.setId(nextId());
        books.add(bookDto);
        return bookDto;
    }

    @Operation(summary = "Обновить книгу по id.")
    @PutMapping("/{id}")
    public BookDto update(@PathVariable Long id, @Valid @RequestBody BookDto bookDto) {
        BookDto existing = findOrThrow(id);
        int index = books.indexOf(existing);
        bookDto.setId(id);
        books.set(index, bookDto);
        return bookDto;
    }

    @Operation(summary = "Удалить книгу по id.")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        BookDto existing = findOrThrow(id);
        books.remove(existing);
    }

    private BookDto findOrThrow(Long id) {
        return books.stream()
                .filter(book -> book.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Книга с id=" + id + " не найдена!!!"));
    }
}
