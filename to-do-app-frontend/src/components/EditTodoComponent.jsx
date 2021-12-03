import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import TodoService from '../services/TodoService';

const EditTodoComponent = () => {

    const {id} = useParams();
    const navigate = useNavigate();

    const [task, setTask] = useState('');
    const [editTask, setEditTask] = useState('');
    const [done, setDone] = useState(false);

    useEffect(() => {
            TodoService.getToDoById(id).then((response) => {
            setTask(response.data.task);
            setDone(response.data.done);
        });

    }, [id]);

    function editToDo() {
        if(editTask.length > 0) {
            const toDo = { task: editTask, done: done };
            TodoService.updateToDo(id, toDo).then(res => {
                navigate('/');
            });
        }else{
            navigate('/');
        }
    }

    function cancel() {
        navigate('/');
    }

    return (
        <div>
            <br></br>
            <div className="wrapper">
            <header className="text-center">Editar Tarea {task}</header>
                <div className="card-body">
                    <form className="inputfield" style={{ paddingBottom: "10px" }}>
                        <input placeholder="Tarea" name="task" className="form-control"
                            value={editTask} onChange={(e) => setEditTask(e.target.value)} />
                    </form>
                    <div style={{ textAlign: 'center' }}>
                        <button className="btn btn-success" onClick={editToDo}>Guardar</button>
                        <button className="btn btn-danger" onClick={cancel} style={{ marginLeft: "10px" }}>Cancelar</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default EditTodoComponent;