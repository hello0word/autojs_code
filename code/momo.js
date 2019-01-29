auto.waitFor()

device.keepScreenOn(3600 * 1000)
console.setGlobalLogConfig({
    file:"/sdcard/陌陌助手日志.txt"
})
const momopackageName="com.immomo.momo"
const flash_activity = "com.immomo.momo.android.activity.WelcomeActivity"//首页动画

const phone_number_activity = "com.immomo.momo.newaccount.login.view.LoginActivity"//手机号登陆注册
const send_phone_number_activity  = "com.immomo.momo.mvp.register.view.RegisterWithPhoneActivity"//输入昵称

const input_six_check_activity = "com.immomo.momo.newaccount.login.view.LoginActivity" //输入6位验证码
const main_activity = "com.immomo.momo.maintab.MaintabActivity"//首页
const setting_activity = "com.immomo.momo.setting.activity.UserSettingActivity"//设置
const security_center_activity ="com.immomo.momo.account.activity.SecurityCenterActivity"//账号与安全
const password_change_activity ="com.immomo.momo.account.activity.ChangePwdActivity"//密码修改
const g_time = 6000
const momo_path="/sdcard/陌陌账号密码.txt"

const token="28693CD585204A4B99FB8D12083202D2"



                            // test()
               main()


function end_clear(){
    app.launchApp("设置")
    text("更多设置").findOne().parent().parent().parent().parent().click()
    text("恢复出厂设置").findOne().parent().parent().parent().click()
    text("恢复出厂设置").findOne().parent().parent().parent().click()
    text("清除所有数据").findOne().parent().parent().parent().click()
    text("重置手机").findOne().click()
    text("清除全部内容").findOne().click()
}

function start_tongxunlu(){
    app.launchApp("联系人")//打开联系人
    text("从存储设备导入").findOne().click()//点击导入
    text("vCard文件").findOne().click()//选择vcard
    className("CheckBox").findOne().parent().click()
    sleep(2000)
    className("android.widget.Button").text("导入").findOne().click()
    sleep(4000)
    back()
}



function getName(){
    var familyNames = new Array(
    "赵", "钱", "孙", "李", "周", "吴", "郑", "王", "冯", "陈", 
    "褚", "卫", "蒋", "沈", "韩", "杨", "朱", "秦", "尤", "许",
    "何", "吕", "施", "张", "孔", "曹", "严", "华", "金", "魏", 
    "陶", "姜", "戚", "谢", "邹", "喻", "柏", "水", "窦", "章",
    "云", "苏", "潘", "葛", "奚", "范", "彭", "郎", "鲁", "韦", 
    "昌", "马", "苗", "凤", "花", "方", "俞", "任", "袁", "柳",
    "酆", "鲍", "史", "唐", "费", "廉", "岑", "薛", "雷", "贺", 
    "倪", "汤", "滕", "殷", "罗", "毕", "郝", "邬", "安", "常",
    "乐", "于", "时", "傅", "皮", "卞", "齐", "康", "伍", "余", 
    "元", "卜", "顾", "孟", "平", "黄", "和", "穆", "萧", "尹"
    );
    var givenNames = new Array(
    "子璇", "淼", "国栋", "夫子", "瑞堂", "甜", "敏", "尚", "国贤", "贺祥", "晨涛", 
    "昊轩", "易轩", "益辰", "益帆", "益冉", "瑾春", "瑾昆", "春齐", "杨", "文昊", 
    "东东", "雄霖", "浩晨", "熙涵", "溶溶", "冰枫", "欣欣", "宜豪", "欣慧", "建政", 
    "美欣", "淑慧", "文轩", "文杰", "欣源", "忠林", "榕润", "欣汝", "慧嘉", "新建", 
    "建林", "亦菲", "林", "冰洁", "佳欣", "涵涵", "禹辰", "淳美", "泽惠", "伟洋", 
    "涵越", "润丽", "翔", "淑华", "晶莹", "凌晶", "苒溪", "雨涵", "嘉怡", "佳毅", 
    "子辰", "佳琪", "紫轩", "瑞辰", "昕蕊", "萌", "明远", "欣宜", "泽远", "欣怡", 
    "佳怡", "佳惠", "晨茜", "晨璐", "运昊", "汝鑫", "淑君", "晶滢", "润莎", "榕汕", 
    "佳钰", "佳玉", "晓庆", "一鸣", "语晨", "添池", "添昊", "雨泽", "雅晗", "雅涵", 
    "清妍", "诗悦", "嘉乐", "晨涵", "天赫", "玥傲", "佳昊", "天昊", "萌萌", "若萌"
    );
    var i = random(0,familyNames.length-1)
    var familyName = familyNames[i];
    var j = random(0,givenNames.length-1)
    var givenName = givenNames[j];
    var name = familyName + givenName;
    return name
    }

