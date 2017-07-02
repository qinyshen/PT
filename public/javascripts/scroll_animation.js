/**
 * Created by zhangmingjie on 2017/6/30.
 */
window.addEventListener('scroll', winScroll);

function winScroll(e) {
    var distance = window.pageYOffset;
    var title_container = document.getElementById("title_container");
    var title = document.getElementById("title");
    var subtitle_container = document.getElementById("subtitle_container");
    var subtitle = document.getElementById("subtitle");
    var table = document.getElementById("table");
    var paper_h = table.clientHeight / paper_num;

    document.getElementById("table_container").style.marginTop = 500 - distance + "px";

    if (distance >= 0 || distance <= 250 - subtitle_container.clientHeight){
        subtitle.style.opacity = (250 - subtitle_container.clientHeight - distance) / (250 - subtitle_container.clientHeight);
    }

    if (paper_num < 10) {
        if (distance + height - 500 - table.clientHeight > 0) {
            paper_num += 1;
            getpaper((49 - paper_num + 1).toString());
        }
    }

    if (distance <= 0){
        subtitle_container.style.marginTop = 250 - distance + "px";
    }

    if (200 - title_container.clientHeight / 2 - distance > - document.getElementById("bar").clientHeight / 2) {
        title_container.style.marginTop = 200 - title_container.clientHeight / 2 - distance + "px";
        title_container.style.zIndex = 9;
        title.style.fontSize = "50px";
    }
    else{
        if (distance>=0) {
            title_container.style.marginTop = - document.getElementById("bar").clientHeight / 2 + "px";
            title_container.style.zIndex = 11;
            title.style.fontSize = "38px";
        }
    }
}