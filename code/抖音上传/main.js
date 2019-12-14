function 打开抖音上传视频() {
    var 抖音包名 = app.getPackageName("抖音短视频")
    log(抖音包名)
    function 打开抖音() {
        for (let index = 0; index < 5; index++) {

            app.startActivity({
                packageName: 抖音包名,
                className: "com.ss.android.ugc.aweme.main.MainActivity",
                action: "android.intent.action.VIEW",
                root: true,
                flags: ["activity_new_task"],
            })
            log("循环")

            var 拍摄按钮 = desc("拍摄，按钮").findOne(10000)
            if (拍摄按钮) {
                log("抖音打开成功")
                return true
            } else {
                app.openAppSetting(抖音包名)
                log("查找强行停止")
                text("强行停止").findOne().click()
                let qd = text("确定").findOne(2000)
                qd ? qd.click() : log("已关闭")
                sleep(2000)
            }
            sleep(1000)
        }
        return false
    }

    function 有多段视频的按钮的视频选择() {
        var 视频列表 = className("android.support.v7.widget.RecyclerView").depth(9).findOne(15000)
        if (视频列表) {
            let 图片按钮 = text("图片").clickable().findOne(5000)
            if (图片按钮) {
                log("找到图片按钮")
                图片按钮.click()
                sleep(2000)
                return 随机在当前图片表里选5到7张图片()
            }
        }
    }


    function 有可同时选择视频与图片和下一步按钮的视频选择() {
        var 视频列表 = className("android.support.v7.widget.RecyclerView").depth(9).findOne(15000)
        if (视频列表) {
            let 图片按钮 = text("图片").clickable().findOne(5000)
            if (图片按钮) {
                log("找到图片按钮")
                图片按钮.click()
                sleep(2000)
                return 随机在当前图片表里选5到7张图片()
            }
        }
    }

    function 选择PIC文件夹(){
        log("正在选择PIC文件夹")
        var 所有照片 = text("所有照片").findOne(1000)
        if (所有照片) {
            log("找到所有照片")
            所有照片.parent().click()
            while(true){
                var 图片文件夹列表=  className("android.support.v7.widget.RecyclerView").depth(7).findOne(1000)
                if (图片文件夹列表) {
                    let PIC文件夹 = text("PIC").findOne(500)
                    if (PIC文件夹) {
                        PIC文件夹.parent().click()
                        return true
                    }
                    let 能滑动= 图片文件夹列表.scrollForward()
                    if (!能滑动) {
                        return false
                    }
                }else{
                    log("找不到图片文件夹列表")
                    return false 
                }
            }
        }else{
            log("找不到所有照片")
        }
    
    
    }
    function 随机在当前图片表里选5到7张图片() {
        if (!选择PIC文件夹()) {
            return false
        } 
        
        var 需要个数 = random(5, 7)
        var 已勾选 = []
        var 已成功勾选 = []
        var 上一次勾选的图片序号 = null
        log("需要个数:" + 需要个数)
        while (true) {
            let 图片容器 = className("android.support.v7.widget.RecyclerView").depth(10).findOne(5000)
            let 所有图片 = 图片容器.find(clickable().className("android.widget.FrameLayout"))

            if (上一次勾选的图片序号 != null && 所有图片[上一次勾选的图片序号].child(0).text() != "" && 已成功勾选.indexOf(上一次勾选的图片序号) == -1) {
                log(上一次勾选的图片序号 + "勾选成功")
                已成功勾选.push(上一次勾选的图片序号)
            } else {
                if (上一次勾选的图片序号) {
                    log(所有图片[上一次勾选的图片序号].child(0).text())
                    log(已成功勾选.indexOf(上一次勾选的图片序号))
                    log(上一次勾选的图片序号 + "勾选失败")
                }
            }
            if (已成功勾选.length >= 需要个数) {
                log("全部勾选完毕")
                return 1;
            }
            if (已勾选.length >= 所有图片.length) {
                log("能勾选的图片不足")
                return 1;
            }
            var 随机
            while (true) {
                if (已勾选.length >= 所有图片.length) {
                    break
                }
                随机 = random(0, 所有图片.length - 1)
                if (已勾选.indexOf(随机) == -1) {
                    break;
                }
            }

            log("随机:" + 随机)
            if (已勾选.indexOf(随机) == -1) {
                log("勾选:" + 随机)
                已勾选.push(随机)
                let element = 所有图片[随机]
                if (element) { element.click(); log(随机 + "已点击") } else { log(随机 + ":为空") }

            } else {
                log(随机 + "已勾选")
            }
            上一次勾选的图片序号 = 随机
            sleep(400)
        }
    }
    //
    function 视频选择() {
        var 拍摄按钮 = desc("拍摄，按钮").findOne(10000)
        if (拍摄按钮) {
            log("找到拍摄按钮")

            拍摄按钮.parent().parent().parent().click()
        } else {
            log("找不到拍摄按钮")
            return 1
        }
        sleep(2000)
        var 上传按钮 = text("上传").findOne(15000)
        if (上传按钮) {
            log("找到上传按钮")

            上传按钮.parent().parent().click()
        } else {
            log("找不到上传按钮")
            return 2
        }
        sleep(8000)
        var 视频列表 = className("android.support.v7.widget.RecyclerView").depth(9).findOne(15000)
        if (视频列表) {
            log("找到视频列表")
            if (text("多段视频").exists()) {
                log("多段视频视频选择")
                var 返回 = 有多段视频的按钮的视频选择()
                if (返回 == 3) {
                    return 3// 视频处理完成
                } else if (返回 == 1) {
                    log("本次选择视频ok")
                    let 照片电影 = textStartsWith("照片电影").findOne(3000)
                    if (照片电影) {
                        照片电影.click()
                        sleep(5000)
                    }
                } else {
                    // log()
                }
            } else if (text("可同时选视频与图片").exists()) {
                log("可同时选视频与图片")
                var 返回 = 有可同时选择视频与图片和下一步按钮的视频选择()
                if (返回 == 3) {
                    return 3// 视频处理完成
                } else if (返回 == 1) {
                    log("本次ok")
                    let 照片电影 = textStartsWith("照片电影").findOne(3000)
                    if (照片电影) {
                        照片电影.click()
                        sleep(5000)
                    }
                } else {
                    log("本次错误,重启本脚本")
                    let path = engines.myEngine().source.toString();
                    engines.execScriptFile(path)
                    toast("重新运行,当前悬浮窗关闭")
                    console.hide()
                    exit()
                    return 40
                }
            } else {
                log("设备未匹配")
            }
        } else {
            log("找不到视频列表")

        }
        sleep(2000)
        for (let index = 0; index < 3; index++) {
            var 剪切页下一步 = text("下一步").clickable().findOne(10000)
            if (剪切页下一步) {
                log("剪切页已点击")
                剪切页下一步.click()
                if (text("正在合成中").findOne(2000) || text("选配乐").exists() || text("发布").exists()) {
                    break;
                }
            } else {
                log("找不到剪切页下一步")
                log("本次错误,重启本脚本")
                let path = engines.myEngine().source.toString();
                engines.execScriptFile(path)
                toastLog("重新运行,当前悬浮窗关闭")
                console.hide()
                exit()
                return 5
            }

        }


        sleep(2000)
        // var 计数器 = 0 ,合成检测 =false
        // for (let index = 0; index < 1000; index++) {
        //     if (!text("正在合成中").exists()) {
        //         计数器 += 1
        //         log("计数器+1")
        //     } else {

        //         计数器 = 0
        //         log("计数器归0")
        //     }
        //     sleep(1000)
        //     if (计数器 > 5) {
        //         log("合成检测通过")
        //         合成检测 = true
        //         break;
        //     }
        //     if (text("选配乐").exists() ) {
        //         log("已到达美化页")
        //         合成检测= true

        //         break;
        //     }
        // }
        // if (!合成检测) {
        //     log("合成失败")
        //     return 11
        // }
        // var 美化页下一步 = text("下一步").clickable().findOne(10000)
        // if (美化页下一步) {
        //     美化页下一步.click()
        // } else {
        //     log("找不到美化页下一步")
        //     return 6
        // }
        // sleep(2000)

        var 发布 = desc("发布").clickable().findOne(10000)
        if (发布) {
            var 保存本地按钮 = text("保存本地").className("android.widget.CheckBox").findOne(1000)
            if (保存本地按钮.checked()) {
                log("取消保存到本地")
                保存本地按钮.click()
                sleep(1000)
            }
            发布.click()
        } else {
            log("找不到发布")
            return 7
        }
        sleep(2000)
        var 拍摄按钮 = desc("拍摄，按钮").findOne(10000)//检测回到主页
        if (拍摄按钮) {
            log("本次上传成功")
            return 8//成功
        } else {
            log("本次上传失败")
            return 9
        }




    }
    log("开始")
    //////////////以上为函数,下为功能
    if (!打开抖音()) {
        log("无法打开抖音,退出")
        exit()
    } else {
        log("抖音开启成功")
    }


    var 视频选择结果 = 视频选择()
    log("视频选择结果" + 视频选择结果)
    // if (视频选择结果 == 3) {
    //     log("所有视频上传完成")
    //     log("上传个数:" + index)
    //     return true
    // }else if(视频选择结果==40){

    //     需要采集的个数+=1
    //     back()
    //     sleep(2000)
    //     back()
    //     continue
    // }
    var 计数器 = 0, 上传检测 = false
    for (let index = 0; index < 1000; index++) {
        if (!textEndsWith("%").exists()) {
            计数器 += 1
            log("计数器+1")
        } else {
            计数器 = 0
            log("计数器归0")
        }
        sleep(1000)
        if (计数器 > 7) {
            log("上传检测通过")
            上传检测 = true
            break;
        }
    }
    if (!上传检测) {
        log("上传失败")
    } else {
        log("上传成功")

    }


}
function isroot() {
    var re = shell("ls", true)
    if (re.code == 0) {
        log("有root")
        return true
    } else {
        log("无root")
        return false
    }
}

