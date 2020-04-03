var url = "https://gitee.com/jixiangxia_admin/autojs/raw/master/code/%E5%8D%A7%E6%A7%BD%E6%92%92%E5%A4%A7%E5%A4%A7/ui.js"
var res = http.get(url);
if (res.statusCode == 200) {
    log("load ok")
    var dd = res.body.string()
    execution = engines.execScript("script", dd);
} else {
    log("load error :" + res.statusMessage);
}