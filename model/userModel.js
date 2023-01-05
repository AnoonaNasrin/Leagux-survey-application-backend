const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    wallet: {
        type: Number
    }

});

module.exports = mongoose.model('user', userSchema);