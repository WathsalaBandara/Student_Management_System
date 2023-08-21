package com.sms.Spring.Boot_sms.Entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Entity
@Data
@Table(name = "COURSE")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Transactional

public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "C_ID")
    private int c_id;

    @Column(name = "C_NAME")
    private String c_name;

    @Column(name = "DURATION")
    private String duration;

    @JsonIgnore
    @ManyToMany(mappedBy = "courses" , cascade = CascadeType.PERSIST)
    private List<Student> students;







}
