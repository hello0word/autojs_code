auto.waitFor()
log(device)
toastLog("开始运行")
var gesturesAry = [
    [
        [0, 501, [788 / 1080 * device.width, 1572 / 1920 * device.height],
            [788 / 1080 * device.width, 1572 / 1920 * device.height],
            [784 / 1080 * device.width, 1552 / 1920 * device.height],
            [776 / 1080 * device.width, 1509 / 1920 * device.height],
            [775 / 1080 * device.width, 1489 / 1920 * device.height],
            [767 / 1080 * device.width, 1448 / 1920 * device.height],
            [767 / 1080 * device.width, 1428 / 1920 * device.height],
            [763 / 1080 * device.width, 1390 / 1920 * device.height],
            [762 / 1080 * device.width, 1374 / 1920 * device.height],
            [762 / 1080 * device.width, 1342 / 1920 * device.height],
            [762 / 1080 * device.width, 1320 / 1920 * device.height],
            [762 / 1080 * device.width, 1304 / 1920 * device.height],
            [762 / 1080 * device.width, 1286 / 1920 * device.height],
            [767 / 1080 * device.width, 1266 / 1920 * device.height],
            [770 / 1080 * device.width, 1245 / 1920 * device.height],
            [775 / 1080 * device.width, 1220 / 1920 * device.height],
            [778 / 1080 * device.width, 1204 / 1920 * device.height],
            [784 / 1080 * device.width, 1176 / 1920 * device.height],
            [790 / 1080 * device.width, 1157 / 1920 * device.height],
            [795 / 1080 * device.width, 1138 / 1920 * device.height],
            [797 / 1080 * device.width, 1126 / 1920 * device.height],
            [803 / 1080 * device.width, 1104 / 1920 * device.height],
            [806 / 1080 * device.width, 1095 / 1920 * device.height],
            [811 / 1080 * device.width, 1079 / 1920 * device.height],
            [811 / 1080 * device.width, 1072 / 1920 * device.height],
            [812 / 1080 * device.width, 1058 / 1920 * device.height],
            [818 / 1080 * device.width, 1046 / 1920 * device.height],
            [824 / 1080 * device.width, 1034 / 1920 * device.height],
            [830 / 1080 * device.width, 1018 / 1920 * device.height],
            [836 / 1080 * device.width, 1003 / 1920 * device.height],
            [844 / 1080 * device.width, 980 / 1920 * device.height],
            [848 / 1080 * device.width, 970 / 1920 * device.height],
            [854 / 1080 * device.width, 957 / 1920 * device.height],
            [861 / 1080 * device.width, 940 / 1920 * device.height],
            [864 / 1080 * device.width, 931 / 1920 * device.height],
            [868 / 1080 * device.width, 912 / 1920 * device.height],
            [871 / 1080 * device.width, 903 / 1920 * device.height],
            [876 / 1080 * device.width, 886 / 1920 * device.height],
            [882 / 1080 * device.width, 869 / 1920 * device.height],
            [888 / 1080 * device.width, 852 / 1920 * device.height],
            [898 / 1080 * device.width, 832 / 1920 * device.height],
            [908 / 1080 * device.width, 813 / 1920 * device.height],
            [920 / 1080 * device.width, 794 / 1920 * device.height],
            [929 / 1080 * device.width, 776 / 1920 * device.height],
            [937 / 1080 * device.width, 758 / 1920 * device.height],
            [947 / 1080 * device.width, 746 / 1920 * device.height],
            [955 / 1080 * device.width, 734 / 1920 * device.height],
            [966 / 1080 * device.width, 718 / 1920 * device.height],
            [970 / 1080 * device.width, 710 / 1920 * device.height],
            [976 / 1080 * device.width, 702 / 1920 * device.height],
            [980 / 1080 * device.width, 696 / 1920 * device.height]
        ]
    ],
    [
        [0, 2501, [788 / 1080 * device.width, 1572 / 1920 * device.height],
            [788 / 1080 * device.width, 1572 / 1920 * device.height],
            [784 / 1080 * device.width, 1552 / 1920 * device.height],
            [776 / 1080 * device.width, 1509 / 1920 * device.height],
            [775 / 1080 * device.width, 1489 / 1920 * device.height],
            [767 / 1080 * device.width, 1448 / 1920 * device.height],
            [767 / 1080 * device.width, 1428 / 1920 * device.height],
            [763 / 1080 * device.width, 1390 / 1920 * device.height],
            [762 / 1080 * device.width, 1374 / 1920 * device.height],
            [762 / 1080 * device.width, 1342 / 1920 * device.height],
            [762 / 1080 * device.width, 1320 / 1920 * device.height],
            [762 / 1080 * device.width, 1304 / 1920 * device.height],
            [762 / 1080 * device.width, 1286 / 1920 * device.height],
            [767 / 1080 * device.width, 1266 / 1920 * device.height],
            [770 / 1080 * device.width, 1245 / 1920 * device.height],
            [775 / 1080 * device.width, 1220 / 1920 * device.height],
            [778 / 1080 * device.width, 1204 / 1920 * device.height],
            [784 / 1080 * device.width, 1176 / 1920 * device.height],
            [790 / 1080 * device.width, 1157 / 1920 * device.height],
            [795 / 1080 * device.width, 1138 / 1920 * device.height],
            [797 / 1080 * device.width, 1126 / 1920 * device.height],
            [803 / 1080 * device.width, 1104 / 1920 * device.height],
            [806 / 1080 * device.width, 1095 / 1920 * device.height],
            [811 / 1080 * device.width, 1079 / 1920 * device.height],
            [811 / 1080 * device.width, 1072 / 1920 * device.height],
            [812 / 1080 * device.width, 1058 / 1920 * device.height],
            [818 / 1080 * device.width, 1046 / 1920 * device.height],
            [824 / 1080 * device.width, 1034 / 1920 * device.height],
            [830 / 1080 * device.width, 1018 / 1920 * device.height],
            [836 / 1080 * device.width, 1003 / 1920 * device.height],
            [844 / 1080 * device.width, 980 / 1920 * device.height],
            [848 / 1080 * device.width, 970 / 1920 * device.height],
            [854 / 1080 * device.width, 957 / 1920 * device.height],
            [861 / 1080 * device.width, 940 / 1920 * device.height],
            [864 / 1080 * device.width, 931 / 1920 * device.height],
            [868 / 1080 * device.width, 912 / 1920 * device.height],
            [871 / 1080 * device.width, 903 / 1920 * device.height],
            [876 / 1080 * device.width, 886 / 1920 * device.height],
            [882 / 1080 * device.width, 869 / 1920 * device.height],
            [888 / 1080 * device.width, 852 / 1920 * device.height],
            [898 / 1080 * device.width, 832 / 1920 * device.height],
            [908 / 1080 * device.width, 813 / 1920 * device.height],
            [920 / 1080 * device.width, 794 / 1920 * device.height],
            [929 / 1080 * device.width, 776 / 1920 * device.height],
            [937 / 1080 * device.width, 758 / 1920 * device.height],
            [947 / 1080 * device.width, 746 / 1920 * device.height],
            [955 / 1080 * device.width, 734 / 1920 * device.height],
            [966 / 1080 * device.width, 718 / 1920 * device.height],
            [970 / 1080 * device.width, 710 / 1920 * device.height],
            [976 / 1080 * device.width, 702 / 1920 * device.height],
            [980 / 1080 * device.width, 696 / 1920 * device.height]
        ]
    ],
    [
        [0, 2501, [788 / 1080 * device.width, 1572 / 1920 * device.height],
            [788 / 1080 * device.width, 1572 / 1920 * device.height],
            [784 / 1080 * device.width, 1552 / 1920 * device.height],
            [776 / 1080 * device.width, 1509 / 1920 * device.height],
            [775 / 1080 * device.width, 1489 / 1920 * device.height],
            [767 / 1080 * device.width, 1448 / 1920 * device.height],
            [767 / 1080 * device.width, 1428 / 1920 * device.height],
            [763 / 1080 * device.width, 1390 / 1920 * device.height],
            [762 / 1080 * device.width, 1374 / 1920 * device.height],
            [762 / 1080 * device.width, 1342 / 1920 * device.height],
            [762 / 1080 * device.width, 1320 / 1920 * device.height],
            [762 / 1080 * device.width, 1304 / 1920 * device.height],
            [762 / 1080 * device.width, 1286 / 1920 * device.height],
            [767 / 1080 * device.width, 1266 / 1920 * device.height],
            [770 / 1080 * device.width, 1245 / 1920 * device.height],
            [775 / 1080 * device.width, 1220 / 1920 * device.height],
            [778 / 1080 * device.width, 1204 / 1920 * device.height],
            [784 / 1080 * device.width, 1176 / 1920 * device.height],
            [790 / 1080 * device.width, 1157 / 1920 * device.height],
            [795 / 1080 * device.width, 1138 / 1920 * device.height],
            [797 / 1080 * device.width, 1126 / 1920 * device.height],
            [803 / 1080 * device.width, 1104 / 1920 * device.height],
            [806 / 1080 * device.width, 1095 / 1920 * device.height],
            [811 / 1080 * device.width, 1079 / 1920 * device.height],
            [811 / 1080 * device.width, 1072 / 1920 * device.height],
            [812 / 1080 * device.width, 1058 / 1920 * device.height],
            [818 / 1080 * device.width, 1046 / 1920 * device.height],
            [824 / 1080 * device.width, 1034 / 1920 * device.height],
            [830 / 1080 * device.width, 1018 / 1920 * device.height],
            [836 / 1080 * device.width, 1003 / 1920 * device.height],
            [844 / 1080 * device.width, 980 / 1920 * device.height],
            [848 / 1080 * device.width, 970 / 1920 * device.height],
            [854 / 1080 * device.width, 957 / 1920 * device.height],
            [861 / 1080 * device.width, 940 / 1920 * device.height],
            [864 / 1080 * device.width, 931 / 1920 * device.height],
            [868 / 1080 * device.width, 912 / 1920 * device.height],
            [871 / 1080 * device.width, 903 / 1920 * device.height],
            [876 / 1080 * device.width, 886 / 1920 * device.height],
            [882 / 1080 * device.width, 869 / 1920 * device.height],
            [888 / 1080 * device.width, 852 / 1920 * device.height],
            [898 / 1080 * device.width, 832 / 1920 * device.height],
            [908 / 1080 * device.width, 813 / 1920 * device.height],
            [920 / 1080 * device.width, 794 / 1920 * device.height],
            [929 / 1080 * device.width, 776 / 1920 * device.height],
            [937 / 1080 * device.width, 758 / 1920 * device.height],
            [947 / 1080 * device.width, 746 / 1920 * device.height],
            [955 / 1080 * device.width, 734 / 1920 * device.height],
            [966 / 1080 * device.width, 718 / 1920 * device.height],
            [970 / 1080 * device.width, 710 / 1920 * device.height],
            [976 / 1080 * device.width, 702 / 1920 * device.height],
            [980 / 1080 * device.width, 696 / 1920 * device.height]
        ]
    ],
    [
        [0, 2501, [788 / 1080 * device.width, 1572 / 1920 * device.height],
            [788 / 1080 * device.width, 1572 / 1920 * device.height],
            [784 / 1080 * device.width, 1552 / 1920 * device.height],
            [776 / 1080 * device.width, 1509 / 1920 * device.height],
            [775 / 1080 * device.width, 1489 / 1920 * device.height],
            [767 / 1080 * device.width, 1448 / 1920 * device.height],
            [767 / 1080 * device.width, 1428 / 1920 * device.height],
            [763 / 1080 * device.width, 1390 / 1920 * device.height],
            [762 / 1080 * device.width, 1374 / 1920 * device.height],
            [762 / 1080 * device.width, 1342 / 1920 * device.height],
            [762 / 1080 * device.width, 1320 / 1920 * device.height],
            [762 / 1080 * device.width, 1304 / 1920 * device.height],
            [762 / 1080 * device.width, 1286 / 1920 * device.height],
            [767 / 1080 * device.width, 1266 / 1920 * device.height],
            [770 / 1080 * device.width, 1245 / 1920 * device.height],
            [775 / 1080 * device.width, 1220 / 1920 * device.height],
            [778 / 1080 * device.width, 1204 / 1920 * device.height],
            [784 / 1080 * device.width, 1176 / 1920 * device.height],
            [790 / 1080 * device.width, 1157 / 1920 * device.height],
            [795 / 1080 * device.width, 1138 / 1920 * device.height],
            [797 / 1080 * device.width, 1126 / 1920 * device.height],
            [803 / 1080 * device.width, 1104 / 1920 * device.height],
            [806 / 1080 * device.width, 1095 / 1920 * device.height],
            [811 / 1080 * device.width, 1079 / 1920 * device.height],
            [811 / 1080 * device.width, 1072 / 1920 * device.height],
            [812 / 1080 * device.width, 1058 / 1920 * device.height],
            [818 / 1080 * device.width, 1046 / 1920 * device.height],
            [824 / 1080 * device.width, 1034 / 1920 * device.height],
            [830 / 1080 * device.width, 1018 / 1920 * device.height],
            [836 / 1080 * device.width, 1003 / 1920 * device.height],
            [844 / 1080 * device.width, 980 / 1920 * device.height],
            [848 / 1080 * device.width, 970 / 1920 * device.height],
            [854 / 1080 * device.width, 957 / 1920 * device.height],
            [861 / 1080 * device.width, 940 / 1920 * device.height],
            [864 / 1080 * device.width, 931 / 1920 * device.height],
            [868 / 1080 * device.width, 912 / 1920 * device.height],
            [871 / 1080 * device.width, 903 / 1920 * device.height],
            [876 / 1080 * device.width, 886 / 1920 * device.height],
            [882 / 1080 * device.width, 869 / 1920 * device.height],
            [888 / 1080 * device.width, 852 / 1920 * device.height],
            [898 / 1080 * device.width, 832 / 1920 * device.height],
            [908 / 1080 * device.width, 813 / 1920 * device.height],
            [920 / 1080 * device.width, 794 / 1920 * device.height],
            [929 / 1080 * device.width, 776 / 1920 * device.height],
            [937 / 1080 * device.width, 758 / 1920 * device.height],
            [947 / 1080 * device.width, 746 / 1920 * device.height],
            [955 / 1080 * device.width, 734 / 1920 * device.height],
            [966 / 1080 * device.width, 718 / 1920 * device.height],
            [970 / 1080 * device.width, 710 / 1920 * device.height],
            [976 / 1080 * device.width, 702 / 1920 * device.height],
            [980 / 1080 * device.width, 696 / 1920 * device.height]
        ]
    ]
];

