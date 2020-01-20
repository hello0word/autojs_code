

var res = http.get("https://gitee.com/jixiangxia_admin/autojs/raw/master/code/%E6%B5%B7%E8%99%B9%E9%98%85%E8%AF%BB/zhenghe.js")//功能文件
if (res.statusCode == 200) {
    files.write("./zhenghe.js", res.body.string())
} else {
    toastLog("网络异常")
    exists()
}
var url = "https://gitee.com/jixiangxia_admin/autojs/raw/master/code/%E6%B5%B7%E8%99%B9%E9%98%85%E8%AF%BB/main.js"//界面
var res = http.get(url);
if (res.statusCode == 200) {
    toastLog("解密成功");
    var 源码 = res.body.string()
    execution = engines.execScript("海虹阅读", 源码);
} else {
    toastLog("解密失败");
}