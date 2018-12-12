auto;
var myEnergeType = ["线下支付", "行走", "共享单车", "地铁购票", "网络购票", "网购火车票", "生活缴费", "ETC缴费", "电子发票", "绿色办公", "咸鱼交易", "预约挂号"];
var morningTime = "7:15"; //自己运动能量生成时间
var checkInMorning = false; // 运动能量收集状态
var G_可收取图片 = images.read("/sdcard/脚本/蚂蚁森林/take.png");

//1264557985

function tLog(msg) {
    toast(msg);
    console.log(msg)
}
/**
 * 获取权限和设置参数
 */
function prepareThings() {
    console.log("开始");
    setScreenMetrics(1080, 1920);
    //请求截图
    if (!requestScreenCapture()) {
        tLog("请求截图失败");
        exit();
    } else {
        tLog("请求截图ok");
    }
    //

}

function 解锁() {

    if (!device.isScreenOn()) {
        device.wakeUp();
        sleep(1500);
        swipe(540, 0, 540, 1920, 100);
        sleep(500);
        click(160, 160);
        sleep(500);
        KeyCode(15); //8
        sleep(300);
        KeyCode(16); //9
        sleep(300);
        KeyCode(14); //7
        sleep(300);
        KeyCode(12); //5
        sleep(2500);
        if (currentPackage() == "com.android.deskclock") {
            home();
            log("解锁完成");
            return true;
        } else {
            return false;
        }

    } else {
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
 * 获取截图
 */
function getCaptureImg() {
    var img0 = captureScreen();
    if (img0 == null || typeof(img0) == "undifined") {
        tLog("截图失败,退出脚本");
        exit();
    } else {
        return img0;
    }
}
/**
 * 默认程序出错提示操作
 */
function defaultException() {
    tLog("程序当前所处状态不合预期,脚本退出");
    exit();
}
/**
 * 等待加载收集能量页面,采用未找到指定组件阻塞的方式,等待页面加载完成
 */
function waitPage(type) {
    // 等待进入自己的能量主页
    if (type == 0) {
        className("android.widget.Button").desc("通知").findOne()
    }
    // 等待进入他人的能量主页
    else if (type == 1) {
        className("android.widget.Button").desc("浇水").findOne()
    }
    //再次容错处理
    sleep(1000);
}
/**
 * 进入蚂蚁森林我的主页
 */
function enterMyMainPage() {
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
    while (!textEndsWith("好友排行榜").exists() && i <= 5) {
        sleep(1000);
        i++;
    }
    if (i >= 5) {
        defaultException();
    }
}
/**
 * 从排行榜获取可收集好有的点击位置
 * @returns {*}
 */
function getHasEnergyfriend(type) {
    var img = getCaptureImg();
    var p = null;
    if (G_可收取图片 == null) {
        console.log("手机图片读取失败");
    };
    if (type == 1) {
        p = images.findImage(img, G_可收取图片, {
            region: [870, 200]
        });
    }
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
    while (textEndsWith("好友排行榜").exists()) {
        let 长度 = className("android.webkit.WebView").findOne().child(1).children().length
        //let 范围= className("android.webkit.WebView").findOne().child(1).child(长度-1).bounds()
        let 按钮内容 = className("android.webkit.WebView").findOne().child(1).child(长度 - 2).child(2).desc()
        let 按钮位置 = className("android.webkit.WebView").findOne().child(1).child(长度 - 2).child(2).bounds()
        log(按钮位置.centerY())
        //log(范围)
        log(按钮内容)
        if (按钮内容 == "邀请" && 按钮位置.centerY() < 1720) {
            return true;
        }

        return false;
    }
}
/**
 * 在排行榜页面,循环查找可收集好友
 * @returns {boolean}
 */
function enterOthers() {
    var ePoint = null;
    enterRank(); //进入排行榜
    //确保当前操作是在排行榜界面
    while (ePoint == null && textEndsWith("好友排行榜").findOne()) {
        //滑动排行榜 root方式的的点击调用.如无root权限,7.0及其以上可采用无障碍模式的相关函数
        ePoint = getHasEnergyfriend(1);
        if (ePoint != null) {
            //点击位置相对找图后的修正
            click(ePoint.x, ePoint.y + 20);
            waitPage(1);
            log("运行到这了");
            收取能量();
            back();
            //返回后递归调用
            ePoint = null;
        } else {
            //向下滑动
            className("android.webkit.WebView").findOne().scrollDown()
            sleep(100)
        }
        //检测是否排行榜结束了
        if (isRankEnd()) {
            back();
            sleep(1000);
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
    if (h >= 7 && m >= 35) {
        tLog("结束");
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
function 收取能量() {
    try {
        className("android.webkit.WebView").findOne().children().find(className("android.widget.Button").descStartsWith("收集能量")).
        forEach((child) => {
            let xy = child.bounds();
            press(xy.centerX(), xy.centerY(), 50)
        });
        sleep(800);
    } catch (error) {
        log(error);
    }
}

function test() {


    exit();
}
//程序主入口
function mainEntrence() {
    if (!解锁()) {
        exit();
    };
    prepareThings();
    while (true) {
        //从主页进入蚂蚁森林主页
        enterMyMainPage();
        waitForActivity("com.alipay.mobile.nebulacore.ui.H5Activity");
        收取能量(); //收自己的
        enterOthers(); //收集其他好友能量
        whenComplete();
        home();
        sleep(1000);
    };
}
mainEntrence();
// test();