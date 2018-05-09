const Validator = require("validator");
const isEmpty = require ("./is-empty");

module.exports = function validateRegisterInput(data){
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : "";
    data.surname = !isEmpty(data.surname) ? data.surname : "";
    data.username = !isEmpty(data.username) ? data.username : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";
    data.email = !isEmpty(data.email) ? data.email : "";

    if(!Validator.isLength(data.name, {min: 2, max: 30})){
        errors.name = "Name must be between 2 and 30 characters";   
    }
    
    if(Validator.isEmpty(data.name)){
        errors.name = "Name is required";
    }

    if(Validator.isEmpty(data.surname)){
        errors.surname = "Surname is required";
    }

    if(Validator.isEmpty(data.username)){
        errors.username = "Username is required";
    }

    if(Validator.isEmpty(data.email)){
        errors.email = "Email is required";
    }

    if(Validator.isEmpty(data.password)){
        errors.password = "Password is required";
    }

    if(Validator.isLength(data.password, {min: 6, max: 30})){
        errors.password = "Password must be from 6 to 30 character";
    }

    if(Validator.isEmpty(data.password2)){
        errors.password2 = "Confirm password field is required";
    }

    if(Validator.isLength(data.password, data.password2)){
        errors.password = "Password must match";
    }
    

    return{
        errors,
        isValid: isEmpty(errors)
    }
}