const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaOptions = {
    timestamps: true,
    versionKey: false
}

//Create schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
}, schemaOptions);

module.exports = User = mongoose.model("users", UserSchema);