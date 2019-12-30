importClass(android.net.LocalServerSocket)
var serverSocket
threads.start(function () {


    try {
        //socketAddress需跟localSocket地址一致，否则无法连接上
        var socketAddress = java.lang.String("xjx3")
        serverSocket = new LocalServerSocket(socketAddress);
    } catch ( e) {
        log(e)
    }
    try {
        //获取接收的LocalSocket
        log("等待中")
        localSocket = serverSocket.accept();
        //设置缓冲大小
        localSocket.setReceiveBufferSize(1024);
        localSocket.setSendBufferSize(1024);
    } catch (e) {
        log(e)
    }
    
})

events.on("exit", function () {
    log("结束运行");
    log(serverSocket.close())
    // log(serverSocket.quit())
    // log(serverSocket.exit())
    
});

setInterval(()=>{},1000)