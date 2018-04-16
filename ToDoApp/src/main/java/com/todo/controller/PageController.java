package com.todo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class PageController {

	@RequestMapping("/index")
	String home(ModelMap modal) {
		modal.addAttribute("title", "ToDo Application");
		return "index";
	}

	@RequestMapping("/page/{page}")
	String pageHandler(@PathVariable("page") final String page) {
		return page;
	}

}
