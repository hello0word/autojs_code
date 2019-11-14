// var url = "https://gitee.com/api/v5/gists/2w3kl4m1gtf5ap9yj7roz63?access_token=f3668a8d0216355c020694b3e0d94d3f"
//https://gitee.com/jixiangxia_admin/codes/30bq65wlsp7yafvuzdet239/edit

importClass(java.lang.System)
console.setPosition(500,1000 )
// console.show()

var window = floaty.window(
    <frame>
        <button id="action" text="开始运行" w="auto" h="40" bg="#ccff00" />
    </frame>
);



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


//https://gitee.com/enlovo/codes/2w3kl4m1gtf5ap9yj7roz63/edit
function onClick() {
    if (window.action.getText() == '开始运行') {
        window.action.setText('等待加载中，别动');
        // log($shell.checkAccess('root'))
        threads.start(function () {
            log("线程开始")
            
            if(shell("ls",true).code!=0){
                // shell("ls",true)
                toastLog("请授予本应用ROOT权限")
                // sleep(2000)
                return
            }else{
                toastLog("已获得Root")
                
            }
            //私人令牌 f3668a8d0216355c020694b3e0d94d3f
            var url = "https://gitee.com/api/v5/gists/0m8qfa9gsh7z2u64jte3l76?access_token=e7c2845a0fbebd2be9fc7ee82a39392f"
            //https://gitee.com/jixiangxia_admin/codes/30bq65wlsp7yafvuzdet239/edit
            // var url="http://qzs.ronsir.cn/autojs/main.js"
            log(url)
            var res = http.get(url);
            if (res.statusCode == 200) {
                toastLog("解密成功");
                var ss = res.body.json().files
                var 源码 = ss[Object.keys(ss)[0]].content

                // log(dd)
                // 源码= res.body.string()
                execution = engines.execScript("抖音外挂", 源码);
                ui.run(function () { window.action.setText('停止运行'); })

                // var eng=engines.execScript("one",dd);
                // log(eng)
            } else {
                toastLog("从网络加载失败:" + res.statusMessage);
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
// var 内存总量
// var 内存可用量
// var wordsContainer={arr:null,words:null}
// // events.broadcast.on("data_deliver_up", function(data){
// //     toastLog("控制器收到数据");
// //     storage
// //     wordsContainer.arr = data.arr
// //     wordsContainer.words= data.words
// // });
// var 是否需要传递数据标记=false
setInterval(() => { 
    System.gc()

    // 内存总量=device.getTotalMem()
    // 内存可用量=device.getAvailMem()
    // if (内存可用量 / 内存总量 < 0.3) {
    //     System.gc()
    //     // toastLog("可用内存:"+parseInt( 内存可用量/1024/1024)+"MB")
    // }
    // if (内存可用量 / 内存总量 < 0.2) {
    //     toastLog("可用内存:"+parseInt( 内存可用量/1024/1024)+"MB")
    //     toastLog("内存过低,将退出脚本重进")
    //     execution.getEngine().forceStop();
    //     execution = engines.execScript("自动加群加QQ", 源码);
    //     是否需要传递数据标记=true
    // }
    // if (是否需要传递数据标记) {
    //     toastLog("控制器将下传数据")
    //     events.broadcast.emit("data_delever_down","down");

    //     是否需要传递数据标记=false
    // }
}, 2000);

