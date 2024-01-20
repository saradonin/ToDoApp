import React, {useState, useEffect} from "react";
import {deleteTask, updateTask} from "./api/tasks";

const Task = ({ task, onUpdate }) => {

    const [currentTask, setCurrentTask] = useState(task)

    const handleDeleteTask = async () => {
        await deleteTask(currentTask.id)
        onUpdate()
    }

    const handleUpdateTask = () => {
        setCurrentTask(prevState => ({
            ...prevState,
            status: "closed"
        }))
    }

    useEffect(() => {
        updateTask(currentTask)
        onUpdate()
    }, [currentTask]);

    return (
        <section className="card mt-5 shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
                <div>
                    <h5>{currentTask.title}</h5>
                    <h6 className="card-subtitle text-muted"> {currentTask.description} </h6>
                </div>


                <div>
                    {
                        currentTask.status === "open" && <>
                            <button className="btn btn-info btn-sm mr-2">
                                Add operation
                                <i className="fas fa-plus-circle ml-1"></i>
                            </button>
                            <button className="btn btn-dark btn-sm"
                                    onClick={handleUpdateTask}>
                                Finish
                                <i className="fas fa-archive ml-1"></i>
                            </button>
                        </>
                    }

                    {/*Przycisk usuwania ma być widoczny tylko*/}
                    {/*jeżeli nie ma żadnych operacji w zadaniu*/}
                    <button className="btn btn-outline-danger btn-sm ml-2"
                            onClick={handleDeleteTask}>
                        <i className="fas fa-trash false"></i>
                    </button>
                </div>
            </div>


            {/*Komponent Operations */}
        </section>
    )
}
export default Task