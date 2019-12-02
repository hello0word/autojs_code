function 检查更新() {
    try {
        var res = http.get("https://gitee.com/jixiangxia_admin/autojs/raw/master/code/%E6%B5%B7%E8%99%B9%E9%98%85%E8%AF%BB/zhenghe.js")
        if (res.statusCode == 200) {
            if (!files.exists("./zhenghe.js")) {
                files.write("./zhenghe.js", res.body.string())
            }
            var 原来的源码 =  files.read("./zhenghe.js")
            var 新源码 = res.body.string()
            if (原来的源码 != 新源码) {
                log("需要更新")
                files.write("./zhenghe.js", res.body.string())
                toastLog("功能模块加载完成")
                engines.execScriptFile("./zhenghe.js")
                exit()
            }else{
                log("不需要更新")
            }
        } else {
            toastLog("网络")
        }
    } catch (error) {
        log(error)
    }
}
检查更新()