// import { isContext } from "vm";

// var ee = text("完成下载（领取200积分）").findOne()
// // 
// var sh = new Shell(true)
// for (let index = 0; index < 1000; index++) {
//     log(sh.exec("settings put secure enabled_accessibility_services "+ context.getPackageName()+"/org.autojs.autojs.accessibility.AccessibilityService"))
//     auto.waitFor()
    
//     toastLog("123")
//     log(sh.exec("settings put secure enabled_accessibility_services null"))
    
    
// }

// sh.exit()

// log(auto.service)
events.observeToast();
events.onToast(function(toast){
    var pkg = toast.getPackageName();
    log("Toast内容: " + toast.getText() +
        " 来自: " + getAppName(pkg) +
        " 包名: " + pkg);
});
// log("ttu")
toast("监听中，请在日志中查看记录的Toast及其内容");
let guanzhu = text("关注").findOne(3000)

if (guanzhu) {
    let par = guanzhu.parent().parent()
    if (par.clickable()) {
        log("点一下关注")
        par.click()
        if (text("24小时关注人数达到上限").findOne(2000)) {
            log("24小时关注人数达到上限")
            exit()
        }
    } else {
        log("关注按钮不能点击")
    }
}
setTimeout(()=>{},2000)
