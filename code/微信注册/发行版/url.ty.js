

var url = "https://gitee.com/api/v5/gists/ug32j0xkeacfwlr9vtmi167?access_token=944c75cee7a5194eac5dd15635b8952e"
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

