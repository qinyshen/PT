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
    td.innerHTML="<table border='1' bgcolor='white' style=\"width: 100%;height:auto;margin-bottom: 20px\"><tbody>" +
        "<tr style='height: 25px'><td>" + paper['Title'] + "</td></tr>" +
        "<tr style='height: 25px'><td>" + paper['Authors'] + "</td></tr>" +
        "<tr style='height: 25px'><td><table align=\"left\" style=\"width:50%;height: auto;\"><tr><td>" + paper['Date'] + "</td></tr></table><table align=\"right\" style=\"width:50%;height: auto;\"><tr><td><a id=\"arXiv\" target=\“_blank\” href=\"" + paper['Address'] + "\">" + paper['Address'].split("//")[1]  + "</a></td></tr></table></td></tr>" +
        "<tr style='height: 25px'><td>GitHub</td></tr>" +
        "<tr style='height: 500px'><td style=\"vertical-align:text-top\">" + paper['Abstract'] + "</td></tr>" +
        "<tr style='height: 25px'><td><table align=\"left\" style=\"width:50%;height: auto;\"><tr><td>" + paper['Subject'] + "</td></tr></table><table align=\"center\" style=\"width:50%;height: auto;\"><tr><td id=" + index.toString() + " style=\"text-align: center\">" + paper['Stars'] + "</td></tr></table></td></tr>" +
        "<tr style='height: 25px'><td><input type=\"button\" style=\"width:25%\" value=\"赞\" onclick=\"addStar(" + index + ")\"/><input type=\"button\" style=\"width:25%\" value=\"评论\"/><input type=\"button\" style=\"width:25%\" value=\"下载\" onclick=\"dlpaper(" + index + ")\"/><input type=\"button\" style=\"width:25%\" value=\"收藏\"/></td></tr>" +
        "</tbody></table>";
    newRow.appendChild(td);
    ibody.appendChild(newRow);
}
