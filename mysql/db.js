/**
 * Created by zhangmingjie on 2017/7/1.
 */
// MySQL数据库联接配置
module.exports = {
    mysql: {
        connectionLimit: 60,
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'root',
        database:'PT'// 前面建的user表位于这个数据库中
    }
};
