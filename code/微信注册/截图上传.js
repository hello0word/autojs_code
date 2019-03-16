
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
// 输出所有信息()
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

function 裁剪(params) {
    var jx=310
    var dt = images.read("/sdcard/temp/d.jpg")
    var gt = images.read("/sdcard/temp/g.jpg")
    var cli_dt =images.clip(dt,0,0,dt.getWidth(),jx)
    var cli_gt =images.clip(gt,0,jx,dt.getWidth(),dt.getHeight()-jx)
    var pj_img =images.concat(cli_dt,cli_gt,"BOTTOM")
    images.save(pj_img,"/sdcard/temp/pj.jpg")
}

function up(params) {
    var url= "http://192.168.43.175:5000"
        var res = http.postMultipart(url, {
            file: open("/sdcard/temp.jpg")
        });
        log(res.body.string());
}



function findMultiColorss(img,first,arr,option){
    var temp_img
    if (option.region) {
        temp_img = images.clip(img,option.region.x,option.region.y,option.region.width,option.region.height)
        for (let  img_height= 0; img_height < temp_img.getHeight()-165; img_height+=5) {
            for (let img_width = 0; img_width < temp_img.getWidth()-165; img_width+=5) {
                if (colors.equals(temp_img.pixel(img_width,img_height), first)) {
                    var flag=true
                    for (let index = 0; index < arr.length; index++) {
                        if ( ! colors.equals(temp_img.pixel(img_width+arr[index][0],img_height+arr[index][1]),arr[index][2])) {
                            flag=false
                        } 
                    }
                    if (flag) {
                        return {x:img_width+option.region.x,y:img_height+option.region.y}
                    }
                }
            }
        }    
    }
}

function 验证码破解() {
    var  ime = captureScreen();
    ime=images.cvtColor(ime,"BGR2GRAY",3)
    ff = images.threshold(ime,110,255,"BINARY")
    var  _G_arr0 = Array()
    for (let x = 5; x < 160; x+=5) {
            _G_arr0.push([x,0+x,"#000000"])
            _G_arr0.push([x,160-x,"#000000"])
    }
    var dd= findMultiColorss(ff,"#000000",_G_arr0,{region:{x:820,y:550,width:550,height:650}})
    randomSwipe(300,1400,dd.x+85,1400)
    var err=text("请控制拼图块对齐缺口").findOne(3000)
    if (err) {
        
        var dd = idContains("reload").depth(24).findOne(1000)
        if (dd) {
            log("刷新滑块验证")
            dd.click()
            sleep(time_delay)
            _G_计数器.huakuaijishu = 0
            
        }
    }
    return 
}

// 验证码破解()
log(text("请控制拼图块对齐缺口").findOne())


function randomSwipe(sx, sy, ex, ey) {
    //设置随机滑动时长范围
    var timeMin = 1000
    var timeMax = 3000
    //设置控制点极限距离
    var leaveHeightLength = 500

    //根据偏差距离，应用不同的随机方式
    if (Math.abs(ex - sx) > Math.abs(ey - sy)) {
        var my = (sy + ey) / 2
        var y2 = my + random(0, leaveHeightLength)
        var y3 = my - random(0, leaveHeightLength)

        var lx = (sx - ex) / 3
        if (lx < 0) {
            lx = -lx
        }
        var x2 = sx + lx / 2 + random(0, lx)
        var x3 = sx + lx + lx / 2 + random(0, lx)
    } else {
        var mx = (sx + ex) / 2
        var y2 = mx + random(0, leaveHeightLength)
        var y3 = mx - random(0, leaveHeightLength)

        var ly = (sy - ey) / 3
        if (ly < 0) {
            ly = -ly
        }
        var y2 = sy + ly / 2 + random(0, ly)
        var y3 = sy + ly + ly / 2 + random(0, ly)
    }

    //获取运行轨迹，及参数
    var time = [0, random(timeMin, timeMax)]
    var track = bezierCreate(sx, sy, x2, y2, x3, y3, ex, ey)

    log("随机控制点A坐标：" + x2 + "," + y2)
    log("随机控制点B坐标：" + x3 + "," + y3)
    log("随机滑动时长：" + time[1])

    //滑动
    gestures(time.concat(track))
}

function bezierCreate(x1,y1,x2,y2,x3,y3,x4,y4){
    //构建参数
    var h=100;
    var cp=[{x:x1,y:y1+h},{x:x2,y:y2+h},{x:x3,y:y3+h},{x:x4,y:y4+h}];
    var numberOfPoints = 100;
    var curve = [];
    var dt = 1.0 / (numberOfPoints - 1);
    
    //计算轨迹
    for (var i = 0; i < numberOfPoints; i++){
        var ax, bx, cx;
        var ay, by, cy;
        var tSquared, tCubed;
        var result_x, result_y;
    
        cx = 3.0 * (cp[1].x - cp[0].x);
        bx = 3.0 * (cp[2].x - cp[1].x) - cx;
        ax = cp[3].x - cp[0].x - cx - bx;
        cy = 3.0 * (cp[1].y - cp[0].y);
        by = 3.0 * (cp[2].y - cp[1].y) - cy;
        ay = cp[3].y - cp[0].y - cy - by;
    
        var t=dt*i
        tSquared = t * t;
        tCubed = tSquared * t;
        result_x = (ax * tCubed) + (bx * tSquared) + (cx * t) + cp[0].x;
        result_y = (ay * tCubed) + (by * tSquared) + (cy * t) + cp[0].y;
        curve[i] = {
            x: result_x,
            y: result_y
        };
    }

    //轨迹转路数组
    var array=[];
    for (var i = 0;i<curve.length; i++) {
        try {
            var j = (i < 100) ? i : (199 - i);
            xx = parseInt(curve[j].x)
            yy = parseInt(Math.abs(100 - curve[j].y))
        } catch (e) {
            break
        }
        array.push([xx, yy])
    }
    
    return array
}

// 66 的参数   ret1,thresh1 = cv2.threshold(ime,115,255,cv2.THRESH_TOZERO)   找白色边缘是可行的

//海房  cv2.threshold(ime,127,255,cv2.THRESH_BINARY)   找白色边缘线
//黄沙   ret1,thresh1 = cv2.threshold(ime,127,255,cv2.THRESH_BINARY)  找黑色的交叉内容
//企鹅   ret1,thresh1 = cv2.threshold(ime,127,255,cv2.THRESH_BINARY)  找黑色的交叉内容
//青草   ret1,thresh1 = cv2.threshold(ime,110,255,cv2.THRESH_BINARY)  找黑色的交叉内容
//青山   ret1,thresh1 = cv2.threshold(ime,95,255,cv2.THRESH_BINARY)   找黑色的交叉内容
//热浪 ret1,thresh1 = cv2.threshold(ime,110,255,cv2.THRESH_BINARY_INV) 找黑色的交叉内容
//树懒   ret1,thresh1 = cv2.threshold(ime,110,255,cv2.THRESH_BINARY_INV) 找黑色的交叉内容
//松鼠   ret1,thresh1 = cv2.threshold(ime,110,255,cv2.THRESH_BINARY_INV) 找黑色的交叉内容
//小猪 ret1,thresh1 = cv2.threshold(ime,127,255,cv2.THRESH_BINARY)


