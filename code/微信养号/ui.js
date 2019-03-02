"ui";
back()

var color = "#009688";

ui.layout(
    <drawer id="drawer">
        <vertical>
            <appbar>
                <toolbar id="toolbar" title="hm5p-多-667"/>
                <tabs id="tabs"/>
            </appbar>
            <viewpager id="viewpager">
                <ScrollView>
                    <vertical>
                    
                        <horizontal padding="5">
                            <text text="设备编号:" textColor="black" textSize="16sp"/>
                            <input  id="设备编号" width="150" textSize="16sp"></input>
                            <text text="定制版本:" textColor="black" textSize="16sp"/>
                            <input id= "定制版本" width="50" textSize="16sp" text="3" ></input>
                        </horizontal>
                        
                        <horizontal padding="5" >
                            <text text="功能选择:" textColor="black" textSize="16sp"  />
                            <spinner id = "功能选择" entries="账号登陆|测试|资料修改|语音聊会天" ></spinner>
                            <checkbox id="切换网络" text="切换网络" w="*"  />
                        </horizontal>
                        <horizontal padding="5" w="*">
                            <text  text="软件端口:" textColor="black" textSize="16sp" h="*"  gravity="top"/>
                            <vertical>
                                <horizontal layout_weight="1">
                                    <input id="软件端口1" w="75"  textSize="16sp"></input>
                                    <input id="软件端口2" w="69"  textSize="16sp"></input>
                                    <checkbox id="正常顺序" text="正常顺序" layout_gravity="right|bottom" w="auto" h="auto"/>
                                </horizontal>
                                <horizontal layout_weight="1">
                                    <text  text="随机跑" textColor="black" textSize="16sp"></text>
                                    <input  id="随机跑" w="96" textSize="16sp" text="3"></input>
                                    <checkbox id= "超强防封" text="超强防封" ></checkbox>
                                </horizontal>
                            </vertical>
                        </horizontal>
                        
                        <horizontal padding="5" >
                            <vertical>
                                <text text="养号步骤:" textColor="black" textSize="16sp"/>
                            </vertical>
                            <horizontal>
                            
                            <vertical w="100">
                                <checkbox id = "聊会天_check" text="聊会天" ></checkbox>
                                <checkbox id="腾新闻" text="腾新闻" ></checkbox>
                                <checkbox id="发文字" text="发文字" ></checkbox>
                                <checkbox id="加群员" text="加群员" ></checkbox>
                                <checkbox id="搜索加" text="搜索加" ></checkbox>
                                <checkbox id="加公众" text="加公众" ></checkbox>
                                <horizontal>
                                    <text  text="循环量" textColor="black" textSize="16sp"></text>
                                    <input id="循环量" w="*"/>
                                </horizontal>
                                <horizontal>
                                    <text  text="腾新闻" textColor="black" textSize="16sp"></text>
                                    <input id="腾新闻_input" w="*" />
                                </horizontal>
                                <horizontal>
                                    <text  text="发文字" textColor="black" textSize="16sp"></text>
                                    <input id="发文字_input" w="*"/>
                                </horizontal>
                                <horizontal>
                                    <text  text="加群员" textColor="black" textSize="16sp"></text>
                                    <input id="加群员_input" w="*"/>
                                </horizontal>
                                <horizontal>
                                    <text  text="搜索加" textColor="black" textSize="16sp"></text>
                                    <input id="搜索加_input" w="*"/>
                                </horizontal>
                                
                            </vertical>
                            <vertical w="100">
                                <checkbox id="没人聊" text="没人聊" ></checkbox>
                                <checkbox id="点赞量" text="点赞量" ></checkbox>
                                <checkbox id="发图文" text="发图文" ></checkbox>
                                <checkbox id="加微群" text="加微群" ></checkbox>
                                <checkbox id="通讯加" text="通讯加" ></checkbox>
                                <checkbox id="固通讯" text="固通讯" ></checkbox>
                                <horizontal>
                                    <text  text="聊会天" textColor="black" textSize="16sp"></text>
                                    <input id="聊会天_input" w="*"/>
                                </horizontal>
                                <horizontal>
                                    <checkbox id="发新闻" text="发新闻" textColor="black" textSize="16sp" h="46"></checkbox>
                                </horizontal>
                                <horizontal>
                                    <text  text="发图文" textColor="black" textSize="16sp"></text>
                                    <input id="发图文_input" w="*"/>
                                </horizontal>
                                <horizontal>
                                    <text  text="加公众" textColor="black" textSize="16sp"></text>
                                    <input id="加公众_input" w="*"/>
                                </horizontal>
                                <horizontal>
                                    <text  text="建微群" textColor="black" textSize="16sp"></text>
                                    <input id="建微群" w="*"/>
                                </horizontal>
                                
                            </vertical>
                                <!--   
                                <list id="checkList" >
                                    <card w="*"  margin="10 5" cardCornerRadius="2dp"
                                        cardElevation="1dp" foreground="?selectableItemBackground">
                                        <horizontal gravity="center_vertical">
                                            <text id="name" text="{{this.name}}"></text>
                                            <checkbox id="done" marginLeft="4" marginRight="6" checked="{{this.done}}" />
                                            <text id="name2" text="{{this.name2}}"></text>
                                            <checkbox id="done2" marginLeft="4" marginRight="6" checked="{{this.done2}}" />
                                        </horizontal>
                                    </card>
                                </list>
                                <list id="inputList" >
                                    <card w="*"  margin="10 5" cardCornerRadius="2dp"
                                        cardElevation="1dp" foreground="?selectableItemBackground">
                                        <horizontal gravity="center_vertical">
                                            <text id="name" text="{{this.name}}"></text>
                                            <input id="input" marginLeft="4" marginRight="6" text="{{this.input}}" />
                                            <text id="name2" text="{{this.name2}}"></text>
                                            <input id="input2" marginLeft="4" marginRight="6" text="{{this.input2}}" />
                                        </horizontal>
                                    </card>
                                </list>
                                -->
                            </horizontal>
                        </horizontal>
                        <button style="Widget.AppCompat.Button.Colored" text="开始运行" id="开始运行"/>
                    </vertical>
                </ScrollView>
                <frame>
                    <text text="第二页内容" textColor="red" textSize="16sp"/>
                </frame>
            </viewpager>
        </vertical>
        <vertical layout_gravity="left" bg="#ffffff" w="280">
            <img w="280" h="200" scaleType="fitXY" src="http://images.shejidaren.com/wp-content/uploads/2014/10/023746fki.jpg"/>
            <list id="menu">
                <horizontal bg="?selectableItemBackground" w="*">
                    <img w="50" h="50" padding="16" src="{{this.icon}}" tint="{{color}}"/>
                    <text textColor="black" textSize="15sp" text="{{this.title}}" layout_gravity="center"/>
                </horizontal>
            </list>
        </vertical>
    </drawer>
);


