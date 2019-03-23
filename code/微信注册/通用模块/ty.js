
var ty = {}

//1531
var _G_arr0 = Array()
for (let x = 5; x < 160; x += 5) {
    _G_arr0.push([x, 0 + x, "#000000"])
    _G_arr0.push([x, 160 - x, "#000000"])
}

var my_className_lsit = {
    bianji: "android.widget.EditText",
    text: "android.widget.TextView",
    button: "android.widget.Button",
    list: "android.widget.ListView",
    image: "android.widget.Image",
    check: "android.widget.CheckBox",
    view: "android.view.View",
    edit: "android.widget.EditText",
}

var 状态记录器 = function () {
    this.改机完成标记 = null
    this.改机可用标志 = null
    this.注册结果标记 = null
    this.当前号码信息 = null
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
    this.点击开始计数器=null
    this.网络错误 =null
}
状态记录器.初始化 = function () {
    return new 状态记录器()
}


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
    },

}
var current_语言 = YUYAN.中文



function zhuce() {
    log("等待注册按钮")
    for (let index = 0; index < 2; index++) {
        var timeout = 5000
        var zhuce_button = text(current_语言.注册).className("android.widget.Button").depth(9).findOne(timeout)
        if (zhuce_button) {
            zhuce_button.click()
            sleep(time_delay)
            log("注册点击完成")
            return true
        } else {
            log("没有注册按钮")
            return false
        }
    }

}

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
    sleep(time_delay)

    var sousuo = className("android.widget.TextView").clickable(true).depth(9).findOne(timeout)
    if (sousuo) {
        sousuo.click()
        log("找到搜索按钮")
        sleep(time_delay)
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
                sleep(time_delay)
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



function tianxie_info(phone_n, password) {

    var nicheng = text(current_语言.昵称).className("android.widget.EditText").findOne()
    nicheng.setText(getName()) //设置用户名
    log("填写用户名")
    var edit_phone = text(current_语言.手机号).className("android.widget.EditText").clickable(true).depth(13).findOne()
    edit_phone.setText(phone_n)
    log("填写电话号")
    var password_edit = text(current_语言.密码).className("android.widget.TextView").clickable(false).depth(13).findOne()
    password_edit.parent().child(1).setText(password)
    log("填写密码")

}
function get_password() {
    var st1 = ""

    for (let index = 0; index < 4; index++) {
        var dd = random(1, 23)
        var a = "abcdefghijklmnopqrstuvwxyz".substr(dd, 1)
        st1 += a
    }

    var st2 = String(random(1000, 9999))
    return st1 + st2
}


function gaiji() {


    for (let 刺猬计数 = 0; 刺猬计数 < 5; 刺猬计数++) {
        app.launchApp("IG刺猬精灵")
        log("等待打开刺猬精灵")
        sleep(4000)
        if (text("IG刺猬精灵").findOne(16000)) {
            log("IG刺猬精灵打开成功")
            break;
        } else {
            强行停止APP("com.igaiji.privacy")
            log("再次打开IG中")
            sleep(3000)
        }
        if (刺猬计数 == 4) {
            log("无法打开IG,系统退出")
            exit()
        }
    }
    for (let index = 0; index < 50; index++) {

        var yijian = text("一键新机").depth(11).exists()
        var denglu = text("登录").exists()

        var 请输入手机号 = text("请输入手机号码，无则留空").className("android.widget.EditText").exists()
        if (yijian) {
            log("发现一键改机")
            // sleep(1000)
            var xinji = text("一键新机").findOne(3000)
            xinji ? xinji.parent().click() : null
        } else if (请输入手机号) {

            log("将点击确定")
            var quedin = text("确定").findOne(1000)
            quedin ? quedin.click() : null
            // sleep(time_delay)
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
        }
        sleep(1000)
    }
}



function 启动微信() {
    app.launch("com.tencent.mm")
    for (let index = 0; index < 12; index++) {
        if (currentPackage() == "com.tencent.mm") {
            return true
        }
        sleep(time_delay)
        log("等待微信加载")

    }
    return false
}



function 强行停止APP(包名) {
    log("强行停止")
    app.openAppSetting(包名)
    text("强行停止").findOne().click()
    text("确定").findOne().click()
    sleep(500);
    home();
}



function xieyi() {//该函数确保只调用一遍

    for (let 勾选协议计数 = 0; 勾选协议计数 < 120; 勾选协议计数++) {
        try {
            sleep(1000)//等待协议可勾选 
            log("尝试选择")
            if (!auto.root.child(0).child(0).child(0).child(0).child(0).child(0).child(0).child(0).child(0).child(1).child(0).child(0).child(0).child(0).child(0).child(0).child(0).child(1).child(0).checked()) {//if没被勾选,需要操作一遍
                auto.root.child(0).child(0).child(0).child(0).child(0).child(0).child(0).child(0).child(0).child(1).child(0).child(0).child(0).child(0).child(0).child(0).child(0).child(1).child(0).click()
                log("选择完成")
                for (let 点击下一步计数 = 0; 点击下一步计数 < 30; 点击下一步计数++) {
                    try {
                        sleep(1000)
                        if (auto.root.child(0).child(0).child(0).child(0).child(0).child(0).child(0).child(0).child(0).child(1).child(0).child(0).child(0).child(0).child(0).child(0).child(0).child(1).child(0).checked()) {
                            sleep(2000)
                            log("尝试点击")
                            auto.root.child(0).child(0).child(0).child(0).child(0).child(0).child(0).child(0).child(0).child(1).child(0).child(0).child(0).child(0).child(0).child(0).child(0).child(1).child(1).click()
                            log("点击完成")
                            return true
                        }
                    } catch (error) {

                    }

                }
                return false //30秒循环完,依然无法点击下一步
            } else {
                log("已被勾选")
                return true//
            }


        } catch (error) {

        }
        return false//120秒依然无法找到协议按钮
    }
    return false//120秒依然无法找到协议按钮


}

function 修改网络(gn) {
    var 网络模式 = _G_配置记录器.网络切换方式
    log("网络切换方式为:" + 网络模式 + ",本次标记为:" + gn)
    sleep(1000)
    if (网络模式 == "1") {//vpn模式
        log("网络模式为:vpn模式")

        vpn(gn)
    } else if (网络模式 == "0" && gn) {//开关飞行模式
        log("网络模式为:开关飞行模式")
        开关飞行()
    } else {
        log("错误")
    }
}



function 开关飞行() {
    log("将发送意图开启飞行模式")
    var intent = new Intent()
    intent.setAction("android.settings.NFC_SETTINGS")
    app.startActivity(intent);
    id("android:id/switch_widget").findOne()
    log("查找飞行模式按钮")
    var 飞行模式 = text("飞行模式").findOne()
    log("查找状态按钮")
    if (id("android:id/switch_widget").findOne().text() == "ON") {
        log("飞行模式已开启,将关闭")
        飞行模式.parent().parent().click()
        sleep(10000)
        log("飞行模式关闭完成")
    } else if (id("android:id/switch_widget").findOne().text() == "OFF") {
        log("飞行模式已关,将重置")
        text("飞行模式").findOne().parent().parent().click()
        log("飞行模式已开")
        sleep(5000)

        text("飞行模式").findOne().parent().parent().click()
        sleep(10000)
        log("飞行模式关闭完成")
    } else {
        log("开关飞行为止异常")
    }
}
function vpn(gn) {

    var intent = new Intent();
    intent.setAction("android.settings.VPN_SETTINGS"); //VPN设置
    app.startActivity(intent);
    log("意图发送完成")
    var sz = desc("设置").id("settings_button").depth(15).findOne()
    sleep(1000)
    var ylj = text("已连接").depth(14).findOne(50)
    if (ylj) {
        toastLog("已经连接,需要断开")
        sleep(1000)
        var vpn_list = className("android.support.v7.widget.RecyclerView").findOne(1000)
        if (vpn_list) {
            vpn_list.child(0).click()
            toastLog("点开了vpn")
            text("断开连接").depth(6).findOne().click()
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
                var lj = text("连接").className(my_className_lsit.button).depth(6).findOne(10000)
                lj ? lj.click() : null
                toastLog("点了连接")
                sleep(time_delay)
                while (true) {
                    var sb = text("失败").depth(14).exists()
                    var ylj = text("已连接").depth(14).exists()
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



function 等待结果() {
    log("等待结果开始")
    while (true) {
        phone_number = _G_状态记录器.当前号码信息
        if (_G_状态记录器.注册结果标记) {
            _G_状态记录器.检测线程.interrupt()
        }
        switch (_G_状态记录器.注册结果标记) {

            case 1: //环境异常  // 重新开始 /0是死的
                修改网络() //断开连接	
                var info = phone_number.手机号 + "----" + phone_number.password + "----" + phone_number.国家代码 + "----" + "0"
                log(info)
                // 上传信息(info)
                log("上传完成")
                log("异常")
                return { status: 1, info: "环境异常" }
            case 2: //通过 /上传信息  /1为活的
                修改网络() //断开连接
                var info = phone_number.手机号 + "----" + phone_number.password + "----" + phone_number.国家代码 + "----" + "1"
                log(info)

                // 上传信息(info)
                log("上传完成")
                return { status: 2, info: info }

            case 3: //   
                修改网络() //断开连接
                log("号码异常")
                // 释放号码()
                return { status: 3, info: "号码异常" }
                break;
            case 4:
                修改网络() //断开连接
                log("微信状态异常")
                // 释放号码()
                return { status: 4, info: "微信状态异常" }
                break;
            case 5: //出现二维码
                log("状态为5")
                修改网络() //断开连接
                log("拉黑号码")
                // lahei(phone_number.pid)
                return { status: 5, info: "拉黑号码" }
                break;
            case 6: //
                修改网络() //断开连接
                log("不释放号码,继续注册")

                return { status: 6, info: "不释放号码,继续注册" }
                break;

            default:
                break;
        }

        sleep(1000)
    }
}

function 填写验证码() {
    var 验证码 = _G_取号平台.取验证码()

    log("输入验证码")
    // var yanzheng = textContains("请输入验证码").findOne(3000)
    var yanzheng = className(my_className_lsit.edit).findOne(3000)
    yanzheng ? yanzheng.setText(验证码) : log("没有验证码框")
    var xiyibu = text("下一步").className(my_className_lsit.button).findOne(1000)

    if (xiyibu) {
        log("点了下一步")
        xiyibu.click()
        sleep(2000)
    } else {
        log("没有下一步")
    }
}

function 修改ig备份名(params) {
    app.launchApp("IG刺猬精灵")
    log("打开刺猬精灵")
    for (let index = 0; index < 30; index++) {

        var 备份 = text("备份列表").depth(11).exists()
        var denglu = text("登录").exists()
        var 使用中 = text("使用中").findOne(100)

        var 请输入手机号 = text("请输入手机号码，无则留空").className("android.widget.EditText").exists()
        if (备份) {
            log("发现备份")
            sleep(time_delay)
            var xinji = text("备份列表").findOne(1000)
            xinji ? xinji.parent().click() : null
        } else if (请输入手机号) {

            log("将点击确定")
            var quedin = text("确定").findOne(1000)
            quedin ? quedin.click() : null
            sleep(time_delay)
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
        } else if (使用中) {
            使用中.parent().parent().findOne(text("修改")).click()
            sleep(1000)
            var 输入框 = className(my_className_lsit.edit).findOne(1000)
            if (输入框) {
                log("输入框发现")
                log("设置文本为:" + _G_取号平台.手机号)
                输入框.setText(_G_取号平台.手机号)
                var qd = text("确定").findOne()
                qd.click()
                log("确定点击")
                sleep(1000)
                return
            }
        }
        sleep(1000)
    }
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


function 添加指定微信发送(好友id) {

    var dd = desc("更多功能按钮").findOne(6000)
    if (dd) {
        log("找到更多功能按钮")
        dd.click()
        sleep(2000)
        var ff = 鸭子('添加朋友', 2000)
        if (ff) {
            log("找到添加朋友按钮")
            // ff.parent().parent().parent().click()
            var coordinate = text("微信号/QQ号/手机号").findOne(4000)
            if (coordinate) {
                log("找到微信号/QQ号/手机号")
                coordinate = coordinate.bounds()
                click(coordinate.centerX(), coordinate.centerY())
                sleep(1000)
                log("点击完成")
                var shurukuang = className(my_className_lsit.edit).findOne(3000)
                if (shurukuang) {
                    log("找到输入框")
                    shurukuang.setText(好友id)
                } else {
                    log("没找到输入框")
                }

                sleep(500)
                var sousuo = textStartsWith("搜索:").findOne(3000)
                if (sousuo) {
                    log("找到搜索框")
                    sousuo.parent().parent().click()//点击搜索
                    log("点击搜索")
                } else {
                    log("没找到搜索框")
                }
                //这里可能用户不存在 可能已经是好友

                sleep(2000)
                if (text("该用户不存在").exists()) {
                    log("该用户不存在")
                    //
                    text("确定").clickable(true).findOne().click()

                } else if (text("添加到通讯录").exists()) {
                    text("添加到通讯录").findOne().parent().parent().click()
                    //判断是否需要验证
                    log("将发送验证")
                    var fs = text("发送").findOne(3000)
                    fs ? fs.click() : null
                    发送信息()
                    desc("返回").findOne().parent().click()
                    // sleep(random(50,100) * 1000)
                    log("添加一次完成")
                } else if (text("发消息").depth(13).exists() && text("音视频通话").depth(13).exists()) {
                    //已经是好友了
                    // phone_number 
                    log(好友id + "已经是好友了")
                    发送信息()
                } else {
                    toastLog("未知错误")
                    return
                }
            } else {
                log("没有找到:微信号/QQ号/手机号")
            }
        }
    }

}
function 发送信息() {
    log("发送消息")
    var dd = text("发消息").findOne(3000)
    if (dd) {
        dd.parent().parent().click()
        var edit = className(my_className_lsit.edit).findOne(3000)
        if (edit) {
            var info = _G_取号平台.手机号 + "----" + _G_取号平台.password + "----" + _G_取号平台.国家代码
            edit.setText(info)
            var fasong = text("发送").className(my_className_lsit.button).findOne(3000)
            if (fasong) {
                fasong.click()
                log("发送完成")
            }
        }
    }
}

function get_a16_703() {
    var temp_path = "/sdcard/360/abc"
    var list_file = files.listDir(temp_path)
    list_file.forEach(element => {
        var hehe = files.join(temp_path, element)
        if (files.getExtension(hehe) == "statistic") {
            if (files.isFile(hehe)) {
                log(hehe)
                var data = files.read(hehe)
                log(data.substr(0, 100))
                var sb = new java.lang.StringBuilder();
                for (var i = 0; i < data.length; i++) {
                    sb.append(data[i].toString(16));

                }
                var t5 = sb.toString()
                var reg = t5.search(/A[0-9a-fA-F]+,+/)
                log(t5.substr(reg, 16));
                // log(reg);当前脚本第15行：A9541e42f280874b  当前脚本第15行：A9541e42f280874b
            }
        }
    })
}


function cpa16() {
    var temp_path = "/sdcard/360/abc"
    var sh = new Shell(true);
    sh.setCallback({
        onNewLine: function (line) {
            //有新的一行输出时打印到控制台
            log(line);
        }
    })
    sh.exec("rm -rf " + temp_path);
    var com = "cp -r /data/user/0/com.tencent.mm/files/kvcomm/. " + temp_path
    sh.exec(com)
    sh.exitAndWaitFor()


}

function get_a16_67() {
    // cpa16()
    // var temp_path="/storage/emulated/0/360/abc"
    // files.ensureDir(temp_path)

    // log(shell("rm -rf "+temp_path,true))
    // log(ff)//当前脚本第15行：A9541e42f280874b
    // var base = "/data/user/0/com.tencent.mm/files/kvcomm/"
    // var base = "/sdcard/360"
    var temp_path = "/sdcard/360/abc"
    var basedir = files.listDir(temp_path)

    basedir.forEach(element => {
        var hehe = files.join(temp_path, element)

        if (files.isFile(hehe)) {
            log(hehe)
            var data = files.read(hehe)
            var sb = new java.lang.StringBuilder();
            for (var i = 0; i < data.length; i++) {
                sb.append(data[i].toString(16));

            }
            var t5 = sb.toString()
            var reg = t5.search(/A[0-9a-fA-F]+,+/)
            log(t5.substr(reg, 16));
            // log(reg);当前脚本第15行：A9541e42f280874b  当前脚本第15行：A9541e42f280874b


        }
    });

}

function GET_A16() {   //据说运行之前要先杀死微信
    强行停止APP("com.tencent.mm")
    var arr = files.listDir("/data/data/com.tencent.mm/files/kvcomm/");
    //log(arr);
    if (arr.length >= 1) {  //返回数组元素小于1说明没权限)
        for (var i in arr) {
            var s
            var str = files.read("/data/data/com.tencent.mm/files/kvcomm/" + arr[i]);
            var reg = /A(.*?)(?=[\_])/g;//匹配A开头_结尾的字符串
            try {
                var b = str.match(reg);
                //log(b);
                for (var c in b) {
                    var d = b[c]
                    if (d.length == 16) {//匹配到的字符串长度==16就是要找的东西了
                        s = true;
                        log("我是某16>>>>>" + d);
                        break;		//不知道为什么这里不能退出函数 可能是两层for循环 的问题
                    }
                }
                if (s == true) {
                    return d;	//所以只好在这里返回退出
                }
                sleep(50);
            } catch (error) {
            }
        }
    } else {
        //log("获取文件目录失败~~没有权限)");		
        return false;
    }
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

function huakuai_start() {
    _G_状态记录器.huakuaijishu += 1
    if (_G_状态记录器.huakuaijishu > 5) {
        var ff = text("拖动下方滑块完成拼图").findOne(1000)
        if (ff) {
            var dd = idContains("reload").depth(24).findOne(1000)
            if (dd) {
                dd.click()
                sleep(time_delay)
                _G_状态记录器.huakuaijishu = 0
                log("刷新滑块验证")
            }

        }

    }
    sleep(4000)
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

            var dd = idContains("reload").depth(24).findOne(1000)
            if (dd) {
                log("刷新滑块验证")
                dd.click()
                sleep(time_delay)
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
    var ime = captureScreen();
    ime = images.cvtColor(ime, "BGR2GRAY", 3)
    ff = images.threshold(ime, 110, 255, "BINARY")

    var dd = findMultiColorss(ff, "#000000", _G_arr0, { region: { x: 820, y: 550, width: 550, height: 650 } })
    if (dd) {
        randomSwipe(300, 1400, dd.x + 85, 1400)

    } else {
        刷新滑块()
        return
    }

    var err = text("请控制拼图块对齐缺口").findOne(3000)
    if (err) {

        刷新滑块()
        return
    }

}

function 刷新滑块(params) {
    var dd = idContains("reload").depth(24).findOne(1000)
    if (dd) {
        log("刷新滑块验证")
        dd.click()
        sleep(time_delay)
        _G_状态记录器.huakuaijishu = 0

    }
}

function 读取地址(params) {
    var 地址 = textContains("地区").findOne()
    var 地址_value = 地址.text()
    var data = 地址_value.replace(/地区: /, "")
    log(data)
    return data
}
function 上传信息(info) {

    for (let index = 0; index < 50; index++) {
        try {
            var res = http.get("http://47.74.248.9/updata?username=" + 上传账户 + "&password=" + 上传密码 + "&type=1&value=" + encodeURI(info))
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


ty.my_className_lsit = my_className_lsit
ty.转换对象到字符串 = function (obj) {
    var ff = JSON.stringify(obj)
    ff = ff.replace(/\{/g, "")
    ff = ff.replace(/\}/g, "")
    ff = ff.replace(/\"/g, "")
    ff = ff.replace(/\:/g, "=")
    ff = ff.replace(/\,/g, "|")
    return ff
}
ty.huakuai_start = huakuai_start

ty.添加指定微信发送 = 添加指定微信发送

ty.填写验证码 = 填写验证码

ty.等待结果 = 等待结果
ty.修改网络 = 修改网络

ty.getName = getName

ty.全局检测循环 = 全局检测循环

ty.启动微信 = 启动微信

ty.zhuce = zhuce

ty.select_guojia = select_guojia

ty.tianxie_info = tianxie_info

ty.get_password = get_password
ty.gaiji = gaiji
ty.状态记录器 = 状态记录器
ty.修改ig备份名 = 修改ig备份名
ty.GET_A16 = GET_A16
ty.强行停止APP = 强行停止APP
module.exports = ty