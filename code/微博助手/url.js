function 网络加载() {
    var url = "https://gitee.com/api/v5/gists/7cfqzy0w6ksgp14o2tr9x53?access_token=e7c2845a0fbebd2be9fc7ee82a39392f"
    var res = http.get(url);
    if(res.statusCode == 200){
        toast("解密成功");
        var ss=res.body.json().files
        var dd=ss[Object.keys(ss)[0]].content
        var eng=engines.execScript("ui",dd);
    }else{
        toast("解密失败:" + res.statusMessage);
        exit()
}
}

网络加载()