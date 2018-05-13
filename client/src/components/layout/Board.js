import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Board extends Component {

    render() {
        return (
            <div style={{ paddingBottom: '30px' }} className="col-sm-6">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{this.props.name}</h5>
                        <p className="card-text">{this.props.description}</p>
                        <a href={`/dashboard/board/${this.props.boardId}`} className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>
        )
    }

}

export default Board;