/**
 * 该函数确保有一个可用号码
 */
function get_phone(){
    var url="http://qiba.codesfrom.com:18000/yhapi.ashx?Action=getPhone&token="+token+"&i_id=1013"
    var resposed = http.get(url)
    var re = resposed.body.string()
    toastLog(re)
    if(resposed.statusCode ==200){
        var arr=re.split("|");
        if(arr[0]=="OK"){
            return {num:arr[4],pid:arr[1],time:arr[2],chuankou:arr[3]}
        }else{
            switch (arr[1]) {
                case "余额不足,请充值":
                    toastLog("余额不足,请充值")
                    exit()
                case "Token无效":
                    toastLog("Token无效")
                    exit()
                case "未使用号过多,请补充余额":
                    toastLog("未使用号过多,请补充余额")
                    exit()
                case "暂时无号":
                    toastLog("暂时无号,等待20秒")
                    sleep(20*1000)
                    return get_phone()
                default:
                    toastLog("等待20秒")
                    sleep(20*1000)
                    return get_phone()
            }
        }
        //OK|P_ID|获取时间|串口号|手机号|发送短信项目的接收号码|国家名称或区号
    }

}

function wait_check(取号接口返回的P_ID){
    log(取号接口返回的P_ID)
    url="http://qiba.codesfrom.com:18000/yhapi.ashx?Action=getPhoneMessage&token="+token+"&p_id="+取号接口返回的P_ID
    var resposed = http.get(url)
    var re=resposed.body.string()
    log(re)
    if(resposed.statusCode ==200){
       

        var arr=re.split("|");
        if(arr[0]=="OK"){
            log("waitcheck_获取成功")
            return {验证码数字:arr[1],完整短信内容:arr[2]}
        }else{
            switch (arr[1]) {
                case "等待验证码":
                log("等待验证码")    
                sleep(8000)
                    return wait_check(取号接口返回的P_ID)
                case "已离线或强制释放":
                    log("已离线或强制释放")    
                    return false
                default:
                log("缺省等待")    
                sleep(8000)
                return  wait_check(取号接口返回的P_ID)
            }
        }
    }
}

function release_phone(取号接口返回的P_ID){
    var url = "http://qiba.codesfrom.com:18000/yhapi.ashx?Action=phoneRelease&token="+token+"&p_id="+取号接口返回的P_ID
    var resposed = http.get(url)
    if(resposed.statusCode ==200){
        toastLog(resposed.body.string())
    }
}

function address_list(){
    id("maintab_layout_chat").findOne(g_time).click()
    id("action_jump_contact").findOne(g_time).click()
    sleep(2500)
    var root_serarch =id("layout_fullsearch_container").findOne(g_time).parent().parent().child(2).child(0).click()
    for(let i=0;i<15;i++){
        toastLog("等待通讯录加载完成")
        let roots=id("listview_contact").findOne(g_time)
        if(roots){
            let count = roots.childCount()
            if (count > 3){
                log("朋友页加载完成")
                break
            }
        }
        sleep(2000)
    }
    className("android.widget.ImageButton").findOne().click()
    sleep(200)
    className("android.widget.ImageButton").findOne().click()
}

function main(){
    start_tongxunlu()
    sleep(1000)
    app.launchPackage(momopackageName)
    waitForActivity(flash_activity,period = 200)
    files.create(momo_path);
    switch (currentActivity()) {
        case flash_activity:
            首页()
            break;
        case phone_number_activity:
            toastLog("首页")
            break;
        default:
            throw "不在首页"
    }
    sleep(800)
    if(currentActivity() == phone_number_activity){//第二套
        log("第一组")
        diyizu()
    }else{
        log("第二组")
        dierzu()

    }
    sleep(2000)
    flage=dialogs.confirm("清理？")

    flage ?  end_clear() : exit()
    

}

function get_pass(){
    var st1=Math.random().toString(36).substr(2).slice(0,7)
    var st2 = random(0,9)
    return st1+st2
}

