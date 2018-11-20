auto.waitFor();// 等待打开无障碍服务:竖屏模式
if(!requestScreenCapture(false)){
    toast("请求截图失败");
    exit();
}//请求截图权限
sleep(50);
files.create("/sdcard/抢单图片/");
const 第一张图路径="/sdcard/抢单图片/标记.jpg";
const 第二张图路径="/sdcard/抢单图片/抢单.jpg";
const 第三张图路径="/sdcard/抢单图片/确定.jpg";

//读取数据到内存
var 第一张图片数据 = images.read(第一张图路径);
var 第二张图片数据 = images.read(第二张图路径);
var 第三张图片数据 = images.read(第三张图路径);
if(!第一张图片数据 && !第二张图片数据 && !第三张图片数据){
    toast("图片读取错误");
    log("图片读取错误");
    exit();
}

const 第一个延时= 1000;// 这里是第一个延时,1000 等于1秒
const 第二个延时= 1000;// 这里是第二个延时,1000 等于1秒
while(true){
    let img =  captureScreen();
    let point = images.findImage(img, 第一张图片数据);//找第一张图
    if(point){
        sleep(第一个延时);
        press(point.x,point.y,100);//点击标识
        let img2 =  captureScreen();
        let point2 = images.findImage(img2, 第二张图片数据);//找第二张图
        if(point2){
            sleep(第二个延时);
            press(point2.x,point2.y,100);//点击抢单
            let img3 =  captureScreen();
            let point3 = images.findImage(img3, 第二张图片数据);//找第三张图
            if(point3){
                tosat("本次抢单完成");
            }
        }
    }
    sleep(20);
}