importClass(java.security.MessageDigest)
importClass(java.lang.Integer)
importClass(android.content.Context);
importClass(android.provider.Settings);
importClass(android.os.Process)
importClass(android.net.Uri)
importClass(android.media.Ringtone)
importClass(android.media.RingtoneManager)
importClass(java.lang.System)

if (!requestScreenCapture()) {
    toastLog("请求截图失败");
    exit();
}
toastLog("开始运行,请等待")
device.keepScreenOn()
console.setGlobalLogConfig({
    "file": "/sdcard/QQHDLOG.txt"
})
console.setSize(device.width/2,device.height)
console.show()
var sh_root= new RootAutomator()
events.on('exit', function(){ 
    sh_root.exit();
    console.hide()
 });


// 监听暂时关闭
events.broadcast.on("data_deliver_down", function(data){
    toast("收到命令,取数据");
    var data= storage.get("data","")
    wordsContainer=data
});


function openAccessbility() {
    var packagename_self = context.getPackageName()

    var dd = shell("pm grant " + packagename_self + " android.permission.WRITE_SECURE_SETTINGS", true)
    sleep(200)
    //log(dd)
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
        Settings.Secure.putString(context.getContentResolver(), Settings.Secure.ACCESSIBILITY_ENABLED, '1');
        log("无障碍开启成功");
        // auto.waitFor();
        return true
    } catch (error) {
        //授权方法：开启usb调试并使用adb工具连接手机，执行 adb shell pm grant org.autojs.autojspro android.permission.WRITE_SECURE_SETTING
        // log("\n请确保已给予 WRITE_SECURE_SETTINGS 权限\n\n授权代码已复制，请使用adb工具连接手机执行(重启不失效)\n\n", error);
        // setClip("adb shell pm grant org.autojs.autojspro android.permission.WRITE_SECURE_SETTINGS");
        log("无障碍开启失败:"+error)
        return false
    }
}

openAccessbility()
sleep(500)
auto.waitFor()


var 测试标记 = false
// log($shell.checkAccess("root"))
// log($shell.setDefaultConfig({root:true}))
var sh = new Shell(true);
// log(Object.keys(sh))
// log(sh.root)
var BASEURL
var loginTime = 40 * 1000
var sendTime = 20 * 1000
var changeIp = true
var wordsK = 5 //depth 比例
var robotcount = 0
var robotinfoBak=null

var number = ""//全局暂存的当前QQ号

// var word_list_count=0;//对同一关键词,检查的项目计数
var storage=storages.create("QQHDdata")

var wordsContainer = {
    "arr": [],
    "words": "",
    "getWords": function () { //获得一个可用关键词
        if (wordsContainer.words.count > 0) {
            return wordsContainer.words.words
        } else if (wordsContainer.arr.length == 0) {
            wordsInit(number)
            wordsContainer.words = wordsContainer.arr.pop()
            return wordsContainer.getWords()
        } else if (wordsContainer.arr.length > 0) {
            wordsContainer.words = wordsContainer.arr.pop()
            return wordsContainer.getWords()
        }
    },
    "useWords": function () { //用于判断是不是需要换关键词//不进行关键词重新填充
        if (wordsContainer.words.count > 0) {
            wordsContainer.words.count -= 1
            log("上载数据到控制器")
            storage.put("data",wordsContainer)
            events.broadcast.emit("data_deliver_up","up");
            return true
        } else {
            return false
        }
    }
}
while (true) {
    System.gc()

    function openNetwork() {
        toastLog("等待网络可用")
        sh.exec("settings put global airplane_mode_on 0")
        sh.exec("am broadcast -a android.intent.action.AIRPLANE_MODE --ez state false")
        sleep(4000)
    }
    let mConnectivityManager = context.getSystemService(android.content.Context.CONNECTIVITY_SERVICE)
    let mNetworkInfo = mConnectivityManager.getActiveNetworkInfo()
    if (mNetworkInfo) {
        if (mNetworkInfo.isAvailable()) {
            break;
        } else {
            openNetwork()
        }

    } else {
        openNetwork()
    }
}

function updata() {

    for (let index = 0; index < 10000; index++) {
        try {
            var re = http.get("http://dns.ronsir.cn/ip.txt")
            if (re.statusCode == 200) {
                BASEURL = "http://" + re.body.string() + ":88"
                toastLog("设置服务器IP为:" + BASEURL)
                break;
            }
            sleep(2000)


        } catch (error) {
            toastLog("获取服务器IP错误" + error)
            sleep(2000)
            //exit()
        }
    }
}
updata()
// BASEURL="http://fast.abc.com/enlovo/api/"
const QQHDpackageName = app.getPackageName("QQ HD")
log(QQHDpackageName)

// sh.setCallback({
//     onNewLine: function (line) {
//         //有新的一行输出时打印到控制台
//         log("sh输出:" + line);
//     }
// })
events.on("exit", function () {
    log("结束运行");
    device.cancelKeepingAwake()
    sh.exit()
});
var start_time = (new Date).getTime()
var currentTime = new Date()

const USERNAME = "admin"
const PASSWORD = "123654"

