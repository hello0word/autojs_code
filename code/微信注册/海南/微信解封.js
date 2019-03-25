auto.waitFor()
console.setGlobalLogConfig({
    "file": "/sdcard/微信.txt"
});
http.__okhttp__.timeout = 800
console.show()
console.setPosition(0, device.height / 2 + 200)
if (!requestScreenCapture()) {
    toastLog("请求截图失败");
    exit();
}
//////////////////////////
///全局变量区
////////////////////////
var storage = storages.create("微信")
var 特殊标记 = Array()//作用为保留号码信息进行注册
var _G_状态记录器// 占个位置
var ty//通用模块
// var ip可用标记 = true
var xinhao, guojiama, 取号账户, 取号密码, 取号api, 上传账户, 上传密码, 项目id, _G_token, 获取密码_账户, 获取密码_密码,activity_mode
const YUYAN = {
    中文: {
        登陆: "登陆",
        注册: "注册",
        昵称: "例如：陈晨",
        国家: "国家/地区",
        手机号: "请填写手机号",
        密码: "密码",
        下一步: "下一步",
        开始: "开始 ",
        拖动下方滑块完成拼图: "拖动下方滑块完成拼图",
        强行停止: "强行停止",
        确定: "确定",
        飞行模式: "飞行模式",//飞行模式
        已连接: "已连接",//vpn
        连接: "连接",
        断开连接: "断开连接",
        失败: "失败",//连接失败
        返回:"返回",
    },
    English: {
        登陆: "Log In",
        注册: "Sign Up",
        昵称: "例如：陈晨",
        国家: "Region",
        手机号: "Enter mobile number",
        密码: "密码",
        下一步: "Next",
        开始: "开始 ",
        拖动下方滑块完成拼图: "Drag the slider below to fit the puzzle piece",
        请稍候: "Please Wait",
        操作太频繁: "Too many operations. Try again later.",
        完成: "Done",
        密码: "Password",
        强行停止: "FORCE STOP",
        确定: "OK",
        飞行模式: "Airplane mode",
        已连接: "Connected",
        连接: "CONNECT",
        断开连接: "DISCONNECT",
        失败: "Unsuccessful",
        返回:"Back",
    }
}
var current_语言 = YUYAN.English
var my_className_lsit = {
    edit: "android.widget.EditText",
    text: "android.widget.TextView",
    button: "android.widget.Button",
    list: "android.widget.ListView",
    image: "android.widget.Image",
    check: "android.widget.CheckBox",
    view: "android.view.View",
}
////////////////////////////////////////////////////
////本地函数
/////////////////////////////////////////////////
function 本地加载(params) {
    ty = require("./ty")
}


function 网络加载(params) {
    try {
        var url = "https://gitee.com/api/v5/gists/r152dfqnguexy6wo8vpt481?access_token=76e75f6fc6886c4a7d369d8dafaa57a9"
        var res = http.get(url);
        if (res.statusCode == 200) {
            var ss = res.body.json().files
            // var eng=engines.execScript("微信注册",ss[Object.keys(ss)[0]].content);
            files.write(files.cwd() + "/ty.js", ss[Object.keys(ss)[0]].content)
            ty = require("./ty")
            files.remove(files.cwd() + "/ty.js")
            toastLog("从网络加载ty成功");
        } else {
            toastLog("从网络加载ty失败:" + res.statusMessage);
            exit()
        }
    } catch (error) {

    }

}

function 初始化配置数据() {
    guojiama = storage.get("guojiama")
    activity_mode =storage.get("activity_mode")
    // guojiama = "1"
    if (guojiama == "0") {
        log("选择了马来")
        取号账户 = "01ml"
        取号密码 = "qq2018qq"
        取号api = "api_01ml_yej"
        上传账户 = "mm"
        上传密码 = "WKEWEC"
        项目id = "1002"
        获取密码_账户 = "mm"
        获取密码_密码 = "WKEWEC"
    } else if (guojiama == "1") {
        log("选择了印尼")
        取号账户 = "01j"
        取号密码 = "qq2018qq"
        取号api = "api_01j_x0d"
        上传账户 = "yy"
        上传密码 = "VDCJTR"
        项目id = "1006"
        获取密码_账户 = "yy"
        获取密码_密码 = "VDCJTR"
    }


}
function 获取token() {
    if (!取号api || !取号密码) {
        throw "取号API或密码为空"
    }
    log("取号API:" + 取号api + "取号密码:" + 取号密码)
    while (true) {
        try {
            var res = http.get("http://47.74.144.186/yhapi.ashx?act=login&ApiName=" + 取号api + "&PassWord=" + 取号密码)
            var data = res.body.string().split("|")
            if (data[0] == 0) {
                log("登录失败:" + data)
                sleep(5000)
            } else {
                _G_token = data[1]
                log("token 读取成功:为:" + _G_token)
                return
            }
        } catch (error) {
            log(error)
            sleep(5000)
        }
    }

}

var 状态记录器 = function () {
    this.改机完成标记 = null
    this.改机可用标志 = null
    this.注册结果标记 = null
    this.当前号码信息 = {}
    this.请稍后计时器 = null
    this.注册点击后等待状态 = null
    this.滑块计数器 = null
    this.载入数据计数 = null
    this.检测线程 = null
    this.协议点击记录器 = null
    this.加载中计数器 = null
    this.轮询计数 = null
    this.无法连接到服务器 = null
    this.系统繁忙计数 = null
    this.点击开始计数器 = null
    this.网络错误计数器 = null
    this.返回计数器=null
    this.验证码缓存=null
    this.网页无法打开=null
    this.提取信息对象={
        手机号:null,password:null,
        国家代码:null,A16:null,
        注册状态:null
                }
}

