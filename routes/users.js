var express = require('express');
var router = express.Router();
var user = require('../mysql/user');

var session = require('express-session')

var app = express()
app.set('trust proxy', 1) // trust first proxy 
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))


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
