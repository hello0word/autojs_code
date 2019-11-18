auto.waitFor()
var i=0
// while(true){
//     events.broadcast.emit("websocket", i);
//     i++
// }
//日志的组成:  使用|分割,分别是特殊标记:~#@,自己的脚本source,产生的时间,级别,内容字符串
//~#@|[remote]test1.js|1573802369934|log|你好啊
// log(engines.myEngine().source);
var my_source = engines.myEngine().source
sendlog = function(info){
    if (typeof info =="object") {
        info = JSON.stringify(info)
    }
    events.broadcast.emit("websocket", my_source+"|"+new Date().getTime()+"|log|"+info);

}


var a= []
var b = {
    name:"wocao",
    bbb:0
    

}

a.push(b)
b.add=function(){
    this.bbb+=1
}
b.add()
log(a[0])


