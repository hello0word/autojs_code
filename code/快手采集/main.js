/**
 * 思路,找一个,下载的同时找下一个合适的
 * 
 * 
 * 
 */
importClass(android.content.Intent)
importClass(android.net.Uri)
importClass(java.io.File)
importClass(android.provider.MediaStore)

var myself_package_name
myself_package_name = context.getPackageName()

var ra = new RootAutomator();
var 完成个数 = 0
const 需要采集的个数 = 1
var 已上传计数 = 0
const 微视包名 = "com.tencent.weishi"
const 快手包名 = 'com.smile.gifmaker'
const 抖音包名 = app.getPackageName("抖音短视频")
// console.show()
// console.setGlobalLogConfig({
//     "file": "/sdcard/快手采集日志.txt"
// })
// log(ra)
// exit()
var 解析失败 = false//抖音上传视频可能解析失败
// events.observeToast();
// events.onToast(function (toast) {
//     log("Toast内容: " + toast.getText() + " 包名: " + toast.getPackageName());
//     if (toast.getText() == "解析失败，选择其他视频试试吧") {
//         log("解析失败")
//         解析失败 = true
//     }
// });

events.on('exit', function () {
    device.cancelKeepingAwake()
    ra.exit()
    log("退出")
});

if (!requestScreenCapture()) {
    toastLog("请求截图失败");
    exit()
}


function my_click(x, y) {
    console.hide()
    sleep(1000)
    var ss = press(x, y, 50)
    // sleep(200)
    console.show()
    return ss
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
        log("无障碍开启完成");
        sleep(2000)
        auto.waitFor();
        return true
    } catch (error) {
        //授权方法：开启usb调试并使用adb工具连接手机，执行 adb shell pm grant org.autojs.autojspro android.permission.WRITE_SECURE_SETTING
        log("\n请确保已给予 WRITE_SECURE_SETTINGS 权限\n\n授权代码已复制，请使用adb工具连接手机执行(重启不失效)\n\n", error);
        // setClip("adb shell pm grant org.autojs.autojspro android.permission.WRITE_SECURE_SETTINGS");
        return false
    }
}


//执行一些点击操作
function shouquan() {
    if (isroot()) {
        var dd = shell("pm grant " + myself_package_name + " android.permission.WRITE_SECURE_SETTINGS", true)
        log(dd)
        if (dd.code != 0) {
            toastLog("授权失败")
            return false
        } else {
            return true
        }
    } else {
        toastLog("无root权限")
        return false
    }

}

