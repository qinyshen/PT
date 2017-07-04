/**
 * Created by zhangmingjie on 2017/7/1.
 */
var user = {
    get_latest_node : 'select max(No) from ?',
    get_paper_data : 'select * from ? where No=?',
    add_stars : 'update ? set Stars = Stars+1 where No=?',
    loss_stars : 'update ? set Stars = Stars-1 where No=?'
};

module.exports = user;