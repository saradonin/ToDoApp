import React, {useState} from "react";

const NewTask = () => {

    return (
        <div className="card shadow">
            <div className="card-body">
                <h1 className="card-title">New task</h1>
                <form>
                    <div className="form-group">
                        <input type="text"
                               className="form-control"
                               name="title"
                               placeholder="Title"/>
                    </div>
                    <div className="form-group">
                        <input type="text"
                               className="form-control"
                               name="description"
                               placeholder="Description"/>
                    </div>
                    <button className="btn btn-info">
                        Add task
                        <i className="fas fa-plus-circle ml-1"></i>
                    </button>
                </form>
            </div>
        </div>

    )

}
export default NewTask