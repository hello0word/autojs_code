"ui";
ui.statusBarColor("#FF4FB3FF")
ui.layout(
    <vertical bg="#ffffff"> 
       <vertical>
          <text text="日志" h="0"/>
          <button id="exit" text="退出账号"/>
          <text size="14" text="{{'可以提现，查看任务完成情况...不可做任务\n不要在下面退出登录，否则会导致脚本无法正常工作↓'}}"/>       
       </vertical>
       <webview h="0" id="web0"/>
       <webview layout_weight="1" id="web"/>   
    </vertical>,null);

importPackage(android.webkit);
ui.exit.click(function(){
    STORAGE=mainGlobal.STORAGE
    ui=mainGlobal.ui
    STORAGE.remove("username");
    STORAGE.remove("token")
    ui.login.setText("登录账号");
    ui.name.setText("无账号");
    ui.integral.setText("...");
    mainGlobal.isLogin=false
    
    mainGlobal.forceStopIfNeeded()
    exit();
});

ui.emitter.on("back_pressed", function(event) {
    if (ui.web && (ui.web.getUrl() != "http://app.zqzan.com/pages/main/main" && ui.web.getUrl() != "http://app.zqzan.com/pages/login/login")) {
        ui.web.goBack(); 
        event.consumed = true
    }
})

let to = storages.create("攒攒自赚").get("token", null);
let js = "<html>自动登录...<script>window.addEventListener('storage',function(e){if(e.key=='Token'&&e.newValue!=null)console.log('<Token>'+e.newValue);});window.localStorage.Token='" + to + "';console.log('Token set successfully')</script></html>";

var webCC = new JavaAdapter(WebChromeClient, {
    onConsoleMessage: function(consoleMessage) {
        let message=consoleMessage.message()
        if(message==null)return
        if(message=="Token set successfully"){
            ui.web.loadUrl("http://app.zqzan.com/pages/main/main")
        }
        if(message.indexOf("<Token>")==0){
            storages.create("攒攒自赚").put("token",message.replace("<Token>",""));
            console.info("web自动更新token")
            mainGlobal.refreshZZ()
        }
    }
})
ui.web0.setWebChromeClient(webCC);
ui.web0.loadDataWithBaseURL("http://app.zqzan.com", js, "text/html", "utf-8", null)

ui.web.setOverScrollMode(2)