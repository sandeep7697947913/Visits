var express = require('express');
var router = express.Router();

router.get('/',function(request,response){
    response.render("about/about");
});

module.exports = router;