const mongoose = require('mongoose')

const questionSchema = mongoose.Schema({
    question: {
        type: String
    },
    options:
        [String]
        

});

module.exports = mongoose.model('question', questionSchema)