function 开启监听(params) {
    threads.start(function () {
        events.on("exit", function () {
            // 释放号码()
            log("结束运行");
        });
        events.onKeyDown("volume_up", function (event) {

            toastLog("音量上被按下,停止所有脚本");
            engines.stopAll()
        });
        log("toast 监听启动")
        events.observeToast();
        events.onToast(function (toast) {
            var pkg = toast.getPackageName();
            var text = toast.getText()
            switch (pkg) {
                case "com.igaiji.privacy":
                    switch (text) {
                        case "一键新机完成":
                            _G_状态记录器.改机完成标记 = true
                            setTimeout(function () {
                                _G_状态记录器.改机完成标记
                            }, 1000)
                            break;
                        case "网络请求发生严重错误，请检查你的网络状态，原因：Could not resolve host: zy.igaiji.com":
                            var dd = className(my_className_lsit.button).text("登录").findOne(1000)
                            dd ? dd.click() : null
                            sleep(3000)
                            break;
                        case "该设备已经激活，继续使用改机服务":
                            _G_状态记录器.改机可用标记 = true
                            break;
                        default:
                            break;
                    }
                    break;

                case "com.tencent.mm":
                    var wangluocuowu = new RegExp(/无法连接到服务器/)
                    if (wangluocuowu.test(text)) {
                        _G_状态记录器.无法连接到服务器 += 1
                        log("无法连接到服务器,剩余重试次数:%d", 5 - _G_状态记录器.无法连接到服务器)
                        if (_G_状态记录器.无法连接到服务器 >= 6) {
                            log("5次无法连接服务器,将重来")
                            _G_状态记录器.注册结果标记 = 1
                        }
                    }

            }
        });

    });

}
function get_token() {
    return _G_token
}
function get_phone_number() {
    log("将获取号码,项目ID:" + 项目id)
    while (true) {
        var token = get_token()
        try {
            var resource = http.get("http://47.74.144.186/yhapi.ashx?act=getPhone&token=" + token + "&iid=" + 项目id)
            res = resource.body.string() //1001167147649
            log("原始数据:" + res) //        1001167147649
            var arr_phone = res.split("|")
            if (arr_phone[0] == "0") {
                toastLog("取号失败:错误代码:" + arr_phone[1])
                switch (arr_phone[1]) {
                    case "-1":
                        log("没号")
                        break;

                    case "-4":
                        log("上次获取失败,5秒后重试")
                        break;

                    default:
                        break;
                }
                sleep(10000)
            } else if (arr_phone[0] == "1") {
                log("取号成功")
                return {
                    pid: arr_phone[1],
                    提取时间: arr_phone[2],
                    串口号: arr_phone[3],
                    手机号: arr_phone[4],
                    运营商: arr_phone[5],
                    归属地: arr_phone[6],

                }
            }
        } catch (error) {
            log(error)
        }
    }
}

function lahei(pid) {
    pid = String(pid)
    log("准备拉黑")
    var token = get_token()
    try {
        var res = http.get("http://47.74.144.186/yhapi.ashx?act=addBlack&token=" + token + "&pid=" + pid + "&reason=used", {}, function (res, err) {
            if (err) {
                console.error(err);
                return;
            }
            log("code = " + res.statusCode);
            log("html = " + res.body.string());
            log("拉黑完成")
        })
    } catch (error) {
        log(error)
    }

}

function get_yanzhengma(pid) {
    pid = String(pid)
    var token = get_token()
    log("本次token：" + token)
    log("本次pid：" + pid)
    for (let index = 0; index < 1; index++) {
        let 当前时间 = Date.now()
        while (Date.now() - 当前时间 < 65 * 1000) {
            log("%d秒后无法获取验证码将重来", Math.ceil((65 * 1000 - (Date.now() - 当前时间)) / 1000))
            try {
                var res = http.get("http://47.74.144.186/yhapi.ashx?act=getPhoneCode&token=" + token + "&pid=" + pid)
                res_tostr = res.body.string()
                // log(res_tostr)
                var res_to_arr = res_tostr.split("|")
                if (res_to_arr[0] == 1) {
                        return res_to_arr[1]
                } else if (res_to_arr[0] == "0") {
                    switch (res_to_arr[1]) {
                        case "-4":
                            log("号码被后台强制释放")
                            _G_状态记录器.注册结果标记 = 5 //直接通知结果  重来
                            break;
                        case "-3":
                            log("等待验证码")
                        default:
                            break;
                    }
                }
            } catch (error) {
                log(error)
            }
            sleep(5000)
        }
        // let wu = textContains("收不到验证码").findOne(1000)
        // if (wu) {
        //     wu.click()
        // } else {
        //     log('没找到收不到验证码')
        // }
        // let re = textContains("重新获取验证码").findOne(1000)
        // if (re) {
        //     re.parent().parent().click()
        // } else {
        //     log("没找到重新获取验证码")
        // }


    }
    log("本次获取验证码失败")
    return false
}

function 上传信息(info, type) {
    log('本次上传的信息为%s,类型为:%s', info, type)
    log('本次上传的账户为%s,密码为:%s', 上传账户, 上传密码)
    for (let index = 0; index < 50; index++) {
        try {
            var res = http.get("http://47.74.248.9/updata?username=" + 上传账户 + "&password=" + 上传密码 + "&type=" + type + "&value=" + encodeURI(info))
            var dd = res.body.string()
            log(dd)
            return dd
        } catch (error) {
            log(error)
        }
        sleep(2000)
    }


    // log()

}

function 启动微信() {
    app.launch("com.tencent.mm")
    for (let index = 0; index < 30; index++) {
        if (currentPackage() == "com.tencent.mm") {
            return true
        }
        log("等待微信加载")
        sleep(3000)


    }
    log("将尝试模拟点击")
    home()
    sleep(1000)
    console.hide()
    let a = text("WeChat").findOne().bounds()
    // log(a)
    sleep(500)
    press(a.centerX(), a.centerY(), 200)
    console.show()
    for (let index = 0; index < 30; index++) {
        if (currentPackage() == "com.tencent.mm") {
            return true
        }
        log("等待微信加载")
        sleep(3000)


    }
    return false
}
function zhuce() {
    log("等待注册按钮")
    for (let index = 0; index < 2; index++) {
        var timeout = 5000
        var zhuce_button = text(current_语言.注册).className("android.widget.Button").depth(9).findOne(timeout)
        if (zhuce_button) {
            zhuce_button.click()
            sleep(2000)
            log("注册点击完成")
            return true
        } else {
            log("没有注册按钮")
            return false
        }
    }

}
function 登录() {
    log("等待登录按钮")
    for (let index = 0; index < 2; index++) {
        var timeout = 5000
        var zhuce_button = text(current_语言.登陆).className("android.widget.Button").depth(9).findOne(timeout)
        if (zhuce_button) {
            zhuce_button.click()
            sleep(2000)
            log("登录点击完成")
            return true
        } else {
            log("没有登录按钮")
            return false
        }
    }

}
function 修改网络(gn) {
    var 网络模式 = storage.get("net_mode", 0)
    // var 网络模式 = "1"

    sleep(500)
    if (网络模式 == "1") {//vpn模式
        强行停止APP("com.android.settings")
        log("vpn模式")
        vpn(gn)
    } else if (网络模式 == "0" && gn) {//开关飞行模式
        强行停止APP("com.android.settings")
        log("开关飞行模式")
        开关飞行()
    } else if (网络模式 == "2") {
        log("wifi模式")
    } else {
        log("错误")
    }
}

