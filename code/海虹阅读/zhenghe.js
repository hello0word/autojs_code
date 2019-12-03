
importClass(android.content.Intent)
importClass(android.net.Uri)
importClass(java.io.File)
importClass(android.provider.MediaStore)
var myself_package_name
var yuedu_66_packagename
var all_text = new Array() //全局评论数组
console.setSize(350, 900)
console.setGlobalLogConfig({
    file: "/sdcard/海虹阅读log.txt"
})
console.show()
log(app.autojs.versionName)
var pid = android.os.Process.myPid()
const app_loading_wait_count = 30 //打开快手/抖音  所等待的计数器
const guanzhu_x = 642, guanzhu_y = 492, guanzhu_zhongxin_x = 659, guanzhu_zhongxin_y = 496//关注的红色位置  和关注的中心白色位置
const guanzhu_tap_x = 670, guanzhu_tap_y = 450, open_guanzhu_x = 354, open_guanzhu_y = 288//这里前面是关注的中心点,后面是打开关注页后的检测位置

const douyin_back_x = 50, douyin_back_y = 100
const dianzan_x = 652, dianzan_y = 610//点赞的位置
const comment_x = 652, comment_y = 740//评论的位置
const cd_x = 652, cd_y = 1085
var zhongxing_temp // 中性词评论



var storage = storages.create("海虹阅读")

var current_task = storage.get("current_task", null)
var 本次没任务的标记 = storage.get("本次没任务的标记", false)



var 抖音验证 = false
var 抖音勾选 = storage.get("抖音勾选", false)
var 快手勾选 = storage.get("快手勾选", false)
var 评论文件位置 = storage.get("评论文件位置", "")
var 评论开关 = storage.get("评论开关", false)
var 当前选择的交替模式 = storage.get("交替模式", 0)
var 存储内容读取_时间间隔 = storage.get("时间间隔", "5")
var 存储内容读取_每成功 = storage.get("每成功", "3")
var 存储内容读取_每没任务 = storage.get("每没任务", "2")


//切换模式记录
var 成功计数 = storage.get("成功计数", 0)
var 没任务计数 = storage.get("没任务计数", 0)
var 开始任务时间 = storage.get("开始任务时间", null)