function 下滑() {
    var 随机数 = random(0, gesturesAry.length - 1)
    // log(随机数)
    gestures.apply(null, gesturesAry[随机数]);
    sleep(400);
}
threads.start(function () {
    events.observeKey(); //监听音量上键按下 
    events.onKeyDown("volume_up",
        function (event) {
            toastLog("音量上键被按下了,退出");
            exit()
        })
})
threads.start(function () {
    events.observeKey(); //监听音量上键按下 
    events.onKeyDown("volume_down",
        function (event) {
            toastLog("音量下键被按下了,退出");
            exit()
        })
})

var 运行次数, storage = storages.create("阅读")

function 开始() {
    运行次数 = parseInt( storage.get("运行次数", "30"))
    log("运行次数:" + 运行次数)
    var 功能 = parseInt(storage.get("功能", 1))
    var 激活码 = storage.get("激活码", "")
    if (激活码) {
        if (激活码 != "kqweqiwepufgjksadjk18237103") {
            注册(激活码, "20572", "ubjoyhpxbnk3dw4pl8")// 只需要调用一遍,
        }
    } else {
        var split_data = 试用("20572", "ubjoyhpxbnk3dw4pl8")
        if (split_data[0] == "1") {
            alert("试用到期时间", split_data[1])
        } else if (split_data[0] == "2") {
            switch (split_data[1]) {

                case "appcode_trial_ban":
                    alert("试用失败", "出错了")
                    exit()
                    break;

                case "mac_trial_lack":
                    alert("试用失败", "试用次数已用完,请联系客服获取激活码")
                    exit()
                    break;

                case "mac_trial_expire":
                    alert("试用失败", "试用时间已用完,请联系客服获取激活码")
                    exit()
                    break;

                default:
                    toastLog("未知异常")
                    exit()
            }
        }
    }
    // log("功能开启")
    switch (功能) {
        case 0:
            趣看天下()
            break;
        case 1:
            闪电盒子()
            break;
        default:
            log("功能:" + 功能)
    }
}


