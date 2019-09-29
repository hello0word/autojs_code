var path = "./的士联盟.js";
auto.waitFor()
floaty.requestPermission()
// console.show();
if(!files.exists(path)){
    toast("脚本文件不存在: " + path);
    exit();
}
var window = floaty.window(
    <frame>
        <horizontal>
        <button id="action" text="开始运行" w="90" h="40" bg="#FF3030"/>
        <button id="set_juli" text="设置距离" w="90" h="40" bg="#87CEEB"/>
  
        </horizontal>
          </frame>
);

setInterval(()=>{}, 1000);

var execution = null;

//记录按键被按下时的触摸坐标
var x = 0, y = 0;
//记录按键被按下时的悬浮窗位置
var windowX, windowY;
//记录按键被按下的时间以便判断长按等动作
var downTime;

window.action.setOnTouchListener(function(view, event){
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
            //如果按下的时间超过1.5秒判断为长按，退出脚本
            if(new Date().getTime() - downTime > 1500){
                exit();
            }
            return true;
        case event.ACTION_UP:
            //手指弹起时如果偏移很小则判断为点击
            if(Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5){
                onClick();
            }
            return true;
    }
    return true;
});

function onClick(){
    if(window.action.getText() == '开始运行'){
        execution = engines.execScriptFile(path);
        window.action.setText('停止运行');
    }else{
        if(execution){
            execution.getEngine().forceStop();
        }
        window.action.setText('开始运行');
    }
}
window.set_juli.setOnTouchListener(function(view, event){
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
            //如果按下的时间超过1.5秒判断为长按，退出脚本
            if(new Date().getTime() - downTime > 1500){
                exit();
            }
            return true;
        case event.ACTION_UP:
            //手指弹起时如果偏移很小则判断为点击
            if(Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5){
                onClick_juli();
            }
            return true;
    }
    return true;
});

function onClick_juli(params) {
    
    var config_all=dialogs.rawInput("请输入公里数","",function(juli){
        var storage=storages.create("quanwudi")
        storage.put("juli",juli)
        log(juli)
    });
    
    
}

