import React, { Component } from 'react';
import AuthService from '../components/AuthService';
import withAuth from '../components/withAuth';
import Boards from './layout/Boards';

const Auth = new AuthService();

class Dashboard extends Component {

    constructor() {
        super();
        this.Auth = new AuthService();
    }

    componentWillMount() {
        if (!this.Auth.loggedIn())
            this.props.history.replace('/login');
    }

    render() {
        return (

            <div className="App">

                <div className="App-header mb-4">
                    <h2 style={{ display: 'inline' }}>Boards</h2>
                    <button style={{ float: 'right' }} type="button" className="btn btn-primary create-board-btn" onClick={this.createBoard.bind(this)} >Create board</button>
                    <button style={{ float: 'right' }} type="button" className="btn btn-primary" onClick={this.handleLogout.bind(this)}>Logout</button>
                </div>
                <Boards />
            </div >
        )
    }
    handleLogout() {
        Auth.logout()
        this.props.history.replace('/login');
    }
    createBoard() {
        this.props.history.replace('/dashboard/board/create');
    }
}

export default withAuth(Dashboard);
