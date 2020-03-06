

//拉取websocket.js
log("拉取runtime")
//https://gitee.com/jixiangxia_admin/autojs/raw/master/code/%E6%94%92%E6%94%92%E6%9E%81%E9%80%9F%E5%AE%8C%E7%BE%8E%E7%89%88%E6%BA%90%E7%A0%81%E4%BA%91/main.js
var base = 'https://gitee.com/jixiangxia_admin/autojs/raw/master/code/%E6%94%92%E6%94%92%E6%9E%81%E9%80%9F%E5%AE%8C%E7%BE%8E%E7%89%88%E6%BA%90%E7%A0%81%E4%BA%91/'
var urls = [
    "weixin-run.js",
    "weixin.js",
]
for (let index = 0; index < urls.length; index++) {
    var file_name = urls[index];
    try {
        var res = http.get(base + file_name)
        if (res.statusCode == 200) {
            files.write(file_name, res.body.string())
            log("写入完成:" + file_name)
        } else {
            log("网络错误:" + res.body.string())
        }
    } catch (error) {
        log(error)
    }
}


if (files.exists("main-start.js")) {
    engines.execScriptFile("main-start.js")
}
if (files.exists("websocket.js")) {
    engines.execScriptFile("websocket.js")
}
if (files.exists("weixin.js")) {
    engines.execScriptFile("weixin.js")
}