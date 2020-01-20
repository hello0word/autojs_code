
if (context.getPackageName() == "org.autojs.autojspro") {
    engines.execScriptFile("./run.js");
} else {
    var res = http.get("https://gitee.com/jixiangxia_admin/autojs/raw/master/code/%E6%96%87%E5%AD%97%E4%BF%AE%E7%9C%9F/load.js")//功能文件
    if (res.statusCode == 200) {
        engines.execScript("load", res.body.string());
    } else {
        toastLog("网络异常")
        exit()
    }
}


