// 新建一个WebSocket
// auto.waitFor()

/**
 * 
 * 客户端需要实现的功能
 * 1.收到截图的消息,上传屏幕截图   capture
 * 2.收到点击消息,点击屏幕,这里统一使用press,长按   press
 * 3.收到滑动消息,滑动屏幕   gesture
 *    点击和滑动完成后,主动上传屏幕截图
 * 4.收到一段代码后,执行代码   script
 * 5.收到开始上传日志后,时时上传日志信息  startlog
 * 6.收到停止上传日志后,停止上传日志    endlog
 * 
 */



// 指定web socket的事件回调在当前线程（好处是没有多线程问题要处理，坏处是不能阻塞当前线程，包括死循环）
// 不加后面的参数则回调在IO线程
if (!requestScreenCapture()) {
    toast("请求截图失败");
    exit();
}
var status = storages.create("websocket")
status.put("status", "WebSocket未连接");

var g_script_pool = []
var uid
//脚本退出时执行
events.on("exit", function () {
    log("结束运行");
    ws.close(1000, null);

});
var up_log_flg = false // 是否上传日志




var ws = web.newWebSocket("ws://192.168.31.130:8001", {
    eventThread: 'this'
});


//监听所有脚本的日志输出
events.broadcast.on("console_log", function (info) {
    if (!up_log_flg) {//不上传直接return 
        return
    }
    //发送的日志信息  包括来自哪个脚本,产生的时间,日志级别,内容

    var log_info = null
    ws.send(JSON.stringify({code:"up_log",data:{log_info:log_info}}) )
});


// console.show();
// 监听他的各种事件
ws.on("open", (res, ws) => {
    log("WebSocket已连接");
    status.put("status", "WebSocket已连接");
    ws.send(JSON.stringify({ code: "admin", data: { "id": id } }))

}).on("failure", (err, res, ws) => {
    log("WebSocket连接失败");
    status.put("status", "WebSocket连接失败");
    events.broadcast.emit("websocket", "WebSocket连接失败");
}).on("closing", (code, reason, ws) => {
    log("WebSocket关闭中");
}).on("text", text_chuli)//收到文本消息
    .on("binary", bin_chuli)//收到二进制数据
    .on("closed", (code, reason, ws) => {
        log("WebSocket已关闭: code = %d, reason = %s", code, reason);
    });



/**
 * 接收到文本消息时 的处理函数
 * @param {*} text 
 * @param {*} ws 
 */
function text_chuli(text, ws) {
    console.info("收到文本消息: ", text);
    try {
        let msg = JSON.parse(text)
        let code = msg.code
        let data = msg.data
        log("MSG:" + code)
        log("data:" + data)
        if (code == "zc_ok") {
            log("UID"+data.uid)
            uid = data.uid
        } else if (code == "capture") {
            log("截图上传")
            let img = captureScreen();
            var datas = images.toBase64(img, "png", 100)
            ws.send(web.ByteString.decodeBase64(datas));
        } else if (code == "press") {//需要x,y,时间
            press(data.x, data.y, data, time)
        } else if (code == "gesture") {
            gesture(data.time, data.array)
        } else if (code == "script_start") {
            let script_info = {
                script_name: null,
                script_content: null,
                script_engines: null
            }
            script_info.script_name = data.name
            script_info.script_content = data.content
            try {
                script_info.script_engines = engines.execScript(script_info.script_name, script_info.script_content)
                // g_script_pool.push(script_info)
            } catch (error) {

            }
        } else if (code == "script_end") {
            let script_name = data.script_name
            let all_engines = engines.all()
            all_engines.forEach((script_obj) => {
                let name = files.getName(script_obj.source)
                // log(name)  //这里通过source 获取到的就是全路径,所以服务器上是全路径,传递下发的也是全路径
                if (script_obj.source == script_name) {
                    log("结束:" + script_name)
                    script_obj.forceStop()
                }
            })
            log("这里2")

        } else if (code == "get_all_engines") {
            g_script_pool = []
            let all_engines = engines.all()
            for (let engine of all_engines) {
                g_script_pool.push(engine.source)
            }
            let info_str = g_script_pool.join("|")
            log("发送所有引擎:" + info_str)
            all_engines = JSON.stringify({ "get_all_engines": info_str })
            ws.send(all_engines)
        } else if (code == "startlog") {
            up_log_flg = true
        } else if (code == "endlog") {
            up_log_flg = false
        }

    } catch (error) {

    }

}

