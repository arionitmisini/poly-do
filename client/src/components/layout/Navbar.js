import React, { Component } from 'react'
import { Link } from "react-router-dom"
import AuthService from '../AuthService';
const Auth = new AuthService();

class Navbar extends Component {

    constructor(props) {
        super(props);
        this.Auth = new AuthService();
        this.state = {
            isLoggin: false
        }

    }
    componentWillMount() {

        if (this.Auth.loggedIn()) {

            this.setState({
                isLoggin: true
            });

        }
    }


    handleLogout() {
        Auth.logout()
        window.location.href = '/login';
        console.log(this.state.isLoggin);
    }

    // forceUpdate() {
    //     this.setState({
    //         isLoggin: true
    //     });
    //     console.log("hahahahah");
    // };


    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                    <div className="container">
                        <Link className="navbar-brand" to="/">Poly DO</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="mobile-nav">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/profile">
                                        {''}
                                        Profile
                        </Link>
                                </li>
                            </ul>

                            {!this.state.isLoggin
                                ? <ul className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/register">Sign Up</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">Login</Link>
                                    </li>
                                </ul>
                                : <button style={{ float: 'right' }} type="button" className="btn btn-primary" onClick={this.handleLogout.bind(this)}>Logout</button>}
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar;