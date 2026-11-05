package com.example.library.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import com.example.library.dto.BorrowedBookDto;
import com.example.library.dto.ProfileDto;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

/**
 * REST-контроллер для сущности "профиль пользователя".
 */
@RestController
@RequestMapping("/api/profile")
@Tag(name = "Profile", description = "CRUD-операции над профилями пользователей.")
public class ProfileController {

    private final List<ProfileDto> profiles = new ArrayList<>();
    private final AtomicLong idGenerator = new AtomicLong();

    public ProfileController() {
        profiles.add(new ProfileDto(nextId(), "Иван", "Иванов", "+7-777-777-77-77",
                "email@email.e", 2, "/imgs/empty-profile-photo.jpg",
                Arrays.asList(
                        new BorrowedBookDto(1L, "Повелитель Мух", "Голдинг У.", "2025-06-23", true),
                        new BorrowedBookDto(2L, "Гранатовый Браслет", "Куприн А.И.", "2025-10-04", false)
                )));
    }

    private long nextId() {
        return idGenerator.incrementAndGet();
    }

    @Operation(summary = "Получить список всех профилей.")
    @GetMapping
    public List<ProfileDto> getAll() {
        return profiles;
    }

    @Operation(summary = "Получить профиль по id.")
    @GetMapping("/{id}")
    public ProfileDto getById(@PathVariable Long id) {
        return findOrThrow(id);
    }

    @Operation(summary = "Создать новый профиль.")
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ProfileDto create(@Valid @RequestBody ProfileDto profileDto) {
        profileDto.setId(nextId());
        profiles.add(profileDto);
        return profileDto;
    }

    @Operation(summary = "Обновить профиль по id.")
    @PutMapping("/{id}")
    public ProfileDto update(@PathVariable Long id, @Valid @RequestBody ProfileDto profileDto) {
        ProfileDto existing = findOrThrow(id);
        int index = profiles.indexOf(existing);
        profileDto.setId(id);
        profiles.set(index, profileDto);
        return profileDto;
    }

    @Operation(summary = "Удалить профиль по id.")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        ProfileDto existing = findOrThrow(id);
        profiles.remove(existing);
    }

    private ProfileDto findOrThrow(Long id) {
        return profiles.stream()
                .filter(profile -> profile.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Профиль с id=" + id + " не найден!!!"));
    }
}
