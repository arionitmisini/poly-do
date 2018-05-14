import React, { Component } from 'react';
import AuthService from "../AuthService";

class TaskCard extends Component {
    constructor() {
        super();
        this.Auth = new AuthService();
        this.onTaskDelete = this.onTaskDelete.bind(this);
        this.onTaskEdit = this.onTaskEdit.bind(this);
        this.goToTaskView = this.goToTaskView.bind(this);
    }

    onTaskDelete() {
        this.Auth.fetch(`http://localhost:5000/api/tasks/${this.props.taskId}`, {
            method: 'DELETE'
        }).then(res => {
            window.location.reload();
            return Promise.resolve(res);
        });
    }

    onTaskEdit() {
        console.log(this.props.boardId);
    }

    goToTaskView() {
        window.location.href = `/dashboard/tasks/${this.props.taskId}`
    }


    render() {
        const { taskId, taskName, taskDesc, TaskDue, completedTask } = this.props;
        return (
            <div style={{ paddingBottom: '30px' }}>
                <div className="card" style={{ width: '18rem', marginRight: '20px' }}>
                    <div className="card-body">
                        <h5 className="card-title">{taskName}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{TaskDue}</h6>
                        <p className="card-text">{taskDesc}</p>
                        <p>{completedTask ? 'Completed' : 'Not Completed'}</p>
                        <div>
                            <button onClick={this.goToTaskView} className="btn btn-primary">Open Task</button>
                            <div className="actions">
                                <a role="button"><i onClick={this.onTaskEdit} style={{ marginRight: '5px' }} className="fa bigger fa-pencil-square-o" aria-hidden="true"></i></a>
                                <a role="button"><i onClick={this.onTaskDelete} className="fa bigger fa-trash" aria-hidden="true"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TaskCard;



