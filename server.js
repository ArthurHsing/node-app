const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const app = express();

// 引入users.js
const usersRouter = require("./routes/api/users");

// DB config
const db = require('./config/keys').mongoURI;
mongoose.connect(db, {useNewUrlParser:true, useUnifiedTopology: true})
.then(()=>console.log('MongoDB Connected'))
.catch(err => console.log(err));

// 使用body-parser中间件
app.use(bodyParser.urlencoded({extended: false}));  //解析application/x-www-form-urlencoded
app.use(bodyParser.json()); //解析application/json

// Connect to mongodb
app.get('/', (req, res) => {
    res.send('Hello World!!!!');
});

// 使用routes
app.use("/api/users", usersRouter);

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});