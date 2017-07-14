/**
 * Created by zhangmingjie on 2017/7/1.
 */
var user = {
	check_exist: 'SELECT EXISTS(SELECT * FROM Users WHERE Username = ?)',
	register: 'INSERT INTO Users (Username,Password) VALUES (?, ?)',
	login_check: 'SELECT EXISTS(SELECT * FROM Users WHERE Username = ? AND Password = ?)',
    get_paper_list: 'select Paper_ID from In_Subject where Subject_ID=?',
    get_subject: 'select Tag,Name from Subjects where Subject_ID=?',
    get_paper : 'select * from Papers where Paper_ID=?',
    add_stars : 'INSERT INTO Like_Paper (USER_ID,Paper_ID,Like_time) VALUES (?, ?, STR_TO_DATE(?, \'%Y-%m-%d %H:%i:%s\'))'
};

module.exports = user;