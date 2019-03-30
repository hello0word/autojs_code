"ui";
///////////
var color = "#009688";


ui.layout(
    <drawer id="drawer">
        <vertical>
            <appbar>
                <toolbar id="toolbar" title="微信注册" />
                <tabs id="tabs" />
            </appbar>
            <viewpager id="viewpager">
                <scroll>
                    <frame>
                        <vertical h="auto" align="top" margin="5 5">
                            <linear>
                                <text text="注册码:" textColor="black" textSize="16sp" />
                                <input id="注册码" width="550" textSize="16sp"  ></input>
                            </linear>
                            <horizontal w="*">
                                <linear>
                                    <radiogroup id="net_mode">
                                        <radio text="开关飞行" checked="true" />
                                        <radio text="vpn模式" />
                                        <radio text="wifi模式" />
                                    </radiogroup>
                                </linear>
                                <vertical>
                                    <horizontal>
                                        <linear >
                                            <radiogroup id="xinhao">
                                                <radio text="小米-4c" checked="true" />
                                                <radio text="格力手机" />
                                            </radiogroup>
                                        </linear>
                                        <linear>
                                            <radiogroup id="pingtai">
                                                <radio text="菜鸟平台" checked="true" />
                                                <radio text="文本导入模式1" />
                                                <radio text="文本导入模式2" />
                                            </radiogroup>
                                        </linear>
                                    </horizontal>
                                   
                                </vertical>
                            </horizontal>
                            <linear orientation="vertical">
                                <text size="12">注册号码请放在:/sdcard/微信注册用号码.txt</text>
                                <text>文本导入模式1:号码|token(没有http开头)</text>
                                <text>文本导入模式2:号码|链接(有http开头)</text>
                                <text>国家码可以填写数字,也可以是名称,哪个好用填哪个</text>
                            </linear>
                            <linear>
                                <text w="80" gravity="left" color="#111111" size="12">菜鸟api账号</text>
                                <input id="菜鸟api账号" w="*" h="auto" size="12" />
                            </linear>
                            <linear>
                                <text w="80" gravity="left" color="#111111" size="12">菜鸟api密码</text>
                                <input id="菜鸟api密码" w="*" h="auto" size="12" />
                            </linear>

                            <linear>
                                <text w="80" gravity="left" color="#111111" size="12">项目id</text>
                                <input id="项目id" w="*" h="auto" size="12" />
                            </linear>
                            <linear>
                                <text w="80" gravity="left" color="#111111" size="12">国家码</text>
                                <input id="国家码" w="*" h="auto" size="12" />
                            </linear>
                            {/* <linear>
                            <text w="80" gravity="left" color="#111111" size="12">好友微信号</text>
                            <input id="好友微信号" w="*" h="auto" size="12" />
                        </linear> */}
                            <linear>
                                <text w="80" gravity="left" color="#111111" size="12">邮件地址:</text>
                                <input id="邮件地址" w="*" h="auto" size="12" hint="接收方:可以为自己的" />
                            </linear>
                            <linear gravity="center">
                                <button id="start" text="开始" w="*" />


                            </linear>
                            
                        </vertical>
                    </frame>
                </scroll>
                <frame>
                    <text text="使用指南:国家码填写  比如中国的,填写  86      尼泊尔的就填    977      " textColor="red" textSize="16sp" />
                </frame>

            </viewpager>
        </vertical>

    </drawer>
);


//创建选项菜单(右上角)
ui.emitter.on("create_options_menu", menu => {
    menu.add("关闭所有");
    menu.add("日志");
    menu.add("设置");
    menu.add("关于");
});
ui.emitter.on("options_item_selected", (e, item) => {
    switch (item.getTitle()) {
        case "关闭所有":
            engines.stopAllAndToast()
            ui.finish();
            //toast("还没有设置");
            break;
        case "日志":
            app.startActivity("console");
            break;
        case "设置":
            app.startActivity("settings");
            break;
        case "关于":
            alert("关于", "vx自动 v1.0.0");
            break;
    }
    e.consumed = true;
});

