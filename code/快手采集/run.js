var url = "https://gitee.com/api/v5/gists/e6bfqhxcmu1np47jzt9oa20?access_token=e7c2845a0fbebd2be9fc7ee82a39392f"
var res = http.get(url);
if (res.statusCode == 200) {
    toastLog("解密成功");
    var ss = res.body.json().files
    var 源码 = ss[Object.keys(ss)[0]].content

    
    // 源码= res.body.string()
    execution = engines.execScript("快手采集", 源码);
    

    
} else {
    toastLog("从网络加载失败:" + res.statusMessage);
}