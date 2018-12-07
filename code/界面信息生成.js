auto();


var window = floaty.window(
    <button id="but" w="60dp" h="60dp" text="生成"/>
);

var path = files.join(files.getSdcardPath(), "./界面信息.js");

setInterval(()=>{},250);
var wad = new 悬块(window, window.but);
wad.setLongClick(exit);
wad.setClick(function() {
    toastLog("开始");
    threads.start(function() {
        var obj = {
            Package: currentPackage(),
            Activity: currentActivity(),
            UiObject: 生成表达式(selector().findOne())
        };
        files.write(path, Disassembly(obj));
        new weiFile(context, path).share(); //用分享文件。
    });
});


events.on("exit", function() {
    //files.remove(path);
});

//返回值是一个object。
function 生成表达式(UiObject) {
    if (!UiObject) {
        throw "UiObject 空";
    };
    var ob = {};
        ob.mes = UiOutmessage(UiObject);
    if (UiObject.childCount()) {
        ob.sub = UiOutSubset(UiObject);
    };
    return ob;
};

//在此可以修改或添加它的输出内容
function UiOutmessage(UiObject) {
    var mess = {};
    if (UiObject.className()) {
        mess.className = UiObject.className();
    };
    if (UiObject.id()) {
        mess.id = UiObject.id();
    };
    if (UiObject.text()) {
        mess.text = String(escape(String(UiObject.text())).replace(/%/g,"\\"));
    };
    if (UiObject.desc()) {
        mess.desc = UiObject.desc();
    };
    return mess;
};

function UiOutSubset(UiObject) {
    var ary = new Array;
    for (var i = 0; i < UiObject.childCount(); i++) {
        var child = UiObject.child(i);
        ary.push(生成表达式(child));
    };
    return ary;
};

//json.toString****将生成的表达式字符串化输出。
function Disassembly(A) {
    switch (typeof(A)) {
        case "object":
            var ary = new Array;
            if (Array.isArray(A)) {
                for (var i in A) {
                    ary.push(Disassembly(A[i]));
                };
                return "[" + ary.join(",") + "]";
            } else {
                for (var i in A) {
                    ary.push(i + ":" + Disassembly(A[i]));
                };
                return "{" + ary.join(",") + "}";
            };
            break;
        case "string":
            return "\"" + String(A) + "\"";
            break;
        default:
            return String(A);
    };
};


//定义悬浮窗控制模块，命名为(悬块)。
function 悬块(window, view) {
    //判断是否缺少构造参数。
    if (!window || !view) {
        //缺少构造参数，抛出错误。
        throw "缺参数";
    };
    //记录按键被按下时的触摸坐标
    this.x = 0, this.y = 0;
    //记录按键被按下时的悬浮窗位置
    this.windowX, this.windowY;
    //按下时长超过此值则执行长按等动作
    this.downTime = 500;
    //记录定时执行器的返回id
    this.Timeout = 0;
    //创建点击长按事件
    this.Click = function() {};
    this.LongClick = function() {};
    //可修改点击长按事件
    this.setClick = function(fun) {
        //判断参数类型是否为函数？
        if (typeof fun == "function") {
            this.Click = fun;
        };
    };
    this.setLongClick = function(fun, ji) {
        //判断参数类型是否为函数？
        if (typeof fun == "function") {
            this.LongClick = fun;
            //判断参数是否可为设置数字？
            if (parseInt(ji) <= 1000) {
                this.downTime = parseInt(ji);
            };
        };
    };

    view.setOnTouchListener(new android.view.View.OnTouchListener((view, event) => {
        //判断当前触控事件，以便执行操作。
        switch (event.getAction()) {
            //按下事件。
            case event.ACTION_DOWN:
                //按下记录各种坐标数据。
                this.x = event.getRawX();
                this.y = event.getRawY();
                this.windowX = window.getX();
                this.windowY = window.getY();
                //创建一个定时器用来定时执行长按操作。
                this.Timeout = setTimeout(() => {
                    this.LongClick();
                    this.Timeout = 0;
                }, this.downTime);
                return true;
                //移动事件。
            case event.ACTION_MOVE:
                //移动距离过大则判断为移动状态
                if (Math.abs(event.getRawY() - this.y) > 5 && Math.abs(event.getRawX() - this.x) > 5) {
                    //移动状态清除定时器
                    if (this.Timeout) {
                        //定时器存在则清除定时器。
                        clearTimeout(this.Timeout);
                        this.Timeout = 0;
                    };
                    //移动手指时调整悬浮窗位置
                    window.setPosition(this.windowX + (event.getRawX() - this.x), this.windowY + (event.getRawY() - this.y));
                };
                return true;
                //抬起事件。
            case event.ACTION_UP:
                if (this.Timeout) {
                    //手指抬起时，定时器存在，说明没有移动和按下时间小于长按时间。
                    //清除定时器。
                    clearTimeout(this.Timeout);
                    this.Timeout = 0;
                    //执行点击事件。
                    this.Click();
                };
                return true;
        };
        //控件的触控事件函数必须要返回true。否则报错。
        return true;
    }));
};

//下面是要主要功能的模块。
function weiFile(ctx, path) {
    this.open = function() {
        var intent = new android.content.Intent("android.intent.action.VIEW");
        intent.setDataAndType(this.uri, this.MIMEType);
        ctx.startActivity(Intent.createChooser(intent, "打开文件(" + this.file.getName() + ")"));
    };
    this.share = function() {
        var sendIntent = new android.content.Intent();
        sendIntent.setAction(Intent.ACTION_SEND);
        sendIntent.putExtra(Intent.EXTRA_STREAM, this.uri);
        sendIntent.setType(this.MIMEType);
        ctx.startActivity(Intent.createChooser(sendIntent, "分享文件(" + this.file.getName() + ")"));
    };
    this.getMIMEType = function(file) {
        var MIME_MapTable = {
            'text': ['.txt', '.c', '.conf', '.cpp', '.h', '.htm', '.html', '.java', '.txt', '.js', '.log', '.prop', '.rc', '.sh', '.xml'],
            'image': ['.bmp', '.gif', '.jpeg', '.jpg', '.png'],
            'audio': ['.m3u', '.m4a', '.m4b', '.m4p', '.mp2', '.mp3', '.mpga', '.ogg', '.rmvb', '.wav', '.wma', '.wmv'],
            'video': ['.3gp', '.asf', '.avi', '.m4u', '.m4v', '.mov', '.mp4', '.mpe', '.mpeg', '.mpg', '.mpg4'],
            'application': ['.apk', '.bin', '.class', '.doc', '.docx', '.xls', '.xlsx', '.exe', '.gtar', '.gz', '.jar', '.js', '.mpc', '.msg', '.pdf', '.pps', '.ppt', '.pptx', '.rtf', '.tar', '.tgz', '.wps', '.z', '.zip'],
            '*': ['']
        };
        var type = "*/*";
        var fName = String(file.getName());
        var dotIndex = fName.split(".");
        if (dotIndex.length < 2) {
            return type;
        }
        var end = String("." + dotIndex.pop()).toLowerCase();
        if (end == "") {
            return type;
        };
        for (var i in MIME_MapTable) {
            var ary = MIME_MapTable[i];
            for (var a = 0; a < ary.length; a++) {
                if (end == ary[a]) {
                    toastLog(i + "/*" + "/" + end);
                    return i + "/*";
                };
            };
        };
        return type;
    }
    this.file = new java.io.File(String(path));
    this.uri = android.net.Uri.fromFile(this.file);
    this.MIMEType = this.getMIMEType(this.file);
};