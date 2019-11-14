importClass(android.content.Context);
importClass(android.provider.Settings);
importClass(android.os.Process)

var packagename_self = context.getPackageName()
log(packagename_self)


var testflg

var dd = shell("pm grant " + packagename_self + " android.permission.WRITE_SECURE_SETTINGS", true)
log(dd)

console.setSize(device.width / 2, device.height * 4 / 5)
console.show()
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
    toastLog("成功开启无障碍服务");
} catch (error) {
    //授权方法：开启usb调试并使用adb工具连接手机，执行 adb shell pm grant org.autojs.autojspro android.permission.WRITE_SECURE_SETTING
    toastLog("\n请确保已给予 WRITE_SECURE_SETTINGS 权限\n\n授权代码已复制，请使用adb工具连接手机执行(重启不失效)\n\n", error);
    setClip("adb shell pm grant org.autojs.autojspro android.permission.WRITE_SECURE_SETTINGS");
}

sleep(200)
auto.waitFor()
threads.start(function() {
    while (text("复制崩溃信息").findOne()) {
        threads.start(main)
        sleep(3000)
    }

})
var tuojigua_package = "muling.plugin"
var number_count = 0

function start() {
    log("start")
    if (number_count != 0) {
        log("三次启动失败")
        exit()
    }

    function qidong() {
        shell("am  force-stop " + tuojigua_package, true)
        sleep(1000)
        log("启动app")
        app.launchPackage(tuojigua_package)

        sleep(3000)
        for (let i = 0, e = 0; i < 180; i++) {
            if (text("插件加载中...").exists() || text("查询设备信息...").exists()) {
                log("加载中")
                e = 0

            } else {
                e++
                log("等待" + (10 - e + 1) + "次检测通过")
                if (e > 10) {
                    if (desc("打开侧拉菜单").exists()) {
                        log("检测通过")
                        return true
                    } else {
                        log("检测失败")
                        return false
                    }
                }
            }
            sleep(1000)
        }
        return false
    }
    if (currentPackage() != tuojigua_package) {

        if (!qidong()) {
            number_count++
            return start()
        }
        //toastLog("测试ok999")

    } else {
        if (text("插件加载中...").exists() || text("查询设备信息...").exists()) {
            shell("am  force-stop " + tuojigua_package, true)
            sleep(1000)
            if (!qidong()) {
                number_count++
                return start()
            }

        }
    }
}

function two() {
    log("two")
    var all = desc("打开侧拉菜单")
    var close = desc("关闭侧拉菜单")
    var all_log = text("全部日志")
    if (all.exists()) {
        toastLog("在首页")
        //all_log.findOne().click()
        //sleep(1000)
        //back()
        //sleep(1000)
        all.findOne().click()
        sleep(1000)


    } else if (close.exists()) {
        log("在设置页")
        close.findOne().click()
        sleep(500)
        all.findOne().click()
    } else if (desc("更多选项").exists()) {
        log("在日志页")
        back()
        sleep(500)
        all.findOne().click()

    } else {
        toastLog("页面错误")
        return main()
    }
}

