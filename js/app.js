import React, {useEffect, useState} from "react";
import {createRoot} from "react-dom/client";
import NewTask from "./NewTask";
import Task from "./Task";
import {getTasks} from "./api/tasks";


const App = () => {
    const [tasks, setTasks] = useState([])
    const [trigger, setTrigger] = useState(false)

    useEffect(() => {
        getTasks((data) => {
            setTasks(data)
            console.log("tasks:", tasks)
        })
    }, [trigger]);

    const handleNewTask = (newTaskData) => {
        setTrigger(prevState => !prevState)
    }

    return (
        <>
            <NewTask onNewTask={handleNewTask}/>
            {tasks && tasks.map((task) => <Task key={task.id} task={task}/>)}
        </>
    )
}

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App/>);
