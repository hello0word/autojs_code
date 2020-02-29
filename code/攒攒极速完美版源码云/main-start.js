"ui";
const appId = "01"
var isInTime = false;
var imei = getDeviceIdentity();

reAUTO()
let advancedEngines = require("./advancedEngines.js")

const ZZ_version = "1.0.82"
const TYPE = {
    KS: "kshou",
    DY: "douyin"
}

let isLogin = false;
let OutTimeTip = "攒攒登录失效(点击更新)"
let workThread = null;
let STORAGE = storages.create("攒攒自赚")
let backTag = false;

let 快手关注上限 = false
let account_manager_obj = new account_manager()

ui.statusBarColor("#FF4FB3FF")
ui.layout(
    <vertical>
        <vertical gravity="center" layout_weight="1">
            <frame>
                <View bg="#ff4fb3ff" h="54" />
                <viewpager h="128" id="pager">
                    <vertical>
                        <card w="*" h="128" margin="10 8" cardCornerRadius="6dp"
                            cardElevation="2dp" gravity="center">
                            <linear>
                                <vertical margin="10" layout_gravity="center_vertical" layout_weight="1">
                                    <text id="name" size="18" color="#444444" text="无帐号" />
                                    <text id="integral" padding="1" size="16" text="..." foreground="?selectableItemBackground" />
                                    <text id="bd_account" padding="1" size="16" text="..." foreground="?selectableItemBackground" />
                                </vertical>
                                <vertical>
                                    <button id="all_login" w="90" text="所有账号" color="#ff5d85ff" style="Widget.AppCompat.Button.Borderless.Colored" />
                                    <text id="all_login_count" marginLeft="18" padding="1" size="16" text="..." foreground="?selectableItemBackground" />
                                </vertical>
                                <button id="login" w="90" text="登录账号" color="#ff5d85ff" style="Widget.AppCompat.Button.Borderless.Colored" />
                            </linear>
                        </card>
                    </vertical>
                    <vertical>
                        <card w="*" h="68" margin="10 8" cardCornerRadius="6dp"
                            cardElevation="2dp" gravity="center">
                            <linear>
                                <vertical margin="10" layout_gravity="center_vertical" layout_weight="1">
                                    <text id="imei" textIsSelectable="true" size="18" color="#444444" text="{{imei}}" />
                                    <text id="Etime" size="16" text="..." />
                                </vertical>
                                <button id="recharge" w="70" text="绑卡" color="#ff5d85ff" style="Widget.AppCompat.Button.Borderless.Colored" />
                            </linear>
                        </card>
                    </vertical>
                </viewpager>
            </frame>
            <tabs w="40" id="tabs" tabIndicatorColor="#777777" bg="#cfcfcf" h="2" />

            <vertical padding="10 6 0 6" bg="#ffffff" w="*" h="auto" margin="0 5" elevation="1dp">
                <Switch w="*" checked="{{auto.service != null}}" textColor="#666666" text="无障碍服务" id="autoService" />
                <View h="5" />
                <Switch w="*" textColor="#666666" text="不做评论任务" id="noComment" />
            </vertical>

            <vertical margin="0 5" bg="#ffffff" elevation="1dp" padding="5 5 10 5" w="*" h="auto">
                <linear>
                    <checkbox id="DYcheck" text="抖音" layout_weight="1" />
                    {/* <text text="单次运行任务上限↓" /> */}
                    <button id="get_dy_info">查信息</button>
                    <button id="up_video">上传作品</button>

                </linear>
                {/* <linear>
                    <seekbar id="DYseekbar" max="50" layout_weight="1" />
                    <text gravity="center" id="DYlimit" />
                </linear> */}
                <View h="5" />
                <linear gravity="center">
                    <checkbox id="KScheck" text="快手" layout_weight="1" />
                    {/* <text text="单次运行任务上限↓" /> */}
                </linear>
                {/* <linear>
                    <seekbar id="KSseekbar" max="50" layout_weight="1" />
                    <text gravity="center" id="KSlimit" />
                </linear> */}
            </vertical>

            <linear>
                <text layout_weight="1" size="19" color="#222222" text="日志" />
                <button id="tolog" h="40" text="全部日志" style="Widget.AppCompat.Button.Borderless.Colored" />
            </linear>
            <text paddingLeft="5" size="16" id="oneLog" />

            <list bg="#ffffff" elevation="1dp" h="*" id="logList">
                <linear>
                    <text size="13" textColor="#555555" text="{{time}} " />
                    <text size="13" text="{{message}}" />
                </linear>
            </list>
        </vertical>
        <button id="start" text="开始运行" tag="ScriptTag" color="#ffffff" bg="#FF4FB3FF" foreground="?selectableItemBackground" />
    </vertical>
);

let LogData = []
ui.logList.setDataSource(LogData)
ui.logList.setOverScrollMode(2)

ui.pager.setTitles(["", ""]);
ui.tabs.setupWithViewPager(ui.pager);
ui.login.click((view) => {
    if (view.login.text() != "登录账号") {
        advancedEngines.execScriptFile("./ZZaccount.js", {
            mainGlobal: global
        })
        return;
    }
    if (!isInTime) {
        toast("设备无剩余时间，请充值卡密");
        return;
    }
    var dialog = new android.app.AlertDialog.Builder(activity).create()
    dialog.setView(new android.widget.EditText(context))
    dialog.show();
    dialog.setCancelable(false)
    var window = dialog.getWindow();
    window.setDimAmount(0.6);
    var vv = ui.inflate(
        <vertical>
            <text text="攒攒登录" size="19" color="#000000" padding="12 12" />
            <vertical margin="25 0 25 10">
                <linear>
                    <text gravity="center" color="#555555" size="17" text="账号 " />
                    <input textColor="#000000" inputType="number" id="username" w="*" />
                </linear>
                <linear>
                    <text gravity="center" color="#555555" size="17" text="密码 " />
                    <input textColor="#000000" id="password" w="*" />
                </linear>

            </vertical>
            <relative>
                <button id="cancle" layout_alignParentLeft="true" text="取消" style="Widget.AppCompat.Button.Borderless.Colored" w="auto" />
                <button id="login" layout_alignParentRight="true" text="登录" style="Widget.AppCompat.Button.Borderless.Colored" w="auto" />
            </relative>
        </vertical>)
    window.setContentView(vv);
    vv.cancle.click(() => {
        dialog.dismiss();
    });

    vv.login.click(() => {
        if (!vv.username.text()) {
            toast("账号不能为空!");
            return;
        }
        if (!vv.password.text()) {
            toast("密码不能为空");
            return;
        }
        threads.start(function () {
            var pL = login(vv.username.text(), vv.password.text());
            log("登录信息:")
            log(pL)
            if (!pL.data || !pL.data.token) {
                toast("登录失败!");
                return;
            }

            toastLog("登陆成功!");

            oneLog("登陆成功!");
            account_manager_obj.add(vv.username.text(), vv.password.text(), pL.data.token)
            // STORAGE.put("username", vv.username.text())
            // STORAGE.put("password", vv.password.text())
            // STORAGE.put("token", pL.data.token);
            // ui.run(function () {
            // refreshZZ();
            // });
            dialog.dismiss();
        });
    });

});
ui.all_login.click(() => {
    account_manager_obj.show_all()
})

