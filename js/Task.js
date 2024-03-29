import React, {useState, useEffect} from "react";
import {deleteTask, updateTask} from "./api/tasks";
import {getOperations} from "./api/operations";
import Operations from "./Operations";

const Task = ({task, onUpdateTask}) => {

    const [currentTask, setCurrentTask] = useState(task)
    const [operations, setOperations] = useState([])
    const [addOperationForm, setAddOperationForm] = useState(false)
    const [operationUpdateTrigger, setOperationUpdateTrigger] = useState(false)

    const handleDeleteTask = async () => {
        await deleteTask(currentTask.id)
        onUpdateTask()
    }

    const handleUpdateTask = () => {
        setCurrentTask(prevState => ({
            ...prevState,
            status: "closed"
        }))
    }

    const handleAddOperationForm = () => {
        setAddOperationForm(prevState => !prevState)
    }

    const updateOperationList = async () => {
        await setOperationUpdateTrigger(prevState => !prevState)
    }

    useEffect(() => {
        getOperations(currentTask.id, (data) => {
            setOperations(data)
        })
    }, [operationUpdateTrigger, currentTask.id]);

    useEffect(() => {
        updateTask(currentTask)
        onUpdateTask()
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
                        currentTask.status === "open" &&
                        <>
                            <button className="btn btn-info btn-sm mr-2"
                                    onClick={handleAddOperationForm}>
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

                    {
                        operations.length === 0 &&
                        <button className="btn btn-outline-danger btn-sm ml-2"
                                onClick={handleDeleteTask}>
                            <i className="fas fa-trash false"></i>
                        </button>
                    }

                </div>
            </div>

            <Operations operations={operations}
                        task={currentTask}
                        form={addOperationForm}
                        onUpdateOperation={updateOperationList}
                        onAddOperation={handleAddOperationForm}/>
        </section>
    )
}
export default Task