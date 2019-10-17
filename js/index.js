
window.onload = function(){
    
    // 效果一：
    // header_top部分网页滚动，导航变化效果
    if($(window).scrollTop()>0){
        $(".header_top").addClass("scrolling_header_top");
        $(".header_btm").addClass("scrolling_header_btm");
        $(".header_btm li a").css({lineHeight:"82px",height:"82px"});
        $(".header_btm a:first").addClass("header_left_logo");
        $(".levelTwo ul li a").css({lineHeight:"30px",height:"13px"});
    }
    window.onscroll = function(){
        if($(window).scrollTop()>0){
            $(".header_top").addClass("scrolling_header_top");
            $(".header_btm").addClass("scrolling_header_btm");
            $(".header_btm li a").css({lineHeight:"82px",height:"82px"});
            $(".header_btm a:first").addClass("header_left_logo");
            $(".levelTwo ul li a").css({lineHeight:"30px",height:"13px"});
        }else{
            $(".header_top").removeClass("scrolling_header_top");
            $(".header_btm").removeClass("scrolling_header_btm");
            $(".header_btm li a").css({lineHeight:"61.6px",height:"61.6px"});
            $(".header_btm a:first").removeClass("header_left_logo");
            $(".levelTwo ul li a").css({lineHeight:"30px",height:"13px"});
        }
    }

    // 效果二：
    // 鼠标悬浮header_btm li , 二级菜单div显示
    $(".header_btm li").mouseover(function(){
        $(this).children(".levelTwo").show();
    });
    $(".header_btm li").mouseout(function(){
        $(this).children(".levelTwo").hide();
    });

    // 二级菜单显示鼠标悬浮在第二列出现不同第三列
    $(".inner_two > li").mouseover(function(){
        $($(".inner_two ~ .inner_three")[0]).show();
        $($(".inner_two ~ .inner_three")[1]).hide();
        $($(".inner_two ~ .inner_three")[2]).hide();
    });
    for(let i = 0 ; i < 3 ; i++){
        $($(".inner_two > li")[i]).mouseover(function(){
            $($(".inner_two ~ .inner_three")[0]).hide();
            $($(".inner_two ~ .inner_three")[1]).hide();
            $($(".inner_two ~ .inner_three")[2]).hide();
            $($(".inner_two ~ .inner_three")[i]).show();
        });
    }

    this.bgImgGo();


    
 

}

// 效果三:
// 背景图片切换淡入淡出 
let timer;
let index = 0;
function bgImgGo(){
    timer = setInterval(function(){
        let outIndex = index;
        index++;
        if(index>$(".banner img").size()-1){
            index = 0;
        }
        let imgs = $(".banner img");
        this.fadeInOut(imgs[outIndex],imgs[index],1000);
        let doudous = $(".doudou span");
        doudous[outIndex].style.background = "rgb(35, 52, 69)";
        doudous[index].style.background = "white";
    },5000);
}

$(".right_arrow").click(function(){
    goImg(index+1);
});
$(".left_arrow").click(function(){
    goImg(index-1);
});

let lis = $(".doudou").children();
for(let i = 0 ; i < lis.length ; i++){
    lis[i].onclick = function(){
        goImg(i);
    }
}


function goImg(transIndex){
    let outIndex = index;
    index = transIndex;
    if(index>$(".banner img").size()-1){
        index = 0;
    }
    if(index<0){
        index = $(".banner img").size()-1;
    }
    //改变外观
    //淡入的是index，淡出的是index-1
    let imgs = $(".banner img");
    fadeInOut(imgs[outIndex],imgs[index],1000);
    //改变豆豆颜色
    let lis = $(".doudou").children();
    lis[outIndex].style.background = "rgb(35, 52, 69)";
    lis[index].style.background = "white";
}
function stop(){
    window.clearInterval(timer);
}
function fadeInOut(obj1,obj2,timeLong){
    let opac = 1;
    let everyRat = 1/(timeLong/16);
    let myTimer = setInterval(()=>{
        opac -= everyRat;
        if(opac <= 0 ){
            opac = 0;
            window.clearInterval(myTimer);
        }
        obj1.style.opacity = opac;
        obj2.style.opacity = 1 - opac;
    },16);
}


// 效果四：轮播栏
let ImgPosition = 0;

$(".goNext").click(function(){
    ImgPosition++;
    if(ImgPosition>1){
        ImgPosition = 1;
        return;
    }
    $(".showBox").css({
        left: ImgPosition*(-1440)+"px"
    });
});
$(".goPre").click(function(){
    ImgPosition--;
    if(ImgPosition<0){
        ImgPosition = 1;
        return;
    }
    $(".showBox").css({
        left: ImgPosition*(-1440)+"px"
    });
});


// 效果五：用户登录购物车点击显示
$("body").click(function(e){
    let target = $(e.target);
    let vipInfo = JSON.parse(getCookie("vipInfo"));
    console.log(vipInfo);
    if(target.is(".header_user") || target.is(".header_user span")){
            // 页面载入首先判断是否判断是否有cookie存在
        if(vipInfo){
            $("#logined").css({display:"block"});
            // console.log(JSON.parse(vipInfo)[0].username);
            $(".account-name")[0].innerHTML = (JSON.parse(vipInfo)[0].username);
        }else{
            $(".userLogin")[0].style.display = "block";
        }
    }else{
        if(vipInfo){
            $("#logined").css({display:"none"});
        }else{
            $(".userLogin")[0].style.display = "none";
        }
    }
});
$("#user-layout").click(function(){
    removeCookie("vipInfo");
    window.location.href = "/DW/index.html";
});
$("body").click(function(e){
    let target = $(e.target);
    if(target.is(".header_cart") || target.is(".header_cart span")){
        $(".mini_cart").css({right:"0"});
        $(".mini_cart_cover").css({display:"block"});
        $("body").css({overflowY:"hidden"});
    }else if(target.is(".mini_cart_cover") || target.is(".mini_cart_header img")){
        $(".mini_cart").css({right:"-475px"});
        $(".mini_cart_cover").css({display:"none"});
        $("body").css({overflow:"auto"});
    }
});
