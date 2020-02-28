风影:
className("android.widget.TextView").text("消息").findOne();
className("android.widget.TextView").text("我").findOne().parent().parent().parent().click();
// className("android.widget.ImageView").desc("更多").waitFor();
let zp = textStartsWith("作品").visibleToUser(true).className("android.widget.TextView").boundsInside(0, 0, device.width * 0.6, device.height);
let xh = textStartsWith("喜欢").className("android.widget.TextView")//.boundsInside(0, 0, device.width * 0.6, device.height);
let gz = text("关注").className("android.widget.TextView");
let dyh = className("android.widget.TextView").textStartsWith("抖音号");
log(zp.findOne(2000).text().match(/\d+/g)[0]);
log(xh.findOne(2000).text().match(/\d+/g)[0]);
var gz1 = gz.findOne(2000).parent().child(0).text()
log(gz1);
log(dyh.findOne(2000).text().match(/[^抖音号：]+.*/))
名字= dyh.findOne().parent().parent().child(1).text()
log(名字)
