
/**
 * 
 * @param { String } 注册码 
 * @param { String } P_AppCode 软件编号
 * @param { String } P_TranPwd 传输密码
 */
function 注册(注册码,P_AppCode,P_TranPwd) {
    var P_httpurl, P_AppCode, P_TranPwd, P_Machine, 注册码, 验证返回, 登录使用的随机数, 校验类型
    var print01
    var isreg
    P_Machine = device.getAndroidId() //唯一标识
    类型 = 1
    登录使用的随机数 = random(1, 999999)

    P_httpurl = "http://v1.27yz.net/HttpApi.ashx?action="
    if(!注册码){
        toastLog("退出");
        exit();
    };
    log(注册码)
    var md5 = (string) => java.math.BigInteger(1, java.security.MessageDigest.getInstance("MD5").digest(java.lang.String(string).getBytes())).toString(16);

    if (Reg(注册码, 登录使用的随机数)) {
        threads.start(效验线程)
    }else{
        toastLog('注册失败');
        exit()
    }
    
    function Reg(UserCode, 随机数) {
        var httpdata, sign, cd
        var yuanshi = UserCode + P_AppCode + P_Machine + 随机数 + P_TranPwd
        var sign = md5(yuanshi)
        var httpdata = http.post(P_httpurl + "Reg", data = { "UserCode": UserCode, "AppCode": P_AppCode, "Machine": P_Machine, "cd": 随机数, "Sign": sign })
        httpdata = httpdata.body.string()
        log(httpdata)
        分割后 = httpdata.split("|")
        if (分割后.length == 4) {
            if (分割后[0] == "1") {
                log("注册成功")
                if (md5(sign + 随机数 + 分割后[1] + 分割后[2] + P_TranPwd) == 分割后[3]) {
                    toastLog("到期时间: " + 分割后[1])
                    sleep(1000)
                    return true
                } else {
                    toastLog("系统登录效验错误")
                    sleep(1000)
                    return false
                }
            } else {
                toastLog("系统登录效验错误")
                sleep(1000)
                return false
            }
        }else{
            return false
        }
    }


    function 效验线程() {
        while (true) {
            var 获取状态返回值
            if (类型 == 1) {
                获取状态返回值 = 云状态效验(注册码, 1, 登录使用的随机数, P_AppCode, P_Machine, P_TranPwd)
            } else {
                获取状态返回值 = 云状态效验(注册码, 3, 登录使用的随机数, P_AppCode, P_Machine, P_TranPwd)
            }
            if (获取状态返回值 == 1) {
                log("脚本停止")
                exit()
            } else {
                sleep(1000 * 5)
            }
        }
    }

    function 云状态效验(注册码, 类型, 注册试用时随机数, P_AppCode, P_Machine, P_TranPwd) {
        var 云校验返回值, 分割返回值, 校验信息
        云校验返回值 = CheckStatus(注册码, 类型, 注册试用时随机数, P_AppCode, P_Machine, P_TranPwd)
        // log(云校验返回值)
        if (云校验返回值 == "2|user_error") {
            toastLog("云校验错误 用户名/注册码错误")
        } else if (云校验返回值 == "2|mac_error") {
            toastLog("云校验错误 机器码试用不存在")
        } else {
            分割返回值 = 云校验返回值.split("|")
            校验信息 = 分割返回值[1]
            if (校验信息 == "0") {
                log("软件使用正常")

            }else if(校验信息=="2"){
                log(云校验返回值)
            }else if (校验信息 == "1") {
                toastLog("软件到期")
                sleep(3000)
                exit()
            }
            else if (校验信息 == "3") {
                toastLog("其他机器已经注册此注册码")
                sleep(3000)
                exit()
            }
            else if (校验信息 == "5") {
                toastLog("此注册码已经被锁定")
                sleep(3000)
                exit()
            }
            else if (校验信息 == "6") {
                toastLog("软件停止服务")
                sleep(3000)
                exit()
            }
            else if (校验信息 == "7") {
                toastLog("机器码或IP被封停")
                sleep(3000)
                exit()
            }
        }
    }

    

   
    function CheckStatus(UserCode, Types, ucd, P_AppCode, P_Machine, P_TranPwd) { //云状态效验
        var httpdata, sign, cd
        cd = random(1, 999999)
        if (Types == 3) {
            UserCode = ""
        }
        sign = md5(UserCode + Types + P_AppCode + P_Machine + ucd + cd + P_TranPwd)
        httpdata = http.post("http://v1.27yz.net/HttpApi.ashx?action=CheckStatus", data = { "User": UserCode, "Types": Types, "AppCode": P_AppCode, "Machine": P_Machine, "ucd": ucd, "cd": cd, "Sign": sign })
        return httpdata.body.string()
    }

    
   
}


//例子
注册("SZZKTV23EEANB3LZ","19875","ael98n13qbx7vuvmhz")// 只需要调用一遍
while (true) {
    sleep(5000)
    //
}