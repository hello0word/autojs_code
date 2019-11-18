// auto.waitFor()
var i = 0
events.broadcast.on("websocket", function(name){
    
        log( name);
        
    
});
//保持脚本运行
setInterval(()=>{}, 1000);
// 不加后面的参数则回调在IO线程
if (!requestScreenCapture()) {
    toast("请求截图失败");
    exit();
}
sleep(1000)
let img = captureScreen();
var datas = images.toBase64(img, "webp", 1)
log(datas.length)
var datas = images.toBase64(img, "webp", 100)
log(datas.length)

//"5piO5aSp5L2g6IO96ICDMTAw5YiG44CC"
// for(let a in web.ByteString){
//     log(a)
// }

// var a= web.ByteString.decodeBase64("5piO5aSp5L2g6IO96ICDMTAw5YiG44CC")
// log(a)
// //("[text=明天你能考100分。]")
// var b = web.ByteString.encodeUtf8("[text=明天你能考100分。]")
// for(var e in b ){
//     log(e)
// }
// log(b)
// var c = web.ByteString.decodeBase64(b)

// log(b)
// log(c)

var g_engines_all = function(){
    var all_info =[]
    this.push = function(element){
        all_info.push(element)

    }
    this.toString = function(){
        var tmp 
        all_info.forEach((engine)=>{

        })

    }
}

// let a=[{bb:1,cc:2},{wo:function(){},ni:function(){}}]
// var data= {a:1,b:{c:"3"}}
// var ee=JSON.stringify(data)
// var ff= JSON.parse(ee)
// log(ff.b.c)