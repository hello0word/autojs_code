auto.waitFor()

function click(x,y){
    x=x+random(-5,5)
    y=y+random(-5,5)
    press(x,y,50)
}


//全局
var text_path = "/sdcard/hook/聊天内容.txt"
var 语音输出路径 = "/sdcard/hook/temp.mp3"
var 正确的客户端 = "/sdcard/hook/正确客户端.txt"


// files.write(正确的客户端,"1----xiajixaing----xo1425----031425")

//读取聊天内容
var text_path_open=files.open(text_path,mode = "r", encoding = "utf-8", bufferSize = 8192)
var text_array = text_path_open.readlines()
text_path_open.close()
//读取客户端打开顺序
var 正确的客户端_open = files.open(正确的客户端,mode = "r", encoding = "utf-8", bufferSize = 8192)
var 正确的客户端_array = 正确的客户端_open.readlines()
正确的客户端_open.close()
//解析
var 正确的客户端_list = Array()
正确的客户端_array.forEach((element)=>{
    var 元素切割 = element.split("----")
    
    正确的客户端_list.push(
        {
            序号:元素切割[0],
            账号:元素切割[1],
            密码:元素切割[2],
            支付密码:元素切割[3]
        }
)
})


var text_path_count = 1;

var storage = storages.create("hm5p-多-667")
   




test()
// main()

/**
 * 添加好友的通过部分
 * 
 */
function passFriend(){
    
    var activity = "com.tencent.mm.ui.LauncherUI"
    waitForActivity(activity, period = 200)
    log("页面正确")
    //读取配置 
    var config_passFriend_1= storage.get("通讯加") || false
    
    //为空则全部处理
    text("通讯录").findOne().parent().parent().click()//切换到通讯录
    sleep(1500)
    if (id("brf").exists()){
        toastLog("有好友添加")
        id("brf").findOne().parent().parent().parent().parent().click()
        if(config_passFriend_1==false){
            //全部添加
           while( passFriend_1() ){}
        }else{
            config_passFriend_1 = parseInt(config_passFriend_1)
            for (let index = 0; index <= config_passFriend_1 ; index++) {
                while( passFriend_1() ){}
            }

        }
    }else{
        log("没有好友添加")
    }
}
function passFriend_1(){      
    var ss=text("接受").findOne(2000)
    if(ss){
        ss.click()
    }else{
        return false
    }
    text("完成").findOne().click()
    text("发消息").findOne(3000)
    sleep(500)
    back()
    sleep(500)
    back()
    return true
}

/**
 * 主动添加好友
 */
function addFriend_active(){
    desc("更多功能按钮").findOne().click()
    text("添加朋友").findOne().parent().parent().parent().click()
    var coordinate= text("微信号/QQ号/手机号").findOne().parent().parent().parent().parent().parent().bounds()
    click(coordinate.centerX(),coordinate.centerY())
    var config_addFriend_activie = 10
    for (let index = 0; index < config_addFriend_activie; index++) {
        phone_number = "15532341789"
        sleep(500)
        id("ka").findOne().setText(phone_number)
        sleep(500)
        textStartsWith("搜索:").findOne().parent().parent().click()
        //这里可能用户不存在 可能已经是好友
        sleep(2500)
        if(text("该用户不存在").exists()){
            log("该用户不存在")
            continue
        }else if(text("添加到通讯录").exists()){
            text("添加到通讯录").findOne().parent().parent().click()
            //判断是否需要验证
            var fs=text("发送").findOne(5000)
            fs ? fs.click() : pass
            desc("返回").findOne().parent().click()
        }else{
            toastLog("未知错误")
            return 
        }
        sleep(random(50,100) * 1000)
        log("一次完成")
    }
}

function open_app(config){
    var ss="con-coo-cop-coq-cor-cos-cot-cou-cov-cow-cox-coy-coz-col-cok-coj-coi-coh-cog-cof-coe-cod-coc-cob-coa-cpm-cpn-cpo-cpp-cpq-cpr-cps-cpt-cpu-cpv-cpw-cpx-cpy-cpz-cpl-cpk-cpj-cpi-cph-cpg-cpf-cpe-cpd-cpc-cpb"
    var dd= ss.split("-")
    var ff=dd[parseInt(config)]
    var pack="com.duoduo."+ff
    log(pack)
    app.openAppSetting(pack)
    sleep(1000)
    click("结束运行")
    sleep(500)
    click("确定")
    app.launch(pack)            
    waitForPackage(pack) 
}


