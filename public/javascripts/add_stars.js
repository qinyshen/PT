/**
 * Created by zhangmingjie on 2017/6/30.
 */
function addStar(index){
    if(check_user()) {
        var url = '/data/addstars';
        var params = [
            'index=' + index.toString()
        ];
        var req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if (req.readyState === 4) {
                var responseHeaders = req.getAllResponseHeaders();
                var star = req.responseText;
                star = JSON.parse(star);
                if (star["msg"] === "点赞成功") {
                    var num = parseInt(document.getElementById(index.toString()).innerText);
                    document.getElementById(index.toString()).innerText = (num + 1).toString();
                }
            }
        };
        req.open('GET', url + '?' + params.join('&'), true);
        req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        req.send(null);
    }
    else
        alert("请先登录!")
}