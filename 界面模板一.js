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
                            <text w="130" gravity="center" color="#111111" size="16">第一个延时</text>
                            <input id="第一个延时" w="*" h="40"/>
                        </linear>
                        <linear>
                            <text w="130" gravity="center" color="#111111" size="16">第二个延时</text>
                            <input id="第二个延时" w="*" h="40" />
                        </linear>
                        <linear>
                            <text w="130" gravity="center" color="#111111" size="16">第三个延时</text>
                            <input id="第三个延时" w="*" h="40" />
                        </linear>
                        <linear gravity="center">
                            
                            <button id="互动_开始" text="开始"/>
                        </linear>
                    </vertical>
                </frame>
                <frame>
                <vertical h="auto" align="center" margin="0 50">
                        <linear>
                            <text w="130" gravity="center" color="#111111" size="16">第一个延时</text>
                            <input id="第一个延时" w="*" h="40"/>
                        </linear>
                        <linear>
                            <text w="130" gravity="center" color="#111111" size="16">第二个延时</text>
                            <input id="第二个延时" w="*" h="40" />
                        </linear>
                        <linear>
                            <text w="130" gravity="center" color="#111111" size="16">第三个延时</text>
                            <input id="第三个延时" w="*" h="40" />
                        </linear>
                        <linear gravity="center">
                            
                        <button id="抢热评_开始" text="开始"/>
                        </linear>
                    </vertical>    
                </frame>
            </viewpager>
        </vertical>
    </drawer>
);
////绑定按钮事件
ui.互动_开始.on("click",()=>{
    //这里是互动的逻辑
    toast("开始互动");
});

ui.抢热评_开始.on("click",()=>{
    //这里是抢热评的逻辑
    toast("开始抢热评");
});


//创建选项菜单(右上角)
ui.emitter.on("create_options_menu", menu=>{
    menu.add("关于");
    menu.add("退出");
});
//监听选项菜单点击
ui.emitter.on("options_item_selected", (e, item)=>{
    switch(item.getTitle()){
        case "退出":
        ui.finish();
            //toast("还没有设置");
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

//让工具栏左上角可以打开侧拉菜单
// ui.toolbar.setupWithDrawer(ui.drawer);

// ui.menu.setDataSource([
//   {
//       title: "选项一",
//       icon: "@drawable/ic_android_black_48dp"
//   },
//   {
//       title: "选项二",
//       icon: "@drawable/ic_settings_black_48dp"
//   },
//   {
//       title: "选项三",
//       icon: "@drawable/ic_favorite_black_48dp"
//   },
//   {
//       title: "退出",
//       icon: "@drawable/ic_exit_to_app_black_48dp"
//   }
// ]);

// ui.menu.on("item_click", item => {
//     switch(item.title){
//         case "退出":
//             ui.finish();
//             break;
//     }
// })


