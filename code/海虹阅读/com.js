var c = {};

c.openAccessbility =function() {
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
        log("无障碍开启完成");
        // auto.waitFor();
        return true
    } catch (error) {
        //授权方法：开启usb调试并使用adb工具连接手机，执行 adb shell pm grant org.autojs.autojspro android.permission.WRITE_SECURE_SETTING
        log("\n请确保已给予 WRITE_SECURE_SETTINGS 权限\n\n授权代码已复制，请使用adb工具连接手机执行(重启不失效)\n\n", error);
        // setClip("adb shell pm grant org.autojs.autojspro android.permission.WRITE_SECURE_SETTINGS");
        return false
    }
}


c.init_comment=function () {
    var path = files.getSdcardPath() + "/pl.txt"
    if (!files.exists(path)) {
        if (files.exists("./pl.txt")) {
            path = "./pl.txt"
        } else {
            toastLog("无评论文档")
            exit()
        }
    }
    var temp_all_text_f = files.open(path, "r")
    var temp_all_text = temp_all_text_f.readlines()
    if (temp_all_text.length == 0) {
        toastLog("评论文档内容为空")
        exit()
    }

    var reg = new RegExp("^[ ]*$");
    temp_all_text.forEach((line) => {
        if (!reg.test(line) && line.length > 11) {
            all_text.push(line)
        }
    })
    temp_all_text_f.close()
}

c.start_66_yuedu = function (timeout) {

    timeout = timeout || 30
    log(timeout)
    timeout *= 1000
    for (let index = 0; index < 30; index++) {
        // log( shell("am force-stop " + yuedu_66_packagename, true))
        app.openAppSetting(yuedu_66_packagename)
        text("强行停止").findOne().click()
        let qd = text("确定").findOne(2000)
        qd ? qd.click() : log("已关闭")
        sleep(1000)
        app.launchPackage(yuedu_66_packagename)
        sleep(4000)
        if (currentActivity() == "com.yxcorp.gifshow.detail.PhotoDetailActivity") {
            log("在快手页面")
            back()
            continue
        }
        if (text_or_desc("联系客服").clickable().findOne(timeout)) {
            toastLog("66阅读开启成功")
            // var re = text_or_desc("开始赚钱").clickable().findOne()
            log("开始赚钱")
            // re=boundsContains((288+20)/720*device.width,(860+20)/1280*device.height ,(432-20)/720*device.width ,(1004-20)/1280*device.height ).clickable().findOne()
            // log("关闭广告")
            if (text_or_desc("重试").clickable().findOne(2000)) {
                log("网络错误,等待网络正常")
                wait_network()
                var aa = text_or_desc("重试").clickable().findOne(1)
                aa.click()
            } else {
                log("没发现重试")
            }
            return true
        } else {
            toastLog("66阅读开启失败,重试中" + index)
            home()
            sleep(2000)
        }

    }
    return false
}

c.wait_network = function () {
    while (true) {
        log("等待网络中")
        try {
            var re = http.get("https://www.baidu.com")
            if (re.statusCode == 200) {
                return true
            }
        } catch (error) {

        }
        sleep(60 * 1000)
    }
}


module.exports = c;