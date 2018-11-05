const 微博_主页 = "com.sina.weibo.MainTabActivity";
const 微博_评论子页 = "com.sina.weibo.feed.DetailWeiboActivity";
const 微博_评论子页_评论框 = "com.sina.weibo.feed.detail.composer.ComposerActivity";
const 微博_主页_评论框 = "com.sina.weibo.feed.detail.composer.ComposerActivity";



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
    var myDate = new Date();
    let ss = myDate.toLocaleString()
    let message_all = ss + ":::" + message
    f.writeline(message_all)
    f.close()
};
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
            log("打开评论框后评论失败,该条不能评论")
            return false;
        } else {
            log("评论成功");
            计数对象.本次已完成计数+=1;
            return true;
        }
    } catch (error) {
        log("function_Name:"+arguments.callee.name+":"+error)
    }
    
    
}
function 返回主页(){
    sleep(500);
    var 计数=0
    while(计数 < 8){
        let current_activity=currentActivity();
        switch (current_activity){
            case 微博_主页:
                return true;
            case 微博_主页_评论框:
                back()
                break;
            case 微博_评论子页:
                back();
                break;
            case 微博_评论子页_评论框:
                back();
                sleep(500);
                back();
                break;       
        }
        sleep(500);
        计数++;
    }
    toastLog("返回主页发生错误");
    return false;
}
/**
 * 全局异常处理;
 *处理方式为直接重置整个脚本
 */
function error_dispose(){

}
/**
 * True :下翻页
 */
function 翻页(方向){
    try {
        let 搜索结果;
        if (方向){
            搜索结果=id("lvUser").findOne(2000)
            搜索结果.scrollForward()
        }else{
            搜索结果=id("lvUser").findOne(2000)
            搜索结果.scrollBackward()
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
                case "com.sina.weibo.feed.DetailWeiboActivity"://新打开一个页面 的包名
                    id("comment").findOne().click()//评论页的评论按钮
                    sleep(1000);
                    if (currentActivity()== "com.sina.weibo.feed.detail.composer.ComposerActivity") {//成功打开评论框
                        return 评论框处理();
                    } else {
                        back();
                        log("打开评论框失败,该条不能评论")
                        return false;
                    }
                case "com.sina.weibo.feed.detail.composer.ComposerActivity"://在本页面打开打开评论框
                    return 评论框处理();
            }
            sleep(500)
            count++;
        }
        throw new Error("无法进入到下一页面:在当前页打开评论或进入子页面")
    } catch (error) {
        log("function_Name:"+arguments.callee.name+":"+error)
    }
    
}
//只处理当前页面,确保当前页面能正确操作,分析出当前所有能处理的
function 分析页面(完成列表,计数对象){
    
    try {
        id("lvUser").findOne().children().forEach((child)=>{
            if( child.findOne(id("rightButton"))){//判断是不是一个正常的可评论条目  
                var target = child.findOne(id("contentTextView"));
                if (target){
                    if (!完成列表.in_array( target.desc()) ){//判断是否处于已完成列表中
                        完成列表.push(target.desc());//将该条内容写入完成列表
                        点赞评论(child)
                    };
                };
            }
         });
    } catch (error) {
        log("function_Name:"+arguments.callee.name+":"+error)
    }    
};
/**
 * 
 * @param {* number 秒} 时间下限 
 * @param {* number 秒} 时间上限 
 * @param {* string} 提示内容 
 */

function 休眠并提示(时间下限,时间上限,提示内容) {
    try {
        时间下限 = parseInt(时间下限)
        时间上限 = parseInt(时间上限)
        let 本次休眠时间 = random(时间下限,时间上限);
        log("本次休眠:"+本次休眠时间+"信息:"+提示内容)
        while(本次休眠时间 >= 0){
            sleep(2000);
            toast("还剩  "+本次休眠时间+"秒  信息:   "+提示内容);
            本次休眠时间-=2;
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
            toastLog("发现分享失败");
        }
    });
}
function error_dispose(){//错误计数检查
    if(计数对象.错误计数 > 5){
        休眠并提示(600,601,"分享失败次数过多,等待10分钟")
        计数对象.错误计数=0
    }else{
        log("当前错误"+计数对象.错误计数)
    }
}
/**
 * 重启微博并等待加载完成
 */
function init_app(app_name) {
    var sh = new Shell(true);
    let packageName = app.getPackageName(app_name);
    sh.exec("am force-stop "+packageName);
    sh.exitAndWaitFor();
    app.launch(packageName)
    waitForActivity("com.sina.weibo.MainTabActivity")
}
/**
 * 该函数死循环
 * 
 * 
 * 
 */
function 互动(){
    try {
        auto.waitFor()
        init_app("微博");
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
            返回主页()
            分析页面(完成列表,计数对象)
            返回主页()
            翻页(1)
            休眠并提示(config.互动_第一个延时,config.互动_第二个延时,"评论一条完成")
        }
    } catch (error) {
        log("function_Name:"+arguments.callee.name+":"+error)
    }
    
};
/**
*1先读取前10条内容
*每读取一条,取完成列表里找有没有
*如果有则跳过
*如果没有则点赞评论  加入已经处理列表
*/
function 抢热评() {
    try {
        auto.waitFor()
        init_app("微博");
        //获取全局存储
        let config = get_global_config(); 
        完成列表 = new Array();
        //设置错误监听
        threads.start(listen);
        let f=open(config.抢热评_路径输入框,"r","utf-8");
        let comment_array= f.readlines()  
        
        while(true){
            error_dispose()//检测是否错误太多"弹出的分享失败
            while(完成列表.length > 50)
            {
                完成列表.shift();//从头弹出一个元素
            } 
            评论 = comment_array[random(1,comment_array.length)]
            返回主页();
            分析页面(完成列表,计数对象); 
            if(计数对象.本次已完成计数 <=5){
                休眠并提示(config.抢热评_第三个延时,config.抢热评_第四个延时,"等待评论下一页")
                返回主页();
                翻页(true)
            }else{
                计数对象.本次已完成计数 = 0;//重置计数
                休眠并提示(config.抢热评_第一个延时,config.抢热评_第二个延时,"等待刷新")
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
    log("抢热评"+"开始执行")
    抢热评()
});
events.on("互动", function(words){
    log("互动"+"开始执行")
    互动()
});
//保持脚本运行

setInterval(()=>{}, 100);

