var url = "https://gitee.com/jixiangxia_admin/autojs/raw/master/code/%E6%8A%96%E9%9F%B3%E4%B8%8A%E4%BC%A0/main.js"//
var res = http.get(url);
if (res.statusCode == 200) {
    toastLog("解密成功");
    var 源码 = res.body.string()
    execution = engines.execScript("抖音上传", 源码);
} else {
    toastLog("解密失败");
}