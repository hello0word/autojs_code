importClass(android.util.Base64);
/*
 * 作者：lepon
 * QQ：895115190
 * 代码请保留作者信息
 */

/*
 * 参考：https://github.com/lepon/websocket-heartbeat-js
 * pingTimeout  每隔多少秒发送一次心跳，如果收到任何后端消息定时器将会重置
 * pongTimeout  ping消息发送之后，10秒内没收到后端消息便会认为连接断开
 * reconnectTimeout  尝试重连的间隔时间
 * pingMsg  ping消息值
 * repeatLimit  重连尝试次数。默认不限制
 */
function WebsocketHeartbeatJs({
    url,
    pingTimeout,
    pongTimeout,
    reconnectTimeout,
    pingMsg,
    repeatLimit
}) {
    this.opts = {
        url: url,
        pingTimeout: pingTimeout,
        pongTimeout: pongTimeout,
        reconnectTimeout: reconnectTimeout,
        pingMsg: pingMsg,
        repeatLimit: repeatLimit
    };
    this.ws = null;//websocket实例
    this.repeat = 0;

    //override hook function
    this.onclose = () => { };
    this.onerror = () => { };
    this.onopen = () => { };
    this.onmessage = () => { };
    this.onreconnect = () => { };

    this.createWebSocket();
}

WebsocketHeartbeatJs.prototype.createWebSocket = function () {
    try {
        //this.ws = new WebSocket(this.opts.url);
        this.ws = web.newWebSocket(this.opts.url, { eventThread: 'this' });
        this.initEventHandle();
    } catch (e) {
        this.reconnect();
        throw e;
    }
};

WebsocketHeartbeatJs.prototype.initEventHandle = function () {
    this.ws.on('closed', (code, reason, ws) => {
        log('closed');
        this.onclose();
        this.reconnect();
    });

    /*
    this.ws.on('closing', (code, reason, ws) => {
        log('closing')
        this.onclose();
        this.reconnect();
    });
    */

    this.ws.on('failure', (err, res, ws) => {
        log('failure');
        this.reconnect();
    });

    this.ws.on('error', (err, res, ws) => {
        log('error');
        this.onerror();
        this.reconnect();
    });

    this.ws.on('open', (res, ws) => {
        log('open');
        log('open res --> ' + res);
        this.repeat = 0;
        this.onopen();
        //心跳检测重置
        this.heartCheck();
    });

    this.ws.on('text', (event, ws) => {
        this.onmessage(event, ws);
        //如果获取到消息，心跳检测重置
        //拿到任何消息都说明当前连接是正常的
        this.heartCheck();
    });

    //二进制的消息（自己完善吧）
    /*
    this.ws.on("binary", (bytes, ws) => {
        console.info("收到二进制消息:");
        console.info("hex: ", bytes.hex());
        console.info("base64: ", bytes.base64());
        console.info("md5: ", bytes.md5());
        console.info("size: ", bytes.size());
        console.info("bytes: ", bytes.toByteArray());
    });
    */
};

WebsocketHeartbeatJs.prototype.reconnect = function () {
    // if (this.opts.repeatLimit > 0 && this.opts.repeatLimit <= this.repeat) return;//limit repeat the number
    if (this.lockReconnect || this.forbidReconnect) return;
    this.lockReconnect = true;
    this.repeat++;//必须在lockReconnect之后，避免进行无效计数
    this.onreconnect();
    //没连接上会一直重连，设置延迟避免请求过多
    setTimeout(() => {
        this.createWebSocket();
        this.lockReconnect = false;
    }, this.opts.reconnectTimeout);
};

WebsocketHeartbeatJs.prototype.send = function (msg) {
    this.ws.send(msg);
};

//心跳检测
WebsocketHeartbeatJs.prototype.heartCheck = function () {
    this.heartReset();
    this.heartStart();
};

WebsocketHeartbeatJs.prototype.heartStart = function () {
    if (this.forbidReconnect) return;//不再重连就不再执行心跳

    this.pingTimeoutId = setTimeout(() => {
        //这里发送一个心跳，后端收到后，返回一个心跳消息，
        //onmessage拿到返回的心跳就说明连接正常
        log("心跳")
        this.ws.send(this.opts.pingMsg);
        //如果超过一定时间还没重置，说明
        this.pongTimeoutId = setTimeout(() => {
            log("后端主动断开了客户端发起关闭")
            //如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
            this.ws.close(1000, null);//1000表示正常关闭
        }, this.opts.pongTimeout);
    }, this.opts.pingTimeout);
};

WebsocketHeartbeatJs.prototype.heartReset = function () {
    if (this.pingTimeoutId) {
        clearTimeout(this.pingTimeoutId);
    }

    if (this.pongTimeoutId) {
        clearTimeout(this.pongTimeoutId);
    }
};

WebsocketHeartbeatJs.prototype.close = function () {
    //如果手动关闭连接，不再重连
    this.forbidReconnect = false;
    this.heartReset();
    this.ws.close(1000, null);//1000表示正常关闭
    this.reconnect();

};

//if(window) window.WebsocketHeartbeatJs = WebsocketHeartbeatJs;
module.exports = WebsocketHeartbeatJs;