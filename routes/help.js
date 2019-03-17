var express = require('express');
var router = express.Router();

router.get('/',function(request,response){
    response.render('help/help');
});

module.exports = router;