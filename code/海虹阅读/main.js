"ui";

var 默认配置 = "默认配置,运行到没任务了立即切换"
var 倒计时 = 30
var storage = storages.create("海虹阅读")

var 抖音勾选 = storage.get("抖音勾选", false), 快手勾选 = storage.get("快手勾选", false)
var 评论文件位置 = storage.get("评论文件位置", "")
var 配置_抖音完成次数 = storage.get("抖音完成次数",10)
var 配置_抖音养号时间 = storage.get("抖音养号时间",10)
var 配置_快手完成次数 = storage.get("快手完成次数",10)
var 配置_快手养号时间 = storage.get("快手养号时间",10)
var 配置_抖音没任务次数 = storage.get("配置_抖音没任务次数",3)
var 配置_快手没任务次数 = storage.get("配置_快手没任务次数",3)

ui.layout(
    <vertical padding="16">
        <horizontal>
            <button id="设置按钮" w="auto" style="Widget.AppCompat.Button.Colored">设置</button>
            <text gravity="center" textSize="40sp" textColor="red" textStyle="bold">海虹阅读</text>
            <button id="日志按钮" w="auto" style="Widget.AppCompat.Button.Colored">日志</button>
        </horizontal>
        <text gravity="center" textSize="14sp" textStyle="bold">只勾选一个则只跑单app,勾选两个则根据模式选择交替方法</text>
        <horizontal>
            <text w="auto" margin="0 5 20 40">功能勾选:</text>
            <vertical>
                <checkbox id="抖音勾选框" text="抖音" checked={抖音勾选}></checkbox>
                <checkbox id="快手勾选框" text="快手" checked={快手勾选}></checkbox>
            </vertical>
            <vertical>
                <Switch margin="30 5 20 0" id='评论开关' text="评论开关:" w="auto" />
                <button margin="25 0 20 0" text="更改评论文件" id="更改评论文件" w="auto"  ></button>
            </vertical>


        </horizontal>
        <horizontal>
            <text w="auto" margin="0 5 20 40">交替模式:</text>
            <radiogroup mariginTop="16" id="交替模式">
                <radio text="自动交替执行" checked="true" />
                <radio text="定时交替执行" />
                <radio text="成功计次交替执行" />
                <radio text="没任务计次交替执行" />
            </radiogroup>
        </horizontal>

        <horizontal >
            <text id="config_name" margin="0 5 0 0" textSize="14sp" textStyle="bold" text={默认配置} w="auto"></text>
            <input id="配置输入框" text="" w="80" textSize="14sp" />
            <text id="config_danwei" margin="0 5 0 0" textSize="14sp" textStyle="bold" text="" w="50"></text>
        </horizontal>
        <horizontal>
            <text id="评论文件位置" text={"评论文件位置:" + 评论文件位置}></text>
        </horizontal>

        <vertical>
            <horizontal>
                <text>抖音完成次数:</text>
                <input id="抖音完成次数" w="50" text={配置_抖音完成次数}></input>
                <text>养号时间(分钟):</text>
                <input id="抖音养号时间" hint="分钟" text={配置_抖音养号时间}></input>
            </horizontal>
        </vertical>
        <vertical>
            <horizontal>
                <text>快手完成次数:</text>
                <input id="快手完成次数" w="50" text={配置_快手完成次数}></input>
                <text>养号时间(分钟):</text>
                <input id="快手养号时间" hint="分钟"text={配置_快手养号时间}></input>
            </horizontal>
        </vertical>
        <horizontal>
                <text>抖音没任务次数:</text>
                <input id="配置_抖音没任务次数" w="50" text={配置_抖音没任务次数}></input>
                <text>快手没任务次数:</text>
                <input id="配置_快手没任务次数" w="50" text={配置_快手没任务次数}></input>
            </horizontal>
        <button id="立即开始" text={"立即开始(" + 倒计时 + ")"} w="*" gravity="center" style="Widget.AppCompat.Button.Colored" />
    </vertical>
);

