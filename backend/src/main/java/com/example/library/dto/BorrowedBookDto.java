package com.example.library.dto;

/**
 * Вложенный DTO книги, взятой пользователем на руки.
 * Используется внутри ProfileDto(getBorrowedBooks()).
 */
public class BorrowedBookDto {

    private Long id;
    private String title;
    private String author;
    private String dueDate;
    private boolean overdue;

    public BorrowedBookDto() {
    }

    public BorrowedBookDto(Long id, String title, String author, String dueDate, boolean overdue) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.dueDate = dueDate;
        this.overdue = overdue;
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

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getDueDate() {
        return dueDate;
    }

    public void setDueDate(String dueDate) {
        this.dueDate = dueDate;
    }

    public boolean isOverdue() {
        return overdue;
    }

    public void setOverdue(boolean overdue) {
        this.overdue = overdue;
    }
}