///联众配置
const SOFTWAREID_LZ = 13480 //软件ID
const softwareSecret = "qLCaCWRmTFu6wIZstoItssn1sNDFdN1BguoByyZ1" //token
const USERNAME_LZ = "wowwonder" //联众用户名
const PASSWORD_LZ = "wowwonder3#" //联众密码
const captchaType = "1001" //识别类型
//////
////
var accountOrPasswordError = false //账号密码错误的记录器
var checkNumberError = false //验证码错误记录器
var sendOK = false //加群消息发送成功记录器
var notAllowedAdd = false //不允许任何人加入记录器
var requestsFailed = false //请求发送失败记录器
var currentTaskType = "number" /// 可以为 number   或  words
var accountUnLogin = false
//toast监听线程
threads.start(function () {
    log("Toast监听已启动")
    events.observeToast();
    events.onToast(function (toast) {
        var pack = toast.getPackageName()
        var tex = toast.getText()
        if (pack == "com.tencent.minihd.qq" && tex == "帐号或密码错误，请重新输入。") {
            accountOrPasswordError = true
        } else if (pack == "com.tencent.minihd.qq" && tex == "验证码错误，请重新输入!") {
            log("验证码错误，请重新输入")
            checkNumberError = true
            log("验证码错误")
        } else if (pack == "com.tencent.minihd.qq" && tex == "发送成功") {
            log("加好友成功")
            sendOK = true
        } else if (pack == "com.tencent.minihd.qq" && tex == "请求发送成功") {
            log("加群成功")
            sendOK = true
        } else if (pack == "com.tencent.minihd.qq" && tex == "请求发送失败") {
            log("请求发送失败")
            requestsFailed = true
        } else if (pack == "com.tencent.minihd.qq" && tex == "该群不允许任何人加入") {
            log("该群不允许任何人加入")
            notAllowedAdd = true
        }

        // log("Toast内容: " + toast.getText() + " 包名: " + toast.getPackageName());
    });
})

//异常界面监控线程
var weigui = false
threads.start(function () {
    log("异常界面监听已启动")
    var errorSelect = [text("确定").clickable(true), 
    // textStartsWith("拒绝").clickable(),
    text("允许").clickable(true),

    ]
    while (true) {
        
        errorSelect.forEach((element) => {
            try {
                if (element.exists() ) {
                    log(element+"已点击")
                    element.click()
                }
            } catch (error) {

            }

        })
        if (text("QQHD获取浮窗权限").exists()) {
            text("取消").clickable().findOne().click()
        } else if (text("去安全中心").exists() && text("取消").exists()) {
            log("账号违规")
            weigui = true
            sleep(1000)
        }
        sleep(1000)
    }
})


//获取QQ号
//本函数在获取不到信息时会阻塞,直到正确返回信息
function 接口1(username, password, deviceid) {
    let timeout = 9999
    while (true) {
        toastLog("接口1运行中")
        try {
            let url = BASEURL + "/enlovo/api/RobotInfo?username=" + username + "&password=" + password + "&deviceid=" + deviceid
            log(url)
            let reData = http.get(url)
            if (reData.statusCode == 200) {
                let data = reData.body.json()
                log("接口1返回内容:")
                log(data)
                if (data.message == "success") {

                    log("接口1 正确")
                    robotcount += 1
                    return data.data
                } else if (data.message == "暂无数据") {
                    toastLog("暂无数据")
                }
            } else {
                log("错误代码:" + reData.statusCode)
                log("错误信息:" + reData.body.json())
            }
        } catch (error) {

            log(error)
            updata()
        }
        sleep(3000)
    }
}


function getToken() {
    let msg=new Date()
    let y=String(msg.getFullYear())
    let m=msg.getMonth()
    let d=String(msg.getDate())
    m+=1
    if(m <= 9){
        m="0"+String(m)

    }
    if(d <= 9){
        d="0"+String(d)

    }
    log(y+m+d)
    var dataStr=new java.lang.String(y+m+d)
    var mmsg = MessageDigest.getInstance("MD5");
    mmsg.update(dataStr.getBytes("UTF8"));
    var s = mmsg.digest();
    var result = "";
    for (var i = 0; i < s.length; i++) {
        result += Integer.toHexString((0x000000FF & s[i]) | 0xFFFFFF00).substring(6);
    }
    return result;

    // return $crypto.digest(y+m+d, "MD5");
    
}   

function getQQNumber() {
    id("tab_item_container").findOne().click()
    sleep(1000)
    log(text("帐号管理").findOne().parent().click())
    sleep(2000) 
    var QQ号=id("account").find()[0].text()
    log("读取到得QQ号:"+QQ号)
    return QQ号

    text("帐号信息").findOne()
    var info = id("info").find()
    if (info.length!=0) {
        var num= info[0].text()
        log(num)
        var re=/[0-9]+/
        num=re.exec(num)
        if (num) {
            num=num[0]
            back()
            sleep(500)
            return num
        }else{
            return null
        }
        
    }
}


//上传信息
function 接口2(username, password, robotid, clientid, status) {
    while (true) {
        toastLog("接口2运行中")
        log("接口2 上传信息:")
        log({
            "username": username,
            "password": password,
            "robotid": robotid,
            "clientid": clientid,
            "status": status
        })
        try {
            var reData = http.post(BASEURL + "/enlovo/api/RobotStatus"+"?username="+username+"&password="+password+"&robotid="+robotid, {
                "clientid": clientid,
                "status": status
            })
            if (reData.statusCode == 200) {
                var data = reData.body.json()
                log("接口2返回内容")
                if (data.code == 200) {

                    log(data)
                    return true
                } else {
                    if (data.message == "写入数据错误!") {
                        toastLog("写入数据错误!")

                    }
                }

            } else {

            }
        } catch (error) {
            log(error)
            updata()
        }
        sleep(3000)
    }
}
//获取 待添加好友列表
function 接口3(number ) {
    if (测试标记) {
        log("接口3 测试中")
        return 1
    }
    while (true) {
        toastLog("接口3运行中")
        var token = getToken()
        log(token)
        try {
            var url=BASEURL + "/enlovo/api/FriendListForNumber?token="+token+"&number="+number
            log(url)
            var reData = http.get(url)
            if (reData.statusCode == 200) {
                var data = reData.body.json()
                log("接口3返回内容:")
                log(data)
                if (data.message == "success") {
                    // log(data.data)
                    return data.data
                } else if (data.message == "暂无数据") {
                    toastLog("接口3暂无数据,启用关键词加群") ///
                    return 1
                }else if(data.message =="QQ号码错误，最近12小时已有回执"){
                    toastLog("QQ号码错误，最近12小时已有回执")
                    return 0
                }
            } else {

            }
        } catch (error) {
            log(error)
            updata()
        }
        sleep(2000)
    }
}