ui.get_dy_info.click(view => {
    let info = STORAGE.get("DY_ACCOUNT_INFO", {})
    dialogs.alert("抖音账号信息", JSON.stringify(info))
})




function 获取抖音账号信息() {
    let zp = textStartsWith("作品").visibleToUser(true).className("android.widget.TextView").boundsInside(0, 0, device.width * 0.6, device.height);
    let xh = textStartsWith("喜欢").className("android.widget.TextView")//.boundsInside(0, 0, device.width * 0.6, device.height);
    let gz = text("关注").className("android.widget.TextView");
    let dyh = className("android.widget.TextView").textStartsWith("抖音号");
    let mz = className("android.widget.TextView").idStartsWith("c7s");
    log(zp.findOne(2000).text().match(/\d+/g)[0]);
    log(xh.findOne(2000).text().match(/\d+/g)[0]);
    var gz1 = gz.findOne(2000).parent().child(0).text()
    log(gz1);
    log(dyh.findOne(2000).text().match(/[^抖音号：]+.*/))
    名字 = mz.findOne().text()
    log(名字)
}
//管理账号的添加,删除,显示
function account_manager() {
    this.all_login //所有账号信息
    this.show_all = function () {
        let all = STORAGE.get("all_account", [])
        let all_new = []
        for (let index = 0; index < all.length; index++) {
            let element = all[index];
            all_new.push(element[0])
        }
        dialogs.select("所有账号信息", all_new).then(i => {
            if (i == -1) return
            dialogs.select("对该账号的操作", ["选择", "删除"]).then(e => {
                if (e == -1) {
                    return
                } else if (e == 0) {
                    log(all[i])
                    STORAGE.put("username", all[i][0])
                    STORAGE.put("password", all[i][1])
                    var pL = login(all[i][0], all[i][1]);

                    if (!pL.data || !pL.data.token) {
                        toast("登录失败!");
                        return;
                    }
                    log("登录信息:")
                    log(pL)
                    toastLog("登陆成功!");
                    STORAGE.put("token", pL.data.token)

                    isLogin = true;
                } else if (e == 1) {
                    let all_e = []
                    for (let index = 0; index < all.length; index++) {
                        let element = all[index];
                        if (element[0] != all_new[i]) {
                            all_e.push(element)
                        }
                    }
                    STORAGE.put("all_account", all_e)
                }
            })

        })
    }
    //添加账号
    this.add = function (username, password, token) {
        let all = STORAGE.get("all_account", [])
        for (let index = 0; index < all.length; index++) {
            let element = all[index];
            if(element[0]==username){
                all[index] = [username, password, token]
                STORAGE.put("all_account", all)
                return 
            }
        }
        let info = [username, password, token]
        all.push(info)
        STORAGE.put("all_account", all)
    }
    //切换账号
    this.qiehuan = function (index) {
        if (index) {
            //TODO
        }
        let current_username = STORAGE.get("username", null)
        let all = STORAGE.get("all_account", [])
        if (all.length == 0) {
            toastLog("无可用账号")
            return
        } else {
            if (!current_username) {
                STORAGE.put("username", all[0][0])
                STORAGE.put("password", all[0][1])
                STORAGE.put("token", all[0][2]);
            } else {
                for (let index = 0; index < all.length; index++) {
                    let element = all[index];
                    if (element[0] == current_username) {
                        if (index + 1 > all.length) {
                            index = 0
                        } else {
                            index += 1
                        }
                        STORAGE.put("username", all[index][0])
                        STORAGE.put("password", all[index][1])
                        STORAGE.put("token", all[index][2]);
                        return
                    }
                }
                //跑到这说明原来存在账号
                all.push([STORAGE.get("username"), STORAGE.get("password"), STORAGE.get("token")])
                STORAGE.put("all_account", all)
                account_manager_obj.qiehuan()//重新调用
            }
        }

    }
    this.检查重复=function (){
        let all = STORAGE.get("all_account", [])
        let all_new = []
        for (let index = 0; index < all.length; index++) {
            let element = all[index];
            all_new.push(element[0])
        }
    }
}

ui.autoService.setOnCheckedChangeListener(function (widget, checked) {
    if (checked && !auto.service) {
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
    }
    if (!checked && auto.service) auto.service.disableSelf()
    ui.autoService.setChecked(auto.service != null)
});


storages.create("攒攒自赚").put("DYlimit", 500)
// ui.DYseekbar.setOnSeekBarChangeListener({
//     onProgressChanged: function (v, i, fromUser) {
//         ui.run(() => {
//             ui.DYlimit.setText("" + i * 10)
//         })
//         storages.create("攒攒自赚").put("DYlimit", i * 10)
//     }
// })
storages.create("攒攒自赚").put("KSlimit", 500)
// ui.KSseekbar.setOnSeekBarChangeListener({
//     onProgressChanged: function (v, i, fromUser) {
//         ui.run(() => {
//             ui.KSlimit.setText("" + i * 10)
//         })
//         storages.create("攒攒自赚").put("KSlimit", i * 10)
//     }
// })
// ui.DYseekbar.setProgress(storages.create("攒攒自赚").get("DYlimit", 200) / 10)
// ui.KSseekbar.setProgress(storages.create("攒攒自赚").get("KSlimit", 200) / 10)
ui.emitter.on("resume", () => {
    ui.autoService.setChecked(auto.service != null)
})
ui.emitter.on("back_pressed", function (event) {
    if (workThread && workThread.isAlive()) {
        backTag = true;
        toast("为防止脚本自动退出，脚本运行时不可返回退出软件");
        event.consumed = true;
    }
})
refreshZZ()
codeSystem("攒攒自赚")

