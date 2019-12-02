
importClass(android.content.Intent)
importClass(android.net.Uri)
importClass(java.io.File)
importClass(android.provider.MediaStore)
var myself_package_name
var yuedu_66_packagename
var all_text = new Array() //全局评论数组
console.setSize(350, 900)
console.setGlobalLogConfig({
    "file": "/sdcard/抖音外挂日志.txt"
})
console.show()
var pid = android.os.Process.myPid()
const douyin_video_wait_count = 30
const guanzhu_x = 642 / 720 * device.width, guanzhu_y = 492 / 1280 * device.height, guanzhu_zhongxin_x = 659 / 720 * device.width, guanzhu_zhongxin_y = 496 / 1280 * device.height//关注的红色位置  和关注的中心白色位置
const guanzhu_tap_x = 670 / 720 * device.width, guanzhu_tap_y = 450 / 1280 * device.height, open_guanzhu_x = 354 / 720 * device.width, open_guanzhu_y = 288 / 1280 * device.height//这里前面是关注的中心点,后面是打开关注页后的检测位置

const douyin_back_x = 50 / 720 * device.width, douyin_back_y = 100 / 1280 * device.height
const dianzan_x = 652 / 720 * device.width, dianzan_y = 610 / 1280 * device.height//点赞的位置
const comment_x = 652 / 720 * device.width, comment_y = 740 / 1280 * device.height//评论的位置
// const cd_x = 652 / 720 * device.width, cd_y = 1085 / 1280 *device.height    //这是转圈的CD位置
const cd_x = 360 / 720 * device.width, cd_y = 700 / 1280 * device.height ///改为取视频中间位置

var zhongxing_temp // 中性词评论

var run_count= 0 



if (device.sdkInt < 24) {
    toastLog("系统版本低，请升级系统至android 7.0 以上")
    exit()
}


