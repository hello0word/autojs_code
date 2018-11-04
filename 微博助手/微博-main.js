function 枚举方法(obj){      
    var names="";  
           
    for(var name in obj){         
       names+=name+"\n ";    
    }    
    log(names);    
}
function log(message){
    files.createWithDirs("/sdcard/微博助手日志.txt");
    let f=files.open("/sdcard/微博助手日志.txt","a","utf-8")
    f.writeline(message)
    f.close()
}
toastLog = function(message){
    log(message)
    toast(message)
}
Array.prototype.in_array = function (element) {
    　　for (var i = 0; i < this.length; i++) {
    　　　　if (this[i] == element) {
    　　　　　　return true;
    　　}
    　}
    　　return false;
    };
function get_global_config(){
    try {
        var storage = storages.create("3316538544@qq.com:微博")
        let config = {};
        config.互动_第一个延时 = storage.get("互动_第一个延时","未设置")
        config.互动_第二个延时 = storage.get("互动_第二个延时","未设置")
        config.互动_路径输入框 = storage.get("互动_路径输入框","未设置");
        config.抢热评_第一个延时 = storage.get("抢热评_第一个延时","未设置")
        config.抢热评_第二个延时 = storage.get("抢热评_第二个延时","未设置")
        config.抢热评_第三个延时 = storage.get("抢热评_第三个延时","未设置")
        config.抢热评_第四个延时 = storage.get("抢热评_第四个延时","未设置")
        config.抢热评_路径输入框 = storage.get("抢热评_路径输入框","未设置");
    return config;
    } catch (error) {
        log("function_Name:"+arguments.callee.name+":"+error)
    }
    
}

function 评论框处理(){
    try {
        sleep(1000)
        评论 = 评论 || "哈哈";
        id("edit_view").findOne().setText(评论)
        sleep(1000)
        id("tv_send").findOne().click()
        sleep(1000)
        if (currentActivity()== "com.sina.weibo.feed.detail.composer.ComposerActivity") {//还在评论框界面
            log("评论失败")
            返回主页();
            return false;
        } else {
            log("评论成功");
            返回主页();
            return true;
        }
    } catch (error) {
        log("function_Name:"+arguments.callee.name+":"+error)
    }
    
    
}
function 返回主页(){
    sleep(800);
    var 计数=0
    while(currentActivity()!="com.sina.weibo.MainTabActivity" && 计数 < 7){
        back();
        sleep(500);
        计数++;
    }
    toastlog("返回主页发生错误,脚本退出");
    exit()
}
/*
True :下翻页
*/
function 翻页(方向){
    try {
        if (方向){
            id("lvUser").findOne().scrollForward()
        }else{
            id("lvUser").findOne().scrollBackward()
        }
    } catch (error) {
        log("function_Name:"+arguments.callee.name+":"+error)
    }
    
}



function 点赞评论(列表项){
    try {
        列表项.findOne(id("rightButton")).click()
        sleep(300);
        列表项.findOne(descStartsWith("评论")).click()
        sleep(1000);
        let count =0
        while(count <20){//网络可能卡顿,等待页面加载
            switch (currentActivity()){
                case "com.sina.weibo.feed.DetailWeiboActivity"://   新打开一个页面 的包名
                    id("comment").findOne().click()//评论页的评论按钮
                    sleep(1000);
                    if (currentActivity()== "com.sina.weibo.feed.detail.composer.ComposerActivity") {//成功打开评论框
                        return 评论框处理();
                    } else {
                        back();
                        log("打开评论框失败")
                        return false;
                    }
                    break;
                case "com.sina.weibo.feed.detail.composer.ComposerActivity"://在本页面打开打开评论框
                    return 评论框处理();
                default :
                    toastlog('等待页面改变');
                
            }
            sleep(500)
            count++;
        }
    } catch (error) {
        log("function_Name:"+arguments.callee.name+":"+error)
    }
    
}
//只处理当前页面,确保当前页面能正确操作,分析出当前所有能处理的
function 分析页面(完成列表,计数对象){
    try {
        id("lvUser").findOne().children().forEach((child)=>{
            if( child.findOne(id("rightButton")) ){
                //log("能点击")
                //点赞评论(child);
                 
                     var target = child.findOne(id("contentTextView"));
                     if (target != null){
                         if ( 完成列表.in_array( target.desc()) ){
                             计数对象.本次已完成计数+=1;
 
                         }else{
                             //log("编号:"+index+"不存在")
                             //处理
                             完成列表.push(target.desc());//将该条内容写入完成列表
                             log(target.desc());
                             if( 点赞评论(child)){
                                 计数对象.本次计数+=1;
                             }else{
                                 计数对象.错误计数+=1;
                             };
                         };
                     };
                 
                 
            }else{
                //log("不能点击")
            }
         });
    } catch (error) {
        log("function_Name:"+arguments.callee.name+":"+error)
    }    
};


