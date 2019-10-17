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
        <div class="newArriaw"></div>
        <img src="${productJson.goodsImgSrc}" alt="">
    `;   
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
