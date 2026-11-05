package com.example.library.dto;

import java.util.List;

/**
 * DTO книги.
 */
public class BookDto {

    private Long id;
    private String title;
    private Long authorId;
    private List<Long> libraryIds;
    private boolean hasEbook;
    private String image;
    private String description;
    private String genre;
    private boolean illustrations;
    private String language;
    private Integer pages;

    public BookDto() {
    }

    public BookDto(Long id, String title, Long authorId, List<Long> libraryIds, boolean hasEbook,
                   String image, String description, String genre, boolean illustrations,
                   String language, Integer pages) {
        this.id = id;
        this.title = title;
        this.authorId = authorId;
        this.libraryIds = libraryIds;
        this.hasEbook = hasEbook;
        this.image = image;
        this.description = description;
        this.genre = genre;
        this.illustrations = illustrations;
        this.language = language;
        this.pages = pages;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Long getAuthorId() {
        return authorId;
    }

    public void setAuthorId(Long authorId) {
        this.authorId = authorId;
    }

    public List<Long> getLibraryIds() {
        return libraryIds;
    }

    public void setLibraryIds(List<Long> libraryIds) {
        this.libraryIds = libraryIds;
    }

    public boolean isHasEbook() {
        return hasEbook;
    }

    public void setHasEbook(boolean hasEbook) {
        this.hasEbook = hasEbook;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public boolean isIllustrations() {
        return illustrations;
    }

    public void setIllustrations(boolean illustrations) {
        this.illustrations = illustrations;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public Integer getPages() {
        return pages;
    }

    public void setPages(Integer pages) {
        this.pages = pages;
    }
}
