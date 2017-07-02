/**
 * Created by zhangmingjie on 2017/6/30.
 */
window.addEventListener('load', addpapers, false);
var paper_num = 0;
var height= document.body.clientHeight;
var paper_height = 300;


function addpapers(){
    var distance = window.pageYOffset;
    num = Math.floor((height + window.pageYOffset - 500) / paper_height + 1.0);
    if(num >= 10)
        num = 10;
    paper_num += num;
    for(var i=0;i<num;i++)
        getpaper(49-i);
}

function addpaper(paper, index){
    var ibody=document.getElementById("table").lastChild;
    var newRow=document.createElement("tr");
    var td=document.createElement("td");
    td.innerHTML="<table border='1' bgcolor='white' style=\"width: 100%;height:auto;margin-bottom: 20px\"><tbody>" +
        "<tr style='height: 25px'><td>" + paper['Title'] + "</td></tr>" +
        "<tr style='height: 25px'><td>" + paper['Authors'] + "</td></tr>" +
        "<tr style='height: 25px'><td><table align=\"left\" style=\"width:50%;height: auto;\"><tr><td>" + paper['Date'] + "</td></tr></table><table align=\"right\" style=\"width:50%;height: auto;\"><tr><td><a id=\"arXiv\" target=\“_blank\” href=\"" + paper['Address'] + "\">" + paper['Address'].split("//")[1]  + "</a></td></tr></table></td></tr>" +
        "<tr style='height: 25px'><td>GitHub</td></tr>" +
        "<tr style='height: 500px'><td>" + paper['Abstract'] + "</td></tr>" +
        "<tr style='height: 25px'><td><table align=\"left\" style=\"width:50%;height: auto;\"><tr><td>" + paper['Subject'] + "</td></tr></table><table align=\"right\" style=\"width:50%;height: auto;\"><tr><td id=" + index.toString() + " style=\"text-align: right\">" + paper['Stars'] + "</td></tr></table></td></tr>" +
        "<tr style='height: 25px'><td><input type=\"button\" value=\"赞\" onclick=\"addStar(" + index + ")\"/></td></tr>" +
        "</tbody></table>";
    newRow.appendChild(td);
    ibody.appendChild(newRow);
}

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
