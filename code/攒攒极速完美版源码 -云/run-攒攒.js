

//拉取websocket.js
log("拉取runtime")
var base = 'https://gitee.com/jixiangxia_admin/autojs/raw/master/code/%E6%94%92%E6%94%92%E6%9E%81%E9%80%9F%E5%AE%8C%E7%BE%8E%E7%89%88%E6%BA%90%E7%A0%81%20-%E4%BA%91/'
var urls = [
    "授权界面.js",
    "advancedEngines.js",
    "main.js",
    "ZZaccount.js",
    "test1.js",
    "linshi.js",
]
for (let index = 0; index < urls.length; index++) {
    var file_name = urls[index];
    try {
        var res = http.get(base + file_name)
        if (res.statusCode == 200) {
            files.write(file_name, res.body.string())
            log("写入完成:" + file_name)
        } else {
            log("网络错误")
        }
    } catch (error) {
        log(error)
    }
}


if (files.exists("main.js")) {
    engines.execScriptFile("main.js")
}
if (files.exists("websocket.js")) {
    engines.execScriptFile("websocket.js")
}
if (files.exists("test1.js")) {
    engines.execScriptFile("test1.js")
}