function chat_activi(config_zhanghao){
    var ss = className("android.widget.ListView").findOne().find(className("android.widget.LinearLayout").depth(12))
    for (let index = 0; (index < ss.length) && (index <  parseInt(storage.get("聊会天_input")) ) ; index++) {
        var element = ss[index];
        if(element.findOne(className("android.widget.TextView"))){
            element.click()
            sleep(600)
            if(judge()=="用户"){
                chat_start(config_zhanghao)
                sleep(1500)
                while(desc("聊天信息").depth(11).findOnce()){
                    back()
                    sleep(1000)
                }
            }else{
                back()
                sleep(800)
            }
        }else{
            log("没有小红点")
        }
    }
    
}
/**
 * 判断聊天对象
 */
function judge(){
    var ss= desc("返回").findOne(2000).parent().parent().findOne(className("android.widget.TextView")).text()
    if( ( ss.indexOf("(") != -1 )&& (ss.lastIndexOf(")" ) != -1)){
        return "群组"
    }else if(text("订阅号").exists()){
        return "订阅号表"
    }else {
        if(editable(true).exists()){
            return "用户"
        }else{
            return "服务号"
        }
    }
}



function chat_start(config_zhanghao){
    //进来就收红包
    收钱()
    
    var fs = random(0,2)
    var hb = random(0,100) >70 ? true : false
    if(hb){//这里发红包,转账
        金钱交易(config_zhanghao.支付密码)
    }
    switch (fs) {
        case 0://表情
            if(desc("表情").findOne().bounds().centerY() > device.height * 3 / 4  ){
                desc("表情").findOne().click()
            }
            sleep(1500)
            desc("系统表情").findOne().parent().click()
            sleep(800)
            var cishu = random(1,5)
            for (let index = 0; index < cishu; index++) {
                var ss=className("com.tencent.mm.ui.MMImageView").find()
                ss[random(0,ss.length-1)].parent().click()
                sleep(500)
            }
            sleep(500)
            text("发送").className("android.widget.Button").findOne().click()
            break;
        case 1://文本
            var current_text=get_current_text()
            editable(true).setText(current_text)
            sleep(900)
            text("发送").className("android.widget.Button").findOne().click()
            break;
        case 2://语音
            desc("切换到按住说话").click()
            sleep(500)
            var xy=desc("按住说话").text("按住 说话").findOne().bounds()
            var current_text=get_current_text()//获取语音文件
            转音(current_text,语音输出路径)
            media.playMusic(语音输出路径, 1);
            let 时长 = media.getMusicDuration();
            press(xy.centerX(),xy.centerY(),时长)
            sleep(1000)
            desc("切换到键盘").click()
            sleep(500)
            break;
    } 
}
function get_current_text(){
    // throw "这里读取配置"  
    var peizhi=storage.get("发文字"  )
    var couut_my = random(0,peizhi)
    try {
        var benci =  text_array[couut_my+text_path_count* peizhi ]
    } catch (error) {
        text_path_count= 1 //重置计数
        benci =  text_array[couut_my+text_path_count* peizhi ]
    }
    return benci
}

function 转音(text, path, obj) {
    obj = obj || {};

    var API_KEY = "t3V9LBZ8R6dFP6x1FubDe3EY";
    var SECRET_KEY = "nmyiWd8KuHG1y6OncV0kCUOyU8vpra5e";
    try {
        //获取token
        var url_getToken = 'https://aip.baidubce.com/oauth/2.0/token';
        var Token_html = http.post(url_getToken, {
            'grant_type': 'client_credentials', //固定值
            'client_id': API_KEY, //填写你的 APIKey
            'client_secret': SECRET_KEY, //填写你的 SecretKey
        });
    } catch (e) {
        toastLog("未联网");
        return false;
    };

    var TOKEN = Token_html.body.json().access_token;

    var ocr_post_url = http.post("http://tsn.baidu.com/text2audio", {
        'lan': "zh",
        'ctp': "1",
        'cuid': "863281030228548",
        'tok': TOKEN,
        'tex': encodeURI(text),
        'spd': obj.spd || 5, //语速0-15 5
        'pit': obj.pit || 5, //音调0-15 5
        'vol': obj.vol || 15, //音量0-15 5
        'per': obj.per || 4, //	发音人选择, 0为普通女声，1为普通男生，3为情感合成-度逍遥，4为情感合成-度丫丫，默认为普通女声
        'aue': '3', //	3为mp3格式(默认)； 4为pcm-16k；5为pcm-8k；6为wav（内容同pcm-16k）; 注意aue=4或者6是语音识别要求的格式，但是音频内容不是语音识别要求的自然人发音，所以识别效果会受影响。
    });
    var file = ocr_post_url.body.bytes();

    files.writeBytes(path, file);
    return true;
};


