package com.todo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Import;

import com.todo.configuration.JpaConfiguration;

@Import(JpaConfiguration.class)
@SpringBootApplication(scanBasePackages = { "com.todo" }) // same as @Configuration @EnableAutoConfiguration
															// @ComponentScan
public class ToDoApp extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(ToDoApp.class, args);
	}

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {

		return application.sources(ToDoApp.class);
	}
}
