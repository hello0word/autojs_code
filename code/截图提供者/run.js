var file_name=   "https://gitee.com/jixiangxia_admin/autojs/raw/master/code/%E6%88%AA%E5%9B%BE%E6%8F%90%E4%BE%9B%E8%80%85/main.js"

try {
    var res = http.get(file_name )
    if (res.statusCode==200) {
        var YM = res.body.string()
        engines.execScript("main",YM)
    } 
} catch (error) {
    
}