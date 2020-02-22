const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();

// 引入路由
const usersRouter = require("./routes/api/users");
const profilesRouter = require("./routes/api/profiles");

// DB config
const db = require('./config/keys').mongoURI;
// Connect to mongodb
mongoose.connect(db, {useNewUrlParser:true, useUnifiedTopology: true, useFindAndModify: false })
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
app.use("/api/profiles", profilesRouter);

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});