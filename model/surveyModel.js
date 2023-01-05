const mongoose = require('mongoose')

const surveySchema = mongoose.Schema({
    title: {
        type: String
    },
    surveyId: {
        type: String
    },

    number: {
        type: Number
    },
    questions: [
        {
            question: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "question",
            }
        },
    ],
    reward: {
        type: String
    }
});

module.exports = mongoose.model('survey', surveySchema);