function main() {
    var 输入内容读取 = ui.配置输入框.text()
    var 当前选择的交替模式 = storage.get("交替模式", 0)
    switch (当前选择的交替模式) {
        case 0:
            // storage.put()
            break;
        case 1:
            storage.put("时间间隔", 输入内容读取)

            break;
        case 2:
            storage.put("每成功", 输入内容读取)

            break;
        case 3:
            storage.put("每没任务", 输入内容读取)

            break;

    }
    //log(输入内容读取)
    storage.put("抖音完成次数",ui.抖音完成次数.text())
    storage.put("抖音养号时间",ui.抖音养号时间.text())
    storage.put("快手完成次数",ui.快手完成次数.text())
    storage.put("快手养号时间",ui.快手养号时间.text())
    storage.put("配置_抖音没任务次数",ui.配置_抖音没任务次数.text())
    storage.put("配置_快手没任务次数",ui.配置_快手没任务次数.text())
    if (new Date().getTime() - 上次点击时间 > 5000) {
        上次点击时间 = new Date().getTime()
        app.startActivity("console")
        execution = engines.execScriptFile("./zhenghe.js");
        ui.finish()
    } else {
        toastLog("请等待")
    }
}


var 上次点击时间 = 0
ui.立即开始.on("click", () => {
    main()
})

ui.更改评论文件.on("click", () => {
    startChooseFile("*/*");
})

ui.设置按钮.on("click", () => {
    app.startActivity("settings")
})
ui.日志按钮.on("click", () => {
    app.startActivity("console")
})
var 交替模式 = storage.get("交替模式", 0)
/**
 * 控制单选框
 */
单选按钮集合 = []
ui.post(
    function () {
        var count = ui.交替模式.getChildCount()
        for (var i = 0; i < count; i++) {
            var view = ui.交替模式.getChildAt(i)
            var id = view.id
            if (i == 交替模式) {
                view.checked = true
            }
            if (i == 0) {
                ui.配置输入框.setVisibility(View.INVISIBLE)
            }
            var 评论开关 = storage.get("评论开关", false)
            ui.评论开关.setChecked(评论开关)
            var content = view.getText().toString()
            单选按钮集合.push({
                num: i,
                id: id,
                content: content,
            })
        }
        //log(单选按钮集合)

    }
)


function getAttr(obj) {
    var attrs = []
    for (var k in obj) {
        attrs.push(k)
    }
    attrs.sort()
    //log(attrs)
}
importClass(android.view.View)
ui.交替模式.setOnCheckedChangeListener(//单选框选择
    function (radioGroup, id) {
        var myIdStartFrom0 = id - 单选按钮集合[0].id
        var content = radioGroup.getChildAt(myIdStartFrom0).getText().toString()
        storage.put("交替模式", myIdStartFrom0)

        if (myIdStartFrom0 == 0) {
            //log("0")
            ui.配置输入框.setVisibility(View.INVISIBLE)
            ui.config_name.setText(默认配置)
            var 存储内容读取 = 0
            ui.config_danwei.setText("")
        } else if (myIdStartFrom0 == "1") {
            //log("1")
            ui.配置输入框.setVisibility(View.VISIBLE)
            ui.config_name.setText("时间间隔:")
            var 存储内容读取 = storage.get("时间间隔", "5")
            ui.配置输入框.setText(存储内容读取)

            ui.config_danwei.setText("分钟")
        } else if (myIdStartFrom0 == "2") {
            // log("2")
            ui.配置输入框.setVisibility(View.VISIBLE)

            ui.config_name.setText("每成功:")
            var 存储内容读取 = storage.get("每成功", "3")
            ui.配置输入框.setText(存储内容读取)

            ui.config_danwei.setText("次切换")
        } else if (myIdStartFrom0 == "3") {
            // log("3")
            ui.配置输入框.setVisibility(View.VISIBLE)

            ui.config_name.setText("每没任务:")
            var 存储内容读取 = storage.get("每没任务", "2")
            ui.配置输入框.setText(存储内容读取)
            ui.config_danwei.setText("次切换")
        }
        var msg = util.format('序号=%s, 内容=%s', myIdStartFrom0, content)
        // toastLog(msg)
    }
)
/////////////////////////////////////////////////////
/**
 * 功能区监听
 */
ui.抖音勾选框.on("check", (checked) => {
    if (checked) {
        storage.put("抖音勾选", true)
    } else {
        storage.put("抖音勾选", false)
    }
});

