/**
 * Created by zhangmingjie on 2017/7/11.
 */
window.addEventListener('load', init_tab, false);
// window.addEventListener('load', add_papers, false);
var paper_num = 0;
var height= document.body.clientHeight;
var paper_height = 300;
var tab_list = [2, 5, 3];
var tab_num = 0;
var paperlist = {};

function add_papers(){
    var distance = window.pageYOffset;
    var num = Math.floor((height + window.pageYOffset - 500) / paper_height + 1.0);
    if(num >= 5)
        num = 5;
    paper_num += num;
    get_paper();
}

function init_tab(){
    // get user_info()
    tab_list = [2, 5, 3];
    tab_num = 3;
    for (var tab = 0; tab_num > tab; tab++) {
        get_subject(tab_list[tab], tab, function (subject, tab) {
            document.getElementById("tab" + (tab + 1).toString()).innerText = subject['Tag'];
        });
        get_paper_list(tab_list[tab], function (list, tab) {
            paperlist[tab.toString()] = list;

        });
    }
}

