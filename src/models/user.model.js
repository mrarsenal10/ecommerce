'use strict'

const { string } = require('@tensorflow/tfjs-core')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: string,
        require: true,
        unique: true,
        index: true
    },
    email: {
        type: string,
        require: true,
        unique: true,
    },
    mobile: {
        type: string,
        require: true,
        unique: true,
    },
    password: {
        type: string,
        require: true,
    }
})

module.exports = mongoose.model('User', userSchema)