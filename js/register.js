// window.onload = function(){
//     // 效果一：
//     // header_top部分网页滚动，导航变化效果
//     if($(window).scrollTop()>100){
//         $(".header_top").addClass("scrolling_header_top");
//         $(".header_btm").addClass("scrolling_header_btm");
//         $(".header_btm li a").css({lineHeight:"70px",height:"70px"});
//         $(".header_btm a:first").addClass("header_left_logo");
//         $(".levelTwo ul li a").css({lineHeight:"30px",height:"13px"});
//     }
//     window.onscroll = function(){
//         if($(window).scrollTop()>100){
//             $(".header_top").addClass("scrolling_header_top");
//             $(".header_btm").addClass("scrolling_header_btm");
//             $(".header_btm li a").css({lineHeight:"70px",height:"70px"});
//             $(".header_btm a:first").addClass("header_left_logo");
//             $(".levelTwo ul li a").css({lineHeight:"30px",height:"13px"});
//         }else{
//             $(".header_top").removeClass("scrolling_header_top");
//             $(".header_btm").removeClass("scrolling_header_btm");
//             $(".header_btm li a").css({lineHeight:"61.6px",height:"61.6px"});
//             $(".header_btm a:first").removeClass("header_left_logo");
//             $(".levelTwo ul li a").css({lineHeight:"30px",height:"13px"});
//         }
//     }

//     // 效果二：
//     // 鼠标悬浮header_btm li , 二级菜单div显示
//     $(".header_btm li").mouseover(function(){
//         $(this).children(".levelTwo").show();
//     });
//     $(".header_btm li").mouseout(function(){
//         $(this).children(".levelTwo").hide();
//     });

//     // 二级菜单显示鼠标悬浮在第二列出现不同第三列
//     $(".inner_two > li").mouseover(function(){
//         $($(".inner_two ~ .inner_three")[0]).show();
//         $($(".inner_two ~ .inner_three")[1]).hide();
//         $($(".inner_two ~ .inner_three")[2]).hide();
//     });
//     for(let i = 0 ; i < 3 ; i++){
//         $($(".inner_two > li")[i]).mouseover(function(){
//             $($(".inner_two ~ .inner_three")[0]).hide();
//             $($(".inner_two ~ .inner_three")[1]).hide();
//             $($(".inner_two ~ .inner_three")[2]).hide();
//             $($(".inner_two ~ .inner_three")[i]).show();
//         });
//     }

// }

// 效果七：生成验证码
function getATestifyCode(){
    let testifyCode = "";
    for(let i = 0 ; i < 6 ; i++){
        let j = parseInt(Math.random()*16).toString(16);
        testifyCode += j;
    }
    return testifyCode;
}
$(function(){
    $("#name").blur(function(){
        let nameStr = $(this).val();
        let regStr = /^[\u4e00-\u9fa5]{2,4}$/;
        if(!regStr.test(nameStr)){
            $(this).next().html("用户名必须是二到四位的中文");
            $(this).next()[0].style.display = "block";
            $(this)[0].style.borderBottom = "3px solid red";
        }else{
            $(this).next().html("该用户名可用");
            $(this).next()[0].style.color = "green";
            $(this).next()[0].style.display = "block";
            $(this)[0].style.borderBottom = "3px solid green";
        }
    });
    $("#mobliePhone").blur(function(){
        let nameStr = $(this).val();
        let regStr = /^1[3456789]\d{9}$/;
        if(!regStr.test(nameStr)){
            $(this).next().html("请输入正确电话号码格式");
            $(this).next()[0].style.display = "block";
            $(this)[0].style.borderBottom = "3px solid red";
        }else{
            $(this).next().html("该电话号码可用");
            $(this).next()[0].style.color = "green";
            $(this).next()[0].style.display = "block";
            $(this)[0].style.borderBottom = "3px solid green";
        }
    });
    $("#getATestifyCode").click(function(){
        let testifyCode = getATestifyCode();
        alert(testifyCode);
        $("#getATestifyCode").next()[0].value = testifyCode;
        $("#getATestifyCode").prev().removeAttr("disabled");
        $("#getATestifyCode").prev()[0].style.backgroundColor = "white";
    });
});



// 效果八：注册页面的Ajax部分
var submitOrNot1 = false;
var submitOrNot2 = false;
var submitOrNot3 = false;
$("#register_btn_submit").click(function(){
    if($("#agreement_box")[0].checked){
        $(this).prev().children()[2].style.display = "none";
        submitOrNot1 = true;
    }else{
        submitOrNot1 = false;
        $(this).prev().children()[2].innerHTML = "*请同意注册协议";
        $(this).prev().children()[2].style.display = "block";
    }
    if(($("#getATestifyCode").prev().val()==$("#getATestifyCode").next().val())&&$("#getATestifyCode").prev().val()!=""){
        $("#getATestifyCode").next().next()[0].style.display = "none";        
        submitOrNot2 = true;
    }else{
        submitOrNot2 = false;
         $("#getATestifyCode").next().next()[0].innerHTML = "*验证码输入错误";
         $("#getATestifyCode").next().next()[0].style.display = "block";
    };
    if($("#name").val()=="" || $("#mobliePhone").val()==""){
        submitOrNot3 = false;
        if($("#name").val()==""){
            $("#name").next().html("请输入用户名");
            $("#name").next()[0].style.display = "block";
        }else{
            $("#name").next().html("请输入用户名");
            $("#name").next()[0].style.display = "block";
        }
    }else{
        $(".agreement_box_error")[0].display = "none";
        submitOrNot3 = true;
    }
    if(submitOrNot1&&submitOrNot2&&submitOrNot3){
        $(this).prev().children()[2].style.display = "none";
        //创建对象
        let xhr = new XMLHttpRequest();
        xhr.open("post","php/register.php",true);
        xhr.onreadystatechange = function(){
            if(xhr.readyState==4 && xhr.status==200){
                // console.log(xhr.responseText);
                if(xhr.responseText == "-1"){
                    $(".mobliePhone_error")[0].innerHTML = "*该手机号已经注册";
                    $(".mobliePhone_error")[0].style.display = "block";
                }else if(xhr.responseText == "0"){
                    $(".mobliePhone_error")[0].innerHTML = "*注册失败";
                    $(".mobliePhone_error")[0].style.display = "block";
                }else{
                    $(".mobliePhone_error")[0].innerHTML = "√注册成功";
                    $(".mobliePhone_error")[0].style.display = "block";
                    $(".mobliePhone_error")[0].style.color = "green";
                    setTimeout(function(){
                        window.location.href = "/DW/login.html"
                    },1000);    
                }    
            }    
        }    
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        let sendstr = `username=${$("#name")[0].value}&mobliePhoneNum=${$("#mobliePhone")[0].value}&sex=${$("#sex")[0].value}`;
        xhr.send(sendstr);                
    }
});    

