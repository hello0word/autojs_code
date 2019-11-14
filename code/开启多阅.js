

var duoyuePack=app.getPackageName("多阅分享")
var thread
function insureDuoyue() {
    while (true) {
        try {
            if (auto.root.packageName!=duoyuePack) {
                app.launchPackage(duoyuePack)
                sleep(1000)
            }
            var aa= text("允许").clickable(true).findOne(10)
            if (aa) {
                aa.click()
            }
            var aa= text("取消").clickable(true).findOne(10)
            if (aa) {
                aa.click()
            }
        } catch (error) {
            
        }
        
    }
}


function jiance() {
    while(true){
        var close,tiaoguo,xia_ci_zai_shuo,qi_dong_gong_neng,dianjiguanbi
        close=text("关闭").clickable(true).findOne(10)
        tiaoguo= textEndsWith("跳过").clickable(true).findOne(10)
        xia_ci_zai_shuo= text("下次再说").clickable(true).findOne(10)
        qi_dong_gong_neng=text("启动功能").clickable(true).findOne(10)
        dianjiguanbi=textStartsWith("点击关闭").clickable(true).findOne(10)
        if (close) {
            sleep(100)

            close.click()
        }
        if (tiaoguo) {
            sleep(100)

            tiaoguo.click()
        }
        if(xia_ci_zai_shuo){
            sleep(100)

            xia_ci_zai_shuo.click()
        }
        if (qi_dong_gong_neng) {
            sleep(100)

            qi_dong_gong_neng.click()
            return 
        }
        if (dianjiguanbi) {
            sleep(100)
            dianjiguanbi.click()
        }
        if (currentActivity()=="com.iflytek.voiceads.request.IFLYBrowser") {
            sleep(100)            
            back()
        }
    }
}
function openAccessbility() {
    var packagename_self = context.getPackageName()

    var dd = shell("pm grant " + packagename_self + " android.permission.WRITE_SECURE_SETTINGS", true)
    sleep(400)
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
        log("无障碍开启失败:"+error)
        return false
    }
}

function main() {

    if(shell("ls",true).code!=0){
        // shell("ls",true)
        toastLog("请授予本应用ROOT权限")
        // sleep(2000)
        return
    }else{
        toastLog("已获得Root")
        
    }
    openAccessbility()

    sleep(500)
    auto.waitFor()
    thread = threads.start(insureDuoyue)
    if(text("服务器在线验证中").findOne(10000)){
        toastLog("多阅开启成功")
        
        jiance()
        home()
        thread.interrupt()
        sleep(1000)
        start_duoyue()
        
    }else{
        toastLog("多阅开启失败")
    }
}


function start_duoyue() {
    var all_window=auto.windows
    for (let index = 0; index < all_window.length; index++) {
        var element = all_window[index];
        auto.setWindowFilter(function (window) {
            // log(window)
            return window.layer==index 
        })
        log((auto.root.packageName()))
        if(auto.root.packageName()=="com.sdu.didi"){
            log("找到了"+index)
            break
        }
    }
    press(auto.root.child(0).child(0).bounds().centerX(),auto.root.child(0).child(0).bounds().centerY(),100)
    sleep(200)
    log(auto.root.child(0).child(0).child(0).click())

}

function test() {
    // log(text("启动功能").clickable(true).findOne(1000))
    log(shell("am force-stop "+ duoyuePack,true))
    main()  
    
    // auto.setWindowFilter(function (window) {
    //     log(window)
    //     return window.layer==1  
    // })
    

}


// test()
main()
// log(auto.root.child(0).child(0).bounds().centerX())
// log(auto.root.child(0).child(0).bounds().centerY())
// press(auto.root.child(0).child(0).bounds().centerX(),auto.root.child(0).child(0).bounds().centerY(),100)
// sleep(200)
// log(auto.root.child(0).child(0).child(0).click())
// main()