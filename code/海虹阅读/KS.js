importClass(android.content.Intent)
importClass(android.net.Uri)
importClass(java.io.File)
importClass(android.provider.MediaStore)
var myself_package_name
var yuedu_66_packagename
var all_text = new Array() //全局评论数组
console.setSize(350, 900)
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

var current_task = null


var ra = new RootAutomator();
events.on('exit', function () {
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
        ss = ra.press(x, y, 100)
    }

    // sleep(200)
    console.show()
    return ss
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

var com = require("./com.js")

