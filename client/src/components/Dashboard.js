import React, { Component } from 'react';
import AuthService from '../components/AuthService';
import withAuth from '../components/withAuth';
import Board from '../components/layout/Board';

const Auth = new AuthService();

class Dashboard extends Component {

    constructor() {
        super();
        this.Auth = new AuthService();
        this.state = {
            name: "",
            description: "",
            boards: []
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newBoard = {
            name: this.state.name,
            description: this.state.description
        };

        this.Auth.fetch(`http://localhost:5000/api/boards/`, {
            method: 'POST',
            body: JSON.stringify(newBoard)
        }).then(res => {
            var newBoards = [res].concat(this.state.boards);
            this.setState({
                boards: newBoards
            });
            this.forceUpdate();
            document.getElementById("hideBoardModal").click();
            return Promise.resolve(res);
        });
    }

    componentWillMount() {
        if (!this.Auth.loggedIn()) {
            this.props.history.replace('/login');
        } else {
            this.Auth.fetch(`http://localhost:5000/api/boards/`, {
                method: 'GET',
            }).then(boards => {
                this.setState({
                    boards
                });
            });
        }
    }

    handleLogout() {
        Auth.logout()
        this.props.history.replace('/login');
    }

    render() {
        return (

            <div className="App">
                <div className="App-header mb-4">
                    <h2 style={{ display: 'inline' }}>Boards</h2>
                    <button style={{ float: 'right' }} type="button" className="btn btn-primary create-board-btn" data-toggle="modal" data-target="#boardModal">Create board</button>
                    <button style={{ float: 'right' }} type="button" className="btn btn-primary" onClick={this.handleLogout.bind(this)}>Logout</button>
                </div>

                <div class="row">
                    {
                        this.state.boards.map((boardObj, index) => {
                            return <Board key={index} boardId={boardObj._id} name={boardObj.name} description={boardObj.description} />
                        })
                    }
                </div>

                <div className="modal fade" id="boardModal" tabIndex="-1" role="dialog" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Create new Board</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="board-name" className="col-form-label">Board Name:</label>
                                        <input type="text" className="form-control form-control-lg" placeholder="Name" value={this.state.name} name="name" onChange={this.onChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description-text" className="col-form-label">Description:</label>
                                        <textarea className="form-control" onChange={this.onChange} name="description"></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" id="hideBoardModal" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Submit </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default withAuth(Dashboard);