/**
 * //更新好友/群状态   通过 指定账号添加
 * @param {*} enlovo_task_id 
 * @param {*} status 
 * @param {*} friendid 
 * @param {*} question 
 * @param {*} message 
 * @param {*} quota 
 * @param {*} number 
 */
function 接口4(enlovo_task_id, status, friendid, question, message, quota) {
    if (测试标记) {
        log("接口4测试中")
        return true
    }
    question = question || ""
    message = message || ""
    quota=1
    while (true) {
        toastLog("接口4运行中")

        try {
            let token=getToken()
            let url = BASEURL + "/enlovo/api/FriendStatusForNumber"+"?token="+token
            let data = {
                "enlovo_task_id": enlovo_task_id,
                "status": status,
                "friendid": friendid,
                "question": question,
                "message": message,
                "quota": quota,
                "number":number,
            }
            log("接口4上传数据:")
            log(data)
            reData = http.post(url, data)
            if (reData.statusCode == 200) {
                let data = reData.body.json()
                log("接口4 返回内容:")
                log(data)
                if (data.code == 200) {
                    log("接口4正常")
                    return true
                } else if (data.code == 201) {
                    log()
                    return false
                }
            } else {
                log('状态码:' + reData.statusCode)
                log(url)
                log(data)
            }
        } catch (error) {
            log("捕获到错误:" + error)
            updata()
        }
    }
}

//getTask  开放api get
function 接口5(number) {
    while (true) {
        toastLog("接口5运行中")
        try {
            let token = getToken()
            let url = BASEURL + "/enlovo/api/getTaskForNumber"+"?token="+token+"&number="+number
            log(url)
            let res = http.get(url)
            if (res.statusCode == 200) {
                let resData = res.body.json()
                log("接口5 返回内容:")
                log(resData)
                if (resData.message == "success" && resData.data.words != "") {
                    log("正确数据:")
                    log(resData.data)
                    return resData.data
                } else {

                    log(resData.data)

                }

            } else {
                log(res.statusCode)
            }
        } catch (error) {
            log("捕获错误:" + error)
            updata()
        }
    }
}


/**
 * ///*上传群信息,等待结果  post
 * @param { string } group 群号
 * @param {*} name //群名
 * @param {*} total //群成员数量
 * @param {*} words 
 * @param {*} tags 
 * @param {*} info 
 * @param {*} id 
 * @param {*} number 
 */
function 接口6(group, name, total, words, tags, info, id,number) {
    tags = tags || "群标签为空"
    info = info || "群介绍为空"

    while (true) {
        try {
            let token = getToken()
            let url = BASEURL + "/enlovo/api/FriendInfoForNumber"+"?token="+token
            log(url)
            let data = {
                "enlovo_task_id": id,
                "group": group,
                "name": name,
                "total": total,
                "words": words,
                "tags": tags,
                "info": info,
                "status":"1",
                "number":number,
            }
            log("接口6上传信息:")
            log(data)
            if (name == "") {
                while (true) {
                    toast("群名称为空")
                    sleep(2000)
                }
            }

            let re = http.post(url, data)
            if (re.statusCode == 200) {
                re = re.body.json()
                log("接口6 返回内容:")
                log(re)
                if (re.code == 200) {
                    log("群查询结果:")
                    log(re.data)
                    return re.data
                } else {
                    log("错误信息:" + re.message)
                }
            } else {
                log("错误:状态码:" + re.statusCode)
                log("错误信息:" )
                log(re)
            }
        } catch (error) {
            log("捕获错误:" + error)
            updata()
        }
    }
}

function wordsInit(number) {
    log("拉取关键词")
    var redata = 接口5(number)
    var data = {
        "id": "",
        "name": "",
        "words": "",
        "depth": "",
        "count": "",
    }
    var allWorrds = redata.words.split(",")
    for (let index = 0; index < allWorrds.length; index++) {
        var element = allWorrds[index];
        if (element != "") {
            // log(element)
            let data = new Object()
            data.id = redata.task_id
            data.name = redata.name
            data.words = element
            data.depth = redata.depth
            // data.count = wordsK * redata.depth
            data.count = wordsK

            // log(data)
            wordsContainer.arr.push(data)

        }

    }


    // log("wordsInitOk")
    // wordsContainer.words = wordsContainer.arr.pop()
    // wordsContainer.getWords()
    // log(wordsContainer.arr)

}



function get_check() {
    var img_bounds = id("verification_code").className('android.widget.ImageView').findOne().bounds()
    var img = captureScreen();
    var clip = images.clip(img, img_bounds.left, img_bounds.top, img_bounds.width(), img_bounds.height())
    var base64_data = images.toBase64(clip, "png")
    // let clip=images.read("/sdcard/360/clip.png")
    // let base64_data = images.toBase64(clip,"png" )
    var data = {
        "softwareId": SOFTWAREID_LZ,
        "softwareSecret": softwareSecret,
        "username": USERNAME_LZ,
        "password": PASSWORD_LZ,
        "captchaData": base64_data,
        "captchaType": captchaType
    }
    var url = "https://v2-api.jsdama.com/upload"
    while (true) {
        try {
            var re = http.postJson(url, data)
            if (re.statusCode == 200) {
                var reData = re.body.json()
                log("原始数据:")
                log(reData)
                if (reData.data.recognition.length == 4) {
                    log(reData)
                    return reData
                } else {
                    text("看不清？换一张").clickable().findOne().click()
                    sleep(2000)
                    return get_check()
                }
            } else {
                throw "网络错误"
            }
        } catch (error) {
            log(error)
        }
    }
}

