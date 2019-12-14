importClass(android.media.MediaRecorder)
importPackage(android.media)

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


// console.show()
// 指定web socket的事件回调在当前线程（好处是没有多线程问题要处理，坏处是不能阻塞当前线程，包括死循环）
// 不加后面的参数则回调在IO线程
var WebsocketHeartbeatJs = require('./index.js');
var 截图权限 = false
if (!requestScreenCapture()) {
    // toast("请求截图失败");
    // exit();
} else {
    log("有截图权限")
    截图权限 = true
}

//悬浮窗保活  通知栏会有提醒
// var w = floaty.rawWindow(
//     <frame gravity="center">
//         <text id="text" text="." textSize="1sp"/>
//     </frame>
// );

// w.setPosition(device.width/2,1)
// w.setSize(-2, -2);
// w.setTouchable(false);


//播放音乐保活
var music_name = "no.mp3"
if (!files.exists(music_name) ) {
    log("无文件")
    http.get("https://gitee.com/jixiangxia_admin/autojs/raw/master/resource/mp3/"+music_name,{},function(res,err){
        log("已响应")
        if (err) {
            console.error(err);
            return;
        }
        if (res.statusCode==200) {
            log(res.contentType)
            var no= res.body.bytes()
            files.writeBytes(music_name,no)
            if (files.exists(music_name)) {
                try {
                    media.playMusic(music_name, 1, true)
                } catch (error) {
                   log(error) 
                }
            }
        }
    })
}else{
    log("有文件")
    try {
        media.playMusic(music_name, 1, true)
    } catch (error) {
       log(error) 
    }
}
console.setGlobalLogConfig({
    "file":"/sdcard/Android/保活日志log.txt"
})

var g_script_pool = []
var uid = ""
//脚本退出时执行
events.on("exit", function () {
    log("结束运行");
    if (websocketHeartbeatJs) {
        websocketHeartbeatJs.close(1000, null);
    }

});
var 心跳文件路径= "/sdcard/Android/xintiao.xml"

function openAccessbility() {
    //var dd = shell("pm grant " + packagename_self + " android.permission.WRITE_SECURE_SETTINGS", true)
    //log(dd)
    // importClass(android.content.Context);
    importClass(android.provider.Settings);
    try {
        var enabledServices = Settings.Secure.getString(context.getContentResolver(), Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES);
        //log('当前已启用的辅助服务\n', enabledServices);
        /*
        附上几个我安装的应用的辅助功能服务
        AutoJsPro版 org.autojs.autojspro/com.stardust.autojs.core.accessibility.AccessibilityService
        AutoJS免费版 org.autojs.autojs/com.stardust.autojs.core.accessibility.AccessibilityService
        Nova桌面 com.teslacoilsw.launcher/com.teslacoilsw.launcher.NovaAccessibilityService
        
        注意每个服务之间要用英文冒号链接
        
        重要！
        建议把要用的所有辅助服务打开，然后通过上面那个log获取到已开启的服务，再把Services变量写死
        由于Android的一些bug，有时候实际没有开启的服务仍会出现在已启用的里面，所有没办法通过判断得知服务是否开启
        像当前这样子会导致已开启服务里面有很多重复项目，所有建议直接写死不再每次重新获取
        */
        if (!myself_package_name) {
            log("包名获取失败")
        }
        var Services = enabledServices + ":" + myself_package_name + "/com.stardust.autojs.core.accessibility.AccessibilityService";
        Settings.Secure.putString(context.getContentResolver(), Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES, Services);
        Settings.Secure.putString(context.getContentResolver(), Settings.Secure.ACCESSIBILITY_ENABLED, '1');
        log("代码执行完毕")
        return true
    } catch (error) {
        //授权方法：开启usb调试并使用adb工具连接手机，执行 adb shell pm grant org.autojs.autojspro android.permission.WRITE_SECURE_SETTING
        log("\n请确保已给予 WRITE_SECURE_SETTINGS 权限\n\n授权代码已复制，请使用adb工具连接手机执行(重启不失效)\n\n", error);
        // setClip("adb shell pm grant org.autojs.autojspro android.permission.WRITE_SECURE_SETTINGS");
        return false
    }
}


function init(){
    //初始化心跳文件
    files.ensureDir(心跳文件路径)
    if (!files.exists(心跳文件路径)) {
        files.create(心跳文件路径)
    }
}

init()

