"ui";
//https://gitee.com/jixiangxia_admin/autojs_demo/raw/master/mode.js
function 导入常用函数模块() {
    var url = 'https://gitee.com/jixiangxia_admin/autojs_demo/raw/master/mode.js'
    var r = http.get(url)
    log("code = " + r.statusCode);
    var html = r.body.bytes()
    files.write('./autojsCommonFunctions.js', '')
    files.writeBytes('./autojsCommonFunctions.js', html)
    var common = require('./autojsCommonFunctions.js')
    return common
  }
var common
var js
threads.start(function(){
    common = 导入常用函数模块()
    log("导入完成")
    // log(common)
    var re= http.get("http://192.168.3.20/autojs/webview/test.js")
    if (re.statusCode ==200) {
      log("ok")
      js = re.body.string()
      // log(js)
    }else{
      log("error")
    }
})



ui.layout(
  <vertical>
    <button id='zoom'>循环缩放</button>
    <webview id="web" w="1" h="1"></webview>
  </vertical>
)
importClass(android.webkit.WebSettings)
importClass(android.webkit.CookieSyncManager)
importClass(android.webkit.CookieManager)

ui.web.getSettings().setCacheMode(WebSettings.LOAD_NO_CACHE)
ui.web.loadUrl('https://weishi.iiilab.com/')
// ui.web.loadUrl('https://weishi.iiilab.com/')

// CookieSyncManager.createInstance(context);  //Create a singleton CookieSyncManager within a context
//     var cookieManager = CookieManager.getInstance(); // the singleton CookieManager instance
//     cookieManager.removeAllCookie();// Removes all cookies.
//     CookieSyncManager.getInstance().sync(); // forces sync manager to sync now

//     ui.web.setWebChromeClient(null);
//     ui.web.setWebViewClient(null);
//     ui.web.getSettings().setJavaScriptEnabled(false);
//     ui.web.clearCache(true);


var mode = [{
    w: 100,
    h: 150
  },
  {
    w: 300,
    h: 450
  },
  {
    w: device.width+"px",
    h: device.height+"px"
  },
  {
    w: 900,
    h: 1350
  }
]
var num = function () {
  var current = 0
  return function () {
    if (current > mode.length - 1) {
      current = 0
    }
    return current++
  }
}()

// setTimeout()


  function    ohoh() {
    var currentNum = num()
    var currentMode = mode[currentNum]
    log('currentNum=', currentNum)
    ui.run(
      function () {
        // ui.web.attr("width", currentMode.w)
        // ui.web.attr("height", currentMode.h)
        // log(js)
        ui.web.evaluateJavascript(js,function ValueCallback(str){
          log(str)
        })
      }
    )
  }
  setTimeout(ohoh,3000)
//document.querySelector("#app > div > div > div.input-group.input-group-lg > input")