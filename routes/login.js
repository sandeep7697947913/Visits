var express = require('express');
var router = express.Router();
var pool = require('../model/conpool/mysql');
var bcrypt = require('bcrypt');

router.get('/',function(req,res,next){
    res.render('login/login');
});


module.exports = router;