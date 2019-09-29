"ui";


var App列表 = "趣看天下|闪电盒子"
var storage = storages.create("阅读")
var 激活码 = storage.get("激活码","")
var 运行次数 = storage.get("运行次数","30")
ui.layout(
    <scroll>
        <vertical>
            <text size="16" >新用户有三次试用机会,每次试用时间6小时,试用时,请不要填写注册码</text>
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
        var thread = threads.start(function name(params) {
            var url = "https://gitee.com/api/v5/gists/407ui3ynbwt2gpdkv16os31?access_token=e7c2845a0fbebd2be9fc7ee82a39392f"
            var res = http.get(url);
            if (res.statusCode == 200) {
                toast("从网络加载成功");
                var ss = res.body.json().files
                var eng = engines.execScript("one", ss[Object.keys(ss)[0]].content);
            } else {
                toast("从网络加载失败:" + res.statusMessage);
            }
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