ui.tolog.click(() => {
    app.startActivity("console")
})
ui.integral.click((v) => {
    if (v.text() == OutTimeTip) {
        if (!STORAGE.get("username", null)) {
            toast("未保存账号");
            return;
        }
        if (!STORAGE.get("password", null)) {
            toast("未保存密码");
            return;
        }
        threads.start(function () {
            var pL = login(STORAGE.get("username", null), STORAGE.get("password", null));

            if (!pL.data || !pL.data.token) {
                toastLog("自动登录失败!" + pL.msg);
                return;
            }

            toast("自动登陆成功!");

            STORAGE.put("token", pL.data.token);
            ui.run(function () {
                refreshZZ();
            });
        });
    }
})
ui.start.click(() => {
    if (!isInTime) {
        toast("设备无剩余时间，请充值");
        return;
    }
    if (!isLogin) {
        toast("未登录攒攒账号");
        return
    }
    if (forceStopIfNeeded()) return

    ui.start.setText("停止运行");
    workThread = threads.start(function () {
        try {
            clearLog()
            if (!auto.service) toast("请先打开无障碍服务");
            else workMain()
        } catch (e) {
            if (!e.javaException instanceof java.lang.InterruptedException)
                console.error("运行出错:" + e.toString())
        } finally {
            ui.run(function () {
                ui.start.setText("开始运行")
            });
        }
    });
});

function refreshZZ() {
    let all = STORAGE.get("all_account", [])
    ui.all_login_count.setText("已登录:" + all.length)
    function 查询攒攒绑定抖音号() {
        var url = "http://zcore.zqzan.com/app/douyin/my/info";
        var f = http.get(url, {
            headers: {
                'Token': STORAGE.get("token"),
                'Content-Type': 'application/x-www-form-urlencoded',
                // 'user-agent': 'vivo X21i A(Android/9) (com.zanqzan.app/1.0.87) Weex/0.26.0 1080x2201',
            }
        }).body.json();
        log(f)
        log("绑定号:" + f.data.oauth_nickname)
        return f.data.oauth_nickname
    }

    var username = STORAGE.get("username", null);
    if (username) {
        // ui.login.setText("管理账号");
        ui.name.setText(username);
        isLogin = true;
        threads.start(function () {
            let ld = getUserInfo(STORAGE.get("token", null));
            let inte = "获取金豆失败，请看日志";
            if (ld.code == 0) inte = "金豆:" + ld.data.wallet;
            else if (ld.code != -1) {
                inte = ld.msg
                if (ld.code == 1006) inte = OutTimeTip
            }
            let 绑定号 = 查询攒攒绑定抖音号()
            ui.run(function () {
                if (绑定号) {
                    ui.bd_account.setText("绑定:" + 绑定号);
                }
                ui.integral.setText(inte);
            });
        });
    }
}

function forceStopIfNeeded() {
    if ((workThread && workThread.isAlive()) || ui.start.text() == "停止运行") {
        try {
            workThread.interrupt();
        } catch (e) { }
        ui.start.setText("开始运行");
        oneLog("")
        return true
    }
    return false
}

function workMain() {
    log("开始")
    try {
        if (!requestScreenCapture()) {
            Log("请求截图权限失败");
            alert("请求截图权限失败")
            return;
        }
    } catch (e) { }
    if (!ui.DYcheck.isChecked() && !ui.KScheck.isChecked()) {
        Log("未勾选任何任务")
        return
    }
    log("开始1")
    // runtime.accessibilityBridge.mWindowFilter = null

    Log("脚本开始运行")
    let LM = new LimitManager()

    let pT = new Date().getTime();
    let pL = 0;
    for (let loop = 1; true; loop++) {
        if (ui.DYcheck.isChecked()) {
            Task(TYPE.DY, LM)
        }
        if (ui.KScheck.isChecked()) {
            Task(TYPE.KS, LM)
        }

        if (LM.isLimit()) {
            Log("完成任务数达到上限，停止运行")

            break
        }
        /*
         if (new Date().getTime() - pT < 20 * 1000) {
             if (loop - pL > 3) {
                 //更改速度
                 oneLog(logDate() + " 多轮刷新无任务,休息8-12分钟")
                 tT = new Date().getTime() + random(8 * 60, 12 * 60) * 1000
                 while (new Date().getTime() < tT) {
                     click(1, 1)
                     sleep(6000)
                 }
             } else {
                 oneLog("一轮刷新无任务")
                 sleep(random(12000, 35000))
                 pT = new Date().getTime()
                 continue
             }
         } else {
             let k = random() > 0.2 ? random(9, 25) : random(20, 40)
             oneLog("一轮结束，间歇" + k + "秒")
              sleep(k* 1000)
         }
 
         pL = loop
         pT = new Date().getTime()
         */
    }
}

