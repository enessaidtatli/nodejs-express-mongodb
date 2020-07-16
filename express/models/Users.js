const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    fullName: String,
    age: Number

});

module.exports = mongoose.model('users', UsersSchema);