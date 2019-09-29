// var xiaoxi=id("maintab_layout_chat")
// log(xiaoxi.findOne().click())
// var xiaoxi=id("maintab_layout_nearby")
// log(xiaoxi.findOne().click())
var storage=storages.create(("db"))
var jiange = Number(storage.get("jiange",10))
var tinliu = Number(storage.get("tinliu",30))
toastLog("间隔:"+jiange+"分钟,停留:"+tinliu+"秒")
function main(params) {
    var xiaoxi=id("maintab_layout_chat")
    var fujin=id("maintab_layout_nearby")
    while (true) {
        // sleep(3000)
        sleep(jiange * 1000 * 60)
        fujin.findOne().click()
        sleep(tinliu * 1000)
        // sleep(3000)
        xiaoxi.findOne().click()
    }
}
main()