function Task(type, LM) {
    let tag = "快手"
    if (type == TYPE.DY) tag = "抖音"

    if (LM.isLimit(type)) return

    while (true) {
        console.warn("- - - - - - - " + LM.getCurrent(type) + "/" + LM.getMax(type) + " - - - - - - -")
        let token = STORAGE.get("token", null)
        // log(token)
        let ts = getTaskSummary(type, token)
        // if (ts.) {
            
        // }
        oneLog(JSON.stringify(ts))
        checkOutTime(ts)
        if (ts.code != 0) {
            console.error(ts.msg)
            sleep(random(2000, 4000))
            continue
        }
        if (!ts.data.is_signed) {
            oneLog(tag + "每日签到")
            if (global[tag + "签到"](token)) continue
            else return
        }

        ui.run(function () {
            ui.integral.setText("金豆:" + ts.data.wallet);
        });


        sleep(random(1000, 2000))
        let ossInfo = getShotOssInfo(token);
        checkOutTime(ossInfo)
        if (ossInfo.code != 0) {
            Log(tag + "进入任务失败:" + ossInfo.msg)
            sleep(random(15000, 19000))
            continue
        }
        ossInfo = ossInfo.data;

        oneLog(tag + "领取任务")
        let task = pullOneTask(type, token)
        checkOutTime(task)
        oneLog(JSON.stringify(task))
        if (task.code != 0) {
            Log(tag + "领取任务失败:" + task.msg)
            if (task.code == 1020) {
                Log("停止运行");
                forceStopIfNeeded();
            }
            if (task.code == 1207) {
                return
            }
            if (task.code == 1000) return //没有任务了
            sleep(random(15000, 19000))
            continue
        }

        let TaskDemand = parseDemand(task.data)
        oneLog(tag + "领取任务成功,任务要求:" + TaskDemand)
        Log("[" + tag + LM.getCurrent(type) + "/" + LM.getMax(type) + "]任务要求:" + TaskDemand)

        sleep(random(500, 1000))
        let runBack = global[tag + "任务"](task.data.aweme_id, TaskDemand)

        log("检测")
        if (runBack <= 0) {
            if (runBack == -1) giveupTask(task.data.id, type, token)
            continue
        }

        oneLog(tag + "上传截图")
        let imgurl = postCaptureToOss(ossInfo, "/sdcard/Screenshot_1.jpg")
        if (imgurl == null) {
            Log(tag + "上传截图失败")
            continue;
        }
        if (runBack > 1) {
            oneLog(tag + "上传第二张截图")
            let imgurl2 = postCaptureToOss(ossInfo, "/sdcard/Screenshot_2.jpg")
            if (imgurl2 == null) {
                Log(tag + "上传第二张截图失败")
                continue;
            }
            imgurl += ("," + imgurl2)
        }

        sleep(random(500, 2000))
        oneLog(tag + "提交任务")
        let sT = submitTask(task.data.id, imgurl, type, token)
        checkOutTime(sT)
        if (sT.code == 0) {
            oneLog(tag + "提交成功")
            Log(tag + "完成任务,获得金豆" + task.data.earning)
            LM.addFinish(type)
        }

        sleep(random(5000, 10000))
        return
    }
}

function checkOutTime(json) {
    if (json.code == 1006) {
        Log("登录失效，停止运行")
        forceStopIfNeeded()
        ui.run(function () {
            ui.integral.setText(OutTimeTip);
        });

    }
}
//-1放弃任务 0continue 1，2截图数目
function 抖音任务(workId, 任务要求) {
    if (任务要求.match("评论") && ui.noComment.isChecked()) {
        Log("已勾选不做评论任务，放弃任务");
        return 0;
    }

    app.startActivity({
        packageName: "com.ss.android.ugc.aweme",
        action: "android.intent.action.VIEW",
        data: "snssdk1128://aweme/detail/" + workId
    });

    sleep(1000)
    for (let i = 0; i < 8 && currentPackage() != "com.ss.android.ugc.aweme"; i++)
        sleep(1000)

    if (device.product == "m1metal" || currentPackage() == "com.ss.android.ugc.aweme") {
        let like = false;
        let abandon = false
        let shotTimes = 0;
        auto.setWindowFilter((info) => {
            try {
                return info.getRoot().getPackageName() == "com.ss.android.ugc.aweme"
            } catch (e) {
                return true
            }
        })
        let tag = descStartsWith("评论").classNameContains("ImageView").boundsInside(0, 0, device.width, device.height).findOne(10000)
        if (tag) {
            sleep(1000);
            if (任务要求.match("点赞")) {
                let btn = descContains("喜欢").className("android.widget.ImageView").boundsInside(0, device.height * 0.1, device.width, device.height * 0.9).findOnce()
                if (btn) {
                    if (!btn.desc().match("已选中"))
                        btn.parent().click()
                    like = true
                } else {
                    Log("未找到点赞按钮，放弃任务")
                    abandon = true
                }
            }
            if (任务要求.match("关注") && !abandon) {
                let btn = descMatches("关注").boundsInside(0, device.height * 0.1, device.width, device.height * 0.9).findOnce()
                if (btn) {
                    btn.click()
                    like = true
                } else {
                    Log("未找到关注按钮，放弃任务")
                    abandon = true
                }
            }
            sleep(random(1000, 2500))
            if (idContains("verify-bar-code").findOne(500)) {
                alert("抖音出现验证")
                forceStopIfNeeded()
            }
            if (任务要求.match("评论")) {
                tag = descStartsWith("评论").classNameContains("ImageView").boundsInside(0, 0, device.width, device.height).findOne(10000)
                if (!tag) {
                    Log("未找到评论按钮，放弃任务")
                    abandon = true;
                }
            }
            if (任务要求.match("评论") && !abandon) {
                tag.parent().click()

                //    runtime.accessibilityBridge.mWindowFilter = null
                sleep(2000)

                if (textMatches("评论并转发").findOne(1000)) {
                    back()
                    sleep(1000)
                }
                let title = textEndsWith("条评论").findOne(1000)
                let comNum = 0
                if (title) {
                    comNum = title.text().replace(" 条评论", "")
                    if (comNum.match("w")) comNum = comNum.replace("w", "") * 10000
                }
                log("当前视频有" + comNum + "条评论")

                if (comNum > 24) {
                    let comInput = text("留下你的精彩评论吧").findOne(1)
                    let comList = comInput.parent().parent().parent().find(classNameContains("RecyclerView"))
                    for (var i = 0; i < random(4, 6); i++) {
                        comList.scrollForward()
                        sleep(1000)
                    }

                    let cont = comInput.parent().parent().parent().child(2).child(0);
                    let MaxN = 0
                    let comment = ""
                    for (var i = 0; i < cont.childCount(); i++) {
                        let aCom = cont.child(i).child(0)
                        if (!aCom || aCom.find(id("title")).empty()) continue
                        let Ac = (aCom.child(2).text() || "").match("(.+) ")
                        if (!Ac) continue
                        Ac = Ac[0].replace("转发 • ", "")
                        if (Ac.replace(/\[(.*)\]/g, "").length >= MaxN) {
                            comment = Ac
                            MaxN = Ac.replace(/\[(.*)\]/g, "").length
                        }
                    }
                    if (!comment.match(/\[(.*?)\]/)) comment += 随机表情("抖音")
                    comInput.setText(comment)
                    sleep(3000)
                    comInput.click()
                    sleep(2000)
                    desc("表情").findOne(2000).parent().child(3).click()

                    sleep(1000)
                    ScreenShot(++shotTimes)
                    sleep(1000)
                    back()
                } else {
                    Log("评论太少,放弃任务")
                    abandon = true
                }
            }

            sleep(1000)
            if (idContains("verify-bar-code").findOne(500)) {
                alert("抖音出现验证")
                forceStopIfNeeded()
            }
            if (like && !abandon) ScreenShot(++shotTimes)
            sleep(random(1000, 3000))
        } else {
            abandon = true
            toast("未找到必要控件，放弃任务")
            Log("未找到必要控件，放弃任务")
        }

        // runtime.accessibilityBridge.mWindowFilter = null

        backToScript()

        switch (abandon) {
            case false:
                return shotTimes
            case true:
                return -1;
        }
    } else {
        Log("长时间未打开抖音")
        backToScript()
        return 0;
    }

}

