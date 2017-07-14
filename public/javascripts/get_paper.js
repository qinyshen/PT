/**
 * Created by zhangmingjie on 2017/7/3.
 */
var maxium = 0;


function get_paper(index, callback){
    var url = '/data/getpaper';
    var params = [
        'index=' + index.toString()
    ];
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (req.readyState=== 4) {
            var responseHeaders = req.getAllResponseHeaders();
            var paper = req.responseText;
            paper = JSON.parse(paper);
            var subject = getsubjects(index);
            console.log('success');
            callback(paper, index);
        }
    };
    req.open('GET', url + '?' + params.join('&'), true);
    req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    req.send(null);
}

function get_paper_list(index, tab, callback){
    var url = '/data/getpaperlist';
    var params = [
        'index =' + index.toString()
    ];
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (req.readyState=== 4) {
            var responseHeaders = req.getAllResponseHeaders();
            var list = req.responseText;
            list = JSON.parse(list);
            console.log('success');
            callback(list, tab);
        }
    };
    req.open('GET', url + '?' + params, true);
    req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    req.send(null);
}

function get_subject(index, tab, callback){
    var url = '/data/getsubject';
    var params = [
        'index=' + index.toString()
    ];
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (req.readyState=== 4) {
            var responseHeaders = req.getAllResponseHeaders();
            var subject = req.responseText;
            subject = JSON.parse(subject);
            console.log('success');
            callback(subject, tab);
        }
    };
    req.open('GET', url + '?' + params, true);
    req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    req.send(null);
}