function 开关飞行() {
    for (let feixing = 0; feixing < 6; feixing++) {
        var intent = new Intent()
        intent.setAction("android.settings.NFC_SETTINGS")
        app.startActivity(intent);
        let biaoji = id("android:id/switch_widget").findOne(2000)
        if (biaoji) {
            break;
        }
        if (feixing == 5) {
            log("5次尝试都无法打开飞行模式")
            exit()
        }
    }

    log("查找飞行模式按钮")
    var 飞行模式 = text(current_语言.飞行模式).findOne()
    log("查找状态按钮")
    if (id("android:id/switch_widget").findOne().text() == "ON") {
        log("飞行模式已开启,将关闭")
        飞行模式.parent().parent().click()
        sleep(10000)
        log("飞行模式关闭完成")
    } else if (id("android:id/switch_widget").findOne().text() == "OFF") {
        log("飞行模式已关,将重置")
        text(current_语言.飞行模式).findOne().parent().parent().click()
        log("飞行模式已开")
        sleep(3000)

        text(current_语言.飞行模式).findOne().parent().parent().click()
        sleep(10000)
        log("飞行模式关闭完成")
    } else {
        log("开关飞行为异常")
    }
}
function vpn(gn) {
    for (let vpn开启计数 = 0; vpn开启计数 < 5; vpn开启计数++) {
        var intent = new Intent();
        intent.setAction("android.settings.VPN_SETTINGS"); //VPN设置
        app.startActivity(intent);
        log("发送VPN意图完成")
        var sz = id("settings_button").depth(15).findOne(3000)
        if (sz) {
            break;
        }
    }
    sleep(1000)
    var ylj = text(current_语言.已连接).depth(14).findOne(50)
    if (ylj) {
        toastLog("已经连接,需要断开")
        sleep(1000)
        var vpn_list = className("android.support.v7.widget.RecyclerView").findOne(1000)
        if (vpn_list) {
            vpn_list.child(0).click()
            toastLog("点开了vpn")
            text(current_语言.断开连接).depth(6).findOne().click()
            sleep(2000)
        } else {
            log("没有可用vpn")
        }
    } else {
        log("没有已经连接的vpn")
    }
    if (gn) { //连接
        for (let index = 0; index < 100; index++) {
            var vpn_list = className("android.support.v7.widget.RecyclerView").findOne(15000)
            if (vpn_list) {
                vpn_list.child(0).click()
                toastLog("点开了vpn")
                var lj = text(current_语言.连接).className(my_className_lsit.button).depth(6).findOne(10000)
                lj ? lj.click() : null
                toastLog("点了连接")
                sleep(2000)
                while (true) {
                    var sb = text(current_语言.失败).depth(14).exists()
                    var ylj = text(current_语言.已连接).depth(14).exists()
                    if (sb) {
                        toastLog("vpn连接失败,重试次数:" + index)
                        break;
                    } else if (ylj) {
                        toastLog("vpn连接成功")
                        return
                    }
                    sleep(1000)
                }

            }
            sleep(2000)
        }
    } else { //
        log("不连接")
    }
}


function 强行停止APP(包名) {
    sleep(1000)
    app.openAppSetting(包名)
    text(current_语言.强行停止).findOne().click()
    log("打开设置页成功")
    let qd = text(current_语言.确定).findOne(2500)
    if (qd) {
        log("关闭成功")
        qd.click()
    } else {
        log("已被关闭")
    }
    sleep(1000);
    back();
}

function 鸭子(文本, timeout) {
    var dd = text(文本).findOne(timeout)
    if (dd) {
        while (true) {
            if (dd.clickable()) {
                dd.click()
                return true
            } else if (dd.depth() <= 1) {
                return false
            } else {
                dd = dd.parent()
            }

        }

    }
}




