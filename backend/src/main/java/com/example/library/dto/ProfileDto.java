package com.example.library.dto;

import java.util.List;

/**
 * DTO профиля пользователя.
 */
public class ProfileDto {

    private Long id;
    private String firstName;
    private String lastName;
    private String phone;
    private String email;
    private int booksCount;
    private String avatar;
    private List<BorrowedBookDto> borrowedBooks;

    public ProfileDto() {
    }

    public ProfileDto(Long id, String firstName, String lastName, String phone, String email,
                       int booksCount, String avatar, List<BorrowedBookDto> borrowedBooks) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;
        this.booksCount = booksCount;
        this.avatar = avatar;
        this.borrowedBooks = borrowedBooks;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getBooksCount() {
        return booksCount;
    }

    public void setBooksCount(int booksCount) {
        this.booksCount = booksCount;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public List<BorrowedBookDto> getBorrowedBooks() {
        return borrowedBooks;
    }

    public void setBorrowedBooks(List<BorrowedBookDto> borrowedBooks) {
        this.borrowedBooks = borrowedBooks;
    }
}
