/**
 * 需要引入的文件东西
 */

AudioTrack.waitFor()
var my_source = engines.myEngine().source
sendlog = function(info){
    if (typeof info =="object") {
        info = JSON.stringify(info)
    }
    events.broadcast.emit("websocket", my_source+"|"+new Date().getTime()+"|log|"+info);

}