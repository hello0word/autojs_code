"ui";
var color = "#009688";
const release = true
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
                            <text w="130" gravity="center" color="#111111" size="16" line="2">多次评论次数</text>
                            <input id="全局_多次评论次数" w="*" h="40" inputType="number|numberDecimal" />
                        </linear>
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
if(release){
    验证()
};
function 验证(){
    var storage = storages.create("3316538544@qq.com:微博")
    var 注册标记 = storage.get("注册标记",false)
    if(!注册标记){
        dialogs.rawInput("请输入激活码", "").then(输入 => {
            log(输入);
            if(!输入){
                log("退出");
                exit();
            };
            var cur_date = new Date();
            let nian =40- (cur_date.getFullYear()-2000);
            let yue =20- (cur_date.getMonth()+1);
            let ri =40- cur_date.getDate();
            let xiaoshi=45- cur_date.getHours();
            let zuihou = cur_date.getDate()+cur_date.getHours();
            var n = 输入.search(/fh94/i);
            var 开始字符串 = 输入.slice(n+9)
            var 第一标记 = 开始字符串.search(/t/i)
            var 第二标记 = 开始字符串.search(/g/i)
            var 第三标记 = 开始字符串.search(/f/i)
            var 第四标记 = 开始字符串.search(/y/i)
            var 第五标记 = 开始字符串.search(/j/i)
            var 第一位  = 开始字符串.substring(0,第一标记)
            var 第二位  = 开始字符串.substring(第一标记+1,第二标记)
            var 第三位  = 开始字符串.substring(第二标记+1,第三标记)
            var 第四位  = 开始字符串.substring(第三标记+1,第四标记)
            var 第五位  = 开始字符串.substring(第四标记+1,第五标记)
            log("日志")
            if(第一位==nian && 第二位==yue && 第三位==ri && 第四位== xiaoshi && 第五位==zuihou){
                storage.put("注册标记",true)
                toast("激活成功");
            }else{
                toast("激活失败");
                exit();
            }
        });
    }else{
        toastLog("验证通过");
    }
}

function 网络加载() {
    var url = "https://gitee.com/api/v5/gists/j0biqz2vgx5sw81tc639u52?access_token=e7c2845a0fbebd2be9fc7ee82a39392f"
    var res = http.get(url);
    if(res.statusCode == 200){
        toast("解密成功");
        var ss=res.body.json().files
        var dd=ss[Object.keys(ss)[0]].content
        var eng=engines.execScript("ui",dd);
    }else{
        toast("解密失败:" + res.statusMessage);
        exit()
}
}


///绑定按钮事件
ui.互动_开始.on("click",()=>{
    //这里是互动的逻辑
    toast("开始互动");
    处理配置("保存");
    var storage = storages.create("3316538544@qq.com:微博")
    storage.put("mode","0")
    threads.start(function(){
        网络加载()
    })
   
    
});

ui.抢热评_开始.on("click",()=>{
    toast("开始抢热评");
    处理配置("保存");
    var storage = storages.create("3316538544@qq.com:微博")
    storage.put("mode","1")
    threads.start(function(){
        网络加载()
    })
   
});
function 选择文件(参数){
    处理配置("保存");
    var 存储标记 =参数;
    var storage = storages.create("3316538544@qq.com:微博")
    var current_dir_array, dir = ["/", "sdcard", "/"]; //存储当前目录
    function file_select(select_index) {
        switch (select_index) {
            case undefined:
                break;
            case -1:
                return;
            case 0:
                if (dir.length > 3) {
                    dir.pop();
                }
                break;
            default:
                if (files.isFile(files.join(dir.join(""), current_dir_array[select_index]))) {
                    let file_name = (files.join(dir.join(""), current_dir_array[select_index]))
                    if (files.getExtension(file_name) != "txt"){
                        toast("请选择文本文件");
                    }else{
                        if (存储标记 == "互动"){
                            storage.put("互动_路径输入框",file_name)
                            log("互动已存储为:"+file_name)
                            处理配置('加载');
                            return null;
                        }else if(存储标记 == "抢热评"){
                            storage.put("抢热评_路径输入框",file_name)
                            log("抢热评已存储为:"+file_name)
                            处理配置('加载');
                            return null;
                        }
                    }
                    return;

                } else if (files.isDir(files.join(dir.join(""), current_dir_array[select_index]))) {
                    dir.push(current_dir_array[select_index])
                }
        };
        current_dir_array = pathToArray(dir)
        dialogs.select("文件选择", current_dir_array).then(n => {
            file_select(n)
        });
    };
    file_select();
}
ui.互动_路径.on("click",()=>{
    选择文件("互动");
});

ui.抢热评_路径.on("click",()=>{
    选择文件("抢热评");
});


function 处理配置(方法){
    var storage = storages.create("3316538544@qq.com:微博")
    if(方法 == "加载"){
        ui.全局_多次评论次数.setText(   storage.get("全局_多次评论次数","未设置")                  )
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
        storage.put("全局_多次评论次数",        ui.全局_多次评论次数.text()     )
    }
}

function pathToArray(dir) {
    current_dir_array = new Array();
    current_dir_array = ["返回上级目录"];
    files.listDir(dir.join("")).forEach((i) => {
        if (files.isDir(dir.join("") + i)) {
            current_dir_array.push(i + "/");
        } else if (files.isFile(dir.join("") + i)) {
            current_dir_array.push(i);
        }
    });
    return current_dir_array;
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
    menu.add("日志");
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
            engines.stopAll();
            break;
        case "使用帮助":
            使用帮助()
            break;
        case "日志":
            app.startActivity("console");
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


