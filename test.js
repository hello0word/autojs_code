
function 枚举方法(obj){      
    var names="";  
           
    for(var name in obj){         
       names+=name+"\n ";    
    }    
    log(names);    
}


/**
只支持部分枪械，运行后会出现b64按钮， 选择合适的倍数，点击即可压枪
*/
"auto";

images.requestScreenCapture(true);
setScreenMetrics(1080, 2160);

var ZX = images.read("./准星.png");
var sacr = images.read("./SCAR-L.png");
var m416 = images.read("./M416.png");
var m16a4 = images.read("./M16A4.png");
var groza = images.read("./GROZA.png");
var akm = images.read("./AKM.png");
var dp28 = images.read("./DP28.png");
var mini14 = images.read("./Mini14.png");
var s12k = images.read("./S12K.png");

var guns = [sacr, m416, m16a4, groza, akm, dp28, mini14, s12k];
var names= ["SCAR-L", "M416", "M16A4", "GROZA", "AKM", "DP-28", "Mini14", "S12K"];
var data = [[80, 3500, 1], [80, 3500, 1], [9, 300, 10], [90, 2700, 1], [125, 3500, 1], [110, 5700, 1], [12, 130, 20], [30, 300, 5]];

var lens = [1, 0.5, 0.3, 0.14, 0.1];
var len_ind = 0;

var image;
var hand;//手上的枪

var info = floaty.window(
<horizontal>
<text id="txt" w="300px" h="70px" size="20" bg="#77ffffff" textStyle="bold"></text>
<spinner h="70px" id="sp1" entries="不开镜|红点全息机瞄|二倍|四倍|八倍"/>
</horizontal>
);
info.setPosition(400, 50);

var window=floaty.window(
<frame>
<button id="main" w="40" h="40" text="B64" bg="#99000000" color="#ffffff"/>
</frame>
);
//记录按键被按下时的触摸坐标
var x = 0, y = 0;
//记录按键被按下时的悬浮窗位置
var windowX, windowY;
//记录按键被按下的时间以便判断长按等动作
var downTime;
window.main.setOnTouchListener(function(view, event){
switch(event.getAction()){
case event.ACTION_DOWN:
x = event.getRawX();
y = event.getRawY();
windowX = window.getX();
windowY = window.getY();
downTime = new Date().getTime();
return true;
case event.ACTION_MOVE:
//移动手指时调整悬浮窗位置
window.setPosition(windowX + (event.getRawX() - x),
windowY + (event.getRawY() - y));
return true;
case event.ACTION_UP:
//手指弹起时如果偏移很小则判断为点击
if(Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5){
//在这里处理所有点击
//如果按下的时间超过1秒判断为长按
if(new Date().getTime() - downTime > 1000){
//在这里处理长按
}else{
threads.start(function(){
//在这里处理短按
if(hand != -1){
for(let i = 0; i < data[hand][2]; i++){
gestures([0, data[hand][1], [1875, 750], [1875, 750]], [0, data[hand][1], [1200, 100], [1200, 100 + data[hand][0] / lens[len_ind]]]);
}
} else {
toast("未知武器");
}
});
}
}
return true;
}
return true;
});

while(notStopped()){
sleep(70);
var str = "";

var str_find = "未知武器"; image = images.captureScreen(); for(let i = 0; i < guns.length; i++){ var A = images.findImage(image, guns[i]); if(A){ var B = images.detectsColor(image, "#EACA13", A.x, A.y, 70); if(B){ str_find = names[i]; hand = i; } } } if(str_find == "未知武器"){ hand = -1; } str += str_find; len_ind = info.sp1.getSelectedItemPosition(); ui.run(function(){ info.txt.setText(str); });




// var storage = storages.create("3316538544@qq.com:微博")
// let ss= storage.get("抢热评_路径输入框","ss")
// //log(枚举方法(global.ui))
//枚举方法(global.log())
// let ls = engines.all()[1]
// let sc =ls.emit("夏季想")
// var x = parseInt(10); // 10
// log(typeof x)
// // let sc = engines.myEngine().source
// log(sc)
// for(let fr in ls){
//     log(fr)
// }
// log(engines.all())

/*
getClass
console.ts:136 [Extension Host] 19:33:44.038/D: wait
console.ts:136 [Extension Host] 19:33:44.038/D: getScriptable
console.ts:136 [Extension Host] 19:33:44.038/D: notifyAll
console.ts:136 [Extension Host] 19:33:44.038/D: getId
console.ts:136 [Extension Host] 19:33:44.038/D: source
console.ts:136 [Extension Host] 19:33:44.039/D: put
console.ts:136 [Extension Host] 19:33:44.039/D: notify
console.ts:136 [Extension Host] 19:33:44.039/D: setOnDestroyListener
console.ts:136 [Extension Host] 19:33:44.039/D: doExecution
console.ts:136 [Extension Host] 19:33:44.039/D: hashCode
console.ts:136 [Extension Host] 19:33:44.039/D: context
console.ts:136 [Extension Host] 19:33:44.039/D: setId
console.ts:136 [Extension Host] 19:33:44.039/D: setTag
console.ts:136 [Extension Host] 19:33:44.040/D: id
console.ts:136 [Extension Host] 19:33:44.040/D: tag
console.ts:136 [Extension Host] 19:33:44.040/D: getRuntime
console.ts:136 [Extension Host] 19:33:44.040/D: class
console.ts:136 [Extension Host] 19:33:44.040/D: forceStop
console.ts:136 [Extension Host] 19:33:44.040/D: enterContext
console.ts:136 [Extension Host] 19:33:44.040/D: init
console.ts:136 [Extension Host] 19:33:44.040/D: setRuntime
console.ts:136 [Extension Host] 19:33:44.041/D: isDestroyed
console.ts:136 [Extension Host] 19:33:44.041/D: destroy
console.ts:136 [Extension Host] 19:33:44.041/D: runtime
console.ts:136 [Extension Host] 19:33:44.041/D: thread
console.ts:136 [Extension Host] 19:33:44.041/D: getTag
console.ts:136 [Extension Host] 19:33:44.041/D: execute
console.ts:136 [Extension Host] 19:33:44.041/D: cwd
console.ts:136 [Extension Host] 19:33:44.041/D: getUncaughtException
console.ts:136 [Extension Host] 19:33:44.041/D: destroyed
console.ts:136 [Extension Host] 19:33:44.042/D: getSource
console.ts:136 [Extension Host] 19:33:44.042/D: equals
console.ts:136 [Extension Host] 19:33:44.042/D: getThread
console.ts:136 [Extension Host] 19:33:44.042/D: onDestroyListener
console.ts:136 [Extension Host] 19:33:44.042/D: toString
console.ts:136 [Extension Host] 19:33:44.042/D: uncaughtException
console.ts:136 [Extension Host] 19:33:44.042/D: emit
console.ts:136 [Extension Host] 19:33:44.042/D: getContext
console.ts:136 [Extension Host] 19:33:44.043/D: scriptable
*/