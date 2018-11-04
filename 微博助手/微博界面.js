"ui";

var color = "#009688";

ui.layout(
    <drawer id="drawer">
        <vertical>
            <appbar>
                <toolbar id="toolbar" title="微博助手"/>
                <tabs id="tabs"/>
            </appbar>
            <viewpager id="viewpager">
                <frame>
                    <vertical h="auto" align="center" margin="0 50">
                        <linear>
                            <text w="130" gravity="center" color="#111111" size="16">延时最短时间(秒)</text>
                            <input id="互动_第一个延时" w="*" h="40" inputType="number|numberDecimal"/>
                        </linear>
                        <linear>
                            <text w="130" gravity="center" color="#111111" size="16">延时最长时间(秒)</text>
                            <input id="互动_第二个延时" w="*" h="40" inputType="number|numberDecimal" />
                        </linear>
                        <linear>
                            <text w="auto" gravity="center" color="#111111" size="16">当前评论文件路径:</text>
                            <text id="互动_路径输入框" w="*" />
                        </linear>
                        <linear gravity="center">                            
                            <button id="互动_开始" text="开始"/>
                            <button id = "互动_路径" text="选评论文件"    />                       
                        </linear>
                    </vertical>
                </frame>
                <frame>
                <vertical h="auto" align="center" margin="0 50">
                        <linear>
                            <text w="130" gravity="center" color="#111111" size="16">刷新延时最短(秒)</text>
                            <input id="抢热评_第一个延时" w="*" h="40" inputType="number|numberDecimal"/>
                        </linear>
                        <linear>
                            <text w="130" gravity="center" color="#111111" size="16">刷新延时最长(秒)</text>
                            <input id="抢热评_第二个延时" w="*" h="40" inputType="number|numberDecimal"/>
                        </linear>
                        <linear>
                            <text w="130" gravity="center" color="#111111" size="16">评论间隔最短(秒)</text>
                            <input id="抢热评_第三个延时" w="*" h="40" inputType="number|numberDecimal"/>
                        </linear>
                        <linear>
                            <text w="130" gravity="center" color="#111111" size="16">评论间隔最长(秒)</text>
                            <input id="抢热评_第四个延时" w="*" h="40" inputType="number|numberDecimal"/>
                        </linear>
                        <linear>
                            <text w="auto" gravity="center" color="#111111" size="16">当前评论文件路径:</text>
                            <text id="抢热评_路径输入框" w="*" />
                        </linear>
                        
                        <linear gravity="center">
                        <button id="抢热评_开始" text="开始"/>
                        <button id = "抢热评_路径" text="选评论文件"    />
                        </linear>
                    </vertical>    
                </frame>
            </viewpager>
        </vertical>
    </drawer>
    
);
处理配置("加载");
wocao()
function wocao(){
    let 当前时间 = "Sun Nov 04 2018 20:33:12 GMT+0800 (GMT+08:00)"
    var date1=new Date(当前时间);  //开始时间
    var date2=new Date();    //结束时间
    var date3=date2.getTime()-date1.getTime()  //时间差的毫秒数
    
    
    //计算出相差天数
    var days=Math.floor(date3/(24*3600*1000))
    
    if(days > 7){
        dialogs.alert("提示", "已过期,请联系作者")
        exit();
    }

}
///绑定按钮事件
ui.互动_开始.on("click",()=>{
    //这里是互动的逻辑
    toast("开始互动");
    处理配置("保存");
    let 互动 = engines.execScriptFile("./微博-main.js")
    setTimeout(()=>{
        互动.getEngine().emit("互动","互动")
    },2000);
    toastLog("正在启动");
});

ui.抢热评_开始.on("click",()=>{
    toast("开始抢热评");
    处理配置("保存");
    let 抢热评 = engines.execScriptFile("./微博-main.js")
    setTimeout(()=>{
        抢热评.getEngine().emit("抢热评","抢热评")
    },2000);
    toastLog("正在启动");
});

ui.互动_路径.on("click",()=>{
    ui.互动_路径.setClickable(false)
    处理配置("保存");
    let e= engines.execScriptFile("./微博-文件选择.js");
    sleep(1000);
    e.getEngine().emit("互动","互动")
    ui.互动_路径.setClickable(true)
});
ui.抢热评_路径.on("click",()=>{
    ui.抢热评_路径.setClickable(false);
    处理配置("保存");
    let e= engines.execScriptFile("./微博-文件选择.js");
    sleep(1000);
    e.getEngine().emit("抢热评","抢热评")
    ui.抢热评_路径.setClickable(true);
});
events.on("配置完成",()=>{
    处理配置('加载');
    log("事件加载完成")
})
function 处理配置(方法){
    var storage = storages.create("3316538544@qq.com:微博")
    if(方法 == "加载"){
        ui.互动_第一个延时.setText(     storage.get("互动_第一个延时","未设置")                   )
        ui.互动_第二个延时.setText(     storage.get("互动_第二个延时","未设置")                   )        
        ui.互动_路径输入框.text(     storage.get("互动_路径输入框","未设置")                    )
        ui.抢热评_第一个延时.setText(   storage.get("抢热评_第一个延时","未设置")                   )
        ui.抢热评_第二个延时.setText(   storage.get("抢热评_第二个延时","未设置")                    )
        ui.抢热评_第三个延时.setText(   storage.get("抢热评_第三个延时","未设置")                    )
        ui.抢热评_第四个延时.setText(   storage.get("抢热评_第四个延时","未设置")                    )
        ui.抢热评_路径输入框.text(   storage.get("抢热评_路径输入框","未设置")                    )
        
    }else if(方法 == "保存"){
        storage.put("互动_第一个延时",          ui.互动_第一个延时.text()       )
        storage.put("互动_第二个延时",          ui.互动_第二个延时.text()       )       
        storage.put("互动_路径输入框",          ui.互动_路径输入框.text()       )
        storage.put("抢热评_第一个延时",        ui.抢热评_第一个延时.text()     )
        storage.put("抢热评_第二个延时",        ui.抢热评_第二个延时.text()     )
        storage.put("抢热评_第三个延时",        ui.抢热评_第三个延时.text()     )
        storage.put("抢热评_第四个延时",        ui.抢热评_第四个延时.text()     )
        storage.put("抢热评_路径输入框",        ui.抢热评_路径输入框.text()     )
    }
}

function 使用帮助(){
    alert("首次运行,请填写配置,然后点击右上角的保存配置已方便下次使用")
}


//创建选项菜单(右上角)
ui.emitter.on("create_options_menu", menu=>{
    menu.add("加载配置");
    menu.add("关于");
    menu.add("保存配置");
    menu.add("使用帮助");
    menu.add("退出");
});
//监听选项菜单点击
ui.emitter.on("options_item_selected", (e, item)=>{
    switch(item.getTitle()){
        case "加载配置":
            处理配置("加载");
            break;
        case "保存配置":
            处理配置("保存");
            break;
        case "退出":
            ui.finish();
            //toast("还没有设置");
            break;
        case "使用帮助":
            使用帮助()
            break;

        case "关于":
            alert("关于", "微博助手 v1.0.0");
            break;
    }
    e.consumed = true;
});
activity.setSupportActionBar(ui.toolbar);
//设置滑动页面的标题
ui.viewpager.setTitles(["互动", "抢热评"]);
//让滑动页面和标签栏联动
ui.tabs.setupWithViewPager(ui.viewpager);


