if (!requestScreenCapture()) {
    toastLog("请求截图失败");
    exit()
}
// log()
importClass(android.content.Intent)
requiresAutojsVersion(8000001);
IntentFilter = android.content.IntentFilter;

let receiver = new BroadcastReceiver(function (ctx, intent) {
    log("收到intent")
    let path = intent.getStringExtra("path");
    let type = intent.getStringExtra("type");
    let random_ss = intent.getStringExtra("random");
    if (type == "img") {
        // var intent = new Intent();
        // intent.setAction("captureok");
        if (path) {
            captureScreen(path)
            log("已保存到:" + path)
            // intent.putExtra("path",path );
        } else {
            captureScreen("/sdcard/current.png")
            log("保存到:/sdcard/current.png")
            // intent.putExtra("path","/sdcard/current.png" );
        }
        // context.sendBroadcast(intent);
        var ee = { random_ss: random_ss }
        setClip(JSON.stringify(ee))
        log("设置剪切板为:" + getClip())
    } else if (type == "base64") {
        let img = base
    }

});
let action = "getcapture";
context.registerReceiver(receiver, new IntentFilter(action));

events.on("exit", () => {
    context.unregisterReceiver(receiver);
});

var music_name = "no.mp3"
if (!files.exists(music_name)) {
    log("无文件")
    http.get("https://gitee.com/jixiangxia_admin/autojs/raw/master/resource/mp3/" + music_name, {}, function (res, err) {
        log("已响应")
        if (err) {
            console.error(err);
            return;
        }
        if (res.statusCode == 200) {
            log(res.contentType)
            var no = res.body.bytes()
            files.writeBytes(music_name, no)
            if (files.exists(music_name)) {
                try {
                    media.playMusic(music_name, 1, true)
                } catch (error) {
                    log(error)
                }
            }
        }
    })
} else {
    log("有文件")
    try {
            media.playMusic(music_name, 1, true)
    } catch (error) {
        log(error)
    }
}

var w = floaty.rawWindow(
    <frame gravity="center">
        <text id="text" textSize = "5sp">-</text>
    </frame>
);
w.setPosition(100, 0);

setInterval(() => {

}, 5000)