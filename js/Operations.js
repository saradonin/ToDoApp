import React, {useEffect, useState} from "react";
import Operation from "./Operation";
import {addNewOperation} from "./api/operations";

const Operations = ({ form, task, operations, onNewOperation}) => {

    const [newOperation, setNewOperation] = useState({description: "", timeSpent: 0})
    const [operationsList, setOperationsList] = useState(operations)

    const handleChange = (e) => {
        const {name, value} = e.target
        setNewOperation(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleAddOperation = (e) => {
        e.preventDefault()
        console.log(newOperation)
        addNewOperation(task.id, newOperation)
        onNewOperation()
        setNewOperation({description: "", timeSpent: 0})
    }

    useEffect(() => {
        setOperationsList(operations)
    }, [operations, onNewOperation]);

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
                                   operation={operation}/>
                    ))
                }
            </ul>
        </>
    )
}
export default Operations