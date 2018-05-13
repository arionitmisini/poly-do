import React, { Component } from 'react';
import { Link } from "react-router-dom";
import AuthService from "../AuthService";
class TaskCard extends Component {
    render() {

        const { taskId, taskName, taskDesc, TaskDue } = this.props;

        return (
            <div style={{ paddingBottom: '30px' }}>
                <div className="card" style={{ width: '18rem', marginRight: '20px' }}>
                    <div className="card-body">
                        <h5 className="card-title">{taskName}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{TaskDue}</h6>
                        <p className="card-text">{taskDesc}</p>
                        <a href="#" className="card-link">Open Task</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default TaskCard;



