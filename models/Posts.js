const { string } = require("joi");
const mongoose = require(`mongoose`);

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
        min: 4
    },
    body: {
        type: String,
        required: true,
        min: 4
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model(`Articles`, PostSchema);