function 快手任务(workId, 任务要求) {
    let preAbandon = false
    if (快手关注上限 && 任务要求.match("关注")) {
        Log("今日快手关注已达上限，放弃任务");
        preAbandon = true
    }
    if (任务要求.match("评论") && ui.noComment.isChecked()) {
        Log("已勾选不做评论任务，放弃任务");
        preAbandon = true
    }
    if (preAbandon) return -1

    app.startActivity({
        packageName: "com.smile.gifmaker",
        action: "android.intent.action.VIEW",
        data: "kwai://work/" + workId
    });

    for (let i = 0; i < 20 && currentPackage() != "com.smile.gifmaker"; i++)
        sleep(1000)

    if (currentPackage() == "com.smile.gifmaker") {
        let abandon = false
        var 快手线程 = threads.start(function () {
            while (true) {
                click("我知道了");
                sleep(500);
            }
            log("没有click")
        });
        sleep(5000);
        log(id("like_layout").exists())
        if (!id("like_layout").findOne(12 * 1000)) {
            Log("长时间未加载出视频,放弃任务");
            abandon = true
        }

        if (任务要求.match("点赞") && !abandon) {
            sleep(random(2000, 4500))
            if (!id("like_layout").findOne(1).selected()) {
                if (!id("like_layout").findOne(1).click()) {
                    Log("点赞失败，放弃任务")
                    abandon = true
                }
            }
            sleep(1000)
        }
        if (任务要求.match("关注") && !abandon) {
            sleep(random(2000, 4500))
            click("关注");
            sleep(2000);
            if (id("follow_text_container").findOnce()) {
                click("关注");
                sleep(1000);
            }
        }
        if (任务要求.match("评论") && !abandon) {
            sleep(random(2000, 4500))
            swipe(device.width * 0.9, device.height * 0.8, device.width * 0.9, device.height * 0.3, 700);
            while (!id("com.smile.gifmaker:id/stat_label").exists() && !desc("头像").exists()) {
                swipe(device.width * 0.9, device.height * 0.7, device.width * 0.9, device.height * 0.3, 800);
                sleep(1000);
            }
            let 评论数量 = 0;
            let 评论条数 = textEndsWith(" 评论").findOne(1);
            if (评论条数 != null) {
                评论数量 = 评论条数.text().replace(" 评论", "");
            }
            log(评论数量 + "条评论");

            if (评论数量 > 24) {
                for (let i = 0; i < random(2, 5); i++) {
                    scrollDown()
                    sleep(800);
                }
                sleep(1000);
                所有评论 = id("comment").find();
                let MaxN = 0
                let comment = ""
                for (var i = 0; i < 所有评论.length; i++) {
                    let aCom = 所有评论[i];
                    let Ac = (aCom.desc() || "").match("(.+) ")
                    if (!Ac) continue
                    Ac = Ac[0]
                    if (Ac.indexOf("@") != -1) continue
                    if (Ac.replace(/\[(.*)\]/g, "").length >= MaxN) {
                        comment = Ac
                        MaxN = Ac.replace(/\[(.*)\]/g, "").length
                    }
                }

                if (desc("说点什么...").exists()) {
                    desc("说点什么...").findOne(1).click();
                    sleep(1000);
                    if (!comment.match(/\[(.*)\]/)) comment += 随机表情("快手")
                    setText(comment);
                    sleep(1000);
                    click("发送");
                    sleep(1000);
                    while (!id("com.smile.gifmaker:id/stat_label").exists()) {
                        scrollUp()
                        //swipe(device.width * 0.9, device.height * 0.3, device.width * 0.9, device.height * 0.8, 800);
                        sleep(700);
                    }
                    let vp = id("player_operate_layout").findOnce()
                    if (!vp || vp.bounds().bottom < device.height / 3)
                        swipe(device.width * 0.9, device.height * 0.3, device.width * 0.9, device.height * 0.3 + (vp ? device.height * 0.5 - vp.bounds().bottom : device.height * 0.4), 700);
                    sleep(1000);
                } else {
                    Log("没找到评论框,放弃任务");
                    abandon = true
                }
            } else {
                Log("评论太少,放弃任务");
                abandon = true
            }
        }

        if (任务要求.match("关注") && id("follow_text_container").findOne(500)) {
            Log("检测到快手今日关注达到上限，放弃此任务，并今日不再做关注任务")
            abandon = true
            快手关注上限 = true
        }

        if (!abandon) ScreenShot(1);
        sleep(1000);
        let kk = desc("返回").findOne(5000)
        if (kk) kk.click();
        sleep(1000)

        backToScript()

        try {
            快手线程.interrupt();
        } catch (e) { }

        switch (abandon) {
            case false:
                return 1
            case true:
                return -1
        }
    } else {
        Log("长时间未打开快手")
        backToScript()
        return 0
    }
    sleep(8000)
    log("延迟8秒")
}


