package com.example.library.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import com.example.library.dto.AuthorDto;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

/**
 * REST-контроллер для сущности "автор".
 */
@RestController
@RequestMapping("/api/authors")
@Tag(name = "Authors", description = "CRUD-операции над авторами.")
public class AuthorController {

    private final List<AuthorDto> authors = new ArrayList<>();
    private final AtomicLong idGenerator = new AtomicLong();

    public AuthorController() {
        authors.addAll(Arrays.asList(
                new AuthorDto(nextId(), "Уильям Голдинг", 1911, "Великобритания",
                        "Английский писатель, лауреат Нобелевской премии по литературе 1983 года."),
                new AuthorDto(nextId(), "Фёдор Достоевский", 1821, "Россия",
                        "Великий русский писатель, мыслитель, философ и публицист."),
                new AuthorDto(nextId(), "Александр Куприн", 1870, "Россия",
                        "Русский писатель, переводчик, один из самых известных писателей-реалистов начала XX века.")
        ));
    }

    private long nextId() {
        return idGenerator.incrementAndGet();
    }

    @Operation(summary = "Получить список всех авторов.")
    @GetMapping
    public List<AuthorDto> getAll() {
        return authors;
    }

    @Operation(summary = "Получить автора по id.")
    @GetMapping("/{id}")
    public AuthorDto getById(@PathVariable Long id) {
        return findOrThrow(id);
    }

    @Operation(summary = "Добавить нового автора.")
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public AuthorDto create(@Valid @RequestBody AuthorDto authorDto) {
        authorDto.setId(nextId());
        authors.add(authorDto);
        return authorDto;
    }

    @Operation(summary = "Обновить автора по id.")
    @PutMapping("/{id}")
    public AuthorDto update(@PathVariable Long id, @Valid @RequestBody AuthorDto authorDto) {
        AuthorDto existing = findOrThrow(id);
        int index = authors.indexOf(existing);
        authorDto.setId(id);
        authors.set(index, authorDto);
        return authorDto;
    }

    @Operation(summary = "Удалить автора по id.")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        AuthorDto existing = findOrThrow(id);
        authors.remove(existing);
    }

    private AuthorDto findOrThrow(Long id) {
        return authors.stream()
                .filter(author -> author.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Автор с id=" + id + " не найден!!!"));
    }
}
