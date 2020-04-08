
console.show()
var storage = storages.create("ZFBTOOL")

Array.prototype.distinct = function () {
    var arr = this,
        result = [],
        i,
        j,
        len = arr.length;
    for (i = 0; i < len; i++) {
        for (j = i + 1; j < len; j++) {
            if (arr[i] === arr[j]) {
                j = ++i;
            }
        }
        result.push(arr[i]);
    }
    return result;
}
var G_当前余额 = 0
var G_当前用户 = ""
//获取悬浮窗引擎
function 获取悬浮窗引擎() {
    var array = engines.all()
    for (let index = 0; index < array.length; index++) {
        var element = array[index];
        if (String(element).indexOf("main.js") != -1) {
            return element
        }
    }
}

var window = floaty.window(
    <frame>
        <horizontal>
            <vertical>
                <button id="当前用户" text={"当前用户:" + "----"} w="auto" h="40" bg="#EE00ff" />

                <button id="识别余额" text={"当前余额:" + G_当前余额} w="auto" h="40" bg="#ffffff" />
                <button id="加余额" text={"加余额"} w="auto" h="40" bg="#00ffff" />
                <button id="减余额" text={"减余额"} w="auto" h="40" bg="#ff00ff" />
                <button id="所有信息" text={"所有信息"} w="auto" h="40" bg="#ffff00" />
                <button id="清空数据" text={"清空数据"} w="auto" h="40" bg="#00ffff" />

            </vertical>
        </horizontal>

    </frame>
);



window.setPosition(device.width / 3 * 2, 200)

window.加余额.setOnTouchListener(function (view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            windowX = window.getX();
            windowY = window.getY();
            downTime = new Date().getTime();
            return true;
        case event.ACTION_MOVE:
            //移动手指时调整悬浮窗位置
            window.setPosition(windowX + (event.getRawX() - x),
                windowY + (event.getRawY() - y));
            return true;
        case event.ACTION_UP:
            //手指弹起时如果偏移很小则判断为点击
            if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                加余额();
            }
            return true;
    }
    return true;
});

window.减余额.setOnTouchListener(function (view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            windowX = window.getX();
            windowY = window.getY();
            downTime = new Date().getTime();
            return true;
        case event.ACTION_MOVE:
            //移动手指时调整悬浮窗位置
            window.setPosition(windowX + (event.getRawX() - x),
                windowY + (event.getRawY() - y));

            return true;
        case event.ACTION_UP:
            //手指弹起时如果偏移很小则判断为点击
            if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                减余额();
            }
            return true;
    }
    return true;
});


window.所有信息.setOnTouchListener(function (view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            windowX = window.getX();
            windowY = window.getY();
            downTime = new Date().getTime();
            return true;
        case event.ACTION_MOVE:
            //移动手指时调整悬浮窗位置
            window.setPosition(windowX + (event.getRawX() - x),
                windowY + (event.getRawY() - y));
            return true;
        case event.ACTION_UP:
            //手指弹起时如果偏移很小则判断为点击
            if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                所有信息();
            }
            return true;
    }
    return true;
});
window.清空数据.setOnTouchListener(function (view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            windowX = window.getX();
            windowY = window.getY();
            downTime = new Date().getTime();
            return true;
        case event.ACTION_MOVE:
            //移动手指时调整悬浮窗位置
            window.setPosition(windowX + (event.getRawX() - x),
                windowY + (event.getRawY() - y));
            return true;
        case event.ACTION_UP:
            //手指弹起时如果偏移很小则判断为点击
            if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                清空数据();
            }
            return true;
    }
    return true;
});

function 详情(内容) {
    let 当前时间 = new Date()
    this.创建时间 = "" + 当前时间.getFullYear() + "-" + (当前时间.getMonth() + 1) + "-" + 当前时间.getDate() + "  " + 当前时间.getHours() + ":" + 当前时间.getMinutes() + ":" + 当前时间.getSeconds()// 使用时间戳
    this.内容 = 内容
}

function 用户(用户名) {
    this.用户名 = 用户名
    this.累计盈亏 = 0//
    this.详情数据 = []//详情数组
}
function 全部数据管理器() {
    this.所有数据 = storage.get("所有信息", [])
    this.清空数据 = function () {
        storage.put("所有信息", [])
    }
    this.加余额 = function (值) {
        this.所有数据 = storage.get("所有信息", [])
        let index = this.查找指定用户(G_当前用户)
        let 本次详情 = new 详情("增加:" + 值)
        this.所有数据[index].详情数据.push(本次详情)
        this.所有数据[index].累计盈亏 += Number(值)
        storage.put("所有信息", this.所有数据)
    }
    this.减余额 = function (值) {
        this.所有数据 = storage.get("所有信息", [])

        let index = this.查找指定用户(G_当前用户)
        let 本次详情 = new 详情("减少:" + 值)
        this.所有数据[index].详情数据.push(本次详情)
        this.所有数据[index].累计盈亏 -= Number(值)
        storage.put("所有信息", this.所有数据)
    }
    this.查找指定用户 = function (用户名) {
        this.所有数据 = storage.get("所有信息", [])
        log(this.所有数据 instanceof Array)
        for (let index = 0; index < this.所有数据.length; index++) {
            let element = this.所有数据[index];
            if (element.用户名 == 用户名) {
                return index
            }
        }
        let ret = this.所有数据.push(new 用户(用户名)) - 1
        storage.put("所有信息", this.所有数据)
        return ret

    }
    this.显示所有信息 = function () {
        this.所有数据 = storage.get("所有信息", [])

        return JSON.stringify(this.所有数据)

    }
}