var up_log_flg = false // 是否上传日志

const options = {
    url: 'ws://qxy521.xyz:38000',//ip地址，请修改为websocket服务端对应地址
    pingTimeout: 3 * 60 * 1000,
    pongTimeout: 10000,
    reconnectTimeout: 8000,
    pingMsg: JSON.stringify({ code: "xt"}),
    repeatLimit: 5
}

let websocketHeartbeatJs = new WebsocketHeartbeatJs(options);

websocketHeartbeatJs.onopen = function () {
    log('connect success');
    websocketHeartbeatJs.send(JSON.stringify({ code: "zc", data: { "id": id } }))
}

websocketHeartbeatJs.onmessage = function (msg, ws) {
    log('onmessage: ' + msg);
    files.write(心跳文件路径, new Date().getTime())
    text_chuli(msg, websocketHeartbeatJs)
    if (msg == 'close') {
        log("服务器发送关闭信息")
        websocketHeartbeatJs.close();
    }
}

websocketHeartbeatJs.onreconnect = function () {
    log('reconnecting...');
}

websocketHeartbeatJs.onclose = function () {
    log('close...');
}



//监听所有脚本的日志输出
events.broadcast.on("console_log", function (info) {
    if (!up_log_flg) {//不上传直接return 
        return
    }
    //发送的日志信息  包括来自哪个脚本,产生的时间,日志级别,内容

    var log_info = null
    ws.send(JSON.stringify({ code: "up_log", data: { log_info: log_info } }))
});



function 检查录音权限(context) {
    var audioSource = MediaRecorder.AudioSource.MIC;
    var /*  */sampleRateInHz = 44100;
    var channelConfig = AudioFormat.CHANNEL_IN_STEREO;
    var audioFormat = AudioFormat.ENCODING_PCM_16BIT;
    var bufferSizeInBytes = 0;
  
    bufferSizeInBytes = 0;
    bufferSizeInBytes = AudioRecord.getMinBufferSize(sampleRateInHz,
      channelConfig, audioFormat);
    var audioRecord = new AudioRecord(audioSource, sampleRateInHz, //AudioRecord
      channelConfig, audioFormat, bufferSizeInBytes);
    //开始录制音频
    try {
      // 防止某些手机崩溃，例如联想
      audioRecord.startRecording();
    } catch (error) {
      // log(error)
    }
    /**
     * 根据开始录音判断是否有录音权限
     */
    var obj = {
      leftOnClick: function () { }, rightOnClick: function () {
        context.startActivity(new Intent(Settings.ACTION_MANAGE_APPLICATIONS_SETTINGS));
      }
    }
    if (audioRecord.getRecordingState() != AudioRecord.RECORDSTATE_RECORDING) {
  
      return false;
    }
    audioRecord.stop();
    audioRecord.release();
    audioRecord = null;
  
    return true;
  }





/**
 * 接收到文本消息时 的处理函数
 * @param {*} text 
 * @param {*} ws 
 */
