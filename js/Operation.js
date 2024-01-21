import React, {useEffect, useState} from "react";
import {deleteOperation, updateOperation} from "./api/operations";

const Operation = ({operation, task, onUpdate}) => {
    const [currentOperation, setCurrentOperation] = useState(operation)
    const [addTimeFormVisibility, setAddTimeFormVisibility] = useState(false)

    const handleDeleteOperation = async () => {
        await deleteOperation(operation.id)
        onUpdate()
    }

    const formatTimeToString = (time) => {
        const hours = Math.floor(time / 60);
        const min = time % 60;
        return hours ? `${hours}h ${min}m` : `${min}m`
    }

    const showAddTimeForm = () => {
        setAddTimeFormVisibility(true)
    }

    const hideAddTimeForm = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setAddTimeFormVisibility(false)
        onUpdate()
    }

    const handleTimeChange = async (e) => {
        await setCurrentOperation(prevState => ({
            ...prevState,
            timeSpent: e.target.value
        }))
    }

    const handleAddTime = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        console.log(currentOperation)
        if (currentOperation.id) {
            await updateOperation(currentOperation);
            setAddTimeFormVisibility(false);
        }
    }

    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <div>
                {operation.description}
                {operation.timeSpent > 0 &&
                    <span className="badge badge-success badge-pill ml-2">{formatTimeToString(operation.timeSpent)}</span>}
            </div>

            {
                addTimeFormVisibility &&
                <form>
                    <div className="input-group input-group-sm">
                        <input type="number"
                               name={"time"}
                               value={currentOperation.timeSpent}
                               onChange={handleTimeChange}
                               className="form-control"
                               placeholder="Spent time in minutes"
                               style={{width: "12rem"}}/>
                        <div className="input-group-append">
                            <button className="btn btn-outline-success"
                                    onClick={handleAddTime}><i
                                    className="fas fa-save"></i></button>
                            <button className="btn btn-outline-dark"
                                    onClick={hideAddTimeForm}><i
                                    className="fas fa-times false"></i></button>
                        </div>
                    </div>
                </form>
            }


            {
                !addTimeFormVisibility &&
                <div>
                    {/*Przycisk widoczny tylko jeżeli status zadania jest "open"*/}
                    {
                        task.status === "open" &&
                        <button className="btn btn-outline-success btn-sm mr-2"
                                onClick={showAddTimeForm}>
                            Add time
                            <i className="fas fa-clock ml-1"></i>
                        </button>
                    }

                    <button className="btn btn-outline-danger btn-sm"
                            onClick={handleDeleteOperation}
                    ><i className="fas fa-trash"></i></button>
                </div>
            }

        </li>
    )
}
export default Operation