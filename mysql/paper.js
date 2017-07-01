/**
 * Created by zhangmingjie on 2017/7/1.
 */
var mysql = require('mysql');
var $conf = require('./db');
// var $util = require('../util/util');
var $sql = require('./userSQLMapping');

// 使用连接池，提升性能
var pool  = mysql.createPool($conf.mysql);

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code:'1',
            msg: '获取失败'
        });
    } else {
        res.json(ret);
    }
};


module.exports = {
    get: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数
            var param = req.query || req.params;

            // 建立连接，向表中插入值
            // 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
            connection.query($sql.get_paper_data, [param.index], function(err, result) {
                // 以json形式，把操作结果返回给前台页面
                jsonWrite(res, result[0]);

                // 释放连接
                connection.release();
            });
        });
    }
};