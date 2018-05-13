import React, { Component } from 'react';
import { Link } from "react-router-dom";
import AuthService from '../AuthService';
import TaskCard from './TaskCard';

class BoardView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            dueDate: "",
            errors: {},
            tasks: [],
        };
        this.onChange = this.onChange.bind(this);
        this.Auth = new AuthService();
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount() {
        this.Auth.fetch(`http://localhost:5000/api/tasks/${this.props.match.params.id}`, {
            method: 'GET',
        }).then(tasks => {
            this.setState({
                tasks
            });
        });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    close() {
        this.setState({ showModal: false });
    }

    onSubmit(e) {
        e.preventDefault();

        const newTask = {
            name: this.state.name,
            description: this.state.description,
            dueDate: this.state.dueDate,
            boardId: this.props.match.params.id
        };

        this.Auth.fetch(`http://localhost:5000/api/tasks/`, {
            method: 'POST',
            body: JSON.stringify(newTask)
        }).then(res => {
            // this.state.tasks.push(res);
            var newTasks = [res].concat(this.state.tasks);
            this.setState({
                tasks: newTasks
            });
            this.forceUpdate();
            document.getElementById("hideTaskModal").click();
            return Promise.resolve(res);
        });
    }


    render() {
        return (
            <div style={{ paddingBottom: '30px' }} className="col-sm-12">
                <div className="row">
                    <div className="offset-md-11 col-md-1">
                        <button type="button" style={{ float: "right" }} className="btn btn-primary" data-toggle="modal" data-target="#taskModal">Create task</button>
                    </div>
                </div>
                <div className="row">
                    {
                        this.state.tasks.map((taskObj, index) => {
                            return <TaskCard taskName={taskObj.name} taskId={taskObj._id} taskDesc={taskObj.description} taskDue={taskObj.dueDate} key={index} />
                        })
                    }
                </div>
                <div>
                    <div className="modal fade" id="taskModal" tabIndex="-1" role="dialog" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Create new Task</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="task-name" className="col-form-label">Name:</label>
                                            <input type="text" className="form-control" id="task-name" name="name"
                                                value={this.state.name} onChange={this.onChange} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="description-text" className="col-form-label">Description:</label>
                                            <textarea className="form-control" onChange={this.onChange} name="description"></textarea>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="due-date" className="col-form-label">Description:</label>
                                            <input type="date" className="form-control" id="due-date"
                                                value={this.state.dueDate} onChange={this.onChange}
                                                name="dueDate"
                                            ></input>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" id="hideTaskModal" className="btn btn-secondary" data-dismiss="modal" >Close</button>
                                    <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Submit </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}

export default BoardView;