ui.快手勾选框.on("check", (checked) => {
    if (checked) {
        storage.put("快手勾选", true)
    } else {
        storage.put("快手勾选", false)
    }
});
ui.评论开关.on("check", (checked) => {
    storage.put("评论开关", checked);
});

/**
 * 文件选择
 */
var ResultIntent = {
    intentCallback: {},
    init: function () {
        activity.getEventEmitter().on("activity_result", (requestCode, resultCode, data) => {
            this.onActivityResult(requestCode, resultCode, data);
        });
    },
    startActivityForResult: function (intent, callback) {
        var i;
        for (i = 0; i < 65536; i++) {
            if (!(i in this.intentCallback)) break;
        }
        if (i >= 65536) {
            toast("启动Intent失败：同时请求的Intent过多");
            return;
        }
        this.intentCallback[i] = callback;
        activity.startActivityForResult(intent, i);
    },
    onActivityResult: function (requestCode, resultCode, data) {
        var cb = this.intentCallback[requestCode];
        if (!cb) return;
        delete this.intentCallback[requestCode];
        cb(resultCode, data);
    }
};
ResultIntent.init();
function URIUtils_uriToFile(uri) { //Source : https://www.cnblogs.com/panhouye/archive/2017/04/23/6751710.html
    var r = null,
        cursor, column_index, selection = null,
        selectionArgs = null,
        isKitKat = android.os.Build.VERSION.SDK_INT >= 19,
        docs;
    if (uri.getScheme().equalsIgnoreCase("content")) {
        if (isKitKat && android.provider.DocumentsContract.isDocumentUri(activity, uri)) {
            if (String(uri.getAuthority()) == "com.android.externalstorage.documents") {
                docs = String(android.provider.DocumentsContract.getDocumentId(uri)).split(":");
                if (docs[0] == "primary") {
                    return android.os.Environment.getExternalStorageDirectory() + "/" + docs[1];
                }
            } else if (String(uri.getAuthority()) == "com.android.providers.downloads.documents") {
                uri = android.content.ContentUris.withAppendedId(
                    android.net.Uri.parse("content://downloads/public_downloads"),
                    parseInt(android.provider.DocumentsContract.getDocumentId(uri))
                );
            } else if (String(uri.getAuthority()) == "com.android.providers.media.documents") {
                docs = String(android.provider.DocumentsContract.getDocumentId(uri)).split(":");
                if (docs[0] == "image") {
                    uri = android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI;
                } else if (docs[0] == "video") {
                    uri = android.provider.MediaStore.Video.Media.EXTERNAL_CONTENT_URI;
                } else if (docs[0] == "audio") {
                    uri = android.provider.MediaStore.Audio.Media.EXTERNAL_CONTENT_URI;
                }
                selection = "_id=?";
                selectionArgs = [docs[1]];
            }
        }
        try {
            cursor = activity.getContentResolver().query(uri, ["_data"], selection, selectionArgs, null);
            if (cursor && cursor.moveToFirst()) {
                r = String(cursor.getString(cursor.getColumnIndexOrThrow("_data")));
            }
        } catch (e) {
            log(e)
        }
        if (cursor) cursor.close();
        return r;
    } else if (uri.getScheme().equalsIgnoreCase("file")) {
        return String(uri.getPath());
    }
    return null;
}

function startChooseFile(mimeType, callback) {
    var i = new android.content.Intent(android.content.Intent.ACTION_GET_CONTENT);
    i.setType(mimeType);
    ResultIntent.startActivityForResult(i, function (resultCode, data) {
        if (resultCode != activity.RESULT_OK) return;
        var f = URIUtils_uriToFile(data.getData());
        //toastLog(f);
        if (files.exists(f)) {
            if (files.getExtension(f) == "txt") {
                ui.run(() => {
                    ui.评论文件位置.setText(f);
                });
                storage.put("评论文件位置", f)
            } else {
                toastLog("只能选择txt文件")
            }
        }

    });
}




setInterval(() => {
    倒计时 -= 1
    if (倒计时 <= 0) {
        main()
    }
    ui.立即开始.setText("立即开始(" + 倒计时 + ")")
}, 1000)

// setTimeout(() => {
//     ui.finish()
//     engines.execScript("test", "toast(\"123\")")
// }, 50000)