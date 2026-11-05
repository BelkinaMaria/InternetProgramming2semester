package com.example.library.dto;

/**
 * DTO библиотек.
 */
public class LibraryDto {

    private Long id;
    private String name;
    private String address;
    private String phone;
    private String workingHours;

    public LibraryDto() {
    }

    public LibraryDto(Long id, String name, String address, String phone, String workingHours) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.workingHours = workingHours;
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getWorkingHours() {
        return workingHours;
    }

    public void setWorkingHours(String workingHours) {
        this.workingHours = workingHours;
    }
}
