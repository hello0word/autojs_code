auto;
var myEnergeType = ["线下支付", "行走", "共享单车", "地铁购票", "网络购票", "网购火车票", "生活缴费", "ETC缴费", "电子发票", "绿色办公", "咸鱼交易", "预约挂号"];
var morningTime = "7:15"; //自己运动能量生成时间
var checkInMorning = false; // 运动能量收集状态
var G_可收取图片 = images.read("/sdcard/脚本/keshuoqu.png");
function tLog(msg) {
    toast(msg);
    console.log(msg)
}
/**
 * 获取权限和设置参数
 */
function prepareThings() {
    console.log("开始");
    //setScreenMetrics(1080, 1920);
    //请求截图
    if (!requestScreenCapture()) {
        tLog("请求截图失败");
        exit();
    }else{
        tLog("请求截图ok");
    }
    //

}

function 解锁() {
    //解锁按键时间间隔
    var interval = 200;
    //如果屏幕没有唤醒,则唤醒
    device.wakeUpIfNeeded()
    sleep(1500);
    if (device.isScreenOn()) {
        swipe(520, 0, 520, 1800, 200);
        sleep(1000);
        click(200, 165);
        sleep(500);
        click(540, 1370);
        sleep(interval);
        click(870, 1370);
        sleep(interval);
        click(220, 1370);
        sleep(interval);
        click(540, 1170)
        sleep(1000);
        home();
        
    }
}

function killZFB() {
    var sh = new Shell(true);
    sh.exec("am force-stop com.eg.android.AlipayGphone");
    sleep(500);
    sh.exit;
};
/**
 * 设置按键监听 当脚本执行时候按音量减 退出脚本
 */
function registEvent() {
    //启用按键监听
    events.observeKey();
    //监听音量上键按下
    events.onKeyDown("volume_down", function (event) {
        tLog("脚本手动退出");
        exit();
    });
}
/**
 * 获取截图
 */
function getCaptureImg() {
    var img0 = captureScreen();
    if (img0 == null || typeof (img0) == "undifined") {
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
        desc("消息").findOne();
    }
    // 等待进入他人的能量主页
    else if (type == 1) {
        desc("浇水").findOne();
    }
    //再次容错处理
    sleep(1000);
}
/**
 * 从支付宝主页进入蚂蚁森林我的主页
 */
function enterMyMainPage() {
    launchApp("支付宝");
    tLog("等待支付宝启动");
    var i = 0;
    sleep(1000);
    //五次尝试蚂蚁森林入口
    while (!textEndsWith("蚂蚁森林").exists() && i <= 5) {
        sleep(2000);
        i++;
    }
    clickByText("蚂蚁森林", true, "请把蚂蚁森林入口添加到主页我的应用");
    //等待进入自己的主页
    waitPage(0);
}
/**
 * 进入排行榜
 */
