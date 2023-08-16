package com.sms.Spring.Boot_sms;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@SpringBootApplication
public class SpringBootSmsApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootSmsApplication.class, args);
	}

}
