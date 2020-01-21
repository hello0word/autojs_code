function openAccessbility() {
    //var dd = shell("pm grant " + packagename_self + " android.permission.WRITE_SECURE_SETTINGS", true)
    //log(dd)   com.wenzixiuzhen.ld
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

        var Services = enabledServices + ":" + context.getPackageName() + "/com.stardust.autojs.core.accessibility.AccessibilityService";
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


if (!auto.server) {
    openAccessbility()
    sleep(2000)
    auto.waitFor()

}


if (!requestScreenCapture()) {
    toastLog("请求截图失败");
    exit()
}

var window = floaty.window(
    <frame>
        <button id="action" text="开始运行" w="90" h="40" bg="#FF3030" />
    </frame>
);

//记录按键被按下时的触摸坐标
var x = 0, y = 0;
//记录按键被按下时的悬浮窗位置
var windowX, windowY;
//记录按键被按下的时间以便判断长按等动作
var downTime;

window.action.setOnTouchListener(function (view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            windowX = window.getX();
            windowY = window.getY();
            downTime = new Date().getTime();
            return true;
        case event.ACTION_MOVE:
            //移动手指时调整悬浮窗位置
            window.setPosition(windowX + (event.getRawX() - x),
                windowY + (event.getRawY() - y));
            //如果按下的时间超过1.5秒判断为长按，退出脚本
            if (new Date().getTime() - downTime > 1500) {
                exit();
            }
            return true;
        case event.ACTION_UP:
            //手指弹起时如果偏移很小则判断为点击
            if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                onClick();
            }
            return true;
    }
    return true;
});

function onClick() {
    if (window.action.getText() == '开始运行') {
        是否运行 = true
        window.action.setText('停止运行');
    } else {
        是否运行 = false
        window.action.setText('开始运行');
    }
}


var 是否运行 = false
var 已完成 = images.read("/sdcard/已完成.png")
var 开始 = images.read("/sdcard/开始.png")

function 检查一遍() {
    //557  1726  刷新任务
    //715  1256 确定
    // 737 919
    // 737 1228
    // 737 1544
    var IMG = captureScreen();
    var 第一个 = images.findImageInRegion(IMG, 已完成, 137, 700, 800, 350)
    if (!第一个) {
        var 开始坐标 = images.findImageInRegion(IMG, 开始, 137, 700, 800, 350)
        if (开始坐标) {
            click(开始坐标.x, 开始坐标.y)
            sleep(60 *1000)
        }
        return
    }
    var 第二个 = images.findImageInRegion(IMG, 已完成, 137, 1000, 800, 350)
    if (!第二个) {
        var 开始坐标 = images.findImageInRegion(IMG, 开始, 137, 1000, 800, 350)

        if (开始坐标) {
            click(开始坐标.x, 开始坐标.y)
            sleep(60 *1000)
        }
        return
    }
    var 第三个 = images.findImageInRegion(IMG, 已完成, 137, 1350, 800, 350)
    if (!第三个) {
        var 开始坐标 = images.findImageInRegion(IMG, 开始, 137, 1350, 800, 350)
        if (开始坐标) {
            click(开始坐标.x, 开始坐标.y)
            sleep(60 *1000)
        }
        return
    }
    if (第一个 && 第二个 && 第三个) {
        click(557, 1726)
        sleep(1500)
        click(715, 1256)

    }
}

setInterval(() => {
    if (是否运行) {
        检查一遍()
    }
}, 3000);