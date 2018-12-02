auto.waitFor();
var path = "https://gitee.com/jixiangxia/autojs/raw/master/%E6%8E%A2%E6%8E%A2/%E6%8E%A2%E6%8E%A2%E8%84%9A%E6%9C%AC.js";
var file = http.get(path);
var scr;
if (file.statusCode==200) {
    scr= file.body.string();
}else{
    toastLog("网络错误");
    exit();
}

var window = floaty.window(
    <frame>
        <button id="action" text="开始运行" w="90" h="40" bg="#FF1493"/>
    </frame>
);

window.exitOnClose();

var execution = null;

window.action.click(()=>{
    if(window.action.getText() == '开始运行'){
        execution = engines.execScript("探探",scr);
        window.action.setText('停止运行');
    }else{
        if(execution){
            execution.getEngine().forceStop();
        }
        window.action.setText('开始运行');
    }
});

window.action.longClick(()=>{
   window.setAdjustEnabled(!window.isAdjustEnabled());
   return true;
});

setInterval(()=>{}, 1000);