function 发送() {
    id("sendBtn").text("发送").findOne().click()
}
var 全部数据 = new 全部数据管理器()
function 加余额() {
    log(arguments.callee.name)
    dialogs.input("请输入增加的值", "", (value) => {
        if (value != -1) {
            threads.start(function () {
                全部数据.加余额(parseInt(value))
                let str = "余额" + (G_当前余额 + parseInt(value))
                let 输入框 = packageName("com.eg.android.AlipayGphone").className("android.widget.EditText").id("chat_msg_edit").findOne()
                输入框.setText(str)
                发送()
            })
        } else {
            toast("取消")
        }

    });

}


function 减余额() {
    log(arguments.callee.name)
    dialogs.input("请输入减少的值", "", (value) => {
        if (value != -1) {
            threads.start(function () {
                log("ssss" + value)
                全部数据.减余额(parseInt(value))
                let str = "余额" + (G_当前余额 - parseInt(value))
                let 输入框 = packageName("com.eg.android.AlipayGphone").className("android.widget.EditText").id("chat_msg_edit").findOne()
                输入框.setText(str)
                发送()
            })
        } else {
            toast("取消")
        }
    }
    );
}

function 所有信息() {
    log(arguments.callee.name)
    let str = 全部数据.显示所有信息()
    let 输入框 = packageName("com.eg.android.AlipayGphone").className("android.widget.EditText").id("chat_msg_edit").findOne()
    输入框.setText(str)
}

function 清空数据() {
    log(arguments.callee.name)
    let value = dialogs.confirm("确定清空?")
    if (value) {
        全部数据.清空数据()
    }
}

var 已记录订单号列表 = []
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
                        window.当前用户.setText("当前用户:" + G_当前用户)
                    })
                }
            } catch (error) {

            }



            sleep(100)
        }
    })
    while (true) {
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


function loop_serch() {
    while (true) {
        if (descMatches(/^2020\d+/).findOne(1)) {
            log("desc模式,请升级ZFB")
            exit()
            return descMatches(/^2020\d+/).findOne(1).desc()
        } else if (textMatches(/^2020\d+/).findOne(1)) {
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
            收款金额 = 收款金额.replace(",", "")
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
    if (已记录订单号列表.indexOf(订单详情.订单号) != -1) {
        return "该订单已记录"
    }
    if (parseInt(订单详情.收款金额) > G_当前余额) {
        return "超额无效，请补充余额"
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
        if (serch_str.length == 1) {
            var index = str.indexOf(serch_str); // 字符出现的位置
            var num = 0; // 这个字符出现的次数
            while (index !== -1) {
                num++; // 每出现一次 次数加一
                index = str.indexOf(serch_str, index + serch_str.length); // 从字符串出现的位置的下一位置开始继续查找
            }
            return num
        } else {
            var 待查找的字符数组 = serch_str.split("")
            let 计数器 = 0
            for (let index = 0; index < 待查找的字符数组.length; index++) {
                let element = 待查找的字符数组[index];
                if (str.indexOf(element) != -1) {
                    计数器 += 1
                }
            }
            if (计数器 == 待查找的字符数组.length) {
                return true
            } else {
                return false
            }
        }





    }

    //排除掉重复的字符串
    let 筛选数组 = 订单详情.收款理由.split("")
    if (筛选数组.distinct().length < 订单详情.收款理由.length) {
        log("有重复的")
        return "无效数据"
    }


    let 出现次数 = 次数查找(订单详情.订单号后5位, 订单详情.收款理由)
    log("出现次数:" + 出现次数)
    let 倍数 = -1
    if (订单详情.收款理由.length == 1) {
        //处理龙虎合
        if (订单详情.收款理由 == "龙" || 订单详情.收款理由 == "虎" || 订单详情.收款理由 == "合") {
            if (龙虎合标记 == 订单详情.收款理由) {
                倍数 = 1
            }
        }
        if (出现次数 == 1) {
            倍数 = 1
        } else if (出现次数 == 2) {
            倍数 = 2
        } else if (出现次数 == 3) {
            倍数 = 4
        } else if (出现次数 == 4) {
            倍数 = 9
        } else if (出现次数 == 5) {
            倍数 = 15
        }

    } else if (订单详情.收款理由.length == 2) {
        if (出现次数) {
            倍数 = 3
        }
    } else if (订单详情.收款理由.length == 3) {
        if (出现次数) {
            倍数 = 19
        }
    } else if (订单详情.收款理由.length == 4) {
        if (出现次数) {
            倍数 = 49
        }
    }

    log("倍数 = " + 倍数)
    余额 = parseInt(G_当前余额) + parseInt(订单详情.收款金额) * 倍数
    log("余额：" + 余额)
    let 最终字符串 = 订单详情.订单号后5位 + 龙虎合标记 + "-----余额" + 余额
    log(最终字符串)
    return 最终字符串


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
            if (x > device.width / 2) {
                //这条是自己发的
                let 发送文本 = element.findOne(id("chat_msg_text"))
                if (发送文本) {
                    let 文本 = 发送文本.text()
                    if (文本.indexOf("余额") != -1) {
                        let 初始位置 = 文本.indexOf("余额")
                        let 余额 = 文本.substr(初始位置 + 2, 文本.length - 初始位置 - 2)
                        if (id("title_text").exists()) {

                            G_当前用户 = id("title_text").findOne().text()
                        }
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

//返回[3,4,2,1]
function test() {
    log(dialogs.confirm("?"))
}

main()
// log(test())