/**
 * Created by zhangmingjie on 2017/6/30.
 */
window.addEventListener('scroll', winScroll);

function winScroll(e) {
    var distance = window.pageYOffset;
    var title_container = document.getElementById("title_container");
    var title0 = document.getElementById("title0");
    var title1 = document.getElementById("title1");
    var subtitle_container = document.getElementById("subtitle_container");
    var subtitle = document.getElementById("subtitle");
    var table = document.getElementById("table");
    var paper_h = table.clientHeight / paper_num;

    document.getElementById("table_container").style.marginTop = 500 - distance + "px";

    if (distance >= 0 || distance <= 250 - subtitle_container.clientHeight){
        subtitle.style.opacity = (250 - subtitle_container.clientHeight - distance) / (250 - subtitle_container.clientHeight);
    }

    if (paper_num < maxium) {
        if (distance + height - 500 - table.clientHeight > 0) {
            paper_num += 1;
            getpaper(maxium - paper_num + 1);
        }
    }

    if (150 - distance <= 0) {
        title0.style.display="";
        title1.style.display="none";
    }
    else{
        title1.style.display="";
        title0.style.display="none";
    }

}