function input_check() {
    let re = {
        status: true,
        message: ""
    }
    while (true) {
        log("input_check")
        checkNumberError = false
        var edit = id("input_prompt").className("android.widget.EditText").findOne(5000)
        var dlQQ = desc("登录QQ").findOne(1000)
        if (edit) {
            log("找到输入框")
            let check_number = get_check()
            log("check_number:")
            log(check_number)
            edit = id("input_prompt").className("android.widget.EditText").findOne(5000)

            if (edit) {
                edit.setText(check_number.data.recognition)
            } else {
                continue
            }
            sleep(1000)
            let wancheng = text('完成').clickable().findOne(2000)
            if (wancheng) {
                log("找到完成按钮")

                wancheng.click()
            }
            sleep(3500)
            if (weigui) {
                log("账号无法登录")
                re.status = false
                re.message = "账号无法登录"
                return re
            }
            if (!checkNumberError && !text("输入验证码").findOne(2000)) {
                return re
            }
        } else if (dlQQ) {
            log("在主页")
            desc("登录QQ").findOne().click()
            sleep(2000)
            return input_check()
        } else {
            if (currentActivity() == "com.tencent.mobileqq.activity.SplashActivity" && !text("输入验证码").findOne(2000)) {
                log("跳出")
                return re
            }
        }

    }

}

function loginQQ(QQAccount, QQpasswor) {
    //请求账号
    desc("请输入QQ号码或手机或邮箱").findOne().setText(QQAccount)
    log("本次输入的密码为:" + QQpasswor)
    desc("请输入密码").findOne().setText(QQpasswor)
    sleep(500)
    var 密码错误计数=0
    for (let index = 0; index < 6; index++) {
        var zhanghao = desc("请输入QQ号码或手机或邮箱").findOne(1000)
        zhanghao ? zhanghao.setText(QQAccount) : null
        log("本次输入的密码为:" + QQpasswor)
        var mima = desc("请输入密码").findOne(1000)
        mima ? mima.setText(QQpasswor) : null
        sleep(500)
        var 登录QQ = desc("登录QQ").findOne(1000)
        登录QQ ? 登录QQ.click() : null
        sleep(2500)
        var 登录成功到首页标记 = id("ib_widget").clickable().findOne(3000)
        if (weigui) { //可能直接就无法登录
            log("账号无法登录")
            return false
        }
        if (密码错误计数>1) {
            log("密码错误次数过多")
            return false
        }
        if (!登录成功到首页标记) {
            var 结果 = input_check() //这里可能不要验证码
            if (!结果.status && 结果.message == "账号无法登录") {
                return false
            }
        } else {
            log("登录成功")
            sleep(loginTime)
            waitForActivity("com.tencent.mobileqq.activity.SplashActivity")
            return true
        }
        sleep(2000)
        if (accountOrPasswordError) {
            //账号密码错误
            密码错误计数+=1
            accountOrPasswordError = false //重置标记
            // back()
        }
    }
    //多次尝试后失败 上传错误信息
    return false
}

function start_check() {
    for (let index = 0; index < 80; index++) {
        log("查找中")
        sleep(3000)
        // sh.exec("am start -p "+QQHDpackageName)
        let login = id("search_icon").findOne(500)
        if (login) {
            return true //这里代表启动成功
        }
    
    let main=id("head_layout").findOne(500)
        if (main) {
            return true
        }
    }
    //这里是备用方案,使用坐标点击
    home()
    sleep(1500)
    click("QQ HD")
    waitForActivity("com.tencent.mobileqq.activity.RegisterGuideActivity")
    return start_check()
}

function addFriend(friendInfo) {
    var re = {
        status: true,
        question: "",
        message: "",
        statusCode: 0
    }
    log(arguments.callee.name)
    let search_people = text("找人:").findOne().parent().click() //zh这里可能
    log("找人按钮" + search_people)
    let add_friend = desc("加好友").clickable().findOne(20000)
    if (add_friend) {
        log("找到加好友")
        add_friend.click()
        sleep(3000)
        let yanzheng = className("android.widget.EditText").id('request_info_et').findOne(3000)
        if(yanzheng){
            log("找到验证框")
            yanzheng.setText(friendInfo.msg)
            sleep(2500)
        
            let next = text("下一步").clickable().findOne().click()
            log("找到下一步")
            sleep(1500)
        }
        let send = text("发送").clickable().findOne().click()
        log("找到发送")
        for (let index = 0; index < 10; index++) {
            if (sendOK) {
                log("添加成功")
                re.status = true
                re.statusCode = 1
                re.message = "成功发送请求"
                return re
            } else if (requestsFailed) {
                re.status = false
                re.statusCode = 0
                re.message = "请求发送失败"
                return re
            }
            sleep(1000)
        }
        log("点击发送后10秒无响应")
        re.status = false
        re.statusCode = 0
        re.message = "点击发送后10秒无响应"
        return re
    } else {
        log("没找到人")
        re.status = false
        re.message = "找不到这个人"
        re.statusCode = 3
        return re
    }

}



