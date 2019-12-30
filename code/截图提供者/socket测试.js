importClass(java.net.ServerSocket)
var serverSocket = new ServerSocket(9080);
log("服务器开始监听");
while (true) {
    var socket = serverSocket.accept(); //开始监听9080端口
    var inputStream = socket.getInputStream();
    var lenght = 0;
    var buff = new byte[1024];
    var sb = new StringBuffer();
    while ((lenght = inputStream.read(buff)) != -1) {
        sb.append(new String(buff, 0, lenght, "UTF-8"));
    }
    log("这里是服务端接收到的数据：" + sb.toString());
    socket.shutdownInput();
    var os = socket.getOutputStream();
    var string = new String("这里是服务端返回到客户端的数据".getBytes(), "UTF-8");
    os.write(string.getBytes());
    os.flush();
    // 关闭输出流
    socket.shutdownOutput();
    os.close();

    // 关闭IO资源
    inputStream.close();
}