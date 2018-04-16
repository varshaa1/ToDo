package com.todo.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.todo.helper.BeanHelper;
import com.todo.model.TaskDetails;
import com.todo.service.TaskService;
import com.todo.util.CustomErrorType;
import com.todo.vo.TaskDetailsVO;

@RestController
@RequestMapping("/api")
public class TaskController {

	public static final Logger logger = LoggerFactory.getLogger(TaskController.class);

	@Autowired
	TaskService taskService; // Service which will do all data retrieval/manipulation work

	// -------------------Find Tasks by
	// filter---------------------------------------------

	@RequestMapping(value = "/find/", method = RequestMethod.PUT)
	public ResponseEntity<?> search(@RequestBody TaskDetailsVO task) {
		logger.info("Finding tasks by filter");
		List<TaskDetailsVO> list = BeanHelper.convertToVO(taskService.findTasks(task));
		return new ResponseEntity<List<TaskDetailsVO>>(list, HttpStatus.OK);
	}

	// -------------------Retrieve All
	// Tasks---------------------------------------------

	@RequestMapping(value = "/task/", method = RequestMethod.GET)
	public ResponseEntity<List<TaskDetailsVO>> listAllTasks() {
		logger.info("Fetching all Tasks ");
		List<TaskDetailsVO> tasks = BeanHelper.convertToVO(taskService.findAllTasks());
		if (tasks.isEmpty()) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<TaskDetailsVO>>(tasks, HttpStatus.OK);
	}

	// -------------------Retrieve Single
	// Task-----------------------------------------
	@RequestMapping(value = "/task/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getTasks(@PathVariable("id") long id) {
		logger.info("Fetching Task with id {}", id);
		TaskDetails task = taskService.findById(id);
		if (task == null) {
			logger.error("Task with id {} not found.", id);
			return new ResponseEntity(new CustomErrorType("Task with id " + id + " not found"), HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<TaskDetails>(task, HttpStatus.OK);
	}

	// -------------------Create a task-------------------------------------------

	@RequestMapping(value = "/task/", method = RequestMethod.POST)
	public ResponseEntity<?> createtask(@RequestBody TaskDetails task, UriComponentsBuilder ucBuilder) {
		logger.info("Creating Task with id {}");
		taskService.saveTask(task);
		HttpHeaders headers = new HttpHeaders();
		headers.setLocation(ucBuilder.path("/api/task/{id}").buildAndExpand(task.getId()).toUri());
		return new ResponseEntity<String>(headers, HttpStatus.CREATED);
	}

	// ------------------- Update a User
	// ------------------------------------------------

	@RequestMapping(value = "/task/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> updateTask(@PathVariable("id") long id, @RequestBody TaskDetails task) {
		logger.info("Updating Task with id {}", id);

		TaskDetails currentTask = taskService.findById(id);

		if (currentTask == null) {
			logger.error("Unable to update. Task with id {} not found.", id);
			return new ResponseEntity(new CustomErrorType("Unable to upate. Task with id " + id + " not found."),
					HttpStatus.NOT_FOUND);
		}

		currentTask.setProjectname(task.getProjectname());
		currentTask.setTaskdescription(task.getTaskdescription());
		currentTask.setAssignto(task.getAssignto());
		currentTask.setStartdate(task.getStartdate());
		currentTask.setEnddate(task.getEnddate());
		currentTask.setStatus(task.getStatus());

		taskService.updateTask(currentTask);
		return new ResponseEntity<TaskDetails>(currentTask, HttpStatus.OK);
	}

	// ------------------- Delete a Task-----------------------------------------

	@RequestMapping(value = "/task/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<?> deleteTask(@PathVariable("id") long id) {
		logger.info("Fetching & Deleting Task with id {}", id);

		TaskDetails task = taskService.findById(id);

		taskService.deleteTaskById(id);
		if (task == null) {
			logger.error("Unable to delete. Task with id {} not found.", id);
			return new ResponseEntity(new CustomErrorType("Unable to delete. Task with id " + id + " not found."),
					HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<TaskDetails>(HttpStatus.NO_CONTENT);
	}
}