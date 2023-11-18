const mongoose = require('mongoose');

// Making a schema of  a file
const FileSchema = new mongoose.Schema({
    userid : String,
    username : String,
    FileName : String,
    Code : String,
    Language : String,
})

const FileSystem = mongoose.model('FileSystem', FileSchema);

module.exports = FileSystem;