'use strict'

import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true,
        index: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    mobile: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    }
})

export default mongoose.model('User', userSchema)