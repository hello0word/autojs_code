auto.waitFor();
var morningTime = "7:15"; //自己运动能量生成时间
var checkInMorning = false; // 运动能量收集状态
//var G_可收取图片 = images.read("/sdcard/脚本/蚂蚁森林/take.png");
var G_可收取图片 = images.load("https://gitee.com/jixiangxia/autojs/raw/master/%E8%9A%82%E8%9A%81%E6%A3%AE%E6%9E%97/take.png");

if (G_可收取图片 == null) {
    console.log("图片读取失败");
};

/**
 * 获取权限和设置参数
 */
function 请求截图权限() {
    console.log("开始");
    setScreenMetrics(1080, 1920);
    //请求截图
    if (!requestScreenCapture()) {
        toastLog("请求截图失败");
        exit();
    }else{
        toastLog("请求截图ok");
    }
}
function 键盘锁定(){
    let km =context.getSystemService("keyguard");
    if (!km.inKeyguardRestrictedInputMode()) {
        log("键盘已解锁")
        return false;
    }else{
        log("键盘锁定");
        return true;
    }
}

function 解锁() {
    if (!device.isScreenOn()) {
        device.wakeUp();
        sleep(1500);
    };
    if(键盘锁定() ){
        swipe(540,0,540,1920,100);
        sleep(500);
        click(160,160);
        sleep(500);
        KeyCode(15);//8
        sleep(300);
        KeyCode(16);//9
        sleep(300);
        KeyCode(14);//7
        sleep(300);
        KeyCode(12);//5
        sleep(2500);
        if(currentPackage()== "com.android.deskclock"){
            home();
            log("解锁完成");
            return true;
        }
        else{
            解锁();
        }
    }else{
        log("解锁完成");
        return true;
    }
}

function killZFB() {
    var sh = new Shell(true);
    sh.exec("am force-stop com.eg.android.AlipayGphone");
    sleep(500);
    sh.exit;
};
/**
 * 默认程序出错提示操作
 */
function defaultException() {
    toastLog("程序当前所处状态不合预期,脚本退出");
    exit();
}
/**
 * 等待加载收集能量页面,采用未找到指定组件阻塞的方式,等待页面加载完成
 */
function waitPage(type) {
    // 等待进入自己的能量主页
    if (type == 0) {
        className("android.widget.Button").desc("通知").findOne(5000)
    }
    // 等待进入他人的能量主页
    else if (type == 1) {
        className("android.widget.Button").desc("浇水").findOne(5000)
    }
    //再次容错处理
    sleep(1000);
}
/**
 * 进入蚂蚁森林我的主页
 */
function 进入我的蚂蚁森林() {
    killZFB();
    app.startActivity({
        action: "VIEW",
        data: "alipays://platformapi/startapp?appId=60000002"
    });
}
/**
 * 进入排行榜
 */
function enterRank() {
    descEndsWith("查看更多好友").findOne().click();
    var i = 0;
    //等待排行榜主页出现
    var 标题=textEndsWith("好友排行榜").findOne(3000);//这里可以再做判断;
    sleep(1000);
}
/**
 * 从排行榜获取可收集好有的点击位置
 * @returns {*}
 */
function getHasEnergyfriend() {
    var img = captureScreen();
    var p = null;
    p = images.findImage(img, G_可收取图片, {
        region: [870, 200]
    });
    if (p != null) {
        return p;
    } else {
        return null;
    }
}
/**
 * 判断是否好有排行榜已经结束
 * @returns {boolean}
 */
function isRankEnd() {
    var 标题=textEndsWith("好友排行榜").findOne(3000);//这里可以再做判断;
    let webView = className("android.webkit.WebView").findOne(1000);
    let 长度=webView.child(1).childCount()
    let 按钮内容 = webView.child(1).child(长度-2).child(2).desc()
    let 按钮位置 = webView.child(1).child(长度-2).child(2).bounds()
    if (按钮内容 == "邀请" && 按钮位置.centerY() < 1720) {
        return true;
    }else{
        return false;
    } 
}
/**
 * 在排行榜页面,循环查找可收集好友
 * @returns {boolean}
 */
function 收其他好友能量() {
    var ePoint = null;
    enterRank();//进入排行榜
    //确保当前操作是在排行榜界面
    while (ePoint == null && textEndsWith("好友排行榜").findOne()) {
        //滑动排行榜 root方式的的点击调用.如无root权限,7.0及其以上可采用无障碍模式的相关函数
        ePoint = getHasEnergyfriend(1);
        if (ePoint != null) {
            //点击位置相对找图后的修正
            click(ePoint.x, ePoint.y + 20);
            waitPage(1);
            收取能量();
            back();
            ePoint = null;
        } else {
            //向下滑动
            swipe(device.width /2,device.height*(9/10),device.width /2,device.height*(1/10),50);
        }
        //检测是否排行榜结束了
        if (isRankEnd()) {
            return null;
        }

    }
}

/**
 * 
 * 时间超过7.35 则退出
 */
function whenComplete() {
    var now = new Date();
    h = now.getHours();
    m = now.getMinutes();
    if(h >= 7 && m >= 35){
        toastLog("结束");
        killZFB();
        exit();
    }
}

function isMorningTime() {
    var now = new Date();
    var hour = now.getHours();
    var minu = now.getMinutes();
    var targetTime = morningTime.split(":");
    if (Number(targetTime[0]) == hour && Math.abs(Number(targetTime[1]) - minu) <= 2) {
        return true;
    } else {
        return false;
    }
}

/*
解锁屏幕请求截图权限
*/
function 收取能量(){
    var jishu=0;
    var diyi=className("android.webkit.WebView").findOne(500).child(0).child(2).find(className("android.widget.Button"))
    diyi.forEach((child)=>{
            let xy=child.bounds()
            jishu++;
            press(xy.centerX(),xy.centerY(),50)
    });
    log("本次:"+jishu);
    sleep(500);
}
function test() {
    //收取能量()
    
    log(currentActivity())
    //back();
}
//程序主入口
function mainEntrence() {
    解锁();
    请求截图权限();
    //从主页进入蚂蚁森林主页
    while(true){
        进入我的蚂蚁森林();
        waitPage(0);
        收取能量();//收自己的
        收其他好友能量();//收集其他好友能量
        whenComplete()
    };
}
      mainEntrence();
    // test();