function 趣看天下() {
    log("趣看天下")
    var 开始x, 开始y, h = 0
    launchApp("趣看天下");
    开始x = 409;
    开始y = 445;

    sleep(4000);
    waitForActivity("com.yanhui.qktx.activity.MainActivity")
    toast("等待完成")
    for (var index = 0; index < parseInt(运行次数); index++) {
        sleep(2500)
        let temp
        var romx = random(2, 6);
        var romy = random(5, 15);
        log("点击前活动:" + currentActivity())
        temp = press(开始x / 1080 * device.width + romx, 开始y / 1920 * device.height + romy, 400);
        log(temp)
        toastLog("点击完成，等待4秒")
        sleep(4000);
        log("点击后活动:" + currentActivity())
        var 随机滑动次数 = random(5, 10)
        toastLog("随机次数" + 随机滑动次数)
        for (var i = 0; i < 15; i++) {
            h = h + 1
            sleep(random(5, 8) * 1000);
            下滑()
            sleep(900);
            if (desc("展开查看全文").exists() || text("展开查看全文").exists()) {
                toastLog("找到查看全文,点击")
                let a = desc("展开查看全文").findOne(10)
                a ? a.click() : null;
                let b = text("展开查看全文").findOne(10)
                b ? b.click() : null;
            };
            sleep(900);
            if (desc("相关资讯").exists() || text("相关资讯").exists()) {
                let 朋友圈 = text("相关资讯").findOne(200)
                if (朋友圈) {
                    if (朋友圈.bounds().top < device.height / 2) {
                        sleep(900);
                        toastLog("找到相关资讯,返回")
                        back()
                    }
                } else {
                    log("没找到")
                }

            };
            if (desc("朋友圈").exists() || text("朋友圈").exists()) {
                let 朋友圈 = text("朋友圈").findOne(200)
                if (朋友圈) {
                    if (朋友圈.bounds().top < device.height / 2) {
                        sleep(900);
                        toastLog("找到朋友圈,返回")
                        back()
                    }
                } else {
                    log("没找到")
                }

            }
            if (h > 随机滑动次数) {
                h = 0
                toastLog("大于" + 随机滑动次数 + "次，返回")
                sleep(1000);
                back()
                sleep(random(3, 8) * 1000)
                下滑()

                break;

            }
        };
    }
}

