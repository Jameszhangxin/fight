$(function () {
    var utingWidth = $(".undertaking").width();
    var utingHeight = $(".undertaking").height();
    var bodyWidth = $("body").width();
    var bodyHeight = $("body").height();
    var transWidth = $(".trans-one").width();
    var transHeight = $(".trans-one").height();
    var creatTimer = null;
    var moveX1 = 0;
    var moveX2 = 0;
    var moveX3 = 0;
    playGame("container1", "undertaking1");
    function playGame(ele1, ele2){
        moveX = 0;
        getMoving(ele2);
        creatTrans(ele1, ele2);
        creatTimer = setInterval(function (){
            creatTrans(ele1, ele2);
        },4000);
    }
    function creatTrans(ele1, ele2){
        var newTrans = document.createElement("div");
        var randomLeft = Math.ceil(Math.random() * (bodyWidth - transWidth));
        var getCount = Math.floor(Math.random()*4);
        if (getCount == 0){
            $(newTrans).addClass("trans-one trans-car trans-one"+randomLeft);
        }else if (getCount == 1){
            $(newTrans).addClass("trans-one trans-air trans-one"+randomLeft);
        }else if (getCount == 2){
            $(newTrans).addClass("trans-one trans-bike trans-one"+randomLeft);
        }else if (getCount == 3){
            $(newTrans).addClass("trans-one trans-step trans-one"+randomLeft);
        }
        $("."+ele1).append(newTrans);console.log("添加进来");
        $(".trans-one"+randomLeft).css("left", randomLeft + "px");
        var countStep = 0;
        var moveX = 0;
        var timer = setInterval(function (){
            countStep++;
            $(".trans-one"+randomLeft).css("top", countStep + "px");
            if ((countStep >= (bodyHeight-utingHeight-transHeight)) && (countStep <= bodyHeight)){
                if (ele1 == "container1"){
                    moveX = moveX1;
                }else if (ele1 == "container2"){
                    moveX = moveX2;
                }else if (ele1 == "container3"){
                    moveX = moveX3;
                }
                if ((moveX <= (randomLeft+transWidth)) && (moveX >= (randomLeft-utingWidth))){
                    clearInterval(timer);
                    clearInterval(creatTimer);
                    $("."+ele2).off("touchstart");
                    $("."+ele2).off("touchmove");
                    $("."+ele1).empty();
                    if (ele1 == "container1"){
                        moveX = 100000;moveX1 = 10000;
                        $(".container2").show();
                        playGame("container2", "undertaking2");console.log(00);
                    }else if (ele1 == "container2") {
                        moveX = 100000;moveX2 = 10000;
                        $(".container3").show();
                        playGame("container3", "undertaking3");console.log(11);
                    }else if (ele1 == "container3"){
                        moveX = 100000;moveX3 = 10000;
                        $(".container4").show();console.log(22);
                    }
                }
            }
        },17);
    }
    function getMoving(ele){
        $("."+ele).on("touchstart", function (e){
            var startX = e.originalEvent.changedTouches[0].clientX-utingWidth/2;
            movePlace(startX, ele);
        });
        $("."+ele).on("touchmove", function (e){
            if (ele == "undertaking1"){
                moveX1 = e.originalEvent.changedTouches[0].clientX-utingWidth/2;
                movePlace(moveX1, ele);
            }else if (ele == "undertaking2"){
                moveX2 = e.originalEvent.changedTouches[0].clientX-utingWidth/2;
                movePlace(moveX2, ele);
            }else if (ele == "undertaking3"){
                moveX3 = e.originalEvent.changedTouches[0].clientX-utingWidth/2;
                movePlace(moveX3, ele);
            }
        });
    }
    function movePlace(ele, ele3){
        if (ele >= bodyWidth-(utingWidth)){
            ele = bodyWidth-utingWidth;
        } else if (ele <= 0){
            ele = 0;
        } else {
            ele = ele;
        }
        $("."+ele3).css("left", ele+"px");
    }
});