function diyizu(){
    var phonenumber = get_phone()
    try{
        填写手机号(phonenumber.num)
        var 验证码 = wait_check(phonenumber.pid)
        log(验证码)
        填写验证码(验证码.验证码数字)
        var 昵称=getName()
        log(昵称)
        填写个人信息(昵称)
        上传头像()
        log("上传头像完成")
        
        sleep(200)
        log("进入通讯录")
        //////////
        //这里处理通讯录问题
        address_list()
        //////

        var pass =  get_pass()
        log("密码:"+pass)
        设置密码(pass)
        var myDate = new Date();
        myDate.toLocaleString( )
        var date_time=myDate.toLocaleString()
        var texts =date_time +"|手机号:"+phonenumber.num+"|密码:"+pass+"\n";
        log(texts)
        up_data(phonenumber.num,pass)
        files.append(momo_path, texts);
    }catch (error) {
        //释放手机号
        log(error)
        release_phone(phonenumber.pid)
    }
}



function dierzu(){
    var 昵称=getName()
    id("rg_et_name").findOne(g_time).setText(昵称)//输入昵称
    
    id("btn_next").findOne().click()//下一步
    
    dier_个人信息()//头像选择
    var phonenumber = get_phone()
    try {
        var pass =  get_pass()
        填写手机号2(phonenumber,pass)
        var check_number =wait_check(phonenumber.pid)
        填写验证码2(check_number)
        var myDate = new Date();
        myDate.toLocaleString( )
        var date_time=myDate.toLocaleString()
        var texst =date_time +"|手机号:"+phonenumber.num+"|密码:"+pass+"\n";
        log(texst)
        files.append(momo_path, texst);
        up_data(phonenumber.num,pass)
        sleep(200)
    } catch (error) {
        //释放手机号
        log(error)
        release_phone(phonenumber.pid)
    }
    //通讯录处理
    address_list()

}

//com.immomo.momo.moment.activity.VideoRecordAndEditActivity
function dierzutuxiang(){
    id("rg_iv_userphoto").findOne().click()
    /*
    var suiji = random(1,14)
    lists[suiji].child(1).click()
    
    var suijis=[1,2,3,4,5,6,7,8,9,10,11,12,13,14]
    for(let i=0;i<14;i++){
        //log(i)
        var lists= id("rl_recycler").findOne().children()
        var suiji = random(0,suijis.length-1)
        log(lists[suijis[suiji]].child(1).click())
        sleep(2000)
        if(currentActivity() == "com.immomo.momo.multpic.activity.ImageEditActivity"){
            log("跳出")
            break
        }else{
            var index = suijis.indexOf(suijis[suiji]);
            suijis.splice(index,1)
        }
    }
    */
    var sucai_anniu=text("确认").findOne()
    if(sucai_anniu){
        sucai_anniu.click()//素材包处理
    }

    id("imagefactory_btn2").findOne().click()//确认
    var 完成=id("media_edit_btn_send").findOne(g_time)//完成
    完成.click()
    

}


function dier_个人信息(){
    dierzutuxiang()
    id("rg_tv_birthday").findOne().click()//日期选择
    wait_date("rg_tv_birthday")
    id("reg_layout_female").findOne().click()
    id("btn_next").findOne().click()//下一步
    sleep(2000)
    if(text("确认").exists()){ //也许头像选不上
        text("确认").findOne().click()//确认性别不可更改
        return 
    }else{
        dierzutuxiang()
        id("btn_next").findOne().click()//下一步
    }
}
function test(){
    // log(Math.random().toString(36).substr(2))
    var res = http.get("https://gitee.com/jixiangxia/codes/7ztl0rg6jpcxny4sm5wuf84/raw?blob_name=momo.js")
    log(res.body.string())
    //log(get_pass())
    }

function up_data(zh,pass){
    var url = "http://47.94.5.6/MoMo/MoMo_Pro.ashx?momo=insertAccount&momo_zh="+zh+"&momo_pwd="+pass
    var res = http.get(url)
    if(res.statusCode==200){
        if(res.body.string()=="ok"){
            log("上传完成")
            return true
        }else{
            log("本次上传失败")
            sleep(2000)
            return up_data(zh,pass)
        }
    }else{
        log("本次上传失败")
        sleep(2000)
        return up_data(zh,pass)
    }
}
function 填写手机号2(phonenumber,pass){
    id("rg_et_phone").findOne().setText(phonenumber.num)
    log(pass)
    id("rg_et_password").findOne().setText(pass)
    id("btn_next").findOne().click()
    var queren=text("确认").findOne(g_time)
    log(queren)
    queren ? queren.click() : log("没发现确认手机号")//确认手机号
    }

