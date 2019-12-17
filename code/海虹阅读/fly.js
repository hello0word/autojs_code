var window = floaty.window(
    <frame>
        <vertical>
            <linear>
                <button id="action" text="" gravity="left" w="auto" h="40" color="#ffffff" bg="#00000000" />
            </linear>

        </vertical>
    </frame>
);

window.setPosition(0, 0);
var storage = storages.create("海虹阅读")

setInterval(() => {
    var 今日记录器 = storage.get("今日记录器", {
        当日日期: 0,
        抖音完成数: 0,
        抖音养号时间: 0,
        快手完成数: 0,
        快手养号时间: 0,
    })
    try {
        var show = files.read("./flg")
    } catch (error) {
        var show = "1"
    }
    if (show=="1") {
        ui.run(function () {
            window.action.setText("日期:" + 今日记录器.当日日期 + ",抖音完成数:" + 今日记录器.抖音完成数 + ",抖音养号时间:" + 今日记录器.抖音养号时间 + ",快手完成数:" + 今日记录器.快手完成数 + ",快手养号时间:" + 今日记录器.快手养号时间);
        });
    }else{
        ui.run(function () {
            window.action.setText("");
        });
    }
    
}, 500)


