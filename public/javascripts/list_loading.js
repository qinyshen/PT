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
        addpaper(i);
}

function addpaper(index){
    var ibody=document.getElementById("table").lastChild;
    var newRow=document.createElement("tr");
    var td=document.createElement("td");
    td.innerHTML="<table border='1' bgcolor='white' style=\"width: 100%;height:auto;margin-bottom: 20px\"><tbody>" +
        "<tr style='height: 25px'><td>Title</td></tr>" +
        "<tr style='height: 25px'><td>Authors</td></tr>" +
        "<tr style='height: 25px'><td><table align=\"left\" style=\"width:50%;height: auto;\"><tr><td>Date</td></tr></table><table align=\"right\" style=\"width:50%;height: auto;\"><tr><td>arXiv</td></tr></table></td></tr>" +
        "<tr style='height: 25px'><td>GitHub</td></tr>" +
        "<tr style='height: 100px'><td>Abstracts</td></tr>" +
        "<tr style='height: 25px'><td><table align=\"left\" style=\"width:50%;height: auto;\"><tr><td>Subjects</td></tr></table><table align=\"right\" style=\"width:50%;height: auto;\"><tr><td>Stars</td></tr></table></td></tr>" +
        "<tr style='height: 25px'><td><input type=\"button\" value=\"赞\" onclick=\"addStar()\"/></td></tr>" +
        "</tbody></table>";
    newRow.appendChild(td);
    ibody.appendChild(newRow);
}