//加群
function addOrganization(friendInfo) {
    var re = {
        status: true,
        question: "",
        message: "",
        statusCode: 0,
    }
    let jiaqun = text("加入该群").findOne(20000)
    if (jiaqun) {
        jiaqun.parent().click()
        log("加入群聊按钮找到")
        sleep(5000)

        for (let index = 0; index < 45; index++) {
            let yanzheng = className("android.widget.EditText").findOne(500)
            let guanliyuanTiwen = text("管理员需要你回答以下验证问题").findOne(500)
            var qunziliao  = text("群资料").findOne(500)
            if (guanliyuanTiwen) {
                let problem = textStartsWith("问题:").findOne(1000)

                let problemContext = problem.text().split(":")[1]
                log("管理员需要你回答以下验证问题:" + problemContext)
                sleep(2000)
                descStartsWith("答案输入框，请输入答案").findOne().setText(friendInfo.msg)
                sleep(100)
                let send = text("发送").clickable().findOne().click()
                for (let index = 0; index < 10; index++) { ////////////////
                    if (sendOK) {
                        log("添加成功")
                        re.status = true
                        re.statusCode = 3
                        re.question = problemContext
                        return re
                    } else if (requestsFailed) {
                        re.status = false
                        re.statusCode = 0
                        re.message = "请求发送失败"
                        return re
                    }
                    sleep(1000)
                }
                log("点击发送后10秒无响应")
                re.status = false
                re.statusCode = 0
                re.message = "没响应"
                return re ////////////////////这里需要增加捕获到的添加失败的原因
            }
            if (yanzheng && !guanliyuanTiwen && !qunziliao) {
                log("将输入的信息:"+friendInfo.msg)
                yanzheng.setText(friendInfo.msg)
                sleep(3000)
                let send = text("发送").clickable().findOne().click()
                log("发送点击完成")
                for (let index = 0; index < 10; index++) {
                    if (sendOK) {
                        log("添加成功")
                        re.status = true
                        re.message = "成功发送请求"
                        re.statusCode = 1
                        return re
                    } else if (requestsFailed) {
                        re.status = false
                        re.statusCode = 3
                        re.message = "请求发送失败"
                        return re
                    }
                    sleep(1000)
                }
                log("没响应")
                re.status = false
                re.statusCode = 0
                re.message = "没响应" //这里需要增加捕获到的添加失败的原因
                return re
            }
            
            if (notAllowedAdd) {
                notAllowedAdd = false
                re.status = false
                re.message = "不允许任何人加入"
                re.statusCode = 3
                return re
            }
        }

    } else {
        log("搜不到")
        re.status = false
        re.statusCode = 4
        re.message = "搜不到"
        return re
    }


}

function addStartNumber(friendInfo) {
    className("android.widget.FrameLayout").clickable(true).depth(12).findOne().click()
    sleep(1000)
    text("加好友").findOne().parent().child(1).click()
    sleep(1000)
    desc("搜索栏、QQ号、手机号、邮箱、群、生活服务、连按两次编辑").clickable().findOne().click()
    sleep(1000)
    // desc("搜索").className("android.widget.EditText").findOne().click() //激活输入框
    // sleep(500)
    sendOK = false
    let et_search_keyword = editable(true).find()[0].setText(friendInfo.number) ////设置信息
    sleep(1000)
    if (friendInfo.type == "0") {
        log("开始找人")
        return addFriend(friendInfo)
    } else {
        log("开始找群")
        let search_people = text("找群:").findOne().parent().click()
        //TODO  
        log("找群按钮" + search_people)
        return addOrganization(friendInfo)
    }
}

