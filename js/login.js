window.onload = function(){

    // 效果一：
    // header_top部分网页滚动，导航变化效果
    if($(window).scrollTop()>100){
        $(".header_top").addClass("scrolling_header_top");
        $(".header_btm").addClass("scrolling_header_btm");
        $(".header_btm li a").css({lineHeight:"70px",height:"70px"});
        $(".header_btm a:first").addClass("header_left_logo");
        $(".levelTwo ul li a").css({lineHeight:"30px",height:"13px"});
    }
    window.onscroll = function(){
        if($(window).scrollTop()>100){
            $(".header_top").addClass("scrolling_header_top");
            $(".header_btm").addClass("scrolling_header_btm");
            $(".header_btm li a").css({lineHeight:"70px",height:"70px"});
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
        if(target.is(".header_user") || target.is(".header_user span")){
            $(".userLogin").css({display:"block"});
        }else{
            $(".userLogin").css({display:"none"});
        }
    })
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
    $("#getATestifyCode").click(function(){
        let testifyCode = getATestifyCode();
        alert(testifyCode);
        $("#getATestifyCode").next()[0].value = testifyCode;
        $("#getATestifyCode").prev().removeAttr("disabled");
        $("#getATestifyCode").prev()[0].style.backgroundColor = "white";
    });
}

// 效果七：生成验证码
function getATestifyCode(){
    let testifyCode = "";
    for(let i = 0 ; i < 6 ; i++){
        let j = parseInt(Math.random()*16).toString(16);
        testifyCode += j;
    }
    return testifyCode;
}

//验证手机号是否符合正则
$("#mobliePhone").blur(function(){
    let nameStr = $(this).val();
    let regStr = /^1[3456789]\d{9}$/;
    if(!regStr.test(nameStr)){
        $(this).next().html("请输入正确电话号码格式");
        $(this).next()[0].style.display = "block";
        $(this)[0].style.borderBottom = "3px solid red";
    }else{
        $(this).next().html("");
        $(this).next()[0].style.color = "green";
        $(this).next()[0].style.display = "block";
        $(this)[0].style.borderBottom = "3px solid green";
    }
});

//登陆页面的Ajax部分
var submitOrNot1 = false;
var submitOrNot2 = false;
$("#login_btn_submit").click(function(){
    //先进行是否可以向后台发送数据的验证
    if($("#mobliePhone").val()==""){
        $(".mobliePhone_error")[0].innerHTML = "*请输入手机号";
        $(".mobliePhone_error")[0].style.display = "block";
        submitOrNot1 = false;
        return;
    }else{
        submitOrNot1 = true;
    }
    if(($("#getATestifyCode").prev().val()==$("#getATestifyCode").next().val())&&$("#getATestifyCode").prev().val()!=""){
        $("#getATestifyCode").next().next()[0].style.display = "none";        
        submitOrNot2 = true;
    }else if($("#getATestifyCode").prev().val()==""){
        submitOrNot2 = false;
         $("#getATestifyCode").next().next()[0].innerHTML = "*请获取并输入验证码";
         $("#getATestifyCode").next().next()[0].style.display = "block";
         return;
    }else{
        submitOrNot2 = false;
        $("#getATestifyCode").next().next()[0].innerHTML = "*验证码输入错误";
        $("#getATestifyCode").next().next()[0].style.display = "block";
        return;
    };
    if(submitOrNot1 && submitOrNot2){
        //创建对象
        let xhr = new XMLHttpRequest();
        xhr.open("post","php/login.php",true);
        xhr.onreadystatechange = function(){
            if(xhr.readyState==4 && xhr.status==200){
                console.log(xhr.responseText);
                if(xhr.responseText == "-1"){
                    $(".mobliePhone_error")[0].innerHTML = "该手机号还未注册，请注册";
                    $(".mobliePhone_error")[0].style.color = "red";
                    $("#mobliePhone")[0].style.borderBottom = "3px solid red";
                    $(".mobliePhone_error")[0].style.display = "block";
                }else{
                    $(".mobliePhone_error")[0].innerHTML = "登陆成功，即将跳转主页";
                    $(".mobliePhone_error")[0].style.display = "block";
                    $(".mobliePhone_error")[0].style.color = "green";
                    let vipInfo = xhr.responseText;
                    addCookie("vipInfo",JSON.stringify(vipInfo),7);
                    setTimeout(function(){
                        window.location.href = "/DW/index.html";
                    },3000);
                }
            }
        }
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        let sendstr = `mobliePhoneNum=${$("#mobliePhone")[0].value}`;
        xhr.send(sendstr);
    }
});

