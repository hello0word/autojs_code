// var dd=new Shell(true)
// dd.setCallback({
//     onNewLine: function(line){
//         //有新的一行输出时打印到控制台
//         log(line);
//     }
// })
// dd.exec("screencap -p")
// log(dd)
// importClass("java.lang.Runtime")
// importClass("java.io.InputStreamReader")
// importClass("java.io.BufferedReader")

// var dd = Runtime.getRuntime().exec("ls");
// var fis=dd.getInputStream()
// var isr = new InputStreamReader(fis);
// var br = new BufferedReader(isr);
// var line;
// // log( )
// while( line=br.readLine()){
//     log(line)
// }

function getImage(){
    var path = "/sdcard/temp.png"
    var dd = shell("screencap -p "+path,true)
    var img
    if(dd.code ==0){
        img = images.read(path)
    }else{
        log("错误信息:")
        log(dd.error)
    }
    return img
}
var ss= getImage()
log(ss)
