// import { log } from "winjs";


// // var dd=new Shell(true)
// // dd.setCallback({
// //     onNewLine: function(line){
// //         //有新的一行输出时打印到控制台
// //         log(line);
// //     }
// // })
// // dd.exec("screencap -p")
// // log(dd)
// // importClass("java.lang.Runtime")
// // importClass("java.io.InputStreamReader")
// // importClass("java.io.BufferedReader")

// // var dd = Runtime.getRuntime().exec("ls");
// // var fis=dd.getInputStream()
// // var isr = new InputStreamReader(fis);
// // var br = new BufferedReader(isr);
// // var line;
// // // log( )
// // while( line=br.readLine()){
// //     log(line)
// // }

// function getImage(){
//     var path = "/sdcard/temp.png"
//     var dd = shell("screencap -p "+path,true)
//     var img
//     if(dd.code ==0){
//         img = images.read(path)
//     }else{
//         log("错误信息:")
//         log(dd.error)
//     }
//     return img
// }
// // var ss= getImage()
// // log(ss)


// var tag_7  = text("确定").className("android.widget.Button").depth(7).findOne(70)

// tag_7 ?  log("1") : null






// var tag_3  =  className("android.widget.CheckBox").depth(19).clickable(true).checked(false).findOne(7)
// log(tag_3)

// while(true){
//     var tag_3  = className("android.widget.CheckBox").depth(19).clickable(true).checked(false).findOne(70)//协议勾选框
//     // tag_3 ? tag_3.click():null
//     // sleep(500)
//     if(tag_3){
//         tag_3.click()
//         sleep(500)
//         tag_3= className("android.widget.CheckBox").depth(19).clickable(true).checked(true).findOne(70)
//         log(tag_3.checked())
//         dd=text("下一步").findOne(70).parent()
//         log(dd.click())
//     }
// }

// var dd=text("下一步").findOne(70).parent()
// log(dd)



// if(!requestScreenCapture()){
//     toast("请求截图失败");
//     exit();
// }

// // var img = captureScreen();
// //     images.save(img, "/sdcard/temp.jpg", "jpg", 100);
// //     log("文件保存完成")
// var 一键新机= images.read("一键新机.jpg")
// // log(一键新机)
// var dd=images.findImage(captureScreen(),一键新机)
// if(dd){
//     log("找到啦:" + dd.y);
// }else{
//     toast("没找到");
// }

// var cc= "无法连接到服务器(1,-500)，请检查你的网络或稍后重试"
// var dd= new RegExp(/无法连接到服务器/)
// if( cc.search(/请检查你的网络或稍后重试/)){
//     log("ss")
// }
function 开关飞行(params) {
    var intent=new Intent()
    intent.setAction("android.settings.NFC_SETTINGS")
    app.startActivity(intent);
    log(id("android:id/switch_widget").findOne())
    log("查找飞行模式按钮")
    var 飞行模式=text("飞行模式").findOne()
    log("查找状态按钮")
    if(id("android:id/switch_widget").findOne().text()=="OFF"){
        log("飞行模式已关,将开启")
        飞行模式.parent().parent().click()
        sleep(2000)
        log("飞行模式开启完成")
    }else if(id("android:id/switch_widget").findOne().text()=="ON"){
        log("飞行模式已关,将重置")
        text("飞行模式").findOne().parent().parent().click()
        sleep(2000)
        text("飞行模式").findOne().parent().parent().click()
        log("飞行模式开启完成")
    }else{
        log("开关飞行为止异常")
    }
}
// 开关飞行()
// try {
//     let res = http.get("http://192.168.43.175:5000?gjm=62")
//     let data = res.body.json()
//     if (data.enable=="true") {
//         log( true)
//     }else if(data.enable=="false"){
//         log( false)
//     }
// } catch (error) {
//     log(error)
// }
// log( days)
// a="0"
// switch(a){
//     case 0:
//     log(1)
//     break;
//     case "0":
//     log("2")
//     break
// }
// log("0"==0)
toast("ok")
var newPath="/sdcard/360/123"
function copyToNewPath(path){
    if (files.isDir(path)) {
        log("目录:"+path)
        var AllChildPath=files.listDir(path)
        log(AllChildPath)
        for (let index = 0; index < AllChildPath.length; index++) {
            var element = AllChildPath[index];
            var childPath=files.join(path, element )
            log("copy:"+childPath)
            copyToNewPath(childPath)
            // return copyToNewPath(childPath)
        }
    }else{
        
        // log(path)
        var fileName=files.getName(path )
        if (fileName!=".nomedia") {
            log("文件:"+path)
            files.copy(path, files.join(newPath, files.getName(path )) )
        }
        
    }

}
function main(){
    var basePath="/sdcard/Tencent/MicroMsg/5c9e06f49e57055cb8eb7ece30b195ad/image2"
    // copyToNewPath(basePath)
    // exit()

    var allFile=files.listDir(newPath)
    // log(allFile)
    // exit()
    for (let index = 0; index < allFile.length; index++) {
        var element = allFile[index];
        var path=files.join(newPath,element)
        // copyToNewPath(path)
        var ex=files.getExtension(path )
        if (!ex) {
            files.rename(path ,files.getName(path )+".jpg")
        }

    }

    // log(allFile)

}
main()