package com.sms.Spring.Boot_sms.Entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.util.List;


@Entity
@Data
@Table(name = "STUDENT")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Transactional

public class Student {
    @Id
    @Column(name = "S_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int s_id;

    @Column(name = "S_NAME")
    private String s_name;

    @Column(name = "GENDER")
    private String gender;

    @Column(name = "DOB")
    private Date dob;

    @Column(name = "EMAIL")
    private String email;



    @ManyToMany
    @JoinTable(name = "Studentenroll",
            joinColumns = {
                @JoinColumn(name = "student_id")
            },
            inverseJoinColumns = {
                @JoinColumn(name = "course_id")
            }
    )
    private List<Course> courses;





}
