
auto.waitFor()
console.show()
function main() {
    var storage=storages.create("quanwudi")
    // alert("提示","按音量上键停止脚本")
    var config_all=storage.get("juli")
    
    if (!config_all) {
        toastLog("距离为空,退出")
        exit()
    }else{
        log("输入值:"+config_all)
    }
    config_all=Number(config_all)
    var quancheng=id("tvAllDistance")//全程公里
    var jieji=id("tvDistance")//接驾公里
    var qiang=id("ivSnatch")//抢按钮
    var close=id("rlClose")//关闭按钮
    // var a =0
    while (true) {
        // log(a++)
        var quancheng_obj=quancheng.findOne().text()
        var quangcheng_num=quancheng_obj.substr(0,quancheng_obj.length-2)
        // var quangcheng_num=quancheng_obj;
        // quangcheng_num=Number(quangcheng_num);
        
        if (Number(quangcheng_num)>=config_all) {
            
            log(qiang.findOne().click())
            log("公里数:"+quangcheng_num)
            log("可抢")

            // press(quancheng_obj.bounds().centerX(),quancheng_obj.bounds().centerY(),50)
        }else{
            // var quancheng_obj=
            log(close.findOne().click())
            log("公里数:"+quangcheng_num)
            log("不可抢")

            // press(quancheng_obj.bounds().centerX(),quancheng_obj.bounds().centerY(),50)

        }
        
    }
    


}
main()
// log(Number("7.5")>Number("15"))
