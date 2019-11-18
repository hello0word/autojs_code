//持续检测连接是否断掉,断掉则重启引擎

var storage  =storages.create("websocket")
storage.put("status","WebSocket连接失败")
var websocketstatus // websocket状态
/**
 * WebSocket已连接
 * WebSocket连接失败
 * WebSocket关闭中
 * WebSocket已关闭
 */
events.broadcast.on("websocket", function(info){
    
   if (info == "WebSocket连接失败") {
        log("重启连接")
        yinqing ? yinqing.getEngine().forceStop() : null
        yinqing= engines.execScriptFile("./autojs_client.js")
   }
    

});


var yinqing=null

while(true){
    websocketstatus = storage.get("status","WebSocket连接失败")
    if (websocketstatus == "WebSocket连接失败") {
        log("重启连接")
        yinqing ? yinqing.getEngine().forceStop() : null
        yinqing= engines.execScriptFile("./autojs_client.js")
        sleep(5000)
    }else if (websocketstatus == "WebSocket已连接"){
        log("WebSocket已连接")
        // log(engines.all());
    }else{
        log("状态未知")
    }
    sleep(5000)
}