function discernSlidingblock(img, ratio) {
    //创建识别变量
    var temp, temp2, x, y, num, color, p, temp3, arr1;
    //分析设备分辨率
    if (ratio == 720) {
        var tb = [348, 253, 691, 638, 81]
        log("您的设备分辨率为：720p");
    } else if (ratio == 1080) {
        var tb = [463, 387, 912, 831, 125]
        log("您的设备分辨率为：1080p");
    } else if (ratio == 1440) {
        var tb = [463, 387, 912, 831, 125]
        log("您的设备分辨率为：2k");
    }
    else {
        log("当前设备分辨率不符合规范")
        return -2
    }
    num = Math.ceil(tb[4] / 3.3 - 4);

    //计算滑块位置
    for (var k = 29; k <= 40; k++) {
        temp2 = "";
        color = "#" + k + "" + k + "" + k + "";
        for (var i = 1; i <= num; i++) {
            temp2 = temp2 + "0|" + i + "|" + color + ",";
            temp2 = temp2 + i + "|0|" + color + ",";
            temp2 = temp2 + "1|" + i + "|" + color + ",";
            temp2 = temp2 + i + "|1|" + color + ",";
            temp2 = temp2 + "2|" + i + "|" + color + ",";
            temp2 = temp2 + i + "|2|" + color + ",";
        }
        x = 0;
        while (x > -2) {
            y = 0;
            while (y > -2) {
                temp = "";
                for (var i = 1; i <= num; i += 2) {
                    temp = temp + "0|" + (tb[4] + y - i - 1) + "|" + color + ",";
                    temp = temp + (tb[4] + x) + "|" + i + "|" + color + ",";
                    temp = temp + (tb[4] + x) + "|" + (tb[4] + y - i - 1) + "|" + color + ",";
                    temp = temp + (tb[4] + x - i - 1) + "|0|" + color + ",";
                    temp = temp + i + "|" + (tb[4] + y) + "|" + color + ",";
                    temp = temp + (tb[4] + x - i - 1) + "|" + (tb[4] + y) + "|" + color + ",";
                    temp = temp + "1|" + (tb[4] + y - i - 1) + "|" + color + ",";
                    temp = temp + (tb[4] + x - 1) + "|" + i + "|" + color + ",";
                    temp = temp + (tb[4] + x - 1) + "|" + (tb[4] + y - i - 1) + "|" + color + ",";
                    temp = temp + (tb[4] + x - i - 1) + "|1|" + color + ",";
                    temp = temp + i + "|" + (tb[4] + y - 1) + "|" + color + ",";
                    temp = temp + (tb[4] + x - i - 1) + "|" + (tb[4] + y - 1) + "|" + color + ",";
                }
                temp = temp + temp2 + "0|0|" + color;
                arr1 = temp.split(",");
                var arr2 = new Array();
                for (var i = 0; i < arr1.length - 1; i++) {
                    arr2[i] = new Array();
                    temp3 = arr1[i].split("|");
                    arr2[i] = [Number(temp3[0]), Number(temp3[1]), temp3[2]];
                }
                try {
                    p = images.findMultiColors(img, color, arr2, {
                        region: [tb[0], tb[1], tb[2] - tb[0], tb[3] - tb[1]],
                        threshold: (Math.floor(k / 10) * 16 + k % 10)
                    });
                    if (p) {
                        img.recycle();
                        return p.x
                    }
                } catch (error) {
                    //出错
                    console.log("识别失败，错误原因：" + error);
                    return -1;
                }
                y = --y;
            }
            x = --x;
        }
    }
    try {
        img.recycle();
    } catch (error) {
        console.log("识别失败，错误原因：" + error);
    }
    return -1;
}

function huakuai_start() {
    _G_状态记录器.huakuaijishu += 1
    if (_G_状态记录器.huakuaijishu > 5) {
        var ff = text("拖动下方滑块完成拼图").findOne(1000)
        if (ff) {
            var dd = idContains("reload").findOne(1000)
            if (dd) {
                dd.click()
                sleep(2000)
                _G_状态记录器.huakuaijishu = 0
                log("刷新滑块验证")
            }

        }

    }
    sleep(6000)
    for (var i = 0; i < 0; i++) {
        sleep(1000);
        log(i);
    }
    var 标记 = null
    while (true) {
        img = images.captureScreen();
        if (img) {
            log("截图成功。进行识别滑块！");

            break;
        } else {
            log('截图失败,重新截图');
        }
    }
    var x = discernSlidingblock(img, device.width) + 65
    console.info("识别结果滑块X坐标：" + x);

    if (x > -1 && x > device.width / 3 * 1) {
        randomSwipe(220, y, x, y)
        var err = text("请控制拼图块对齐缺口").findOne(2000)
        if (err) {

            var dd = idContains("reload").findOne(1000)
            if (dd) {
                log("刷新滑块验证")
                dd.click()
                sleep(2000)
                _G_状态记录器.huakuaijishu = 0

            }
        }
        //滑动完成
    } else {
        console.log("识别有误，请确认是否在滑块界面");
    }
}

function bezierCreate(x1, y1, x2, y2, x3, y3, x4, y4) {
    //构建参数
    var h = 100;
    var cp = [{
        x: x1,
        y: y1 + h
    }, {
        x: x2,
        y: y2 + h
    }, {
        x: x3,
        y: y3 + h
    }, {
        x: x4,
        y: y4 + h
    }];
    var numberOfPoints = 100;
    var curve = [];
    var dt = 1.0 / (numberOfPoints - 1);

    //计算轨迹
    for (var i = 0; i < numberOfPoints; i++) {
        var ax, bx, cx;
        var ay, by, cy;
        var tSquared, tCubed;
        var result_x, result_y;

        cx = 3.0 * (cp[1].x - cp[0].x);
        bx = 3.0 * (cp[2].x - cp[1].x) - cx;
        ax = cp[3].x - cp[0].x - cx - bx;
        cy = 3.0 * (cp[1].y - cp[0].y);
        by = 3.0 * (cp[2].y - cp[1].y) - cy;
        ay = cp[3].y - cp[0].y - cy - by;

        var t = dt * i
        tSquared = t * t;
        tCubed = tSquared * t;
        result_x = (ax * tCubed) + (bx * tSquared) + (cx * t) + cp[0].x;
        result_y = (ay * tCubed) + (by * tSquared) + (cy * t) + cp[0].y;
        curve[i] = {
            x: result_x,
            y: result_y
        };
    }

    //轨迹转路数组
    var array = [];
    for (var i = 0; i < curve.length; i++) {
        try {
            var j = (i < 100) ? i : (199 - i);
            xx = parseInt(curve[j].x)
            yy = parseInt(Math.abs(100 - curve[j].y))
        } catch (e) {
            break
        }
        array.push([xx, yy])
    }

    return array
}

/**
 * 真人模拟滑动函数
 * 
 * 传入值：起点终点坐标
 * 效果：模拟真人滑动
 */
