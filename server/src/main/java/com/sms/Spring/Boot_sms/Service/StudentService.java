package com.sms.Spring.Boot_sms.Service;


import com.sms.Spring.Boot_sms.Entity.Course;
import com.sms.Spring.Boot_sms.Entity.Student;
import com.sms.Spring.Boot_sms.Repository.CourseRepository;
import com.sms.Spring.Boot_sms.Repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@Service
@CrossOrigin

public class StudentService  {

    private JdbcTemplate jdbcTemplate;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CourseRepository courseRepository;

    public StudentService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void addStudent(Student student){
        studentRepository.save(student);
    }

    public Student getStudentById(int s_id) {
        return studentRepository.findById(s_id).orElse(null);

    }
    public List<Student> getAllStudent(){

        return studentRepository.findAll();
    }

    public Student updateStudent(int s_id , Student student){
        Student updateStudent =studentRepository.findById(s_id).orElse(null);

        if(updateStudent==null){
            return null;
        }

        updateStudent.setS_name(student.getS_name());
        updateStudent.setEmail(student.getEmail());
        updateStudent.setGender(student.getGender());
        updateStudent.setDob(student.getDob());

        studentRepository.save(updateStudent);
        return updateStudent;
    }

    public void deleteStudentById(int s_id) {
        studentRepository.deleteById(s_id);
    }


    public Student enroll(int s_id, int c_id) {
        List<Course> courseSet = null;
        Student student = studentRepository.findById(s_id).get();
        Course course = courseRepository.findById(c_id).get();
        courseSet = (List<Course>) student.getCourses();
        courseSet.add(course);
        student.setCourses((List<Course>) courseSet);
        return studentRepository.save(student);
    }


    public int getTotalStudents() {
        return studentRepository.findAll().size();
    }

    public int getTotalEnrollCount() {
        String sql = "SELECT COUNT(*) FROM studentenroll";
        return jdbcTemplate.queryForObject(sql, Integer.class);
    }






















    /*
    public Student createStudent(Student student){
        return studentRepository.save(student);
    }

    public List<Student> readAllStudent() {
        return  studentRepository.findAll();
    }

    public Student readStudentById(int s_id){
        return studentRepository.findById(s_id).orElse(null);
    }

    public Student updateStudent(int s_id , Student student){
        Student updateStudent =studentRepository.findById(s_id).orElse(null);

        if(updateStudent==null){
            return null;
        }

        updateStudent.setS_name(student.getS_name());
        updateStudent.setEmail(student.getEmail());
        updateStudent.setGender(student.getGender());
        updateStudent.setDob(student.getDob());

        //updateStudent.setC_id(student.getC_id());

        studentRepository.save(updateStudent);
        return updateStudent;
    }

    public String deleteStudent(int s_id){
        studentRepository.deleteById(s_id);
        return "Successfully delete";
    }

*/

    /*
    public void createStudent(StudentDTO studentDTO) {
        studentRepository.createStudent(
                studentDTO.getDob(),
                studentDTO.getS_name(),
                studentDTO.getGender(),
                studentDTO.getEmail(),
                studentDTO.getC_id()
        );
    }
*/


    /*
    public boolean deleteStudent(StudentDTO studentDTO){
        studentRepository.delete(modelMapper.map(studentDTO,Student.class));
        return true;
    }
    */


}
