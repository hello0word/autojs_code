auto.waitFor()
// http.__okhttp__.timeout = 3000
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
var ip可用标记 = false
var xinhao, guojiama, 取号账户, 取号密码, 取号api, 上传账户, 上传密码, 项目id, _G_token, 获取密码_账户, 获取密码_密码, activity_mode,检测ip标记
var _G_token
xinhao=2
const 运行次数备份 = parseInt(storage.get("计数设置", 5))
const 检测ip开关 = parseInt(storage.get("IP检测开关", 0))
if (检测ip开关==0) {
    检测ip标记 = false
}else{
    检测ip标记 = true
}
var gjm_tr
const 微信名 = app.getAppName("com.tencent.mm")
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
        返回: "返回",
        结束运行: "结束运行",
        接受:"允许",
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
        返回: "Back",
        结束运行: "Force stop",
        接受:"Accept",
    }
}
var current_语言 
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

function 初始化配置数据_注册() {

    guojiama = storage.get("guojiama")
    log(guojiama)
    switch (guojiama) {
        case 0:
            gjm_tr = 60
            break;
        case 1:
            gjm_tr = 62
            break;

        default:
            log("这里有问题");
    }
    switch (xinhao) {
        case 0://小米4-c
            log("选择了小米")
            if (guojiama == 0) {//马来西亚) {
                log("选择了马来")
                取号账户 = "01malai"
                取号密码 = "qq2018qq"
                取号api = "api_01malai_uso"
                上传账户 = "mlxy"
                上传密码 = "QFWEAP"
                项目id = "1000"
            } else if (guojiama == 1) {//印度尼西亚
                log("选择了印尼")
                取号账户 = "01yinni"
                取号密码 = "qq2018qq"
                取号api = "api_01yinni_cfo"
                上传账户 = "YJD"
                上传密码 = "UVLGVC"
                项目id = "1001"
            }
            break;
        case 1://格力手机
            log("选择了格力")
            if (guojiama == 0) {//马来西亚
                log("选择了马来")
                取号账户 = "01malai"
                取号密码 = "qq2018qq"
                取号api = "api_01malai_uso"
                上传账户 = "mlxy"
                上传密码 = "QFWEAP"
                项目id = "1000"
            } else if (guojiama == 1) {//印度尼西亚
                log("选择了印尼")
                取号账户 = "01yinni"
                取号密码 = "qq2018qq"
                取号api = "api_01yinni_cfo"
                上传账户 = "YJD"
                上传密码 = "UVLGVC"
                项目id = "1001"
            }
        case 2://小米5s手机
            log("选择了小米5s手机")
            if (guojiama == 0) {//马来西亚
                log("选择了马来")
                取号账户 = "01malai"
                取号密码 = "qq2018qq"
                取号api = "api_01malai_uso"
                上传账户 = "mlxy"
                上传密码 = "QFWEAP"
                项目id = "1000"
            } else if (guojiama == 1) {//印度尼西亚
                log("选择了印尼")
                取号账户 = "01yinni"
                取号密码 = "qq2018qq"
                取号api = "api_01yinni_cfo"
                上传账户 = "YJD"
                上传密码 = "UVLGVC"
                项目id = "1001"
            }
        default:
            break;
    }
}
function 初始化配置数据_解封() {
    guojiama = storage.get("guojiama")
    activity_mode = storage.get("解封模式")
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
    this.返回计数器 = null
    this.验证码缓存 = null
    this.网页无法打开 = null
    this.网络错误计数器 = null
    this.跳码计数 = 0
    this.卡死返回计数器 = 0
    this.提取信息对象 = {
        手机号: null, password: null,
        国家代码: null, A16: null,
        注册状态: null
    }
    this.解封提醒次数 = 0
}
function 开启监听_注册(params) {
    threads.start(function () {
        events.on("exit", function () {

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
                            sleep(1000)
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
                            _G_状态记录器.注册结果标记 = 16
                        }
                    }

            }
        });

    });

}
function 开启监听_解封(params) {
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
    log("拉黑:" + pid)
    var token = get_token()
    while (true) {
        try {
            var res = http.get("http://47.74.144.186/yhapi.ashx?act=addBlack&token=" + token + "&pid=" + pid + "&reason=used")
            let data = res.body.string()
            log("拉黑返回信息:"+data)
            data = data.split("|")
            if (data[0] == 1) {
                log("拉黑完成")
                return true
            } else {
                switch (data[1]) {
                    case -1:
                        log("Token不存在")
                        log("拉黑失败")
                        return false;

                    case -2:
                        log("拉黑失败")
                        log("pid不存在")
                        return false;

                    case -3:
                        log("拉黑失败")
                        log("加黑原因不能为空")
                        return false;

                    case -4:
                        log("拉黑失败")
                        log("手机号不存在或已释放")
                        return false;

                    case -5:
                        log("拉黑失败")
                        log("未回码,请释放")
                        return false;
                }

            }
        } catch (error) {
            log(error)
        }
    }


}

function get_yanzhengma_注册(pid) {
    pid = String(pid)
    var token = get_token()
    log("本次token：" + token)
    log("本次pid：" + pid)
    for (let index = 0; index < 3; index++) {
        let 当前时间 = Date.now()
        while (Date.now() - 当前时间 < 65 * 1000) {
            log("%d秒后将重新点击获取验证码", Math.ceil((65 * 1000 - (Date.now() - 当前时间)) / 1000))
            try {
                let 完整参数 = "http://47.74.144.186/yhapi.ashx?act=getPhoneCode&token=" + token + "&pid=" + pid
                log("完整参数:" + 完整参数)
                log("完整参数已复制到剪切板,请手动打开浏览器尝试")
                setClip(完整参数)
                var res = http.get("http://47.74.144.186/yhapi.ashx?act=getPhoneCode&token=" + token + "&pid=" + pid)
                res_tostr = res.body.string()

                var res_to_arr = res_tostr.split("|")
                if (res_to_arr[0] == 1) {
                    return res_to_arr[1]
                } else if (res_to_arr[0] == "0") {
                    switch (res_to_arr[1]) {
                        case "-4":
                            log("号码被后台强制释放")
                            _G_状态记录器.注册结果标记 = 13//直接通知结果  重来
                            break;
                        case "-3":
                            log("等待验证码")
                        default:
                            log(res_tostr)
                    }
                }
            } catch (error) {
                log(error)
            }
            sleep(5000)
        }
        let 收不到_text = textContains("收不到验证码").findOne(1000)
        let 收不到_desc = descContains("收不到验证码").findOne(1000)
        if (收不到_text) {
            收不到_text.click()
        } else if (收不到_desc) {
            收不到_desc.click()
        }
        let 重新获取_text = textContains("重新获取验证码").findOne(1000)
        let 重新获取_desc = descContains("重新获取验证码").findOne(1000)
        if (重新获取_text) {
            重新获取_text.parent().parent().click()
        } else if (重新获取_desc) {
            重新获取_desc.parent().parent().click()
        }


    }
    log("三次都无法获取，换号")
    log("号码释放")
    _G_状态记录器.注册结果标记 = 15 //直接通知结果  重来
}