/**
 * 接收到二进制消息时的处理函数
 * @param {*} bytes 
 * @param {*} ws 
 */
function bin_chuli(bytes, ws) {
    console.info("收到二进制消息:");
    // console.info("hex: ", bytes.hex());
    // console.info("base64: ", bytes.base64());
    console.info("md5: ", bytes.md5());
    console.info("size: ", bytes.size());
    // console.info("bytes: ", bytes.toByteArray());
    if (bytes.size() > 100) {
        var img = images.fromBase64(bytes.base64())
        images.save(img, "/sdcard/360/123.png")
        log("传递完毕")
        app.viewFile("/sdcard/360/123.png");
    } else {
        log("图片大小异常")
    }

}

/**
 * 
 * @param {*} path bytes是已经编码过的
 * @param {*} ws 
 */
function send_bin(path, ws) {
    if (!files.exists(path)) {
        return false
    }
    var img = images.read(path)
    //data 是已经编码过的base64数据
    var data = images.toBase64(img, "png", 100)
    img.recycle()
    if (data) {
        var msg = web.ByteString.decodeBase64("5piO5aSp5L2g6IO96ICDMTAw5YiG44CC")
        ws.send(msg)
    } else {
        log(path + "数据为空")
    }

}


// setTimeout(() => { //发送截图消息
//     log("发送消息: get img");//c0f7d5c0-07a4-11ea-aef1-51a53f1ac020
//     var msg = { code: "getimg", data:{uid:uid,target_uid:"c75ba180-07a9-11ea-87aa-0f3c22c0d746"}}
//     msg = JSON.stringify(msg)
//     log("发送getImg 消息")
//     ws.send(msg);
// }, 3000)

setTimeout(() => { //发送截图消息
    log("发送消息: 获取所有设备信息");//c0f7d5c0-07a4-11ea-aef1-51a53f1ac020
    var msg = { code: "get_all_device", data:{uid:uid}}
    msg = JSON.stringify(msg)
    log("发送getImg 消息")
    ws.send(msg);
}, 2000)
function test() {


    // 发送文本消息
    setTimeout(() => {
        log("发送消息: Hello, WebSocket!");
        var msg = { code: "code", msg: "Hello, WebSocket!" }
        msg = JSON.stringify(msg)
        log(typeof msg)
        // ws.send(msg);
    }, 1000)

    //发送获取图片的消息
    log("发送获取图片的消息")
    var msg = { code: "getimg" }
    msg = JSON.stringify(msg)
    log(typeof msg)
    ws.send(msg)

}
// 两秒后发送二进制消息
// setTimeout(() => {

//    log("发送二进制消息: 5piO5aSp5L2g6IO96ICDMTAw5YiG44CC");
//    var msg = web.ByteString.decodeBase64("5piO5aSp5L2g6IO96ICDMTAw5YiG44CC")
//    ws.send(msg);
// }, 2000);


// 4秒后发送二进制消息 图片
// setTimeout(() => {

//     log("截图上传")
//     let img= captureScreen();
//     var data = images.toBase64(img,"png",100)
//     ws.send(web.ByteString.decodeBase64(data));
// }, 4000);

// 8秒后断开WebSocket
// setTimeout(() => {

//     log("断开WebSocket");
//     // 1000表示正常关闭
//     // ws.close(1000, null);
// }, 8000);
// setTimeout(() => {
//     log("退出程序");
//     console.hide()
// }, 12000)
// for (var key in ws) {
//        log(ws[key].toString())
// }
// exit()
var id = device.getAndroidId()
setInterval(() => {
    // log("心跳")
    ws.send(JSON.stringify({code:"xt",data:{"uid":uid}}))
}, 2000)

