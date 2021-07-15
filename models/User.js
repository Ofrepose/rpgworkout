const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    style: {
        type: String,
        required: true,
        default: 'default'
    },
    exp: {
        type: Number,
        min: 0,
        required: true,
        default: 0
    },
    password: {
        type: String,
        required: true
    },
    team: {
        type: Number,
        default: 0
    },
    level: {
        type: Number,
        default: 0
    }

    
});

module.exports = User = mongoose.model('user', UserSchema);