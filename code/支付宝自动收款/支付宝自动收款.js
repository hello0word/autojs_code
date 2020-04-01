

var storage = storages.create("支付宝工具")
var 已经使用过的账号 = []
console.show()
console.setPosition(100,300)
function main() {
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
    log(收款金额)
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

function 获取收款金额() {
    let dow = storage.get("数额下限", 1)
    let up = storage.get("数额上限", 10)
    log("下:" + dow)
    log("上:" + up)
    let my_ran = random(Number(dow), Number(up))
    log("随机数:" + my_ran)
    if (my_ran >= 100) {
        return parseInt(my_ran / 100) * 100
    } else {
        return parseInt(my_ran / 10) * 10
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



main()
// log(test())