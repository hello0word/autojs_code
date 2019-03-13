auto.waitFor()
// auto.setMode("fast")
// auto.setFlags(["findOnUiThread"])
if (!requestScreenCapture()) {
    toastLog("请求截图失败");
    exit();
}


const time_delay = 2000
// http.__okhttp3__
console.show()
console.setPosition(0, device.height / 2 + 200)
events.on("exit", function() {
    log("结束运行");
});


var _G = {
    改机完成标记: false,
    改机可用标志: false,
    注册结果标记: false,
    当前号码信息: null,
    jishiqi: 0,
    zhucejishu: 0,
    huakuaijishu: 0,
    载入数据计数: 0,
}



var storage = storages.create("微信")
threads.start(function() {
    events.observeToast();
    events.onToast(function(toast) {
        var pkg = toast.getPackageName();
        var text = toast.getText()
        switch (pkg) {
            case "com.igaiji.privacy":
                switch (text) {
                    case "一键新机完成":
                        _G.改机完成标记 = true
                        setTimeout(function() {
                            _G.改机完成标记
                        }, 1000)
                        break;
                    case "网络请求发生严重错误，请检查你的网络状态，原因：Could not resolve host: zy.igaiji.com":
                        className(my_className_lsit.button).text("登录").findOne().click()
                        break;
                    case "该设备已经激活，继续使用改机服务":
                        _G.改机可用标记 = true
                        break;
                    default:
                        break;
                }
                break;

            case "com.tencent.mm":
                var wangluocuowu = new RegExp(/无法连接到服务器/)
                if (wangluocuowu.test(text)) {
                    _G.注册结果标记 = 4
                }

        }
        log("Toast内容: " + toast.getText() +
            " 来自: " + getAppName(pkg) +
            " 包名: " + pkg);
    });

});

var y = 1058 //设置滑动按钮高度
// sleep(100)//这个延时最少要40,
// console.setGlobalLogConfig({
// 	"file": "/sdcard/autojs/log.txt",
// 	"maxFileSize":10 * 1024 * 1024
// });

my_className_lsit = {
    bianji: "android.widget.EditText",
    text: "android.widget.TextView",
    button: "android.widget.Button",
    list: "android.widget.ListView",
    image: "android.widget.Image",
    check: "android.widget.CheckBox",
    view: "android.view.View",
}

function my_className() {
    this.my_Edit = "android.widget.EditText"
    this.my_Text = "android.widget.TextView"
}

var dd = my_className.my_Edit

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


test()

function test() {


    main()
    //修改网络(true)
    // huakuai_start()
    // 上传信息("测试")
    // vpn()
    // 全局检测循环()

    // var info = "167147669"+"----"+"mncf3586"+"----"+"60"+"----"+"0"
    // log(info)
    // 上传信息(info)
    // log("上传完成")


}


