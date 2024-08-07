const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    comment:{
        type: String,
        required:true,
    },
    author:{
        type: String,
        required:true,
    },
    postID:{
        type: String,
        required:true,
    },
    userID:{
        type: String,
        required:true,
    }
},{timestamps:true})

module.exports = mongoose.model("Comment",CommentSchema);