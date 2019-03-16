auto.waitFor()
if (!requestScreenCapture()) {
    toastLog("请求截图失败");
    exit();
}

function 截图保存() {
    for (let index = 0; index < 500; index++) {
    
        var img = captureScreen();
        var clip = images.clip(img, 820, 527, 520,590 );
        images.save(clip, "/sdcard/temp.jpg", "jpg", 100);
        var url= "http://192.168.43.175:5000"
        var res = http.postMultipart(url, {
            file: open("/sdcard/temp.jpg")
        });
        log(res.body.string());
        var dd = idContains("reload").depth(24).findOne(1000)
        dd.click()
        sleep(1500)
        //54, 507, 1331, 766  截图参数  这个是最开始找图的参数
        //766,20,520,590
        // exit()
    }
}
// 截图保存()

function test(params) {
    var img = captureScreen();
    var 原图数据 = {
        x:820,
        y:527,
        w:645,
        h:746
    }
    var dd="海房.jpg"
    var eee=images.read(dd)
    // var xa=54
    var xa=74
    var ya=707
    var x=56
    var y=508
    log(eee.getWidth())
    log(eee.getHeight())
    log("原图:"+images.pixel(eee,4+1,0))
    // log(colors.toString(images.pixel(eee,x,y)))
    log("现图:"+images.pixel(img,x+1,y))
    press(xa+x,ya+y,100)
    //-12609819
    //

}

function names(params) {
    var 图片_list =["66.jpg",
                    "青草.jpg",
                    "热浪.jpg",
                    "黄沙.jpg",
                    "企鹅.jpg",
                    "海房.jpg",
                    "树懒.jpg",
                    "松鼠.jpg",
                    "青山.jpg",
                    "小狗.jpg"]
    图片_list.forEach((name)=>{
        var temp=images.read(name)
        log(name+images.pixel(temp,0,0))
        // var temp=images.clip(temp,766,20,520,590)
        // images.save(temp,"裁剪后---"+name,"jpg", ,100)

    })

    // var img_66  = images.read("66.jpg")
    // var 小草    = images.read("小草.jpg")
    // var 热浪    = images.read("热浪.jpg")
    // var 黄沙    = images.read("黄沙.jpg")
    // var 企鹅    = images.read("企鹅.jpg")
    // var 海房    = images.read("海房.jpg")
    // var 树懒    = images.read("树懒.jpg")
    // var 松鼠    = images.read("松鼠.jpg")    
    // var 青山    = images.read("青山.jpg")
    // var 小狗    = images.read("小狗.jpg")
    // log(img_66)
}
// test()
// 截图比对()
输出所有信息()
// names()
function 截图比对(params) {
    var img = captureScreen();
    // var clip = images.clip(img,  56, 500, , 766 );
    var load = images.read("/sdcard/temp/pj.jpg")
    log(load.getHeight())
    for (let x = device.width / 2 + 100; x < clip.getWidth(); x++) {
        for (let y = 0; y < clip.getHeight(); y++) {
            if (clip.pixel(x,y) != load.pixel(x,y)) {
                log("X:%d,Y:%d",x,y)
                exit()
            }
            
        }
        
    }
}
function  输出所有信息(params) {
    // files.listDir("/sdcard/temp/songshu").forEach((name)=>{
    //     // log(name)
    //     let over_name="/sdcard/temp/songshu/"+name
        
    //         let img=images.read(over_name)
    //         log(img.pixel(820,0))
        
        
    // })
    var img = captureScreen();
    // log(img.pixel(1439,2559))
    var dd= images.clip(img,800,600,2,2)
    images.save(img,"/sdcard/temp.jpg","jpg",100)
    // log(dd.pixel(0,0))
    let ime= images.read("/sdcard/temp/pj.jpg")
    let ime_new= images.read("/sdcard/temp.jpg")
    log("sg")
    log(ime.pixel(0,0))
    log(ime_new.pixel(54,507))
}
// 裁剪()
1135+54
function 裁剪(params) {
    var jx=310
    var dt = images.read("/sdcard/temp/d.jpg")
    var gt = images.read("/sdcard/temp/g.jpg")
    var cli_dt =images.clip(dt,0,0,dt.getWidth(),jx)
    var cli_gt =images.clip(gt,0,jx,dt.getWidth(),dt.getHeight()-jx)
    var pj_img =images.concat(cli_dt,cli_gt,"BOTTOM")
    images.save(pj_img,"/sdcard/temp/pj.jpg")
}