auto();
var 计数对象={
    本次计数:0,
    错误计数:0,
    本次已完成计数:0,
}
主线程()
function 主线程(){
    
    threads.start(jianting)
    while(true){
        sleep(1000)
    }

}
function listen(){
    events.observeToast();
    events.onToast(function(toast){
        var pkg = toast.getPackageName();
        log("Toast内容: " + toast.getText() +
            " 来自: " + getAppName(pkg) +
            " 包名: " + pkg);
            计数对象.错误计数 +=1;
            
    });
}