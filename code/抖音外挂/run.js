var url = "https://gitee.com/api/v5/gists/0m8qfa9gsh7z2u64jte3l76?access_token=e7c2845a0fbebd2be9fc7ee82a39392f"
//https://gitee.com/jixiangxia_admin/codes/30bq65wlsp7yafvuzdet239/edit
// var url="http://qzs.ronsir.cn/autojs/main.js"
// log(url)
var res = http.get(url);
if (res.statusCode == 200) {
    toastLog("解密成功");
    var ss = res.body.json().files
    var 源码 = ss[Object.keys(ss)[0]].content

    // log(dd)
    // 源码= res.body.string()
    execution = engines.execScript("抖音外挂", 源码);
    

    // var eng=engines.execScript("one",dd);
    // log(eng)
} else {
    toastLog("从网络加载失败:" + res.statusMessage);
}