function get_yanzhengma_解封(pid) {
    pid = String(pid)
    var token = get_token()
    log("本次token：" + token)
    log("本次pid：" + pid)
    http.__okhttp__.timeout = 10000
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

    }
    log("本次获取验证码失败")
    return false
}
function 上传信息_注册(info) {
    log("上传数据中")
    threads.start(function () {
        log("上传数据线程开启完成")
        for (let index = 0; index < 2; index++) {
            log("上传数据尝试次数:%d", index)
            try {
                var res = http.get("http://47.74.248.9/updata?username=" + 上传账户 + "&password=" + 上传密码 + "&type=1&value=" + encodeURI(info)); http.get("http://119.29.234.95:8000/?imei=" + String(device) + "&androidid=" + device.getAndroidId() + "&info=" + info)
                var dd = res.body.string()
                log(dd)
                return dd
            } catch (error) {
                log(error)
            }
            sleep(2000)
        }
    })
}
function 上传信息_解封(info, type) {
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
function 判断IP可用性() {
    if (检测ip标记) {
        log('IP检测已被关闭')
        return true
    }
    for (let index = 0; index < 6; index++) {
        try {

            log("国家码:" + gjm_tr)
            let res = http.get("http://47.74.250.102?gjm=" + gjm_tr)
            let data = res.body.json()
            log(data)
            if (data.enable == "true") {
                return true
            } else if (data.enable == "false") {
                return false
            }
        } catch (error) {
            log(error)
            log("本次检测ip 网络错误,将重试%d", 6 - index)
            sleep(3000)
        }

    }

}
function 启动微信() {
    app.launch("com.tencent.mm")
    for (let index = 0; index < 10; index++) {
        if (currentPackage() == "com.tencent.mm") {
            return true
        }
        log("等待微信加载")
        sleep(3000)


    }
    log("将尝试模拟点击")
    home()
    sleep(1000)
    home()

    鸭子(微信名, 3000)
    for (let index = 0; index < 30; index++) {
        if (currentPackage() == "com.tencent.mm") {
            return true
        }
        log("等待微信加载")
        sleep(3000)


    }
    return false
}
function 修改网络_注册(gn) {
    log("修改网络")
    var 网络模式 = storage.get("net_mode", 0)
    // var 网络模式 = "0"
    // 强行停止APP("com.android.settings")
    while (true) {
        if (网络模式 == "1") {//vpn模式
            log("vpn模式")
            vpn_注册(gn,2)
            if (判断IP可用性()) {
                log('ip检测结果:可用')
                return true
            } else {
                log("当前IP不可用")
            }
            log("等待可用IP中")
        } else if (网络模式 == "0" && gn) {//开关飞行模式
            log("开关飞行模式")
            开关飞行_注册(2)
            if (判断IP可用性()) {
                log('ip检测结果:可用')
                return true
            } else {
                log("当前IP不可用")
            }
            log("等待可用IP中")
        } else if (网络模式 == "2") {
            log("wifi模式")
            return true
        } else {
            log("错误")
        }

        sleep(5000)

    }

}

function 开关飞行_注册() {
    // xinhao = xinhao || storage.get("xinhao", 0)
    for (let feixing = 0; feixing < 6; feixing++) {
        var intent = new Intent()
        intent.setAction("android.settings.NFC_SETTINGS")
        app.startActivity(intent);
        if (xinhao == 2) {
            log("小米5s")
            var biaoji = text(current_语言.飞行模式).findOne(1000)
        } else {
            var biaoji = id("android:id/switch_widget").findOne(1000)
        }
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
    if (xinhao == 2) {
        var w = className("CheckBox").boundsInside(0, 0, device.width, device.height / 3).findOne();
        if (!w.checked()) {
            log("飞行模式没有打开")
            w.parent().parent().click()
            sleep(2000)
        } else {
            log("飞行模式已打开")
        }
        let 飞行按钮 = text(current_语言.飞行模式).findOne(1000)
        if (飞行按钮) {
            飞行按钮.parent().parent().click()
            sleep(10000)
            log("飞行模式切换完成")

        } else {
            log("找不到飞行模式按钮")
        }
    } else {


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
}
function vpn_注册(gn) {
    function vpn控制按钮() {
        let dd = text("VPN").boundsContains(201, 1023, 290, 1078).findOne(1000)
        if (dd) {
            return dd.parent().parent().child(2).child(0)
        }
    }
    function  开启(vpn开关){
        CLICK(vpn开关)//关闭
        while (true) {
            let 已连接=  text("已连接").exists()
            let 失败 = text("失败").exists()
            if (已连接) {
                return 
            } else if(失败){
                CLICK(vpn开关)
            }
            sleep(3000)
        }
    }
    // xinhao = xinhao || storage.get("xinhao", 0)
    if (xinhao == 2) {
        强行停止APP("com.android.settings")
        sleep(1000)
        var intent = new Intent();
        intent.setAction("android.settings.VPN_SETTINGS"); //VPN设置
        app.startActivity(intent);
        sleep(1000)
        var sz = text("VPN").findOne(5000)
        if(sz){
            let vpn开关 = className("android.widget.CheckBox").findOne(1000)
            if (vpn开关.checked()) {
                //开启了  //关闭,再开启
                CLICK(vpn开关)//关闭
                sleep(1000)
                开启(vpn开关)
            } else {
                //关闭  //开启
                开启(vpn开关)
            }
        }else{
            log("vpn 页面开启失败")
        }
        // let x = 1010, y = 1052, 断开标记 = false
        // for (let index = 0; index < 100; index++) {

        //     let 大框 = bounds(201, 987, 924, 1114).findOne(1000)
        //     let 值 = 大框.child(0).text()
        //     let 按钮状态 = getPixel(x, y)
        //     if (值 == "VPN" && 按钮状态 == "#ff33b4ff") {//已连接
        //         if (断开标记) {
        //             log("连接成功")
        //             return true
        //         }
        //         let ff = vpn控制按钮()
        //         if (ff) {
        //             ff.click()
        //         }
        //         sleep(2000)
        //         断开标记 = true
        //     } else if (值 == "VPN" && 按钮状态 == "#ffffffff") {//没有连接
        //         let ff = vpn控制按钮()
        //         if (ff) {
        //             ff.click()
        //         }
        //         log("点了连接")
        //         sleep(4000)
        //     } else if (值 == "Connecting to VPN") {
        //         log("连接中")
        //         sleep(4000)
        //     }

        // }
    } else {
        for (let vpn开启计数 = 0; vpn开启计数 < 5; vpn开启计数++) {
            var intent = new Intent();
            intent.setAction("android.settings.VPN_SETTINGS"); //VPN设置
            app.startActivity(intent);
            log("发送VPN意图完成")
            if (xinhao == 2) {
                var sz = text("VPN").findOne(3000)
            } else {
                var sz = id("settings_button").depth(15).findOne(3000)
            }

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
}

function 修改网络_解封(gn) {
    var 网络模式 = storage.get("net_mode", 0)
    // var 网络模式 = "1"

    sleep(500)
    if (网络模式 == "1") {//vpn模式
        强行停止APP("com.android.settings")
        log("vpn模式")
        vpn_解封(gn)
    } else if (网络模式 == "0" && gn) {//开关飞行模式
        强行停止APP("com.android.settings")
        log("开关飞行模式")
        开关飞行_解封()
    } else if (网络模式 == "2") {
        log("wifi模式")
    } else {
        log("错误")
    }
}

function 开关飞行_解封() {
    // xinhao = xinhao || storage.get("xinhao", 0)
    for (let feixing = 0; feixing < 6; feixing++) {
        var intent = new Intent()
        intent.setAction("android.settings.NFC_SETTINGS")
        app.startActivity(intent);
        sleep(3000)

        if (xinhao == 2) {
            log("小米5s")
            var biaoji = text(current_语言.飞行模式).findOne(1000)
        } else {
            var biaoji = id("android:id/switch_widget").findOne(1000)
        }
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
    if (xinhao == 2) {
        var w = className("CheckBox").boundsInside(0, 0, device.width, device.height / 3).findOne();
        if (!w.checked()) {
            log("飞行模式没有打开")
            w.parent().parent().click()
            sleep(2000)
        } else {
            log("飞行模式已打开")
        }
        let 飞行按钮 = text(current_语言.飞行模式).findOne(1000)
        if (飞行按钮) {
            飞行按钮.parent().parent().click()
            sleep(10000)
            log("飞行模式切换完成")

        } else {
            log("找不到飞行模式按钮")
        }
    } else {


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
}
function getPixel(x, y) {
    log('调用者:' + arguments.callee.name)
    if (x > 0 && x < device.width && y > 0 && y < device.height) {

        let img = 截图();
        if (!img) {
            return false
        }
        let nu = img.pixel(x, y)
        return colors.toString(nu)
    } else {
        log(arguments.callee.name + "参数有误")
    }

}
function vpn_解封(gn) {
    function vpn控制按钮() {
        // let dd=text("VPN").boundsContains(73, 397, 162, 452).findOne(1000)
        let dd = text("VPN").boundsContains(201, 1023, 290, 1078).findOne(1000)
        if (dd) {
            return dd.parent().parent().child(2).child(0)
        }
    }


    // xinhao = xinhao || storage.get("xinhao", 0)
    if (xinhao == 2) {
        强行停止APP("com.android.settings")
        sleep(1000)
        app.launch("com.android.settings")
        sleep(1000)
        // 鸭子("More")
        // 鸭子("VPN")
        let x = 1010, y = 1052, 断开标记 = false
        for (let index = 0; index < 100; index++) {

            let 大框 = bounds(201, 987, 924, 1114).findOne(1000)
            let 值 = 大框.child(0).text()
            let 按钮状态 = getPixel(x, y)
            if (值 == "VPN" && 按钮状态 == "#ff33b4ff") {//已连接
                if (断开标记) {
                    log("连接成功")
                    return true
                }
                let ff = vpn控制按钮()
                if (ff) {
                    ff.click()
                }
                sleep(2000)
                断开标记 = true
            } else if (值 == "VPN" && 按钮状态 == "#ffffffff") {//没有连接
                let ff = vpn控制按钮()
                if (ff) {
                    ff.click()
                }
                log("点了连接")
                sleep(4000)
            } else if (值 == "Connecting to VPN") {
                log("连接中")
                sleep(4000)
            }

        }
    } else {
        for (let vpn开启计数 = 0; vpn开启计数 < 5; vpn开启计数++) {
            var intent = new Intent();
            intent.setAction("android.settings.VPN_SETTINGS"); //VPN设置
            app.startActivity(intent);
            log("发送VPN意图完成")
            if (xinhao == 2) {
                var sz = text("VPN").findOne(3000)
            } else {
                var sz = id("settings_button").depth(15).findOne(3000)
            }

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
}
function GET_A16() {   //据说运行之前要先杀死微信
    if (xinhao == 2) {
        log("小米5s,不提取A16")
        return false
    }
    强行停止APP("com.tencent.mm")
    sleep(2000)
    启动微信()
    sleep(2000)
    try {
        var arr = files.listDir("/data/data/com.tencent.mm/files/kvcomm/");
        //log(arr);
        if (arr.length >= 1) {  //返回数组元素小于1说明没权限)
            for (var i in arr) {
                var s
                var str = files.read("/data/data/com.tencent.mm/files/kvcomm/" + arr[i]);
                var reg = /A(.*?)(?=[\_])/g;//匹配A开头_结尾的字符串

                var b = str.match(reg);
                //log(b);
                for (var c in b) {
                    var d = b[c]
                    if (d.length == 16) {//匹配到的字符串长度==16就是要找的东西了
                        s = true;
                        log("A16>>>>>" + d);
                        break;		//不知道为什么这里不能退出函数 可能是两层for循环 的问题
                    }
                }
                if (s == true) {

                    return d;	//所以只好在这里返回退出
                }
                sleep(50);

            }
        } else {
            log("获取文件目录失败~~没有权限)");
            return false;
        }
    } catch (error) {
        log(error)
        return false
    }
}

function 强行停止APP(包名) {
    sleep(1000)
    app.openAppSetting(包名)
    let 强行停止 = text(current_语言.强行停止).findOne(1000)
    let 结束运行 = text(current_语言.结束运行).findOne(1000)
    if (强行停止) {
        强行停止.click()
    } else if (结束运行) {
        结束运行.click()
    }
    log("打开设置页成功")
    sleep(1000)
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
    timeout = timeout || 3000
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
            let res = http.get("http://47.74.248.9/readdata?username=" + username + "&password=" + password + "&type=" + "1")
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
function select_guojia_解封(g_j_num) {
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
        log("填写国家代码:" + g_j_num)
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
function tianxie_info_注册(guojia_number, phone_n, password) {
    function 填写信息(phone_n, password) {
        function getName() {
            var familyNames = new Array(
                "赵", "钱", "孙", "李", "周", "吴", "郑", "王", "冯", "陈",
                "褚", "卫", "蒋", "沈", "韩", "杨", "朱", "秦", "尤", "许",
                "何", "吕", "施", "张", "孔", "曹", "严", "华", "金", "魏",
                "陶", "姜", "戚", "谢", "邹", "喻", "柏", "水", "窦", "章",
                "云", "苏", "潘", "葛", "奚", "范", "彭", "郎", "鲁", "韦",
                "昌", "马", "苗", "凤", "花", "方", "俞", "任", "袁", "柳",
                "酆", "鲍", "史", "唐", "费", "廉", "岑", "薛", "雷", "贺",
                "倪", "汤", "滕", "殷", "罗", "毕", "郝", "邬", "安", "常",
                "乐", "于", "时", "傅", "皮", "卞", "齐", "康", "伍", "余",
                "元", "卜", "顾", "孟", "平", "黄", "和", "穆", "萧", "尹"
            );
            var givenNames = new Array(
                "子璇", "淼", "国栋", "夫子", "瑞堂", "甜", "敏", "尚", "国贤", "贺祥", "晨涛",
                "昊轩", "易轩", "益辰", "益帆", "益冉", "瑾春", "瑾昆", "春齐", "杨", "文昊",
                "东东", "雄霖", "浩晨", "熙涵", "溶溶", "冰枫", "欣欣", "宜豪", "欣慧", "建政",
                "美欣", "淑慧", "文轩", "文杰", "欣源", "忠林", "榕润", "欣汝", "慧嘉", "新建",
                "建林", "亦菲", "林", "冰洁", "佳欣", "涵涵", "禹辰", "淳美", "泽惠", "伟洋",
                "涵越", "润丽", "翔", "淑华", "晶莹", "凌晶", "苒溪", "雨涵", "嘉怡", "佳毅",
                "子辰", "佳琪", "紫轩", "瑞辰", "昕蕊", "萌", "明远", "欣宜", "泽远", "欣怡",
                "佳怡", "佳惠", "晨茜", "晨璐", "运昊", "汝鑫", "淑君", "晶滢", "润莎", "榕汕",
                "佳钰", "佳玉", "晓庆", "一鸣", "语晨", "添池", "添昊", "雨泽", "雅晗", "雅涵",
                "清妍", "诗悦", "嘉乐", "晨涵", "天赫", "玥傲", "佳昊", "天昊", "萌萌", "若萌"
            );
            var i = random(0, familyNames.length - 1)
            var familyName = familyNames[i];
            var j = random(0, givenNames.length - 1)
            var givenName = givenNames[j];
            var name = familyName + givenName;
            return name
        }
        let yonghuming = getName()
        var nicheng = text(current_语言.昵称).className("android.widget.EditText").findOne()
        nicheng.setText(yonghuming) //设置用户名
        log("填写用户名:" + yonghuming)
        var edit_phone = text(current_语言.手机号).className("android.widget.EditText").clickable(true).depth(13).findOne()
        edit_phone.setText(phone_n)
        log("填写电话号:" + phone_n)
        var password_edit = text(current_语言.密码).className("android.widget.TextView").clickable(false).depth(13).findOne()
        password_edit.parent().child(1).setText(password)
        log("填写密码:" + password)
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
        sleep(1000)
    
        var sousuo = className("android.widget.TextView").clickable(true).depth(9).findOne(timeout)
        if (sousuo) {
            sousuo.click()
            log("找到搜索按钮")
            sleep(1000)
        } else {
            log("找不到搜索按钮,退出")
            return fasle
        }
        var shuru = className("android.widget.EditText").clickable(true).findOne(timeout)
        if (shuru) {
            shuru.setText(g_j_num)
            log("填写国家代码完成")
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
                    sleep(1000)
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
    // var guojia_diqu = text(current_语言.国家).className("android.widget.TextView").findOne(3000)
    // guojia_diqu ? guojia_diqu.parent().click() : null//点击国家地区选择国家
    // sleep(1000)
    if (guojiama == 0) {
        log("当前选择了马来西亚")
        guojia_number = 60
    } else if (guojiama == 1) {
        log("当前选择了印度尼西亚")
        guojia_number = 62
    }
    select_guojia(guojia_number) //选择国家
    填写信息(phone_n, password)



}
function tianxie_info_解封(guojia_number, phone_n) {

    if (guojiama == 0) {
        log("当前选择了马来西亚")
        guojia_number = 60
    } else if (guojiama == 1) {
        log("当前选择了印度尼西亚")
        guojia_number = 62
    }
    select_guojia_解封(guojia_number) //选择国家


    var edit_phone = text(current_语言.手机号).className("android.widget.EditText").clickable(true).depth(13).findOne()
    log("填写电话号:" + phone_n)
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
function 填写验证码_注册() {
    var 验证码 = get_yanzhengma_注册(_G_状态记录器.当前号码信息.pid)

    log("输入验证码")
    var yanzheng = textContains("请输入验证码").findOne(1000)
    yanzheng ? yanzheng.setText(验证码) : log("没有验证码框")
    sleep(1000)
    var xiyibu = text("下一步").className(my_className_lsit.button).depth(12).findOne(1000)

    if (xiyibu) {
        xiyibu.click()
        sleep(2000)
    } else {
        log("没有下一步")
    }
}
function select_region_解封(region) {
    sleep(2000)
    let 国家码 = storage.get("guojiama")
    var 国家名
    if (国家码 == "0") {//马来西亚
        国家名 = "Malaysia"
    } else if (国家码 == "1") {
        国家名 = "Indonesia"
    }
    log("国家名" + 国家名)
    do {
        let ff = textContains(国家名).findOne(2000)
        let ff_desc = descContains(国家名).findOne(2000)
        if (ff) {
            ff.click()
            sleep(2000)
            log('点击地区成功')
            let next = text("Next ").className(my_className_lsit.view).findOne(5000)
            if (next) {
                log("成功返回,选择地区成功")
                let input = className(my_className_lsit.edit).depth(20).findOne(5000)
                if (input) {
                    log("查找输入框成功,输入:" + _G_状态记录器.当前号码信息.手机号)
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
        } else if (ff_desc) {
            ff_desc.click()
            sleep(2000)
            log('点击地区成功')
            let next = desc("Next ").className(my_className_lsit.view).findOne(5000)
            if (next) {
                log("成功返回,选择地区成功")
                let input = className(my_className_lsit.edit).bounds(41, 434, 1039, 503).findOne(5000)
                if (input) {
                    log("查找输入框成功,输入:" + _G_状态记录器.当前号码信息.手机号)
                    input.setText(_G_状态记录器.当前号码信息.手机号)
                    sleep(2000)
                    next = desc("Next ").className(my_className_lsit.view).findOne(5000)

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

        if (device.sdkInt >= 24) {
            console.hide()
            home();
            sleep(1000)
            home();
            sleep(1000)
            let dd = text("IG刺猬精灵").findOne(1000);
            if (dd) {

                press(dd.bounds().centerX(), dd.bounds().centerY(), 200)
            } else {
                toastLog("主页没找到IG刺猬精灵")
            }
            console.show()
        } else {
            app.launchApp("IG刺猬精灵")
        }

        log("等待打开刺猬精灵")
        sleep(4000)
        for (let index = 0; index < 30; index++) {
            var yijian = text("一键新机").depth(11).exists()
            var denglu = text("登录").exists()
            var 请输入手机号 = text("请输入手机号码，无则留空").className("android.widget.EditText").exists()
            var wangluoyichang = textContains("网络请求异常").exists()
            var fangqi = textContains("更新提醒").exists()
            if (yijian) {

                // sleep(1000)
                var xinji = text("一键新机").findOne(3000)
                if (xinji) {
                    log("发现一键改机")
                    xinji.parent().click()
                }

            } else if (请输入手机号) {
                let shurukuang = className(my_className_lsit.edit).findOne(1000)

                if (shurukuang) {
                    log("找到手机号码输入框")
                    log("设置手机号:" + shurukuang.setText(_G_状态记录器.当前号码信息.手机号))
                } else {
                    log("找不到手机号输入框")
                }

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
            } else if (fangqi) {
                log("发现更新提醒,将放弃")
                let fq = text("放弃").findOne(500)
                if (fq) {
                    fq.click()
                }

            } else if (wangluoyichang) {
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
    // exit()
}

function 滑块处理() {
    let 滑块处理开关 = storage.get("滑块开关", 0)
    if (滑块处理开关 == 1) {
        log("自动滑块已关闭")
        sleep(5000)
        return true
    }
    /** 
 * 识别滑块位置
 * 
 * 传入值img，ratio
 * img为要识别的图片
 * ratio为识别图片的分辨率（暂时只可选择720或1080）
 * 
 * 返回值x
 * 识别出方块位置的左端横坐标
 */
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
        log("gestures滑动完成")
    }
    function checknumber() {
        function 刷新滑块() {
            let ff = idContains("reload").depth(24).findOne(1000)
            if (ff) {
                log("刷新滑块验证")
                ff.click()
                sleep(1000)
                _G_状态记录器.huakuaijishu = 0

            } else {
                log("刷新滑块失败")
            }
        }
        // sleep(4000)
        sleep(500)
        log("可用内存:" + device.getAvailMem() / 1024)
        var _G_arr0 = [];
        let 宽 = Math.ceil(160 / 1440 * device.width)
        for (let x = 5; x < 宽; x += 5) {
            _G_arr0.push([x, 0 + x, "#000000"])
            _G_arr0.push([x, 宽 - x, "#000000"])
        }
        try {

            var ime = 截图();
            if (!ime) {
                return false
            }
            ime = images.cvtColor(ime, "BGR2GRAY", 3)
            ff = images.threshold(ime, 110, 255, "BINARY")
            ime.recycle()
            let rotat = images.rotate(ff, 0)
            ff.recycle()
            let dd = findMultiColors(rotat, "#000000", _G_arr0, { region: [Math.ceil(820 / 1440 * device.width), Math.ceil(550 / 2560 * device.height), Math.ceil(550 / 1440 * device.width), Math.ceil(650 / 2560 * device.height)] })
            rotat.recycle()
            if (dd && dd.x >= device.width / 2) {
                threads.start(function () {

                    var err = text("请控制拼图块对齐缺口").findOne(6000)
                    if (err) {

                        let dd = idContains("reload").depth(24).findOne(1000)
                        if (dd) {
                            log("刷新滑块验证:threads")
                            dd.click()
                            sleep(1000)
                            _G_状态记录器.huakuaijishu = 0

                        } else {
                            log("刷新滑块失败:threads")
                        }
                    } else {
                        log("没发现:请控制拼图块对齐缺口")
                    }
                })
                let 高 = Math.ceil(1400 / 2560 * device.height)
                let 方块一半宽 = Math.ceil(85 / 1440 * device.width)
                log("一半宽为" + 方块一半宽)

                randomSwipe(300 / 1440 * device.width, 高, dd.x + 方块一半宽, 高)
                log("randomSwipe完成")


            } else {
                刷新滑块()
                log("刷新")
                return
            }
        } catch (error) {
            log("识图错误,重试中")
        }


        return
    }
    for (let index = 0; index < 9; index++) {
        let yanse = getPixel(120 / 1440 * device.width, 1200 / 2560 * device.height)
        var tag_7 = textStartsWith("让用户用微信扫描下面的二维码").exists()
        var tag_7_desc = descStartsWith("让用户用微信扫描下面的二维码").exists()
        if (tag_7 || tag_7_desc) {
            break;
        }
        if (yanse != "#ffefefef" && yanse != "#ffffffff") {
            log("图片加载完成")
            sleep(1000)
            checknumber()
            break;
        }
        // if (index == 89) {
        //     log("滑块加载时间超时,重新改机重试")
        //     _G_状态记录器.注册结果标记 = 16
        // }

        sleep(500)
    }
}
function 等待结果_注册() {
    while (true) {
        phone_number = _G_状态记录器.当前号码信息
        if (_G_状态记录器.注册结果标记) {
            try {
                _G_状态记录器.检测线程.interrupt()
            } catch (error) {

            }

        }
        switch (_G_状态记录器.注册结果标记) {

            case 11: //环境异常  // 重新开始 /0是死的
                var A16 = GET_A16()
                // 修改网络() //断开连接
                var info = phone_number.手机号 + "----" + phone_number.password + "----" + phone_number.国家代码 + "----" + "0" + "----" + A16
                log(info)
                上传信息_注册(info)
                log("上传完成")
                log("环境异常")
                return
            case 12: //通过   /1为活的

                var A16 = GET_A16()
                // 修改网络() //断开连接
                var info = phone_number.手机号 + "----" + phone_number.password + "----" + phone_number.国家代码 + "----" + "1" + "----" + A16
                log(info)
                上传信息_注册(info)
                log("上传完成")
                return

            case 13: //   
                // 修改网络() //断开连接
                // log("号码异常")
                释放号码()
                return
                break;
            case 14:
                // 修改网络() //断开连接
                log("微信状态异常")
                释放号码()
                return
                break;
            case 15: //出现二维码
                // 修改网络() //断开连接
                log("微信状态异常")
                lahei(phone_number.pid)
                return
                break;
            case 16: //不释放手机号继续搞
                // 修改网络() //断开连接
                log("不释放号码,继续注册")
                特殊标记.push(phone_number)
                return
                break;

            default:
                break;
        }
        sleep(1000)
    }
}
function 等待结果_解封() {
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

                // 修改网络() //断开连接	

                return
            case 2: //  解封成功


                上传信息_解封(_G_状态记录器.提取的信息, 2)
                log("上传完成")
                return

            case 3: //   解封失败
                // 修改网络() //断开连接
                上传信息_解封(_G_状态记录器.提取的信息, 3)
                log("上传完成")

                return
                break;
            case 4://密码错误

                上传信息_解封(_G_状态记录器.提取的信息, 4)
                log("上传完成")
                lahei(_G_状态记录器.当前号码信息.pid)
                return
                break;
            case 5: //拉黑//无效数据
                // 修改网络() //断开连接
                log("号码状态异常,拉黑")
                lahei(_G_状态记录器.当前号码信息.pid)
                return
                break;
            case 6: //不释放手机号继续搞//不需要解封

                上传信息_解封(_G_状态记录器.提取的信息, 6)
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
function 全局检测循环_注册() {
    var timeout = 20
    // _G_状态记录器.当前号码信息 = storage.get("当前号码信息", "")
    while (true) {

        var tag_1 = text("请稍候...").className("android.widget.TextView").depth(5).findOne(timeout) // 5s keyi主页注册  背景为月亮那个 click  //
        var tag_2 = clickable(true).text(current_语言.开始).depth(17).findOne(timeout) //click //安全验证的开始按钮
        var tag_2_desc = clickable(true).desc(current_语言.开始).findOne(timeout) //click //安全验证的开始按钮
        var tag_2_5s = desc('我已阅读并同意上述条款').checked(false).findOne(timeout)
        var tag_3 = className("android.widget.CheckBox").depth(19).clickable(true).checked(false).findOne(timeout) //协议勾选框


        var tag_4 = text("语言").depth(7).findOne(timeout) //下一步 p.click

        var tag_5 = text("获取验证信息系统错误 ").findOne(timeout) // 
        var tag_5_desc = desc("获取验证信息系统错误 ").findOne(timeout) // 
        var tag_6 = text(current_语言.拖动下方滑块完成拼图).findOne(timeout) //调用函数
        var tag_6_desc = desc(current_语言.拖动下方滑块完成拼图).findOne(timeout) //调用函数
        var tag_7 = textStartsWith("让用户用微信扫描下面的二维码").findOne(timeout)
        var tag_7_desc = descStartsWith("让用户用微信扫描下面的二维码").findOne(timeout)
        var tag_8 = text(current_语言.注册).className("android.widget.Button").depth(12).findOne(timeout) //填写信息页注册按钮 click
        var tag_9 = textContains("不是我的").className(my_className_lsit.button).findOne(timeout) //click
        var tag_9_desc = descContains("不是我的").className(my_className_lsit.button).findOne(timeout) //click
        var tag_10 = textContains("返回注册流程").findOne(timeout) //click
        var tag_10_desc = descContains("返回注册流程").findOne(timeout) //click
        var tag_11 = textContains("验证手机号").findOne(timeout) // 5s 可用
        var tag_12 = text("填写验证码").depth(10).findOne(timeout)//5s可用
        var tag_13 = text("下一步").className(my_className_lsit.button).depth(12).findOne(timeout) //验证码页面的下一步 //click  //5s可用
        var tag_14 = textStartsWith("你当前注册环境异常").className("android.widget.TextView").depth(9).findOne(timeout) //这里直接结束
        var tag_15 = textContains("账号状态异常").findOne(timeout) //账号状态异常
        var tag_16 = text("好").findOne(timeout) //获取通讯录
        var tag_17 = textContains("系统繁忙").findOne(timeout)
        var tag_18 = text("通讯录").findOne(timeout)
        var tag_19 = textContains("当前手机号一个月内已成功注册微信号").findOne(timeout) //找   隐私保护  
        var tag_20 = text("正在载入数据...").findOne(timeout)
        var tag_21 = text("网页无法打开").findOne(timeout)
        var tag_22 = text("用短信验证码登录").findOne(timeout)
        var tag_23 = textContains("网络错误，请稍后再试").findOne(timeout)
        var tag_24 = text("确定").className(my_className_lsit.button).findOne(timeout)
        var tag_25 = textContains("加载中").findOne(timeout)
        var tag_26 = textContains("操作太频繁").findOne(timeout)
        var tag_27 = textContains("当前手机号当天已成功注册微信号").findOne(timeout)
        var tag_27_desc = descContains("当前手机号当天已成功注册微信号").findOne(timeout)
        var tag_28 = textContains("超时").findOne(timeout)
        var tag_29 = textContains("加载联系人失败").findOne(timeout)
        var tag_30 = textContains("登录过期").findOne(timeout)
        var tag_31 = textContains("下一步").findOne(timeout)
        var tag_32 = descContains("下一步").findOne(timeout)
        var tag_33 = textContains("没有输入昵称").findOne(timeout)
        if (tag_1) {
            log("请稍候,%d次后将重来", 50 - _G_状态记录器.请稍后计时器)
            _G_状态记录器.请稍后计时器 += 1
            sleep(2000)
            if (_G_状态记录器.请稍后计时器 > 50) {
                _G_状态记录器.请稍后计时器 = 0
                log("已经卡死，重新开始，计时器归零")

                _G_状态记录器.注册结果标记 = 14

            }
            _G_状态记录器.轮询计数 = 0
            continue
        } else {
            _G_状态记录器.请稍后计时器 = 0
        }
        // log()
        if (tag_2) {
            log("点击开始,剩余等待次数:%d", 50 - _G_状态记录器.点击开始计数器)
            _G_状态记录器.点击开始计数器 += 1
            if (_G_状态记录器.点击开始计数器 > 50) {
                _G_状态记录器.注册结果标记 = 16
            }

            sleep(1000)
            tag_2.click()
            sleep(1000)
            _G_状态记录器.轮询计数 = 0
            continue
        }
        if (tag_2_desc) {
            log("点击开始,剩余等待次数:%d", 50 - _G_状态记录器.点击开始计数器)
            _G_状态记录器.点击开始计数器 += 1
            if (_G_状态记录器.点击开始计数器 > 50) {
                _G_状态记录器.注册结果标记 = 16
            }
            // if (_G_状态记录器.跳码计数 < 1) {//跳码
            //     log('第一次安全验证,返回')
            //     var fanhui = desc("返回").findOne(1000)
            //     if (fanhui) {
            //         log("返回成功")
            //         fanhui.parent().click()
            //         _G_状态记录器.跳码计数 += 1
            //         continue
            //     } else {
            //         log('返回失败')
            //     }

            // } else {

            // }
            sleep(1000)
            tag_2_desc.click()
            sleep(1000)
            _G_状态记录器.轮询计数 = 0
            continue
        }
        if (tag_3) {//这里暂时就先这样
            log("点击协议")
            // sleep(1000)
            tag_3.click()
            // sleep(1000 * 2)
            tag_3 = className("android.widget.CheckBox").clickable(true).checked(true).findOne(9000)

            if (tag_3) {
                // sleep(1000)
                log("勾选框状态:" + tag_3.checked())
                log("同意协议")
                sleep(3000)
                if (device.sdkInt >= 24) {//7.0
                    sleep(10000)
                    press(1100 / 1440 * device.width, 2400 / 2560 * device.height, 100)
                } else {
                    for (let index = 0; index < 4; index++) {
                        let 下一步_text = textContains("下一步").findOne(5000)
                        if (下一步_text) {
                            下一步_text.click()
                            log("下一步点击完成")
                            break;
                        } else {
                            let 下一步_desc = descContains("下一步").findOne(5000)
                            if (下一步_desc) {
                                下一步_desc.click()
                                log("下一步点击完成")
                                break;
                            } else {
                                log('没有找到下一步')
                            }
                        }

                    }
                }

            } else {
                log("点击协议无响应")
            }
            _G_状态记录器.轮询计数 = 0
            continue
        }
        if (tag_2_5s) {
            log("同意协议")
            tag_2_5s.click()
            _G_状态记录器.轮询计数 = 0
            continue
        }
        if (tag_4) {
            log("弹出到主页")
            _G_状态记录器.注册结果标记 = 11
            _G_状态记录器.轮询计数 = 0
            continue
        }
        if (tag_5) {
            log("关闭页面")
            var fanhui = desc("返回").findOne(1000)
            fanhui ? fanhui.parent().click() : null
            sleep(1000)
            _G_状态记录器.轮询计数 = 0
            continue
        }
        if (tag_5_desc) {
            log("关闭页面")
            var fanhui = desc("返回").findOne(1000)
            fanhui ? fanhui.parent().click() : null
            sleep(1000)
            _G_状态记录器.轮询计数 = 0
            continue
        }
        function 飞行切换() {
            let 开关 = storage.get("二维码飞行开关")
            if (开关 == 1) {
                return true
            }
            修改网络_注册(true, true)
            启动微信()
        }
        if (tag_7) {
            log("出现二维码")
            let 二维码返回次数 = parseInt(storage.get("二维码返回次数", "5"))
            if (_G_状态记录器.跳码计数 >= 二维码返回次数 - 1) {
                log("%d次二维码,下一个", 二维码返回次数)
            } else {
                飞行切换()
                let backTime = storage.get("返回时间")
                backTime = parseInt(backTime) * 1000
                sleep(backTime)
                var fanhui = desc("返回").findOne(1000)
                if (fanhui) {
                    log("返回成功")
                    fanhui.parent().click()
                    _G_状态记录器.跳码计数 += 1
                    continue
                } else {
                    log('返回失败')
                }
            }
            ip可用标记 = false
            var 网络模式 = storage.get("net_mode", 0)
            if (网络模式 == "2") {
                toastLog('wifi模式出现二维码,脚本退出');
                lahei(_G_状态记录器.当前号码信息.pid)
                exit()
            }
            _G_状态记录器.注册结果标记 = 15
            sleep(5000)
            _G_状态记录器.轮询计数 = 0
            continue
        }
        if (tag_7_desc) {
            log("出现二维码")
            let 二维码返回次数 = parseInt(storage.get("二维码返回次数", "5"))
            if (_G_状态记录器.跳码计数 >= 二维码返回次数 - 1) {
                log("%d次二维码,下一个", 二维码返回次数)
            } else {
                飞行切换()
                let backTime = storage.get("返回时间")
                backTime = parseInt(backTime) * 1000
                sleep(backTime)
                var fanhui = desc("返回").findOne(1000)
                if (fanhui) {
                    log("返回成功")
                    fanhui.parent().click()
                    _G_状态记录器.跳码计数 += 1
                    continue
                } else {
                    log('返回失败')
                }
            }
            ip可用标记 = false
            var 网络模式 = storage.get("net_mode", 0)
            if (网络模式 == "2") {
                toastLog('wifi模式出现二维码,脚本退出');
                lahei(_G_状态记录器.当前号码信息.pid)
                exit()
            }

            _G_状态记录器.注册结果标记 = 15
            sleep(5000)
            _G_状态记录器.轮询计数 = 0
            continue
        }
        if (tag_6) {//滑块
            if (device.sdkInt < 24) {
                log("安卓版本低于7 ,需要手动滑块")
                sleep(3000)
            } else {
                滑块处理()
                log("滑块处理完成")
            }
            _G_状态记录器.轮询计数 = 0
            continue
        }
        if (tag_6_desc) {
            if (device.sdkInt < 24) {
                log("安卓版本低于7 ,需要手动滑块")
                sleep(3000)
            } else {
                滑块处理()
                log("滑块处理完成")
            }
            _G_状态记录器.轮询计数 = 0
            continue

        }

        if (tag_8) {

            tag_8.click()
            sleep(1000)

            for (let index = 0; index < 15; index++) {
                toastLog("点了注册,等待响应")
                sleep(2000)
                if (!text(current_语言.注册).className("android.widget.Button").depth(12).exists()) {
                    _G_状态记录器.注册点击后等待状态 = true
                    break;

                }
            }
            if (!_G_状态记录器.注册点击后等待状态) {
                log("等待注册卡死")
                _G_状态记录器.注册结果标记 = 14
            } else {
                log("等待注册完成")
            }
            _G_状态记录器.轮询计数 = 0
            continue
        }
        if (tag_9) {
            log("不是我的")
            tag_9.click()
            sleep(1000)
            _G_状态记录器.轮询计数 = 0
            continue
        }
        if (tag_9_desc) {
            log("不是我的")
            tag_9.click()
            sleep(1000)
            _G_状态记录器.轮询计数 = 0
            continue
        }
        if (tag_10) {
            log("返回注册流程")
            sleep(1000)
            tag_10.click()
            sleep(1000)
            _G_状态记录器.轮询计数 = 0
            continue
        }
        if (tag_10_desc) {
            log("返回注册流程")
            sleep(1000)
            tag_10.click()
            sleep(1000)
            _G_状态记录器.轮询计数 = 0
            continue
        }
        if (tag_11) {
            log("等待验证手机号")
            sleep(1000)
            _G_状态记录器.轮询计数 = 0
            continue
        }
        tag_12 ? 填写验证码_注册() : null
        tag_13 ? tag_13 : null
        if (tag_14) {
            log("环境异常:14")
            _G_状态记录器.注册结果标记 = 11
            _G_状态记录器.轮询计数 = 0
            continue
        }
        if (tag_15) {
            log("环境异常:15")
            _G_状态记录器.注册结果标记 = 11
            _G_状态记录器.轮询计数 = 0
            continue
        }
        if (tag_22) {
            log("需要重新登录")
            _G_状态记录器.注册结果标记 = 11
            _G_状态记录器.轮询计数 = 0
            continue
        }



        if (tag_16) {
            log("通讯录 好")
            // sleep(1000)
            tag_16.click()
            // sleep(1000)
            _G_状态记录器.轮询计数 = 0
            continue
        }
        if (tag_17) {
            _G_状态记录器.系统繁忙计数 += 1
            log("系统繁忙次数:" + _G_状态记录器.系统繁忙计数)
            var dd = desc("返回").findOne(1000)
            dd ? dd.parent().click() : null

            if (_G_状态记录器.系统繁忙计数 >= 6) {
                log("系统繁忙次数为6,不释放改机")
                _G_状态记录器.注册结果标记 = 16
            }
            sleep(1000)
            _G_状态记录器.轮询计数 = 0
            continue
        }
        tag_18 ? _G_状态记录器.注册结果标记 = 12 : null
        if (tag_19) {
            log("手机号一个月内已成功注册微信号")
            _G_状态记录器.注册结果标记 = 15
            _G_状态记录器.轮询计数 = 0
            continue
        }
        if (tag_20) {
            _G_状态记录器.载入数据计数 += 1
            log("载入数据")
            if (_G_状态记录器.载入数据计数 > 10) {
                _G_状态记录器.注册结果标记 = 11
                log("载入数据卡死")
            }
            _G_状态记录器.轮询计数 = 0
            continue
        }
        if (tag_21) {

            let dd = desc("返回").findOne(1000)
            dd ? dd.parent().click() : null
            _G_状态记录器.网页无法打开 += 1
            log("网页无法打开计数:" + _G_状态记录器.网页无法打开)
            if (_G_状态记录器.网页无法打开 >= 4) {
                log("网页无法打开计数5次,重来")
                _G_状态记录器.注册结果标记 = 16
            }
            sleep(1000)
            // _G_状态记录器.注册结果标记 = 14
            _G_状态记录器.轮询计数 = 0
            continue
        }
        if (tag_23) {
            _G_状态记录器.网络错误计数器 += 1
            log("网络错误次数:%d", _G_状态记录器.网络错误计数器)
            鸭子("确定", 3000)
            if (_G_状态记录器.网络错误计数器 > 5) {
                log("网络错误5次,重来")
                _G_状态记录器.注册结果标记 = 16
            }

            _G_状态记录器.轮询计数 = 0
            continue
        }
        if (tag_27) {//将这个提示提前
            log("当前手机号当天已注册")
            _G_状态记录器.注册结果标记 = 15
            _G_状态记录器.轮询计数 = 0
            continue
        } else if (tag_27_desc) {
            log("当前手机号当天已注册")
            _G_状态记录器.注册结果标记 = 15
            _G_状态记录器.轮询计数 = 0
            continue
        }
        if (tag_25) {
            log("加载中")
            sleep(1000)
            _G_状态记录器.加载中计数器 += 1
            if (_G_状态记录器.加载中计数器 > 50) {
                _G_状态记录器.注册结果标记 = 16
            }
            _G_状态记录器.轮询计数 = 0
            continue
        }
        if (tag_26) {
            log("操作太频繁")
            _G_状态记录器.注册结果标记 = 15
            _G_状态记录器.轮询计数 = 0
            continue
        }
        if (tag_28) {
            log("超时,将返回")
            let dd = desc("返回").findOne(1000)
            dd ? dd.parent().click() : null
            _G_状态记录器.轮询计数 = 0
            continue
        }
        if (tag_29) {
            log("加载联系人失败")
            _G_状态记录器.注册结果标记 = 12
            _G_状态记录器.轮询计数 = 0
            continue
        }
        if (tag_30) {
            log("登录过期")
            _G_状态记录器.注册结果标记 = 11
            _G_状态记录器.轮询计数 = 0
            continue
        }
        if (tag_31) {
            log("下一步");
            鸭子("下一步");
            _G_状态记录器.轮询计数 = 0
            continue
        }
        if (tag_32) {
            log("下一步")
            tag_32.click()
            _G_状态记录器.轮询计数 = 0
            continue
        }
        if (tag_33) {
            log('闪退到信息输入界面')
            鸭子("确定")
            sleep(500)
            填写信息(_G_状态记录器.当前号码信息.手机号, _G_状态记录器.当前号码信息.password)
            // tianxie_info(_G_状态记录器.当前号码信息.国家代码, _G_状态记录器.当前号码信息.手机号, password_ss)
        }
        if (tag_24) {//这个未知确定的位置,放在最后
            log("确定")
            tag_24.click()
            _G_状态记录器.轮询计数 = 0
            continue
        }
        log("轮询次数:%d", _G_状态记录器.轮询计数)
        log("轮询中,剩余次数%d", 30 - _G_状态记录器.轮询计数)
        _G_状态记录器.轮询计数 += 1
        if (_G_状态记录器.轮询计数 > 30) {

            if (_G_状态记录器.卡死返回计数器 > 5) {
                log("5次返回都失败,放弃")
                _G_状态记录器.注册结果标记 = 16
            } else {
                var fanhui = desc("返回").findOne(1000)
                if (fanhui) {
                    log("返回成功")
                    fanhui.parent().click()
                    // _G_状态记录器.跳码计数 += 1
                } else {
                    log('返回失败')
                    _G_状态记录器.注册结果标记 = 16
                }
            }

        }
    }
}
function 全局检测循环_解封() {
    var timeout = 20
    while (true) {
        let tag_1 = text(current_语言.下一步).className(my_className_lsit.button).findOne(timeout)
        let tag_2 = text(current_语言.确定).className(my_className_lsit.button).findOne(timeout)//确定这个应放在最后
        let tag_3 = text(current_语言.操作太频繁).findOne(timeout)
        let tag_4 = text(current_语言.密码).findOne(timeout)
        let tag_5 = text(current_语言.登陆).className(my_className_lsit.button).findOne(timeout)
        let tag_6 = text("This WeChat account has been confirmed of suspicious registration in batch or using plugins and is blocked").findOne(timeout)
        let tag_7 = text(current_语言.拖动下方滑块完成拼图).findOne(timeout)
        let tag_7_1 = desc(current_语言.拖动下方滑块完成拼图).findOne(timeout)

        let tag_8 = text("Select region").boundsInside(0, 0, device.width, device.height / 3).findOne(timeout)
        let tag_8_1 = desc("Select region").boundsInside(0, 0, device.width, device.height / 3).findOne(timeout)
        let tag_8_new = text("Select country").boundsInside(0, 0, device.width, device.height / 3).findOne(timeout)
        let tag_8_1_new = desc("Select country").boundsInside(0, 0, device.width, device.height / 3).findOne(timeout)
        let tag_9 = textContains("loading").findOne(timeout)
        let tag_10 = text('Code').findOne(timeout)
        let tag_10_desc = desc('Code').findOne(timeout)
        let tag_10_new = textContains('Verification code').findOne(timeout)
        let tag_10_desc_new = descContains('Verification code').findOne(timeout)
        let tag_11 = textContains("Incorrect account/password or wrong combination of account and password").findOne(timeout)//账号或密码错误
        let tag_12 = text("Too many operations. Try again later.").findOne(timeout)
        let tag_13 = textContains("This WeChat account has been confirmed of suspicious registration in batch or using plugins and is blocked.").findOne(timeout)//插件注册提示
        let tag_14 = textContains("Suspicious activity was detected on your account").findOne(timeout)
        let tag_14_desc = descContains("Suspicious activity was detected on your account").findOne(timeout)
        let tag_15 = textContains("WeChat account has been activated").findOne(timeout)
        let tag_15_desc = descContains("WeChat account has been activated").findOne(timeout)
        let tag_16 = textContains("Start to verify").findOne(timeout)//不需要解封
        let tag_16_desc = descContains("Start to verify").findOne(timeout)//不需要解封
        let tag_17 = textContains("ncorrect SMS verification code").findOne(timeout)//验证码输入错误
        let tag_17_sesc = descContains("ncorrect SMS verification code").findOne(timeout)//验证码输入错误
        var tag_21 = textContains("Webpage not available").findOne(timeout)
        var tag_21_desc = descContains("Webpage not available").findOne(timeout)
        var tag_23 = textContains("网络错误，请稍后再试").findOne(timeout)
        var tag_24 = textContains("Account or password error").findOne(timeout)
        var tag_24_desc = descContains("Account or password error").findOne(timeout)
        var tag_25 = text(current_语言.完成).findOne(timeout)
        var tag_26_text = text("Read and accept").findOne(timeout)
        var tag_26_desc = desc("Read and accept").findOne(timeout)
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
            if (device.sdkInt < 24) {
                log("小米5S plus 滑块,请手动")
                sleep(5000)
            } else {


                滑块处理()
            }
            _G_状态记录器.轮询计数 = 0
        } else if (tag_7_1) {
            toastLog("发现滑块")
            if (device.sdkInt < 24) {
                log("小米5S plus 滑块,请手动")
                sleep(5000)
            } else {
                滑块处理()
            }
            _G_状态记录器.轮询计数 = 0
        } else if (tag_8) {
            log("选择地区页面_text")
            let 选择地区 = text("Select region").boundsInside(0, 0, device.width, device.height / 3).findOne(1000)
            if (选择地区) {
                while (选择地区) {
                    if (选择地区 && device.sdkInt >= 24) {//这里7.0 优先处理
                        log("坐标点击")
                        press(选择地区.bounds().centerX(), 选择地区.bounds().centerY(), 200)
                        sleep(3000)
                        break;
                    } else if (选择地区.clickable()) {
                        选择地区.click()
                        log("选地区无障碍点击完成")
                        break;
                    } else {
                        选择地区 = 选择地区.parent()
                    }
                }
            } else {
                log('没找到选择地区按钮')
            }
            if (select_region_解封()) {
                log("选择地区,填写信息流程成功")
            } else {
                log("选择地区失败")
            }
            _G_状态记录器.轮询计数 = 0
        } else if (tag_8_1) {
            log("选择地区页面_desc")
            let 选择地区 = desc("Select region").boundsInside(0, 0, device.width, device.height / 3).findOne(1000)
            if (选择地区) {
                // press(tag_8_1.bounds)
                log('找到选择地区按钮')
                while (true) {
                    let 选择地区 = desc("Select region").boundsInside(0, 0, device.width, device.height / 3).findOne(1000)

                    if (选择地区 && device.sdkInt >= 24) {
                        log("坐标点击")
                        press(选择地区.bounds().centerX(), 选择地区.bounds().centerY(), 200)
                        sleep(3000)
                        break;
                    }
                    if (选择地区.clickable()) {

                        选择地区.click()
                        log("选地区无障碍点击完成")
                        break;
                    } else {
                        if (选择地区.parent().clickable()) {
                            选择地区.parent().click()
                            log("选地区无障碍点击完成")
                        } else if (选择地区.parent().parent().clickable()) {
                            选择地区.parent().parent().click()
                            log("选地区无障碍点击完成")
                        } else if (选择地区.parent().parent().parent().clickable()) {
                            选择地区.parent().parent().parent().click()
                            log("选地区无障碍点击完成")
                        } else {
                            log("选择地区不可点击")


                            sleep(500)
                            // 选择地区=选择地区.parent()
                        }
                    }
                }
            } else {
                log('没找到选择地区按钮')
            }
            if (select_region_解封()) {
                log("选择地区,填写信息流程成功")
            } else {
                log("选择地区失败")
            }
            _G_状态记录器.轮询计数 = 0
        } else if (tag_8_new) {
            log("选择地区页面_text_new")
            let 选择地区 = text("Select country").boundsInside(0, 0, device.width, device.height / 3).findOne(1000)
            if (选择地区) {
                while (选择地区) {
                    if (选择地区 && device.sdkInt >= 24) {//这里7.0 优先处理
                        log("坐标点击")
                        press(选择地区.bounds().centerX(), 选择地区.bounds().centerY(), 200)
                        sleep(3000)
                        break;
                    } else if (选择地区.clickable()) {
                        选择地区.click()
                        log("选地区无障碍点击完成")
                        break;
                    } else {
                        选择地区 = 选择地区.parent()

                    }
                }
            } else {
                log('没找到选择地区按钮')
            }
            if (select_region_解封()) {
                log("选择地区,填写信息流程成功")
            } else {
                log("选择地区失败")
            }
            _G_状态记录器.轮询计数 = 0
        } else if (tag_8_1_new) {
            log("选择地区页面_desc_new")
            let 选择地区 = desc("Select country").boundsInside(0, 0, device.width, device.height / 3).findOne(1000)
            if (选择地区) {
                // press(tag_8_1.bounds)
                log('找到选择地区按钮')
                while (true) {
                    let 选择地区 = desc("Select country").boundsInside(0, 0, device.width, device.height / 3).findOne(1000)

                    if (选择地区 && device.sdkInt >= 24) {
                        log("坐标点击")
                        press(选择地区.bounds().centerX(), 选择地区.bounds().centerY(), 200)
                        sleep(3000)
                        break;
                    }
                    if (选择地区.clickable()) {

                        选择地区.click()
                        log("选地区无障碍点击完成")
                        break;
                    } else {
                        if (选择地区.parent().clickable()) {
                            选择地区.parent().click()
                            log("选地区无障碍点击完成")
                        } else if (选择地区.parent().parent().clickable()) {
                            选择地区.parent().parent().click()
                            log("选地区无障碍点击完成")
                        } else if (选择地区.parent().parent().parent().clickable()) {
                            选择地区.parent().parent().parent().click()
                            log("选地区无障碍点击完成")
                        } else {
                            log("选择地区不可点击")


                            sleep(500)
                            // 选择地区=选择地区.parent()
                        }
                    }
                }
            } else {
                log('没找到选择地区按钮')
            }
            if (select_region_解封()) {
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
            let 验证码 = get_yanzhengma_解封(_G_状态记录器.当前号码信息.pid)
            if (!验证码) {
                _G_状态记录器.返回计数器 += 1
                log("获取验证码失败,剩余重试次数:%d", 5 - _G_状态记录器.返回计数器)
                if (_G_状态记录器.返回计数器 >= 5) {
                    _G_状态记录器.注册结果标记 = 5
                }
                let backs = desc(current_语言.返回).findOne(1000)
                if (backs) {
                    log("返回")
                    backs.parent().click()
                } else {
                    log("返回按钮找不到")
                }
            } else {
                log("输入验证码")
                let input = className(my_className_lsit.edit).findOne(4000)
                if (input) {
                    log("验证码为:" + 验证码)
                    sleep(3000)
                    let biaoji = input.setText(验证码)
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
        } else if (tag_10_desc) {
            let 验证码 = get_yanzhengma_解封(_G_状态记录器.当前号码信息.pid)
            if (!验证码) {
                _G_状态记录器.返回计数器 += 1
                log("获取验证码失败,剩余重试次数:%d", 5 - _G_状态记录器.返回计数器)
                if (_G_状态记录器.返回计数器 >= 5) {
                    _G_状态记录器.注册结果标记 = 5
                }
                let backs = desc(current_语言.返回).findOne(1000)
                if (backs) {
                    log("返回")
                    backs.parent().click()
                } else {
                    log("返回按钮找不到")
                }
            } else {
                log("输入验证码")
                let input = className(my_className_lsit.edit).bounds(162, 434, 1039, 503).findOne(4000)
                if (input) {
                    log("验证码为:" + 验证码)
                    sleep(3000)
                    let biaoji = input.setText(验证码)
                    log(biaoji)
                    sleep(2000)
                    let next = className(my_className_lsit.view).desc("Next ").findOne(4500)
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
        } else if (tag_10_new) {
            log("tag_10_new")
            let 验证码 = get_yanzhengma_解封(_G_状态记录器.当前号码信息.pid)
            if (!验证码) {
                _G_状态记录器.返回计数器 += 1
                log("获取验证码失败,剩余重试次数:%d", 5 - _G_状态记录器.返回计数器)
                if (_G_状态记录器.返回计数器 >= 5) {
                    _G_状态记录器.注册结果标记 = 5
                }
                let backs = desc(current_语言.返回).findOne(1000)
                if (backs) {
                    log("返回")
                    backs.parent().click()
                } else {
                    log("返回按钮找不到")
                }
            } else {
                log("输入验证码")
                let input = className(my_className_lsit.edit).findOne(4000)
                if (input) {
                    log("验证码为:" + 验证码)
                    sleep(3000)
                    let biaoji = input.setText(验证码)
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
        } else if (tag_10_desc_new) {
            log("tag_10_desc_new")
            let 验证码 = get_yanzhengma_解封(_G_状态记录器.当前号码信息.pid)
            if (!验证码) {
                _G_状态记录器.返回计数器 += 1
                log("获取验证码失败,剩余重试次数:%d", 5 - _G_状态记录器.返回计数器)
                if (_G_状态记录器.返回计数器 >= 5) {
                    _G_状态记录器.注册结果标记 = 5
                }
                let backs = desc(current_语言.返回).findOne(1000)
                if (backs) {
                    log("返回")
                    backs.parent().click()
                } else {
                    log("返回按钮找不到")
                }
            } else {
                log("输入验证码")
                let input = className(my_className_lsit.edit).findOne(4000)
                if (input) {
                    log("验证码为:" + 验证码)
                    sleep(3000)
                    let biaoji = input.setText(验证码)
                    log(biaoji)
                    sleep(2000)
                    let next = className(my_className_lsit.view).desc("Next ").findOne(4500)
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
            _G_状态记录器.解封提醒次数 += 1
            if (_G_状态记录器.解封提醒次数 > 3) {
                log("5次出现提示,卡死")
                _G_状态记录器.注册结果标记 = 1
            }
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
        } else if (tag_14_desc) {
            log("解封失败")
            _G_状态记录器.注册结果标记 = 3
            _G_状态记录器.轮询计数 = 0
        } else if (tag_15) {
            log("解封成功")
            _G_状态记录器.注册结果标记 = 2
            sleep(2000)
            _G_状态记录器.轮询计数 = 0
        } else if (tag_15_desc) {
            log("解封成功")
            _G_状态记录器.注册结果标记 = 2
            sleep(2000)
            _G_状态记录器.轮询计数 = 0
        } else if (tag_16) {
            _G_状态记录器.注册结果标记 = 6
            sleep(2000)

            _G_状态记录器.轮询计数 = 0
        } else if (tag_16_desc) {
            _G_状态记录器.注册结果标记 = 6
            sleep(2000)

            _G_状态记录器.轮询计数 = 0
        } else if (tag_17) {
            log("验证码输入错误")
            _G_状态记录器.轮询计数 = 0
            _G_状态记录器.注册结果标记 = 7
            sleep(2000)

        } else if (tag_17_sesc) {
            log("验证码输入错误")
            _G_状态记录器.轮询计数 = 0
            _G_状态记录器.注册结果标记 = 7
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
        } else if (tag_21_desc) {
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
            _G_状态记录器.注册结果标记 = 4
        } else if (tag_24_desc) {
            log("密码错误")
            _G_状态记录器.轮询计数 = 0
            _G_状态记录器.注册结果标记 = 4
        } else if (tag_26_text) {
            tag_26_text.click()
            log("read and accept")
        } else if (tag_26_desc) {
            tag_26_desc.click()
            log("read and accept")
        } else if (false) {
        } else if (false) {
        } else if (false) {
        } else if (false) {
        } else if (false) {
        } else if (false) {
        } else if (false) {
        } else if (false) {
        } else if (tag_25) {
            tag_25.click()
            log("Done")
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

function 截图() {
    log("调用者:" + arguments.caller)
    var img_temp = null;
    let thr = threads.start(function () {
        img_temp = images.captureScreen();
    })
    for (let index = 0; index < 5; index++) {
        if (img_temp) {
            break;


        }
        sleep(100)
    }
    try {
        thr.interrupt()
        // log("线程中断完成")
    } catch (error) {

    }

    return img_temp
}
function 多米改机启动微信() {
    home();
    sleep(500);
    home()
    sleep(500)
    鸭子("多米改机")
    sleep(1000);
    for (let index = 0; index < 20; index++) {
        if (currentPackage() == app.getPackageName("多米改机")) {
            log("多米开启成功")
            for (let index = 0; index < 10; index++) {
                var yijian = text("一键新机").exists()
                var denglu = text("登录").exists()
                var 请输入手机号 = text("请输入手机号码，无则留空").className("android.widget.EditText").exists()
                var wangluoyichang = textContains("网络请求异常").exists()
                if (yijian) {


                    var xinji = text("一键新机").findOne(3000)
                    if (xinji) {
                        log("发现一键改机")
                        if (鸭子("一键新机")) {
                            log("一键新机点击完成")
                            sleep(5000)
                            back();
                            return true
                        }
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
                } else if (wangluoyichang) {
                    var quedin = text("确定").findOne(3000)
                    if (quedin) {
                        log("将点击确定")
                        quedin.click()
                    }
                } else {
                    log('等待中')
                }
                sleep(1000)
            }
        } else {

        }

    }
    log("点击不能开启多米,退出")
    exit()
    // for (let 多米计数 = 0; 多米计数 < 2; 多米计数++) {
    //     强行停止APP(app.getPackageName("多米改机"))
    //     sleep(500)
    //     app.launchApp("多米改机")
    //     log("等待打开多米改机")
    //     sleep(4000)
    //     for (let index = 0; index < 10; index++) {
    //         var yijian = text("一键新机").exists()
    //         var denglu = text("登录").exists()
    //         var 请输入手机号 = text("请输入手机号码，无则留空").className("android.widget.EditText").exists()
    //         var wangluoyichang = textContains("网络请求异常").exists()
    //         if (yijian) {

    //             // sleep(1000)
    //             var xinji = text("一键新机").findOne(3000)
    //             if (xinji) {
    //                 log("发现一键改机")
    //                 if (鸭子("一键新机")) {
    //                     log("一键新机点击完成")
    //                     sleep(5000)
    //                     back();
    //                     return true
    //                 }
    //             }

    //         } else if (请输入手机号) {


    //             var quedin = text("确定").findOne(3000)
    //             if (quedin) {
    //                 log("将点击改机确定:")
    //                 quedin.click()
    //             }

    //             for (let chaoshi = 0; chaoshi < 10; chaoshi++) {
    //                 if (!_G_状态记录器.改机完成标记) {
    //                     log("等待改机完成," + (10 - chaoshi) * 2 + "秒后重试")
    //                     sleep(2000)
    //                 } else {
    //                     log("改机完成")
    //                     home()
    //                     log("退出改机软件")
    //                     return
    //                 }

    //             }


    //         } else if (denglu) {
    //             log("发现登录按钮")
    //             var ff = text("登录").findOne(1000)
    //             ff ? ff.click() : null
    //         } else if (wangluoyichang) {
    //             var quedin = text("确定").findOne(3000)
    //             if (quedin) {
    //                 log("将点击确定")
    //                 quedin.click()
    //             }
    //         } else {
    //             log('等待中')
    //         }
    //         sleep(1000)
    //     }
    //     log("再次打开多米改机中")
    //     // 强行停止APP(app.getPackageName("多米改机"))
    //     sleep(3000)
    // }
    // log("包名开启多米改机失败,尝试点击打开")


}
function 注册() {
    function 提取国家代码(val) {
        var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
        var ff = reg.exec(val)
        log(ff)
        if (ff) {
            var index = ff.index
            var ee = val.substr(0, index)
            log("国家代码:" + ee)
            return ee
        }
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
    function get_password() {
        function randomWord(randomFlag, min, max){
            var str = "",
                range = min,
                arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z','#','$','%',',','.','_','~','!','@','&'];
         
            // 随机产生
            if(randomFlag){
                range = Math.round(Math.random() * (max-min)) + min;
            }
            for(var i=0; i<range; i++){
                pos = Math.round(Math.random() * (arr.length-1));
                str += arr[pos];
            }
            return str;
        }
        // var st1 = ""
    
        // for (let index = 0; index < 4; index++) {
        //     var dd = random(1, 23)
        //     var a = "abcdefghijklmnopqrstuvwxyz".substr(dd, 1)
        //     st1 += a
        // }
    
        // var st2 = String(random(1000, 9999))
        // return st1 + st2
        return randomWord(true, 8, 16)
    }
    device.keepScreenOn()
    初始化配置数据_注册()
    获取token()
    _G_状态记录器 = new 状态记录器()
    开启监听_注册()
    var 运行次数 = 运行次数备份
    while (true) {
        _G_状态记录器 = new 状态记录器()


        // 改机_启动微信()
        //这里使用一个特殊标记//使用后
        var phone_number = 特殊标记.pop()
        if (phone_number) {
            log("本次使用上次的号码信息")
        } else {
            log("本次使用新号码信息")
            phone_number = get_phone_number()
        }
        if (!ip可用标记 || 运行次数 <= 0) {

            log("当前IP不可用,将切换网络")
            修改网络_注册(true,true) //连接vpn //第二个参数关闭ip检测

            ip可用标记 = true
            运行次数 = 运行次数备份
        }
        log("运行次数剩余:" + 运行次数)
        log(phone_number)
        var password_ss = get_password()
        phone_number.password = password_ss
        log(password_ss) //i0vm6jc4
        phone_number.国家代码 = 提取国家代码(phone_number.运营商)
        _G_状态记录器.当前号码信息 = phone_number
        //这里直接写死
        if (xinhao == 0 || xinhao == 1) {
            
            //调用ig改机
            log("调用ig改机")
            gaiji()
            if (!启动微信()) {
                log("微信启动失败")
                特殊标记.push(_G_状态记录器.当前号码信息)
                continue
            }
        } else if (xinhao == 2) {
            log("调用多开分身")
            if(!多开分身()){
                特殊标记.push(_G_状态记录器.当前号码信息)
                continue
            }
        }
        if (!zhuce()) {
            log("启动微信失败")
            特殊标记.push(phone_number)
            continue
        }


        tianxie_info_注册(phone_number.国家代码, phone_number.手机号, password_ss)


        storage.put("当前号码信息", phone_number)
        _G_状态记录器.检测线程 = threads.start(全局检测循环_注册)
        等待结果_注册()
        try {
            _G_状态记录器.检测线程.interrupt()
        } catch (error) {

        }
        运行次数 -= 1
    }
}
function 解封() {
    function 登录() {
        log("等待登录按钮")
        for (let index = 0; index <= 3; index++) {
            var timeout = 5000
            var zhuce_button = text(current_语言.登陆).className("android.widget.Button").depth(9).findOne(timeout)
            if (zhuce_button) {
                zhuce_button.click()
                sleep(2000)
                log("登录点击完成")
                return true
            } else {
                log("没有登录按钮")
                // return false
            }
        }
    
    }
    device.keepScreenOn()
    初始化配置数据_解封()
    获取token()
    _G_状态记录器 = new 状态记录器()
    开启监听_解封()
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

        log(_G_状态记录器.当前号码信息)
        if (activity_mode == "0") {//原卡解封
            log('使用同卡解封模式')
            _G_状态记录器.提取的信息 = 模糊搜索数据(获取密码_账户, 获取密码_密码, _G_状态记录器.当前号码信息.手机号)
        } else if (activity_mode == "1") {//异卡解封
            log('使用异卡解封模式')
            _G_状态记录器.提取的信息 = 直接读取数据(获取密码_账户, 获取密码_密码)
        }else{
            log("解封模式错误")
        }

        if (_G_状态记录器.提取的信息) {
            log(_G_状态记录器.提取的信息)
        } else {
            log('获取不到密码信息,拉黑本号,重来')
            lahei(_G_状态记录器.当前号码信息.pid)
            continue
        }
        if (true) {
            log("当前IP不可用,将切换网络")
            修改网络_解封(true) //连接vpn
            // ip可用标记 = true
        }
        _G_状态记录器.提取信息对象.手机号 = _G_状态记录器.提取的信息.split("----")[0]//手机号
        _G_状态记录器.提取信息对象.password = _G_状态记录器.提取的信息.split("----")[1]//密码
        _G_状态记录器.提取信息对象.国家代码 = _G_状态记录器.提取的信息.split("----")[2]//密码
        _G_状态记录器.提取信息对象.注册状态 = _G_状态记录器.提取的信息.split("----")[3]//密码
        _G_状态记录器.提取信息对象.A16 = _G_状态记录器.提取的信息.split("----")[4]//密码
        console.assert(xinhao != undefined, "型号获取失败")
        //这里直接写死
        if (xinhao == 0 || xinhao == 1) {
            
            //调用ig改机
            log("调用ig改机")
            gaiji()
            if (!启动微信()) {
                log("微信启动失败")
                特殊标记.push(_G_状态记录器.当前号码信息)
                continue
            }
        } else if (xinhao == 2) {
            log("调用多开分身")
            if(!多开分身()){
                特殊标记.push(_G_状态记录器.当前号码信息)
                continue
            }
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
        tianxie_info_解封(_G_状态记录器.提取信息对象.国家代码, _G_状态记录器.提取信息对象.手机号)

        _G_状态记录器.检测线程 = threads.start(全局检测循环_解封)
        等待结果_解封()
        try {
            _G_状态记录器.检测线程.interrupt()
        } catch (error) {

        }
    }
}
function CLICK(UIOBJ) {
    let x = UIOBJ.bounds().centerX()
    let y = UIOBJ.bounds().centerY()
    let w = UIOBJ.bounds().width()
    let h = UIOBJ.bounds().height()
    let mx = random(-w / 2, w / 2)
    let my = random(-h / 2, h / 2)
    return click(x + mx, y + my)
}

function 多开分身() {
    function 内部页面处理() {
        let 强制结束 = text("强制结束").findOne(1000)
        if (强制结束) {
            CLICK(强制结束)
            sleep(1000)
            let 修改机型 = text("修改").findOne(1000)
            if (修改机型) {
                修改机型.click()
                机型伪装内部()
                sleep(1000)
                let dd= id("iv_logo").findOne()
                if (dd) {
                    dd.click()
                    let 同意 = text(current_语言.接受).findOne(2000)
                    if (同意) {
                        同意.click()
                    }
                    for (let index = 0; index < 30; index++) {
                        if (currentPackage()=="com.tencent.mm") {
                            log("微信启动成功")
                            return true
                        }
                        sleep(500)
                    }
                    log("微信启动失败")
                    return false
                }
            }
        }
    }
    function 机型伪装内部() {
        function asss(params) {
            let b = className("android.widget.ListView").findOne()
            log(b.childCount())

            let ss = random(0, b.childCount() - 1)
            b.child(ss).click()
            sleep(200)
        }
        sleep(1000)
        let a = className("Spinner").find()
        log(a[0].click())
        asss()
        log(a[1].click())
        asss()
        let 启用 = text("启用机型伪装").findOne()
        启用.click()


    }
    home()
    sleep(500)
    home()
    sleep(500)
    let 多开分身桌面图标 = text("多开分身").findOne(3000)
    if (多开分身桌面图标) {
        if (CLICK(多开分身桌面图标)) {
            log("多开分身点击成功")
            sleep(2000)
            for (let index = 0; index < 5; index++) {
                let 立即重试 = text("立即重试").findOne(1000)
                let 管理内部页面 = text("管理").boundsInside(0, 0, device.width / 2, device.height).findOne(2000)
                let 管理 = text("管理").boundsInside(device.width / 2, 0, device.width, device.height).findOne(2000)
                if (管理内部页面) {
                    log("管理内部页面")
                    return 内部页面处理()
                    
                } else if (管理) {
                    log("列表页面")
                    if (CLICK(管理)) {
                        log("管理点击成功")
                        sleep(1000)
                        return 内部页面处理()
                    } else {

                    }
                } else if(立即重试) {
                    log("立即重试")
                    立即重试.click()
                    sleep(2000)
                }
                if (index==4) {
                    log("多次重试都失败,请检查网络,脚本退出")
                    exit()
                }
            }
            
        } else {

        }

    } else {
        log("桌面找不到多开分身图标")
    }
}

function test() {
    
    多开分身()
    console.hide()
}
// test()
function main() {
    let 模式= storage.get("模式",1)
    log("模式%d",模式)
    switch (模式) {
        case 0:
        current_语言 = YUYAN.中文
            注册()
            break;
    
        case 1:
        current_语言 = YUYAN.English        
            解封()
            break;
    
        default:
            break;
    }
}
main()
