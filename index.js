const express = require('express')
const adminRouter = require('./router/admin')
const userRouter = require('./router/user')
const mongoose = require('mongoose')
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express()
require('dotenv').config()



mongoose.connect(process.env.LOCAL_MONGO, (err) => {
    if(err)
    console.log(err);

    console.log("Data base connected");
})

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
}));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/admin', adminRouter)
app.use('/',userRouter)

app.listen(process.env.PORT, () => {
    console.log(`sever running at ${process.env.PORT}`);
})