//获取关键词,输入关键词,找到一个群,判断是否可加,发送加入信息
//返回一个状态  status
//method 可以是从主页进来的=主页,或在查找界面=查找界面  /修改为识别当前页面
function addStartWords(number) {
    back_index()
    log(arguments.callee.name)
    descStartsWith("消息栏").findOne().click()
    log("消息栏点击成功")
    className("android.widget.FrameLayout").clickable(true).depth(12).findOne().click()
    log("添加按钮点击成功")
    sleep(1000)
    text("加好友").findOne().parent().child(1).click()
    //if 关键词池为空,则初始化
    log("加好友按钮点击成功")
    currentTaskType = "words"
    if (wordsContainer.arr.lenhth == 0) {
        log('初始化关键词')
        wordsInit(number)
    }
    var re = {
        "status": true,
        "message": "状态正常"
    }
    //
    let 关键词 = wordsContainer.getWords()
    log("关键词:")
    log(关键词)

    function 进入后( elementView) {
        var re = {
            "status": true,
            "message": ""
        }
        if (element.bounds().height() < 100) {
            // log("该元素不在屏幕内,不使用")
            re.message = "界外"
            return re
        }
        // if (robotinfo.quota <= 0) {
        //     re.status = true
        //     re.message = "当前QQ机器人quota=0"
        //     return re
        // }
        // log("roboto")
        if (!wordsContainer.useWords()) {

            wordsContainer.getWords() //这里需要更新关键词
            re.status = true
            re.message = "关键词用完"
            return re

        }
        // log("robotook")
        let tianJiaJieguo = addOver() //返回到一个合适的页面
        if (!tianJiaJieguo.status) { //添加中出错//这里为被封号
            re = {
                "status": false,
                msg: tianJiaJieguo.message
            }
            return re
        }

        try {
            var descModel=false
            var top=0
            try {
                top=elementView.child(1).child(0).bounds().top
                var 群名 = elementView.child(1).child(0).text()
            } catch (error) {
                var 群名 = elementView.child(1).desc()
                descModel=true
            }
            log("desc状态:"+descModel)
            log("群名:"+群名)

            var 成员数,标签总数,介绍
            if (!descModel) {//非desc模式
                if (elementView.child(1).child(1).bounds().top == top) {//这是有认证图标的时候
                    成员数= elementView.child(1).child(2).text()


                    标签总数 = elementView.child(1).childCount()
                    var 标签 = []
                    if (标签总数 > 3) {
                        for (let index = 0; index < 标签总数 - 3; index++) {
                            标签.push(elementView.child(1).child(3 + index).text())
                            
                        }
                    }


                    介绍 = elementView.child(3).child(0).child(2).text()
                    
                }else{//没有认证图标的情况
                    成员数= elementView.child(1).child(1).text()
                    
                    
                    标签总数 = elementView.child(1).childCount()
                    var 标签 = []
                    if (标签总数 > 2) {
                        for (let index = 0; index < 标签总数 - 2; index++) {
                            标签.push(elementView.child(1).child(2 + index).text())
        
                        }
                    }

                    介绍 = elementView.child(3).child(0).child(0).text()



                }

            }else{//desc 模式
                成员数 = elementView.child(2).desc()
            }
            log("成员数:"+成员数)
            标签 = 标签.join(",")
            log("标签:"+标签)
            log("介绍:"+介绍)


            
            
            // log("介绍:"+介绍)
            sh_root.press(elementView.bounds().centerX()+200, elementView.bounds().centerY(),200)
            var 群号 = id("troop_uin").findOne().text()
            log("群号:"+群号)
        } catch (error) {
            log("读取群信息错误:")
            log(error)
            re.message = "读取群信息错误"
            re.status = false
            return re
        }
        /////调试用
        if (测试标记) {
            re.status = true
            re.message = "添加完成"
            back()
            return re
        }
        
        let 任务ID = wordsContainer.words.id
        let 群查询结果 = 接口6(群号, 群名, 成员数, 关键词, 标签, 介绍, 任务ID,number)


        let friendInfo = {
            "msg": 群查询结果.msg
        } //这里把群查询的问候语设置为friend 的msg ,供加群时使用


        //////
        // let 群查询结果 = {"status":0}
        if (!((群查询结果.status > 1 && 群查询结果.status < 4) || 群查询结果.diff < 86400 * 2)) {
            log("判断为需要添加")
            // if (   !(群查询结果.status >0 && 群查询结果.status < 4) || (群查询结果.diff < 86400 ) ) {
            var 添加结果 = addOrganization(friendInfo) //
            // robotinfo.quota -= 1 //
            if (添加结果.status) {
                //更新群状态
                log("关键词模式调用接口4+0.1")
                log("调用传递值:群状态")
                log(添加结果.statusCode)
                接口4(wordsContainer.words.id, 添加结果.statusCode, 群查询结果.id, 添加结果.question, 添加结果.message, 0.1)
            } else {
                log("关键词模式调用接口4-0.1")
                log("调用传递值:群状态")
                log(添加结果.statusCode)
                接口4( wordsContainer.words.id, 添加结果.statusCode, 群查询结果.id, 添加结果.question, 添加结果.message, -0.1)
            }
            sleep(1000)
            while (!text("群资料").exists() && !text("查找结果").exists()) {
                back();
                log("返回中")
                sleep(1000)
            }
            re.status = true
            re.message = "添加完成"
            return re
        }else{
            log("判断为本群不需要添加")
            re.status = true
            re.message = "本群不需要添加"
            return re
        }
        

       
    }

    if (text("添加").exists()) {
        log("添加页面")
        let QQhao = desc("搜索栏、QQ号、手机号、邮箱、群、生活服务、连按两次编辑").clickable().findOne().click()
        let search = desc("搜索").className("android.widget.EditText").findOne().click() //激活输入框
        let et_search_keyword = id("et_search_keyword").findOne().setText(关键词) ////设置信息
        let search_people = text("找群:").findOne().parent().click()
    }
    var 查找列表 = className("android.widget.ListView").findOne(60000)

    if (查找列表) {

        
        while(true){
            System.gc()
            // if (!wordsContainer.useWords()) {//同一关键词查找10次都已添加
            //     ///更新关键词
            //     log("关键词用完了")
            //     back(); // 回到首页
            //     wordsContainer.getWords()
            //     var returnre= addStartWords(number)
            //     log(returnre)
            //     return returnre
            // }
            log("查找开始:"+ (wordsK- wordsContainer.words.count  ))
            查找列表 = className("android.widget.ListView").findOne()
            var 子集合 = 查找列表.children()
            log("第一次列表序号:" + (wordsK- wordsContainer.words.count  ))
            var element = 子集合[(wordsK- wordsContainer.words.count  )];
            // log(element)
            let 本次添加结果 = 进入后(element)
            log("本次添加结果:")
            log(本次添加结果)
            if (本次添加结果.status) {
                re.status = true
                if (本次添加结果.message == "当前QQ机器人quota=0") {
                    log("当前QQ机器人quota=0")
                    re.message = "当前QQ机器人quota=0"
                    return re
                } else if (本次添加结果.message == "关键词用完") {
                    ///更新关键词
                    log("关键词用完了")
                    back(); // 回到首页
                    var returnre= addStartWords(number)
                    log(returnre)
                    return returnre
                } else if (本次添加结果.message == "界外") {
                    log("该元素在界外,不使用,反向滑动尝试纠正")
                    sh_root.swipe(device.width /2,device.height /5 *2 ,device.width /2,device.height /5*3 ,300 )

                }else if (本次添加结果.message == "本群不需要添加") {
                    log("本群不需要添加")
                    log("返回上一页")
                    // word_list_count++//为了切换为下一个群,这个群已被添加过

                    // back()
                    id("ivTitleBtnLeft").findOne().click()
                    log("返回上一页成功")
                    
                } else {
                    log("本次添加完成") /////////////////
                    // word_list_count++//成功加了一个群,计数加一
                    break;
                }
            } else {
                log("出现添加错误") /////////////////
            }
            
            while (true) {
                 System.gc()

                查找列表 = className("android.widget.ListView").findOne()
                子集合 = 查找列表.children()
                log("第二次列表序号:" + (wordsK- wordsContainer.words.count  ))
                var element = 子集合[(wordsK- wordsContainer.words.count  )];
                // element=
                if (element.bounds().bottom > device.height * 0.7) {
                    log("滑动")
                    log("元素下界："+element.bounds().bottom)
                    log("设备0.7："+device.height * 0.7)
                    // className("android.webkit.WebView").findOne().scrollDown()
                    sh_root.swipe(device.width /2,device.height /5 *3 ,device.width /2,device.height /5*2 ,700 )
                    sleep(3000)
                }else{
                    log("跳出检测循环")
                    break
                }
                
            } 
            
        }


    } else {
        log("查找超时")
        re.status = true
        re.message = "查找关键词超时"
        return re
    }


}

function openANDclose() {
    log("初始化QQHD")
    // log(shell("am force-stop " + QQHDpackageName, true))
    log(shell("am start -S -W com.tencent.minihd.qq/com.tencent.mobileqq.activity.SplashActivity",true))
    sleep(2000)
  
    if (changeIp) {
        log(shell("settings put global airplane_mode_on 1", true))
        log(shell("am broadcast -a android.intent.action.AIRPLANE_MODE --ez state true", true))
        log(shell("settings put global airplane_mode_on 0", true))
        log(shell("am broadcast -a android.intent.action.AIRPLANE_MODE --ez state false", true))
        sleep(3000)
    }

}


