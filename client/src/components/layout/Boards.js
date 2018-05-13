import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Board from './Board';
import AuthService from '../AuthService';

class Boards extends Component {
    constructor() {
        super();
        this.state = {
            boards: []
        }
        this.Auth = new AuthService();
    }

    componentWillMount() {
        this.Auth.fetch(`http://localhost:5000/api/boards/`, {
            method: 'GET',
        }).then(boards => {
            this.setState({
                boards
            });
        });
    }

    render() {
        return (
            <div class="row">
                {
                    this.state.boards.map((boardObj, index) => {
                        return <Board key={index} boardId={boardObj._id} name={boardObj.name} description={boardObj.description} />
                    })
                }
            </div>
        )
    }
}

export default Boards;