package com.todo.service;

import java.util.List;

import com.todo.model.TaskDetails;
import com.todo.vo.TaskDetailsVO;

public interface TaskService {

	void saveTask(TaskDetails task);

	void updateTask(TaskDetails task);

	List<TaskDetails> findAllTasks();

	TaskDetails findById(Long id);

	void deleteTaskById(Long id);

	List<TaskDetails> findTasks(TaskDetailsVO task);
}