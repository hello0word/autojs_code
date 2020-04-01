var url = "https://gitee.com/jixiangxia_admin/autojs/raw/master/code/%E6%94%AF%E4%BB%98%E5%AE%9D%E8%87%AA%E5%8A%A8%E6%94%B6%E6%AC%BE/myui.js"
var res = http.get(url);
if (res.statusCode == 200) {
    toast("从网络加载成功");
    var dd = res.body.string()
    let name=url.split("/")
    name = name[name.length - 1]
    execution = engines.execScript(name, dd);
} else {
    toast("从网络加载失败:" + res.statusMessage);
}