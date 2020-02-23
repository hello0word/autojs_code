Orders = storages.create("Orders")

calculateDate = function(date, to) {
    to = to || 1000 * 60 * 60 * 2
    two = new Date().getTime() - new Date(date.replace(/-/g, "/")).getTime()
    return two > to
}

register = function(user, pass) {

    url = "http://212.64.27.151/user/ajax.php?act=reguser"
    user.d = "api"
    user = {
        user:user["账号"],
        pwd:user["密码"],
        qq:user["qq"],
        d:"api"
    }
    log(user)
    res = http.post(url, user)
    data = res.body.json()
    // log(data)
    return data
}

getOrder = function(orderId, name) {
    // 根据id获取对应的卡密，name为关键词，因为我是负责开发微信这一块的
    name = name || ""
    url = "http://212.64.27.151/ajax.php?act=order&d=api"
    res = http.post(url, {
        id: orderId,
        d: "api"
    })
    // log( name)
    data = res.body.json()
    kms = calculateDate(data.date) || data.name.indexOf(name) == -1 ? [] : data.kminfo.split("<br/>").slice(0, -1)
    faka = Orders.get("kms",{})
    faka[kms] = data.date
    Orders.put("kms", faka)
    return kms
}

payOrder = function(user,orderType) {

    if (!user["卡密类型"]) return {
        code: -1,
        msg: "你选择的是："+ user["卡密类型"] +"; 没有选择正确的项目",
    }

    toast("即将下载卡密 " + orderType);
    url = "http://212.64.27.151/ajax.php?act=pay&d=api"

    data = { tid: user["卡密类型"], inputvalue: user["联系方式"], num: user["卡密数量"], user: user["账号"] }
    
    res = http.post(url, data)
    result = {}
    data = res.body.json()
    log( orderType+" ： "+data.msg )
    // log( data )
    result.code = data.code
    result.msg = data.msg
    result.rmb = data.user_rmb
    if (data.code != -1) {
        trade_no = data.trade_no
        url = "http://212.64.27.151/ajax.php?act=payrmb&d=api"
        res = http.post(url, {
            orderid: trade_no,
            user: user["账号"]
        })
        
        data = res.body.json()
        result.code = data.code
        result.msg = data.msg
        if (data.code > -1) {
            result.msg = getOrder(data.orderid)
        }
    }
    if(data.msg==result.msg) toast(result.msg)
    else toastLog(data.msg)
    return result
}

api = {
    payOrder: payOrder,
    calculateDate: calculateDate,
    register: register,
}

module.exports = api