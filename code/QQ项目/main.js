auto.waitFor()
if (!requestScreenCapture()) {
    toastLog("请求截图失败");
    exit();
}
toastLog("开始运行,请等待")
device.keepScreenOn()
console.setGlobalLogConfig({
    "file": "/sdcard/QQHDLOG.txt"
})

var 测试标记 = false
var sh = new Shell(true);
var BASEURL
var loginTime = 40 * 1000
var sendTime = 20 * 1000
var changeIp = true
var wordsK = 20 //depth 比例
var robotcount = 0
var robotinfoBak=null

var wordsContainer = {
    "arr": [],
    "words": "",
    "getWords": function () { //获得一个可用关键词
        if (wordsContainer.words.count > 0) {
            return wordsContainer.words.words
        } else if (wordsContainer.arr.length == 0) {
            wordsInit()
            wordsContainer.words = wordsContainer.arr.pop()
            return wordsContainer.getWords()
        } else if (wordsContainer.arr.length > 0) {
            wordsContainer.words = wordsContainer.arr.pop()
            return wordsContainer.getWords()
        }
    },
    "useWords": function () { //用于判断是不是需要换关键词
        if (wordsContainer.words.count > 0) {
            wordsContainer.words.count -= 1
            return true
        } else {
            return false
        }
    }
}
while (true) {
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
const QQHDpackageName = app.getPackageName("QQ HD")


sh.setCallback({
    onNewLine: function (line) {
        //有新的一行输出时打印到控制台
        log("sh输出:" + line);
    }
})
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
    var errorSelect = [text("确定").clickable(), textStartsWith("拒绝").clickable()]
    while (true) {
        errorSelect.forEach((element) => {
            try {
                if (element.exists()) {
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
function 接口3(username, password, robotid) {
    if (测试标记) {
        log("接口3 测试中")
        return 1
    }
    while (true) {
        toastLog("接口3运行中")
        try {
            var reData = http.get(BASEURL + "/enlovo/api/FriendList?username=" + username + "&password=" + password + "&robotid=" + robotid)
            if (reData.statusCode == 200) {
                var data = reData.body.json()
                log("接口3返回内容:")
                log(data)
                if (data.message == "success") {
                    log(data.data)
                    return data.data
                } else if (data.message == "暂无数据") {
                    toastLog("接口3暂无数据,启用关键词加群") ///
                    return 1
                }
            } else {

            }
        } catch (error) {
            log(error)
            updata()
        }

    }
}
//更新群状态
function 接口4(username, password, enlovo_task_id, status, friendid, robotid, question, message, quota) {
    if (测试标记) {
        log("接口4测试中")
        return true
    }
    question = question || ""
    message = message || ""
    while (true) {
        toastLog("接口4运行中")

        try {
            let url = BASEURL + "/enlovo/api/FriendStatus"+"?username="+username+"&password="+password+"&robotid="+robotid
            let data = {
                "enlovo_task_id": enlovo_task_id,
                "status": status,
                "friendid": friendid,
                "question": question,
                "message": message,
                "quota": quota
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
function 接口5(username,password,robotid) {
    while (true) {
        toastLog("接口5运行中")
        try {
            let url = BASEURL + "/enlovo/api/getTask"+"?username="+username+"&password="+password+"&robotid="+robotid
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
//上传群信息,等待结果  post
function 接口6(number, name, total, words, tags, info, id) {
    tags = tags || "群标签为空"
    info = info || "群介绍为空"

    while (true) {
        try {
            let url = BASEURL + "/enlovo/api/FriendInfo"+"?username="+USERNAME+"&password="+PASSWORD+"&robotid="+robotinfoBak.id
            log(url)
            let data = {
                "number": number,
                "name": name,
                "total": total,
                "words": words,
                "tags": tags,
                "info": info,
                "enlovo_task_id": id,
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

function wordsInit() {
    log("拉取关键词")
    var redata = 接口5(USERNAME,PASSWORD,robotinfoBak.id)
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
            data.id = redata.id
            data.name = redata.name
            data.words = element
            data.depth = redata.depth
            data.count = wordsK * redata.depth
            // log(data)
            wordsContainer.arr.push(data)

        }

    }


    log("wordsInitOk")
    wordsContainer.words = wordsContainer.arr.pop()
    wordsContainer.getWords()
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
    for (let index = 0; index < 20; index++) {
        log("查找中")
        sleep(3000)
        // sh.exec("am start -p "+QQHDpackageName)
        let login = text("登 录").clickable().findOne(2000)
        if (login) {
            return true //这里代表启动成功
        }
    }
    //这里是备用方案,使用坐标点击
    home()
    sleep(1500)
    click("QQ HD")
    waitForActivity("com.tencent.mobileqq.activity.RegisterGuideActivity")
}

function addFriend(friendInfo) {
    var re = {
        status: true,
        question: "",
        message: "",
        statusCode: 0
    }
    let search_people = text("找人:").findOne().parent().click() //zh这里可能
    log("找人按钮" + search_people)
    let add_friend = desc("加好友").clickable().findOne(20000)
    if (add_friend) {
        log("找到加好友")
        add_friend.click()
        let yanzheng = className("android.widget.EditText").id('request_info_et').findOne().setText(friendInfo.msg)
        log("找到验证框")
        sleep(2500)
        let next = text("下一步").clickable().findOne().click()
        log("找到下一步")
        sleep(1500)
        let send = text("发送").clickable().findOne().click()
        log("找到发送")
        for (let index = 0; index < 10; index++) {
            if (sendOK) {
                log("添加成功")
                re.status = true
                re.statusCode = 2
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
        for (let index = 0; index < 45; index++) {
            let yanzheng = className("android.widget.EditText").id('verify_troop_qa_answer_edit').findOne(500)
            if (yanzheng) {
                yanzheng.setText(friendInfo.msg)
                sleep(2000)
                let send = text("发送").clickable().findOne().click()
                log("发送点击完成")
                for (let index = 0; index < 10; index++) {
                    if (sendOK) {
                        log("添加成功")
                        re.status = true
                        re.message = "成功发送请求"
                        re.statusCode = 0
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
            let guanliyuanTiwen = text("管理员需要你回答以下验证问题").findOne(500)
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
    desc("搜索").className("android.widget.EditText").findOne().click() //激活输入框
    sleep(500)
    sendOK = false
    let et_search_keyword = id("et_search_keyword").findOne().setText(friendInfo.number) ////设置信息

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
function addStartWords(robotinfo) {
    className("android.widget.FrameLayout").clickable(true).depth(12).findOne().click()
    sleep(1000)
    text("加好友").findOne().parent().child(1).click()
    //if 关键词池为空,则初始化
    currentTaskType = "words"
    if (wordsContainer.arr.lenhth == 0) {
        log('初始化关键词')
        wordsInit(robotinfo)
    }
    var re = {
        "status": true,
        "message": "状态正常"
    }
    //
    let 关键词 = wordsContainer.getWords()
    log("关键词:")
    log(关键词)

    function 进入后(robotinfo, elementView) {
        var re = {
            "status": true,
            "message": ""
        }
        if (element.bounds().height() < 100) {
            // log("该元素不在屏幕内,不使用")
            re.message = "界外"
            return re
        }
        if (robotinfo.quota <= 0) {
            re.status = true
            re.message = "当前QQ机器人quota=0"
            return re
        }
        // log("roboto")
        if (!wordsContainer.useWords()) {

            wordsContainer.getWords() //这里需要更新关键词
            re.status = true
            re.message = "关键词用完"
            return re

        }
        // log("robotook")
        let tianJiaJieguo = addOver(robotinfo) //返回到一个合适的页面
        if (!tianJiaJieguo.status) { //添加中出错//这里为被封号
            re = {
                "status": false,
                msg: tianJiaJieguo.message
            }
            return re
        }

        try {
            var descModel=false
            try {
                var 群名 = elementView.child(1).child(0).text()
            } catch (error) {
                var 群名 = elementView.child(1).desc()
                descModel=true
            }
            
            log(群名)
            try {
                var 成员数 = elementView.child(1).child(1).text()
            } catch (error) {
                var 成员数 = elementView.child(2).desc()
            }
            
            log(成员数)
            if (descModel) {
                log("desc模式")
                var 总数 = elementView.childCount()
                var 标签 = []
                if (总数 > 5) {
                    for (let index = 0; index < 总数 - 5; index++) {
                        标签.push(elementView.child(index+3).desc())
    
                    }
                }
            }else{
                var 总数 = elementView.child(1).childCount()
                var 标签 = []
                if (总数 > 2) {
                    for (let index = 0; index < 总数 - 2; index++) {
                        标签.push(elementView.child(1).child(2 + index).text())
    
                    }
                }
            }
            
            标签 = 标签.join(",")
            log(标签)
            try {
                var 介绍 = elementView.child(3).child(0).child(0).text()
            } catch (error) {
                var 介绍 = elementView.child(总数-1).child(0).desc()
            }
            
            log(介绍)
            click(elementView.bounds().centerX(), elementView.bounds().centerY())
            var 群号 = id("troop_uin").findOne().text()
            log(群号)
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
        let 群查询结果 = 接口6(群号, 群名, 成员数, 关键词, 标签, 介绍, 任务ID)


        let friendInfo = {
            "msg": 群查询结果.msg
        } //这里把群查询的问候语设置为friend 的msg ,供加群时使用


        //////
        // let 群查询结果 = {"status":0}
        if (!((群查询结果.status > 1 && 群查询结果.status < 4) || 群查询结果.diff < 86400 * 2)) {
            log("判断为需要添加")
            // if (   !(群查询结果.status >0 && 群查询结果.status < 4) || (群查询结果.diff < 86400 ) ) {
            var 添加结果 = addOrganization(friendInfo) //
            robotinfo.quota -= 1 //
            if (添加结果.status) {
                //更新群状态
                log("关键词模式调用接口4+0.1")
                log("调用传递值:群状态")
                log(添加结果.statusCode)
                接口4(USERNAME, PASSWORD, wordsContainer.words.id, 添加结果.statusCode, 群查询结果.id, robotinfo.id, 添加结果.question, 添加结果.message, 0.1)
            } else {
                log("关键词模式调用接口4-0.1")
                log("调用传递值:群状态")
                log(添加结果.statusCode)
                接口4(USERNAME, PASSWORD, wordsContainer.words.id, 添加结果.statusCode, 群查询结果.id, robotinfo.id, 添加结果.question, 添加结果.message, -0.1)
            }
            sleep(1000)
            while (!text("群资料").exists() && !text("查找结果").exists()) {
                back();
                sleep(1000)
            }

        }
        if (!text("查找结果").findOne(1500)) {
            back() //返回到查找结果页面
            sleep(1000)

            log("使用了返回")
        }

        re.status = true
        re.message = "添加完成"
        return re
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

        for (let index = 0; index < 5000; index++) {
            查找列表 = className("android.widget.ListView").findOne()
            var 子集合 = 查找列表.children()
            log("列表序号:" + index)
            var element = 子集合[index];
            // log(element)
            let 本次添加结果 = 进入后(robotinfo, element)
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
                    return addStartWords(robotinfo)
                } else if (本次添加结果.message == "界外") {
                    log("该元素在界外,不使用")
                } else {
                    log("本次添加完成") /////////////////
                }
            } else {
                log("出现添加错误") /////////////////
            }
            
                while (true) {
                    查找列表 = className("android.widget.ListView").findOne()
                    子集合 = 查找列表.children()
                    log("列表序号:" + index)
                    var element = 子集合[index];
                    // element=
                    if (element.bounds().bottom > device.height * 0.7) {
                        log("滑动")
                        // className("android.webkit.WebView").findOne().scrollDown()
                        swipe(device.width /2,device.height /3 *2 ,device.width /2,device.height /3 ,700 )
                        sleep(20)
                    }else{
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
    log(shell("pm disable " + QQHDpackageName, true))
    log(shell("pm clear " + QQHDpackageName, true))
    log(shell("pm enable " + QQHDpackageName, true))
    app.launch(QQHDpackageName)
    sleep(1000)
    if (changeIp) {
        log(shell("settings put global airplane_mode_on 1", true))
        log(shell("am broadcast -a android.intent.action.AIRPLANE_MODE --ez state true", true))
        log(shell("settings put global airplane_mode_on 0", true))
        log(shell("am broadcast -a android.intent.action.AIRPLANE_MODE --ez state false", true))
        sleep(3000)
    }

}


//添加完处理
function addOver(robotinfo) {
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
        [text("登 录").clickable(), () => {
            className("android.widget.EditText").id('password').findOne().setText(robotinfo.password)
            sleep(1000)
            text("登 录").clickable().findOne().click()
        }]

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
        }
        sleep(500)
    }
    toastLog("返回失败,不能回到正确的页面,重新开始")
    re.status = true
    re.message = "返回失败,不能回到正确的页面,重新开始"
    return re
}

function 登录完成后添加(robotinfo) {

    var re = {
        "status": true,
        "message": ""
    }
    for (let index = 0; index < parseInt(robotinfo.quota); index++) { //可以添加多次
        // for (let index = 0; index < parseInt(3); index++) {//可以添加多次

        //////////////////

        var friendInfo = 接口3(USERNAME, PASSWORD, robotinfo.id) //这里需要分别处理,分为按号加群,和按关键词加群  这里如果返回的是  1  则关键词加群
        if (friendInfo == 1) {
            return addStartWords(robotinfo) //这里直接完成所有任务
        }


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
                    接口4(USERNAME, PASSWORD, friendInfo.enlovo_task_id, addjieguo.statusCode, friendInfo.id, robotinfo.id, addjieguo.question, addjieguo.message, 0.1)
                } else {
                    log("错误信息:" + addjieguo.message)
                    接口4(USERNAME, PASSWORD, friendInfo.enlovo_task_id, addjieguo.statusCode, friendInfo.id, robotinfo.id, addjieguo.question, addjieguo.message, -0.1)
                }

                //////这里内部添加完的步骤
            } else {
                log("找不到加好友按钮:" + addFriendParent.childCount())
            }
        } else {
            log("找不到添加按钮")
        }
        // log("loginAndadd")
        let tianJiaJieguo = addOver(robotinfo) //返回到一个合适的页面
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


function main() {
    log("开始运行")
    while (true) {
        var currenttime = new Date()
        var hours = currenttime.getHours()
        if (hours < 9 && false) {
            log("时间没到")
            sleep(60000)
            continue
        }

        openANDclose()
        var robotinfo =robotinfoBak= 接口1(USERNAME, PASSWORD, "ADC7K")
        if (robotcount >= 60) {
            重启运行()
            sleep(2000)
            toastLog("60次已满,本脚本退出,新脚本已启动")
            exit()
        }
        if (start_check()) { //确认打开后进入输入账号界面
            text("登 录").clickable().findOne().click()
        }
        weigui = false
        if (!loginQQ(robotinfo.number, robotinfo.password, robotinfo.id)) {
            log("登录异常")
            接口2(USERNAME, PASSWORD, robotinfo.id, robotinfo.clientid, 3) //异常
            continue //重新开始新一轮执行
        } else {
            接口2(USERNAME, PASSWORD, robotinfo.id, robotinfo.clientid, 2) //登录成功
        }
        let tianJiaJieGuo = 登录完成后添加(robotinfo)
        if (tianJiaJieGuo.status) {
            接口2(USERNAME, PASSWORD, robotinfo.id, robotinfo.clientid, 0)
        } else {
            接口2(USERNAME, PASSWORD, robotinfo.id, robotinfo.clientid, 3) //重置当前登录QQ状态
        }

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
    // wordsInit()
    // for (let index = 0; index < 100; index++) {
    //     log(wordsContainer.getWords())
    //     if (wordsContainer.useWords()) {

    //     } else {
    //         log(wordsContainer.getWords())
    //     }

    // }
    // for (let index = 0; index < 3; index++) {
    //     // const element = array[index];
    //     var robotinfo = 接口1(USERNAME, PASSWORD, "ADC7K")
    //     sleep(10000)
    //     log(接口2(USERNAME,PASSWORD,robotinfo.id,robotinfo.clientid,0))
    // }
    // input_check()
    // log("lllll" + loginQQ("1364091814", "qpmbrs4x4s"))
    // exit()
    测试标记 = true
    // loginOKadd()
    // log(接口1(USERNAME,PASSWORD,"ADC7K"))
    // main()
    // let QQhao = desc("搜索栏、QQ号、手机号、邮箱、群、生活服务、连按两次编辑").clickable().findOne().click()
    // let search = desc("搜索").className("android.widget.EditText").findOne().click()//激活输入框
    let robotinfo = robotinfo || { "quota": 100, "id": 67, "password": "2347qweasd", "msg": "我想学习" }
    addStartWords(robotinfo)
    // main()
    // wordsInit()
    // log(wordsContainer.arr)
    // wordsInit()
    // app.getPackageName("QQ HD")
    // openANDclose()
    // sh.exec("am start -W "+QQHDpackageName+"/.LoginActivity")

    ////   1374504817
    ////   1374504817
    ////   1993171950
    ////   1993171950
}

// test()
main()