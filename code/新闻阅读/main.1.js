"ui";


var App列表 = "趣看天下|闪电盒子"
var storage = storages.create("阅读")
var 激活码 = storage.get("激活码","")
var 运行次数 = storage.get("运行次数","30")
ui.layout(
    <scroll>
        <vertical>
            <text size="16" >新用户有三次试用机会,每次试用时间6小时,试用时,请不要填写注册码</text>
            <text size="16" >请手动开启悬浮窗权限,后台弹出界面权限,否则无法弹出激活码输入框</text>
            <horizontal>
                <text size="16">APP:</text>
                <spinner id="APP" entries="{{App列表}}"  w="*"/>
            </horizontal>
           
            <horizontal w="*">
                <text size="16" >运行次数:</text>
                <input id="运行次数" text="{{运行次数}}" w="*"></input>
            </horizontal>
            <horizontal w="*">
                <text size="16" >注册码:</text>
                <text id="激活码" text="{{激活码}}" w="*"></text>
            </horizontal>
            <vertical>
            <button id="开始" style="Widget.AppCompat.Button.Colored" text="开始" />
            <button id="日志" style="Widget.AppCompat.Button.Colored" text="日志" />
            <button id="修改注册码" style="Widget.AppCompat.Button.Colored" text="修改注册码" />
            </vertical>
            
        </vertical>
    </scroll>
)
ui.APP.setSelection(storage.get("功能",0), false)
ui.开始.on("click", () => {
    threads.start(function heeh(params) {
        var 运行次数 = ui.运行次数.text();
        var 功能 = ui.APP.getSelectedItemPosition()
        // var 注册码=ui.激活码.text()
        log("gn:"+功能)
        storage.put("功能",功能)
        storage.put("运行次数",运行次数)
        var thread = threads.start(function name() {
            
            var eng = engines.execScriptFile("./主体.js");
            
        })
        thread.join()
    })
})
ui.日志.on("click",()=>{
    app.startActivity("console");
})
ui.修改注册码.on("click",()=>{
    rawInput("请输入注册码", "").then(name => {
        storage.put("激活码",name)
        if (name!="kqweqiwepufgjksadjk18237103") {
            ui.激活码.setText(name)
        }else{
            toastLog("特殊激活码")
        }
    });
})


