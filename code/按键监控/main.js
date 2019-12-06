"ui";
var storage = storages.create("按键监控")
var 进程勾选 = storage.get("进程勾选",false)
var 状态勾选 = storage.get("状态勾选",false)
var 包名 = storage.get("包名","")

ui.layout(<vertical padding="16">
    <button id="设置按钮" w="auto" style="Widget.AppCompat.Button.Colored">设置</button>
    <button id="日志按钮" w="auto"style="Widget.AppCompat.Button.Colored">日志</button>
    <checkbox id="进程勾选框" text="进程" checked={进程勾选}></checkbox>
    <checkbox id="状态勾选框" text="状态" checked={状态勾选}></checkbox>
    <input id='包名' hint="这里包名" text={包名}></input>
    <button id="开始">开始</button>
</vertical>)
var path = "./xintiao.js"
if (files.exists(path)) {
    var kaishi= files.read(path)
    if (new Date().getTime() - parseInt(kaishi) > 1000 * 60 * 60 *12) {
        toastLog("已过期")
        exit()
    }else{
        files.write(path,new Date().getTime())
    }
}


ui.设置按钮.on("click",()=>{
    app.startActivity("settings")
})
ui.日志按钮.on("click",()=>{
    app.startActivity("console")
})

ui.开始.on("click",()=>{
    log(ui.包名.text())
    storage.put("进程勾选",ui.进程勾选框.checked)
    storage.put("状态勾选",ui.状态勾选框.checked)
    storage.put("包名",ui.包名.text())
    engines.execScriptFile("./loop.js" )
    ui.finish()
})

