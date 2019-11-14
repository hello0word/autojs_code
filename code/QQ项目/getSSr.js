var host="http://39.108.95.115:8077/getfree"


var window = floaty.window(
    <frame>
        <horizontal>
            <button id="action" text="获得新的" w="auto" h="40" bg="#30ff00" />
            <button id="next" text="设置一个" w="auto" h="40" bg="#30ff88" />

        </horizontal>
        
    </frame>
);

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
window.next.setOnTouchListener(function (view, event) {
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
                onClickNext();
            }
            return true;
    }
    return true;
});
var temp=[]
//https://gitee.com/enlovo/codes/2w3kl4m1gtf5ap9yj7roz63/edit
function onClick() {
    if (window.action.getText() == '获得新的') {
        window.action.setText('等待加载中，别动');
        threads.start(function () {
            //私人令牌 f3668a8d0216355c020694b3e0d94d3f
            var url =host
            var res = http.get(url);
            if (res.statusCode == 200) {
                toast("从网络加载成功");
                temp = res.body.json().sss
                ui.run(()=>{
                    window.action.setText('获得新的');
                })
                log(temp)

                // var eng=engines.execScript("one",dd);
                // log(eng)
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
        window.action.setText('获得新的');
    }
}

function onClickNext(params) {
    var dd=temp.pop()
    if (dd) {
        setClip(dd)
        toast("设置成功")
    }else{
        toast("已用完,正在重新加载")
        onClick()
    }
    
    
}