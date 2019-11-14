auto.waitFor()
setInterval(()=>{
    events.broadcast.emit("websocket", "小明");

},1000)