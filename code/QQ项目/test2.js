var 查找列表 = className("android.widget.ListView").findOne(60000)
if (查找列表) {

        for (let index = 0; index < 500; index++) {
            查找列表 = className("android.widget.ListView").findOne()
            var 子集合 = 查找列表.children()
            log("列表序号:" + index)
            var element = 子集合[index];
            // log(element)
            // let 本次添加结果 = 进入后(robotinfo, element)
            // log("本次添加结果:")
            // log(本次添加结果)
            // if (本次添加结果.status) {
            //     re.status = true
            //     if (本次添加结果.message == "当前QQ机器人quota=0") {
            //         log("当前QQ机器人quota=0")
            //         re.message = "当前QQ机器人quota=0"
            //         return re
            //     } else if (本次添加结果.message == "关键词用完") {
            //         ///更新关键词
            //         log("关键词用完了")
            //         back(); // 回到首页
            //         return addStartWords(robotinfo)
            //     } else if (本次添加结果.message == "界外") {
            //         log("该元素在界外,不使用")
            //     } else {
            //         log("本次添加完成") /////////////////
            //     }
            // } else {
            //     log("出现添加错误") /////////////////
            // }
            while (true) {
                查找列表 = className("android.widget.ListView").findOne()
                子集合 = 查找列表.children()
                // log("列表序号:" + index)
                var element = 子集合[index];
                // element=
                if (element.bounds().bottom > device.height * 0.8) {
                    log("滑动")
                    // className("android.webkit.WebView").findOne().scrollDown()
                    swipe(device.width /2,device.height /3 *2 ,device.width /2,device.height /3 ,700 )
                    sleep(20)
                }else{
                    break
                }
                
            }
        }


    }