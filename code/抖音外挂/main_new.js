
importClass(android.content.Intent)
importClass(android.net.Uri)
importClass(java.io.File)
importClass(android.provider.MediaStore)
var myself_package_name
var yuedu_66_packagename
var all_text = new Array() //全局评论数组
console.setSize(350, 900)
console.show()
var pid = android.os.Process.myPid()
const app_loading_wait_count = 30 //打开快手/抖音  所等待的计数器
const guanzhu_x = 642, guanzhu_y = 492, guanzhu_zhongxin_x = 659, guanzhu_zhongxin_y = 496//关注的红色位置  和关注的中心白色位置
const guanzhu_tap_x = 670, guanzhu_tap_y = 450, open_guanzhu_x = 354, open_guanzhu_y =288//这里前面是关注的中心点,后面是打开关注页后的检测位置

const douyin_back_x = 50, douyin_back_y = 100
const dianzan_x = 652, dianzan_y = 610//点赞的位置
const comment_x = 652, comment_y = 740//评论的位置
const cd_x = 652, cd_y = 1085
var zhongxing_temp // 中性词评论

var current_task=null


var ra = new RootAutomator();
events.on('exit', function(){
  ra.exit();
});

// if (device.sdkInt < 24) {
//     toastLog("系统版本低，请升级系统至android 7.0 以上")
//     exit()
// }


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
    var ss
    if (device.sdkInt >= 24) {
        ss = press(x, y, 50)
    } else {
        ss= ra.press(x,y,100)
    }
    
    // sleep(200)
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
        app.launchPackage(yuedu_66_packagename)
        sleep(1000)
        if (text_or_desc("开始赚钱").clickable().findOne(timeout)) {
            toastLog("66阅读开启成功")
            var re = text_or_desc("开始赚钱").clickable().findOne().click()
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
function task_manger(){

}
function task_managers() {
    if (current_task == "抖音") {
        douyin()
        
    }else if(current_task == "快手"){
        kuaishou()
    }
}

function douyin() {
    re = text_or_desc("观看抖音视频").findOne(8000)
    if (re) {
        my_click(re.bounds().centerX(), re.bounds().centerY())
        log("观看抖音视频")
        var shouquan = text_or_desc("授权并登录").clickable().findOne(3000)
        if (shouquan) {
            log("发现授权并登录")
            shouquan.click()
            sleep(4000)
        } else {
            log("没发现授权并登录")

        }

        return
    } else {
        log("没找到观看抖音视频")
    }
}

function kuaishou() {
    re = text_or_desc("观看快手视频").findOne(8000)
    if (re) {
        my_click(re.bounds().centerX(), re.bounds().centerY())
        log("观看快手视频")
        var shouquan = text_or_desc("授权并登录").clickable().findOne(3000)
        if (shouquan) {
            log("发现授权并登录")
            shouquan.click()
            sleep(4000)
        } else {
            log("没发现授权并登录")

        }

        return
    } else {
        log("没找到观看快手视频")
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
        log("等待一段时间再开始")
        var ee = random(30, 50)
        for (let index = 0; index < ee; index++) {
            log("等待:" + (ee - index) + "秒")
            sleep(1000)

        }
        return "没找到领取任务"
    }

    re = my_click(re.bounds().centerX(), re.bounds().centerY())

    log("领取任务" + re)


    re = text_or_desc("任务要求：").findOne(15000)
    if (re) {
        log("任务要求：")
    } else {
        toastLog("15秒内无反应，66阅读可能卡死，关闭重进")
        return "66阅读卡死"
    }

    if (text_or_desc("1、关注").exists()) {
        log("关注任务")
        if (current_task == "抖音") {
            re = text_or_desc("打开“抖音”做任务").clickable().findOne().click()
        }else if(current_task == "快手"){
            re = text_or_desc("打开“快手”做任务").clickable().findOne().click()
        }
        log("打开"+current_task+"做任务")
        return 1
    } else if (text_or_desc("1、留言").exists()) {
        if (current_task == "抖音") {
            re = text_or_desc("打开“抖音”做任务").clickable().findOne().click()
        }else if(current_task == "快手"){
            re = text_or_desc("打开“快手”做任务").clickable().findOne().click()
        }
        log("关注加留言任务")
        log("打开"+current_task+"做任务")
        return 2
    } else if (text_or_desc("1、点赞").exists()) {
        if (current_task == "抖音") {
            re = text_or_desc("打开“抖音”做任务").clickable().findOne().click()
        }else if(current_task == "快手"){
            re = text_or_desc("打开“快手”做任务").clickable().findOne().click()
        }
        log("点赞任务")
        log("打开"+current_task+"做任务")
        return 3
    } else if (text_or_desc("1、点赞，2、关注，3、留言").exists()) {
        if (current_task == "抖音") {
            re = text_or_desc("打开“抖音”做任务").clickable().findOne().click()
        }else if(current_task == "快手"){
            re = text_or_desc("打开“快手”做任务").clickable().findOne().click()
        }
        log("1、点赞，2、关注，3、留言任务")
        log("打开"+current_task+"做任务")
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
        for (let index = 0; index < app_loading_wait_count; index++) {
            var img = images.captureScreen()
            var color = images.pixel(img, guanzhu_x, guanzhu_y);
            var color2 = images.pixel(img, guanzhu_zhongxin_x, guanzhu_zhongxin_y);
            var color3 = images.pixel(img, cd_x, cd_y);
            var color4 = images.pixel(img, dianzan_x, dianzan_y)//点赞的中心点
            if (colors.isSimilar(color, colors.parseColor("#ffff2b54"))) {
                log("抖音加载完成")
                return true
            }
            if (change_arr.indexOf(color3) == -1) {
                log("新颜色:" + index + "颜色" + color3)
                change_arr.push(color3)
            }
            if (change_arr.length > 8) {
                log("cd在转了")
                log("抖音加载完成")
                return true
            }

            sleep(random(1700, 2300))
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
function commmend(arg) {

    try {
        if (wait_douyin()) {
            if (!dianzan_guanzhu(arg)) {
                return false
            }
            var t = random(15, 25)
            for (let index = 0; index < t; index++) {
                log("休眠:" + (t - index) + "秒")
                sleep(1000)

            }
            return true
        } else {
            //TODO 放弃任务?
            log("抖音打开失败")
            shell("am force-stop com.ss.android.ugc.aweme", true)
            return false
        }
    } catch (error) {
        log(error)
        if (error == "该用户已点赞") {
            return true
        } else {
            throw error
        }
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
            return false
        }

    }
    // log(all_pl)
    if (count >= 2) {
        log("拼接评论")
        return all_pl[random(5, all_pl.length - 1)] + zx[random(0, zx.length - 1)] + "[" + bq[random(0, bq.length - 1)] + "]"

    } else {
        log("随机评论")
        return false
    }
    function caozuo() {
        var list = className("android.support.v7.widget.RecyclerView").depth(9).findOne(15000)
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
function comment() {
    function open_comment_page() {
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
    if (!open_comment_page()) {
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
    for (let index = 0; index < 30; index++) {
        var send = className("EditText").findOne()
        if (send.parent() && send.parent().childCount() == 4) {
            send.parent().child(3).click()
            log("发送完成")
            return true
        } else {
            log("本次查找错误")
        }
        sleep(200)
    }
    log("没找到发送按钮")
    return false
}


/**
 * 点赞关注
 * @param {}  /
 */
function dianzan_guanzhu(arg) {
    function open_guanzhu() {
        my_click(guanzhu_tap_x, guanzhu_tap_y)
        sleep(4000)
        for (let index = 0; index < 4; index++) {
            var img = images.captureScreen()
            var color = colors.red(img.pixel(open_guanzhu_x, open_guanzhu_y))
            if (color > 150) {
                my_click(douyin_back_x, douyin_back_y)//返回到抖音页面
                sleep(2000)
                return true
            } else {
                my_click(open_guanzhu_x, open_guanzhu_y)
                sleep(2000)
            }
        }
    }
    function check_img() {
        for (let index = 0; index < 5; index++) {
            var jiance = 0

            if (open_guanzhu()) {//判断关注否
                log("关注检测通过")
                jiance = jiance + 1
            } else {
                // var img = images.captureScreen()
                // log("当前颜色" + colors.red(img.pixel(guanzhu_x, guanzhu_y)))
                // log("关注检测未通过,点一下")
                // my_click(guanzhu_x, guanzhu_y)
            }
            img = images.captureScreen()
            if (colors.green(img.pixel(dianzan_x, dianzan_y)) < 150) {//判断点赞否
                log("点赞检测通过")
                jiance = jiance + 1
            } else {
                log("当前颜色" + colors.red(img.pixel(dianzan_x, dianzan_y)))
                log("点赞检测未通过,点一下")
                my_click(dianzan_x, dianzan_y)
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
            log("抖音打开失败")
            shell("am force-stop com.ss.android.ugc.aweme", true)
            return false
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
    sleep(500)
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
    if (current_task =="快手") {
        log("返回一下")
        back()
        sleep(1000)
    }
    function start_66() {
        for (let index = 0; index < 5; index++) {
            app.launchApp("66阅读")
            var re = text("提交任务").findOne(30 * 1000)
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
        for (let index = 0; index < 20; index++) {
            var img_arr = className("android.support.v7.widget.RecyclerView").findOne(1000)
            if (img_arr && img_arr.childCount() != 0 && img_arr.child(0).bounds().left < 100) {
                log("找到图片列表")
                sleep(2000)
                var mubiao = img_arr.child(count).bounds()
                log("图片位置:" + mubiao)

                my_click(mubiao.centerX(), mubiao.centerY())

                sleep(1000)
                break
            } else {
                log("没找到图片列表")
            }

        }

    }
    function wait_load(count) {
        sleep(2000)
        var count = count || 0
        for (let index = 0; index < 30; index++) {
            if (className("android.widget.ImageView").find().length == count + 1) {
                log("图片选择完成，等待10秒后上传")
                for (let index2 = 0; index2 < 10; index2++) {
                    if (text_or_desc("上传截图").clickable().findOne(10).bounds().centerY() > device.height * 0.6) {
                        log("加载完成")
                        sleep(2000)
                        break
                    }
                    sleep(1000)
                }

                return true
            }
            sleep(1000)
        }
        log("图片加载失败")
        return false
    }
    function up() {
        log("开始找上传截图按钮")
        text("上传截图").findOne()
        var shangchuan_arr = text("上传截图").clickable().find()
        for (let index = 0; index < shangchuan_arr.length; index++) {
            if (shangchuan_arr.length == 1) {
                shangchuan_arr[0].click()
                file_select(0)

                if (!wait_load()) {
                    return false
                }
                log("1张图,等待提交任务按钮")

                text_or_desc("提交任务").findOne().click()

                if (text_or_desc("请上传截图，再提交任务").findOne(3000)) {
                    return false
                } else {
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

        text_or_desc("提交任务").findOne().click()

        if (text_or_desc("请上传截图，再提交任务").findOne(3000)) {
            return false
        } else {
            return true
        }
    }


    if (start_66() == 2) {
        log("5次开启66阅读失败,重新开始任务")
        return 0
    }
    if (!up()) {
        log("第一次尝试上传失败，再试一次")
        text_or_desc("确定").clickable().findOne().click()
        if (up()) {
            log("第二次成功")
        } else {
            log("第二次失败")
        }
    }

}


function douyin_点赞关注评论(result,image_name) {
    if (result == 1) {//1,点赞和关注   二进制第一位为点赞  第二位为关注
        if (!commmend(3)) {
            start_66_yuedu()
            task_managers()
            return false
        } //抖音点赞评论  11 =3
        sleep(2000)
        image_name.push(jietu_save())//截图点赞和关注
    } else if (result == 2) {//
        if (!commmend(2)) {
            start_66_yuedu()
            task_managers()
            return false

        } //抖音点赞评论
        sleep(2000)
        image_name.push(jietu_save())//截图点赞和关注
        comment()//评论
        sleep(2000)
        image_name.push(jietu_save())//截图评论
    } else if (result == 3) {//点赞  10 = 2
        if (!commmend(2)) {
            start_66_yuedu()
            task_managers()
            return false

        }
        sleep(2000)
        image_name.push(jietu_save())//截图点赞

    } else if (result == 4) {//
        if (!commmend(3)) {
            start_66_yuedu()
            task_managers()
            return false

        }
        sleep(2000)
        image_name.push(jietu_save())//截图点赞和关注
        comment()//评论
        sleep(2000)
        image_name.push(jietu_save())//截图评论
    } else {
        log("未知任务")
        start_66_yuedu()
        task_managers()
        return false

    }
}



function kuaishou_点赞关注评论(result) {
    /**
     * 等待快手加载完成
     */
    function wait_kuaishou() {
        var color_count = 0
        var color_temp = []
        for (let index = 0; index < app_loading_wait_count; index++) {
            if (text("关注").findOne(10) && id("like_layout").desc("喜欢").findOne(10)) {
                return true
            }
            let img  = images.captureScreen()
            let x = device.width / 2
            let y= device.height /2
            let color = images.pixel(img,x,y)
            if (color_temp.indexOf(color ) == -1) {
                color_temp.push(color)
            }
            if (color_temp.length > 8 ) {
                log("加载完成了")
                return true
            }
            sleep(1500)
        }
        return false
    }
    /**
     * 点赞关注,如果操作失败则返回false
     * @param {*} 
     */
    function dianzan_guanzhu() {
        var dianzan_flg = false,guanzhu_flg = false
        for (let index = 0; index < 3; index++) {
            let dianzan = id("like_layout").desc("喜欢").findOne(10000)
            let guanzhu=  text("关注").findOne(3000)
            if (dianzan) {
                if (!dianzan.selected()) {//没被选中
                    log("点一下  点赞")
                    dianzan.click()
                }else{
                    log("点赞检测通过")
                    dianzan_flg = true
                }
            }else{
                log("找不到点赞按钮")
            }
            if (guanzhu) {
                let par =  guanzhu.parent().parent()
                if (par.clickable()) {
                    log("点一下关注")
                    par.click()
                } else {
                    log("关注按钮不能点击")
                }
            } else {
                log("找不到关注按钮")
                guanzhu_flg = true
            }
            if (dianzan_flg && guanzhu_flg ) {
                return true
            }
            sleep(2000)
        }
    }



    /**
     * 评论函数
     *
     */
    function get_yuanlaide_comment() {


        var get_comment_list = []
        for (let index = 0; index < 3; index++) {
            let root_element = id("recycler_view").findOne(5000)
            if (!root_element) {
                log("找不到评论列表")
                return false
            }
            let child_list = root_element.find(className("android.widget.RelativeLayout"))
            child_list.forEach((element) => {
                try {
                    let text_info = element.child(2).child(0).desc()
                    let jianqie = text_info.split(" ")
                    jianqie.pop()
                    let new_str = jianqie.join(',')
                    // log(new_str)
                    get_comment_list.push(new_str)
                } catch (error) {
    
                }
            })
            let a = root_element.scrollForward()
            if (!a) {
                log("到底了,没3页")
                return false
            }
            sleep(2000)
        }
        // get_comment_list
        desc("说点什么...").findOne().click()
        editable().findOne().setText(get_comment_list[random(0,get_comment_list.length-1)]+zhongxing_temp[random(0,zhongxing_temp.length-1)]+"[赞]")
        text("发送").findOne().click()
    
        for (let index = 0; index < 20; index++) {
            let zan= id("number_like").findOne(1000)
            if (zan) {
                if (zan.bounds().top > 200 && zan.bounds().top <600) {
                    return true
                }else{
                    if (zan.bounds().top < 200) {
                        swipe(device.width/2,device.height/2,device.width/2,device.height/3*2,300)
                        sleep(2000)
                    }else if(zan.bounds().top>600){
                        swipe(device.width/2,device.height/2,device.width/2,device.height/3,300)
                        sleep(2000)
                    }
                }
            }else{
                let bianjikuang =  desc("说点什么...").findOne(1000)
                if (bianjikuang) {
                    if (bianjikuang.bounds().top <1200) {//往上
                        swipe(device.width/2,device.height/3,device.width/2,device.height/3*2,300)
                        sleep(2000)
                    }else{
                        //往下
                        swipe(device.width/2,device.height/3*2,device.width/2,device.height/3,300)
                        sleep(2000)
                    }
                }
                
            }
        }
        //// 执行到这里说明没有把评论后的页面调整到一个合适的位置,不能截图
        //
        return false
    }
    //以上是函数
    /////////////////////////////////
    ///这里是功能区
    let wait_result  = wait_kuaishou()
    if (!wait_result) {
        log("快手打开失败")
        return false
    }
    let wait_dianzan_and_guanzhu = dianzan_guanzhu()
    if(!wait_dianzan_and_guanzhu){
        log("点赞关注失败")
        return false
    }
    if (result ==2 || result==4) {
        let wait_comment_result = get_yuanlaide_comment()
        if (!wait_comment_result ) {
            log("评论失败")
            return false
        }
    }
    
    return true// 都成功了,返回true
}


function loop() {
    var image_name = []
    while (true) {
        var result = task_start()
        if (result == "66阅读卡死" || result == "没找到领取任务") {
            start_66_yuedu()
            task_managers()
            continue
        }
        threads.shutDownAll()
        var thread = threads.start(function () {
            // if (text_or_desc("请完成下列验证后继续").findOne()) {
            //     log("发现验证,退出")
            //     exit()
            // } 

        })
        if (current_task=="抖音" ) {
            let result= douyin_点赞关注评论(result,image_name)
            if (!result) {
                continue
            }
        }else if(current_task=="快手") {
            if(!kuaishou_点赞关注评论(result)){//快手打开失败
                continue
            }else{//截图保存
                image_name.push(jietu_save())
            }
        }
        try {
            thread.interrupt()
            log("验证监听结束")
        } catch (error) {
            //log(error)
        }
        var up_su = up_image(result)
        if (up_su == 0) {
            start_66_yuedu()
            task_managers()
            continue
        }
        sleep(1000)
        if (text_or_desc("请上传截图，再提交任务").exists()) {
            log("图片加载失败")
            start_66_yuedu()
            task_managers()
            continue
        }
        function delete_image() {
            if (myself_package_name == "org.autojs.autojspro" || true) {
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
        }
        delete_image()
        sleep(5000)



        var currenttime = random(15, 20)
        for (let index = 1; index < currenttime; index += 2) {
            toastLog("休眠中,剩余" + (currenttime - index) + "秒")
            sleep(2500)
        }

    }
}

function main() {
    //初始化值
    myself_package_name = context.getPackageName()
    log(myself_package_name)
    yuedu_66_packagename = app.getPackageName("66阅读")
    log(yuedu_66_packagename)
    init_comment()//初始化评论
    
    current_task = "快手"
    // current_task = "抖音"
    

    zhongxing_temp = get_zxc() //初始化中性词评论

    var jiance_threads = threads.start(function () {
        while (true) {
            linux文件句柄数量检测()
            sleep(5000)
        }
    })
    log("检测进程句柄的线程:" + jiance_threads)

    //授权
    if (!shouquan()) {
        toastLog("没有root权限,退出")
        exit()
    }
    //开启无障碍
    openAccessbility()
    device.keepScreenOn(2 * 3600 * 1000)
    !function () {
        for (let index = 0; index < 30; index++) {
            if (auto.service) {
                log("无障碍开启成功")
                return true
            }
            sleep(1000)
        }
        toastLog("使用代码开启无障碍失败,请手动开启无障碍后再次运行本应用")
        exit()
    }();
    if (!start_66_yuedu()) {
        toastLog("66阅读开启失败,退出")
        exit()
    }
    task_managers()
    loop()


}



function test() {
    zhongxing_temp = get_zxc()
    var re
    //657，602
    sleep(2000)
    //657,410  点开人物信息
    var img = images.captureScreen()
    // var xt = images.read(files.getSdcardPath() + "/脚本/抖音外挂/gz.png")
    // var re = images.findImage(img, xt)
    log(re)
    //310,325
    var color = images.pixel(img, 480, 325);
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
