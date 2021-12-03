import axios from 'axios';

const TODO_API_BASE_URL = "http://localhost:8080/api/todoitems";

class TodoService {

    getAllToDo(){
        return axios.get(TODO_API_BASE_URL);
    }

    getToDoById(todoId){
        return axios.get(TODO_API_BASE_URL + '/' + todoId);
    }

    createToDo(todoItem){
        console.log(todoItem);
        return axios.post(TODO_API_BASE_URL, todoItem);
    }

    updateToDo(todoId, todoItem){
        return axios.put(TODO_API_BASE_URL + '/' + todoId, todoItem);
    }

    deleteToDo(todoId){
        return axios.delete(TODO_API_BASE_URL + '/' + todoId);
    }

    deleteAllToDos(){
        return axios.delete(TODO_API_BASE_URL);
    }
}

export default new TodoService()