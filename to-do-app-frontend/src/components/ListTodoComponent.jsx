import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import TodoService from '../services/TodoService';

const ListTodoComponent = () => {

    const [toDos, setToDos] = useState([]);
    const [newTask, setNewTask] = useState('');
    const navigate = useNavigate();

    useEffect(() => {

        getAllToDo();

    }, []);

    const getAllToDo = () => {
        TodoService.getAllToDo().then((response) => {
            console.log(response.data);
            setToDos(response.data);
        });
    }

    function addToDo() {
        const newDone = false;
        if(newTask.length > 0) {
            const toDo = { task: newTask, done: newDone };
            TodoService.createToDo(toDo);
        }
    }

    function editToDo(id) {
        navigate(`/edit/${id}`);
    }

    function editToDoState(id, task, done, i) {
        const newToDos = toDos.slice();     //copy the array
        const toDo = { task, done };
        newToDos[i] = toDo;                 //execute the manipulations
        setToDos(newToDos);                 //set the new state
        TodoService.updateToDo(id, toDo);
    }

    function deleteToDo(id) {
        TodoService.deleteToDo(id).then(res => {
            setToDos(toDos.filter(toDo => toDo.id !== id));
        });
    }

    function deleteAll() {
        TodoService.deleteAllToDos().then(res => {
            setToDos([]);
        });
    }

    const pendingTasks = () => {
        let tasksLength = toDos.length;
        if (tasksLength === 1) {
            return <i>Tenés 1 tarea pendiente</i>;
        } else if (tasksLength > 1) {
            return <i>Tenés {tasksLength} tareas pendientes</i>;
        }
        return <i>No tenés tareas pendientes</i>;
    }

    return (
        <div className="wrapper">
            <header className="text-center">To Do List</header>
            <form className="inputfield" onSubmit={addToDo}>
                <input
                    type="text"
                    placeholder="Agregá una nueva tarea aquí"
                    value={newTask} 
                    onChange={(e) => setNewTask(e.target.value)} />
                <button
                    className="btn btn-primary">
                    <i className="fas fa-plus" ></i>
                </button>
            </form>
            <div>
                <ul className="todolist">
                    {
                        toDos.map((toDo, index) => 
                            <li key={toDo.id}>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={toDo.done}
                                    onChange={() => editToDoState(toDo.id, toDo.task, !toDo.done, index)}
                                />
                                <span>{toDo.task}</span>
                                <button
                                    id="buttons"
                                    className="btn btn-danger"
                                    type="button" onClick={() => deleteToDo(toDo.id)}>
                                    <i className="fa fa-trash" ></i>
                                </button>
                                <button
                                    id="buttons"
                                    className="btn btn-success"
                                    type="button" onClick={() => editToDo(toDo.id)}
                                    style={{ marginRight: "10px" }}>
                                    <i className="fas fa-edit"></i>
                                </button>
                            </li>
                        )
                    }
                </ul>
            </div>
            {
                pendingTasks()
            }
            <div style={{ textAlign: 'center' }}>
                <button
                    className="btn btn-danger"
                    data-toggle="tooltip" data-placement="center"
                    type="button" onClick={deleteAll}>
                    Borrar todo
                    <i className="fa fa-trash"
                        style={{ marginLeft: "5px", fontSize: "20px" }}>
                    </i>
                </button>
            </div>

        </div>
    )
}


export default ListTodoComponent;