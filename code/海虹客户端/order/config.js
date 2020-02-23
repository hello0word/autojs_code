items = {
    "今日头条":[1,"tt.txt"],
    "搜狐号":[2,"sh.txt"],
    "美国号":[3,"am.txt"],
    "微信号":[4,"vx.txt"],
    "支付宝":[6,"zfb.txt"],
    "快手":[5,"ks.txt"],
    "资料":[7,"ziliao.txt"],
}

user = {
    "卡密类型":0,
    "卡密数量":1,
    "账号":"yeniu",
    "联系方式":"123456789@qq.com",
}

reguser = {   
    "账号":"",
    "密码":"12121212",
    "qq":"123456789",
}

template = {
    "说明":{},
    "订单":user,
    "注册":reguser
}

file = {
    path:"/sdcard/",
    file:"order.txt",
}
files.ensureDir(file.path)

op = []

for(var i in items){
    items[i][1] = file.path+items[i][1]
    template["说明"][i] = items[i][0]
    op.push( i )
    if(!files.isFile(items[i][1])) files.write(items[i][1],"")
}

if(!files.isFile(file.path+file.file)) files.write(file.path+file.file,JSON.stringify(template,null,"\t\t"))

template["options"] = op
template["options"].push("退出程序")

module.exports = {file:file,template:template,items:items}