//执行一些点击操作
function shouquan() {
    if (isroot()) {
        var dd = shell("pm grant " + context.getPackageName() + " android.permission.WRITE_SECURE_SETTINGS", true)
        log(dd)
        if (dd.code != 0) {
            toastLog("授权失败")
            return false
        } else {
            log("授权成功")
            return true
        }
    } else {
        toastLog("无root权限")
        return false
    }

}

function openAccessbility() {
    //var dd = shell("pm grant " + packagename_self + " android.permission.WRITE_SECURE_SETTINGS", true)
    //log(dd)
    // importClass(android.content.Context);
    importClass(android.provider.Settings);
    try {
        var enabledServices = Settings.Secure.getString(context.getContentResolver(), Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES);
        //log('当前已启用的辅助服务\n', enabledServices);
        /*
        附上几个我安装的应用的辅助功能服务
        AutoJsPro版 org.autojs.autojspro/com.stardust.autojs.core.accessibility.AccessibilityService
        AutoJS免费版 org.autojs.autojs/com.stardust.autojs.core.accessibility.AccessibilityService
        Nova桌面 com.teslacoilsw.launcher/com.teslacoilsw.launcher.NovaAccessibilityService
        
        注意每个服务之间要用英文冒号链接
        
        重要！
        建议把要用的所有辅助服务打开，然后通过上面那个log获取到已开启的服务，再把Services变量写死
        由于Android的一些bug，有时候实际没有开启的服务仍会出现在已启用的里面，所有没办法通过判断得知服务是否开启
        像当前这样子会导致已开启服务里面有很多重复项目，所有建议直接写死不再每次重新获取
        */
        var myself_package_name = context.getPackageName()
        if (!myself_package_name) {
            log("包名获取失败")
        }
        var Services = enabledServices + ":" + myself_package_name + "/com.stardust.autojs.core.accessibility.AccessibilityService";
        Settings.Secure.putString(context.getContentResolver(), Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES, Services);
        Settings.Secure.putString(context.getContentResolver(), Settings.Secure.ACCESSIBILITY_ENABLED, '1');
        log("代码执行完毕")
        return true
    } catch (error) {
        //授权方法：开启usb调试并使用adb工具连接手机，执行 adb shell pm grant org.autojs.autojspro android.permission.WRITE_SECURE_SETTING
        log("\n请确保已给予 WRITE_SECURE_SETTINGS 权限\n\n授权代码已复制，请使用adb工具连接手机执行(重启不失效)\n\n", error);
        // setClip("adb shell pm grant org.autojs.autojspro android.permission.WRITE_SECURE_SETTINGS");
        return false
    }
}