//创建选项菜单(右上角)
ui.emitter.on("create_options_menu", menu=>{
    menu.add("保存配置");
    menu.add("关于");
});
//监听选项菜单点击
ui.emitter.on("options_item_selected", (e, item)=>{
    switch(item.getTitle()){
        case "保存配置":
        save_config("保存")    
        toast("配置已保存");
            break;
        case "关于":
            alert("关于", "作者QQ:1004864951");
            break;
    }
    e.consumed = true;
});
activity.setSupportActionBar(ui.toolbar);

//设置滑动页面的标题
ui.viewpager.setTitles(["功能设置", "使用说明"]);
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
    switch(item.title){
        case "退出":
            ui.finish();
            break;
    }
})
save_config("加载")
ui.开始运行.on("click",()=>{
   //这里启动线程执行功能代码
   save_config("保存")
   engines.execScriptFile("./main.js")
    
})


function save_config(fun){
    //读取配置
    var storage = storages.create("hm5p-多-667")
    if(fun=="加载"){
        ui.设备编号.setText(       storage.get("设备编号"       ,"0")      )
        ui.定制版本.setText(       storage.get("定制版本"       ,"0")      )
        ui.软件端口1.setText(      storage.get("软件端口1"      ,"0")      )
        ui.软件端口2.setText(      storage.get("软件端口2"      ,"0")      )
        ui.随机跑.setText(         storage.get("随机跑"         ,"0")      )
        ui.循环量.setText(         storage.get("循环量"         ,"0")      )
        ui.聊会天_input.setText(   storage.get("聊会天_input"  ,"0"  )      )
        ui.腾新闻_input.setText(   storage.get("腾新闻_input"  ,"0"  )      )
        ui.发文字_input.setText(   storage.get("发文字_input"  ,"0"  )      )
        ui.发图文_input.setText(   storage.get("发图文_input"  ,"0"  )      )
        ui.加群员_input.setText(   storage.get("加群员_input"  ,"0"  )      )
        ui.加公众_input.setText(   storage.get("加公众_input"  ,"0"  )      )
        ui.搜索加_input.setText(   storage.get("搜索加_input"  ,"0"  )      )
        ui.建微群.setText(         storage.get("建微群"        ,"0"  )      )
        ui.切换网络.setChecked(          storage.get("切换网络"     ,false   )      )
        ui.正常顺序.setChecked(          storage.get("正常顺序"     ,false   )      )
        ui.超强防封.setChecked(          storage.get("超强防封"     ,false   )      )
        ui.聊会天_check.setChecked(      storage.get("聊会天_check" ,false   )      )
        ui.没人聊.setChecked(            storage.get("没人聊"       ,false   )      )
        ui.腾新闻.setChecked(            storage.get("腾新闻"       ,false   )      )
        ui.点赞量.setChecked(            storage.get("点赞量"       ,false   )      )
        ui.发文字.setChecked(            storage.get("发文字"       ,false   )      )
        ui.发图文.setChecked(            storage.get("发图文"       ,false   )      )
        ui.加群员.setChecked(            storage.get("加群员"       ,false   )      )
        ui.加微群.setChecked(            storage.get("加微群"       ,false   )      )
        ui.搜索加.setChecked(            storage.get("搜索加"       ,false   )      )
        ui.通讯加.setChecked(            storage.get("通讯加"       ,false   )      )
        ui.加公众.setChecked(            storage.get("加公众"       ,false   )      )
        ui.固通讯.setChecked(            storage.get("固通讯"       ,false   )      )
        ui.发新闻.setChecked(            storage.get("发新闻"       ,false   )      )
        ui.功能选择.setSelection(  storage.get("功能选择"  ,0)      )

    }else if (fun == "保存"){
        storage.put("设备编号"   ,ui.设备编号.text())  
        storage.put("定制版本"   ,ui.定制版本.text())  
        storage.put("软件端口1"  ,ui.软件端口1.text()) 
        storage.put("软件端口2"  ,ui.软件端口2.text()) 
        storage.put("随机跑"     ,ui.随机跑.text())    
        storage.put("循环量"     ,ui.循环量.text())    
        storage.put("聊会天_input"     ,ui.聊会天_input.text())    
        storage.put("腾新闻_input"     ,ui.腾新闻_input.text())    
        storage.put("发文字_input"     ,ui.发文字_input.text())    
        storage.put("发图文_input"     ,ui.发图文_input.text())    
        storage.put("加群员_input"     ,ui.加群员_input.text())    
        storage.put("加公众_input"     ,ui.加公众_input.text())    
        storage.put("搜索加_input"     ,ui.搜索加_input.text())    
        storage.put("建微群"     ,ui.建微群.text())    
        storage.put("切换网络"   ,ui.切换网络.isChecked())  
        storage.put("正常顺序"   ,ui.正常顺序.isChecked())  
        storage.put("超强防封"   ,ui.超强防封.isChecked())  
        storage.put("聊会天_check"     ,ui.聊会天_check.isChecked())    
        storage.put("没人聊"     ,ui.没人聊.isChecked())    
        storage.put("腾新闻"     ,ui.腾新闻.isChecked())    
        storage.put("点赞量"     ,ui.点赞量.isChecked())    
        storage.put("发文字"     ,ui.发文字.isChecked())    
        storage.put("发图文"     ,ui.发图文.isChecked())    
        storage.put("加群员"     ,ui.加群员.isChecked())    
        storage.put("加微群"     ,ui.加微群.isChecked())    
        storage.put("搜索加"     ,ui.搜索加.isChecked())    
        storage.put("通讯加"     ,ui.通讯加.isChecked())    
        storage.put("加公众"     ,ui.加公众.isChecked())    
        storage.put("固通讯"     ,ui.固通讯.isChecked())    
        storage.put("发新闻"     ,ui.发新闻.isChecked())    
        storage.put("功能选择"   ,ui.功能选择.getSelectedItemPosition())  
    }
}