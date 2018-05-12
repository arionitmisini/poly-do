const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const objID = mongoose.Schema.Types.ObjectId;

const schemaOptions = {
    timestamps: true,
    versionKey: false
}

// Create schema
const BoardSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: objID,
        required: true
    }
}, schemaOptions);

const Board = module.exports = mongoose.model("boards", BoardSchema);