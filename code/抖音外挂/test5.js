if (!requestScreenCapture()) {
    toastLog("请求截图失败");
    exit()
}
console.show()
sleep(1000)
var pid = android.os.Process.myPid()
const douyin_video_wait_count = 30
const guanzhu_x = 642 / 720 * device.width, guanzhu_y = 492 / 1280 *device.height, guanzhu_zhongxin_x = 659 / 720 * device.width, guanzhu_zhongxin_y = 496 / 1280 *device.height//关注的红色位置  和关注的中心白色位置
const guanzhu_tap_x = 670 / 720 * device.width, guanzhu_tap_y = 450 / 1280 *device.height, open_guanzhu_x = 354 / 720 * device.width, open_guanzhu_y = 288 / 1280 *device.height//这里前面是关注的中心点,后面是打开关注页后的检测位置

const douyin_back_x = 50 / 720 * device.width, douyin_back_y = 100 / 1280 *device.height
const dianzan_x = 652 / 720 * device.width, dianzan_y = 610 / 1280 *device.height//点赞的位置
const comment_x = 652 / 720 * device.width, comment_y = 740 / 1280 *device.height//评论的位置
const cd_x = 652 / 720 * device.width, cd_y = 1085 / 1280 *device.height
var zhongxing_temp // 中性词评论
img = images.captureScreen()
log("当前颜色" + colors.green(img.pixel(dianzan_x, dianzan_y)))
