import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import AuthService from '../AuthService';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.Auth = new AuthService();
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
      console.log(res);
      return Promise.resolve(res);

    }).then(res => {
      window.location.href = '/dashboard';
    })
  }

  render() {
    const { error } = this.state;

    return (
      <div>
        <div className="register">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <form onSubmit={this.onSubmit} >
                  <div className="form-group">
                    <input type="text" className="form-control form-control-lg" placeholder="Name" value={this.state.name} name="name" onChange={this.onChange} />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control form-control-lg" placeholder="Description" value={this.state.description} name="description" onChange={this.onChange} />
                  </div>
                  <input type="submit" className="btn btn-info btn-block mt-4" value="Create" />
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default connect(null, { registerUser })(Register);
