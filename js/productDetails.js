$(function(){
    var index = 2;
    let translateXLen = index*(-127);
    $(".smallImg_rightArrow").click(function(){
        $(".smallImg_showBox_LongBox").css({transition:"0s",transform:"translateX(127px)"});
        $(".smallImg_showBox_LongBox").css({transition:".5s",transform:"translateX(0)"});
    });
    // $(".smallImg_leftArrow").click(function(){
    //     $(".smallImg_showBox_LongBox").css({transition:"0s",transform:"translateX("+(translateXLen)+"px)"});
    //     $(".smallImg_showBox_LongBox").css({transform:"translateX("+(translateXLen+127)+"px)",transition:".5s"});
    // });
});