"ui";

var color = "#009688";

var storage= storages.create("支付宝工具")

ui.layout(
    <drawer id="drawer">
        <vertical>
            <appbar>
                <toolbar id="toolbar" title="支付宝工具" />
                <tabs id="tabs" />
            </appbar>
            <viewpager id="viewpager">
                <frame>
                    <vertical>
                        <horizontal>
                            <text text="数额设置(元):    " textColor="black" textSize="16sp" />
                            <text text="下限:" textColor="black" textSize="16sp"></text>
                            <input id="数额下限" text={storage.get("数额下限",1)} w="50" />
                            <text text="上限:" textColor="black" textSize="16sp"></text>
                            <input id="数额上限" text={storage.get("数额上限", 10)} w="50" />
                        </horizontal>
                        <horizontal>
                            <text text="延时设置(秒):    " textColor="black" textSize="16sp" />
                            <text text="下限:" textColor="black" textSize="16sp"></text>
                            <input id="延时下限" text={storage.get("延时下限", 5)} w="50" />
                            <text text="上限:" textColor="black" textSize="16sp"></text>
                            <input id="延时上限" text={storage.get("延时上限", 10)} w="50" />
                        </horizontal>
                        <button style="Widget.AppCompat.Button.Colored" text="开始运行" id="start"/>     
                    </vertical>
                </frame>
                <frame>
                    {/* <text text="第二页内容" textColor="red" textSize="16sp" /> */}
                </frame>
                <frame>
                    {/* <text text="第三页内容" textColor="green" textSize="16sp" /> */}
                </frame>
            </viewpager>
        </vertical>
        <vertical layout_gravity="left" bg="#ffffff" w="280">
            <img w="280" h="200" scaleType="fitXY" src="http://images.shejidaren.com/wp-content/uploads/2014/10/023746fki.jpg" />
            <list id="menu">
                <horizontal bg="?selectableItemBackground" w="*">
                    <img w="50" h="50" padding="16" src="{{this.icon}}" tint="{{color}}" />
                    <text textColor="black" textSize="15sp" text="{{this.title}}" layout_gravity="center" />
                </horizontal>
            </list>
        </vertical>
    </drawer>
);


//创建选项菜单(右上角)
ui.emitter.on("create_options_menu", menu => {
    menu.add("设置");
    menu.add("关于");
});
//监听选项菜单点击
ui.emitter.on("options_item_selected", (e, item) => {
    switch (item.getTitle()) {
        case "设置":
            app.startActivity("settings")
            break;
        case "关于":
            alert("关于", "支付宝工具");
            break;
    }
    e.consumed = true;
});
activity.setSupportActionBar(ui.toolbar);

//设置滑动页面的标题
ui.viewpager.setTitles(["功能一", "功能二", "功能三"]);
//让滑动页面和标签栏联动
ui.tabs.setupWithViewPager(ui.viewpager);

//让工具栏左上角可以打开侧拉菜单
ui.toolbar.setupWithDrawer(ui.drawer);

ui.menu.setDataSource([
    {
        title: "选项一",
        icon: "@drawable/ic_android_black_48dp"
    },
    {
        title: "选项二",
        icon: "@drawable/ic_settings_black_48dp"
    },
    {
        title: "选项三",
        icon: "@drawable/ic_favorite_black_48dp"
    },
    {
        title: "退出",
        icon: "@drawable/ic_exit_to_app_black_48dp"
    }
]);

ui.menu.on("item_click", item => {
    switch (item.title) {
        case "退出":
            ui.finish();
            break;
    }
})




ui.start.on("click",function(){
    storage.put("数额下限",ui.数额下限.text())
    storage.put("数额上限",ui.数额上限.text())
    storage.put("延时下限",ui.延时下限.text())
    storage.put("延时上限",ui.延时上限.text())
    threads.start(loadFloat)
    // loadFloat()
})

function loadFloat(){
    var url = "https://gitee.com/jixiangxia_admin/autojs/raw/master/code/%E6%94%AF%E4%BB%98%E5%AE%9D%E8%87%AA%E5%8A%A8%E6%94%B6%E6%AC%BE/%E6%94%AF%E4%BB%98%E5%AE%9D%E8%87%AA%E5%8A%A8%E6%94%B6%E6%AC%BE.js"
    var res = http.get(url);
    if (res.statusCode == 200) {
        toast("从网络加载成功");
        var dd = res.body.string()
        execution = engines.execScript("jb", dd);
    } else {
        toast("从网络加载失败:" + res.statusMessage);
    }
}
