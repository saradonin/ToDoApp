import React, {useEffect, useState} from "react";
import {createRoot} from "react-dom/client";
import NewTask from "./NewTask";
import Task from "./Task";
import {getTasks} from "./api/tasks";


const App = () => {
    const [tasks, setTasks] = useState([])
    const [taskUpdateTrigger, setTaskUpdateTrigger] = useState(false)

    useEffect(() => {
        getTasks((data) => {
            setTasks(data)
        })
    }, [taskUpdateTrigger]);

    const updateTaskList = (newTaskData) => {
        setTaskUpdateTrigger(prevState => !prevState)
    }

    return (
        <>
            <NewTask onNewTask={updateTaskList}/>
            {tasks && tasks.map((task) => <Task
                key={task.id}
                task={task}
                onDelete={updateTaskList}/>)}
        </>
    )
}

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App/>);
