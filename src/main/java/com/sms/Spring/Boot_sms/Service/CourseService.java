package com.sms.Spring.Boot_sms.Service;


import com.sms.Spring.Boot_sms.Entity.Course;
import com.sms.Spring.Boot_sms.Repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    public void createCourse(Course course) {

        courseRepository.save(course);
    }

    public List<Course> readAllCourse() {

        return courseRepository.findAll();
    }

    public Course readCourseById(int id){

        return courseRepository.findById(id).orElse(null);
    }

    public Course updateCourse(int id , Course course){
        Course updateCourse =courseRepository.findById(id).orElse(null);

        if(updateCourse==null){
            return null;
        }

        updateCourse.setC_name(course.getC_name());
        updateCourse.setDuration(course.getDuration());

        courseRepository.save(updateCourse);
        return updateCourse;

    }

    public void deleteCourseById(int c_id) {
        courseRepository.deleteById(c_id);
    }

    public int getTotalCourses() {
        return courseRepository.findAll().size();
    }

}



