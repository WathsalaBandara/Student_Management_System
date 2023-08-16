package com.sms.Spring.Boot_sms.Controller;


import com.sms.Spring.Boot_sms.Entity.Course;
import com.sms.Spring.Boot_sms.Service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class CourseController {

        @Autowired
        private CourseService courseService;

        @PostMapping("/addCourse")
        public ResponseEntity postCourse(@RequestBody Course course){
            courseService.createCourse(course);
            return new ResponseEntity(HttpStatus.CREATED);
        }

        @GetMapping("/getCourse")
        public List<Course> getCourse(){
            return courseService.readAllCourse();

        }

        @GetMapping("/getCourseById/{c_id}")
        public Course getCourseById(@PathVariable int c_id){
            return courseService.readCourseById(c_id);
        }

        @PutMapping("/updateCourse/{c_id}")
        public Course updateCourse(@PathVariable int c_id, @RequestBody Course course){
            return courseService.updateCourse(c_id,course);
        }

    @DeleteMapping("/deleteCourse/{c_id}")
    public ResponseEntity<?> deleteCourse(@PathVariable(name = "c_id") Integer c_id) {
        try {
            if (c_id == null) {
                return new ResponseEntity<>("Course ID is required.", HttpStatus.BAD_REQUEST);
            }

            courseService.deleteCourseById(c_id);
            return new ResponseEntity<>("Course deleted successfully.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred while deleting the course.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @GetMapping("/getTotalCourses")
    public ResponseEntity<Integer> getTotalCourses() {
        int totalCourses = courseService.getTotalCourses();
        return ResponseEntity.ok(totalCourses);
    }
    }