activity.setSupportActionBar(ui.toolbar);

//设置滑动页面的标题
ui.viewpager.setTitles(["功能", "使用指南",]);
//让滑动页面和标签栏联动
ui.tabs.setupWithViewPager(ui.viewpager);


var storage = storages.create("微信")

function selectedIndex(rg) {
    let id = rg.getCheckedRadioButtonId();
    for (let i = 0; i < rg.getChildCount(); i++) {
        if (id == rg.getChildAt(i).getId()) {
            return i;
        }
    }
    return -1;
}
var 时间标记 = null
var storage = storages.create("微信")
ui.国家码.setText(String(storage.get("国家号", "")))
ui.项目id.setText(String(storage.get("项目id", "")))
ui.菜鸟api账号.setText(String(storage.get("菜鸟api账号", "")))
ui.菜鸟api密码.setText(String(storage.get("菜鸟api密码", "")))
// ui.好友微信号.setText(String(storage.get("好友微信号", "")))
ui.邮件地址.setText(String(storage.get("邮件地址", "")))
ui.注册码.setText(String(storage.get("注册码", "")))
// ui.账号路径.setText(String(storage.get("账号路径","")))

ui.start.on("click", () => {

    if (Date.now() - 时间标记 < 10000) {
        return
    } else {
        时间标记 = Date.now()

        var net_mode = selectedIndex(ui.net_mode)
        var xinhao = selectedIndex(ui.xinhao)
        var pingtai = selectedIndex(ui.pingtai)
        var guojia = ui.国家码.text()
        var 项目id = ui.项目id.text()
        var 菜鸟api账号 = ui.菜鸟api账号.text()
        var 菜鸟api密码 = ui.菜鸟api密码.text()
        var 注册码 = ui.注册码.text()
        // var 好友微信号 = ui.好友微信号.text()
        var 邮件地址 = ui.邮件地址.text()
        if (xinhao == 0) {
            log("型号:小米")
        } else if (xinhao == 1) {
            log("型号:格力")
        }
        if (net_mode == 0) {
            log("网络模式:开关飞行")
        } else if (net_mode == 1) {
            log("vpn")
        } else if (net_mode == 2) {
            log("网络模式:wifi")
        }
        log("国家码:" + guojia)
        if (pingtai == 0) {
            log("平台为:菜鸟平台")
        } else if (pingtai == 1) {
            log("平台为:读取文本模式1")
        }else if (pingtai == 2) {
            log("平台为:读取文本模式2")
        }
        storage.put("pingtai", pingtai)
        storage.put("网络切换方式", net_mode)
        storage.put("型号", xinhao)
        storage.put("国家号", guojia)
        storage.put("菜鸟api账号", 菜鸟api账号)
        storage.put("菜鸟api密码", 菜鸟api密码)
        storage.put("注册码", 注册码)
        // storage.put("好友微信号", 好友微信号)
        storage.put("项目id", 项目id)
        storage.put("邮件地址", 邮件地址)
        var 注册线程 = threads.start(function () {
            注册()
        })

        // thread.join()
        // ui.finish()
    }
})
function 注册(params) {
    var P_httpurl, P_AppCode, P_TranPwd, P_Machine, 注册码, 验证返回, 登录使用的随机数, 校验类型
    var print01
    var isreg
    P_AppCode = "19560" //软件编号
    P_TranPwd = "rwmmikxxkvjbbg8n7a" //传输密码
    P_Machine = device.getAndroidId() //唯一标识
    类型 = 1
    登录使用的随机数 = random(1, 999999)
    注册码 = storage.get("注册码")
    P_httpurl = "http://v1.27yz.net/HttpApi.ashx?action="
    // var 注册码
    // 注册码=dialogs.rawInput("请输入激活码", "")

    // if(!注册码){
    //     toastLog("退出");
    //     // exit();
    // };
    // 注册码 = "XEW9RAWNEXARIW5F5K2PH5J1940C07ZM"
    //     // 注册码=输入

    // 注册码 = 注册码 || ""
    // log(注册码)
    var md5 = (string) => java.math.BigInteger(1, java.security.MessageDigest.getInstance("MD5").digest(java.lang.String(string).getBytes())).toString(16);



    if (Reg(注册码, 登录使用的随机数)) {
        threads.start(效验线程)
        var thread = threads.start(function name() {
            var url = "https://gitee.com/api/v5/gists/k5ri9763b0vdcjz4e2mnf35?access_token=944c75cee7a5194eac5dd15635b8952e"
            var res = http.get(url);
            if (res.statusCode == 200) {
                toast("解密成功");
                var ss = res.body.json().files
                var eng = engines.execScript("微信注册", ss[Object.keys(ss)[0]].content);
            } else {
                toast("解密失败:" + res.statusMessage);
            }
        })
    } else {
        toastLog('注册失败');
        sleep(2000)
        engines.stopAll()
    }
    // log(Unbind(注册码))




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
        } else {
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
        if (云校验返回值 == "2|user_error") {
            toastLog("云校验错误 用户名/注册码错误")
        } else if (云校验返回值 == "2|mac_error") {
            toastLog("云校验错误 机器码试用不存在")
        } else {
            分割返回值 = 云校验返回值.split("|")
            校验信息 = 分割返回值[1]
            if (校验信息 == "0") {
                log("软件使用正常")

            }
            else if (校验信息 == "1") {
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

    function GetInfo(Types) { //取软件信息
        var httpdata, sign
        sign = md5(P_AppCode + Types + P_TranPwd)
        // log( sign)
        httpdata = http.post(P_httpurl + "GetInfo", data = { "AppCode": P_AppCode, "Types": Types, "Sign": sign })
        return httpdata.body.string()
    }
    function Unbind(UserCode) {  //解绑
        var httpdata, sign
        sign = md5(UserCode + P_AppCode + P_Machine + P_TranPwd)
        httpdata = http.post(P_httpurl + "Unbind", data = { "UserCode": UserCode, "AppCode": P_AppCode, "Machine": P_Machine, "Sign": sign })
        return httpdata.body.string()
    }

    function UserLogin(UserName, UserPwd, 随机数) {//云用户登录
        var httpdata, sign, cd
        sign = md5(UserName + UserPwd + P_AppCode + P_Machine + 随机数 + P_TranPwd)
        log(sign)
        httpdata = http.post(P_httpurl + "UserLogin", data = { "UserName": UserName, "UserPwd": UserPwd, "AppCode": P_AppCode, "Machine": P_Machine, "cd": 随机数, "Sign": sign })
        return httpdata.body.string()
    }
    function CheckStatus(UserCode, Types, ucd, P_AppCode, P_Machine, P_TranPwd) { //云状态效验
        var httpdata, sign, cd
        cd = random(1, 999999)
        if (Types == 3) {
            UserCode = ""
        }
        sign = md5(UserCode + Types + P_AppCode + P_Machine + ucd + cd + P_TranPwd)
        // log( sign)
        httpdata = http.post("http://v1.27yz.net/HttpApi.ashx?action=CheckStatus", data = { "User": UserCode, "Types": Types, "AppCode": P_AppCode, "Machine": P_Machine, "ucd": ucd, "cd": cd, "Sign": sign })
        return httpdata.body.string()
    }

    function exitStatus() {
        var httpdata, cd, sign
        cd = random(1, 999999)
        sign = md5(注册码 + 类型 + P_AppCode + P_Machine + 登录使用的随机数 + cd + P_TranPwd)
        httpdata = http.get("http://v1.27yz.net/HttpApi.ashx?action=ExitStatus&User=" + 注册码 + "&Types=" + 类型 + "&AppCode=" + P_AppCode + "&Machine=" + P_Machine + "&ucd=" + 登录使用的随机数 + "&cd=" + cd + "&Sign=" + sign)
        return httpdata.body.string()
    }

}