function 抖音签到(token) {
    log("开始签到")
    let ossInfo = getShotOssInfo(token)
    checkOutTime(ossInfo)
    if (ossInfo.code != 0) {
        return 抖音签到(token)
    }
    ossInfo = ossInfo.data;

    app.startActivity({
        packageName: "com.ss.android.ugc.aweme",
        action: "android.intent.action.VIEW",
        data: "taobao://main.aweme.sdk.com"
    });
    sleep(8000)
    log("等待进入抖音用户界面")
    waitForActivity("com.ss.android.ugc.aweme.main.MainActivity");
    log("进入抖音用户界面成功")
    var 抖音线程 = threads.start(function () {
        while (true) {
            click("我知道了");
            sleep(500);
        }
    });
    log("开始开始")
    let wv = text("我").className("TextView").boundsInside(0, device.height * 0.7, device.width, device.height).findOne(8000)
    if (!wv) {
        try {
            抖音线程.interrupt()
        } catch (e) { }
        Log("未找到签到主界面，返回")
        backToScript()
        return false
    }
    sleep(8000)
    while (!wv.clickable()) wv = wv.parent()
    wv.click()
    log("找头像")
    if (!desc("作者头像").findOne(4000)) {
        try {
            抖音线程.interrupt()
        } catch (e) { }
        Log("未找到签到主界面，返回")
        backToScript()
        return false
    }
    log("找到头像")
    sleep(random(3000, 5000))
    ScreenShot(1)
    try {
        抖音线程.interrupt()
    } catch (e) { }
    sleep(random(3000, 8000))
    backToScript()
    log("准备截图")
    oneLog("抖音上传签到截图")
    let imgurl = postCaptureToOss(ossInfo, "/sdcard/Screenshot_1.jpg")

    if (imgurl == null) {
        Log("抖音上传签到截图失败")
        return false
    }

    sleep(random(500, 1000))
    oneLog("抖音提交签到截图")
    let dS = dailySign(imgurl, TYPE.DY, token)
    checkOutTime(dS)
    if (dS.code == 0) {
        oneLog("抖音提交签到截图成功")
        Log("抖音完成签到")
        return true
    }
    Log("抖音签到失败:" + dS.msg)
    return false
}

function 快手签到(token) {
    let ossInfo = getShotOssInfo(token)
    checkOutTime(ossInfo)
    if (ossInfo.code != 0) {
        console.warn(ossInfo.msg)
        return 快手签到(token)
    }
    ossInfo = ossInfo.data;

    app.startActivity({
        packageName: "com.smile.gifmaker",
        action: "android.intent.action.VIEW",
        data: "kwai://myprofile"
    });
    sleep(1000)
    log("等待进入快手用户界面")
    waitForActivity("com.yxcorp.gifshow.profile.activity.MyProfileActivity");
    log("进入快手用户界面成功")

    var 快手线程 = threads.start(function () {
        while (true) {
            click("我知道了");
            sleep(500);
        }
    });

    if (!id("profile_settings_button").desc("编辑资料").findOne(5000)) {
        try {
            快手线程.interrupt()
        } catch (e) { }
        Log("未找到快手用户界面特征控件，返回")
        backToScript()
        return false
    }

    sleep(random(500, 1500))
    ScreenShot(1)
    try {
        快手线程.interrupt()
    } catch (e) { }
    sleep(random(500, 2000))
    backToScript()

    oneLog("快手上传签到截图")
    let imgurl = postCaptureToOss(ossInfo, "/sdcard/Screenshot_1.jpg")

    if (imgurl == null) {
        Log("快手上传签到截图失败")
        return false
    }

    sleep(random(500, 1000))
    oneLog("快手提交签到截图")
    let dS = dailySign(imgurl, TYPE.KS, token)
    checkOutTime(dS)
    if (dS.code == 0) {
        oneLog("快手提交签到截图成功")
        Log("快手完成签到")
        return true
    }
    Log("快手签到失败:" + dS.msg)
    return false
}

function parseDemand(data) {
    let type = parseInt(data.type)
    let ret = ""
    if ((type & 1) != 0) ret += " 点赞"
    if ((type & 2) != 0) ret += " 关注"
    if ((type & 4) != 0) ret += " 评论"
    return ret
}

function oneLog(obj) {
    log(obj.toString())
    ui.run(function () {
        ui.oneLog.setText(obj.toString())
    });
}

function Log(obj) {
    log(obj.toString())
    LogData.push({
        time: logDate(),
        message: obj.toString()
    })
    ui.post(function () {
        ui.logList.scrollToPosition(LogData.length - 1)
    }, 100)
}

function clearLog() {
    LogData.splice(0, LogData.length)
}

function logDate() {
    let date = new Date()
    let h = date.getHours();
    h = h < 10 ? ("0" + h) : h;
    let minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    let second = date.getSeconds();
    second = second < 10 ? ('0' + second) : second;
    return h + ':' + minute + ':' + second;
}

function backToScript() {
    backTag = false
    while (currentPackage() != context.getPackageName() && !backTag) {
        back()
        sleep(700)
    }
    if (!backTag) sleep(3000)
    sleep(700)
    while (currentPackage() != context.getPackageName() && !backTag) {
        back()
        sleep(700)
    }
}

function ScreenShot(index) {
    sleep(1500)
    log("开始截图")
    var cap_img = captureScreen();
    log("开始截图1")
    var img_path = "/sdcard/Screenshot_" + index + ".jpg"
    //saveCapture(cap_img.mBitmap, img_path);
    log("开始截图2")
    images.saveImage(cap_img, img_path);
    toastLog("成功截图")

    sleep(1000)
}

function saveCapture(bitmap, path) {
    let Bitmap = android.graphics.Bitmap
    let BitmapFactory = android.graphics.BitmapFactory
    let baos = new java.io.ByteArrayOutputStream();
    bitmap.compress(Bitmap.CompressFormat.JPEG, 100, baos);
    let isBm = new java.io.ByteArrayInputStream(baos.toByteArray()); //把压缩后的数据baos存放到ByteArrayInputStream中

    let op = new BitmapFactory.Options()
    op.inPreferredConfig = Bitmap.Config.RGB_565
    let tos = new java.io.FileOutputStream(path)
    BitmapFactory.decodeStream(isBm, null, op).compress(Bitmap.CompressFormat.JPEG, 100, tos);
}

