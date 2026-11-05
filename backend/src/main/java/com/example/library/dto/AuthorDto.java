package com.example.library.dto;

/**
 * DTO автора.
 */
public class AuthorDto {

    private Long id;
    private String name;
    private Integer birthYear;
    private String country;
    private String bio;

    public AuthorDto() {
    }

    public AuthorDto(Long id, String name, Integer birthYear, String country, String bio) {
        this.id = id;
        this.name = name;
        this.birthYear = birthYear;
        this.country = country;
        this.bio = bio;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getBirthYear() {
        return birthYear;
    }

    public void setBirthYear(Integer birthYear) {
        this.birthYear = birthYear;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }
}