function 闪电盒子() {
    log("闪电盒子")
    var 开始x, 开始y, h = 0
    var appNam = "闪电盒子"
    launchApp(appNam);
    var 应用包名 = app.getPackageName(appNam)
    开始x = 619;
    开始y = 725;
    sleep(4000);
    waitForActivity(应用包名 + ".views.AppBoxHomeActivity")
    toastLog("等待完成")
    threads.start(function () {
        function 错误处理() {
            for (let index = 0; index < 3; index++) {
                back()
                sleep(3000)
                if (currentPackage() == 应用包名) {
                    return true
                }
            }
            return false
        }
        while (true) {
            sleep(2000)
            if (currentPackage() != 应用包名) {
                if (text("禁止").exists()) {
                    click("禁止")
                    sleep(1000)
                    back()

                }
                if (!错误处理) {
                    toastLog("返回到应用失败,退出")
                    exit()
                }

            }
        }
    })
    log("监控线程启动完成")
    var 红包随机数 = random(1, 3), 红包计数器 = 0
    for (var index = 0; index < parseInt(运行次数); index++ , 红包计数器++) {
        toastLog(红包随机数 - 红包计数器 + "次后领取红包")
        if (红包计数器 >= 红包随机数) {
            log("领取红包")
            红包随机数 = random(6, 10)
            红包计数器 = 0
            sleep(2000)
            // toastLog("点击位置为998,1397")
            log("点击前活动:" + currentActivity())
            press(1010 / 1080 * device.width, 1397 / 1920 * device.height, 400)
            sleep(2000)
            log("点击后活动:" + currentActivity())
            back()
            sleep(2000)
        }
        sleep(2500)
        let temp //= Tap(409, 445);
        log("点击前活动:" + currentActivity())
        var romx = random(2, 6);
        var romy = random(5, 15);
        temp = press(开始x / 1080 * device.width + romx, 开始y / 1920 * device.height + romy, 400);
        toastLog("点击完成，等待4秒")
        sleep(4000);
        log("点击后活动:" + currentActivity())
        var 随机滑动次数 = random(5, 10)
        toastLog("随机次数" + 随机滑动次数)
        for (var i = 0; i < 7; i++) {
            h = h + 1
            sleep(random(5, 8) * 1000);
            下滑()
            sleep(900);
            if (desc("展开查看全文").exists() || text("展开查看全文").exists()) {
                toastLog("找到查看全文,点击")
                let a = desc("展开查看全文").findOne(10)
                a ? a.click() : null;
                let b = text("展开查看全文").findOne(10)
                b ? b.click() : null;
            };
            sleep(900);
            if (desc("相关资讯").exists() || text("相关资讯").exists()) {
                let 朋友圈 = text("相关资讯").findOne(200)
                if (朋友圈) {
                    if (朋友圈.bounds().top < device.height / 2) {
                        sleep(900);
                        toastLog("找到相关资讯,返回")
                        back()
                    }
                } else {
                    log("没找到")
                }

            };
            if (desc("朋友圈").exists() || text("朋友圈").exists()) {
                let 朋友圈 = text("朋友圈").findOne(200)
                if (朋友圈) {
                    if (朋友圈.bounds().top < device.height / 2) {
                        sleep(900);
                        toastLog("找到朋友圈,返回")
                        back()
                    }
                } else {
                    log("没找到")
                }

            }
            if (h > 随机滑动次数) {
                h = 0
                toastLog("大于" + 随机滑动次数 + "次，返回")
                sleep(1000);
                back()
                sleep(random(3, 8) * 1000)
                下滑()

                break;

            }
        };
    }
}

