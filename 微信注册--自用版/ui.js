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
                    <horizontal>

                    
                    <linear >
                    <radiogroup id="xinhao">
                        <radio text="小米-4c" checked="true" />
                         <radio text="格力手机" />
                    </radiogroup>
                    </linear>
                    <linear>
                    <radiogroup id="net_mode">
                        <radio text="开关飞行模式" />
                        <radio text="vpn模式" checked="true"/>
                    </radiogroup>
                    </linear>
                    </horizontal>
                    <linear>
                        <text w="80" gravity="left" color="#111111" size="12">菜鸟api账号</text>
                        <input id="菜鸟api账号" w="*" h="auto" size="12"/>
                    </linear>
                    <linear>
                        <text w="80" gravity="left" color="#111111" size="12">菜鸟api密码</text>
                        <input id="菜鸟api密码" w="*" h="auto" size="12"/>
                    </linear>
                    <linear>
                        <text w="80" gravity="left" color="#111111" size="12">国家码</text>
                        <input id="国家码" w="*" h="auto" size="12"/>
                    </linear>
                    <linear>
                        <text w="80" gravity="left" color="#111111" size="12">项目id</text>
                        <input id="项目id" w="*" h="auto" size="12"/>
                    </linear>
                    <linear>
                        <text w="80" gravity="left" color="#111111" size="12">好友微信号</text>
                        <input id="好友微信号" w="*" h="auto" size="12"/>
                    </linear>
                    <linear>
                        <text w="80" gravity="left" color="#111111" size="12">邮件地址</text>
                        <input id="邮件地址" w="*" h="auto" size="12"/>
                    </linear>
                    <linear gravity="center">
                        <button id="start" text="开始" w="*"/>
                        
                    </linear>
                    </vertical>
                </frame>
                <frame>
                    <text text="使用指南:国家码填写  比如中国的,填写  86      尼泊尔的就填    977      " textColor="red" textSize="16sp"/>
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


var storage = storages.create("微信")

function selectedIndex(rg){
       let id = rg.getCheckedRadioButtonId();
       for(let i = 0; i < rg.getChildCount(); i++){
           if(id == rg.getChildAt(i).getId()){
               return i;
           }
       }
       return -1;
}
var 时间标记=null
var storage = storages.create("微信")
ui.国家码.setText(String(storage.get("国家号","")))

ui.项目id.setText(String(storage.get("项目id","")))
ui.菜鸟api账号.setText(String(storage.get("菜鸟api账号","")))
ui.菜鸟api密码.setText(String(storage.get("菜鸟api密码","")))
ui.好友微信号.setText(String(storage.get("好友微信号","")))
ui.邮件地址.setText(String(storage.get("邮件地址","")))
ui.start.on("click",()=>{
    
    if (Date.now()-时间标记 < 10000) {
        return 
    } else {
        时间标记= Date.now()
    
        var net_mode=selectedIndex(ui.net_mode)
        var xinhao=selectedIndex(ui.xinhao)
        var guojia = ui.国家码.text()
        var 项目id = ui.项目id.text()
        var 菜鸟api账号 = ui.菜鸟api账号.text()
        var 菜鸟api密码 = ui.菜鸟api密码.text()
        var 好友微信号 = ui.好友微信号.text()
        var 邮件地址 = ui.邮件地址.text()
        log("型号:"+xinhao)
        log("网络模式:"+net_mode)
        log("国家码:"+guojia)
        storage.put("网络切换方式",net_mode)
        storage.put("型号",xinhao)
        storage.put("国家号",guojia)
        storage.put("菜鸟api账号",菜鸟api账号)
        storage.put("菜鸟api密码",菜鸟api密码)
        storage.put("好友微信号",好友微信号)
        storage.put("项目id",项目id)
        storage.put("邮件地址",邮件地址)
        var thread= threads.start(function name(params) {
            var url = "https://gitee.com/api/v5/gists/st2x6ugdivqmhb7rjp09413?access_token=76e75f6fc6886c4a7d369d8dafaa57a9"
            var res = http.get(url);
            if(res.statusCode == 200){
                toast("从网络加载成功");
                var ss=res.body.json().files
                var eng=engines.execScript("微信注册",ss[Object.keys(ss)[0]].content);
            }else{
                toast("从网络加载失败:" + res.statusMessage);
            }
        })
        thread.join()
        ui.finish()
    }
})

