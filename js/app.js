import React, {useEffect, useState} from "react";
import {createRoot} from "react-dom/client";
import NewTask from "./NewTask";
import Task from "./Task";
import {getTasks} from "./api/tasks";


const Main = ({ tasks, onUpdateTask }) => {
    return (
        <>
            <NewTask onNewTask={onUpdateTask} />
            {tasks && tasks.map((task) => <Task
                key={task.id}
                task={task}
                onUpdateTask={onUpdateTask} />)}
        </>
    )
}

const App = () => {
    const [tasks, setTasks] = useState([])
    const [taskUpdateTrigger, setTaskUpdateTrigger] = useState(false)

    const updateTaskList = async () => {
        await setTaskUpdateTrigger((prevState) => !prevState)
    }

    useEffect(() => {
        getTasks((data) => {
            setTasks(data)
        })
    }, [taskUpdateTrigger])

    return <Main tasks={tasks} onUpdateTask={updateTaskList} />
};

const container = document.getElementById("app")
const root = createRoot(container)
root.render(<App/>)
