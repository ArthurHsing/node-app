const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();

// 引入users.js
const usersRouter = require("./routes/api/users");

// DB config
const db = require('./config/keys').mongoURI;
// Connect to mongodb
mongoose.connect(db, {useNewUrlParser:true, useUnifiedTopology: true})
.then(()=>console.log('MongoDB Connected'))
.catch(err => console.log(err));

// 使用body-parser中间件
app.use(bodyParser.urlencoded({extended: false}));  //解析application/x-www-form-urlencoded
app.use(bodyParser.json()); //解析application/json

// passport 初始化
app.use(passport.initialize());

require("./config/passport")(passport);

// 使用routes
app.use("/api/users", usersRouter);

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});