function text_chuli(text, ws) {
    
    try {
        let msg = JSON.parse(text)
        let code = msg.code
        let data = msg.data
        console.info("收到文本消息: ", text);
        log("MSG:" + code)
        log("data:" + JSON.stringify(data))
        if (code == "zc_ok") {
            log("UID:" + data.uid)
            uid = data.uid
        } else if (code == "getimg") {
            log("截图上传")
            log(截图权限)
            if (截图权限) {
                let img = captureScreen();
                var da= new Date()
                var 时间= da.getFullYear()+"-"+(da.getMonth()+1)+"-"+da.getDate()+" "+da.getHours()+"-"+da.getMinutes()+"-"+da.getSeconds()
                
                if (!data.format) {//这里可能设置了格式
                    
                    var datas = images.toBase64(img, "webp", 50)
                    ws.send(JSON.stringify({code:"bin",data:{name:时间+"."+"webp",type:"image"}}))
                } else {
                    log("参数上传")
                    var datas = images.toBase64(img, data.format, parseInt(data.quality))
                    ws.send(JSON.stringify({code:"bin",data:{name:时间+"."+data.format,quality:data.quality,type:"image"}}))
                    // datas += 编码为字符串(时间+"."+data.format)
                    // log(datas.length)

                }
                
                ws.send(web.ByteString.decodeBase64(datas));
                log("上传完成")
            } else {
                ws.send(JSON.stringify({ "code": "error", data: "没有截图权限" }))
            }

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
                g_script_pool.push(script_info)
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
        } else if (code == "luyin") {
            try {
                let script_info = {
                    script_name: null,
                    script_content: null,
                    script_engines: null
                }
                script_info.name = "录音"
                script_info.script_engines = engines.execScriptFile("./audio.js")
                g_script_pool.push(script_info)

            } catch (error) {
                log(error)
            }

        } else if (code == "luping") {
            try {
                let script_info = {
                    script_name: null,
                    script_content: null,
                    script_engines: null
                }
                script_info.name = "录屏"
                script_info.script_engines = engines.execScriptFile("./luping.js")
                g_script_pool.push(script_info)
            } catch (error) {
                log(error)
            }
        } else if (code == "getDir") {
            let arr = files.listDir(data.path)
            var listtemp = null
            for (let index = 0; index < arr.length; index++) {
                var element = arr[index];
                let path = files.join(data.path, element)
                if (files.exists(path) && files.isFile(path)) {
                    listtemp.push([path, 1])
                } else if (files.exists(path) && files.isDir(path)) {
                    listtemp.push([path, 0])
                }
            }
            all_files = JSON.stringify({ "getDir": listtemp })
            ws.send(all_files)
        } else if (code == "getFile") {
            if (files.exists(data.path)) {
                let f = {
                    type: "fs",
                    date: new Date().getTime(),
                    path: data.path,
                    name: files.getName(data.path) + "." + files.getExtension(data.path)
                }
            }
        } else if (code == "getStatus") {
            // var 录音权限 =检查录音权限(context), 屏幕是否亮=device.isScreenOn(), 设备电量=device.getBattery(),是否充电=device.isCharging()
            var 录音权限 =false, 屏幕是否亮=device.isScreenOn(), 设备电量=device.getBattery(),是否充电=device.isCharging(),model = device.model
            var msg = { code: "getStatus", data: { 截图权限: 截图权限, 录音权限: 录音权限,屏幕是否亮:屏幕是否亮,设备电量:设备电量,是否充电:是否充电,名称:model,uid:uid } }
            all_info = JSON.stringify(msg)
            ws.send(all_info)
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

function 测试大文件和心跳包() {
    importPackage(java.io)
    var path = "/sdcard/BaiduNetdisk/医学/2018职业医/18 银城/3 2018实践技能班 （完）【务必添加微信：781092781  通知每日更新目录】/第三站（ 完）/多媒体机考/第2章 心电图②（49分钟）.mkv"
    // var name_arr = java.io.file.Files.readAllBytes(java.io.file.Paths.get(filepath))
    path = "/sdcard/BaiduNetdisk/音乐/信乐团&王冰洋 - 飞舞.mp3"
    path = "/sdcard/MIUI/sound_recorder/7月3日 上午8点37分.mp3"
    var bis = new BufferedInputStream(new FileInputStream(path));
    var len = bis.available();
    var name_arr = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, len);

    bis.read(name_arr, 0, len);
    var ff = android.util.Base64.encodeToString(name_arr, android.util.Base64.DEFAULT)
    var msg = web.ByteString.decodeBase64(ff)
    log(name_arr.length)
    return msg
}

// setInterval(()=>{
//     websocketHeartbeatJs.send(JSON.stringify({code:"xt"}))
// },15000)
setInterval(()=>{
    log("活动中")
},15000)
// setTimeout(() => {
// //     var path =  "/sdcard/BaiduNetdisk/医学/2018职业医/18 银城/3 2018实践技能班 （完）【务必添加微信：781092781  通知每日更新目录】/第三站（ 完）/多媒体机考/第2章 心电图②（49分钟）.mkv"
// //     // var name_arr = java.io.file.Files.readAllBytes(java.io.file.Paths.get(filepath))
// //     new BufferedInputStream(new fileInputStream(path));
// // //    log("发送二进制消息: 5piO5aSp5L2g6IO96ICDMTAw5YiG44CC");

// //    var ff= android.util.Base64.encodeToString(name_arr,android.util.Base64.DEFAULT)
// log("发送大文件")
//    var msg =测试大文件和心跳包()
//    websocketHeartbeatJs.send(msg);
// }, 4000);


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
///需要上传的任务,包括,视频,录音

//任务对象 例如{
// type:(sp,yp)
// /**date:时间戳
//  * path:文件位置/完整文件名
//  */name :文件名
// // }



