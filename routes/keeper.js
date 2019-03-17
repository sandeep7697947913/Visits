var express = require('express');
var router = express.Router();
var pool = require('../model/conpool/mysql');
var bcrypt = require('bcrypt');

//todayvisitors
router.get('/profile',function(req,res){
    let keeper = req.session.keeper;
    if(keeper===undefined){
        res.render('center/sessiongone');
    }else{
        res.render('keeper/keeperprofile',{keeper});
    }
});

router.get('/visitors',function(req,res){
    let keeper = req.session.keeper;
    if(keeper===undefined){
        res.render('center/sessiongone');
    }else{
        res.render('keeper/keeperhome',{keeper});
    }
});

router.post('/visitorGone.do',function(request,response){
    let keeper = request.session.keeper;
    if(keeper===undefined){
        response.send('sessiongone');
    }else{
        let q1 = "update visitors set gone=(select CURTIME()) where visiter_id=?;";
        let q2 = "select CURTIME() as time";
        pool.query((q1+q2),[request.body.visid],function(err,result,fields){
            if (err) throw err;
            let res = result[1];
            response.send(res[0].time);
        });
    }
})

router.get('/todayvisitors',function(request,response){
    let keeper = request.session.keeper;
    if(keeper===undefined){
        response.render('center/sessiongone');
    }else{
        let q1 = 'select visiter_id,name,email,contact,purpose,come,gone from visitors';
        let q2 = ' where date=(select CURDATE()) and center_id=?';
        pool.query((q1+q2),[keeper.center_id],function(err,result,fields){
            if (err) throw err;
            response.render('keeper/keepertodvisit',{keeper,visitors:result});
        });
    }
});

router.post('/addVisitors.do',function(request,response,next){
    body = request.body;
    keeper = request.session.keeper;
    if(keeper===undefined){
        response.send("sessiongone");
    }else{
        let q1 = 'insert into visitors (name,email,contact,purpose,center_id,date,come)';
        let q2 = ' value (?,?,?,?,?,(select CURDATE()),(select CURTIME()))';
        pool.query((q1+q2),[body.name,body.email,body.contact,body.purpose,keeper.center_id],function(err,result,fields){
            if(err) throw err;
            response.send("good");
        });
    }
});

router.post('/keeperlogin.do',function(request,response,next){
    let q1 = "select * from keepers where keeper_unique_id=?";
    pool.query(q1,[request.body.keepuni],function(err,result){
        if(err){
            response.send(err);
        }else{
            let pass1 = request.body.password;
            console.log(pass1);
            let pass2 = result[0].password;
            bcrypt.compare(pass1,pass2,function(err,flag){
                if(err){
                    res.send(err);
                }else{
                    if(flag){
                        request.session.keeper = result[0];
                        response.render('keeper/keeperhome',{keeper:result[0]});
                    }else{
                        res.render('login/loginfail');
                    }
                }
            });
        }

    });
});


module.exports = router;