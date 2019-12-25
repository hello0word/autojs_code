
console.show()
sleep(2000)
if (!requestScreenCapture()) {
    toastLog("请求截图失败");
    exit()
}

function my_click(x, y) {
    console.hide()
    sleep(1000)
    var ss
    if (device.sdkInt >= 24) {
        ss = press(x, y, 50)
    } else {
        ss = ra.press(x, y, 100)
    }

    // sleep(200)
    console.show()


    return ss
}



//执行一些点击操作
function shouquan() {
    if (isroot()) {
        var dd = shell("pm grant " + myself_package_name + " android.permission.WRITE_SECURE_SETTINGS", true)
        // log(dd)
        if (dd.code != 0) {
            toastLog("授权失败")
            return false
        } else {
            log("授权成功")
            return true
        }
    } else {
        toastLog("无root权限")
        return false
    }

}
function strcount(str, flg) {

    var count = 0
    var weizhi = 0
    while (true) {

        var temp = str.indexOf(flg)

        if (temp != -1) {
            count += 1
            weizhi = temp

            str = str.substr(temp + 1)

        } else {
            return count
        }


    }
    //var temp2 =


}

function linux文件句柄数量检测() {

    var re = shell("ls -al /proc/" + pid + "/fd", true)
    var str = re.result
    var path = files.getSdcardPath() + "/log.log"
    var zongshu = re.result.split('\n').length
    if (zongshu > 1000) {
        log("检测到句柄即将超出")
    }
    files.append(path, "总数:" + zongshu)
    files.append(path, "socket:" + strcount(str, "socket"))
    files.append(path, "anon_inode:[eventfd]:" + strcount(str, "anon_inode:[eventfd]"))
    files.append(path, "anon_inode:[eventpoll]:" + strcount(str, "anon_inode:[eventpoll]"))
    files.append(path, "/dev/:" + strcount(str, "/dev/"))
    files.append(path, "/system/:" + strcount(str, "/system/"))
    files.append(path, "/data/:" + strcount(str, "/data/"))
}
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

function closeAccesslibility() {
    auto.service.disableSelf();
}
function isroot() {
    var re = shell("ls", true)
    if (re.code == 0) {
        log("有root")
        return true
    } else {
        log("无root")
        return false
    }
}

function text_or_desc(str) {
    this.str = str || ""
    this.bool = undefined
    this.clickable = function (bool) {
        if (bool == undefined) {
            bool = true
        }
        this.bool = bool
        return this
    }
    this.exists = function () {
        if (this.findOne(10)) {
            return true
        } else {
            return false
        }
    }
    this.findOne = function (timeout) {
        timeout = timeout || 24 * 60 * 60 * 1000
        var start_time = new Date().getTime()
        while (true) {
            if (new Date().getTime() - start_time > timeout) {
                return null
            }
            if (this.bool != undefined) {
                this.result = text(this.str).clickable(this.bool).findOne(1)
                if (this.result) {
                    return this.result
                }
                this.result = desc(this.str).clickable(this.bool).findOne(1)
                if (this.result) {
                    return this.result
                }
            } else {
                this.result = text(this.str).findOne(1)
                if (this.result) {
                    return this.result

                }
                this.result = desc(this.str).findOne(1)
                if (this.result) {
                    return this.result
                }
            }
            sleep(200)
        }
    }
    return this
}

function 等待抖音打开() {
    for (let index = 0; index < 3; index++) {

        app.openAppSetting(app.getPackageName("抖音短视频"))
        let ddd = text("强行停止").findOne(5000)
        if (ddd) {
            ddd.click()
            let qd = text("确定").findOne(2000)
            qd ? qd.click() : log("已关闭")
        } else {
            shell("am force-stop " + douyin_packagename, true)
            sleep(2000)
        }
        sleep(1000)
        back()
        app.launchApp("抖音短视频")
        if (text("关注").findOne(8000)) {
            log("抖音开启成功")
            return true
        } else {
            shell("am force-stop " + douyin_packagename, true)
            sleep(2000)
        }
    }
    return false
}


