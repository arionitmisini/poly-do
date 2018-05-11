import React, { Component } from 'react'
import {Link} from "react-router-dom"
import {connect} from "react-redux";
import {registerUser} from "../../actions/authActions";

class Register extends Component {
  constructor(){
    super();
    this.state = {
      name:"",
      surname:"",
      username:"",
      email:"",
      password:"",
      password2:"",
      date:"",
      errors:{}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e){
    e.preventDefault();

    const newUser = {
        name: this.state.name,
        surname: this.state.surname,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2,
        //Modify just hardcoded test
        date: "222"
    };

    this.props.registerUser(newUser);
    
  }

  render() {
    const{ error}=this.state;
    
    return (
      <div>
        <div className="register">
            <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Sign Up</h1>
                <p className="lead text-center">Create your PolyDo account</p>
                <form onSubmit={this.onSubmit} >
                    <div className="form-group">
                    <input type="text" className="form-control form-control-lg" placeholder="Name" value={this.state.name} name="name" onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                    <input type="text" className="form-control form-control-lg" placeholder="Surname" value={this.state.surname} name="surname" onChange={this.onChange} />
                    </div>
                    <div className="form-group">
                    <input type="text" className="form-control form-control-lg" placeholder="Username" value={this.state.username} name="username" onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                    <input type="email" className="form-control form-control-lg" placeholder="Email Address" value={this.state.email} name="email" onChange={this.onChange}/>
                    <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                    </div>
                    <div className="form-group">
                    <input type="password" className="form-control form-control-lg" placeholder="Password" value={this.state.password} name="password" onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                    <input type="password" className="form-control form-control-lg" placeholder="Confirm Password" value={this.state.password2} name="password2" onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                    <input type="date" className="form-control form-control-lg" placeholder="Date" value={this.state.date} name="date" onChange={this.onChange}/>
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

export default connect(null,{registerUser})(Register);