function end() {
    // sleep(1000)
    log("end")
    if (textEndsWith("到期").findOne(3000) || testflg) {
        log("找到到期")
        sleep(1000)
        var allarray = [{
                "appname": "天天趣闻",
                "packagename":"com.ttyouqu.app",
                "args": ["deviceId", "token"]
            },
            {
                "appname": "有看头",
                "packagename":"com.kuaima.kuailai",
                "args": ["uid", "x_klapp_token"]
            },

            {
                "packagename":"com.martian.hbnews",
                "appname": "红包头条",
                "args": ["uid", "token"]
            }
        ]
        for (let i = 0; i < allarray.length; i++) {
            var cur = allarray[i]
            var dd = text(cur.appname).findOne(2000)
            if (dd) {
                if (dd.parent().parent().childCount() < 2) {
                    dd.parent().parent().parent().click()
                    var data_tiantian = gettiantiandata(cur)
                    if (!data_tiantian) {
                        toastLog("没有数据")
                        sleep(1000)
                        click("取消")
                        break;
                    }
                    var kuang = className("android.widget.EditText").find()
                    if (kuang) {
                        for (let gg = 0; gg < kuang.length; gg++) {

                            if (cur.appname == "红包头条") {
                                if (gg < 2) {
                                    kuang[gg + 1].setText(data_tiantian[cur.args[gg]])
                                }
                            } else {
                                kuang[gg].setText(data_tiantian[cur.args[gg]])
                                //kuang[1].setText(data_tiantian.token)
                                //toast("okokokok")
                                sleep(100)
                            }
                        }
                    }
                    click("登陆")
                    click("保存")
                    sleep(1000)
                }else{
                    log(dd.text()+"已登录")
                }
            }
        }


        //var guanbi = desc("关闭侧拉菜单").findOne(3000)
        //if (guanbi) {
        //log("关闭侧拉菜单")
        //guanbi.click()
        //}

    }else{
        log("没找到到期")
    }

    //log(all_run.length)
}
//current_data  包含appname，args  参数列表
function gettiantiandata(current_data) {
    function getsor(current_data, currentdir) {
        var ziall = files.listDir(currentdir)
        for (let dd = 0; dd <= ziall.length; dd++) {
            var enddir = files.join(currentdir, ziall[dd])
            if (files.exists(files.join(enddir, "sslCaptureData.txt"))) {
                enddir = files.join(enddir, "sslCaptureData.txt")
                if (current_data.appname == "有看头") {
                    var strarray = files.open(enddir).readlines()
                    var uid, x_klapp_token
                    strarray.forEach((strlin) => {
                        if (strlin.indexOf("uid: ") != -1) {
                            uid = strlin.substr(5, strlin.length - 5)
                        }

                        if (strlin.indexOf("x-klapp-token:") != -1) {
                            x_klapp_token = strlin.substr(14, strlin.length - 14)
                        }
                    })
                    if (uid && x_klapp_token) {
                        log(uid)
                        log(x_klapp_token)
                        var return_data = Object()
                        return_data["uid"] = uid
                        return_data["x_klapp_token"] = x_klapp_token
                        return return_data
                    }

                } else {
                    var endstr = files.read(enddir)
                    log(enddir)
                    var return_data = Object()
                    current_data.args.forEach((current_args) => {
                        log(current_args)
                        var start = endstr.indexOf(current_args)
                        if (start != -1) {
                            var temp = endstr.substr(start, 100)
                            var end = temp.indexOf("&")
                            end = temp.substr(current_args.length + 1, end - current_args.length - 1)
                            if (end) {
                                log(current_args + ":" + end)
                                //alert(current_args, end)
                                return_data[current_args] = end

                            }
                        } else {
                            log("没有")
                        }




                    })
                    //log(return_data.length)
                    if (Object.keys(return_data).length == current_data.args.length) {



                        return return_data
                    }


                }
            }

        }
    }

    /**
     * 解析根目录 
     */
    var base_path = "/storage/emulated/0/VpnCapture/ParseData"
    if (!files.exists("/storage/emulated/0/VpnCapture/ParseData")) {
        toastLog("抓包精灵数据目录不存在")
    }
    var datalist = files.listDir("/storage/emulated/0/VpnCapture/ParseData")
    if (datalist.length == 0) {
        toastLog("抓包数据为空")
    }
    datalist = datalist.sort()
    log(datalist)

    log(current_data.appname)
    var current_packagename = current_data.packagename
    // if (current_data.appname=="有看头") {
    //     current_packagename = ""
    // }else{
    //     current_packagename = app.getPackageName(current_data.appname)
    // }
    
    log("包名:"+current_packagename)
    for (let i = 0; i < datalist.length; i++) {
        var currentdir = datalist[datalist.length - i - 1]
        currentdir = files.join(base_path, currentdir)
        log("本次：" + currentdir)
        var baojiji=files.join(currentdir, current_packagename)
        log(baojiji)
        if (files.exists(baojiji)) {//这里报空指针异常

            currentdir = files.join(currentdir, current_packagename)
            var getvalue = getsor(current_data, currentdir)
            if (getvalue) {
                return getvalue

            } else {
                toastLog("在包名目录下未找到数据")
                if (files.exists(files.join(currentdir, "unknow")) ) {
                    currentdir = files.join(currentdir, "unknow")

                    getvalue = getsor(current_data, currentdir)
                    if (getvalue) {
                        return getvalue
                    } else {
                        toastLog("在unknown目录下未找到数据")
                    }
                }
            }
        }





    }
}

function in_downlod() {
    className("android.widget.ImageView").findOne().parent().click()
    className("android.widget.Button").text("退出").findOne()
    sleep(1000)
    while (true) {
        if (!text("Download").exists()) {
            if (!scrollable(true).findOne().scrollForward()) {
                return false
            }
            sleep(200)

        } else {
            text("Download").findOne().parent().click()
            return true
        }
    }
}

function main() {
    start()
    two()
    end()
    log("10秒后退出")
    sleep(10000)
    if (packagename_self != "org.autojs.autojspro") {
        log(shell("am force-stop " + packagename_self, true))
    }
}



function test() {
    testflg=true
    // end()
    log(files.join("123","145"  ))
    //log(in_downlod())
    //log(scrollable(true).findOne().scrollForward())

}

main()
// test()