function 随机表情(taskName) {
    switch (taskName) {
        case "抖音":
            表情集合 = ["[鼓掌]", "[666]", "[赞]", "[呲牙]", "[玫瑰]", "[可爱]", "[机智]", "[送心]", "[小鼓掌]", "[比心]", "[给力]", "[憨笑]", "[耶]", "[微笑]"];
            break;
        case "快手":
            表情集合 = ["[鼓掌]", "[666]", "[赞]", "[龇牙]", "[玫瑰]", "[坏笑]", "[偷笑]", "[挑逗]", "[笑哭]", "[愉快]", "[奸笑]", "[爱心]", "[火]", "[捂脸]"];
            break;
    }
    return 表情集合[random(0, (表情集合.length - 1))].repeat(random(1, 4));
}

function LimitManager() {
    let DYN = 1
    let KSN = 1
    this.getCurrent = function (id) {
        if (id == TYPE.DY) return DYN
        if (id == TYPE.KS) return KSN
    }
    this.getMax = function (id) {
        if (id == TYPE.DY) return storages.create("攒攒自赚").get("DYlimit", 100)
        if (id == TYPE.KS) return storages.create("攒攒自赚").get("KSlimit", 100)
    }
    this.addFinish = function (id) {
        if (id == TYPE.DY) DYN++
        if (id == TYPE.KS) KSN++
    }

    this.isLimit = function (id) {
        if (id != null) {
            if (id == TYPE.DY) return DYN > storages.create("攒攒自赚").get("DYlimit", 100)
            if (id == TYPE.KS) return KSN > storages.create("攒攒自赚").get("KSlimit", 100)
            return true
        }
        if (ui.DYcheck.isChecked()) {
            if (this.isLimit(TYPE.DY)) {
                if (ui.KScheck.isChecked()) {
                    return this.isLimit(TYPE.KS)
                } else return true
            }
            return false
        } else if (ui.KScheck.isChecked()) {
            return this.isLimit(TYPE.KS)
        }
        return true
    }
}

function getTaskSummary(type, token) {
    try {
        let url = "http://zcore.zqzan.com/app/" + type + "/" + (type == TYPE.DY ? "my" : "summary") + "/info"
        return http.get(url, {
            headers: {
                token: token,
                "User-Agent": UA()
            }
        }).body.json()
    } catch (e) {
        console.error(e)
        return {
            code: -1,
            msg: e.toString()
        }
    }
}

function dailySign(imgurl, type, token) {
    try {
        let url = "http://zcore.zqzan.com/app/" + type + "/do/sign"
        return http.post(url, {
            img_url: imgurl
        }, {
            headers: {
                token: token,
                "User-Agent": UA()
            }
        }).body.json()
    } catch (e) {
        console.error(e)
        return {
            code: -1,
            msg: e.toString()
        }
    }
}

function getShotOssInfo(token) {
    try {
        let url = "http://zcore.zqzan.com/app/oss/shot_img"
        return http.post(url, {}, {
            headers: {
                token: token,
                "User-Agent": UA()
            }
        }).body.json()
    } catch (e) {
        console.error(e)
        return {
            code: -1,
            msg: e.toString()
        }
    }
}

function pullOneTask(type, token) {
    try {
        let url = "http://zcore.zqzan.com/app/" + type + "/pull/one"
        return http.post(url, {}, {
            headers: {
                token: token,
                "User-Agent": UA()
            }
        }).body.json()
    } catch (e) {
        console.error(e)
        return {
            code: -1,
            msg: e.toString()
        }
    }
}

function postCaptureToOss(ossInfo, path) {
    try {
        let key = ossInfo.dir + "/" + ossInfo.prefix + (new Date().getTime()) + "" + random(10, 99) + ".png"
        let hpm = http.postMultipart(ossInfo.host, {
            key: key,
            policy: ossInfo.policy,
            signature: ossInfo.signature,
            OSSAccessKeyId: ossInfo.accessid,
            success_action_status: "200",
            file: open(path)
        })
        if (hpm.statusCode == 200) return ossInfo.host + "/" + key + ossInfo.format
        else return null
    } catch (e) {
        console.error(e)
        return null;
    }
}

function submitTask(id, imgurl, type, token) {
    try {
        let url = "http://zcore.zqzan.com/app/" + type + "/submit/task"
        return http.post(url, {
            doit_id: id,
            shot_img: imgurl
        }, {
            headers: {
                token: token,
                "User-Agent": UA()
            }
        }).body.json()
    } catch (e) {
        console.error(e)
        return {
            code: -1,
            msg: e.toString()
        }
    }
}

function giveupTask(id, type, token) {
    try {
        let url = "http://zcore.zqzan.com/app/" + type + "/giveup/task"
        return http.post(url, {
            doit_id: id
        }, {
            headers: {
                token: token,
                "User-Agent": UA()
            }
        }).body.json()
    } catch (e) {
        console.error(e)
        return {
            code: -1,
            msg: e.toString()
        }
    }
}

function login(username, password) {
    try {
        let url = "http://zcore.zqzan.com/app/account/login"
        let pw = MD5(password + "Uk&s23^ruk@")
        return http.post(url, {
            username: username,
            loginpw: pw
        }, {
            headers: {
                token: "",
                "User-Agent": UA()
            }
        }).body.json()
    } catch (e) {
        console.error(e)
        return {
            code: -1,
            msg: e.toString()
        }
    }
}

function refreshToken(token) {
    try {
        let url = "http://zcore.zqzan.com/app/account/check/token"
        return http.post(url, {}, {
            headers: {
                token: token,
                "User-Agent": UA()
            }
        }).body.json()
    } catch (e) {
        console.error(e)
        return {
            code: -1,
            msg: e.toString()
        }
    }
}

function getUserInfo(token) {
    try {
        let url = "http://zcore.zqzan.com/app/account/base/info"
        return http.get(url, {
            headers: {
                token: token,
                "User-Agent": UA()
            }
        }).body.json()
    } catch (e) {
        console.error(e)
        return {
            code: -1,
            msg: e.toString()
        }
    }
}

function MD5(string) {
    var res = java.math.BigInteger(1, java.security.MessageDigest.getInstance("MD5").digest(java.lang.String(string).getBytes())).toString(16);
    while (res.length < 32) res = "0" + res;
    return res;
}