function isroot() {
    var re = shell("ls", true)
    if (re.code == 0) {
        return true
    } else {
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
    this.findOne = function (timeout, 间隔) {
        timeout = timeout || 24 * 60 * 60 * 1000
        var start_time = new Date().getTime()
        var time_flag = start_time
        间隔 = 间隔 || 3000
        while (true) {
            if (new Date().getTime() - time_flag > 间隔) {
                toastLog("查找:" + this.str)
                time_flag = new Date().getTime()
            } else {
                sleep(500)
                continue
            }
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


var md5 = (string) => java.math.BigInteger(1, java.security.MessageDigest.getInstance("MD5").digest(java.lang.String(string).getBytes())).toString(16);
// log(md5("2019555"))

var iiiLabVideoDownloadURL = "http://service.iiilab.com/video/download"
var client = "4699df097833f3d2"
var clientSecretKey = "4001b80e8c9a6125a0b7cc430158506f"
// var link = "https://h5.weishi.qq.com/weishi/feed/7ckAE6l8j1IxQtQy0/wsfeed?wxplay=1&id=7ckAE6l8j1IxQtQy0&spid=7840188205616640000&qua=v1_and_weishi_6.1.5_588_212011448_d&chid=100081014&pkg=3670&attach=cp_reserves3_1000370011"

function iiiLab通用视频解析接口(link) {
    for (let index = 0; index < 5; index++) {
        var timestamp = new Date().getTime()
        var sign = md5(link + timestamp + clientSecretKey)
        try {
            var re = http.post(iiiLabVideoDownloadURL, { link: link, timestamp: timestamp, sign: sign, client: client })
            if (re.statusCode == 200) {
                var ee = re.body.json()
                log(ee)
                if (ee.retCode == 200) {
                    return ee

                }
            } else {
                log("网络错误")
                return false
            }
        } catch (error) {

        }

    }



}
// iiiLab通用视频解析接口()
function 下载视频异步(url) {
    url = url || "http://v.weishi.qq.com/v.weishi.qq.com/shg_1657013231_1047_58b5bf231f804d369e8a1dbbb612vide.f0.mp4?dis_k=ec7357327e4ee1c66f09da46f52ff15b&dis_t=1574523146&guid=0508AFC000E081E13F01036CF26192E5&fromtag=0&personid=h5"
    http.get(url, {}, function (res, err) {
        if (err) {
            console.error(err);
            return;
        }
        log("code = " + res.statusCode);
        // log("html = " + );
        log(res.body.contentType)
        var aa = res.body.bytes()
        files.writeBytes("/sdcard/test视频.mp4", aa)

    })
}
function 下载视频同步(url, 存储文件名) {
    url = url || "http://v.weishi.qq.com/v.weishi.qq.com/shg_1657013231_1047_58b5bf231f804d369e8a1dbbb612vide.f0.mp4?dis_k=ec7357327e4ee1c66f09da46f52ff15b&dis_t=1574523146&guid=0508AFC000E081E13F01036CF26192E5&fromtag=0&personid=h5"
    try {
        var res = http.get(url)
        log("code = " + res.statusCode);
        // log("html = " + );
        log(res.body.contentType)
        var aa = res.body.bytes()
        var path = "/sdcard/gifshow/" + 存储文件名 + ".mp4"
        files.writeBytes(path, aa)
        log("本次下载完成")
        //通知媒体库
        app.sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE, Uri.fromFile(new File(path))));
        完成个数 += 1
        本次处理的文件.push(存储文件名)
        log("文件名已保存")
    } catch (error) {
        log(error)
    }





}



function 打开微视() {
    for (let index = 0; index < 3; index++) {
        // shell("am force-stop " + weishi_package, true)
        if (!text("微视").exists()) {
            log("非首页")
            home()
            sleep(3000)
        } else {
            log("首页")
        }
        click("微视")
        if (text_or_desc("推荐").findOne(10000)) {
            return true
        } else if (text_or_desc("知道了").findOne(7000)) {
            var ff = text_or_desc("知道了").findOne(1000)
            if (ff) {
                log("知道了")
                ff.click()
                return true
            } else {
                log("知道了没找到")
            }
        } else {
            app.openAppSetting(微视包名)
            var ee = text_or_desc("强行停止").findOne(7000)
            if (ee) {
                ee.click()
                var ff = text_or_desc("确定").findOne(5000)
                if (ff) {
                    ff.click()
                }
            }
        }

    }
    toastLog("开启微视失败")
    exit()
}

function 获取赞数() {
    var ee
    for (let index = 0; index < 10; index++) {
        id("feeds_view_pager").findOne().children().forEach(child => { //赞数
            var target = child.findOne(className("android.widget.TextView").drawingOrder(7));
            // log(target)
            ee = target
        })
        if (ee) {
            // log("ee:" + ee.text())
            return ee.text()

        }
        sleep(500)
    }

}
function 获取视频描述() {
    var ee
    for (let index = 0; index < 10; index++) {
        id("feeds_view_pager").findOne().children().forEach(child => { //赞数
            var target = child.findOne(className("android.widget.TextView").drawingOrder(3));
            // log(target)
            ee = target
        })
        if (ee) {
            // log("ee:" + ee.text())
            return ee.text()

        }
        sleep(300)
    }
}

function 下滑() {
    // shell("input swipe 360  800 360 300 100", true)
    console.hide()
    sleep(1000)
    swipe(500 / 720 * device.width, 700 / 1280 * device.height, 500 / 720 * device.width, 660 / 1280 * device.height, 10)
    console.show()
    // KeyCode(20)

}

function 打开快手() {
    for (let index = 0; index < 5; index++) {
        if (!text("快手").exists()) {
            log("非首页")
            home()
            sleep(3000)
        } else {
            log("首页")
        }
        click("快手")
        app.launchPackage(快手包名)
        var 快手首页发现标记 = text_or_desc("发现").findOne(10000)
        if (快手首页发现标记) {
            return true
        } else {
            // shell("am force-stop " + kuaishou_package, true)
            app.openAppSetting(快手包名)
            var ee = text_or_desc("强行停止").findOne(7000)
            if (ee) {
                ee.click()
                var ff = text_or_desc("确定").findOne(5000)
                if (ff) {
                    ff.click()
                    sleep(1000)
                    home()
                }
            }
        }
        sleep(2000)
    }
    log("无法打开快手")
    exit()
}


function 上传本地作品集视频() {
    var 本地作品集根 = className("android.widget.GridView").findOne(15000)
    if (!本地作品集根) {
        log("找不到列表")
        exit()
    }
    if (本地作品集根.childCount() <= 已上传计数) {
        log("已上传完成")
        return false
    }
    log("已上传计数:" + 已上传计数)
    try {
        var 当前处理 = 本地作品集根.child(已上传计数)//这里直接用
        log("本次无异常")
    } catch (error) {
        log(error)
        return false
    }
    当前处理.click()
    sleep(1000)
    var 分享 = text_or_desc("分享").findOne(25000)
    if (分享) {
        log("找到分享")
        分享.click()
        sleep(10000)
        var 发布 = text_or_desc("发布").findOne(25000)
        if (发布) {
            发布.click()
            var 发布成功标记 = textStartsWith("发布成功").findOne(90 * 1000)
            if (发布成功标记) {
                log("本次发布成功")
                已上传计数 += 1
                return true
            } else {
                log("本次发布失败")
                return false
            }
        } else {
            log("找不到发布")
            exit()
        }
    } else {
        log("找不到分享")
        exit()
    }


}

function 打开快手上传视频() {
    log("打开快手上传视频")
    打开快手()
    while (true) {
        if (已上传计数 >= 需要采集的个数) {
            toastLog("任务完成,本次上传个数:" + 需要采集的个数)
            return true
        }
        var 菜单 = text_or_desc("菜单").findOne(8000)
        if (菜单) {
            菜单.click()
            var 本地作品集 = text_or_desc("本地作品集").findOne(6000)
            if (本地作品集) {
                本地作品集.click()
                if (!上传本地作品集视频()) {//没了
                    return false
                } else {
                    log("本次上传成功")
                }
            } else {
                log("找不到本地作品集")
            }
        } else {
            log("找不到菜单")
        }
    }
}



function 打开抖音上传视频() {
    
    function 打开抖音() {
        for (let index = 0; index < 5; index++) {
            app.startActivity({
                packageName: 抖音包名,
                className: "com.ss.android.ugc.aweme.main.MainActivity",
                action: "android.intent.action.VIEW",
                root: true,
                flags: ["activity_new_task"],
            })
            var 拍摄按钮 = desc("拍摄，按钮").findOne(10000)
            if (拍摄按钮) {
                log("抖音打开成功")
                return true
            } else {
                app.openAppSetting(抖音包名)
                log("查找强行停止")
                text("强行停止").findOne().click()
                let qd = text("确定").findOne(2000)
                qd ? qd.click() : log("已关闭")
                sleep(2000)
            }

        }
        return false
    }

    function 有多段视频的按钮的视频选择(现在处理的视频序号) {
        var 视频列表 = className("android.support.v7.widget.RecyclerView").depth(9).findOne(15000)
        if (视频列表) {
            let 现有视频个数 = 视频列表.childCount()
            if (现有视频个数 <= 现在处理的视频序号) {
                log("处理完了")
                return 3
            } else {
                log("处理第" + (现在处理的视频序号 + 1) + "个视频")
                视频列表.child(现在处理的视频序号).click()
                return 1
            }
        } else {
            log("找不到视频列表")
            return 4
        }
    }


    function 有可同时选择视频与图片和下一步按钮的视频选择(现在处理的视频序号) {
        var 视频列表 = className("android.support.v7.widget.RecyclerView").depth(9).findOne(15000)
        if (视频列表) {
            let 现有视频个数 = 视频列表.childCount()
            if (现有视频个数 <= 现在处理的视频序号) {
                log("处理完了")
                return 3
            } else {
                var 选中按钮 = 视频列表.child(现在处理的视频序号).findOne(className("android.widget.FrameLayout"))
                if (选中按钮) {
                    选中按钮.click()
                    sleep(2000)
                    log("查找下一步")
                    var 下一步 = text("下一步").findOne()
                    if (下一步 && 下一步.clickable()) {
                        下一步.click()
                        return 1
                    } else {
                        return 4//返回4 代表本次错误
                    }
                } else {
                    return 4
                }
            }
        }
    }

    //
    function 视频选择(现在处理的视频序号) {
        var 拍摄按钮 = desc("拍摄，按钮").findOne(10000)
        if (拍摄按钮) {
            log("找到拍摄按钮")

            拍摄按钮.parent().parent().parent().click()
        } else {
            log("找不到拍摄按钮")
            return 1
        }
        sleep(2000)
        var 上传按钮 = text("上传").findOne(15000)
        if (上传按钮) {
            log("找到上传按钮")

            上传按钮.parent().parent().click()
        } else {
            log("找不到上传按钮")
            return 2
        }
        sleep(8000)
        var 视频列表 = className("android.support.v7.widget.RecyclerView").depth(9).findOne(15000)
        if (视频列表) {
            log("找到视频列表")
            if (text("多段视频").exists()) {
                log("多段视频视频选择")
                var 返回 = 有多段视频的按钮的视频选择(现在处理的视频序号)
                if (返回 == 3) {
                    return 3// 视频处理完成
                } else if (返回 == 1) {
                    log("本次选择视频ok")

                } else {
                    // log()
                }
            } else if (text("可同时选视频与图片").exists()) {
                log("可同时选视频与图片")
                var 返回 = 有可同时选择视频与图片和下一步按钮的视频选择(现在处理的视频序号)
                if (返回 == 3) {
                    return 3// 视频处理完成
                } else if (返回 == 1) {
                    log("本次ok")

                } else {
                    log("本次错误")
                }
            } else {
                log("设备未匹配")
            }
        } else {
            log("找不到视频列表")

        }
        sleep(2000)
        for (let index = 0; index < 3; index++) {
            var 剪切页下一步 = text("下一步").clickable().findOne(10000)
            if (剪切页下一步) {
                log("剪切页已点击")
                剪切页下一步.click()
                if( text("正在合成中").findOne(2000) || text("选配乐").exists()){
                    break;
                }
            } else {
                log("找不到剪切页下一步")
                return 5
            }
            
        }
        

        sleep(2000)
        var 计数器 = 0 ,合成检测 =false
        for (let index = 0; index < 1000; index++) {
            if (!text("正在合成中").exists()) {
                计数器 += 1
                log("计数器+1")
            } else {
                
                计数器 = 0
                log("计数器归0")
            }
            sleep(1000)
            if (计数器 > 7) {
                log("合成检测通过")
                合成检测 = true
                break;
            }
            if (text("选配乐").exists()) {
                log("已到达美化页")
                合成检测= true

                break;
            }
        }
        if (!合成检测) {
            log("合成失败")
            return 11
        }
        var 美化页下一步 = text("下一步").clickable().findOne(10000)
        if (美化页下一步) {
            美化页下一步.click()
        } else {
            log("找不到美化页下一步")
            return 6
        }
        sleep(2000)

        var 发布 = desc("发布").clickable().findOne(10000)
        if (发布) {
            var 保存本地按钮 = text("保存本地").className("android.widget.CheckBox").findOne(1000)
            if (保存本地按钮.checked()) {
                log("取消保存到本地")
                保存本地按钮.click()
                sleep(1000)
            }
            发布.click()
        } else {
            log("找不到发布")
            return 7
        }
        sleep(2000)
        var 拍摄按钮 = desc("拍摄，按钮").findOne(10000)//检测回到主页
        if (拍摄按钮) {
            log("本次上传成功")
            return 8//成功
        } else {
            log("本次上传失败")
            return 9
        }




    }

    //////////////以上为函数,下为功能
    if (!打开抖音()) {
        log("无法打开抖音,退出")
        exit()
    }

    for (let index = 0; index < 需要采集的个数; index++) {
        var 视频选择结果 = 视频选择(index)
        log("视频选择结果" + 视频选择结果)
        if (视频选择结果 == 3) {
            log("所有视频上传完成")
            log("上传个数:" + index)
            return true
        }
        var 计数器 = 0 ,上传检测 =false
        for (let index = 0; index < 1000; index++) {
            if (!textEndsWith("%").exists()) {
                计数器 += 1
                log("计数器+1")
            } else {
                计数器 = 0
                log("计数器归0")
            }
            sleep(1000)
            if (计数器 > 7) {
                log("上传检测通过")
                上传检测 = true
                break;
            }
        }
        if (!上传检测) {
            log("上传失败")
        }else{
            log("上传成功")
            
        }
    }
    log("达到需要采集的个数:"+需要采集的个数)
}

var 本次处理的文件 = []

function main() {
    // var 上传位置= dialogs.select("上传到哪",["快手","抖音"])
    var 上传位置 = 1
    threads.start(function () {
        while (true) {
            var list= ["取消","允许","跳过","我知道了","知道了"]
            for (let index = 0; index < list.length; index++) {
                var element = list[index];
                var 按钮 =  text(element).clickable().findOne(1)
                if (按钮) {
                    log(element)
                    按钮.click()
                    break;
                }
            }
            try {
                files.write("/sdcard/kuaishoucaiji.txt", new Date().getTime())
            } catch (error) {

            }

            sleep(3000)
        }
    })
    


    device.setMusicVolume(0)
    // device.setNotificationVolume(0)



    //授权
    if (!shouquan()) {
        toastLog("没有root权限,退出")
        exit()
    }
    //开启无障碍
    openAccessbility()
    device.keepScreenOn(2 * 3600 * 1000)
    打开微视()
    var 缓存描述 = 获取视频描述()
    while (true) {
        if (完成个数 >= 需要采集的个数) {
            if (上传位置 == 0) {
                打开快手上传视频()

            } else if (上传位置 == 1) {
                打开抖音上传视频()
            }
            log("上传完成")
            log("删除文件")
            // /sdcard/gifshow/" + 存储文件名 + ".mp4"
            log(本次处理的文件)

            本次处理的文件.forEach((存储文件名) => {
                var path = "/sdcard/gifshow/" + 存储文件名 + ".mp4";
                if (files.exists(path)) {
                    log("删除:" + path)
                    try {
                        log("删除:" + path + ":" + files.remove(path))
                    } catch (error) {
                        log(error)
                    }

                }
            })
            var where = MediaStore.Audio.Media.DATA + " like \"" + files.join(files.getSdcardPath(), "gifshow") + "%" + "\"";
            var i = context.getContentResolver().delete(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, where, null);
            exit()
        } else {
            log("已缓存个数:" + 完成个数)
        }
        if (缓存描述 == 获取视频描述()) {
            log("下滑")
            下滑()
            sleep(1000)
        } else {
            log("取赞")
            let 赞数 = 获取赞数()
            log(赞数)
            if (赞数 < 1000) {
                click(669 / 1080 * device.width, 1639 / 1920 * device.height)
                sleep(1000)
                let cc = text("复制链接").findOne(3000)
                if (cc) {
                    cc.parent().click()
                    sleep(1000)
                    let lianjie = getClip().split(">>")
                    log(lianjie)
                    var 文件名 = lianjie[0]
                    var 复制的链接 = lianjie[1]

                    var 解析结果 = iiiLab通用视频解析接口(复制的链接)
                    if (解析结果 && 解析结果.retCode == 200) {
                        var 视频地址 = 解析结果.data.video
                        下载视频同步(视频地址, 文件名)

                    }
                }
            }
            缓存描述 = 获取视频描述()
        }

        sleep(1000)

    }

}

function test() {

    打开抖音上传视频()



}

// var task_selectds=dialogs.select("功能选择",["开始","测试"])
var task_selectds = 0
if (task_selectds == 0) {
    main()
} else if (task_selectds == 1) {
    test()
}
