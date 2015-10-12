function load_remote_file(element, filename, tomd) {
    var xmlhttp;
    var filename = filename + "?rnd=" + Math.random();

    try{
        xmlhttp=new XMLHttpRequest();
    }catch(e){
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("get", filename);
    xmlhttp.setRequestHeader('Content-type','text/plain');
    xmlhttp.onreadystatechange=function(){
        if (4==xmlhttp.readyState){
            if (200==xmlhttp.status || 0==xmlhttp.status){
                var datas=xmlhttp.responseText;
                if (datas && element) {
                    if (tomd) {
                        element.innerHTML = markdown.toHTML(datas);
                    } else {
                        element.innerHTML = datas; 
                    }
                }
            } else {
                alert("Open page: " + filename + " error: " + xmlhttp.status);
            }
        }
    }
    xmlhttp.send(null);
}

function load_page() {
    var em_widget  = document.getElementById("widget-all");
    var em_page_hd = document.getElementById("page-head");
    var em_list_ct = document.getElementById("list-categories");
    var em_list_rt = document.getElementById("list-recent-posts");
    var em_list_cm = document.getElementById("content-markdown");
    var param_file = window.location.search.substring(1);

    if (em_list_ct) {
        load_remote_file(em_list_ct, "/blog/categories.htm", false);

    }
    if (em_list_rt) {
        load_remote_file(em_list_rt, "/blog/recents.htm", false);
    }
    if (em_list_cm) {
        if (!param_file) {
            em_page_hd.innerHTML = "On the way ..."
            load_remote_file(em_list_cm, "/blog/recentposts.htm", false);
        } else if (param_file == "about") {
            em_page_hd.innerHTML = "About this blog and me"
            em_widget.style.display="none";
            load_remote_file(em_list_cm, "/source/about.md", true);
        } else {
            em_page_hd.innerHTML = "On the way ..."
            load_remote_file(em_list_cm, "/" + param_file + ".md", true);
        }
    }
}

$(document).ready(function() {
    $(window).scroll(function(){  //只要窗口滚动,就触发下面代码 
        var scrollt = document.documentElement.scrollTop + document.body.scrollTop; //获取滚动后的高度 
        if( scrollt >200 ){  //判断滚动后高度超过200px,就显示
            $("#gotop").fadeIn(400); //淡出
            $(".navbar").stop().fadeTo(400, 0.2);
        }else{
            $("#gotop").fadeOut(400); //如果返回或者没有超过,就淡入.必须加上stop()停止之前动画,否则会出现闪动
            $(".navbar").stop().fadeTo(400, 1);
        }
    });
    $("#gotop").click(function(){ //当点击标签的时候,使用animate在200毫秒的时间内,滚到顶部
        $("html,body").animate({scrollTop:"0px"},200);
    });
    $(".navbar").mouseenter(function(){
        $(".navbar").fadeTo(100, 1);
    });
    $(".navbar").mouseleave(function(){
        var scrollt = document.documentElement.scrollTop + document.body.scrollTop;
        if ( scrollt > 200) {
            $(".navbar").fadeTo(100, 0.2);
        }
    });
    $(window).load(function(){
    	load_page();
    });
});

