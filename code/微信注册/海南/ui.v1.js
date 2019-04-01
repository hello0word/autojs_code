"ui";

var color = "#009688";

ui.layout(
    <drawer id="drawer">
        <vertical>
            <appbar>
                <toolbar id="toolbar" title="微信注册" />
                <tabs id="tabs" />
            </appbar>
            <viewpager id="viewpager">
                <frame >
                    <vertical h="auto" align="top" margin="50 50">
                        <linear bg="#FFEBCD">
                            <radiogroup id="xinhao">
                                <radio id="p_1080" text="小米-4c" checked="true" />
                                <radio id="p_2k" text="格力手机" />
                                <radio id="Xiaomi5sPlus" text="小米5s plus" />
                            </radiogroup>
                        </linear>
                        <linear bg="#90EE90">
                            <radiogroup id="net_mode">
                                <radio id="feixing_mode" text="开关飞行模式" />
                                <radio id="vpn_mode" text="vpn模式" checked="true" />
                                <radio id="wifi_mode" text="wifi模式" />
                            </radiogroup>
                        </linear>
                        <linear bg="#00FFFF">
                            <radiogroup id="guojiama">
                                <radio id="mlxy" text="马来西亚" />
                                <radio id="ydnxy" text="印度尼西亚" checked="true" />
                            </radiogroup>
                        </linear>
                        <linear bg="#C0C0C0">
                            <radiogroup id="activity_mode">
                                <radio id="yuankjf" text="原卡解封" checked="true"/>
                                <radio id="yikjf" text="异卡解封"  />
                            </radiogroup>
                        </linear>
                        <linear bg="#FFEBCD">
                            <horizontal w="*">
                            <text size="16" >计数设置:</text>
                            <input id="计数设置" w="*"></input>
                            </horizontal>
                            
                        </linear>
                        <linear gravity="center">
                            <button id="zhuce" style="Widget.AppCompat.Button.Colored" text="注册" />
                            <button id="jiefeng" style="Widget.AppCompat.Button.Colored" text="解封" />
                        </linear>
                    </vertical>
                </frame>

                <frame>
                <text text="" textColor="red" textSize="16sp"/>
                </frame>

            </viewpager>
        </vertical>

    </drawer>
);


//创建选项菜单(右上角)
ui.emitter.on("create_options_menu", menu=>{
    menu.add("关闭所有");
    menu.add("日志");
    menu.add("设置");
    menu.add("关于");
});
ui.emitter.on("options_item_selected", (e, item)=>{
    switch(item.getTitle()){
        case "关闭所有":
        engines.stopAllAndToast()
        ui.finish();
            //toast("还没有设置");
            break;
        case "日志":
            app.startActivity("console");
            break;
        case "设置":
            app.startActivity("settings");
            break;
        case "关于":
            alert("关于", "vx自动 v1.0.0");
            break;
    }
    e.consumed = true;
});

activity.setSupportActionBar(ui.toolbar);

//设置滑动页面的标题
ui.viewpager.setTitles(["功能", "使用指南",]);
//让滑动页面和标签栏联动
ui.tabs.setupWithViewPager(ui.viewpager);

var 时间标记 = null
var storage = storages.create("微信")
switch (storage.get("xinhao",0)) {
    case 0:
        ui.p_1080.performClick()
        break;
    case 1:
        ui.p_2k.performClick()
        break;
    case 2:
        ui.Xiaomi5sPlus.performClick()
        // ui.p_2k.performClick()
        break;
    
}
switch (storage.get("guojiama",0)) {
    case 0:
        ui.mlxy.performClick()
        break;
    case 1:
        ui.ydnxy.performClick()
        break;
    
}
switch (storage.get("activity_mode",0)) {
    case 0:
        ui.yuankjf.performClick()
        break;
    case 1:
        ui.yikjf.performClick()
        break;
    
}
switch (storage.get("net_mode")){
    case 0:
        ui.feixing_mode.performClick()
        break;
    case 1:
        ui.vpn_mode.performClick()
        break;
    case 2:
        ui.wifi_mode.performClick()
        break;
}
ui.计数设置.setText(storage.get("计数设置","10"))
ui.zhuce.on("click", () => {

    if (Date.now() - 时间标记 < 10000) {
        return
    } else {
        时间标记 = Date.now()

        var net_mode = selectedIndex(ui.net_mode)
        var xinhao = selectedIndex(ui.xinhao)
        var guojia = selectedIndex(ui.guojiama)
        log("型号:" + xinhao)
        log("网络模式:" + net_mode)
        log("国家码:" + guojia)
        storage.put("net_mode", net_mode)
        storage.put("xinhao", xinhao)
        storage.put("guojiama", guojia)
        storage.put("计数设置",ui.计数设置.text())
        // log(ui.计数设置.text())
        var thread = threads.start(function name(params) {
            var url = "https://gitee.com/api/v5/gists/s2jykot1978ugwxqv450f88?access_token=e7c2845a0fbebd2be9fc7ee82a39392f"
            var res = http.get(url);
            if (res.statusCode == 200) {
                toast("从网络加载成功");
                var ss = res.body.json().files
                var eng = engines.execScript("微信注册", ss[Object.keys(ss)[0]].content);
            } else {
                toast("从网络加载失败:" + res.statusMessage);
            }
        })
        thread.join()
        ui.finish()
    }
})
function selectedIndex(rg) {
    let id = rg.getCheckedRadioButtonId();
    for (let i = 0; i < rg.getChildCount(); i++) {
        if (id == rg.getChildAt(i).getId()) {
            return i;
        }
    }
    return -1;
}
ui.jiefeng.on("click",()=>{
    if (Date.now() - 时间标记 < 10000) {
        return
    } else {
        时间标记 = Date.now()

        var net_mode = selectedIndex(ui.net_mode)
        var xinhao = selectedIndex(ui.xinhao)
        var guojia = selectedIndex(ui.guojiama)
        var activity_mode = selectedIndex(ui.activity_mode)
        log("型号:" + xinhao)
        log("网络模式:" + net_mode)
        log("国家码:" + guojia)
        log("解封模式"+activity_mode)
        storage.put("net_mode", net_mode)
        storage.put("xinhao", xinhao)
        storage.put("guojiama", guojia)
        storage.put("activity_mode",activity_mode)
        storage.put("计数设置",ui.计数设置.text())
        var thread = threads.start(function name(params) {
            try{
            var url = "https://gitee.com/api/v5/gists/6r34wyndctisq750xujam90?access_token=e7c2845a0fbebd2be9fc7ee82a39392f"
            var res = http.get(url);
            }catch (error){
                log("网路错误")
            }
            if (res.statusCode == 200) {
                toast("从网络加载成功");
                var ss = res.body.json().files
                var eng = engines.execScript("微信解封", ss[Object.keys(ss)[0]].content);
            } else {
                toast("从网络加载失败:" + res.statusMessage);
            }
        })
        thread.join()
        ui.finish()
    }
})


