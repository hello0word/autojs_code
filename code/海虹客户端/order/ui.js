Orders = storages.create("Orders")

var window = floaty.window(
    <frame>
        <card w="50" h="50" margin="10 5" cardCornerRadius="30dp"
        cardElevation="1dp" gravity="center_vertical">
        <View bg="#4caf50" h="*" w="*"/>
        <text id="action" gravity="center" textColor="#222222" textSize="16sp"/>
    </card>
    </frame>
);

count = 1
var windowX = device.width - 170,
    windowY = device.height / 2,
    twindowX, twindowY;

padding = 0
var initP = {
    r: padding + device.width - 170,
    l: padding - 30,
    y: windowY
}

window.setPosition(windowX, windowY)

var execution = null;

//记录按键被按下时的触摸坐标
var x = 0,
    y = 0;
//记录按键被按下时的悬浮窗位置
//记录按键被按下的时间以便判断长按等动作
var downTime = 0,
    preClick = {};

function listen(onClick) {
    window.action.setOnTouchListener(function(view, event) {
        switch (event.getAction()) {
            case event.ACTION_DOWN:
                x = event.getRawX();
                y = event.getRawY();
                twindowX = window.getX();
                twindowY = window.getY();
                return true;
            case event.ACTION_MOVE:
                //移动手指时调整悬浮窗位置
                window.setPosition(twindowX + (event.getRawX() - x),
                    twindowY + (event.getRawY() - y));

                return true;
            case event.ACTION_UP:
                count = 1

                if (new Date().getTime() - downTime < 200) {
                    //*双击*//
                    clearTimeout(preClick.id)
                    exit();
                } else {
                    downTime = new Date().getTime();
                    // 手指弹起时如果偏移很小则判断为点击  //*点击*//
                    if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                        x = window.getX()
                        if (x < 0) {
                            window.setPosition(windowX, windowY)
                        } else {
                            preClick.id = setTimeout(onClick, 200 , window);
                        }
                    }
                    windowX = window.getX();
                    windowY = window.getY();

                }
                return true;
        }
        return true;
    });
}

Action = {
    控制台: {
        界面: ["菜单"],
        index: 0
    }
}

window.action.setText(Action.控制台.界面[Action.控制台.index])
// ui.run(()=>{
//     window.requestFocus()
// })
/*
setInterval(() => {
    
}, 1000);
*/

module.exports = listen
//window.setPosition(initP.r+200,initP.y)