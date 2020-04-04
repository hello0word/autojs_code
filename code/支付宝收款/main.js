
auto.waitFor()
var 当前余额 = 0
var window = floaty.window(
    <frame>
        <horizontal>
            <button id="action" text="开始运行" w="auto" h="40" bg="#77EE0000" />
            <button id="识别余额" text={"当前余额:" + 当前余额} w="auto" h="40" bg="#77ffffff" />
        </horizontal>
        
    </frame>
);

events.on("余额", function (余额) {
    // log("收到消息")
    当前余额 = 余额;
    ui.run(()=>{
        window.识别余额.setText("当前余额:" + 当前余额)
        // log("设置完成:" + 当前余额)
    })
});

setInterval(() => { }, 1000);




var execution = null;

//记录按键被按下时的触摸坐标
var x = 0,
    y = 0;
//记录按键被按下时的悬浮窗位置
var windowX, windowY;
//记录按键被按下的时间以便判断长按等动作
var downTime;

window.action.setOnTouchListener(function (view, event) {
    switch (event.getAction()) {
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
            if (new Date().getTime() - downTime > 1500) {
                exit();
            }
            return true;
        case event.ACTION_UP:
            //手指弹起时如果偏移很小则判断为点击
            if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                onClick();
            }
            return true;
    }
    return true;
});
function onClick() {
    if (window.action.getText() == '开始运行') {
        window.action.setText('等待加载中，别动');
        threads.start(function () {
            var url = "https://gitee.com/jixiangxia_admin/autojs/raw/master/code/%E6%94%AF%E4%BB%98%E5%AE%9D%E6%94%B6%E6%AC%BE/%E6%94%AF%E4%BB%98%E5%AE%9D.js"
            var res = http.get(url);
            if (res.statusCode == 200) {
                toast("从网络加载成功");
                var dd = res.body.string()
                execution = engines.execScript("jb", dd);
                ui.run(function () { window.action.setText('停止运行'); })

                
            } else {
                toast("从网络加载失败:" + res.statusMessage);
            }
        })

        //execution = engines.execScriptFile(path);
        //window.action.setText('停止运行');
    } else {
        if (execution) {
            execution.getEngine().forceStop();
        }
        window.action.setText('开始运行');
    }
}