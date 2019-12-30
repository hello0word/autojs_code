console.show()
sleep(500)


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

    var dd = shell("pm grant " + context.getPackageName() + " android.permission.WRITE_SECURE_SETTINGS", true)
    // log(dd)
    if (dd.code != 0) {
        toastLog("授权失败")
        return false
    } else {
        log("授权成功")
        return true
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

function 清理数据root(packagename) {
    清理后台(packagename)
    let re = shell("pm clear " + packagename, true)
    if (re.code == 0) {
        return true
    }
}


function 清除数据无障碍(packagename) {
    app.openAppSetting(packagename)
    let 存储 = text("存储").findOne(8000)
    if (!存储) {
        log("找不到存储按钮")
        return false
    }
    存储.parent().parent().click()
    let 清除数据 = text("清除数据").findOne(8000)
    if (!清除数据) {
        log("找不到清除数据按钮")
        return false
    }
    清除数据.click()
    let 确定 = text("确定").findOne(3000)
    if (确定) {
        确定.click()
    }
    back()
    sleep(500)
    back()
    sleep(500)
    back()
    sleep(500)
    return true
}


function 获取任务() {
    let path = files.join(files.getSdcardPath(), "login.txt")
    if (!files.exists(path)) {
        toastLog("无账号文件")
        exit()
    }

    if (files.exists(path) && files.isFile(path)) {
        let con = files.read(path)
        let zhanghao = con.split("|")
        if (zhanghao.length < 2) {
            log("文件格式错误")
            exit()
            return false
        }
        return { 类型: zhanghao[0], 账号: zhanghao[1], 密码: zhanghao[2] }
    }
}

/**
 * 
 * @param {*} 方式 
 * @param {*} 数据 包含账号 , 密码 ,类型(0为账号登录,1为天翼登录)
 */
function 登录抖音(方式, 数据) {
    function 等待抖音打开() {
        for (let index = 0; index < 5; index++) {
            app.launchApp("抖音短视频")
            let 好的按钮 = text("好的").clickable().findOne(25000)
            if (好的按钮) {
                好的按钮.click()
                sleep(3000)
                log("抖音开启成功")
                for (let index = 0; index < 3; index++) {
                    let 允许 = text("允许").clickable().findOne(2000)
                    if (允许) {
                        允许.click()
                    }
                }
                sleep(4000)
                let re = textStartsWith("滑动查看更多").findOne(2000)
                if (re) {
                    log("滑动查看更多")
                    back()
                }
                let 我按钮 = text("我").findOne(3000)
                if (!我按钮) {
                    log("找不到我按钮")
                    return false
                }
                我按钮.parent().parent().parent().click()
                return true
            } else {
                清理数据root(app.getPackageName("抖音短视频"))
                sleep(2000)
            }
        }
        return false
    }

    function 登录抖音_账号密码(数据) {
        let 密码登录 = text("密码登录").findOne(2000)
        if (!密码登录) {
            log("找不到密码登录按钮")
            return false
        }
        密码登录.click()
        let 输入框合集 = className("EditText").find()
        if (输入框合集.length < 2) {
            log('无足够输入框')
            return false
        }
        输入框合集[0].setText("15369323275")
        输入框合集[1].setText("xia031425")
        let 同意协议 = className("CheckBox").findOne(3000)
        if (!同意协议) {
            log("无同意协议按钮")
            return false
        }
        if (!同意协议.checked()) {
            同意协议.click()
        }
        let 登录按钮 = text("登录").findOne(5000)
        if (!登录按钮) {

            return false
        }
        登录按钮.parent().parent().click()
        //TODO
    }
    function 登录抖音_天翼登录() {
        var 其他方式登录_成功标记 = false
        for (let index = 0; index < 4; index++) {
            let 其他方式登录 = text("其他方式登录").clickable().findOne(8000)
            if (其他方式登录) {
                其他方式登录.click()
            }
            if (text("今日头条登录").findOne(4000)) {
                其他方式登录_成功标记 = true
                break;
            }
        }
        if (!其他方式登录_成功标记) {
            log("点击其他方式登录失败")
            return false
        }
        let 今日头条登录 = text("今日头条登录").findOne(4000)
        if (!今日头条登录) {
            log("找不到今日头条登录按钮")
            return false
        }
        今日头条登录.parent().click()
        let 授权并登录 = text("授权并登录").clickable().findOne(12000)
        if (!授权并登录) {
            log("找不到授权并登录按钮")
            return false
        }
        授权并登录.click()
        let 跳过 = text("跳过").clickable().findOne(15000)
        if (!跳过) {
            log("找不到填手机号跳过按钮")
            return false
        }
        跳过.click()
        跳过 = text("跳过").clickable().findOne(8000)
        if (!跳过) {
            log("找不到通讯录好友跳过按钮")
            return false
        }
        跳过.click()
        return true
    }
    let 打开结果 = 等待抖音打开()
    if (!打开结果) {
        return false
    }
    if (方式 == 0) {
        log("方式0")

        登录抖音_账号密码(数据)
    } else if (方式 == 1) {
        log("方式1")
        登录抖音_天翼登录()
    }
}
function 清理后台(packagename) {
    log(shell("am force-stop " + packagename, true))
}


function 登录今日头条(数据) {
    function 开启今日头条并授权() {
        for (let index = 0; index < 5; index++) {
            app.launchApp("今日头条")
            let 我知道了 = text("我知道了").clickable().findOne(10000)
            if (!我知道了) {
                log("没找到我知道了")
                return false
            }
            我知道了.click()
            sleep(3000)
            for (let index = 0; index < 3; index++) {
                let 允许 = text("允许").clickable().findOne(2000)
                if (!允许) {
                    log("没发现授权按钮")
                }
                允许.click()
            }
            break;
        }
        let 未登录 = text("未登录").findOne(10000)
        if (未登录) {
            未登录.parent().click()
            return true
        } else {
            return false
        }
    }

    function 登录(数据) {
        let 登录text = text("登录").findOne(8000)
        if (!登录text) {
            log("找不到登录按钮")
            return false
        }
        登录text.parent().child(0).click()
        sleep(5000)
        let 手机登录 = text("手机登录").clickable().findOne(8000)
        if (!手机登录) {
            log("找不到手机登录")
            return false
        }
        手机登录.click()
        sleep(5000)
        //这里可能有好多个登录方式
        function 选择天翼登录() {
            var 所有图片个数 = className("ImageView").depth(13).find().length
            for (let index = 所有图片个数-1; index >=0 ; index--) {
                let re = className("ImageView").depth(13).find()
                if (re.length >= 0 && index < re.length) {
                    re[index].click()
                    let 天翼登录按钮 = desc("登录").id("j-login").findOne(45000)
                    if (!天翼登录按钮) {
                        log("找不到天翼登录按钮")
                        back()
                        sleep(2000)
                    }else{
                        log("找到天翼登录按钮")
                        return true
                    }
                }
            }
            return false
        }
        if (!选择天翼登录()) {
            log("最终找不到天翼登录")
            return false
        }
        //设置账号密码
        let 账号输入框 = className("EditText").id("userName").findOne(5000)
        if (账号输入框) {
            账号输入框.setText(数据.账号)
        } else {
            log("找不到账号输入框")
            return false
        }
        let 密码输入框 = className("EditText").id("password").findOne(5000)
        if (密码输入框) {
            密码输入框.setText(数据.密码)
        } else {
            log("找不到密码输入框")
            return false

        }
        天翼登录按钮 = desc("登录").id("j-login").findOne(45000)
        天翼登录按钮.click()
        let 我的 = text("我的").findOne(25000)
        if (我的) {
            log("登录成功")
            return true
        } else {
            log("登录失败")
            return false
        }
    }

    let 开启结果 = 开启今日头条并授权()
    log(开启结果)
    if (!开启结果) {
        log("开启今日头条失败")
        return false
    }
    let 登录结果 = 登录(数据)
    log(登录结果)
    if (!登录结果) {
        log("登录今日头条失败")
        return false
    } else {
        return 登录结果
    }
}

function main() {

    let 信息 = 获取任务()
    if (!isroot()) {
        toastLog("没有root权限,退出")
        exit()
    }
    log("无障碍服务:" + auto.service)
    sleep(2000)
    if (auto.service == null) {
        shouquan()
        log("代码开启无障碍")
        openAccessbility()
    }
    sleep(3000)
    auto.waitFor()
    log("无障碍开启成功")
    device.keepScreenOn(2 * 3600 * 1000)
    device.setMusicVolume(0)
    if (信息.类型 == 0) {//直接登录账号
        for (let index = 0; index < 5; index++) {
            清理数据root(app.getPackageName("抖音短视频"))
            if (登录抖音(0, 信息)) {
                break;
            }
        }

    } else if (信息.类型 == 1) {//天翼账号登录
        var bj = false
        for (let index = 0; index < 5; index++) {
            log("清除今日头条数据")
            清理数据root(app.getPackageName("今日头条"))
            log("开始登录今日头条")
            sleep(2000)
            if (登录今日头条(信息)) {
                bj = true
                break;
            }
        }
        if (!bj) {
            exit()
        }
        for (let index = 0; index < 2; index++) {
            log("清除抖音短视频数据")
            清理数据root(app.getPackageName("抖音短视频"))
            sleep(2000)
            log("开始登录抖音")
            if (登录抖音(1, 信息)) {
                break;
            }
        }

    }

}

function test() {

    // 进入设置()
    // log(files.write("/sdcard/login.txt","dyv1fne0vclf|123"))
    // log(files.write("/sdcard/login.txt", "1|dunlian18163@21cn.com|yanon6700"))
    // // log(清除数据(app.getPackageName("今日头条")))
    // let 信息 = 获取任务()
    // log(信息)
    // 清除数据(app.getPackageName("抖音短视频"))

    // 登录今日头条(信息)
    登录抖音(1)
}


// let i = dialogs.select("功能", ["release", "debug"])
var i = 0
if (i == 0) {
    main()
}
if (i == 1) {
    test()
}