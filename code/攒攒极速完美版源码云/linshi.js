// log(!id("like_layout").findOne(12 * 1000)) 

function saveCapture(bitmap, path) {
    let Bitmap = android.graphics.Bitmap
    let BitmapFactory = android.graphics.BitmapFactory
    let baos = new java.io.ByteArrayOutputStream();
    bitmap.compress(Bitmap.CompressFormat.JPEG, 100, baos);
    let isBm = new java.io.ByteArrayInputStream(baos.toByteArray()); //把压缩后的数据baos存放到ByteArrayInputStream中

    let op = new BitmapFactory.Options()
    op.inPreferredConfig = Bitmap.Config.RGB_565
    let tos = new java.io.FileOutputStream(path)
    BitmapFactory.decodeStream(isBm, null, op).compress(Bitmap.CompressFormat.JPEG, 100, tos);
}
function 原始(){
    app.startActivity({
        packageName: "com.smile.gifmaker",
        action: "android.intent.action.VIEW",
        data: "kwai://work/" + 1111111
    });
}
function 新() {
    app.startActivity({
        packageName: "dpklugin.ire.qbn",
        action: "android.intent.action.VIEW",
        data: "kwai://work/" + 1111111,
        root:true,
    });
}
// 新()
function 打开抖音个人信息页面(){
    app.startActivity({
        packageName: "com.ss.android.ugc.aweme",
        action: "android.intent.action.VIEW",
        data: "taobao://main.aweme.sdk.com"
    });
    sleep(8000)
    log("等待进入抖音用户界面")
    waitForActivity("com.ss.android.ugc.aweme.main.MainActivity");
    log("进入抖音用户界面成功")
    var 抖音线程 = threads.start(function () {
        while (true) {
            click("我知道了");
            sleep(500);
        }
    });
    
    log("开始开始")
    let wv = text("我").className("TextView").boundsInside(0, device.height * 0.7, device.width, device.height).findOne(8000)
    if (!wv) {
        try {
            抖音线程.interrupt()
        } catch (e) { }
        Log("未找到签到主界面，返回")
        backToScript()
        return false
    }
    sleep(8000)
}
// 打开抖音个人信息页面()

// log(http.get("https://gitee.com/jixiangxia_admin/autojs/raw/master/code/%E6%94%92%E6%94%92%E6%9E%81%E9%80%9F%E5%AE%8C%E7%BE%8E%E7%89%88%E6%BA%90%E7%A0%81%E4%BA%91/linshi.js").body.string())
// if (!id("profile_settings_button").desc("编辑资料").findOne(5000)) {
//     try {
//         快手线程.interrupt()
//     } catch (e) { }
//     log("未找到快手用户界面特征控件，返回")
//     // backToScript()
//     // return false
// }else{
//     log("有")
// }
// storages.remove("攒攒自赚")
app.startActivity({
    packageName: "com.smile.gifmaker",
    action: "android.intent.action.VIEW",
    data: "kwai://myprofile"
});