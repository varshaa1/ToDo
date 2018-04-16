package com.todo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.todo.model.TaskDetails;
import com.todo.vo.TaskDetailsVO;

@Repository
public interface TaskRepository extends JpaRepository<TaskDetails, Long> {

	// List<TaskDetails> findList(Specification<TaskDetails> spec);

	@Query("SELECT t FROM TaskDetails t where t.status = :#{#task.status} and t.startdate between :#{#task.fromDate} and :#{#task.toDate}")
	List<TaskDetails> findTaskList(@Param("task") TaskDetailsVO task);
}
