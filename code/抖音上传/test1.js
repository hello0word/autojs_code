
function 随机在当前图片表里选5到7张图片() {
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
            break;
        }
        if (已勾选.length >= 所有图片.length) {
            log("能勾选的图片不足")
            break;
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
// 随机在当前图片表里选5到7张图片()

function 获取图片() {
    try {
        var res = http.get("http://122.51.203.83/getimg.php")
        if (res.statusCode == 200) {
            log(res.headers)
            var img = images.fromBytes(res.body.bytes())
            if (img) {
                var name = "/sdcard/PIC/" + new Date().getTime() + ".jpg"
                img.saveTo(name)
                log('保存为' + name)
                img.recycle()
                media.scanFile(name)
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
for (let index = 0; index < 10; index++) {
    获取图片()

}