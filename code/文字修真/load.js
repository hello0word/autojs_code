/**
 * 加载需要资源,然后启动主脚本
 */

var url = "https://gitee.com/jixiangxia_admin/autojs/raw/master/code/%E6%96%87%E5%AD%97%E4%BF%AE%E7%9C%9F/run.js"//界面
var res = http.get(url);
if (res.statusCode == 200) {
    var 源码 = res.body.string()
    execution = engines.execScript("run", 源码);
} else {
    toastLog("解密失败");
}