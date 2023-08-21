package com.sms.Spring.Boot_sms.Repository;

import com.sms.Spring.Boot_sms.Entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends JpaRepository<Course , Integer> {


}
