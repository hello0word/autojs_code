

var url = "https://gitee.com/api/v5/gists/m14b6kqwujh07nefz2ld950?access_token=76e75f6fc6886c4a7d369d8dafaa57a9"
var res = http.get(url);
if(res.statusCode == 200){
    toast("从网络加载成功");
    var ss=res.body.json().files
    var dd=ss[Object.keys(ss)[0]].content
    // log(ss)
    var eng=engines.execScript("ui",dd);
    // log(eng)
}else{
    toast("从网络加载失败:" + res.statusMessage);
}

