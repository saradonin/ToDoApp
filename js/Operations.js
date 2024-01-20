import React, {useEffect, useState} from "react";
import Operation from "./Operation";
import {addNewOperation, getOperations} from "./api/operations";

const Operations = ({ form, task, operations, onUpdateOperation}) => {

    const [newOperation, setNewOperation] = useState({description: "", timeSpent: 0})
    const [operationsList, setOperationsList] = useState(operations)
    const [operationUpdateTrigger, setOperationUpdateTrigger] = useState(false)

    const handleChange = (e) => {
        const {name, value} = e.target
        setNewOperation(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleAddOperation = async (e) => {
        e.preventDefault()
        console.log(newOperation)
        await addNewOperation(task.id, newOperation)
        onUpdateOperation()
        setNewOperation({description: "", timeSpent: 0})
    }

    const handleUpdateOperations = async () => {
        await setOperationUpdateTrigger(prevState => !prevState)
    }

    useEffect(() => {
        setOperationsList(operations)
    }, [operations, operationUpdateTrigger]);

    return (
        <>
            {
                form &&
                <div className="card-body">
                    <form>
                        <div className="input-group">
                            <input type="text"
                                   name="description"
                                   value={newOperation.description}
                                   onChange={handleChange}
                                   className="form-control"
                                   placeholder="Operation description"/>

                            <div className="input-group-append">
                                <button className="btn btn-info"
                                        onClick={handleAddOperation}>
                                    Add
                                    <i className="fas fa-plus-circle ml-1"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            }


            <ul className="list-group list-group-flush">
                {
                    operationsList.length > 0 &&
                    operationsList.map((operation) => (
                        <Operation key={operation.id}
                                   operation={operation}
                                   onUpdate={handleUpdateOperations}/>
                    ))
                }
            </ul>
        </>
    )
}
export default Operations