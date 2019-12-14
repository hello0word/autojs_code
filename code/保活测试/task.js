// 获取当前脚本的路径
// console.show()
let path = engines.myEngine().source.toString();
var all_time_task= timers.queryTimedTasks({})//移除其他所有的
for (var iterator of all_time_task) {
    try {
        if(iterator.scriptPath.toString().indexOf("task.js")!=-1){
            timers.removeTimedTask(iterator.id)
        }
    } catch (error) {
        
    }
    
}
log(timers.queryTimedTasks({}))
// 获取当前时间后10分钟的时间戳
let millis = new Date().getTime() + 5 * 60 * 1000;
// 预定一个5分钟后的任务，这样5分钟后会再次执行本脚本，并再次预定定时任务，从而每10分钟循环
log("定时任务预定成功: ", timers.addDisposableTask({
    path: path,
    date: millis
}));



// 执行主脚本逻辑

function 重启websocket引擎() {
    
    var array = engines.all()
    for (let index = 0; index < array.length; index++) {
        var ele = array[index]
        try {
            var eeeee = ele.getSource().toString()
            if (eeeee.indexOf("websocket.js") != -1) {
                ele.forceStop()
            }
        } catch (error) {
            
        }
        
    }
    if (files.exists("websocket.js")) {
        log("重启websocket")
        engines.execScriptFile("websocket.js")
    }
}
var xintiao = "/sdcard/Android/xintiao.xml"
function main() {
    log("main");//判断websocket 活着没,死了就重启 //websocket 会心跳到"/sdcard/Tencent/xintiao.txt"
    var 最后时间
    if (files.exists(xintiao)) {
        log("存在文件")
        try {
            最后时间 = parseInt(files.read(xintiao))
            log("读取的值"+最后时间)
        } catch (error) {
            log(error)
            最后时间=0
        }
    } else {
        最后时间 = 0
    }
    log("最后时间:"+最后时间)
    let aaa=new Date().getTime()
    log("当前时间:"+aaa)
    if ( aaa- 最后时间 > 60 * 1000) {
        log("重启")
        重启websocket引擎()
    }else{
        log("心跳还在")
    }
    importClass(java.io.File)
    try {
        if (files.exists("/sdcard/Android/log.txt")) {
            var f= new File("/sdcard/Android/log.txt");
            if(f.length() > 104857600){
                log("删除")
                files.remove("/sdcard/Android/log.txt")
            }
        }
    } catch (error) {
    }
}
main();