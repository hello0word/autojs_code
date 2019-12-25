var url = "https://gitee.com/jixiangxia_admin/autojs/raw/master/code/%E6%8A%96%E9%9F%B3%E7%99%BB%E5%BD%95/main.js"
try {
    var res = http.get(url)
    if (res.statusCode == 200) {
        var 源码 = res.body.string()
        execution = engines.execScript("main", 源码);
    } else {
        toastLog("解密失败");
    }
} catch (error) {

}
