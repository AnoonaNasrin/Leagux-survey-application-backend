const express = require('express')
const router = express.Router()
const { login, register , createQuestion , createSurvey } = require('../controller/adminController')

router.post('/login', login)
router.post('/register', register)
router.post('/createquestion',createQuestion)
router.post('/createsurvey',createSurvey)




module.exports = router;