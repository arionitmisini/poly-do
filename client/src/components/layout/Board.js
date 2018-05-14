import React, { Component } from 'react';
import AuthService from '../AuthService';

class Board extends Component {
    constructor() {
        super();
        this.Auth = new AuthService();
        this.onBoardDelete = this.onBoardDelete.bind(this);
        this.onBoardEdit = this.onBoardEdit.bind(this);
    }

    onBoardDelete() {
        this.Auth.fetch(`http://localhost:5000/api/boards/${this.props.boardId}`, {
            method: 'DELETE'
        }).then(res => {
            window.location.href = '/dashboard';
            return Promise.resolve(res);
        });
    }

    onBoardEdit() {
        console.log(this.props.boardId);
    }

    render() {
        return (
            <div style={{ paddingBottom: '30px' }} className="col-sm-6">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{this.props.name}</h5>
                        <p className="card-text">{this.props.description}</p>
                        <div>
                            <a href={`/dashboard/board/${this.props.boardId}`} className="btn btn-primary">Open</a>
                            <div className="actions">
                                <a role="button"><i onClick={this.onBoardEdit} style={{ marginRight: '5px' }} className="fa bigger fa-pencil-square-o" aria-hidden="true"></i></a>
                                <a role="button"><i onClick={this.onBoardDelete} className="fa bigger fa-trash" aria-hidden="true"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Board;