function 金钱交易(zhifu_passwd){
    if(descStartsWith("更多功能按钮").findOne().bounds().centerY() > device.height * 3 / 4  ){
        descStartsWith("更多功能按钮").findOne().click()
    }
    if(random(0,1)==0){
        text("红包").findOne().parent().parent().parent().click()
        sleep(1000)
        if(text("红包").depth(8).exists()){
            text("红包").depth(8).findOne().parent().parent().click()
        }
        var 配置 = storage.get("红包金额指数") || 10
        editable(true).text("0.00").findOne().setText(配置 * 0.01)//红包金额
        text("塞钱进红包").findOne().click()
        sleep(2500)
        if(text("使用密码").exists()){
            text("使用密码").click()
            sleep(1500)
        }
        var 支付密码 = zhifu_passwd
        for (let index = 0; index < 6; index++) {
            var x_y=输入支付密码(支付密码[index])
            click(x_y.x,x_y.y)
            sleep(300)
        }
    }else{
        text("转账").findOne().parent().parent().parent().click()
        var 配置 = storage.get("红包金额指数") || 10
        editable(true).clickable(true).depth(16).findOne().setText(配置 * 0.01)
        text("转账").className("android.widget.Button").findOne().click()
        var 继续转账 = text("继续转账").clickable(true).depth(7).findOne(1500)
        继续转账 ? 继续转账.click() : log("没有未接收转账")
        sleep(2000)
        if(text("使用密码").exists()){
            text("使用密码").click()
            sleep(1500)
        }
        var 支付密码 = zhifu_passwd
        for (let index = 0; index < 6; index++) {
            var x_y=输入支付密码(支付密码[index])
            click(x_y.x,x_y.y)
            sleep(300)
        }
        text("完成").depth(11).clickable(true).findOne().click()
    }
}
function 输入支付密码(数字){
    var dd =className("android.widget.LinearLayout").depth(7).find()
    var 第一组_中点  =dd[dd.length-4].bounds().centerY()
    var 第二组_中点  =dd[dd.length-3].bounds().centerY()
    var 第三组_中点  =dd[dd.length-2].bounds().centerY()
    var 第四组_中点  =dd[dd.length-1].bounds().centerY()
    数字  = parseInt(数字)
    switch (数字) {
        case 1:
            return {x:device.width /4    ,y:第一组_中点}
        case 2:
            return {x:device.width /4 *2 ,y:第一组_中点}
        case 3:
            return {x:device.width /4 *3 ,y:第一组_中点}
        case 4:
            return  {x:device.width /4    ,y:第二组_中点}
        case 5:
        return {x:device.width /4   *2  ,y:第二组_中点}
        case 6:
        return {x:device.width /4 *3 ,y:第二组_中点}
        case 7:
        return {x:device.width /4    ,y:第三组_中点}
        case 8:
        return {x:device.width /4 *2 ,y:第三组_中点}
        case 9:
        return  {x:device.width /4 *3 ,y:第三组_中点}
        case 0:
        return  {x:device.width /4 *2 ,y:第四组_中点} 
    }
}


function 收钱(){
    var dd = textStartsWith("恭喜发财").find()
    var tag = true
    while(dd.length != 0 && tag){
        dd.forEach((element)=>{
            if(element.bounds().left < device.width * 0.35){
                if (element.parent().childCount() == 1 ){
                    log("发现未收取红包")
                    element.parent().parent().parent().parent().click()
                    sleep(1000)
                    className("android.widget.Button").findOne().click()
                    sleep(500)
                    desc("返回").findOne().parent().click()
                    tag = true
                    sleep(2500)
                    dd = textStartsWith("恭喜发财").find()
                }else{
                    log("已领取的红包")
                    tag = false
                }
            }else{
                log("自己的红包")
                tag = false
            }
        })
    }
    var element = text("转账给你").findOnce()
    while(element){
        element.parent().parent().parent().parent().click()
        text("确认收款").findOne().click()
        sleep(1000)
        desc("返回").findOne().parent().click()
        sleep(2500)
        element = text("转账给你").findOnce()
        log("循环一遍")
    }
}




function start_run(config_zhanghao){
    passFriend()//通过好友
    addFriend_active()//主动加好友
    chat_activi(config_zhanghao)//聊天: 收红包,随机文字,表情,语音,转账,发红包
}


function main(){
    if(storage.get('正常顺序')){
        for (let index = 0; index < 正确的客户端_list.length; index++) {
            var element = 正确的客户端_list[index];
            open_app(element.序号)
            start_run(element)
        }  
    }else{
        while(正确的客户端_list.length > 0 ) {
            var current_元素=random(0,正确的客户端_list-1)
            var element = 正确的客户端_list[current_元素];
            open_app(element.序号)
            正确的客户端_list.splice(current_元素,1)//使用过了就删除
            start_run(element)
        } 
    }
    
}




function test(){
    
}