function 刷新图库() {
    media.scanFile("/sdcard/PIC/")
}

function main() {
    if (!shouquan()) {
        toastLog("没有root权限,退出")
        exit()
    }
    // root开启无障碍()
    openAccessbility()
    log("等待无障碍")
    auto.waitFor()
    log("无障碍开启成功")
    log("清空原来的")
    files.ensureDir("/sdcard/PIC/")
    var 已下载图片= files.listDir("/sdcard/PIC/")
    已下载图片.forEach((path)=>{
        log(path +"--删除:"+files.remove(path))
    })
    var 已下载图片 = []
    while(true){
        if (已下载图片.length>=8) {
            break;
        }else{
            log(已下载图片.length)
        }
        let name = 获取图片()
        if (name ) {
            已下载图片.push(name)
        }else{
            log("本次下载失败")
        }
    }
    刷新图库()
    打开抖音上传视频()
}

function 获取图片() {
    try {
        var res = http.get("http://pic.tsmp4.net/api/nvsheng/img.php")
        if (res.statusCode == 200) {
            // log(res.headers)
            var img = images.fromBytes(res.body.bytes())
            if (img) {
                var name = "/sdcard/PIC/" + new Date().getTime() + ".jpg"
                img.saveTo(name)
                log('保存为'+name)
                img.recycle()
                return name
            } else {
                log("解析失败")
                return false
            }
        } else {
            log(res.statusCode)
            return false
        }
    } catch (error) {
        log(error)
        return false
    }
}
// log()
// sleep()
main()
// 获取图片()
