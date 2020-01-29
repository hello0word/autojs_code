

var res = http.get("http://122.51.203.83/js/zhenghe.js")//功能文件
if (res.statusCode == 200) {
    files.write("./zhenghe.js", res.body.string())
} else {
    toastLog("网络异常")
    exists()
}
var url = "http://122.51.203.83/js/main.js"//界面
var res = http.get(url);
if (res.statusCode == 200) {
    toastLog("解密成功");
    var 源码 = res.body.string()
    execution = engines.execScript("海虹阅读", 源码);
} else {
    toastLog("解密失败");
}


