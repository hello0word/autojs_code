

var storage = storages.create("支付宝工具")
var 已经使用过的账号 = []
console.show()
console.setPosition(100,300)
var G_当前余额 = 0

var window = floaty.window(
    <frame>
        <horizontal>
            <button id="识别余额" text={"当前余额:" + G_当前余额} w="auto" h="40" bg="#77ffffff" />
        </horizontal>

    </frame>
);

window.setPosition(device.width / 3 * 2, 200)
function main() {
    threads.start(function () {
        // let 悬浮窗 = 获取悬浮窗引擎()
        // log("悬浮窗引擎" + 悬浮窗)
        while (true) {

            try {
                let 当前余额 = parseInt(获取余额())
                if (Number.isSafeInteger(当前余额)) {
                    G_当前余额 = 当前余额
                    ui.run(() => {
                        window.识别余额.setText("当前余额:" + G_当前余额)
                    })
                }
            } catch (error) {

            }



            sleep(100)
        }
    })
    while (true) {
        进入聊天页面()
        if (判断是否成功收款()) {
            发起收款()
        }
        let 本次休眠 = random(parseInt(storage.get("延时下限", 5)), parseInt(storage.get("延时上限", 20)))
        log("本次休眠:%d秒",本次休眠)
        sleep(本次休眠* 1000)
        切换账号()
    }

}
function 判断是否成功收款() {
    let msg_list = id("chat_msg_list").findOne()
    let last_msg = msg_list.child(msg_list.childCount() - 1)
    let weizhi = last_msg.findOne(id("chat_msg_avatar_cover"))
    if (weizhi) {
        weizhi = weizhi.bounds().centerX()
        if (weizhi > device.width / 2) {
            log("最后一条为自己的消息")
            return false
        } else {
            return true
        }
    } else {
        return true
    }

}


function 进入聊天页面() {
    id("social_bottom_tab").findOne().click()//朋友按钮
    sleep(2000)
    let recent_list = id("recent_list").findOne()// 所有聊天列表
    recent_list.child(3).click()//置顶第一个
    sleep(2000)
}

function 发起收款() {

    id("chat_stage_control_btn").findOne().click()
    sleep(1000)
    let 收款文字 = text("收款").id("appname_tv").findOne()
    收款文字.parent().parent().click()

    let 收款金额 = 获取收款金额()
    log("收款金额:" + 收款金额)
    if (G_当前余额 < 收款金额) {
        toastLog("余额不足,停止")
        exit()
    }
    let 金额输入框 = text("免服务费").className("android.widget.EditText").findOne()
    金额输入框.setText(收款金额)
    let 选填框 = text("选填").className("android.widget.EditText").findOne()
    let 选填信息
    let arg = random(0, 11)
    if (arg == 10) {
        选填信息 = "龙"
    } else if (arg == 11) {
        选填信息 = "虎"
    } else {
        选填信息 = arg
    }

    选填框.setText(选填信息)
    sleep(1000)
    text("确认收款").clickable().findOne().click()


}

function 获取余额() {
    // log("开始识别余额")
    let 消息列表 = id("chat_msg_list").packageName("com.eg.android.AlipayGphone").findOne()
    let 消息列表个数 = 消息列表.childCount()
    for (let index = 消息列表个数 - 1; index >= 0; index--) {
        let element = 消息列表.child(index);
        let 头像 = element.findOne(id("chat_msg_avatar_cover"))
        if (头像) {
            let x = 头像.bounds().centerX()
            if (x < device.width / 2) {// 对方发的
                //这条是自己发的
                let 发送文本 = element.findOne(id("chat_msg_text"))
                if (发送文本) {
                    let 文本 = 发送文本.text()
                    if (文本.indexOf("余额") != -1) {
                        let 初始位置 = 文本.indexOf("余额")
                        let 余额 = 文本.substr(初始位置 + 2, 文本.length - 初始位置 - 2)
                        // log("本次识别余额:"+余额)
                        return 余额
                    } else {
                        // log(4)
                    }
                } else {
                    // log(3)
                }
            } else {
                // log(2)
            }
        } else {
            // log(1)
        }
    }


}

function 获取收款金额() {
    let dow = storage.get("数额下限", 1)
    let up = storage.get("数额上限", 10)
    log("下:" + dow)
    log("上:" + up)
    let my_ran = random(Number(dow), Number(up))
    log("收款金额随机数:" + my_ran)
    if (my_ran >= 100) {
        return parseInt(my_ran / 100) * 100
    } else if (my_ran >= 10) {
        return parseInt(my_ran / 10) * 10
    } else {
        return parseInt(my_ran)
    } 
}



function 切换账号() {
    let thread = threads.start(function () {
        while (true) {
            if (currentActivity() != 'com.eg.android.AlipayGphone.AlipayLogin') {
                back()
                sleep(2000)
            }
        }

    })
    if (id("tab_description").text("我的").findOne().parent().click()) {
        log("我的")
        thread.interrupt()
    }
    id("right_container_2").desc("设置").findOne().click()
    log("设置")
    sleep(1000)
    text("换账号登录").findOne().parent().parent().parent().parent().click()
    sleep(1000)
    let 列表 = className("android.widget.ListView").id("security_userListView").findOne()
    let 自己 = 列表.child(0)
    let num = 自己.findOne(className("TextView"))
    if (num) {
        log("当前登录:"+num.text())
        已经使用过的账号.push(num.text())//把当前账号存入已使用的账号
    }
    if (已经使用过的账号.length >= 列表.childCount() - 1) {
        log("清空已使用账号")
        已经使用过的账号 = []//当都使用过一遍后,清空已使用的账号
    }
    log("已使用列表:")
    log(已经使用过的账号)
    for (let index = 1; index < 列表.childCount() - 1; index++) {
        let element = 列表.child(index)
        if (!element ) {
            log("错误信息如下:")
            log("列表总数:" + 列表.childCount() +"---index: "+ index)
            exit()
        }
        let num = element.findOne(className("TextView"))
        if (num) {
            log("本次查找的号码:"+num.text())
            if (已经使用过的账号.indexOf(num.text()) == -1) {
                //该账号可以作为下一个
                log("该账号可以作为下一个")
                element.click()
                sleep(3000)
                return true 
            }
        }

    }

}

function test() {
    let msg_list = id("chat_msg_list").findOne()
    let last_msg = msg_list.child(msg_list.childCount() - 1)
    let weizhi = last_msg.findOne(id("chat_msg_avatar_cover"))
    if (weizhi) {
        weizhi = weizhi.bounds().centerX()
        if(weizhi > device.width /2 ){
            log("自己的消息")
            return false
        }else{
            return true
        }
    } else {
        return true
    }
}

setInterval(()=>{
    try {
        http.get("http://qxy521.xyz/dsfaflhljdhgahflgjhfjghsfdgwodlh.html", {}, () => {
            if (err) {
            }
        })
    } catch (error) {

    }
},5 * 60 * 1000)


main()
// log(test())