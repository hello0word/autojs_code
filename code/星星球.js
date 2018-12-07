function tLog(msg) {
    //toast(msg);
    console.log(msg)
}


function prepareThings(){
    setScreenMetrics(1080, 1920);
    //请求截图
    if(!requestScreenCapture()){
        tLog("请求截图失败");
        exit();
    }
    //killZFB();
    
}
/**
 * 获取截图
 */
function getCaptureImg(){
    var img0 = captureScreen();
    if(img0==null || typeof(img0)=="undifined"){
        tLog("截图失败,退出脚本");
        exit();
    }else{
        return img0;
    }
}
/**
 * 设置按键监听 当脚本执行时候按音量减 退出脚本
 */

function 前置操作(){
    prepareThings();

}
function play(){
    //press(527,1374,1000);
    var point = null;
    point = getCaptureImg();
    //tLog(point.pixel(542,1774));
    while(true){
        point = images.findColor(getCaptureImg(),0x4e86ff,{region:[171,789,933-171,200],threshold : 0});
        if(point){
            tLog(point);
            press(point.x,point.y+20,20);
        }else{
            //tLog("sorry")
        }
    }
}

function test(){
    //前置操作();
    //play();
    press(513,1363,100);
    var array = Array();
    array.length= 950;
    while(true){
    for (let index = 200; index < array.length; index+= 80) {
     
        press(index,900,10);
        
    }
    
}
    //tLog("ok")
}


test();