function 休眠并提示(时间下限,时间上限,提示内容) {
    try {
        时间下限 = parseInt(时间下限)
        时间上限 = parseInt(时间上限)
        let 本次休眠时间 = random(时间下限,时间上限);
        while(本次休眠时间 != 0){
            sleep(1000);
            log("还剩  "+本次休眠时间+"秒     信息:   "+提示内容);
            本次休眠时间-=1;
        }
    } catch (error) {
        log("function_Name:"+arguments.callee.name+":"+error)
    }
    
}
function listen(){
    events.observeToast();
    events.onToast(function(toast){
        var pkg = toast.getPackageName();
        if (pkg =="com.sina.weibo" && toast.getText() == "分享失败"){
            计数对象.错误计数 +=1;
        }
    });
}
function error_dispose(){//错误计数检查
    if(计数对象.错误计数 > 10){
        休眠并提示(1000*600,10001*60000,"分享失败,等待10分钟")
        计数对象.错误计数=0
    }
}

function 互动(){
    try {
        auto.waitFor()
        app.launchApp("微博");
        let config = get_global_config();
        var 完成列表 = new Array()
        //设置错误监听
        threads.start(listen);
        let f=open(config.互动_路径输入框,"r","utf-8");
        let comment_array= f.readlines()   
        while(true){
            error_dispose()//检测是否错误太多"弹出的分享失败
            评论 = comment_array[random(1,comment_array.length)]
            while(完成列表.length > 50)
            {
                完成列表.shift();//从头弹出一个元素  确保不会内存越来越大
            }
            分析页面(完成列表,计数对象)
            翻页(1)
            休眠并提示(config.互动_第一个延时,config.互动_第二个延时,"评论一条完成")
        }
    } catch (error) {
        log("function_Name:"+arguments.callee.name+":"+error)
    }
    
};
function 抢热评() {
    try {
        auto.waitFor()
        app.launchApp("微博");
        //获取全局存储
        let config = get_global_config(); 
        完成列表 = new Array();
        //设置错误监听
        threads.start(listen);
        let f=open(config.抢热评_路径输入框,"r","utf-8");
        let comment_array= f.readlines()  
        //1先读取前10条内容
        //每读取一条,取完成列表里找有没有
        //如果有则跳过
        //如果没有则点赞评论  加入已经处理列表
        while(true){
            error_dispose()//检测是否错误太多"弹出的分享失败
            while(完成列表.length > 50)
            {
                完成列表.shift();//从头弹出一个元素
            } 
            评论 = comment_array[random(1,comment_array.length)]
            分析页面(完成列表,计数对象);
            log(计数对象.本次计数)
            log(计数对象.本次已完成计数)
            if(计数对象.本次计数<=10 && 计数对象.本次已完成计数 <=5){
                log('继续执行')
                休眠并提示(config.抢热评_第三个延时,config.抢热评_第四个延时,"等待评论下一页")
                翻页(true)
            }else{
                计数对象.本次计数 = 0;//重置计数
                计数对象.本次已完成计数 = 0;
                休眠并提示(config.抢热评_第一个延时,config.抢热评_第二个延时,"等待刷新")
                //刷新 向上翻页到顶
                id("tabhost_right").findOne().child(1).click()//点击首页刷新
            }
        }
    } catch (error) {
        log("function_Name:"+arguments.callee.name+":"+error)
    }
    
}
/////////////////
var 评论= "";
var 计数对象={
    本次计数:0,
    错误计数:0,
    本次已完成计数:0,
}
events.on("抢热评", function(words){
    toastLog(words);
    抢热评()
});
events.on("互动", function(words){
    toastLog(words);
    互动()
});
//保持脚本运行

setInterval(()=>{}, 500);

