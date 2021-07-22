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
    totalExp: {
        type: Number,
        default: 0
    },
    expToNextLevel: {
        type: Number,
        default: 30
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
        default: 1
    },
    characterMaxHealth: {
        type: Number,
        default: 100
    },
    characterHealth:{
        type: Number,
        default: 100
    },
    inPushups: {
        type: Number,
        default: 0,
        max: 500,
        min: 0
    },
    inJumpingJacks: {
        type: Number,
        default: 0,
        max: 5000,
        min: 0
    },
    inStepUps: {
        type: Number,
        default: 0,
        max: 500,
        min: 0
    },
    inMountainClimbers: {
        type: Number,
        default: 0,
        max: 500,
        min: 0
    },
    inSquatJumps: {
        type: Number,
        default: 0,
        max: 500,
        min: 0
    },
    inBurpees: {
        type: Number,
        default: 0,
        max: 500,
        min: 0
    }
    


    
});

module.exports = User = mongoose.model('user', UserSchema);