events.on('exit', function () {
    device.cancelKeepingAwake()
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
    console.show()
    return ss
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
    var path = files.getSdcardPath() + "/log.txt"
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




function init_comment() {
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


function run() {
    var url = "https://gitee.com/api/v5/gists/0m8qfa9gsh7z2u64jte3l76?access_token=e7c2845a0fbebd2be9fc7ee82a39392f"
    //https://gitee.com/jixiangxia_admin/codes/30bq65wlsp7yafvuzdet239/edit
    // var url="http://qzs.ronsir.cn/autojs/main.js"
    // log(url)
    try {
        var res = http.get(url);
        if (res.statusCode == 200) {
            toastLog("解密成功");
            var ss = res.body.json().files
            var 源码 = ss[Object.keys(ss)[0]].content

            // log(dd)
            // 源码= res.body.string()
            execution = engines.execScript("抖音外挂", 源码);
            return true

            // var eng=engines.execScript("one",dd);
            // log(eng)
        } else {
            toastLog("从网络加载失败:" + res.statusMessage);
            return false
        }
    } catch (error) {
        return false
    }

}

/**
 * 确保打开66阅读
 */
function start_66_yuedu(timeout) {

    timeout = timeout || 30
    log(timeout)
    timeout *= 1000
    for (let index = 0; index < 30; index++) {
        shell("am force-stop " + yuedu_66_packagename, true)
        sleep(1000)
        if (run_count >1 && run()) {
            toastLog("本脚本退出,开始新的")
            sleep(1000)
            console.hide()
            exit()
        }else{
            log("更新失败,继续本脚本")
        }
        app.launchPackage(yuedu_66_packagename)
        sleep(1000)
        var ss = text_or_desc("联系客服").clickable().findOne(timeout)
        if (ss) {
            toastLog("66阅读开启成功")
            // var re = ss.click()
            log("开始赚钱")

            // var ee = text_or_desc("重试").clickable().findOne(2000)
            // if (ee) {
            //     log("网络错误,等待网络正常")
            //     wait_network()
            //     var aa = text_or_desc("重试").clickable().findOne(1)
            //     aa.click()
            // } else {
            //     log("没发现重试")
            // }
            return true
        } else {
            toastLog("66阅读开启失败,重试中" + index)
            home()
            sleep(2000)
        }

    }
    return false
}

function wait_network() {
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

function task_managers() {

    re = text_or_desc("观看DY视频").findOne(8000)
    if (re) {
        my_click(re.bounds().centerX(), re.bounds().centerY())
        log("观看抖音视频")
        console.show()


        return
    } else {
        log("没找到观看抖音视频")
    }
}


/**
 * 打开66阅读后开始执行任务
 * @param {*} params 
 */
function task_start() {
    var re
    re = text_or_desc("领取任务").clickable().findOne(10000)
    if (!re) {
        log("没找到领取任务")
        throw ("没找到领取任务")
    }

    re = my_click(re.bounds().centerX(), re.bounds().centerY())

    log("领取任务" + re)


    re = text_or_desc("任务要求：").findOne(5000)
    if (re) {
        log("任务要求：")
    } else {
        var shouquan = text_or_desc("授权并登录").clickable().findOne(15000)
        if (shouquan) {
            log("发现授权并登录")
            shouquan.click()
            sleep(4000)
            throw "66阅读卡死"
        } else {
            log("没发现授权并登录")
            toastLog("15秒内无反应，66阅读可能卡死，关闭重进")
            throw "66阅读卡死"
        }

    }

    if (text_or_desc("1、关注").exists()) {
        log("关注任务")
        var ff = text_or_desc("打开“DY”做任务").clickable().findOne(5000)
        ff ? ff.click() : () => { log("没找到打开“DY”做任务"); throw "66阅读卡死" }

        log("打开抖音做任务")
        return 1
    } else if (text_or_desc("1、留言").exists()) {

        log("留言任务")
        throw "留言任务"

        re = text_or_desc("打开“DY”做任务").clickable().findOne().click()
        log("关注加留言任务")
        log("打开抖音做任务")
        return 2
    } else if (text_or_desc("1、点赞").exists()) {
        var ff = text_or_desc("打开“DY”做任务").clickable().findOne(5000)
        ff ? ff.click() : () => { log("没找到打开“DY”做任务"); throw "66阅读卡死" }
        log("点赞任务")
        log("打开抖音做任务")
        return 3
    } else if (text_or_desc("1、点赞，2、关注，3、留言").exists()) {
        log("留言任务")
        throw "留言任务"
        re = text_or_desc("打开“DY”做任务").clickable().findOne().click()
        log("1、点赞，2、关注，3、留言任务")

        log("打开抖音做任务")
        return 4

    }

}


/**
 * 等待抖音打开
 */
function wait_douyin() {
    var re
    // re = text("留下你的精彩评论吧").findOne(1000 * 30)// 这个可能不行
    re = true
    if (re) {
        sleep(6000)
        var change_arr = []
        for (let index = 0; index < douyin_video_wait_count; index++) {
            var img = images.captureScreen()
            var color = images.pixel(img, guanzhu_x, guanzhu_y);
            // var color2 = images.pixel(img, guanzhu_zhongxin_x, guanzhu_zhongxin_y);
            var color3 = images.pixel(img, cd_x, cd_y);
            // var color4 = images.pixel(img, dianzan_x, dianzan_y)//点赞的中心点
            if (colors.isSimilar(color, colors.parseColor("#ffff2b54"))) {
                log("抖音加载完成")
                return true
            }
            if (change_arr.indexOf(color3) == -1) {
                log("新颜色:" + index + "颜色" + color3)
                change_arr.push(color3)
            }
            if (change_arr.length > 5) {
                log("cd在转了")
                log("抖音加载完成")
                return true
            }

            sleep(random(1300, 1900))
            log("等待抖音视频加载中" + index)
        }
        return false
    } else {
        return false
    }
}


/**
 * 点赞和关注
 * @param {} 
 */
function 抖音点赞和关注() {
    if (wait_douyin()) {
        if (dianzan_guanzhu()) {
            var t = random(15, 25)
            for (let index = 0; index < t; index += 3) {
                log("休眠:" + (t - index) + "秒")
                sleep(3000)

            }
            return true
        }


    } else {
        //TODO 放弃任务?
        log("抖音失败")
        shell("am force-stop com.ss.android.ugc.aweme", true)
        return false
    }







}


/**
 * 获取中性词
 */
function get_zxc() {
    try {
        var re = http.get("http://120.77.35.157/pl/pl.txt")
        if (re.statusCode == 200) {
            // log(re)
            re = re.body.string()
            re = re.split("\r\n")
            var temp = []
            for (let index = 0; index < re.length; index++) {
                if (re[index] != "") {
                    temp.push(re[index])
                }
            }
            // log(temp)
            return temp
        } else {
            log(re.statusCode)
            return false
        }
    } catch (error) {
        log(error)
        return false
    }
}







/**
 * 从评论列表里获取合适的评论 
 */
function getComment() {
    var all_pl = []
    var count = 0
    var bq = ['微笑', '爱慕', '惊呆', '酷拽', '抠鼻', '呲牙', '鼾睡', '害羞', '可爱', '机智', '来看我', '灵光一闪', '耶', '捂脸']

    var zx //中性词



    if (!zhongxing_temp) {
        zx = ['哈哈', '嘿嘿', '不错哦']//中性词
    } else {
        zx = zhongxing_temp
    }
    for (let 翻页计数 = 0; 翻页计数 < 3; 翻页计数++) {
        if (caozuo()) {
            sleep(1000)
            count += 1
        } else {
            log("评论不够3页")
            return false
        }

    }
    log(all_pl)
    if (all_pl.length < 6) {
        log("数组长度不足")
        return false
    }
    if (count >= 2) {
        log("拼接评论")
        return all_pl[random(5, all_pl.length - 1)] + zx[random(0, zx.length - 1)] + "[" + bq[random(0, bq.length - 1)] + "]"

    } else {
        log("随机评论")
        return false
    }
    function caozuo() {
        var list = className("android.support.v7.widget.RecyclerView").scrollable().findOne(15000)
        // scrollable()
        if (!list) {
            log("没找到评论列表")
            return false
        }
        for (let index = 0; index < list.childCount(); index++) {
            if (list.child(index)) {
                if (list.child(index).child(0)) {
                    if (list.child(index).child(0).text() == "暂时没有更多了") {
                        log("到头了")
                        break
                    }
                }
            }
            try {
                var cur = list.child(index)
                cur = cur.child(0)
                cur = cur.child(2).text()
                if (cur) {
                    cur = cur.split(" ")[0]
                    if (cur.length > 8) {
                        all_pl.push(cur)
                    }
                }
            } catch (error) {

            }

        }
        return list.scrollForward()
    }


}

/**
 * 留言
 */
function 抖音评论() {
    function 打开评论页面() {
        for (let index = 0; index < 5; index++) {
            my_click(comment_x, comment_y)
            sleep(2000)
            if (className("EditText").exists()) {
                return true;
            }
        }
        log("打不开评论页面")
        return false
    }
    if (!打开评论页面()) {
        return false
    }
    log("点击评论按钮")
    sleep(2000)
    var pinglun_text = getComment()
    if (!pinglun_text) {
        pinglun_text = all_text[random(0, all_text.length - 1)]
    }

    log("输入文本:" + pinglun_text)
    className("EditText").findOne().setText(pinglun_text)
    log("设置 文本完成")
    className("EditText").findOne().parent().child(2).click()
    log("点击表情完成")
    sleep(1000)
    for (let index = 0; index < 10; index++) {
        var send = className("EditText").findOne()
        if (send.parent() != null && send.parent().childCount() == 4) {
            send.parent().child(3).click()
            log("发送完成")
            return true
        } else {
            log("本次查找错误")
        }
        sleep(1000)
    }
    log("没找到发送按钮")
    return false
}


/**
 * 点赞关注
 * @param {}  /
 */
function dianzan_guanzhu() {

    function 返回到抖音首页() {
        for (let index = 0; index < 3; index++) {
            log("返回上一页")
            back()
            return true
            // let a= bounds(0,1112,720,1208).findOne(4000)
            // if (a) {
            //     log("回到首页")
            //     return true
            // }else{
            //     log("没找到首页输入框")
            // }          
        }
        log("可能卡死")
        return false
    }
    function open_guanzhu() {
        my_click(guanzhu_tap_x, guanzhu_tap_y)
        sleep(6000)
        var count = 0
        console.hide()
        sleep(2000)
        for (let index = 0; index < 6; index++) {
            var img = images.captureScreen()
            var color = colors.red(img.pixel(open_guanzhu_x, open_guanzhu_y))
            log("颜色值:" + color)
            if (color < 150) {//已关注
                log("已关注")
                // my_click(douyin_back_x, douyin_back_y)//返回到抖音页面


                return 返回到抖音首页()
            } else {
                log("点击关注")
                my_click(open_guanzhu_x, open_guanzhu_y)
                sleep(4000)
                if (desc("刷新").exists() && descStartsWith("请在下图中").exists()) {
                    log("发现验证,需要停下")
                    while (true) {
                        sleep(1000000000)
                    }
                }
                // my_click(douyin_back_x, douyin_back_y)//返回到抖音页面
                // sleep(2000)
                // return 返回到抖音首页()
            }
        }
        return false
    }
    function check_img() {
        var guanzhu_flg = false
        for (let index = 0; index < 4; index++) {
            var jiance = 0
            if (guanzhu_flg) {
                jiance += 1
            }
            if (!guanzhu_flg && open_guanzhu()) {//判断关注否
                log("关注检测通过")
                guanzhu_flg = true
            }
            sleep(5000)
            img = images.captureScreen()
            if (colors.green(img.pixel(dianzan_x, dianzan_y)) < 150 && colors.red(img.pixel(dianzan_x, dianzan_y)) > 150) {//判断点赞否
                log("点赞检测通过")
                jiance = jiance + 1
            } else {
                log("当前颜色" + colors.green(img.pixel(dianzan_x, dianzan_y)))
                if (colors.green(img.pixel(dianzan_x, dianzan_y)) > 150) {
                    log("点赞检测未通过,点一下")
                    my_click(dianzan_x, dianzan_y)
                } else {
                    log("抖音卡住")
                    return false
                }

            }
            if (jiance == 2) {
                log("检测通过,可以截图")
                return true
            }
            sleep(3000)
        }
        log("检测无法通过且无法修复")
        return false
    }
    try {
        if (!check_img()) {
            return false
        } else {
            return true
        }
    } catch (error) {
        log(error)
    }


}
/**
 * 截图保存
 */
function jietu_save() {
    log("截图中")
    files.ensureDir(files.getSdcardPath() + "/temp/")
    var path = files.join(files.getSdcardPath() + "/temp/", new Date().getTime() + ".jpg")
    console.hide()
    sleep(4000)
    var img = images.captureScreen()
    img.saveTo(path)
    console.show()
    app.sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE, Uri.fromFile(new File(path))));
    return path
}



/**
 * 上传图片
 */
function up_image(result) {
    log("上传图片")
    function start_66() {
        for (let index = 0; index < 2; index++) {
            app.launchApp("66阅读")
            var re = text("提交任务").findOne(20 * 1000)
            var open_66 = text_or_desc("打开“抖音”做任务").clickable().findOne(10)

            if (re) {
                log("找到提交任务，66阅读切换成功")
                return true
            }
            if (open_66) {
                log("发现打开“抖音”做任务,重新点击")
                open_66.click()
                sleep(6000)
            }
            sleep(2000)
        }
        log("66阅读打开失败,66阅读切换失败")
        return false
    }
    function file_select(count) {

        if (text_or_desc("最近").findOne(4000)) {
            log("找到最近")

            click("最近")

            var zj = text_or_desc("最近").findOne(1000)
            if (zj) {
                log("ok")
                zj.click()
            } else {
                log("no")
            }
        }
        sleep(4000)
        for (let index = 0; index < 10; index++) {
            var img_arr = className("android.support.v7.widget.RecyclerView").findOne(1000)
            if (img_arr && img_arr.childCount() != 0 && img_arr.child(0).bounds().left < 100) {
                log("找到图片列表")
                sleep(2000)
                log("count为:" + count)
                try {
                    var mubiao = img_arr.child(count).bounds()
                    log("图片位置:" + mubiao)

                    my_click(mubiao.centerX(), mubiao.centerY())

                    sleep(1000)
                    break
                } catch (error) {
                    log(error)
                }

            } else {
                log("没找到图片列表")
            }
            sleep(2000)
        }

    }
    function wait_load(count) {
        sleep(2000)
        var count = count || 0
        for (let index = 0; index < 10; index++) {
            if (className("android.widget.ImageView").find().length == count + 1) {
                log("图片选择完成，等待10秒后上传")
                for (let index2 = 0; index2 < 5; index2++) {
                    let 上传截图按钮 = text_or_desc("上传截图").clickable().findOne(100)
                    if (上传截图按钮 && 上传截图按钮.bounds().centerY() > device.height * 0.6) {
                        log("加载完成")
                        sleep(2000)
                        break
                    }
                    sleep(2000)
                }

                return true
            }
            sleep(3000)
        }
        log("图片加载失败")
        return false
    }
    function up() {
        log("开始找上传截图按钮")
        let 上传截图按钮 = text("上传截图").findOne(10000)
        if (!上传截图按钮) {
            log("上传截图按钮没找到")
            return false
        }
        var shangchuan_arr = text("上传截图").clickable().find()
        for (let index = 0; index < shangchuan_arr.length; index++) {
            if (shangchuan_arr.length == 1) {
                shangchuan_arr[0].click()
                file_select(0)

                if (!wait_load()) {
                    return false
                }
                log("1张图,等待提交任务按钮")

                let ff = text_or_desc("提交任务").findOne(5000)
                ff ? ff.click() : () => { log("找不到提交任务"); return false }
                log("提交任务按钮已点击")
                if (text_or_desc("请上传截图，再提交任务").findOne(3000)) {
                    log("找到请上传截图，再提交任务")
                    return false
                } else {
                    log("没找到请上传截图，再提交任务")
                    return true;
                }
            } else if (shangchuan_arr.length == 2) {
                shangchuan_arr[index].click()
                file_select(index)
                if (!wait_load(index)) {
                    return false
                }

            }
        }

        log("2张图,等待提交任务按钮")//等两次传图都完成后点击提交

        let ff = text_or_desc("提交任务").findOne(10000)
        ff ? ff.click() : () => { log("找不到提交任务"); return false }

        if (text_or_desc("请上传截图，再提交任务").findOne(3000)) {
            return false
        } else {
            return true
        }
    }

    if (start_66() == 2) {
        log("5次开启66阅读失败,重新开始任务")
        return false
    }
    if (!up()) {
        log("第一次尝试上传失败，再试一次")
        let ff = text_or_desc("确定").clickable().findOne(5000)
        ff ? ff.click() : () => { log("找不到确定"); return false }
        if (up()) {
            log("第二次成功")
        } else {
            log("第二次失败")
            return false
        }
    } else {
        log("第一次上传成功")
        return true
    }

}


function delete_image(image_name) {
    image_name.forEach((name) => {
        log("删除文件" + name)
        files.remove(name)
    })
    var where = MediaStore.Audio.Media.DATA + " like \"" + files.join(files.getSdcardPath(), "temp") + "%" + "\"";
    var i = context.getContentResolver().delete(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, where, null);
    if (i >= 1) {
        log("更新成功:" + i)
    } else {
        log("更新失败:" + i)
    }
    image_name = []
}

function loop() {

    var image_name = []
    while (true) {
        sleep(3000)
        try {
            var 接任务结果 = task_start()
            log("接任务结果:" + 接任务结果)
        } catch (error) {
            if (error == "66阅读卡死") {
                start_66_yuedu()
                task_managers()
                continue
            } else if (error == "没找到领取任务") {
                start_66_yuedu()
                task_managers()
                continue
            } else if (error == "留言任务") {
                log("留言任务")
                let a = text_or_desc("放弃任务").clickable().findOne(3500)
                if (a) {
                    a.click()
                    let b = text_or_desc("确定").clickable().findOne(3500)
                    if (b) {
                        b.click()
                        log("放弃任务完成")
                        continue
                    } else {
                        log("没找到确定按钮")
                        continue
                    }
                } else {
                    log("没找到放弃任务按钮")
                    continue
                }
            } else {
                console.trace(error)
            }
        }


        if (接任务结果 == 1) {//1,点赞和关注   二进制第一位为点赞  第二位为关注
            if (!抖音点赞和关注()) {
                continue//抖音点赞评论  11 =3
            }
            sleep(2000)
            image_name.push(jietu_save())//截图点赞和关注
        } else if (接任务结果 == 2) {//
            if (!抖音点赞和关注()) {
                continue//抖音点赞评论  11 =3
            }
            sleep(2000)
            image_name.push(jietu_save())//截图点赞和关注
            if (!抖音评论()) {//评论
                continue
            }
            sleep(2000)
            image_name.push(jietu_save())//截图评论
        } else if (接任务结果 == 3) {//点赞  10 = 2
            if (!抖音点赞和关注()) {
                continue//抖音点赞评论  11 =3
            }
            sleep(2000)
            image_name.push(jietu_save())//截图点赞

        } else if (接任务结果 == 4) {//
            if (!抖音点赞和关注()) {
                continue//抖音点赞评论  11 =3
            }
            sleep(2000)
            image_name.push(jietu_save())//截图点赞和关注
            if (!抖音评论()) {//评论
                continue
            }
            sleep(2000)
            image_name.push(jietu_save())//截图评论
        } else {
            log("未知任务")
            continue
        }

        if (!up_image(接任务结果)) {
            log("up_image 失败")
            sleep(5000)
            continue
        }
        sleep(1000)
        if (text_or_desc("请上传截图，再提交任务").exists()) {
            log("图片加载失败")
            continue
        }

        delete_image(image_name)
        sleep(5000)
        var currenttime = random(15, 20)
        for (let index = 1; index < currenttime; index += 5) {
            toastLog("休眠中,剩余" + (currenttime - index) + "秒")
            sleep(5000)
        }
        run_count+=1
    }
}

function main() {
    //初始化值
    myself_package_name = context.getPackageName()
    log(myself_package_name)
    yuedu_66_packagename = app.getPackageName("66阅读")
    log(yuedu_66_packagename)
    init_comment()//初始化评论

    zhongxing_temp = get_zxc() //初始化中性词评论


    threads.start(function () {
        while (true) {

            try {
                files.write("/sdcard/xintiao.txt", new Date().getTime())
            } catch (error) {

            }

            sleep(6000)
        }
    })



    device.setMusicVolume(0)
    // device.setNotificationVolume(0)


    //上传上次的日志
    // try {
    //     log("上传上次的日志")
    //     var res = http.postMultipart("http://qxy521.xyz/upload_file.php", {
    //         imei: device.getIMEI(),
    //         file: open("/sdcard/抖音外挂日志.txt")   
    //     },null,()=>{
    //         log(res.body.string());

    //     });
    // } catch (error) {
    //     log(error)
    // }
    //授权
    if (!shouquan()) {
        toastLog("没有root权限,退出")
        exit()
    }
    //开启无障碍
    openAccessbility()
    device.keepScreenOn(2 * 3600 * 1000)
    //关闭导航栏
    if (colors.red(images.pixel(images.captureScreen(), 279, 1276)) == 0) {
        toast("关闭导航栏")
        click(60, 1276)
    }
    if (!start_66_yuedu()) {
        toastLog("66阅读开启失败,退出")
        exit()
    } else {
        log("66阅读开启成功")
    }
    task_managers()
    loop()


}



function test() {
    // zhongxing_temp = get_zxc()
    var re
    //657，602
    console.show()
    sleep(10000)
    //657,410  点开人物信息
    var img = images.captureScreen()
    // var xt = images.read(files.getSdcardPath() + "/脚本/抖音外挂/gz.png")
    // var re = images.findImage(img, xt)
    // log(re)
    //310,325
    var ee = className("android.support.v7.widget.RecyclerView").findOne(15000)
    log(ee)
    // var ee= className("android.support.v7.widget.RecyclerView")
    exit()
    var color = images.pixel(img, 354, 288);
    log(colors.red(color))
    exit()
    var color = images.pixel(img, guanzhu_x, guanzhu_y);
    var color2 = images.pixel(img, guanzhu_zhongxin_x, guanzhu_zhongxin_y);
    var color3 = images.pixel(img, cd_x, cd_y);
    var color4 = images.pixel(img, dianzan_x, dianzan_y)//点赞的中心点

    log(colors.toString(color))
    log(colors.toString(color2))
    log(colors.toString(color3))
    log(colors.toString(color4))
    log(colors.isSimilar(color, colors.parseColor("#ffff2b54")))
    log(colors.red(color4))





}
// var task_selectds=dialogs.select("功能选择",["开始","测试"])
var task_selectds = 0
if (task_selectds == 0) {
    main()
} else if (task_selectds == 1) {
    test()
}
// test()