function 首页(){
    id("btn_register").findOne().click()
}


function 填写手机号(phonenumber){
    id("et_verify_code").findOne().setText(phonenumber)//手机号填写框
    id("btn_resend_verify_code").findOne().click()//获取验证码按钮
    }

function 填写验证码2(验证码){
    log("验证码为:"+验证码.验证码数字)
    id("layout_verify_code").findOne().setText(验证码.验证码数字)
    let tiaoguo =id("txt_open_momo").findOne(g_time*3)//跳过
    tiaoguo ? tiaoguo.click() :log("第二次登陆")
}

function 填写验证码(验证码){
    id("et_verify_code").findOne().setText(验证码)
}

function wait_date(dd){
    while(true){
        var date_text=id(dd).findOne()
        var book=date_text.text()
        if (book != "选择生日"){
            log("填写出生日期完成")
            return 
        }
        sleep(400)
    }
}
function 填写个人信息(昵称){
    id("et_name").findOne().setText(昵称)
    id("rl_birth").findOne().click()//出生日期
    //等待用手点击
    wait_date("tv_birthday")
    id("rl_female").findOne().click()//选择性别
    id("btn_next").findOne().click()//下一步
    }
function 上传头像(){
    log("上传头像")
    id("img_photo").findOne().click()//打开图像选择
    //这里通过图像识别或者选择固定的哪一个
    //sleep(1000)
    //var lists= id("rl_recycler").findOne().children()
    //var suijis=[1,2,3,4,5,6,7,8,9,10,11,12,13,14]
    //var suiji = random(1,14)
    //lists[suiji].child(1).click()
    /*
    for(let i=0;i<14;i++){
        
        lists[suijis[suiji]].child(1).click()
        sleep(2500)
        if(currentActivity() == "com.immomo.momo.multpic.activity.ImageEditActivity"){
            toastLog("跳出找图")
            break
        }else{
            var index = suijis.indexOf(suiji);
            suijis.splice(index,1)
        }
    }
    */
   log("图库打开完成")
    var sucai =text("确认").findOne()
    sucai ? sucai.click() : log("没有素材按钮")//素材包处理
    log("等待裁剪图像")
    sleep(500)
    var 裁剪图像确认=id("imagefactory_btn2").findOne()
    裁剪图像确认 ?  裁剪图像确认.click() : log("没有裁剪图像确认")//裁剪图像确认
    log("裁剪图像确认")
    sleep(500)
    var 完成=id("media_edit_btn_send").findOne().click()//完成id("media_edit_btn_send").findOne().click()
    log("完成按钮")
    sleep(500)
    var 完成进入=id("btn_next").findOne().click()//完成进入
    log("完成进入按钮")
    var pingbi = text("屏蔽").findOne(g_time*2)//屏蔽
        if(pingbi){
            log("找到屏蔽按钮")
            var tiaoguo = text("跳过").findOne(g_time)//跳过
            tiaoguo.click()
            return 
        }else{
            log("没找到屏蔽按钮")
        }
    if (currentActivity() == "com.immomo.momo.newaccount.register.view.RegisterActivity"){
        上传头像()
    }
}
    
    
    
function 设置密码(pass){
    id("maintab_layout_profile").findOne().click()//更多
    sleep(1000)
    var ss=id("info_list").findOne().scrollForward()
    var ss=id("info_list").findOne().scrollForward()
    var ss=id("info_list").findOne().scrollForward()
    log(ss)
    sleep(1000)
    更多列表=id("info_list").findOne().children()
    更多列表.forEach((element)=>{
        var target=element.findOne(text("设置"))
        if(target){
            log(89)
            element.click()
        }
    })
    id("setting_layout_security_center").findOne().click()//账号与安全
    sleep(1500)
    var password_stat=id("security_layout_password").findOne().click()//设置密码
    log(password_stat)
    sleep(400)
    id("setpwd_et_pwd_new").findOne().setText(pass)//设置密码
    sleep(400)
    id("setpwd_et_pwd_new_confim").findOne().setText(pass)//
    sleep(400)
    id("btn_ok").findOne().click()//确认
    log("密码修改完成")
    }    
    
    