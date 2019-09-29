var url = "https://gitee.com/api/v5/gists/2w3kl4m1gtf5ap9yj7roz63?access_token=f3668a8d0216355c020694b3e0d94d3f"
//https://gitee.com/jixiangxia_admin/codes/30bq65wlsp7yafvuzdet239/edit
var res = http.get(url);
if (res.statusCode == 200) {
    toast("从网络加载成功");
    var ss = res.body.json().files
    var dd = ss[Object.keys(ss)[0]].content
    //log(dd)
    execution = engines.execScript("QQHD", dd);
    ui.run(function () { window.action.setText('停止运行'); })

    // var eng=engines.execScript("one",dd);
    // log(eng)
} else {
    toast("从网络加载失败:" + res.statusMessage);
}