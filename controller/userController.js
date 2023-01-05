const userModel = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


module.exports.register = async (req, res) => {

    try {

        const password = await bcrypt.hash(req.body.password, 10)
        req.body.password = password

        console.log(password);
        const user = await userModel.create(req.body)

        res.json({ status: true })

    } catch (er) {
        console.log(er);
        res.json({ status: false })

    }
}

module.exports.login = async (req, res) => {

    try {

        const user = await userModel.findOne({ email: req.body.email })

        if (!user) return res.json({ staus: false, message: "Invalid email" })

        const password = bcrypt.compare(req.body.password, password)
        if (!password) return res.json({ status: false, message: "Invalid password" })

        res.json({ staus: true })

    } catch (er) {
   
        res.json({ status: false })

    }
}