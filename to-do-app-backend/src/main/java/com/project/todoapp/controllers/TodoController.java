package com.project.todoapp.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.project.todoapp.models.TodoItem;
import com.project.todoapp.services.TodoService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class TodoController {
	
	@Autowired
	TodoService todoService;
	
	// get all tasks
	@GetMapping("/todoitems")
    public ArrayList<TodoItem> getToDos() {
		return this.todoService.findAll();
    }
	
	@GetMapping("/todoitems/{id}")
    public ResponseEntity<TodoItem> getToDoById(@PathVariable Long id){
		Optional<TodoItem> optionalTodo =  todoService.findById(id);
		TodoItem todoItem = optionalTodo.get();
        return ResponseEntity.ok(todoItem);
    }

	// create a to do 
	@PostMapping("/todoitems")
	public TodoItem createToDo(@RequestBody TodoItem todoItem) {
		return todoService.save(todoItem);
	}
	
	// update a	to do
	@PutMapping("/todoitems/{id}")
	public ResponseEntity<TodoItem> updateToDo(@PathVariable Long id, @RequestBody TodoItem todoItemDetails){
		Optional<TodoItem> optionalTodo =  todoService.findById(id);
		TodoItem todoItem = optionalTodo.get();
		
		todoItem.setTask(todoItemDetails.getTask());
		todoItem.setDone(todoItemDetails.getDone());
		
		TodoItem updatedEmployee = todoService.save(todoItem);
		return ResponseEntity.ok(updatedEmployee);
	}

	// delete a to do 
	//@RequestMapping(value="/todoitems/{id}", method={RequestMethod.DELETE, RequestMethod.GET})
	@DeleteMapping("/todoitems/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteToDo(@PathVariable Long id){
		Optional<TodoItem> optionalTodo =  todoService.findById(id);
		TodoItem todoItem = optionalTodo.get();
		todoService.delete(todoItem);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}

	// delete all items
	@DeleteMapping("/todoitems")
	public ResponseEntity<Map<String, Boolean>> deleteAll(){
		todoService.deleteAll();
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
}
