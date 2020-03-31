



function main() {
    while (true) {
        toastLog("查找订单号")
        let str = 查找订单号()
        back()
        toastLog("查找输入框")
        let 输入框 = packageName("com.eg.android.AlipayGphone").className("android.widget.EditText").id("chat_msg_edit").findOne()
        输入框.setText(str)
    }
}

function 查找订单号() {

    let 账单详情 = text("账单详情").packageName("com.eg.android.AlipayGphone").findOne()
    let 订单号 = text("订单号").findOne()

    log(订单号.indexInParent())
    let 序号 = 订单号.indexInParent()
    let 订单号内容 = 订单号.parent().child(序号 + 1).child(0).text()
    log(订单号内容)
    let last_5 = 订单号内容.substr(订单号内容.length - 5, 5)
    log(last_5)
    let last_5_arr = last_5.split("")
    log(last_5_arr)
    let 龙虎合标记 = ""
    if (last_5_arr[0] > last_5_arr[4]) {
        龙虎合标记 = "虎"
    } else if (last_5_arr[0] < last_5_arr[4]) {
        龙虎合标记 = "龙"
    } else {
        龙虎合标记 = "合"
    }
    let 最终字符串 = last_5 + 龙虎合标记 + "----"
    log(最终字符串)
    return 最终字符串


}


function test() {
    
}


main()
// test()