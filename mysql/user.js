/**
 * Created by zhangmingjie on 2017/7/11.
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
            msg: '通讯失败'
        });
    } else {
        res.json(ret);
    }
};


module.exports = {
    add_stars: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数
            var param = req.query || req.params;

            // 建立连接，向表中插入值
            // 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
            connection.query($sql.add_stars , [param.index], function(err, result) {
                // 以json形式，把操作结果返回给前台页面
                if(result.affectedRows > 0) {
                    result = {
                        code: 200,
                        msg: '点赞成功'
                    };
                }
                jsonWrite(res, result);
                // 释放连接
                connection.release();
            });
        });
    },


    login_check: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数
            var param = req.query || req.params;

            // 建立连接，向表中插入值
            // 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
            connection.query($sql.login_check , [param.username, param.password], function(err, result) {
                jsonWrite(res, result[0]["EXISTS(SELECT * FROM Users WHERE Username = '" + param.username + "' AND Password = '" + param.password + "')"]);
                // 释放连接
                connection.release();
            });
        });
    },


    register: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数
            var param = req.query || req.params;

            // 建立连接，向表中插入值
            // 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
            connection.query($sql.check_exist , [param.username], function(err, result) {
                if (result[0]["EXISTS(SELECT * FROM Users WHERE Username = '" + param.username +"')"] === 1){
                    result = {
                        code: 221,
                        msg: '已存在的用户名'
                    };
                    jsonWrite(res, result);
                    connection.release();
                }
                else{
                    connection.query($sql.register , [param.username, param.password], function(err, result) {
                        // result = {
                        //     code: 100,
                        //     msg: '注册成功'
                        // };

                        if(result.affectedRows > 0) {
                            result = {
                                code: 100,
                                msg: '注册成功'
                            };
                        }
                       
                        jsonWrite(res, result);
                        connection.release();
                    });
                }

            });
        });
    }


};