var ra = new RootAutomator();
events.on('exit', function () {
    ra.exit();
});




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
    for (let index = 0; index < timeout; index++) {
        if (!text("联系客服").exists()) {
            app.openAppSetting(yuedu_66_packagename)
            text("强行停止").findOne().click()
            let qd = text("确定").findOne(2000)
            qd ? qd.click() : log("已关闭")
            sleep(1000)
        }
        log("发送意图")
        app.startActivity({
            action: "android.intent.action.VIEW",
            packageName: yuedu_66_packagename,
            className: yuedu_66_packagename + ".MainActivity",
            flags: ["activity_new_task"],
            root: true,
        });
        sleep(4000)
        if (currentActivity() == "com.yxcorp.gifshow.detail.PhotoDetailActivity") {
            log("在快手页面")
            back()
            continue
        }
        if (text_or_desc("联系客服").clickable().findOne(8000) && text("任务中心").exists()) {
            toastLog("66阅读开启成功")
            return true
        }
        if (text_or_desc("重试").clickable().findOne(2000)) {
            log("网络错误,等待网络正常")
            wait_network()
            var aa = text_or_desc("重试").clickable().findOne(1)
            aa.click()
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
/**
 * 分配本次任务
 */
function task_managers() {
    function 切换(current_task) {
        if (current_task == "快手") {
            current_task = "抖音"
            log("切换到抖音任务")
        } else {
            current_task = "快手"
            log("切换到快手任务")
        }
        return current_task
    }
    if (抖音勾选 && 快手勾选) {
        if (当前选择的交替模式 == 0) {//没了就换
            if (本次没任务的标记) {
                log("没任务了")
                本次没任务的标记 = false
                current_task = 切换(current_task)
            } else {
                current_task = "抖音"
            }
        } else if (当前选择的交替模式 == 1) {//运行一定时间后切换(分钟)
            if (!开始任务时间) {
                开始任务时间 = new Date.getTime()
            } else {
                let 当前任务运行时间 = new Date.getTime() - 开始任务时间
                if (当前任务运行时间 > 存储内容读取_时间间隔 * 60 * 1000) {
                    log("任务运行时间到了,切换")
                    current_task = 切换(current_task)
                    开始任务时间 = new Date.getTime()
                }
            }
        } else if (当前选择的交替模式 == 2) {
            if (成功计数 >= parseInt(存储内容读取_每成功)) {
                log("已成功" + 存储内容读取_每成功 + "次,切换")
                current_task = 切换(current_task)
                成功计数 = 0
            }
        } else if (当前选择的交替模式 == 3) {
            if (没任务计数 >= 存储内容读取_每没任务) {
                log("已没任务" + 存储内容读取_每成功 + "次,切换")
                current_task = 切换(current_task)
                没任务计数 = 0
            }
        }
    } else if (!抖音勾选 && 快手勾选) {
        current_task = "快手"
    } else if (抖音勾选 && !快手勾选) {
        current_task = "抖音"
    } else if (!抖音勾选 && !快手勾选) {
        log("没有勾选任务,退出")
        exit()
    }


    if (current_task == "抖音") {
        douyin()

    } else if (current_task == "快手") {
        kuaishou()
    }

}

function douyin() {
    re = text_or_desc("观看DY视频").findOne(8000)
    if (re) {
        my_click(re.bounds().centerX(), re.bounds().centerY())
        log("观看抖音视频")

        return
    } else {
        log("没找到观看抖音视频")
    }
}

function kuaishou() {
    re = text_or_desc("观看KS视频").findOne(8000)
    if (re) {
        my_click(re.bounds().centerX(), re.bounds().centerY())
        log("观看快手视频")
        return
    } else {
        log("没找到观看快手视频")
    }
}

/**
 * 
 * @param {*} arr 数组
 * @param {*} timeout 毫秒
 */
function 多个状态分开检测(array, timeout) {
    var init_time = new Date().getTime()
    while (true) {
        if (new Date().getTime() - init_time > timeout) {
            return false
        }
        for (let index = 0; index < array.length; index++) {
            let words = array[index];
            let tmp = text(words).clickable().findOnce()
            if (tmp) {
                return { result: tmp, index: index }
            }
        }
    }

}



/**
 * 打开66阅读后开始执行任务
 * @param {*} params 
 */
function task_start() {
    if (current_task == "抖音") {
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
        var shouquan = text_or_desc("授权并登录").clickable().findOne(3000)
        if (shouquan) {
            log("发现授权并登录")
            shouquan.click()
            sleep(3000)
            re = text_or_desc("领取任务").clickable().findOne(10000)
            if (re) {
                my_click(re.bounds().centerX(), re.bounds().centerY())
                log("领取任务" + re)
            }else{
                log("授权后卡死")
                return 9
            }
        } else {
            log("没发现授权并登录")
        }
    } else if (current_task == "快手") {
        log("快手任务")
        let jieguo = 多个状态分开检测(["完成下载（领取200积分）", "领取任务"], 10000)
        if (jieguo.index == 1) {
            jieguo.result.click()
        } else if (jieguo.index == 0) {
            jieguo.result.click()
            text("确定").clickable().findOne().click()
        }

    }
    re = text_or_desc("任务要求：").findOne(10000)
    if (re) {
        log("任务要求：")
    } else {
        if (text("暂时没有任务，请尝试其它任务").exists()) {
            本次没任务的标记 = true
            没任务计数 += 1
            log("暂时没有任务，请尝试其它任务,返回")
            back()
            let ran = random(15, 20)
            log("休眠:" + ran + "秒")
            sleep(ran * 1000)
            return 9
        }
        toastLog("15秒内无反应，66阅读可能卡死，关闭重进")
        return "66阅读卡死"
    }

    if (text_or_desc("1、关注").exists()) {
        log("关注任务")
        textMatches("^打开.+做任务$").clickable().findOne().click()
        log("打开" + current_task + "做任务")
        return 1
    } else if (text_or_desc("1、留言").exists()) {
        return false
        if (current_task == "抖音") {
            re = text_or_desc("打开“DY”做任务").clickable().findOne().click()
        } else if (current_task == "快手") {
            re = text_or_desc("打开“KS”做任务").clickable().findOne().click()
        }
        log("关注加留言任务")
        log("打开" + current_task + "做任务")
        return 2
    } else if (text_or_desc("1、点赞").exists()) {
        textMatches("^打开.+做任务$").clickable().findOne().click()
        log("点赞任务")
        log("打开" + current_task + "做任务")
        return 3
    } else if (text_or_desc("1、点赞，2、关注，3、留言").exists()) {
        return false

        if (current_task == "抖音") {
            re = text_or_desc("打开“DY”做任务").clickable().findOne().click()
        } else if (current_task == "快手") {
            re = text_or_desc("打开“KS”做任务").clickable().findOne().click()
        }
        log("1、点赞，2、关注，3、留言任务")
        log("打开" + current_task + "做任务")
        return 4

    } else {
        log("未知任务")
        return false
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
function 抖音点赞和关注(arg) {

    try {
        if (wait_douyin()) {
            if (!抖音_点赞关注(arg)) {
                return false
            }
            var t = random(15, 25)
            for (let index = 0; index < t; index += 3) {
                log("休眠:" + (t - index) + "秒")
                sleep(3000)
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
function 抖音_点赞关注() {

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
        console.hide()
        sleep(6000)
        var count = 0
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
                sleep(5000)
            }
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
    if (current_task == "快手") {
        // for (let index = 0; index < 10; index++) {
        //     if (condition) {

        //     }
        // }
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


function douyin_点赞关注评论(result, image_name) {
    log("douyin_点赞关注评论:result:" + result)
    if (result == 1) {//1,点赞和关注   二进制第一位为点赞  第二位为关注
        if (!抖音点赞和关注(3)) {
            return false
        } //抖音点赞评论  11 =3
        sleep(2000)
        image_name.push(jietu_save())//截图点赞和关注
        return true
    } else if (result == 2) {//
        if (!抖音点赞和关注(2)) {

            return false

        } //抖音点赞评论
        sleep(2000)
        image_name.push(jietu_save())//截图点赞和关注
        comment()//评论
        sleep(2000)
        image_name.push(jietu_save())//截图评论
        return true

    } else if (result == 3) {//点赞  10 = 2
        if (!抖音点赞和关注(2)) {

            return false

        }
        sleep(2000)
        image_name.push(jietu_save())//截图点赞
        return true

    } else if (result == 4) {//
        if (!抖音点赞和关注(3)) {

            return false

        }
        sleep(2000)
        image_name.push(jietu_save())//截图点赞和关注
        comment()//评论
        sleep(2000)
        image_name.push(jietu_save())//截图评论
        return true

    } else {
        log("未知任务")

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
            if (id("like_layout").clickable().findOne(10) && currentActivity() == "com.yxcorp.gifshow.detail.PhotoDetailActivity") {
                return true
            }
            let img = images.captureScreen()
            let x = device.width / 2
            let y = device.height / 2
            let color = images.pixel(img, x, y)
            if (color_temp.indexOf(color) == -1) {
                color_temp.push(color)
            }
            if (color_temp.length > 8) {
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
    function dianzan_guanzhu(result) {
        var dianzan_flg = false, guanzhu_flg = false
        for (let index = 0; index < 3; index++) {

            if (result == 1) {
                log("不用点赞")
                dianzan_flg = true
            } else {
                let dianzan = id("like_layout").clickable().findOne(10000)

                if (dianzan) {
                    // log(dianzan)
                    if (!dianzan.isSelected()) {//没被选中
                        log("点一下  点赞")
                        dianzan.click()
                        sleep(1500)
                    } else {
                        log("点赞检测通过")
                        dianzan_flg = true
                    }
                } else {
                    log("找不到点赞按钮")
                }
            }
            //关注得部分
            if (result == 3) {
                log("不用关注")
                guanzhu_flg = true
            } else {
                let guanzhu = text("关注").findOne(3000)
                if (guanzhu) {
                    let par = guanzhu.parent().parent()
                    if (par.clickable()) {
                        log("点一下关注")
                        par.click()
                        if (text("24小时关注人数达到上限").findOne(2000)) {
                            log("24小时关注人数达到上限")
                            exit()
                        }
                    } else {
                        log("关注按钮不能点击")
                    }
                } else {
                    log("找不到关注按钮")
                    guanzhu_flg = true
                }
            }
            if (dianzan_flg && guanzhu_flg) {
                return true
            }
            sleep(2000)
        }
        return false
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
        editable().findOne().setText(get_comment_list[random(0, get_comment_list.length - 1)] + zhongxing_temp[random(0, zhongxing_temp.length - 1)] + "[赞]")
        text("发送").findOne().click()

        for (let index = 0; index < 20; index++) {
            let zan = id("number_like").findOne(1000)
            if (zan) {
                if (zan.bounds().top > 200 && zan.bounds().top < 600) {
                    return true
                } else {
                    if (zan.bounds().top < 200) {
                        swipe(device.width / 2, device.height / 2, device.width / 2, device.height / 3 * 2, 300)
                        sleep(2000)
                    } else if (zan.bounds().top > 600) {
                        swipe(device.width / 2, device.height / 2, device.width / 2, device.height / 3, 300)
                        sleep(2000)
                    }
                }
            } else {
                let bianjikuang = desc("说点什么...").findOne(1000)
                if (bianjikuang) {
                    if (bianjikuang.bounds().top < 1200) {//往上
                        swipe(device.width / 2, device.height / 3, device.width / 2, device.height / 3 * 2, 300)
                        sleep(2000)
                    } else {
                        //往下
                        swipe(device.width / 2, device.height / 3 * 2, device.width / 2, device.height / 3, 300)
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
    let wait_result = wait_kuaishou()
    if (!wait_result) {
        log("快手打开失败")
        return false
    }
    let wait_dianzan_and_guanzhu = dianzan_guanzhu(result)
    if (!wait_dianzan_and_guanzhu) {
        log("点赞关注失败")
        return false
    }
    if (result == 2 || result == 4) {
        let wait_comment_result = get_yuanlaide_comment()
        if (!wait_comment_result) {
            log("评论失败")
            return false
        }
    }

    return true// 都成功了,返回true
}


function loop() {
    var image_name = []
    while (true) {
        if (!start_66_yuedu()) {
            toastLog("66阅读开启失败,退出")
            exit()
        }
        task_managers()
        var 接任务结果 = task_start()
        if (接任务结果 == "66阅读卡死" || 接任务结果 == "没找到领取任务") {
            continue
        }
        if (接任务结果 == 9) {//暂时没有任务
            continue
        }
        if (!接任务结果) {//留言任务
            log("包含留言任务")
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
        }
        if (current_task == "抖音") {
            let 抖音点赞关注评论结果 = douyin_点赞关注评论(接任务结果, image_name)
            if (!抖音点赞关注评论结果) {
                continue
            }
        } else if (current_task == "快手") {
            if (!kuaishou_点赞关注评论(接任务结果)) {//快手打开失败
                for (let index = 0; index < 5; index++) {
                    log("返回")
                    back()
                    log("放弃任务")
                    let a = text_or_desc("放弃任务").clickable().findOne(3500)
                    if (a) {
                        a.click()
                        let b = text_or_desc("确定").clickable().findOne(3500)
                        if (b) {
                            b.click()
                            log("放弃任务完成")
                            break;
                        } else {
                            log("没找到确定按钮")
                            continue
                        }
                    } else {
                        log("没找到放弃任务按钮")

                    }
                    if (index == 4) {


                    }
                }
                continue
            } else {//截图保存
                image_name.push(jietu_save())
            }
        }
        var up_su = up_image(接任务结果)
        if (up_su == 0) {

            continue
        }
        sleep(1000)
        if (text_or_desc("请上传截图，再提交任务").exists()) {
            log("图片加载失败")

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
        成功计数 += 1
        sleep(5000)
        back()
        log("检查更新")
        // 检查更新()
        var currenttime = random(15, 20)
        for (let index = 1; index < currenttime; index += 2) {
            toastLog("休眠中,剩余" + (currenttime - index) + "秒")
            sleep(2500)
        }

    }
}

function 检查更新() {
    try {
        var res = http.get("https://gitee.com/jixiangxia_admin/autojs/raw/master/code/%E6%B5%B7%E8%99%B9%E9%98%85%E8%AF%BB/zhenghe.js")
        if (res.statusCode == 200) {
            if (!files.exists("./zhenghe.js")) {
                files.write("./zhenghe.js", res.body.string())
            }
            var 原来的源码 = files.read("./zhenghe.js")
            var 新源码 = res.body.string()
            if (原来的源码 != 新源码) {
                log("需要更新")
                files.write("./zhenghe.js", res.body.string())
                toastLog("功能模块加载完成")
                engines.execScriptFile("./zhenghe.js")
                exit()
            } else {
                log("不需要更新")
            }
        } else {
            toastLog("网络异常")
        }
    } catch (error) {
        log(error)
    }
}


function root开启无障碍() {
    var sh = new Shell(true)
    sh.setCallback({
        onNewLine: function (line) {
            //有新的一行输出时打印到控制台
            log(line);
        }
    })
    for (let index = 0; index < 10; index++) {
        sh.exec("settings put secure enabled_accessibility_services " + context.getPackageName() + "/org.autojs.autojs.accessibility.AccessibilityService")
        sleep(1000)
        sh.exec("settings put secure accessibility_enabled 1")
        sleep(2000)
        auto.waitFor()
        return true

    }
    sh.exit()
    log("全部失败")
    return false
}

function main() {
    //初始化值
    myself_package_name = context.getPackageName()
    log(myself_package_name)
    yuedu_66_packagename = app.getPackageName("66阅读")
    if (yuedu_66_packagename) {
        log(yuedu_66_packagename)

    } else {
        toastLog("未安装66阅读")
        exit()
    }
    if (!app.getPackageName("抖音短视频") && 抖音勾选) {
        toastLog("未安装抖音短视频")
        exit()
    }
    if (!app.getPackageName("快手") && 快手勾选) {
        toastLog("未安装快手")
        exit()
    }
    // init_comment()//初始化评论

    //授权
    if (!shouquan()) {
        toastLog("没有root权限,退出")
        exit()
    }
    // root开启无障碍()
    if (auto.service == null) {
        log("代码开启无障碍")
        openAccessbility()
    }
    auto.waitFor()
    log("无障碍开启成功")
    device.keepScreenOn(2 * 3600 * 1000)


    loop()


}



function test() {



}
// var task_selectds=dialogs.select("功能选择",["开始","测试"])
var task_selectds = 0
if (task_selectds == 0) {
    main()
} else if (task_selectds == 1) {
    test()
}
// test()
