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

    // 效果五：用户登录购物车点击显示
    $("body").click(function(e){
        let target = $(e.target);
        let vipInfo = JSON.parse(getCookie("vipInfo"));
        if(target.is(".header_user") || target.is(".header_user span")){
                // 页面载入首先判断是否判断是否有cookie存在
            if(vipInfo){
                $("#logined").css({display:"block"});
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


    // 效果六：点击更多
    $(".more_box").click(function(){
        let flag = false;
        let productItems = $(this).parent().prev().children().children();
        for(let i = 0 ; i < productItems.size()-1; i++){
            if(productItems[i].style.display=="none"){
                productItems[i].style.display = "block";
                flag = true;
            }
        }
        if(flag){
            $(this).parent().css({display:"none"});
        }
    });

}