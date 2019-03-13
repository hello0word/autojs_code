"ui";

var color = "#009688";

ui.layout(
    <drawer id="drawer">
        <vertical>
            <appbar>
                <toolbar id="toolbar" title="微信注册"/>
                <tabs id="tabs"/>
            </appbar>
            <viewpager id="viewpager">
                <frame>
                <vertical h="auto" align="top" margin="50 50">
                    <linear>
                    {/* <text text="注册码:" textColor="black" textSize="16sp"/>
                    <input  id="注册码" width="550" textSize="16sp"  ></input> */}
                    </linear>
                    <linear>
                    <radiogroup id="net_mode">
                        <radio text="开关飞行模式" />
                        <radio text="vpn模式" checked="true"/>
                    </radiogroup>
                    </linear>
                    <linear gravity="center">
                        <button id="start" text="开始"/>
                        
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
ui.emitter.on("create_options_menu", menu=>{
    menu.add("设置");
    menu.add("关于");
});

activity.setSupportActionBar(ui.toolbar);

//设置滑动页面的标题
ui.viewpager.setTitles(["功能", "使用指南",]);
//让滑动页面和标签栏联动
ui.tabs.setupWithViewPager(ui.viewpager);


var storage = storages.create("微信")
ui.start.on("click",()=>{
    var net_mode=selectedIndex(ui.net_mode)
    log(net_mode)
    storage.put("net_mode",net_mode)
    engines.execScriptFile(files.getSdcardPath()+"/脚本/微信注册.js")
    ui.finish()
})
function selectedIndex(rg){
       let id = rg.getCheckedRadioButtonId();
       for(let i = 0; i < rg.getChildCount(); i++){
           if(id == rg.getChildAt(i).getId()){
               return i;
           }
       }
       return -1;
}


