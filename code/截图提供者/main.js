if (!requestScreenCapture()) {
    toastLog("请求截图失败");
    exit()
}
// log()
importClass(android.content.Intent)
requiresAutojsVersion(8000001);
IntentFilter = android.content.IntentFilter;

let receiver = new BroadcastReceiver(function (ctx, intent) {
    let path = intent.getStringExtra("path");
    let type = intent.getStringExtra("type");
    if (type == "img") {
        var intent = new Intent();
        intent.setAction("captureok");
        if (path) {
            captureScreen(path)
            log("已保存到:" + path)
            intent.putExtra("path",path );
        } else {
            captureScreen("/sdcard/current.png")
            log("保存到:/sdcard/current.png")
            intent.putExtra("path","/sdcard/current.png" );
        }
        context.sendBroadcast(intent);
    } else if (type == "base64") {
        let img = base
    }

});
let action = "getcapture";
context.registerReceiver(receiver, new IntentFilter(action));

events.on("exit", () => {
    context.unregisterReceiver(receiver);
});

setInterval(() => {

}, 5000)