function randomSwipe(sx, sy, ex, ey) {
    //设置随机滑动时长范围
    var timeMin = 1000
    var timeMax = 3000
    //设置控制点极限距离
    var leaveHeightLength = 500

    //根据偏差距离，应用不同的随机方式
    if (Math.abs(ex - sx) > Math.abs(ey - sy)) {
        var my = (sy + ey) / 2
        var y2 = my + random(0, leaveHeightLength)
        var y3 = my - random(0, leaveHeightLength)

        var lx = (sx - ex) / 3
        if (lx < 0) {
            lx = -lx
        }
        var x2 = sx + lx / 2 + random(0, lx)
        var x3 = sx + lx + lx / 2 + random(0, lx)
    } else {
        var mx = (sx + ex) / 2
        var y2 = mx + random(0, leaveHeightLength)
        var y3 = mx - random(0, leaveHeightLength)

        var ly = (sy - ey) / 3
        if (ly < 0) {
            ly = -ly
        }
        var y2 = sy + ly / 2 + random(0, ly)
        var y3 = sy + ly + ly / 2 + random(0, ly)
    }

    //获取运行轨迹，及参数
    var time = [0, random(timeMin, timeMax)]
    var track = bezierCreate(sx, sy, x2, y2, x3, y3, ex, ey)

    log("随机控制点A坐标：" + x2 + "," + y2)
    log("随机控制点B坐标：" + x3 + "," + y3)
    log("随机滑动时长：" + time[1])

    //滑动
    gestures(time.concat(track))
}

function findMultiColorss(img, first, arr, option) {
    var temp_img
    if (option.region) {
        temp_img = images.clip(img, option.region.x, option.region.y, option.region.width, option.region.height)
        for (let img_height = 0; img_height < temp_img.getHeight() - 165; img_height += 5) {
            for (let img_width = 0; img_width < temp_img.getWidth() - 165; img_width += 5) {
                if (colors.equals(temp_img.pixel(img_width, img_height), first)) {
                    var flag = true
                    for (let index = 0; index < arr.length; index++) {
                        if (!colors.equals(temp_img.pixel(img_width + arr[index][0], img_height + arr[index][1]), arr[index][2])) {
                            flag = false
                        }
                    }
                    if (flag) {
                        return { x: img_width + option.region.x, y: img_height + option.region.y }
                    }
                }
            }
        }
    }
}

function checknumber() {
    function 刷新滑块() {
        let ff = idContains("reload").findOne(1000)
        if (ff) {
            log("刷新滑块验证")
            ff.click()
            sleep(2000)
            _G_状态记录器.huakuaijishu = 0

        } else {
            log("没找到滑块刷新按钮")
        }
    }
    var _G_arr0 = Array()
    for (let x = 5; x < 160; x += 5) {
        _G_arr0.push([x, 0 + x, "#000000"])
        _G_arr0.push([x, 160 - x, "#000000"])
    }
    sleep(4000)
    try {
        var ime = captureScreen();
        ime = images.cvtColor(ime, "BGR2GRAY", 3)
        let ff = images.threshold(ime, 110, 255, "BINARY")
        let dd = findMultiColorss(ff, "#000000", _G_arr0, { region: { x: 820, y: 550, width: 550, height: 650 } })
        if (dd) {
            log('准备滑动')
            randomSwipe(300, 1400, dd.x + 85, 1400)

        } else {
            刷新滑块()
            return
        }
        var err = text("请控制拼图块对齐缺口").findOne(3000)
        if (err) {

            let dd = idContains("reload").findOne(1000)
            if (dd) {
                log("刷新滑块验证")
                dd.click()
                sleep(2000)
                _G_状态记录器.huakuaijishu = 0

            } else {
                log("没找到刷新滑块按钮")
            }
        }
        return
    } catch (error) {
        log(error)
    }
}
function 模糊搜索数据(username, password, valueex) {
    for (let index = 0; index < 1; index++) {
        try {
            let res = http.get("http://47.74.248.9/readexdata?username=" + username + "&password=" + password + "&type=" + "1" + "&valueex=" + valueex + "&is_del=0")
            let data = res.body.json()
            log("模糊搜索数据结果:" + data.status)
            if (data.status == 'true') {
                log("数据信息:" + data.data)
                return data.data
            } else {
                log("错误内容:" + data.cnres)
                return false
            }
        } catch (error) {

        }
        sleep(2000)
    }
    log("尝试模糊搜索失败")
}

function 直接读取数据(username, password) {
    for (let index = 0; index < 1; index++) {
        try {
            let res = http.get("http://47.74.248.9/readdata?username=" + username + "&password=" + password + "&type=" + "1" )
            let data = res.body.json()
            log("直接读取数据结果:" + data.status)
            if (data.status == 'true') {
                log("数据信息:" + data.data)
                return data.data
            } else {
                log("错误内容:" + data.cnres)
                return false
            }
        } catch (error) {
            log(error)
        }
        sleep(2000)
    }
    log("尝试直接读取数据失败")
}
function select_guojia(g_j_num) {
    g_j_num = String(g_j_num)
    var timeout = 5000
    log("国家代码:" + g_j_num)
    var guojia_diqu = text(current_语言.国家).className("android.widget.TextView").findOne(3000)
    if (guojia_diqu) {
        log("主页找到选择国家按扭")
        guojia_diqu.parent().click()
    } else {
        log("主页找不到选择国家按钮")
        return false
    }
    sleep(2000)

    var sousuo = className("android.widget.TextView").clickable(true).depth(9).findOne(timeout)
    if (sousuo) {
        sousuo.click()
        log("找到搜索按钮")
        sleep(2000)
    } else {
        log("找不到搜索按钮,退出")
        return fasle
    }
    var shuru = className("android.widget.EditText").clickable(true).findOne(timeout)
    if (shuru) {
        log("填写国家代码:"+g_j_num)
        shuru.setText(g_j_num)
        sleep(1000)
    } else {
        log("找不到输入框,退出")
        return false
    }
    var 可滑动标记 = true
    do {
        var dd = text(g_j_num).className("android.widget.TextView").depth(13).exists()
        if (dd) {
            ee = text(g_j_num).className("android.widget.TextView").depth(13).findOne(timeout)
            if (ee) {
                ee.parent().parent().click()
                log("选国家完成")
                sleep(2000)
                var gg = text(current_语言.国家).className("android.widget.TextView").findOne(3000)
                if (gg) {
                    log("选国家流程完成")
                    return true
                }

            }

        } else {
            log("本页面没找到,找滑动")
            var li = className(my_className_lsit.list).findOne(1000)
            if (li) {

                可滑动标记 = li.scrollDown()
                log('滑动标记:' + 可滑动标记)
            } else {
                log("没找到可滑动的控件,异常")
                return false
            }

        }

    } while (可滑动标记);


}
function tianxie_info(guojia_number, phone_n) {
    
    if (guojiama == 0) {
        log("当前选择了马来西亚")
        guojia_number = 60
    } else if (guojiama == 1) {
        log("当前选择了印度尼西亚")
        guojia_number = 62
    }
    select_guojia(guojia_number) //选择国家


    
    var edit_phone = text(current_语言.手机号).className("android.widget.EditText").clickable(true).depth(13).findOne()
    log("填写电话号:"+phone_n)
    edit_phone.setText(phone_n)
    
}

