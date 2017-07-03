/**
 * Created by zhangmingjie on 2017/7/3.
 */
var maxium = 0;

function getpaper(index){
    var url = '/data/getpapers';
    var params = [
        'index='+index.toString()
    ];
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (req.readyState=== 4) {
            var responseHeaders = req.getAllResponseHeaders();
            var paper = req.responseText;
            paper = JSON.parse(paper);
            console.log('success');
            addpaper(paper, index);
        }
    };
    req.open('GET', url + '?' + params, true);
    req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    req.send(null);
}

function search_max(){
    var url = '/data/searchmax';
    var params = [];
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (req.readyState=== 4) {
            var responseHeaders = req.getAllResponseHeaders();
            var max = req.responseText;
            max = JSON.parse(max);
            console.log('success');
            maxium = max['max(No)'];
            for(var i=0;i<paper_num;i++)
                getpaper(maxium-i);
        }
    };
    req.open('GET', url + '?' + params, true);
    req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    req.send(null);
}