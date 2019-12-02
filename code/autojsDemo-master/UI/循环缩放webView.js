"ui";
ui.layout(
  <vertical>
    <button id='zoom'>获取地址</button>
    <webview id="web" w="*" h="*"></webview>
  </vertical>
)
ui.web.loadUrl('https://weishi.iiilab.com/')

var mode = [{
  w: 100,
  h: 150
},
{
  w: 300,
  h: 450
},
{
  w: device.width + "px",
  h: device.height + "px"
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

// for (var key in ui.web) {
//   log(key)
// }
// var con = files.read("./test.js")
threads.start(function () {
  log("线程开始")
  className("EditText").clickable().findOne().setText("https://h5.weishi.qq.com/weishi/feed/7ckAE6l8j1IxQtQy0/wsfeed?wxplay=1&id=7ckAE6l8j1IxQtQy0&spid=7840188205616640000&qua=v1_and_weishi_6.1.5_588_212011448_d&chid=100081014&pkg=3670&attach=cp_reserves3_1000370011")
  sleep(100)
  className("Button").text("解析视频").click()
  sleep(100)
  text("下载视频").findOne()
  text("视频封面").findOne()
  text("清空").findOne()
  text("获取地址").findOne().click()
})

function haha() {
  this.showInfoFromJs=function (str) {
    log("回传:" + str)
  }
}
var con = ";document.querySelector(\"#app > div > div > div:nth-child(4) > div > div > p:nth-child(1) > a.btn.btn-success\").href;"
ui.zoom.click(
  function () {
    var currentNum = num()
    var currentMode = mode[currentNum]
    log('currentNum=', currentNum)
    ui.run(
      function () {
        // ui.web.attr("width", currentMode.w)
        // ui.web.attr("height", currentMode.h)
        // log(ui.web.addJavascriptInterface(new haha(), "showInfoFromJs"))
        // ui.web.addJavascriptInterface(function showInfoFromJs(str){
        //   log(str)
        // })
        ui.web.evaluateJavascript(con, function ValueCallback(str) {
          log(str)
        })
        exit()
        // var ff=className("EditText").clickable().depth(11).find().setText("123")
        // log("123")
      }
    )
  }
)
//document.querySelector("#app > div > div > div.input-group.input-group-lg > input")