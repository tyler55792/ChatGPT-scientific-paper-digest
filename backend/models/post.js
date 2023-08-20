const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    date: {type: String, required: true},
    featured: {type: Boolean, required: true},
    url: {type: String, required: false}
})

module.exports = mongoose.model("Post", PostSchema);