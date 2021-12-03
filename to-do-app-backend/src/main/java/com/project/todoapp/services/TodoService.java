package com.project.todoapp.services;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.todoapp.models.TodoItem;
import com.project.todoapp.repositories.TodoRepository;

@Service
public class TodoService {

	@Autowired
	TodoRepository todoRepository;
	
	public ArrayList<TodoItem> findAll(){
        return (ArrayList<TodoItem>) todoRepository.findAll();
    }
	
	public Optional<TodoItem> findById(Long id){
        return todoRepository.findById(id);
    }
	
    public TodoItem save(TodoItem todoList){
        return todoRepository.save(todoList);
    }

    public boolean delete(TodoItem todoItem){
    	try{
    		todoRepository.delete(todoItem);
    		return true;
    	}catch(Exception err){
            return false;
        }
    }

    public boolean deleteAll() {
        try{
        	todoRepository.deleteAll();
            return true;
        }catch(Exception err){
            return false;
        }
    }
}