function back_index() {
    var re = {
        "status": true,
        "message": ""
    }
    let status = [
        [text("群资料").className("android.widget.TextView"), () => {
            back()
        }],
        [text("个人资料").id("ivTitleName"), () => {
            back();
            log("返回1次");
            sleep(3000)
        }],
        // [text("登 录").clickable(), () => {
        //     className("android.widget.EditText").id('password').findOne().setText(robotinfo.password)
        //     sleep(1000)
        //     text("登 录").clickable().findOne().click()
        // }]
        [text("查找结果"),()=>{
            back();
            log("返回1次");
            sleep(2000)
        }],
        [textStartsWith("找群"),()=>{
            back();
            log("返回1次");
            sleep(2000)
        }],
        [textStartsWith("添加"),()=>{
            back();
            log("返回1次");
            sleep(2000)
        }],
        [textStartsWith("身份验证"),()=>{
            back();
            log("返回1次");
            sleep(2000)
        }],
    ]
    for (let index = 0; index < 30; index++) {
        log("等待回到主页")
        if (weigui) {
            weigui = false
            re.status = false
            re.message = "违规被封号"
            return re
        }
        status.forEach((element) => {
            let a = element[0].findOne(10)
            if (a) {
                element[1]()
                sleep(1500)
            }
        })
        if (currentPackage() != QQHDpackageName) {
            app.launch(QQHDpackageName)
            sleep(3000)
        } 
        // else if (currentActivity() == "com.tencent.mobileqq.activity.SplashActivity" && !textEndsWith("资料").exists()) {
        //     re.status = true
        //     re.message = "成功返回"
        //     return re
        // }
        else if (className("android.widget.FrameLayout").clickable(true).depth(12).exists()) {
            re.status = true
            re.message = "成功返回"
            return re
        }else if (text("帐号管理").exists()) {
            re.status = true
            re.message = "成功返回"
            return re
        }
        sleep(500)
    }
}

//添加完处理
function addOver() {
    log(arguments.callee.name)
    var re = {
        "status": true,
        "message": ""
    }
    // log("currentTaskType:" + currentTaskType)
    if (text("查找结果").findOne(3000) && currentTaskType == "words") {
        re.message = "关键词模式"
        log("关键词模式")
        return re
    } else {
        log("非关键词模式")
    }

    let status = [
        [text("群资料").className("android.widget.TextView"), () => {
            back()
        }],
        [text("个人资料").id("ivTitleName"), () => {
            back();
            log("返回1次");
            sleep(3000)
        }],
        // [text("登 录").clickable(), () => {
        //     className("android.widget.EditText").id('password').findOne().setText(robotinfo.password)
        //     sleep(1000)
        //     text("登 录").clickable().findOne().click()
        // }]

    ]
    for (let index = 0; index < 30; index++) {
        log("等待回到主页")
        if (weigui) {
            weigui = false
            re.status = false
            re.message = "违规被封号"
            return re
        }
        status.forEach((element) => {
            let a = element[0].findOne(10)
            if (a) {
                element[1]()
                sleep(1500)
            }
        })
        if (currentPackage() != QQHDpackageName) {
            app.launch(QQHDpackageName)
            sleep(3000)
        } else if (currentActivity() == "com.tencent.mobileqq.activity.SplashActivity" && !textEndsWith("资料").exists()) {
            re.status = true
            re.message = "成功返回"
            return re
        }else if (className("android.widget.FrameLayout").clickable(true).depth(12).exists()) {
            re.status = true
            re.message = "成功返回"
            return re
        }else if (text("帐号管理").exists()) {
            re.status = true
            re.message = "成功返回"
            return re
        }
        sleep(500)
    }
    toastLog("返回失败,不能回到正确的页面,重新开始")
    re.status = true
    re.message = "返回失败,不能回到正确的页面,重新开始"
    return re
}

function 登录完成后添加() {

    var re = {
        "status": true,
        "message": ""
    }
    for (let index = 0; index < parseInt(10000); index++) { //可以添加多次
        // for (let index = 0; index < parseInt(3); index++) {//可以添加多次
        
        var friendInfo = 接口3(number) //这里需要分别处理,分为按号加群,和按关键词加群  这里如果返回的是  1  则关键词加群
        if (friendInfo == 1) {
            var returnre=addStartWords(number) //这里直接完成所有任务
            log(returnre)
            return returnre
        }
        if (friendInfo == 0) {
            var time=30
            for (let index = 0; index < time; index++) {
                toastLog("休眠"+(time - index)+"分钟")
                sleep(60 * 1000)
            }
            continue
        }
        //这里确认回到消息栏
        sleep(1000)
        descStartsWith("消息栏").findOne().click()
        let addButton = className("android.widget.FrameLayout").clickable(true).depth(12).findOne(10000)
        if (addButton) {
            addButton.click()
            sleep(1500)
            let addFriendParent = text("加好友").findOne().parent()
            if (addFriendParent.childCount() == 2) {
                addFriendParent.child(1).click()
                sleep(1500)
                //////这里开始添加内部操作
                currentTaskType = "number"
                var addjieguo = addStartNumber(friendInfo)

                if (addjieguo.status) { //成功
                    接口4( friendInfo.enlovo_task_id, addjieguo.statusCode, friendInfo.id, addjieguo.question, addjieguo.message, 0.1,number)
                } else {
                    log("错误信息:" + addjieguo.message)
                    接口4(friendInfo.enlovo_task_id, addjieguo.statusCode, friendInfo.id, addjieguo.question, addjieguo.message, -0.1,number)
                }

                //////这里内部添加完的步骤
            } else {
                log("找不到加好友按钮:" + addFriendParent.childCount())
            }
        } else {
            log("找不到添加按钮")
        }
        // log("loginAndadd")
        let tianJiaJieguo = addOver() //返回到一个合适的页面
        if (!tianJiaJieguo.status) { //添加中出错//这里为被封号
            re = {
                "status": false,
                msg: tianJiaJieguo.message
            }
            return re
        }
        log("休眠%d秒", sendTime / 1000)
        sleep(sendTime) //TODO 这里延时30秒
        /////这里添加结束
    }
    ///这里按照号码加群  执行完了
    re.status = true
    re.message = "添加完成"
    return re
}