function 试用(软件编号, 传输密码) {
    var 机器码, 动态随机数, P_httpurl, sign
    var md5 = (string) => java.math.BigInteger(1, java.security.MessageDigest.getInstance("MD5").digest(java.lang.String(string).getBytes())).toString(16);
    P_httpurl = "http://v1.27yz.net/HttpApi.ashx?action="
    机器码 = device.getAndroidId()
    动态随机数 = random(1, 999999)
    sign = md5(软件编号 + 机器码 + 动态随机数 + 传输密码)
    try {
        var httpdata = http.post(P_httpurl + "Trial", data = { "AppCode": 软件编号, "Machine": 机器码, "cd": 动态随机数, "Sign": sign })

        var split_data = httpdata.body.string().split("|")
        // log(split_data)
        return split_data
    } catch (error) {

    }
}

/**
 * 
 * @param { String } 注册码 
 * @param { String } P_AppCode 软件编号
 * @param { String } P_TranPwd 传输密码
 */
function 注册(注册码, P_AppCode, P_TranPwd) {
    var P_httpurl, P_AppCode, P_TranPwd, P_Machine, 注册码, 验证返回, 登录使用的随机数, 校验类型
    var print01
    var isreg
    P_Machine = device.getAndroidId() //唯一标识
    类型 = 1
    登录使用的随机数 = random(1, 999999)

    P_httpurl = "http://v1.27yz.net/HttpApi.ashx?action="
    if (!注册码) {
        toastLog("退出");
        exit();
    };
    log("注册码:" + 注册码)
    var md5 = (string) => java.math.BigInteger(1, java.security.MessageDigest.getInstance("MD5").digest(java.lang.String(string).getBytes())).toString(16);

    if (Reg(注册码, 登录使用的随机数)) {
        threads.start(效验线程)
    } else {
        toastLog('注册失败');
        exit()
    }

    function Reg(UserCode, 随机数) {
        var httpdata, sign, cd
        var yuanshi = UserCode + P_AppCode + P_Machine + 随机数 + P_TranPwd
        var sign = md5(yuanshi)
        var httpdata = http.post(P_httpurl + "Reg", data = { "UserCode": UserCode, "AppCode": P_AppCode, "Machine": P_Machine, "cd": 随机数, "Sign": sign })
        httpdata = httpdata.body.string()
        log(httpdata)
        分割后 = httpdata.split("|")
        if (分割后.length == 4) {
            if (分割后[0] == "1") {
                log("注册成功")
                if (md5(sign + 随机数 + 分割后[1] + 分割后[2] + P_TranPwd) == 分割后[3]) {
                    toastLog("到期时间: " + 分割后[1])
                    sleep(1000)
                    return true
                } else {
                    toastLog("系统登录效验错误")
                    sleep(1000)
                    return false
                }
            } else {
                toastLog("系统登录效验错误")
                sleep(1000)
                return false
            }
        } else {
            return false
        }
    }


    function 效验线程() {
        while (true) {
            var 获取状态返回值
            if (类型 == 1) {
                获取状态返回值 = 云状态效验(注册码, 1, 登录使用的随机数, P_AppCode, P_Machine, P_TranPwd)
            } else {
                获取状态返回值 = 云状态效验(注册码, 3, 登录使用的随机数, P_AppCode, P_Machine, P_TranPwd)
            }
            if (获取状态返回值 == 1) {
                log("脚本停止")
                exit()
            } else {
                sleep(1000 * 5)
            }
        }
    }

    function 云状态效验(注册码, 类型, 注册试用时随机数, P_AppCode, P_Machine, P_TranPwd) {
        var 云校验返回值, 分割返回值, 校验信息
        云校验返回值 = CheckStatus(注册码, 类型, 注册试用时随机数, P_AppCode, P_Machine, P_TranPwd)
        // log(云校验返回值)
        if (云校验返回值 == "2|user_error") {
            toastLog("云校验错误 用户名/注册码错误")
        } else if (云校验返回值 == "2|mac_error") {
            toastLog("云校验错误 机器码试用不存在")
        } else {
            分割返回值 = 云校验返回值.split("|")
            校验信息 = 分割返回值[1]
            if (校验信息 == "0") {
                log("软件使用正常")

            } else if (校验信息 == "2") {
                log(云校验返回值)
            } else if (校验信息 == "1") {
                toastLog("软件到期")
                sleep(3000)
                exit()
            }
            else if (校验信息 == "3") {
                toastLog("其他机器已经注册此注册码")
                sleep(3000)
                exit()
            }
            else if (校验信息 == "5") {
                toastLog("此注册码已经被锁定")
                sleep(3000)
                exit()
            }
            else if (校验信息 == "6") {
                toastLog("软件停止服务")
                sleep(3000)
                exit()
            }
            else if (校验信息 == "7") {
                toastLog("机器码或IP被封停")
                sleep(3000)
                exit()
            }
        }
    }




    function CheckStatus(UserCode, Types, ucd, P_AppCode, P_Machine, P_TranPwd) { //云状态效验
        var httpdata, sign, cd
        cd = random(1, 999999)
        if (Types == 3) {
            UserCode = ""
        }
        sign = md5(UserCode + Types + P_AppCode + P_Machine + ucd + cd + P_TranPwd)
        httpdata = http.post("http://v1.27yz.net/HttpApi.ashx?action=CheckStatus", data = { "User": UserCode, "Types": Types, "AppCode": P_AppCode, "Machine": P_Machine, "ucd": ucd, "cd": cd, "Sign": sign })
        return httpdata.body.string()
    }



}


开始()
// while (true) {
//     sleep(1000)
//     下滑()
// }
