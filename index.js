var main = document.querySelector('#main');
var oLis = document.querySelectorAll(".slide>li");
var winW = window.innerWidth;
var winH = window.innerHeight;
var desW = 640;
var desH = 960;
if(winW/winH>desW/desH){
    main.style.webkitTransform = "scale("+winW/desW+")";
}else{
    main.style.webkitTransform = "scale("+winH/desH+")";
}
//main.style.webkitTransform = "scale(" + winH / desH + ")";
///////
//function getEle(ele){
//    return document.querySelector(ele);
//}
//var cube = getEle(".cube");
//var cubeBox = getEle('.cubeBox');
//var cubeLis = document.querySelectorAll('.cubeBox>li');
//function a5(){
//    var startTouch = {x:0,y:0};
//    var startX = -45;
//    var startY = -45;
//    cubeBox.style.webkitTransform = "scale(0.7) rotateX(-45deg) rotateY(-45deg)";
//    [].forEach.call(cubeLis,function(){
//        arguments[0].addEventListener('touchstart',start,false)
//        arguments[0].addEventListener('touchmove',move,false)
//        arguments[0].addEventListener('touchend',end,false);
//    })
//    function start(e){
//        startTouch.x = e.changedTouches[0].pageX;
//        startTouch.y = e.changedTouches[0].pageY;
//    }
//    function move(e){
//        var moveTouchX = e.changedTouches[0].pageX;
//        var moveTouchY = e.changedTouches[0].pageY;
//        this.changePosX = moveTouchX - startTouch.x;
//        this.changePosY = moveTouchY - startTouch.y;
//        this.parentNode.style.webkitTransform = "scale(0.7)  rotateX("+(-startY-this.changePosY)+"deg) rotateY("+(startX+this.changePosX)+"deg)";
//    }
//    function end(){
//        startX+=this.changePosX;
//        startY+=this.changePosY;
//    }
//}
//document.addEventListener('touchstart',function(){
//},false);
///////
[].forEach.call(oLis, function () {
    arguments[0].index = arguments[1];
    arguments[0].addEventListener('touchstart', start, false);
    arguments[0].addEventListener('touchmove', move, false);
    arguments[0].addEventListener('touchend', end, false);
})
function start(e) {
    this.startY = e.changedTouches[0].pageY;
}
function move(e) {
    e.preventDefault();
    /*阻止默认行为*/
    var touchMove = e.changedTouches[0].pageY;
    var changePos = touchMove - this.startY;
    var cur = this.index;
    var step = 1/2;
    var scalePos =(Math.abs(changePos)/winH)*step;
    [].forEach.call(oLis,function(){
        if(arguments[1]!=cur){
            arguments[0].style.display="none";
        }
        arguments[0].className="";
        arguments[0].firstElementChild.id="";
    })
    if (changePos > 0) {/*↓*/
        var pos = -winH+changePos;
        this.preSIndex = cur == 0 ? oLis.length - 1 : cur - 1;

    } else if (changePos < 0) {/*↑*/
        var pos = winH+changePos;
        this.preSIndex = cur == oLis.length - 1 ? 0 : cur + 1;

    }
    oLis[this.preSIndex].style.webkitTransform = "translate(0,"+pos+"px)";
    oLis[this.preSIndex].className = "zIndex";
    oLis[this.preSIndex].style.display="block";
    oLis[cur].style.webkitTransform = "scale("+(1-scalePos)+") translate(0,"+changePos+"px)";
}
function end(e) {
    oLis[this.preSIndex].style.webkitTransform ="translate(0,0)";
    oLis[this.preSIndex].style.webkitTransition="0.5s";
    oLis[this.preSIndex].addEventListener('webkitTransitionEnd',function(){
        this.style.webkitTransition="";
        this.firstElementChild.id = "a"+(this.index+1);
    })
}