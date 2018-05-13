import React, { Component } from 'react';
import { Link } from "react-router-dom";
import AuthService from '../AuthService';


class Login extends Component {

  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.Auth = new AuthService();
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentWillMount() {
    if (this.Auth.loggedIn())
      this.props.history.replace('/dashboard');
  }


  handleFormSubmit(e) {
    e.preventDefault();

    this.Auth.login(this.state.email, this.state.password)
      .then(res => {
        console.log(res);
        this.props.history.replace('/dashboard');
      })
      .catch(err => {
        alert(err);
      })
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div>
        <div className="login">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Log In</h1>
                <p className="lead text-center">Sign in to your PolyDo account</p>
                <form onSubmit={this.handleFormSubmit}>
                  <div className="form-group">
                    <input type="email" className="form-control form-control-lg" placeholder="Email Address" value={this.state.email} name="email" onChange={this.onChange} />
                  </div>
                  <div className="form-group">
                    <input type="password" className="form-control form-control-lg" placeholder="Password" name="password" value={this.state.password} onChange={this.onChange} />
                  </div>
                  <input type="submit" className="btn btn-info btn-block mt-4" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
