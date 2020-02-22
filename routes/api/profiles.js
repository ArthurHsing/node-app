const express = require('express');
const router = express.Router();
const passport = require('passport');

// the model of mongoDB
const Profile = require('../../models/Profile');

// @route GET api/profiles/test
// @desc 返回的请求的json
// @access public
router.get('/test', (req, res) => {
    res.json({msg:'profile works'});
});

// @route POST api/profiles/add
// @desc 创建信息接口
// @access private
router.post("/add", passport.authenticate('jwt', {session: false}), (req, res) => {
    const profileFileds = {};
    if (req.body.type)  profileFileds.type = req.body.type;
    if (req.body.describe)  profileFileds.describe = req.body.describe;
    if (req.body.income)  profileFileds.income = req.body.income;
    if (req.body.expenditure)  profileFileds.expenditure = req.body.expenditure;
    if (req.body.cash)  profileFileds.cash = req.body.cash;
    if (req.body.remark)  profileFileds.remark = req.body.remark;

    new Profile(profileFileds).save().then(profile => {
        res.json(profile);
    });
});

// @route GET api/profiles
// @desc 获取所有信息
// @access Private
router.get("/", passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.find()
        .then(profile => {
            if (!profile) {
                return res.status(404).json("没有任何内容");
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});

// @route GET api/profiles:id
// @desc 获取单个信息
// @access Private
router.get("/:id", passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({_id:req.params.id})
        .then(profile => {
            if (!profile) {
                return res.status(404).json("没有任何内容");
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});

// @route POST api/profiles/edit
// @desc 创建信息接口
// @access private
router.post("/edit/:id", passport.authenticate('jwt', {session: false}), (req, res) => {
    const profileFileds = {};
    if (req.body.type)  profileFileds.type = req.body.type;
    if (req.body.describe)  profileFileds.describe = req.body.describe;
    if (req.body.income)  profileFileds.income = req.body.income;
    if (req.body.expenditure)  profileFileds.expenditure = req.body.expenditure;
    if (req.body.cash)  profileFileds.cash = req.body.cash;
    if (req.body.remark)  profileFileds.remark = req.body.remark;

    Profile.findOneAndUpdate(
        {_id: req.params.id},
        {$set: profileFileds},
        {new: true}
    ).then(profile => res.json(profile));
});

// @route POST api/profiles/delete
// @desc 删除信息接口
// @access private
router.get(
    '/delete/:id',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        Profile.findOneAndRemove({_id: req.params.id}, function(err, delData){
            if(err) {
                res.json("没有找到数据");
            }else {
                res.json(delData);
            }
        }); 
    }
)
module.exports = router;