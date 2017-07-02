/**
 * Created by zhangmingjie on 2017/7/1.
 */
var express = require('express');
var router = express.Router();
var paper = require('../mysql/paper');


/* GET paper data. */
router.get('/getpapers', function(req, res, next) {
    paper.get(req, res, next);
});

router.get('/addstars', function(req, res, next) {
    paper.add(req, res, next);
});

router.get('/searchmax', function(req, res, next) {
    paper.search(req, res, next);
});

module.exports = router;