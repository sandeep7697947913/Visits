var express = require('express');
var router = express.Router();
var pool = require('../model/conpool/mysql');
var nodemail = require('nodemailer');
var ejs = require('ejs');
var bcrypt = require('bcrypt');

var transporter = nodemail.createTransport({
    service : 'gmail',
    auth : {
        user : 'khemrajyadav.sy@gmail.com',
        pass : '7000073053'
    }
});

router.post('/changepasscenter.do',function(request,response){
    if(request.session.otp==request.body.otp){
        console.log('otpverified');
        console.log(request.body);
        bcrypt.hash(request.body.password,10,function(err,hash){
            if(err) throw err;
           let query = "update centers set password=? where email=?";
           pool.query(query,[hash,request.body.email],function(err1,result,fields){
                if(err1) throw err1;
                console.log('Inside pool');
                console.log(result);
                console.log(err1);
                if(err1){
                    response.send("servererror");
                }else{
                    if(result.affectedRows==1)
                    response.send('passwordchanged');
                }
            });
        });
    }else{
        response.send('otpiswrong');
    }
});

router.post('/findcenteraccount.do',function(request,response){
    let q1 = "select email from centers where email=?";
    pool.query(q1,[request.body.email],function(err,result){
        if(result.length==1){
            function generateOTP(){
                var a = "";
                for(i=0;i<=5;i++){
                    b = Math.floor(Math.random()*9+1)
                    a = a.concat(b);
                }
                return a;
            }
            var a = generateOTP();
            var mailOptions = {
                from: 'Visitors Developer',
                to: request.body.email,
                subject: 'Visitors (OTP)',
                html: ejs.render(`<div style="color:black;margin:0px auto;width:500px;border-radius:15px;background-color:#0099ff;border:1px solid black;box-shadow: 5px 5px 10px yellow;">
                <div style="color:white;background-color:#ff0033;">
                    <h1 style="margin-left:20px;">Visitors<sub> athiti devo bhav</sub></h1>
                </div>
                <div>
                    <h3 style="margin-left:20px;">
                        Your Otp is :-
                    </h3>
                    <div Style="text-align:center;
                    font-size:36px;
                    margin:50px;
                    color:white;">
                        <%= otp %>
                    </div>
                    <div Style="margin:10px;">
                        contact us : 7697947913
                        <span style="float:right;">sandeep7697947913@gmail.com</span>
                    </div>
                </div>
            </div>`, {otp:a}, {delimiter: '%'})
            }
            // transporter.sendMail(mailOptions, function(error, info){
            //     if (error) {
            //         console.log(error);
            //     } else {
            //         console.log('Email sent: ' + info.response);
            //     }
            // });
                request.session.otp = a;
                console.log(a);
                response.send("emailSended");
        }else{
            response.send('notfound');
        }
    });
});
    
router.post('/collectCities.do',function(req,res){
    pool.query("select city_id,city_name from cities where state_id=?",[req.body.stateId],function(err,result){
        if(err) throw err;
        res.send(result);
    });
});

router.post('/sendOTP.do',function(req,res){
    function generateOTP(){
        var a = "";
        for(i=0;i<=5;i++){
            b = Math.floor(Math.random()*9+1)
            a = a.concat(b);
        }
        return a;
    }
    var a = generateOTP();
    var mailOptions = {
        from: 'Visitors Developer',
        to: req.body.email,
        subject: 'Visitors (OTP)',
        html: ejs.render(`<div style="color:black;margin:0px auto;width:500px;border-radius:15px;background-color:#0099ff;border:1px solid black;box-shadow: 5px 5px 10px yellow;">
        <div style="color:white;background-color:#ff0033;">
            <h1 style="margin-left:20px;">Visitors<sub> athiti devo bhav</sub></h1>
        </div>
        <div>
            <h3 style="margin-left:20px;">
                Your Otp is :-
            </h3>
            <div Style="text-align:center;
            font-size:36px;
            margin:50px;
            color:white;">
                <%= otp %>
            </div>
            <div Style="margin:10px;">
                contact us : 7697947913
                <span style="float:right;">sandeep7697947913@gmail.com</span>
            </div>
        </div>
    </div>`, {otp:a}, {delimiter: '%'})
    }

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    req.session.otp = a;
    res.send(a);
});

module.exports = router;