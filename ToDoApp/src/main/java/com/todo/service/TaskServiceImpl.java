package com.todo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.todo.model.TaskDetails;
import com.todo.repositories.TaskRepository;
import com.todo.vo.TaskDetailsVO;

@Service("taskServiceImpl")
@Transactional
public class TaskServiceImpl implements TaskService {

	@Autowired
	TaskRepository taskrepository;

	public void saveTask(TaskDetails task) {
		taskrepository.save(task);
	}

	public List<TaskDetails> findAllTasks() {
		return taskrepository.findAll();
	}

	public TaskDetails findById(Long id) {
		return taskrepository.findOne(id);
	}

	public void deleteTaskById(Long id) {
		taskrepository.delete(id);
	}

	public void updateTask(TaskDetails task) {
		saveTask(task);
	}

	@Override
	public List<TaskDetails> findTasks(TaskDetailsVO task) {
		return taskrepository.findTaskList(task);
	}

	/*
	 * @Override public List<TaskDetails> findTasks(TaskDetails task) { // TODO
	 * Auto-generated method stub Specification<TaskDetails> spec =
	 * TaskSpecifications.hasStatus(task.getStatus()); //List<TaskDetails>
	 * taskDetails = taskrepository.findList(spec); return null; }
	 */

}
