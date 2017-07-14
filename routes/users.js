var express = require('express');
var router = express.Router();
var user = require('../mysql/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});


router.get('/login_check', function(req, res, next) {
    user.login_check(req, res, next);
});

router.get('/register', function(req, res, next) {
    user.register(req, res, next);
});

module.exports = router;
