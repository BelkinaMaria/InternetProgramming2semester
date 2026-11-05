package com.example.library.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import com.example.library.dto.LibraryDto;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

/**
 * REST-контроллер для сущности "библиотека" (точка выдачи книг).
 */
@RestController
@RequestMapping("/api/libraries")
@Tag(name = "Libraries", description = "CRUD-операции над библиотеками.")
public class LibraryController {

    private final List<LibraryDto> libraries = new ArrayList<>();
    private final AtomicLong idGenerator = new AtomicLong();

    public LibraryController() {
        libraries.addAll(Arrays.asList(
                new LibraryDto(nextId(), "Центральная библиотека", "ул. Главная, 44",
                        "+7 (777) 777-77-77", "9.00-17.00"),
                new LibraryDto(nextId(), "Юго-Западная библиотека", "ул. Узкая, 6",
                        "+7 (888) 888-88-88", "10.00-17.00"),
                new LibraryDto(nextId(), "Северная библиотека", "ул. Широкая, 17",
                        "+7 (999) 999-99-99", "11.00-18.30")
        ));
    }

    private long nextId() {
        return idGenerator.incrementAndGet();
    }

    @Operation(summary = "Получить список всех библиотек.")
    @GetMapping
    public List<LibraryDto> getAll() {
        return libraries;
    }

    @Operation(summary = "Получить библиотеку по id.")
    @GetMapping("/{id}")
    public LibraryDto getById(@PathVariable Long id) {
        return findOrThrow(id);
    }

    @Operation(summary = "Добавить новую библиотеку.")
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public LibraryDto create(@Valid @RequestBody LibraryDto libraryDto) {
        libraryDto.setId(nextId());
        libraries.add(libraryDto);
        return libraryDto;
    }

    @Operation(summary = "Обновить библиотеку по id.")
    @PutMapping("/{id}")
    public LibraryDto update(@PathVariable Long id, @Valid @RequestBody LibraryDto libraryDto) {
        LibraryDto existing = findOrThrow(id);
        int index = libraries.indexOf(existing);
        libraryDto.setId(id);
        libraries.set(index, libraryDto);
        return libraryDto;
    }

    @Operation(summary = "Удалить библиотеку по id.")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        LibraryDto existing = findOrThrow(id);
        libraries.remove(existing);
    }

    private LibraryDto findOrThrow(Long id) {
        return libraries.stream()
                .filter(library -> library.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Библиотека с id=" + id + " не найдена!!!"));
    }
}
