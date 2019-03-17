var express = require('express');
var router = express.Router();
var pool = require('../model/conpool/mysql');
var bcrypt = require('bcrypt');

router.get('/allvisitors.do',function(request,response){
    let center = request.session.center;
    if(center===undefined){
        response.render('center/sessiongone');
    }else{
        let q1 = 'select name,email,contact,purpose,date,come,gone from visitors'; 
        let q2 = ' where center_id=? order by date desc';
        
        pool.query((q1+q2),[center.center_id],function(err,result,fields){
            if (err) throw err;
            response.render('center/centerallvisitors',{center,visitors:result});
        });
    }
});

router.get('/others',function(request,response){
    let center = request.session.center;
    if(center===undefined){
        response.render('center/sessiongone');
    }else{
        response.render('center/centerother',{center});
    }
});

router.post('/cppasscenter.do',function(request,response){
    let center = request.session.center;
    if(center===undefined){
        response.send('sessiongone');
    }else{
        let body = request.body;
        let q1 = 'select password from centers where email=?';
        pool.query(q1,[center.email],function(err1,res1){
            if(err1) throw err1;
            bcrypt.compare(body.oldpass,res1[0].password,function(err2,res2){
                if(err2) throw err2;
                if(res2){
                    bcrypt.hash(body.newpass,10,function(err3,hash){
                        if(err3) throw err3;
                        let q2 = 'update centers set password=? where email=?'
                        pool.query(q2,[hash,center.email],function(err3,res2){
                            if(err3) throw err3;
                            console.log(res2);
                            response.send("successfull");
                        });
                    });
                }else{
                    response.send("incorrect");
                }
            });
        });
    }
});

router.get('/profile',function(request,response){
    let center = request.session.center;
    if(center===undefined){
        response.render('center/sessiongone');
    }else{
        response.render('center/centerprofile',{center});
    }
});

router.get('/visitors',function(request,response){
    let center = request.session.center;
    if(center===undefined){
        response.render('center/sessiongone');
    }else{
        let q1 = 'select name,email,contact,purpose,date,come,gone from visitors'; 
        let q2 = ' where center_id=? order by date desc limit 50';
        pool.query((q1+q2),[center.center_id],function(err,result,fields){
           // console.log((result[1].date).toDateString());
            response.render('center/centervisitors',{center,visitors:result});
        });
    }
});

router.get('/home',function(request,response){
    let center = request.session.center;
    if(center===undefined){
        response.render('center/sessiongone');
    }else{
        let q1 = 'select visiter_id,name,email,contact,purpose,come,gone from visitors';
        let q2 = ' where date=(select CURDATE()) and center_id=?';
        pool.query((q1+q2),[center.center_id],function(err,result,fields){
            if (err) throw err;
            response.render('center/centerhome',{center,visitors:result});
        });
    }
});

router.get('/keeper',function(request,response,next){
    let center = request.session.center;
    if(center===undefined){
        response.render('center/sessiongone');
    }else{
        let q1 = 'select keeper_unique_id,name,contact from keepers where center_id=?';
        pool.query(q1,[center.center_id],function(err,result){
            if(err) throw err;
            response.render('center/centerkeeper',{center,keepers:result});
        });
    }
});

router.post('/keeperPassChange.do',function(request,response){
    let center = request.session.center;
    let body = request.body;
    if(center===undefined){
        response.send('sessiongone');
    }else{
        bcrypt.hash(body.password,10,function(err1,hash){
            if(err1) throw err1;
            let q1 = "update keepers set password=?";
            let q2 = " where keeper_unique_id=? and center_id=?";
        
            pool.query((q1+q2),[hash,body.Keepuni,center.center_id],function(err2,result,fields){
                if(err2){
                    throw err2;
                }else{
                    if(result.affectedRows==1){
                        response.send("last password changed Successfully !");
                    }else{
                        response.send("the given keeper id didn't exists !");
                    }
                }
            });
        });
    }
});

router.post('/registerKeeper.do',function(request,response){
    let center = request.session.center;
    let body = request.body;
    if(center===undefined){
        response.send('sessiongone');
    }else{
        bcrypt.hash(body.password,10,function(err1,hash){
            if(err1) throw err1;
            let q1 = "insert into keepers (keeper_unique_id,name,password,";
            let q2 = "contact,center_id) value (?,?,?,?,?)";
            sql(request,response);
            
            function keeperUnique(){
                var unique="";
                while(unique.length!=7){
                    if(unique.length<4){
                        unique += String.fromCharCode(Math.floor(Math.random()*26)+65);
                    }else{
                        unique += Math.floor(Math.random()*9)+1;
                    }
                }
                return unique;
            }

            function sql(request,response){
                let unique = keeperUnique();
               pool.query((q1+q2),[unique,body.name,hash,body.contact,center.center_id],function(err2,result,fields){
                    if(err2){
                        if(err2.errno==1062){
                            sql(request,response);
                        }else{
                            throw err2;
                        }
                    }else{
                        console.log(result);
                        response.send(unique); 
                    }
                });
            }
        });
    }
});

router.post('/centerlogin.do',function(req,res){
    let q1 = "select center_id,c.name,email,password,address,";
    let q2 = " ct.city_name,st.state_name,center_type,phoneno from";
    let q3 = " centers as c inner join cities as ct on ct.city_id=c.city_id";
    let q4 = " inner join states as st on st.state_id = ct.state_id";
    let q5 = " inner join center_types as ctp on ctp.center_type_id = c.center_type_id";
    let q6 = " where email = ?";
    // pssible ho to table ke under ki fields ke differet name rakhna
    //let q1 = 'select name from centers where email=?;';
    //let q2 = "select cn.name,ct.name from cities as ct inner join centers as cn where cn.email=? and ct.city_id=cn.city_id";
   pool.query((q1+q2+q3+q4+q5+q6),[req.body.email],function(err,result,fields){
        if(err){
            res.send(err);
        }else{
            let pass1 = req.body.password;
            console.log(pass1);
            let pass2 = result[0].password;
            console.log(pass2);
            bcrypt.compare(pass1,pass2,function(err,flag){
                if(err){
                    res.send(err);
                }else{
                    if(flag){
                        req.session.center = result[0];
                        let cent = result[0];
                        let q7 = 'select visiter_id,name,email,contact,purpose,come,gone from visitors';
                        let q8 = ' where date=(select CURDATE()) and center_id=?';
                        pool.query((q7+q8),[cent.center_id],function(err,resu,fields){
                            if(err) throw err;
                            res.render('center/centerhome',{center:cent,visitors:resu});  
                        });
                        
                        //res.render('center/centerhome',{center:result[0]});
                    }else{
                        res.render('login/loginfail');
                    }
                }
            });
        }
   });
});

module.exports = router;