function 重启运行() {
    while (true) {
        try {
            var url = "https://gitee.com/api/v5/gists/2w3kl4m1gtf5ap9yj7roz63?access_token=f3668a8d0216355c020694b3e0d94d3f"
            var res = http.get(url);
            if (res.statusCode == 200) {
                toast("从网络加载成功");
                var ss = res.body.json().files
                var dd = ss[Object.keys(ss)[0]].content
                //log(dd)
                execution = engines.execScript("QQHD", dd);
                return 
                // var eng=engines.execScript("one",dd);
                // log(eng)
            } else {
                toast("从网络加载失败:" + res.statusMessage);
            }
        } catch (error) {
            log(error)
            
        }
        sleep(5000)
    }

}

function new接口1() {
    let timeout = 9999
    while (true) {
        toastLog("接口1运行中")
        try {
            let url = BASEURL + "/enlovo/api/RobotInfo?username=" + username + "&password=" + password + "&deviceid=" + deviceid
            log(url)
            let reData = http.get(url)
            if (reData.statusCode == 200) {
                let data = reData.body.json()
                log("接口1返回内容:")
                log(data)
                if (data.message == "success") {

                    log("接口1 正确")
                    robotcount += 1
                    return data.data
                } else if (data.message == "暂无数据") {
                    toastLog("暂无数据")
                }
            } else {
                log("错误代码:" + reData.statusCode)
                log("错误信息:" + reData.body.json())
            }
        } catch (error) {

            log(error)
            updata()
        }
        sleep(3000)
    }
    //http://fast.abc.com/enlovo/api/FriendListForNumber?token=44ccc5f5f3d044c85297f609f185b53d&number=2957368915
}
function main() {
    log("开始运行")
    while (true) {
        System.gc()

        var currenttime = new Date()
        var hours = currenttime.getHours()
        if (hours < 9 && false) {
            log("时间没到")
            sleep(60000)
            continue
        }

        openANDclose()
        // var robotinfo =robotinfoBak= 接口1(USERNAME, PASSWORD, "ADC7K")  //这里因接口1关闭已弃用
        // if (robotcount >= 60) {
        //     重启运行()  
        //     sleep(2000)
        //     toastLog("60次已满,本脚本退出,新脚本已启动")
        //     exit()
        // }
        if (start_check()) { //确认打开后进入输入账号界面
            log("打开QQHD成功")
            // text("登 录").clickable().findOne().click()
        }else{
            toastLog("打开QQHD失败")
        }
        // weigui = false
        // if (!loginQQ(robotinfo.number, robotinfo.password, robotinfo.id)) {
        //     log("登录异常")
        //     接口2(USERNAME, PASSWORD, robotinfo.id, robotinfo.clientid, 3) //异常
        //     continue //重新开始新一轮执行
        // } else {
        //     接口2(USERNAME, PASSWORD, robotinfo.id, robotinfo.clientid, 2) //登录成功
        // }
        
        number=getQQNumber()
        let tianJiaJieGuo = 登录完成后添加()
        
        // if (tianJiaJieGuo.status) {
        //     接口2(USERNAME, PASSWORD, robotinfo.id, robotinfo.clientid, 0)
        // } else {
        //     接口2(USERNAME, PASSWORD, robotinfo.id, robotinfo.clientid, 3) //重置当前登录QQ状态
        // }
        sleep(1000)
        if (text("查找结果").exists()) {
            log("从查找结果返回")
            back()
            sleep(1000)
        }
        if (textStartsWith("找人").exists() ) {
            log("从搜索页返回")
            back()
            sleep(1000)
        }
        if (textStartsWith("添加").exists() ) {
            log("从添加页返回")
            back()
            sleep(1000)
        }
        if(changeNumber()){
            back()
        }else{
            var uri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
            var rt = RingtoneManager.getRingtone(context, uri);
            for (let index = 0; index < 20*20; index++) {
                rt.play();
                toast("错误")
                sleep(3000)
            }
            
        }
    }

}
/**
 * 切换QQ号
 */
function changeNumber(){
    log(arguments.callee.name)
    back_index()
    id("tab_item_container").findOne().click()
    desc("帐号管理").findOne().click()  
    sleep(1000)
    while (true) {
        System.gc()

        var ff=desc("添加帐号").findOne()
        log(ff.bounds().centerY())
        if (ff.bounds().centerY()< device.height /3 *2) {
            var ee=ff.parent().parent().parent()
            log(ee.childCount())
            log(ee.child([ee.childCount()-2]).click())
            if (id("login").findOne(4000)) {
                return false
            }else if(text("帐号管理").exists()){
                return true
            }
            
        }else{
            log("没到底部")
        }
        sh_root.swipe(device.width /2 +200,device.height /5 * 4,device.width /2 +200 ,device.height/5,50)
        sleep(100)
    }
}

///status 0  未加      1   添加中    2  已经添加过
///diff   秒数     
////  quota 成功+0.1  失败-0.1
//  更新 好友|群 状态  加群后状态标记为0   需要回答问题  标记为3     不允许加入,标记为3
///

///// 不添加    diff < 1天       ; 2       
/////  添加   status 0 或 1 and diff > 1 天  
//加群

function test() {

    loginTime = 1 * 1000
    // var sendTime=20*1000
    sendTime = 1 * 1000
    changeIp = false
    

    ////   1374504817
    ////   1374504817
    ////   1993171950
    ////   1993171950
    main()
    // changeNumber()
}

// test()
main()