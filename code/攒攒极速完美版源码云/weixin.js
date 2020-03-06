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
        sleep(4000)
    }
}
function work(){
    while (true) {
        if (text("开始阅读").exists()) {
            text("开始阅读").findOne().click()
            log("开始阅读")
        }
        sleep(5000)
    }
}

function work2(){
    while(true){
        if(descContains("在看").exists() ){
            log("在看")
            sleep(10000)
            back()
        }
        sleep(3000)
    }
    
}
threads.start(work)
threads.start(work2)
main()
//  log(descContains("在看").findOne())

//     ra.swipe(400,800,400,600,50)
//     sleep(2000)
// }
// ra.exit();

// let scr= scrollable().find()
// log(scr.length)
// // scr.scrollBackward()
// log(scr[0])