
console.show()

var G_当前余额
//获取悬浮窗引擎
function 获取悬浮窗引擎(){
    var array = engines.all()
    for (let index = 0; index < array.length; index++) {
        var element = array[index];
        if (String(element).indexOf("main.js") != -1) {
            return element
        }
    } 
}

var 已记录订单号列表=[]
function main() {

    threads.start(function(){
        let 悬浮窗 = 获取悬浮窗引擎()
        log("悬浮窗引擎" + 悬浮窗)
        while(true){
            if (currentActivity() =="com.alipay.mobile.chatapp.ui.PersonalChatMsgActivity_") {
                G_当前余额 = parseInt(获取余额())
                if (悬浮窗) {
                    悬浮窗.emit("余额", G_当前余额)
                }
            }
            sleep(10)
        }
    })
    while (true) {
        log("当前余额:" + G_当前余额)
        toastLog("查找订单号")
        let str = 查找订单号等数据(G_当前余额)
        if (str == "该订单已记录") {
            toastLog("该订单已记录")
            sleep(5000)
            continue
        }
        sleep(1000)
        back()
        toastLog("查找输入框")
        let 输入框 = packageName("com.eg.android.AlipayGphone").className("android.widget.EditText").id("chat_msg_edit").findOne()
        输入框.setText(str)
    }
}


function loop_serch(){
    while(true){
        if (descMatches(/^2020\d+/).findOne(1)) {
            log("desc模式,请升级ZFB")
            exit()
            return descMatches(/^2020\d+/).findOne(1).desc()
        } else if (textMatches(/^2020\d+/).findOne(1)){
            let 订单号锚点 = textMatches(/^2020\d+/).findOne(1)
            let 订单号 = 订单号锚点.text()
            log("订单号:" + 订单号)
            let 订单号后5位 = 订单号.substr(订单号.length - 5, 5)
            log("订单号后5位:" + 订单号后5位)
            let 收款理由锚点 = text("收款理由").findOne()
            let 收款理由 = 收款理由锚点.parent().child(收款理由锚点.indexInParent() + 1).child(0).text()
            log("收款理由:" + 收款理由)

            let 收款金额 = 收款理由锚点.parent().child(1).text()
            收款金额 = 收款金额.substr(1, 收款金额.length - 4)
            log("收款金额:" + 收款金额)

            return {
                订单号: 订单号,
                订单号后5位: 订单号后5位,
                收款理由: 收款理由,
                收款金额: 收款金额,
            }
        }
    }
}


function 查找订单号等数据() {
    let 账单详情 = text("账单详情").packageName("com.eg.android.AlipayGphone").findOne()
    log("账单详情")
    // let 订单号 = desc("订单号").findOne(6 *1000)
    // if (订单号) {
    //     toastLog("desc订单号")
    // }else if(text("订单号").exists()){
    //     toastLog("text订单号")
    // }
    // log(订单号.indexInParent())
    // let 序号 = 订单号.indexInParent()
    // let 订单号内容 = 订单号.parent().child(序号 + 1).child(0).text()
    // let 订单号内容 = 订单号.parent().child(序号 + 1).desc()
    let 订单详情 = loop_serch()
    if ( 已记录订单号列表.indexOf(订单详情.订单号) != -1) {
        return "该订单已记录"
    }
    已记录订单号列表.push(订单详情.订单号)
    // log(订单详情)
    
    let last_5_arr = 订单详情.订单号后5位.split("")
    // log(last_5_arr)
    let 龙虎合标记 = ""
    if (last_5_arr[0] > last_5_arr[4]) {
        龙虎合标记 = "虎"
    } else if (last_5_arr[0] < last_5_arr[4]) {
        龙虎合标记 = "龙"
    } else {
        龙虎合标记 = "合"
    }
    //解析余额
    function 次数查找(str, serch_str) {
        var index = str.indexOf(serch_str); // 字符出现的位置
        var num = 0; // 这个字符出现的次数
        while (index !== -1) {
            num++; // 每出现一次 次数加一
            index = str.indexOf(serch_str, index + serch_str.length); // 从字符串出现的位置的下一位置开始继续查找
        }
        return num
    }
    let 出现次数= 次数查找(订单详情.订单号后5位, 订单详情.收款理由)
    let 倍数 =  -1
    if (订单详情.收款理由.length == 1) {
        //处理龙虎合
        if (订单详情.收款理由 == "龙" || 订单详情.收款理由 == "虎" || 订单详情.收款理由 == "合") {
            if (龙虎合标记 == 订单详情.收款理由) {
                倍数 = 1
            }
        }
        if (出现次数 == 1) {
            倍数 =  1
        } else if (出现次数 == 2 ){
            倍数 =  2
        } else if (出现次数 == 3) {
            倍数 =  4
        } else if (出现次数 == 4) {
            倍数 =  9
        } else if (出现次数 == 5) {
            倍数 =  15
        }
        
    } else if (订单详情.收款理由.length == 2 ) {
        if (出现次数 != -1) {
            倍数 =  3
        }
    } else if (订单详情.收款理由.length == 3){
        if (出现次数 != -1) {
            倍数 =  19
        }
    } else if (订单详情.收款理由.length == 4) {
        if (出现次数 != -1) {
            倍数 =  49
        }
    } 
    
    log("倍数 = "+ 倍数)
    余额 = parseInt(G_当前余额) + parseInt(订单详情.收款金额) * 倍数
    let 最终字符串 = 订单详情.订单号后5位 + 龙虎合标记 + "-----余额" + 余额
    log(最终字符串)
    return 最终字符串


}


function 获取余额() {
    // log("开始识别余额")
    let 消息列表 =  id("chat_msg_list").findOne()
    let 消息列表个数 =  消息列表.childCount()
    for (let index = 消息列表个数 - 1 ; index >=0 ; index--) {
        let element = 消息列表.child(index);
        let 头像 = element.findOne(id("chat_msg_avatar_cover"))
        if (头像) {
            let x= 头像.bounds().centerX()
            if (x > device.width /2) {
                //这条是自己发的
                let 发送文本 = element.findOne(id("chat_msg_text"))
                if( 发送文本){
                    let 文本 = 发送文本.text()
                    if (文本.indexOf("----余额") != -1) {
                        let 初始位置  = 文本.indexOf("余额")
                        let 余额 = 文本.substr(初始位置+2,文本.length - 初始位置 - 2)
                        // log("本次识别余额:"+余额)
                        return 余额
                    }else{
                        // log(4)
                    }
                }else{
                    // log(3)
                }
            }else{
                // log(2)
            }
        }else{
            // log(1)
        }
    }


}


function test(){
    var array = engines.all()
    for (let index = 0; index < array.length; index++) {
        var element = array[index];
        if (String(element).indexOf("main.js")) {
            return element
        }
    } 
     
}

main()
// log(test().emit("余额",100))