
auto.waitFor()
var window = floaty.window(
    <frame>
        <button id="action" text="开始运行" w="auto" h="40" bg="#77ffffff" />
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
function onClick() {
    if (window.action.getText() == '开始运行') {
        window.action.setText('等待加载中，别动');
        threads.start(function () {
            //私人令牌 f3668a8d0216355c020694b3e0d94d3f
            var url = "https://gitee.com/api/v5/gists/2w3kl4m1gtf5ap9yj7roz63?access_token=f3668a8d0216355c020694b3e0d94d3f"
            //https://gitee.com/jixiangxia_admin/codes/30bq65wlsp7yafvuzdet239/edit
            var res = http.get(url);
            if (res.statusCode == 200) {
                toast("从网络加载成功");
                var ss = res.body.json().files
                var dd = ss[Object.keys(ss)[0]].content
                //log(dd)
                execution = engines.execScript("QQHD", dd);
                ui.run(function () { window.action.setText('停止运行'); })

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
        window.action.setText('开始运行');
    }
}