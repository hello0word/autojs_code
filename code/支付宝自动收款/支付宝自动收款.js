

var storage = storages.create("支付宝工具")


function main(){

}


function 进入聊天页面(){
    id("social_bottom_tab").findOne().click()//朋友按钮
    sleep(2000)
    let recent_list = id("recent_list").findOne()// 所有聊天列表
    recent_list.child(3).click()//置顶第一个
    sleep(2000)
}

function 发起收款(){

    id("chat_stage_control_btn").findOne().click()
    sleep(1000)
    let 收款文字 = text("收款").id("appname_tv").findOne()
    收款文字.parent().parent().click()
}

function 获取收款金额(){
    let dow = storage.get("数额下限", 1)
    let up = storage.get("数额上限", 10)
    log("下:"+dow)
    log("上:"+up)
    let my_ran = random(Number(dow),Number(up))
    log("随机数:" + my_ran)
    if (my_ran >=100) {
        return parseInt( my_ran / 100 ) * 100
    }else{
        return parseInt( my_ran / 10 ) *10
    }
}
 

function test(){
   
    
    let 收款金额 = 获取收款金额()
    log(收款金额)
    let 金额输入框 = text("免服务费").className("android.widget.EditText").findOne()
    金额输入框.setText(收款金额)
    let 选填框 = text("选填").className("android.widget.EditText").findOne()
    
}


// main()
test()