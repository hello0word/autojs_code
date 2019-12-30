importClass(android.net.LocalServerSocket)

threads.start(function () {


    try {
        //socketAddress需跟localSocket地址一致，否则无法连接上
        var socketAddress = java.lang.String("xjx")
        var serverSocket = new LocalServerSocket(socketAddress);
    } catch ( e) {
        log(e)
    }
    try {
        //获取接收的LocalSocket
        log("等待中")
        localSocket = serverSocket.accept();
        //设置缓冲大小
        localSocket.setReceiveBufferSize(ConstantConfig.BUFFER_SIZE);
        localSocket.setSendBufferSize(ConstantConfig.BUFFER_SIZE);
    } catch (e) {
        log(e)
    }
    
})

setInterval(()=>{},1000)