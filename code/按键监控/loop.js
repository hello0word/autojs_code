auto.waitFor()
var storage = storages.create("按键监控")
var 进程勾选 = storage.get("进程勾选",false)
var 状态勾选 = storage.get("状态勾选",false)
var 包名 = storage.get("包名","")
//com.com.aj.cheshi.soft
if (!requestScreenCapture()) {
    toastLog("请求截图失败");
    exit()
}

auto.waitFor()

function 查找进程(packagenames) {
    var 返回值 = shell("ps",true).result
    if (返回值.indexOf(packagenames)!=-1) {
        return true
    }
    var 返回值 = shell("ps -A",true).result
    if (返回值.indexOf(packagenames)!=-1) {
        return true
    }

    return false
}


function 检查运行状态() {
    var ss
    auto.windows.forEach((element) => {
        
        if (element.type == 1 && element.title == null) {
            
            ss = element.layer
        }
    })
    auto.setWindowFilter(function (window) {
        
        return window.layer == ss
    })
   
    var 根元素 = auto.windowRoots[0]
    if (根元素) {
        根元素 = 根元素.findOne(clickable())
        var 根元素个数 = 根元素.childCount()
        if (根元素个数 == 0) {
            click(根元素.bounds().centerX(), 根元素.bounds().centerY())
            sleep(1000)
        }
        var 可点元素个数 = clickable().find().length
        if (可点元素个数 == 5) {
            var 第一个按钮 = clickable().find()[0]
            for (let index = 0; index < 第一个按钮.childCount(); index++) {
                var 开始按钮 = 第一个按钮.child(index)
               
                if (index == 1) {
                    if (开始按钮.text() == "启动") {
                        第一个按钮.click()
                        toastLog("已点击启动")
                        return false
                    } else if (开始按钮.text() == "停止") {
                        toastLog("已启动")
                        return true
                    }
                }
            }

        }
    }else{
        toastLog("没有按键小精灵运行")
    }
}


while (true) {
    toast("监测中")
    if (进程勾选) {
        if (!查找进程(包名)) {
            //启动小精灵
            log(包名)
            app.launchPackage(包名)
            toastLog("等待启动功能按钮")
            var 启动功能= text("启动功能").clickable().findOne()
            if (启动功能) {
                启动功能.click()
                sleep(2000)
            }
        }else{
            toast("进程存在")
        }
    } 

    if (状态勾选) {
        if (!检查运行状态()) {
            //启动功能

        }
    } 

    sleep(5000)
}