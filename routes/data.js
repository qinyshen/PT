/**
 * Created by zhangmingjie on 2017/7/1.
 */
var express = require('express');
var router = express.Router();
var paper = require('../mysql/paper');
var user = require('../mysql/user');


/* GET paper data. */
router.get('/getpaper', function(req, res, next) {
    paper.get_paper(req, res, next);
});

router.get('/getsubject', function(req, res, next) {
    paper.get_subject(req, res, next);
});

router.get('/getpaperlist', function(req, res, next) {
    paper.get_paper_list(req, res, next);
});


router.get('/addstars', function(req, res, next) {
    user.add_stars(req, res, next);
});


module.exports = router;