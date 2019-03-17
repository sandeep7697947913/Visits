var express = require('express');
var router = express.Router();
var pool = require('../model/conpool/mysql');
const bcrypt = require('bcrypt');

router.post('/registerCenter.do',function(req,res){
    if(req.session.otp==req.body.otp){
        bcrypt.hash(req.body.pass,10,function(err,hash){
            let center = new Center(hash);
            let query = "insert into centers (name,email,password,address,city_id,center_type_id,phoneno) value (?,?,?,?,?,?,?)";
            pool.query(query,[center.name,center.email,center.password,center.address,center.cityId,center.centerTypeId,center.phoneNo],function(err,result,fields){
                if(err){
                    res.render('regist/registfail');
                }else{
                    if(result.affectedRows==1)
                    res.render('regist/registsuc');
                }
            });
        });    
    }else{
        res.render('regist/registfail');
    }
   function Center(hash){
       this.name = req.body.centername;
       this.email = req.body.email;
       this.password = hash;
       this.cityId = req.body.cityId; 
       this.address = req.body.addr;
       this.centerTypeId = req.body.centerTypeId;
       this.phoneNo = req.body.tel;
   }
});


router.get('/',function(req,res,next){
    pool.query("select * from states; select * from center_types",function(err,result,fields){
        if(err) throw err;
        res.render('regist/regist',{title:'Register Center',states:result[0],centerTypes:result[1]});    
    });
});

module.exports = router;