function enterRank() {
    Swipe(520, 1860, 520, 100);
    sleep(2500);
    descEndsWith("查看更多好友").findOne().click();
    var i = 0;
    //等待排行榜主页出现
    sleep(2000);
    while (!textEndsWith("好友排行榜").exists() && i <= 5) {
        sleep(2000);
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
    if (descEndsWith("没有更多了").exists()) {
        var b = descEndsWith("没有更多了").findOne();
        var bs = b.bounds();
        if (bs.centerY() < 1920) {
            return true;
        }
    }
    return false;
}
/**
 * 在排行榜页面,循环查找可收集好友
 * @returns {boolean}
 */
function enterOthers() {
    //tLog("开始检查排行榜");

    var ePoint = null;
    enterRank();//进入排行榜
    //确保当前操作是在排行榜界面
    while (ePoint == null && textEndsWith("好友排行榜").findOne()) {
        //滑动排行榜 root方式的的点击调用.如无root权限,7.0及其以上可采用无障碍模式的相关函数
        ePoint = getHasEnergyfriend(1);
        if (ePoint != null) {
            //点击位置相对找图后的修正
            tLog("找到了")
            click(ePoint.x, ePoint.y + 20);
            waitPage(1);
            clickByDesc("可收取", 80);
            //进去收集完后,递归调用enterOthers
            back();
            sleep(500);
            //等待返回好有排行榜
            //textEndsWith("好友排行榜").findOne();
            //返回后递归调用
            ePoint = null;
        } else {
            //向下滑动
            Swipe(520, 1800, 520, 300, 1000);
            sleep(2000);
            
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
 * 根据描述值 点击
 * @param energyType
 * @param noFindExit
 */
function clickByDesc(energyType, paddingY, noFindExit, exceptionMsg) {
    if (descEndsWith(energyType).exists()) {
        descEndsWith(energyType).find().forEach(function (pos) {
            var posb = pos.bounds();
            Tap(posb.centerX(), posb.centerY() - paddingY);
            sleep(2000);
        });
    } else {
        if (noFindExit != null && noFindExit) {
            if (exceptionMsg != null) {
                tLog(exceptionMsg);
                exit();
            } else {
                defaultException();
            }
        }
    }
}
/**
 * 根据text值 点击
 * @param energyType
 * @param noFindExit
 */
function clickByText(energyType, noFindExit, exceptionMsg) {
    if (textEndsWith(energyType).exists()) {
        textEndsWith(energyType).find().forEach(function (pos) {
            var posb = pos.bounds();
            Tap(posb.centerX(), posb.centerY() - 60);
        });
    } else {
        if (noFindExit != null && noFindExit) {
            if (exceptionMsg != null) {
                tLog(exceptionMsg);
                exit();
            } else {
                defaultException();
            }
        }
    }
}
/**
 * 遍历能量类型,收集自己的能量
 */
function collectionMyEnergy() {
    var energyRegex = generateCollectionType();
    
    //如果是早上7点10分左右的话.等待主页能量出现 每隔一秒检测一次
    while (isMorningTime() && descEndsWith("行走").exists()) {
        if (!checkInMorning) {
            tLog("等待运动能量生成中...");
            checkInMorning = true;

        }
        descEndsWith("行走").find().forEach(function (pos) {
            var posb = pos.bounds();
            Tap(posb.centerX(), posb.centerY() - 80);
            sleep(1500);
        });
    }
    if (checkInMorning) {
        tLog("运动能量收集完成");
    }
    if (descMatches(energyRegex).exists()) {
        if (!checkInMorning) {
            tLog("防止小树的提示遮挡,等待中");
            sleep(7000);
        }
        descMatches(energyRegex).find().forEach(function (pos) {
            var posb = pos.bounds();
            Tap(posb.centerX(), posb.centerY() - 80);
            sleep(2000);
        });
    }
}
/**
 * 结束后返回主页面
 */
function whenComplete() {
    var now = new Date();
    h = now.getHours();
    m = now.getMinutes();
    if(h >= 7 && m >= 35){
        tLog("结束");
        killZFB();
        exit();
    }
}
/**
 * 根据能量类型数组生成我的能量类型正则查找字符串
 * @returns {string}
 */
function generateCollectionType() {
    var regex = "/";
    myEnergeType.forEach(function (t, num) {
        if (num == 0) {
            regex += "(\\s*" + t + "$)";
        } else {
            regex += "|(\\s*" + t + "$)";
        }
    });
    regex += "/";
    return regex;
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
function 前置操作() {
    解锁();
    //前置操作
    
    //注册音量下按下退出脚本监听
    //registEvent();

}

function test() {
    //前置操作();
    //enterOthers();
    requestScreenCapture();

    exit();
}
//程序主入口
function mainEntrence() {
    prepareThings();
    
    //前置操作  包括解锁
    前置操作();
    killZFB();
    console.log("前置操作完成");
    //从主页进入蚂蚁森林主页
    enterMyMainPage();
    
    
    while(true){
        if (isMorningTime() && !checkInMorning ) {
            tLog("检查自己的");
            swipe(520, 300,520, 1800,100);
            sleep(500);
            sleep(1500);
            collectionMyEnergy();//收集自己的能量
        }else{
            
            enterOthers();//收集其他好友能量

        }
        whenComplete();
    };
}
     mainEntrence();
//test();