package com.todo.helper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;

import com.todo.model.TaskDetails;
import com.todo.vo.TaskDetailsVO;

public class BeanHelper {
	
	public final static List<TaskDetailsVO> convertToVO(List<TaskDetails> tasks){
		
		List<TaskDetailsVO> taskDetailsVO = new ArrayList<TaskDetailsVO>();
		TaskDetailsVO vo = null;
		for(TaskDetails task : tasks) {
			vo = new TaskDetailsVO();
			BeanUtils.copyProperties(task, vo);
			taskDetailsVO.add(vo);
		}
		return taskDetailsVO;
	}

}
