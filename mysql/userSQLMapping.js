/**
 * Created by zhangmingjie on 2017/7/1.
 */
var user = {
    get_latest_node : 'select max(No) from cs_AI',
    get_paper_data : 'select * from cs_AI where No=?',
    add_stars : 'update cs_AI set Stars = Stars+1 where No=?',
    loss_stars : 'update cs_AI set Stars = Stars-1 where No=?'
};

module.exports = user;