package com.project.todoapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.todoapp.models.TodoItem;

@Repository
public interface TodoRepository extends JpaRepository<TodoItem, Long> {

}