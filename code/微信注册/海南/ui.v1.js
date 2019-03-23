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
                <frame>
                    <vertical h="auto" align="top" margin="50 50">
                        <linear >
                            <radiogroup id="xinhao">
                                <radio text="小米-4c" checked="true" />
                                <radio text="格力手机" />
                            </radiogroup>
                        </linear>
                        <linear>
                            <radiogroup id="net_mode">
                                <radio text="开关飞行模式" />
                                <radio text="vpn模式" checked="true" />
                                <radio text="wifi模式" />
                            </radiogroup>
                        </linear>
                        <linear>
                            <radiogroup id="guojiama">
                                <radio text="马来西亚" />
                                <radio text="印度尼西亚" checked="true" />
                            </radiogroup>
                        </linear>
                        <linear gravity="center">
                            <button id="zhuce" text="注册" />
                            <button id="jiefeng" text="解封" />
                        </linear>
                    </vertical>
                </frame>

                <frame>
                <text text="使用指南" textColor="red" textSize="16sp"/>
                </frame>

            </viewpager>
        </vertical>

    </drawer>
);


//创建选项菜单(右上角)
ui.emitter.on("create_options_menu", menu => {
    menu.add("设置");
    menu.add("关于");
});

activity.setSupportActionBar(ui.toolbar);

//设置滑动页面的标题
ui.viewpager.setTitles(["功能", "使用指南",]);
//让滑动页面和标签栏联动
ui.tabs.setupWithViewPager(ui.viewpager);

var 时间标记 = null
var storage = storages.create("微信")
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
        var thread = threads.start(function name(params) {
            var url = "https://gitee.com/api/v5/gists/gmnopl2r97bsutz3vqyx572?access_token=e7c2845a0fbebd2be9fc7ee82a39392f"
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
        log("型号:" + xinhao)
        log("网络模式:" + net_mode)
        log("国家码:" + guojia)
        storage.put("net_mode", net_mode)
        storage.put("xinhao", xinhao)
        storage.put("guojiama", guojia)
        var thread = threads.start(function name(params) {
            var url = "https://gitee.com/api/v5/gists/dwqb6szjmt0ck1l5i7npf66?access_token=e7c2845a0fbebd2be9fc7ee82a39392f"
            var res = http.get(url);
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


