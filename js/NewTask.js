import React, {useState} from "react";
import {addNewTask, getTasks} from "./api/tasks";

const NewTask = ( { onNewTask } ) => {

    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        status: "open"})

    const handleChange = (e) => {
        const {name, value} = e.target
        setNewTask(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleAddTask = (e) => {
        e.preventDefault()
        console.log(newTask)
        addNewTask(newTask)
        onNewTask()
        setNewTask({
            title: "",
            description: "",
            status: "open"
        })
    }

    return (
        <div className="card shadow">
            <div className="card-body">
                <h1 className="card-title">New task</h1>
                <form>
                    <div className="form-group">
                        <input type="text"
                               className="form-control"
                               name="title"
                               value={newTask.title}
                               onChange={handleChange}
                               placeholder="Title"/>
                    </div>
                    <div className="form-group">
                        <input type="text"
                               className="form-control"
                               name="description"
                               value={newTask.description}
                               onChange={handleChange}
                               placeholder="Description"/>
                    </div>
                    <button className="btn btn-info" onClick={handleAddTask}>
                        Add task
                        <i className="fas fa-plus-circle ml-1"></i>
                    </button>
                </form>
            </div>
        </div>
    )
}
export default NewTask