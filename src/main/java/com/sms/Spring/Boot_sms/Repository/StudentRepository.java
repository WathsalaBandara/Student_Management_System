package com.sms.Spring.Boot_sms.Repository;

import com.sms.Spring.Boot_sms.Entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student,Integer> {


}
