var express = require('express');
var router = express.Router();

router.get('/',function(request,response){
    response.render('contact/contactus');
});

module.exports = router;