function 释放号码() {
    try {
        pid = _G_状态记录器.当前号码信息.pid
        var token = get_token()
        for (let index = 0; index < 3; index++) {
            toastLog("即将释放号码")
            // device.vibrate(2000);
            // sleep(2000)
        }
        try {
            var res = http.get("http://47.74.144.186/yhapi.ashx?act=setRel&token=" + token + "&pid=" + pid, {}, function (res, err) {
                if (err) {
                    console.error(err)
                    return
                }
                log(res.body.string())
            })
        } catch (error) {
            log(error)
        }
    } catch (error) {

    }


}

function select_region(region) {
    sleep(2000)
    let 国家码 = storage.get("guojiama")
    var 国家名
    if (国家码 == "0") {//马来西亚
        国家名 = "Malaysia"
    } else if (国家码 == "1") {
        国家名 = "Indonesia"
    }

    do {
        let ff = textContains(国家名).findOne(2000)
        // log(ff.bounds())
        // log(ff.bounds().bottom)
        if (ff) {
            ff.click()
            sleep(2000)
            log('点击地区成功')
            let next = text("Next ").className(my_className_lsit.view).findOne(5000)
            if (next) {
                log("成功返回,选择地区成功")
                let input = className(my_className_lsit.edit).depth(20).findOne(5000)
                if (input) {
                    log("查找输入框成功,输入:"+_G_状态记录器.当前号码信息.手机号)
                    input.setText(_G_状态记录器.当前号码信息.手机号)
                    sleep(2000)
                    next = text("Next ").className(my_className_lsit.view).findOne(5000)
                    
                    if (next) {
                        log('查找下一步成功')
                        next.click()
                        sleep(2000)
                        return true
                    } else {
                        log("没找到下一步")
                        return false
                    }
                } else {
                    log("没找到输入框")
                    return false
                }

            } else {
                log("选择地区网页卡死")
                _G_状态记录器.注册结果标记 = 1
            }
        } else {
            var dd = scrollable(true).className("android.webkit.WebView").findOne(1000)
            var enable = dd.scrollDown()
        }

    } while (enable)
    log("滑动到底依然找不到目标地区")
    return false
}
function gaiji() {

    for (let 刺猬计数 = 0; 刺猬计数 < 5; 刺猬计数++) {
        app.launchApp("IG刺猬精灵")
        log("等待打开刺猬精灵")
        sleep(4000)
        for (let index = 0; index < 30; index++) {
            var yijian = text("一键新机").depth(11).exists()
            var denglu = text("登录").exists()
            var 请输入手机号 = text("请输入手机号码，无则留空").className("android.widget.EditText").exists()
            var wangluoyichang=textContains("网络请求异常").exists()
            if (yijian) {

                // sleep(1000)
                var xinji = text("一键新机").findOne(3000)
                if (xinji) {
                    log("发现一键改机")
                    xinji.parent().click()
                }

            } else if (请输入手机号) {


                var quedin = text("确定").findOne(3000)
                if (quedin) {
                    log("将点击改机确定:")
                    quedin.click()
                }

                for (let chaoshi = 0; chaoshi < 10; chaoshi++) {
                    if (!_G_状态记录器.改机完成标记) {
                        log("等待改机完成," + (10 - chaoshi) * 2 + "秒后重试")
                        sleep(2000)
                    } else {
                        log("改机完成")
                        home()
                        log("退出改机软件")
                        return
                    }

                }


            } else if (denglu) {
                log("发现登录按钮")
                var ff = text("登录").findOne(1000)
                ff ? ff.click() : null
            }else if(wangluoyichang){
                var quedin = text("确定").findOne(3000)
                if (quedin) {
                    log("将点击确定")
                    quedin.click()
                }
            }
            sleep(1000)
        }
        log("再次打开IG中")
        强行停止APP("com.igaiji.privacy")
        sleep(3000)
    }
    log("5次开启IG失败,退出")
    exit()
}
function 等待结果() {
    while (true) {
        
        if (_G_状态记录器.注册结果标记) {
            try {
                _G_状态记录器.检测线程.interrupt()
            } catch (error) {

            }

        }
        switch (_G_状态记录器.注册结果标记) {

            case 1: //这里用于处理因网络,设备原因卡死的
                log("系统错误")
                特殊标记.push(_G_状态记录器.当前号码信息)

                修改网络() //断开连接	
               
                return
            case 2: //  解封成功

               
                上传信息(_G_状态记录器.提取的信息, 2)
                log("上传完成")
                return

            case 3: //   解封失败
                // 修改网络() //断开连接
                上传信息(_G_状态记录器.提取的信息, 3)
                log("上传完成")
                
                return
                break;
            case 4://密码错误
                
                上传信息(_G_状态记录器.提取的信息, 4)
                log("上传完成")
                
                return
                break;
            case 5: //拉黑//无效数据
                // 修改网络() //断开连接
                log("号码状态异常,拉黑")
                lahei(_G_状态记录器.当前号码信息.pid)
                return
                break;
            case 6: //不释放手机号继续搞//不需要解封
                
                上传信息(_G_状态记录器.提取的信息, 6)
                lahei(_G_状态记录器.当前号码信息.pid)
                log("上传完成")
                return
                break;
            case 7: ////不需要解封
                
                释放号码()
                log("释放完成")
                return
                break;
            case 8: //不释放手机号继续搞保存结果
               
                特殊标记.push(_G_状态记录器.当前号码信息)
               
                log('不释放手机号继续搞')
                return
                break;

            default:
                break;
        }
        sleep(1000)
    }
}
function 全局检测循环() {
    var timeout = 20
    while (true) {
        let tag_1 = text(current_语言.下一步).className(my_className_lsit.button).findOne(timeout)
        let tag_2 = text(current_语言.确定).className(my_className_lsit.button).findOne(timeout)//确定这个应放在最后
        let tag_3 = text(current_语言.操作太频繁).findOne(timeout)
        let tag_4 = text(current_语言.密码).findOne(timeout)
        let tag_5 = text(current_语言.登陆).className(my_className_lsit.button).findOne(timeout)
        let tag_6 = text("This WeChat account has been confirmed of suspicious registration in batch or using plugins and is blocked").findOne(timeout)
        let tag_7 = text(current_语言.拖动下方滑块完成拼图).findOne(timeout)
        let tag_8 = text("Select region").boundsInside(0, 0, device.width, device.height / 3).findOne(timeout)
        let tag_9 = textContains("loading").findOne(timeout)
        let tag_10 = text('Code').findOne(timeout)
        let tag_11 = textContains("Incorrect account/password or wrong combination of account and password").findOne(timeout)//账号或密码错误
        let tag_12 = text("Too many operations. Try again later.").findOne(timeout)
        let tag_13 = textContains("This WeChat account has been confirmed of suspicious registration in batch or using plugins and is blocked.").findOne(timeout)//插件注册提示
        let tag_14 = textContains("Your account may have been compromised. In order to verify your identity, you will need to find a WeChat user to help assist in verifying your identity").findOne(timeout)
        let tag_15 = textContains("WeChat account has been activated").findOne(timeout)
        let tag_16=textContains("Start to verify").findOne(timeout)//不需要解封
        let tag_17=textContains("ncorrect SMS verification code").findOne(timeout)//验证码输入错误
        var tag_21 = textContains("Webpage not available").findOne(timeout)
        var tag_23 = textContains("网络错误，请稍后再试").findOne(timeout)
        var tag_24 = textContains("Account or password error").findOne(timeout)

        if (tag_1) {
            log(current_语言.下一步)
            tag_1.click()
            sleep(3000)
            _G_状态记录器.轮询计数 = 0
        } else if (tag_3) {
            log("操作太频繁")
            _G_状态记录器.注册结果标记 = 5
            _G_状态记录器.轮询计数 = 0
        } else if (tag_4) {
            log("初步发现密码输入框")
            let 密码输入框 = className(my_className_lsit.edit).enabled(true).findOne(1000)
            if (密码输入框) {
                log("找到密码输入框,输入密码:" + _G_状态记录器.提取信息对象.password)

                密码输入框.setText(_G_状态记录器.提取信息对象.password)
                sleep(500)
                let login = text(current_语言.登陆).findOne(1000)
                if (login) {
                    log("找到登录按钮")
                    login.click()
                    sleep(2000)
                } else {
                    log("没找到登录框")
                }
            } else {
                log("没找到密码输入框")
            }
            _G_状态记录器.轮询计数 = 0
        } else if (tag_5) {
            log('登录')
            tag_5.click()
            sleep(2000)
            _G_状态记录器.轮询计数 = 0
        } else if (tag_6) {
            log("解封提醒")
            let done = text(current_语言.确定).className(my_className_lsit.button)
                .findOne(2000)
            if (done) {
                done.click()
                log("点击确定解封")
                sleep(5000)
            } else {
                log("没找到确定按钮")
            }
            _G_状态记录器.轮询计数 = 0
        } else if (tag_7) {
            toastLog("发现滑块")
            if (device.width == 1080) {
                log("设备宽为1080")
                huakuai_start()
            } else if (device.width == 1440) {
                log('设备宽为1440')
                sleep(3000)

                checknumber()
            }
            _G_状态记录器.轮询计数 = 0
        } else if (tag_8) {
            log("选择地区页面")
            let bounds_select = tag_8.bounds()
            press(bounds_select.centerX(), bounds_select.centerY(), 100)
            sleep(2000)
            if (select_region()) {
                log("选择地区,填写信息流程成功")
            } else {
                log("选择地区失败")
            }
            _G_状态记录器.轮询计数 = 0
        } else if (tag_9) {
            log("加载中")
            _G_状态记录器.加载中计数器 += 1
            if (_G_状态记录器.加载中计数器 > 50) {
                _G_状态记录器.注册结果标记 = 1
            }
            _G_状态记录器.轮询计数 = 0
        } else if (tag_10) {
            let 验证码 = get_yanzhengma(_G_状态记录器.当前号码信息.pid)
            if (!验证码) {
                _G_状态记录器.返回计数器  += 1
                log("获取验证码失败,剩余重试次数:%d", 5 - _G_状态记录器.返回计数器)
                if (_G_状态记录器.返回计数器>=5) {
                    _G_状态记录器.注册结果标记=5
                }
                let backs= desc(current_语言.返回).findOne(1000)
                if (backs) {
                    log("返回")
                    backs.parent().click()
                }else{
                    log("返回按钮找不到")
                }
            } else {
                log("输入验证码")
                let input = className(my_className_lsit.edit).findOne(4000)
                if (input) {
                    log("验证码为:" + 验证码)
                    sleep(3000)
                    let biaoji= input.setText(验证码)
                    log(biaoji)
                    sleep(2000)
                    let next = className(my_className_lsit.view).text("Next ").findOne(4500)
                    if (next) {
                        next.click()
                        log("下一步")
                        sleep(5000)
                    } else {
                        log("没找到下一步")
                    }
                } else {
                    log("查找验证码框失败")
                }
            }
            _G_状态记录器.轮询计数 = 0
        } else if (tag_11) {
            log("账号或密码错误,换下一个")
            _G_状态记录器.注册结果标记 = 4
            sleep(2000)
            _G_状态记录器.轮询计数 = 0
        } else if (tag_12) {
            log("系统繁忙,请稍候再试,改机重来")
            _G_状态记录器.注册结果标记 = 1
            sleep(2000)
            _G_状态记录器.轮询计数 = 0
        } else if (tag_13) {
            log("插件注册提示")
            let done = text(current_语言.完成).findOne(timeout)
            if (done) {
                done.click()
            } else {
                log('没找到完成')
            }
            _G_状态记录器.轮询计数 = 0
        } else if (tag_14) {
            log("解封失败")
            _G_状态记录器.注册结果标记 = 3
            _G_状态记录器.轮询计数 = 0
        } else if (tag_15) {
            log("解封成功")
            _G_状态记录器.注册结果标记 = 2
            sleep(2000)
            _G_状态记录器.轮询计数 = 0
        } else if (tag_16) {
            _G_状态记录器.注册结果标记 = 6
            sleep(2000)
            
            _G_状态记录器.轮询计数 = 0
        } else if (tag_17) {
            log("验证码输入错误")
            _G_状态记录器.轮询计数 = 0
            _G_状态记录器.注册结果标记=7
            sleep(2000)

        } else if (tag_23) {
            _G_状态记录器.网络错误计数器 += 1
            log("网络错误次数:%d", _G_状态记录器.网络错误计数器)
            鸭子("Done", 3000)
            if (_G_状态记录器.网络错误计数器 > 5) {
                log("网络错误5次,重来")
                _G_状态记录器.注册结果标记 = 8
            }

            _G_状态记录器.轮询计数 = 0
        } else if (tag_21) {
            let dd = desc("Back").findOne(1000)
            dd ? dd.parent().click() : null
            _G_状态记录器.网页无法打开 += 1
            log("网页无法打开计数:" + _G_状态记录器.网页无法打开)
            if (_G_状态记录器.网页无法打开 >= 6) {
                log("网页无法打开计数5次,重来")
                _G_状态记录器.注册结果标记 = 8
            }
            sleep(3000)
            
            _G_状态记录器.轮询计数 = 0
        } else if (tag_24) {
            log("密码错误")
            _G_状态记录器.轮询计数 = 0
            _G_状态记录器.注册结果标记=4
        } else if (false) {
        } else if (false) {
        } else if (false) {
        } else if (false) {
        } else if (false) {
        } else if (false) {
        } else if (false) {
        } else if (false) {
        } else if (false) {
        } else if (false) {
        } else if (false) {
        } else if (false) {
        } else if (tag_2) {
            // tag_2.click()
            log("确定")
        } else {
            log("轮询中,剩余次数%d", 60 - _G_状态记录器.轮询计数)
            _G_状态记录器.轮询计数 += 1
            if (_G_状态记录器.轮询计数 > 60) {
                _G_状态记录器.注册结果标记 = 1
            }
            sleep(1000)
        }

    }
}



