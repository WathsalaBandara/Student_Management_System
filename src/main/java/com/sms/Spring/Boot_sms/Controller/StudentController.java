package com.sms.Spring.Boot_sms.Controller;


import com.sms.Spring.Boot_sms.Entity.Student;
import com.sms.Spring.Boot_sms.Service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.jdbc.core.JdbcTemplate;


import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin

public class StudentController {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    private StudentService studentService;

    public StudentController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    @PostMapping("/addStudent")
    public ResponseEntity<?> addStudent(@RequestBody Student student) {
        studentService.addStudent(student);
        return new ResponseEntity<>("Added Successfully", HttpStatus.OK);
    }


    @GetMapping("/getStudent")
    public List<Student> getStudent() {
        return studentService.getAllStudent();
    }

    @GetMapping("/getStudentById/{s_id}")
    public ResponseEntity<Student> getStudentById(@PathVariable int s_id) {
        Student student = studentService.getStudentById(s_id);
        if (student != null) {
            return ResponseEntity.ok(student);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/updateStudent/{s_id}")
    public ResponseEntity<String> updateStudent(@PathVariable int s_id, @RequestBody Student student) {
        Student updatedStudent = studentService.updateStudent(s_id, student);
        if (updatedStudent != null) {
            return ResponseEntity.ok("Successfully updated student.");
        } else {
            return ResponseEntity.badRequest().body("Failed to update student.");
        }
    }

    @DeleteMapping("deleteStudent/{s_id}")
    public ResponseEntity<?> deleteStudent(@PathVariable(required = false) int s_id) {
        studentService.deleteStudentById(s_id);
        return new ResponseEntity<>("Delete Student Successfully!", HttpStatus.OK);
    }


    @RequestMapping(value = "/{s_id}/course/{c_id}", method = RequestMethod.PUT)
    @ResponseBody
    public Student enroll(@PathVariable int s_id, @PathVariable int c_id) {
        return studentService.enroll(s_id, c_id);
    }


    @GetMapping("/EnrollList")
    public List<Map<String, Object>> readTable() {
        // Replace "your_table_name" with the actual name of the table you want to read
        String sql = "SELECT * FROM studentenroll";

        return jdbcTemplate.queryForList(sql);
    }
    @DeleteMapping("/deleteEnroll/{e_id}")
    public String deleteEnroll(@PathVariable int e_id) {
        // Replace "studentenroll" with the actual name of your table
        String sql = "DELETE FROM studentenroll WHERE e_id = ?";

        int rowsAffected = jdbcTemplate.update(sql, e_id);

        if (rowsAffected > 0) {
            return "Enroll with ID " + e_id + " deleted successfully.";
        } else {
            return "Enroll with ID " + e_id + " not found.";
        }
    }

    @GetMapping("/getTotalStudents")
    public ResponseEntity<Integer> getTotalStudents() {
        int totalStudents = studentService.getTotalStudents();
        return ResponseEntity.ok(totalStudents);
    }

    @GetMapping("/getTotalEnrolls")
    public int getTotalEnrollCount() {
        return studentService.getTotalEnrollCount();
    }
}