function UA() {
    return device.model + "(Android/7) (com.zanqzan.app/" + ZZ_version + ") Weex/0.26.0 " + device.width + "x" + device.height
}

function reAUTO() {
    let ra;
    if (device.sdkInt < 24) {
        threads.start(function () {
            ra = new RootAutomator()
            toast("此设备安卓版本低于7.0，需要root权限")
        })
    }
    let click = global.click
    global.click = function (x, y) {
        if (typeof x == "string") {
            if (y == null) click(x)
            else click(x, y)
        } else if (device.sdkInt < 24) ra.press(x, y, 150)
        else click(x, y)
    }
    let swipe = global.swipe
    global.swipe = function (x1, y1, x2, y2, duration) {
        if (device.sdkInt < 24) ra.swipe(x1, y1, x2, y2, duration)
        else swipe(x1, y1, x2, y2, duration)
    }
    let press = global.press
    global.press = function (x, y, duration) {
        if (device.sdkInt < 24) ra.press(x, y, duration)
        else press(x, y, duration)
    }
    let longClick = global.longClick
    global.longClick = function (x, y) {
        if (typeof x == "string") {
            if (y == null) longClick(x)
            else longClick(x, y)
        } else if (device.sdkInt < 24) ra.press(x, y, 700)
        else longClick(x, y)
    }
    events.on("exit", () => {
        ra.exit()
    })
}

function codeSystem(appName) {
    let pdialog = new android.app.ProgressDialog(activity)
    pdialog.setMessage("查询设备信息中...");
    pdialog.setCancelable(false)
    pdialog.show();
    threads.start(function () {
        update(true);
        pdialog.dismiss();
        queryUpdate();
        while (true) {
            sleep(30 * 60 * 1000);
            update();
        }
    });
    ui.recharge.click(() => {
        let rT = ui.recharge.text()
        dialogs.rawInput(rT + ":请输入卡密", storages.create("攒攒自赚").get("code", "")).then((text) => {
            if (text.trim() == "" || text == null) {
                toast("未输入卡密");
                return;
            }
            let pdialog = new android.app.ProgressDialog(activity)
            pdialog.setMessage(rT + "操作中...");
            pdialog.setCancelable(false)
            pdialog.show();
            threads.start(function () {
                let baseUrl = getBaseUrl();
                let upath = (rT == "绑卡" ? "bindCode" : "unbindCode")
                let hp = http.post(baseUrl + "/" + upath, {
                    imei: imei,
                    code: text,
                    appId: appId
                }).body.json();
                toast(hp.msg);
                pdialog.dismiss();
                if (hp.code != 1) return;
                if (rT == "绑卡") {
                    storages.create(appName).put("code", text)
                    files.write("/sdcard/" + appName + ".txt", text)
                } else {
                    storages.create(appName).remove("code")
                    files.remove("/sdcard/" + appName + ".txt")
                }
                update(true)
            });
        });
    });

    function update(isShow) {
        try {
            let baseUrl = getBaseUrl();
            var hg = http.get(baseUrl + "/queryDevice?imei=" + imei + "&appId=" + appId).body.json();
            //破解
            hg.code = 1;

            if (hg.code != 1) {
                isInTime = false;
                let msg = hg.msg
                toast(msg)
                ui.run(function () {
                    ui.recharge.setText("绑卡")
                    ui.Etime.setText(msg);
                })
                ui.post(() => {
                    ui.pager.setCurrentItem(1)
                }, 800)
                return;
            }
            //hg.data.endTime = 9955845885;
            isInTime = true;
            let info = formatDate(new Date(9999999999993)) + "到期"
            ui.run(function () {
                if (isShow) toast(info)
                ui.recharge.setText("解绑")
                ui.Etime.setText(info);
            });

        } catch (e) {
            console.error(e);
            toast("网络异常");
        }
    }

    function queryUpdate() {
        let baseUrl = getBaseUrl();
        var url = baseUrl + "/queryUpdate?projectId=" + context.getPackageName() + "&versionCode=" + context.getApplicationInfo().versionCode;
        try {
            var data = http.get(url).body.json()
            if (data.code != 1) return;
            data = data.data;

            let builder = new android.app.AlertDialog.Builder(activity)
            builder.setTitle("发现新版本" + data.version);
            builder.setMessage(data.updateInfo);
            builder.setPositiveButton("去下载", {
                onClick: function () {
                    app.openUrl(data.fileUrl)
                }
            });
            builder.setNeutralButton("取消", null);
            ui.run(function () {
                builder.create().show();
            })
        } catch (e) { }
    }

    function getBaseUrl() {
        return "http://47.96.140.100/codeSystem"
    }

    function formatDate(date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ("0" + h) : h;
        var minute = date.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        var second = date.getSeconds();
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
    };
}

function getDeviceIdentity() {
    let id = null;
    if (device.sdkInt >= 29) {
        let mac = device.getMacAddress()
        if (mac == null || mac == "" || mac == "00:00:00:00:00:00") return null
        return "M-" + xx(mac.replace(/:/, ""))
    }
    try {
        id = android.os.Build.getSerial();
    } catch (e) {
        if (e.javaException instanceof java.lang.SecurityException)
            return null;
    }
    if (id && id.toLowerCase() != "unknown") {
        id = xx(id)
    } else if (device.serial && device.serial.toLowerCase() != "unknown") {
        id = xx(device.serial)
    } else {
        let iii = null;
        let tm = context.getSystemService("phone");
        if (!tm) return null;
        try {
            iii = tm.getImei(0);
        } catch (e) {
            if (e.javaException instanceof java.lang.SecurityException)
                return null;
        }
        if (iii == null || iii == "000000000000000") {
            iii = device.getIMEI();
        }
        if (iii != null) id = "I-" + xx(iii);
        else return null
    }
    return id;

    function xx(str) {
        var mod = "0123456789ABCDEFGHIGKLMNOPQRSTUVWXYZabcdefghigklmnopqrstuvwxyz"
        var arr = str.split("");
        for (var i in arr) arr[i] = mod[(mod.indexOf(arr[i]) + 10) % mod.length]
        return arr.reverse().join("")
    }
}