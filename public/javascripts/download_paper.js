/**
 * Created by zhangmingjie on 2017/7/2.
 */
function dlpaper(index) {
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
            url1 = paper['Address'].split("abs")[0];
            url2 = paper['Address'].split("abs")[1];
            var content =  url1 + "pdf" + url2 + ".pdf";
            var fileName = paper['Title'] + ".pdf";
            var aTag = document.createElement('a');
            // var blob = new Blob([content]);
            aTag.download = fileName;
            aTag.href = content;
            aTag.click();
            // URL.revokeObjectURL(blob);
        }
    };
    req.open('GET', url + '?' + params, true);
    req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    req.send(null);
}