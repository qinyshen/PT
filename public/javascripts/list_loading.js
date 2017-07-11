/**
 * Created by zhangmingjie on 2017/6/30.
 */
window.addEventListener('load', addpapers, false);
var paper_num = 0;
var height= document.body.clientHeight;
var paper_height = 300;
var Subject = "cs_AI";

function addpapers(){
    var distance = window.pageYOffset;
    var num = Math.floor((height + window.pageYOffset - 500) / paper_height + 1.0);
    if(num >= 5)
        num = 5;
    paper_num += num;
    search_max();
}

function addpaper(paper, index){
    var ibody=document.getElementById("table").lastChild;
    var newRow=document.createElement("tr");
    var td=document.createElement("td");
    td.innerHTML="<table style='width: 100%;height:auto;margin-bottom: 20px'><tbody>" +
        "<tr style='height: 80px;' bgcolor='white'><td style='padding:10px 20px 0 20px;'>" + paper['Title'] + "</td></tr>" +
        "<tr style='height: 40px;' bgcolor='white'><td style='padding:0 20px 0 20px;'>" + paper['Authors'] + "</td></tr>" +
        "<tr style='height: 40px;' bgcolor='white'><td style='padding:0 20px 0 20px;'><table align='left' style='width:50%;height: auto;'><tr><td>" + paper['Date'] + "</td></tr></table><table align=\"right\" style=\"width:50%;height: auto;\"><tr><td><a id=\"arXiv\" target=\“_blank\” href=\"" + paper['Address'] + "\">" + paper['Address'].split("//")[1]  + "</a></td></tr></table></td></tr>" +
        "<tr style='height: 40px;' bgcolor='white'><td style='padding:0 20px 0 20px;'>GitHub</td></tr>" +
        "<tr style='height: 500px;' bgcolor='white'><td style='vertical-align:text-top;padding:0 20px 0 20px;'>" + paper['Abstract'] + "</td></tr>" +
        "<tr style='height: 40px;' bgcolor='white'><td style='padding:0 20px 0 20px;'><table align='left' style='width:50%;height: auto;'><tr><td>" + paper['Subject'] + "</td></tr></table><table align='center' style='width:50%;height: auto;'><tr><td id=" + index.toString() + " style='text-align: center'>" + paper['Stars'] + "</td></tr></table></td></tr>" +
        "<tr style='height: 40px; background-color:rgba(0,0,0,0)'>" +
        "<td><button class='mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect mdl-shadow--4dp' style='width:20%;margin-left: 4%' onclick='addStar(" + index + ")'>点赞</button>"+
        "<button class='mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect mdl-shadow--4dp' style='width:20%;margin-left: 4%'>评论</button>" +
        "<button class='mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect mdl-shadow--4dp' style='width:20%;margin-left: 4%' onclick='dlpaper(" + index + ")'>下载</button>" +
        "<button class='mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect mdl-shadow--4dp' style='width:20%;margin-left: 4%'>收藏</button></td></tr>" +
        "</tbody></table>";
    newRow.appendChild(td);
    ibody.appendChild(newRow);
}
