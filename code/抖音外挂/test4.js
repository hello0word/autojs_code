// var res = http.postMultipart("http://192.168.1.136:9999/douyinlog", {
//     file: open("/sdcard/xintiao.txt")
// });
// log(res.body.string());

if (!requestScreenCapture()) {
    toastLog("请求截图失败");
    exit()
}
sleep(500)

// var res = http.postMultipart("http://qxy521.xyz/upload_file.php", {
//     imei: device.getIMEI(),
//     file: open("/sdcard/抖音外挂日志.txt")
// });
// log(res.body.string());


// var img = images.captureScreen()
// log(colors.green(img.pixel(652, 610)))
// log(colors.blue(img.pixel(652, 610)))
// log(colors.red(img.pixel(652, 610)))

// if (colors.green(img.pixel(652, 610)) < 150 && colors.red(img.pixel(652, 610))  >150) {//判断点赞否
//     log("点赞检测通过")
//     // jiance = jiance + 1
// }else{
//     log(222)
// }

// const douyin_video_wait_count = 30
// const guanzhu_x = 642 / 720 * device.width, guanzhu_y = 492 / 1280 *device.height, guanzhu_zhongxin_x = 659 / 720 * device.width, guanzhu_zhongxin_y = 496 / 1280 *device.height//关注的红色位置  和关注的中心白色位置
// const guanzhu_tap_x = 670 / 720 * device.width, guanzhu_tap_y = 450 / 1280 *device.height, open_guanzhu_x = 354 / 720 * device.width, open_guanzhu_y = 288 / 1280 *device.height//这里前面是关注的中心点,后面是打开关注页后的检测位置

// const douyin_back_x = 50 / 720 * device.width, douyin_back_y = 100 / 1280 *device.height
// const dianzan_x = 652 / 720 * device.width, dianzan_y = 610 / 1280 *device.height//点赞的位置
// const comment_x = 652 / 720 * device.width, comment_y = 740 / 1280 *device.height//评论的位置
// const cd_x = 652 / 720 * device.width, cd_y = 1085 / 1280 *device.height

var md5 = (string) => java.math.BigInteger(1, java.security.MessageDigest.getInstance("MD5").digest(java.lang.String(string).getBytes())).toString(16);
// log(md5("2019555"))

var iiiLabVideoDownloadURL = "http://service.iiilab.com/video/download"
var client = "4699df097833f3d2"
var clientSecretKey = "4001b80e8c9a6125a0b7cc430158506f"
var link = "https://h5.weishi.qq.com/weishi/feed/7ckAE6l8j1IxQtQy0/wsfeed?wxplay=1&id=7ckAE6l8j1IxQtQy0&spid=7840188205616640000&qua=v1_and_weishi_6.1.5_588_212011448_d&chid=100081014&pkg=3670&attach=cp_reserves3_1000370011"

function iiiLab通用视频解析接口(link) {
    link = link 
    var timestamp = new Date().getTime()
    var sign = md5(link + timestamp + clientSecretKey)
    var re = http.post(iiiLabVideoDownloadURL, { link: link, timestamp: timestamp, sign: sign, client: client })
    if (re.statusCode == 200) {
        log(re.body.json())

    } else {

    }

}
// iiiLab通用视频解析接口()
function 下载视频异步(url) {
    url = url || "http://v.weishi.qq.com/v.weishi.qq.com/shg_1657013231_1047_58b5bf231f804d369e8a1dbbb612vide.f0.mp4?dis_k=ec7357327e4ee1c66f09da46f52ff15b&dis_t=1574523146&guid=0508AFC000E081E13F01036CF26192E5&fromtag=0&personid=h5"
    http.get(url, {}, function (res, err) {
        if (err) {
            console.error(err);
            return;
        }
        log("code = " + res.statusCode);
        // log("html = " + );
        log(res.body.contentType)
        var aa = res.body.bytes()
        files.writeBytes("/sdcard/test视频.mp4", aa)

    })
}
function 下载视频同步(url) {
    url = url || "http://v.weishi.qq.com/v.weishi.qq.com/shg_1657013231_1047_58b5bf231f804d369e8a1dbbb612vide.f0.mp4?dis_k=ec7357327e4ee1c66f09da46f52ff15b&dis_t=1574523146&guid=0508AFC000E081E13F01036CF26192E5&fromtag=0&personid=h5"
    var res = http.get(url)


    log("code = " + res.statusCode);
    // log("html = " + );
    log(res.body.contentType)
    var aa = res.body.bytes()
    files.writeBytes("/sdcard/test视频.mp4", aa)


}
// 下载视频同步()
toast("123123123123")