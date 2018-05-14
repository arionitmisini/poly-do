import React, { Component } from 'react';
import AuthService from '../AuthService';
import Moment from 'react-moment';

class TaskView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentTask: {},
            name: "",
            description: "",
            dueDate: "",
            subtasks: [],
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onTaskComplete = this.onTaskComplete.bind(this);
        this.Auth = new AuthService();
    }

    componentWillMount() {
        this.Auth.fetch(`http://localhost:5000/api/tasks/view/${this.props.match.params.id}`, {
            method: 'GET',
        }).then(currentTask => {
            this.setState({
                currentTask
            });
        });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        // TODO: Handle creating sub-tasks
    }

    onTaskComplete() {
        this.Auth.fetch(`http://localhost:5000/api/tasks/complete/${this.props.match.params.id}`, {
            method: 'PUT',
        }).then(completedTask => {
            this.setState({
                currentTask: completedTask
            });
            this.forceUpdate();
        });
    }


    render() {
        return (
            <div style={{ paddingBottom: '30px' }} className="col-sm-12">
                <div className="row">
                    <div className="offset-md-9 col-md-4">
                        <button type="button" style={{ float: "right" }} className="btn btn-primary" data-toggle="modal" data-target="#subtaskModal">Create Sub task</button>
                        {this.state.currentTask.completed ? '' : <button onClick={this.onTaskComplete} type="button" className="btn btn-success">Mark completed</button>}
                    </div>
                </div>
                <h2>{this.state.currentTask.name}</h2>
                <p>{this.state.currentTask.description}</p>
                <h2>{this.state.currentTask.completed ? 'Completed' : 'Not Completed'}</h2>
                <h2><Moment format="DD/MM/YYYY">{this.state.currentTask.dueDate}</Moment></h2>
                <div>
                    <div className="modal fade" id="subtaskModal" tabIndex="-1" role="dialog" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Create new sub-task</h5>
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
                                    <button type="button" id="hideTaskModal" className="btn btn-secondary" data-dismiss="modal">Close</button>
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

export default TaskView;