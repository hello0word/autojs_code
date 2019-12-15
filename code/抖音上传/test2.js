// let 图片容器 = className("android.support.v7.widget.RecyclerView").depth(10).findOne(5000)

// let 所有图片 = 图片容器.find(clickable().className("android.widget.FrameLayout"))
// log(所有图片[4].child(0))



function 选择PIC文件夹(){
    


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


// log( 选择PIC文件夹())
// files.ensureDir("/sdcard/PIC/")
log(media.scanFile("/sdcard/PIC/"))

// var 视频列表 = className("android.support.v7.widget.RecyclerView").depth(9).findOne(15000)
// if (视频列表) {
//     let 图片按钮 = text("图片").clickable().findOne(5000)
//     if (图片按钮) {
//         log("找到图片按钮")
//         图片按钮.click()
//         sleep(2000)
//         // return 随机在当前图片表里选5到7张图片()
//     }
// }

