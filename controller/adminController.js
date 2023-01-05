const adminModel = require("../model/adminModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const questionModel = require("../model/questionModel")
const surveyModel = require("../model/surveyModel")
const { updateOne } = require("../model/adminModel")
require('dotenv').config()


module.exports.register = async (req, res) => {

    try {

        const email = req.body.email
        const password = req.body.password

        const passwords = await bcrypt.hash(password, 10)
        const admin = await adminModel.create({ email: email, password: passwords })


        res.json({ status: true })

    } catch (er) {

        res.json({ status: false, message: er.message })
        console.log(er);
    }
}


module.exports.login = async (req, res) => {

    try {

        const email = req.body.email
        const password = req.body.password

        const admin = await adminModel.findOne({ email: email })
        if (!admin) return res.json({ status: false, message: "wrong email" })

        const passwords = await bcrypt.compare(password, admin.password)
        if (!passwords) return res.json({ status: false, message: "wrong password" })

        const token = jwt.sign({ _id: admin._id }, process.env.SECRET_KEY, { expiresIn: 60 * 60 * 24 })

        res.json({ status: true, token: token })

    } catch (err) {

        res.json({ status: false, message: err.message })
        console.log(err);
    }
}

module.exports.createQuestion = async (req, res) => {

    try {

        const questions = await questionModel.create(req.body)
        await surveyModel.updateOne({ surveyId: req.body.surveyId }, { $push: { questions: questions. _id } })
        console.log(questions);
        res.json({ status: true })

    } catch (er) {

        res.json({ status: false, message: er.message })
    }

}

module.exports.createSurvey = async (req, res) => {

    try {

        const survey = await surveyModel.create(req.body)

        res.json({ status: true })

    } catch (er) {

        res.json({ status: false, message: er.message })

    }
}

