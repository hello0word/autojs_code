auto.waitFor()
// var ra = new RootAutomator();
//让"手指1"点击位置(100, 100)
// ra.tap(100, 100, 1);
// // //让"手指2"点击位置(200, 200);
// // ra.tap(200, 200, 2);

// for (let index = 0; index < 3; index++) {
function main(){
    while (true) {
        let scr = scrollable().find()
        scr.scrollForward()
        sleep(2000)
    }
}
function work(){
    let jishu = 0
    while (true) {
        if (text("开始阅读").exists()) {
            jishu +=1
            toastLog("开始阅读:"+jishu)
            if (jishu >7) {
                text("开始阅读").findOne().click()
                log("开始阅读")
                jishu=0
            }
        }
        sleep(5000)
    }
}

function work2(){
    while(true){
        if (descStartsWith(" 在看").exists()  ){
            log("在看")
            if (descStartsWith(" 在看").findOne().bounds().centerY() < device.height * 1.1 ) {
                toastLog("10秒后返回")
                sleep(10000)
                back()
            }else{
                log(descStartsWith(" 在看").findOne().bounds().centerY())
            }
            
        } 
        if (desc("阅读原文").exists()){
            log("阅读原文")
            if (descStartsWith("阅读原文").findOne().bounds().centerY() < device.height * 1.1) {
                toastLog("10秒后返回")
                sleep(10000)
                back()
            }else{
                log(descStartsWith("阅读原文").findOne().bounds().centerY())
            }
        } 
        if (descStartsWith("阅读").exists()) {
            log("阅读")
            if (descStartsWith("阅读").findOne().bounds().centerY() < device.height * 1.1) {
                toastLog("10秒后返回")
                sleep(10000)
                back()
            }else{
                log(descStartsWith("阅读").findOne().bounds().centerY())
            }

        }
        sleep(3000)
    }
    
}
function start(){
    threads.start(work)
    threads.start(work2)
    main()
}
// let scr = scrollable().find()
// log(scr)
// log(scr[0].scrollForward())
// log(scr.scrollForward())
start()
// log(descStartsWith(" 在看").findOne().bounds().centerY())

//  log(descContains("在看").findOne())

//     ra.swipe(400,800,400,600,50)
//     sleep(2000)
// }
// ra.exit();

// let scr= scrollable().find()
// log(scr.length)
// // scr.scrollBackward()
// log(scr[0])