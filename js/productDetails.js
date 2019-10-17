// 效果一：迷你无缝轮播图
var index = 0;
$(function(){
    $(".smallImg_rightArrow").click(function(){
        index++;
        if(index>=8){
            index = 1;
            $(".smallImg_showBox_LongBox")[0].style.left = "0px";
        }
        let len = index*(-127);
        $(".smallImg_showBox_LongBox").animate({
            left:len+"px",
        },500);
        for(let i = 0 ; i < $(".smallImg_showBox_LongBox").children().size() ; i++){
            $(".smallImg_showBox_LongBox").children()[i].style.opacity = "0.5";
            $(".smallImg_showBox_LongBox").children()[index+1].style.opacity = "1";
        }
        $(".productImg_Container_img img")[0].src = $(".smallImg_showBox_LongBox").children()[index+1].src;
    });
    $(".smallImg_leftArrow").click(function(){
        if(index<=0){
            index = 7;
            $(".smallImg_showBox_LongBox")[0].style.left = index*(-127)+"px";
        }
        --index;
        let len = index*(-127);
        $(".smallImg_showBox_LongBox").animate({
            left:len+"px",
        },500);
        for(let i = 0 ; i < $(".smallImg_showBox_LongBox").children().size() ; i++){
            $(".smallImg_showBox_LongBox").children()[i].style.opacity = "0.5";
            $(".smallImg_showBox_LongBox").children()[index+1].style.opacity = "1";
        }
        $(".productImg_Container_img img")[0].src = $(".smallImg_showBox_LongBox").children()[index+1].src;
    });
});


// 效果二：动态获取页面内容
let goodsId = GetQueryString("goodsId");
$.ajax({
    "type": "post",
    "url": "php/getThisProduct.php",
    "data": `goodsId=${goodsId}`,
    "async": true,
    "datatype": "json",
    // "beforeSend":function(){
    //     GetQueryString("goodsId");
    // },
    "success": showGoods,
    // "complete": function(){
    //     loadDiv.hide();
    // }
});
function showGoods(response){
    // console.log(response);
    let productJson = JSON.parse(response)[0];
    console.log(productJson);
    $(".productImg_Container_img")[0].innerHTML = `
        <div class="mrriorBox"></div>
        <div class="newArriaw"></div>
        <img src="${productJson.goodsImgSrc}" alt="">
    `;   
    $(".productAction_Container h1")[0].innerHTML = `
        <span>${productJson.goodsCollection} | 28MM </span>
        ${productJson.goodsDisplayName}
    `;
    $(".price")[0].innerHTML = `
        ${productJson.goodsDisplayPrice}
    `;
    $(".smallImg_showBox_LongBox").children()[1].src = productJson.goodsImgSrc;
    $(".smallImg_showBox_LongBox").children()[8].src = productJson.goodsImgSrc;
}
//获取地址栏某一数据
function GetQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null){
        return unescape(r[2]);
    }
    return null;
}

// 效果三:放大镜效果
let boxDom = $(".productImg_Container_img")[0];
let mirrorDom = $(".productImg_Container_img .mrriorBox")[0];
let showDom = $(".productAction_Container .magnify_box")[0];
let beiShu = 2;
let width = mirrorDom.style.width;
let height = mirrorDom.style.height;
boxDom.onmouseenter = function(){
    mirrorDom.style.display = "block";
    showDom.style.display = "block";
    showDom.style.backgroundImage = "url("+(boxDom.children)[2].src+")";
    showDom.style.backgroundSize = `${boxDom.offsetWidth*beiShu}px ${boxDom.offsetHeight*beiShu}px`;
}
boxDom.onmouseleave = function(){
    mirrorDom.style.display = "none";
    showDom.style.display = "none";
}
boxDom.onmousemove = function(event){
    console.log(boxDom.offsetLeft+" "+boxDom.offsetTop+" "+mirrorDom.offsetWidth+" "+mirrorDom.offsetHeight);
    let evt = event || window.event;
    //一、处理数据
    //1、
    let left1 = evt.pageX-boxDom.offsetLeft-($(".productImg_Container_img .mrriorBox")[0].offsetWidth)/2;
    let top1 =  evt.pageY-boxDom.offsetTop-($(".productImg_Container_img .mrriorBox")[0].offsetHeight)/2;
    console.log(left1);
    console.log(top1);
    //2、
    if(left1<0){
        left1=0;
    }else if(left1>boxDom.offsetWidth-width){
        left1=boxDom.offsetWidth-width;
    }
    
    if(top1<0){
        top1=0;
    }else if(top1>boxDom.offsetHeight-height){
        top1=boxDom.offsetHeight-height;
    }

    //二、改变外观
    $(".productImg_Container_img .mrriorBox")[0].style.left = left1+"px";
    $(".productImg_Container_img .mrriorBox")[0].style.top = top1+"px";
    $(".productAction_Container .magnify_box")[0].style.backgroundPosition = `-${left1*beiShu}px -${top1*beiShu}px`;        
};