function main() {
    device.keepScreenOn()
    初始化配置数据()
    获取token()
    _G_状态记录器 = new 状态记录器()
    开启监听()
    while (true) {
        _G_状态记录器 = new 状态记录器()
        //这里使用一个特殊标记//使用后
        _G_状态记录器.当前号码信息 = 特殊标记.pop()
        if (_G_状态记录器.当前号码信息) {
            log("本次使用上次的号码信息")
        } else {
            log("本次使用新号码信息")
            _G_状态记录器.当前号码信息 = get_phone_number()
        }
        if (true) {
            log("当前IP不可用,将切换网络")
            修改网络(true) //连接vpn
            // ip可用标记 = true
        }
        log(_G_状态记录器.当前号码信息)
        if (activity_mode=="0") {//原卡解封
            log('使用同卡解封模式')
            _G_状态记录器.提取的信息 = 模糊搜索数据(获取密码_账户, 获取密码_密码, _G_状态记录器.当前号码信息.手机号)
        }else if(activity_mode =="1"){//异卡解封
            log('使用异卡解封模式')
            _G_状态记录器.提取的信息 = 直接读取数据(获取密码_账户, 获取密码_密码)
        }
        
        if (_G_状态记录器.提取的信息) {
            log(_G_状态记录器.提取的信息)
        } else {
            log('获取不到密码信息,拉黑本号,重来')
            lahei(_G_状态记录器.当前号码信息.pid)
            continue
        }
        _G_状态记录器.提取信息对象.手机号 = _G_状态记录器.提取的信息.split("----")[0]//手机号
        _G_状态记录器.提取信息对象.password = _G_状态记录器.提取的信息.split("----")[1]//密码
        _G_状态记录器.提取信息对象.国家代码 = _G_状态记录器.提取的信息.split("----")[2]//密码
        _G_状态记录器.提取信息对象.注册状态 = _G_状态记录器.提取的信息.split("----")[3]//密码
        _G_状态记录器.提取信息对象.A16 = _G_状态记录器.提取的信息.split("----")[4]//密码
        gaiji()
        if (!启动微信()) {
            log("微信启动失败")
            特殊标记.push(_G_状态记录器.当前号码信息)
            continue
        }
        if (!登录()) {
            log("启动微信失败")
            特殊标记.push(_G_状态记录器.当前号码信息)
            continue
        }
        if (guojiama == 0) {
            log("当前选择了马来西亚")
            guojia_number = 60
        } else if (guojiama == 1) {
            log("当前选择了印度尼西亚")
            guojia_number = 62
        }
        tianxie_info(_G_状态记录器.提取信息对象.国家代码, _G_状态记录器.提取信息对象.手机号)

        _G_状态记录器.检测线程 = threads.start(全局检测循环)
        等待结果()
        try {
            _G_状态记录器.检测线程.interrupt()
        } catch (error) {

        }
    }
}

function test() {
    let timeout = 1000
    // 初始化配置数据()
    // 获取token()
    // let aa=get_yanzhengma("100687889921915")
    // log(aa)
    // let login=text(current_语言.登陆).findOne(1000)
    // let tag_11  = text(current_语言.完成).className(my_className_lsit.button).findOne(1000)//确定这个应放在最后
    // let tag_11=className(my_className_lsit.button).find()
    // let tag_11 = text("Done").findOne(timeout)
    // 
    // 修改网络(1)
    let back= desc(current_语言.返回).findOne(1000)
                if (back) {
                    log("返回")
                    back.parent().click()
                }else{
                    log("返回按钮找不到")
                }
    console.hide()
}
// test()
// console.hide()
main()   
