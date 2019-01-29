
var url = "https://gitee.com/jixiangxia/codes/hu2ogxdpkbwe7atifm9v681/raw?blob_name=momo"
var res = http.get(url);
if(res.statusCode == 200){
    toast("加载成功");
    var eng=engines.execScript("陌陌注册",res.body.string());
    //log(eng)
}else{
    toast("加载失败:" + res.statusMessage);
}