function 转换对象到字符串(obj) {
    var ff = JSON.stringify(obj)
    ff = ff.replace(/\{/g, "")
    ff = ff.replace(/\}/g, "")
    ff = ff.replace(/\"/g, "")
    ff = ff.replace(/\:/g, "=")
    ff = ff.replace(/\,/g, "|")
    return ff
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


function get_img(params) {

    var all_img = className("android.widget.Image").find()
    // log(all_img.length)
    if (all_img.length == 3) {
        var img_bounds = all_img[0].bounds()
        var img_base = images.captureScreen()
        var img_split = images.clip(img_base, img_bounds.left, img_bounds.top, img_bounds.width(), img_bounds.height())
        return img_split
    }
}
//


/**
 * 
 * @param {img} img 
 */
function get_check(img) {
    var image_data = images.toBase64(img)
    datas = {
        "softwareId": 12296,
        "softwareSecret": "tAg9HWTEA41V8aV491SElIStFuad4EjkhPWAt6s4",
        "username": 'xiajixiang',
        "password": 'LZxia032536',
        "captchaData": image_data,
        "captchaType": 1310,
    }
    for (let index = 0; index < 10; index++) {
        var res = http.postJson("https://v2-api.jsdama.com/upload", data = datas)
        try {
            var result = res.body.json().data.recognition
            break
        } catch (error) {
            toastLog('本次请求错误,重试次数:' + index);
            sleep(2000)
            if (index > 10) {
                toastLog('超时,请联系作者,程序退出');

            }
        }

    }
    var result_split = result.split("|")
    var result_x1 = result_split[0].split(",")[0]
    var result_x2 = result_split[1].split(",")[0]
    var green = text("tag-bar").className("android.widget.Image").findOne()
    var y = green.bounds().centerY()
    // log(result_x1)
    // log(result_x2)

    return {
        x1: result_x1,
        y1: y + random(-4, 4),
        x2: result_x2,
        y2: y + random(-4, 4)
    }
}

function check_ok() {
    var coordinates = get_check(get_img())
    swipe(coordinates.x1, coordinates.y1, coordinates.x2, coordinates.y2, random(1000, 2000))

}


function zhuce() {
    log("等待注册按钮")
    for (let index = 0; index < 2; index++) {
        var timeout = 5000
        var zhuce_button = text(current_语言.注册).className("android.widget.Button").depth(9).findOne(timeout)
        if (zhuce_button) {
            log(zhuce_button.click())
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
    var timeout = 70
    log("国家代码:"+ g_j_num)
    do {
        var sousuo = className("android.widget.TextView").clickable(true).depth(9).findOne(timeout)
        if (sousuo) {
            sousuo.click()
            log("点击搜索按钮")
            sleep(1000)
        }
        // sousuo ? sousuo.click() : null
        
        
        var shuru = className("android.widget.EditText").clickable(true).findOne(timeout)
        if (shuru) {
            shuru.setText(g_j_num)
            log("填写国家代码完成")
            sleep(1000)
        }
        // shuru ? shuru.setText(g_j_num) : null
        
        var dd = text(g_j_num).className("android.widget.TextView").depth(13).exists()
        if (dd) {
            
            ee = text(g_j_num).className("android.widget.TextView").depth(13).findOne(timeout)
            // ee ? dd.parent().parent().click() : null
            if (ee) {
                ee.parent().parent().click()
                log("选国家完成")
                var gg=text(current_语言.国家).className("android.widget.TextView").findOne(3000)
                if (gg) {
                    log("选国家流程完成")
                    return true
                } 
                
            }
            
        }
        // var listView=className("android.widget.ListView").depth(10).scrollable(true).findOne(timeout)
        // var tag=listView.scrollDown()
        // sleep(700)
    } while (true);


}

function 主页注册按钮点击() {
    var zhuce = text(current_语言.注册).className("android.widget.Button").clickable(true).depth(12).findOne()
    log("zhuce")
    zhuce.click()
}

function tianxie_info(guojia_number, phone_n, password) {
    var guojia_diqu = text(current_语言.国家).className("android.widget.TextView").findOne()
    guojia_diqu.parent().click() //点击国家地区选择国家
    select_guojia(guojia_number) //选择国家
    var nicheng = text(current_语言.昵称).className("android.widget.EditText").findOne()
    nicheng.setText(getName()) //设置用户名
    log("username")
    var edit_phone = text(current_语言.手机号).className("android.widget.EditText").clickable(true).depth(13).findOne()
    edit_phone.setText(phone_n)
    log("phone")
    var password_edit = text(current_语言.密码).className("android.widget.TextView").clickable(false).depth(13).findOne()
    password_edit.parent().child(1).setText(password)
    log("mima")

}





function get_token() {

    return "a27e4764ee990f64933b01760c13febc"
}

function get_phone_number() {
    while (true) {
        var token = get_token()
        try {
            var resource = http.get("http://47.74.144.186/yhapi.ashx?act=getPhone&token=" + token + "&iid=1001&operator=&provi=&city=&mobile=")
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

function get_phone_number2() {
    return {
        pid: "1001167146521",
        提取时间: "2019-03-09T22:45:34",
        串口号: "COM40",
        手机号: "167146521",
        运营商: "60马来西亚",
        归属地: "马来西亚",
    }
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
    app.launchApp("IG刺猬精灵")
    log("打开刺猬精灵")
    while (true) {

        var yijian = text("一键新机").depth(11).exists()
        var denglu = text("登录").exists()
        var denglu = text("登录").exists()
        var 请输入手机号 = text("请输入手机号码，无则留空").className("android.widget.EditText").exists()
        // var quedin2 = text("确定").exists()
        if (yijian) {
            log("发现一键改机")
            // click(yijian.x,yijian.y)
            text("一键新机").findOne().parent().click()
            sleep(1000)
        }else if (请输入手机号) {
                sleep(1000)
                log("将点击确定")
                text("确定").findOne().click()
                sleep(800)
                while (!_G.改机完成标记) {
                    log("等待改机完成")
                    sleep(2000)
                }
                log("改机完成")
                sleep(1000)
                home()

                log("退出改机软件")
                break

        }else if (denglu) {
            log("发现登录按钮")
            var ff = text("登录").findOne()
            ff ? ff.click() : null

            continue
        }
    }
}


function lahei(pid) {
    pid = String(pid)
    var token = get_token()
    try {
        var res = http.get("http://47.74.144.186/yhapi.ashx?act=addBlack&token=" + token + "&pid=" + pid + "&reason=used")
        log(res.body.string())
    } catch (error) {
        log(error)
    }

}

function get_yanzhengma(pid) {
    pid = String(pid)
    var token = get_token()
    log("本次token：" + token)
    log("本次pid：" + pid)
    for (let index = 0; index < 3; index++) {
        for (let index2 = 0; index2 < 10; index2++) {
            try {
                var res = http.get("http://47.74.144.186/yhapi.ashx?act=getPhoneCode&token=" + token + "&pid=" + pid)
                res_tostr = res.body.string()
                log(res_tostr)
                var res_to_arr = res_tostr.split("|")
                if (res_to_arr[0] == 1) {
                    return res_to_arr[1]
                } else if (res_to_arr[0] == "0") {
                    switch (res_to_arr[1]) {
                        case "-4":
                            log("号码释放")
                            _G.注册结果标记 = 3 //直接通知结果  重来
                            break;

                        default:
                            break;
                    }
                }
            } catch (error) {
                log(error)
            }
            sleep(15000)
        }
        textContains("收不到验证码").findOne().click()
        textContains("重新获取验证码").findOne().parent().parent().click()

    }
    log("三次都无法获取，脚本停止")
    log("号码释放")
    _G.注册结果标记 = 3 //直接通知结果  重来
}




function 等待验证手机号() {
    log("等待验证手机号")
    textContains("验证手机号").findOne()
    for (let index = 0; index < 120; index++) {
        var dd = textContains("验证手机号").exists()
        if (!dd) {
            return
        }
        sleep(1000)
    }
}

function 上传信息(info) {

    for (let index = 0; index < 50; index++) {
        try {
            var res = http.get("http://47.74.248.9/updata?username=YJD&password=UVLGVC&type=1&value=" + encodeURI(info))
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
    for (let index = 0; index < 18; index++) {
        if (currentPackage() == "com.tencent.mm") {
            return true
        }
        sleep(1000)
        log("等待微信加载")

    }
    return false
}

function main() {
    while (true) {
        _G.改机完成标记 = false
        _G.改机可用标记 = false
        _G.当前号码信息 = null
        gaiji()
        // 改机_启动微信()

        var phone_number = get_phone_number()
        log(phone_number)
        var password_ss = get_password()
        phone_number.password = password_ss
        log(password_ss) //i0vm6jc4
        phone_number.国家代码 = 提取国家代码(phone_number.运营商)
        修改网络(true) //连接vpn
        if (!启动微信()) {
            log("微信启动失败")
            continue
        }
        if (zhuce()) {
            log("启动微信成功")
            
        }


        tianxie_info(phone_number.国家代码, phone_number.手机号, password_ss)
        _G.注册结果标记 = false //重置标记
        _G.huakuaijishu = 0
        _G.载入数据计数 = 0
        _G.当前号码信息 = phone_number
        storage.put("当前号码信息", phone_number)
        var th = threads.start(全局检测循环)
        等待结果()
        th.interrupt()
    }
}

function 修改网络(gn) {
    var 网络模式=storage.get("net_mode",0)
    if (网络模式=="1") {//vpn模式
        log("vpn模式")
        vpn(gn)
    }else if(网络模式=="0"){//开关飞行模式
        log("开关飞行模式")
        开关飞行()
    }else{
        log("错误")}
}

function 开关飞行(params) {
    var intent=new Intent()
    intent.setAction("android.settings.NFC_SETTINGS")
    app.startActivity(intent);
    log(id("android:id/switch_widget").findOne())
    log("查找飞行模式按钮")
    var 飞行模式=text("飞行模式").findOne()
    log("查找状态按钮")
    if(id("android:id/switch_widget").findOne().text()=="ON"){
        log("飞行模式已开启,将关闭")
        飞行模式.parent().parent().click()
        sleep(10000)
        log("飞行模式关闭完成")
    }else if(id("android:id/switch_widget").findOne().text()=="OFF"){
        log("飞行模式已关,将重置")
        text("飞行模式").findOne().parent().parent().click()
        log("飞行模式已开")
        sleep(5000)
        
        text("飞行模式").findOne().parent().parent().click()
        sleep(10000)
        log("飞行模式关闭完成")
    }else{
        log("开关飞行为止异常")
    }
}
function vpn(gn) {
    
    
    
    var intent = new Intent();
    intent.setAction("android.settings.VPN_SETTINGS"); //VPN设置
    app.startActivity(intent);
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



function 改机_启动微信() {
    while (true) {
        gaiji()


    }

}


function 等待结果() {
    while (true) {
        phone_number = _G.当前号码信息

        switch (_G.注册结果标记) {

            case 1: //环境异常  // 重新开始 /0是死的
                修改网络() //断开连接	
                var info = phone_number.手机号 + "----" + phone_number.password + "----" + phone_number.国家代码 + "----" + "0"
                log(info)
                上传信息(info)
                log("上传完成")
                log("异常")
                return
            case 2: //通过 /上传信息  /1为活的
                修改网络() //断开连接
                var info = phone_number.手机号 + "----" + phone_number.password + "----" + phone_number.国家代码 + "----" + "1"
                log(info)
                上传信息(info)
                log("上传完成")
                return

            case 3: //   
                修改网络() //断开连接
                log("号码异常")
                释放号码()
                return
                break;
            case 4:
                修改网络() //断开连接
                log("微信状态异常")
                释放号码()
                return
                break;
            case 5: //出现二维码
                修改网络() //断开连接
                log("微信状态异常")
                lahei(phone_number.pid)
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
    _G.当前号码信息 = storage.get("当前号码信息")
    while (true) {

        var tag_1 = text("请稍候...").className("android.widget.TextView").depth(5).findOne(timeout) //主页注册  背景为月亮那个 click
        var tag_2 = clickable(true).text(current_语言.开始).depth(17).findOne(timeout) //click //安全验证的开始按钮

        var tag_3 = className("android.widget.CheckBox").depth(19).clickable(true).checked(false).findOne(timeout) //协议勾选框


        var tag_4 = text("语言").depth(7).findOne(timeout) //下一步 p.click

        var tag_5 = className("android.view.View").text("返回 ").findOne(timeout) // desc("返回").findOne().parent().click()
        var tag_6 = text(current_语言.拖动下方滑块完成拼图).depth(23).findOne(timeout) //调用函数
        var tag_7 = textStartsWith("让用户用微信扫描下面的二维码").depth(17).findOne(timeout)
        var tag_8 = text(current_语言.注册).className("android.widget.Button").depth(12).findOne(timeout) //填写信息页注册按钮 click
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
        var tag_19 = className("android.view.View").text("WeChat 隐私保护概述").depth(18).findOne(timeout) //找   隐私保护  
        var tag_20 = text("正在载入数据...").findOne(timeout)
        var tag_21 = text("网页无法打开").findOne(timeout)
        var tag_22 = text("用短信验证码登录").findOne(timeout)
        var tag_23 = textContains("网络错误，请稍后再试").findOne(timeout)
        var tag_24 = text("确定").className(my_className_lsit.button).findOne(timeout)
        if (tag_1) {
            log("请稍候")
            _G.jishiqi += 1
            sleep(2000)
            if (_G.jishiqi > 90) {
                _G.jishiqi = 0
                log("已经卡死，重新开始，计时器归零")

                _G.注册结果标记 = 4
                continue
            }
        }
        if (tag_2) {
            log("点击开始")
            sleep(time_delay)
            tag_2.click()
        }
        if (tag_3) {
            log("点击协议")
            sleep(time_delay)
            tag_3.click()
            sleep(time_delay)
            tag_3 = className("android.widget.CheckBox").depth(19).clickable(true).checked(true).findOne(timeout)

            if (tag_3) {
                sleep(time_delay)
                tag_3.checked()
                log("同意协议")
            }
            dd = text("下一步").findOne(timeout)
            // log(dd.click())
            if (dd) {
                sleep(time_delay)
                dd.parent().click()
                log("下一步")
            }
            sleep(3000)
            continue
        }
        if (tag_4) {
            log("弹出到主页")
            _G.注册结果标记 = 4
        }
        if (tag_5) {
            log("关闭页面")
            desc("返回").findOne().parent().click()
        }
        tag_6 ? huakuai_start() : null //滑块
        if (tag_7) {
            log("等待二维码")
            var img = captureScreen();
            images.save(img, "/sdcard/temp.jpg", "jpg", 100);
            log("文件保存完成")
            _G.注册结果标记 = 5
            sleep(5000)
            continue
        }

        if (tag_8) {
            sleep(time_delay)
            tag_8.click()
            if (_G.zhucejishu > 2) {
                log("注册卡死，重来")
                continue
            }
            for (let index = 0; index < 20; index++) {
                toastLog("点了注册,等待响应")
                sleep(2000)
                if (!text(current_语言.注册).className("android.widget.Button").depth(12).exists()) {
                    break;

                }
            }

        }
        if (tag_9) {
            log("不是我的")
            sleep(time_delay)
            tag_9.click()
        }
        if (tag_10) {
            log("返回注册流程")
            sleep(time_delay)
            tag_10.click()
        }

        tag_11 ? log("等待验证手机号") : null
        tag_12 ? 填写验证码() : null
        tag_13 ? tag_13 : null
        if (tag_14) {
            log("环境异常:14")
            _G.注册结果标记 = 1
        }

        if (tag_15) {
            log("环境异常:15")
            _G.注册结果标记 = 1
        }

        if (tag_22) {
            log("需要重新登录")
            _G.注册结果标记 = 1
        }



        if (tag_16) {
            log("通讯录 好")
            sleep(time_delay)
            tag_16.click()
        }
        if (tag_17) {
            log("系统繁忙")
            desc("返回").findOne().parent().click()
        }
        tag_18 ? _G.注册结果标记 = 2 : null

        if (tag_20) {
            _G.载入数据计数 += 1
            log("载入数据")
            if (_G.载入数据计数 > 10) {
                _G.注册结果标记 = 1
                log("载入数据卡死")
            }
        }
        if (tag_21) {
            log("网络错误")
            desc("返回").findOne().parent().click()
            _G.注册结果标记 = 4
        }
        if (tag_23) {
            log("网络错误")
            _G.注册结果标记 = 4
        }
        tag_24 ? tag_24.click() : null
    }
    log("全局轮询结束")
}


function 释放号码() {
    pid = _G.当前号码信息.pid
    var token = get_token()
    for (let index = 0; index < 3; index++) {
        toastLog("即将释放号码")
        device.vibrate(2000);
        sleep(2000)
    }

    try {
        var res = http.get("http://47.74.144.186/yhapi.ashx?act=setRel&token=" + token + "&pid=" + pid)
        log(res.body.string())
    } catch (error) {
        log(error)
    }

}

function 填写验证码() {
    var 验证码 = get_yanzhengma(_G.当前号码信息.pid)

    // var 验证码=get_yanzhengma("1001167147628")
    log("输入验证码")
    var yanzheng = textContains("请输入验证码").findOne(1000)
    yanzheng ? yanzheng.setText(验证码) : log("没有验证码框")
    var xiyibu = text("下一步").className(my_className_lsit.button).depth(12).findOne(1000)

    if (xiyibu) {
        xiyibu.click()
        sleep(2000)
    } else {
        log("没有下一步")
    }
}


var temp_path = "/sdcard/360/abc"

function get_a16_703() {
    // cpa16()
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
        onNewLine: function(line) {
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
    } else {
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
    auto.waitFor()
    _G.huakuaijishu += 1
    if (_G.huakuaijishu > 5) {
        var ff = text("拖动下方滑块完成拼图").findOne(1000)
        if (ff) {
            var dd = idContains("reload").depth(24).findOne(1000)
            if (dd) {
                dd.click()
                _G.huakuaijishu = 0
                log("刷新滑块验证")
            }

        }

    }
    sleep(4000)
    for (var i = 0; i < 0; i++) {
        sleep(1000);
        log(i);
    }
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
        sleep(2000)
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

function 读取地址(params) {
    var 地址=textContains("地区").findOne()
    var 地址_value = 地址.text()
    var data=地址_value.replace(/地区: /,"")
    log(data)
    return data
}