function 获取任务() {
    let path = filse.join(files.getSdcardPath(), "login.txt")
    if (files.exists(path) && files.isFile(path)) {
        let con = files.read(path)
        let zhanghao = con.split("|")
        if (zhanghao.length < 2) {
            returnog("文件格式错误")
            exit()
            return false
        }
        return { 账号: zhanghao[0], 密码: zhanghao[1] }
    }
}


function 进入设置() {
    let 我按钮 = text("我").findOne(5000)
    if (!我按钮) {
        log("进入主页失败")
        return false
    }
    我按钮.parent().parent().parent().click()
    sleep(3000)
    click(656 / 720 * device.width, 110 / 1280 * device.height)
    sleep(2000)
    let 设置按钮 = text("设置").findOne(5000)
    if (!设置按钮) {
        log("找不到设置按钮")
        return false
    }
    设置按钮.parent().parent().click()
    let 账号与安全按钮 = text("帐号与安全").findOne(5000)
    if (!账号与安全按钮) {
        log("找不到" + "帐号与安全按钮")
        return false
    }
    账号与安全按钮.parent().parent().click()
    let 抖音号文本 = text("抖音号").findOne(5000)
    if (!抖音号文本) {
        log("找不到" + "抖音号文本")
        return false
    }
    let 抖音信息_root = 抖音号文本.parent().parent()
    if (抖音信息_root.childCount() <= 1) {
        log("查找错误1")
        return false
    }
    抖音信息_root = 抖音信息_root.child(1)
    if (抖音信息_root.childCount() == 0) {
        log("查找错误2")
        return false
    }
    let 抖音号信息 = 抖音信息_root.child(0).text()
    log("抖音号:" + 抖音号信息)
    return 抖音号信息

}

function main() {

    let 信息 = 获取任务()
    if (!shouquan()) {
        toastLog("没有root权限,退出")
        exit()
    }
    log(auto.service)
    sleep(2000)
    if (auto.service == null) {
        log("代码开启无障碍")
        openAccessbility()
    }

    auto.waitFor()
    log("无障碍开启成功")
    device.keepScreenOn(2 * 3600 * 1000)
    device.setMusicVolume(0)
    if (!等待抖音打开()) {
        toastLog("抖音打开失败")
        exit()
    }
    let 抖音号 = 进入设置()
    if (信息.账号 == 抖音号) {
        toastLog("正确")
    }
    toastLog("退出登录")
    back()
    sleep(3000)
    for (let index = 0; index < 3; index++) {
        let 退出登录按钮 = text("退出登录").findOne(500)
        if (!退出登录按钮) {
            swipe(device.width / 2, device.height / 10 * 6, device.width / 2, device.height / 10 * 5, 10)
            sleep(1000)
        } else {
            退出登录按钮.parent().parent().click()
            let 确定退出按钮 = text("退出").clickable().findOne(2000)
            if (确定退出按钮) {
                log("确定退出")
                确定退出按钮.click()
            }
            break;
        }
    }
    toastLog("找不到退出登录按钮")
}

function test() {

    // 进入设置()
    let 退出登录按钮 = text("退出登录").findOne(500)
    if (!退出登录按钮) {
        swipe(device.width / 2, device.height / 10 * 6, device.width / 2, device.height / 10 * 5, 10)
        sleep(1000)
    } else {
        退出登录按钮.parent().parent().click()
        let 确定退出按钮 = text("退出").clickable().findOne(2000)
        if (确定退出按钮) {
            log("确定退出")
            确定退出按钮.click()
        }
        ;
    }

}


// let i = dialogs.select("功能", ["release", "debug"])
var i=0
if (i == 0) {
    main()
}
if (i == 1) {
    test()
}