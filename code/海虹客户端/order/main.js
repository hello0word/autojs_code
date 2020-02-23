Orders = require("apiweb")
Counst = require("config")
Storage = require("storage")
UiAction = require("ui")

function menu() {

    var options = Counst.template.options
   // Exit()
    dialogs.select("卡密类型", options).then(i => {
    var options = Counst.template.options
        if (i < 0) {
            toast("取消");
        } else if(i+1==options.length) {
            toast("退出");
            exit();
        } else {
            order_type = options[i]
            //  toastLog("即将下载卡密 " + order_type + Counst.items[order_type][0]);
            Counst.template["订单"]["卡密类型"] = Counst.items[order_type][0];
            ui_run(Orders.payOrder, Counst.template["订单"], order_type, function(res) {
                // log(res)
                msg = res.msg[0]
                if (!msg || res.code < 0 || msg.length<1) {
                    if (!msg) toastLog("订单异常："+JSON.stringify(res))
                    return -1
                }
                let path = Counst.items[order_type][1] ;
                new Storage(path).write(msg)
                
                log("卡密：" + msg);
                return 0
            })
        }
    });
}

function ui_run(call, params, raw, callback) {
    threads.start(function() {
        // toastLog(params)
        res = call(params, raw);
        callback(res)
        //log(res)
    })
}

UiAction(menu)

inter = setInterval(() => {

}, 1000);

timeout = null;

function Exit() {
    if (timeout != null) clearTimeout(timeout)
    timeout = setTimeout(() => {
        clearInterval(inter);
        toastLog("退出程序")
        exit()
    }, 5 * 60 * 1000)
}
Exit()