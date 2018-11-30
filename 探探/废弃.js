var 状态对象组 = Array();
function 状态对象(id,句数,状态){
    this.id=id;
    this.已聊天句数=句数;
    this.完成状态=状态;
}

/**
 * 存在返回 true
 * @param {string} id 
 * @param {Array<状态对象>} 被查找数组 为全局变量,元素状态数组
 */
function 根据id检查是否存在(id,被查找数组){
    if(被查找数组.length !=0){
        被查找数组.forEach((element)=>{
            if(element.id == id){
                return true;
            };
        });
        return false;
    }
}


/**
 * 
 * @param {string} id 
 * @param {Array<状态对象>} 被查找数组 为全局变量,元素状态数组
 */
function 根据id检查是否完成(id,被查找数组){
    if(被查找数组.length !=0){
        被查找数组.forEach((element)=>{
            if(element.id == id && element.完成状态){
                return true;
            };
        });
        return false;
    }
}


/**
 * 不初始化的原因是可能在任何时候有新人回复  废弃函数
 * 1.从全局状态列表中逐一比对当前列表内元素,查找一个未完成的任务 
 *   有任务:处理
 *   没有:翻页
 * 2.查找当前页是否有小红点
 *  返回 null 则认为当前页面已经没有可以处理的了
 */
function 从所有配对列表里查找一个可操作的元素(){
    let 当前列表 = 返回当前页面所有元素状态();
    当前列表.forEach((currentElement)=>{
        //如果该元素未加入全局状态,则加入
        if(!根据id检查是否存在(currentElement.id,状态对象组)){
            //构建该元素对象 并加入管理
            let ele = new 状态对象(currentElement.id,0,false);
            状态对象组.push(ele);
        }else{
        //已被管理,判断完成状态
            if(!根据id检查是否完成(currentElement.id,状态对象组)){
                //该元素未完成 判断是否有小红点
                if(currentElement.red){
                    //该元素未完成,且有红点,需要进一步处理
                    return currentElement;
                }else{
                    //该元素已被管理,未完成,没有小红点
                }
            }else{
                //该元素已被管理,且已经完成 不做任何处理
            }
        }
    });
    //运行到这说明所有元素都不可处理
    return null;
}

// let 应用名 = "探探";//这里是app名
// let 输出路径 = "/sdcard/360/"//输出路径,可以不存在,会自动建立
// let ss=files.ensureDir(输出路径);//自动建立文件夹
// let 包名 = app.getPackageName(应用名);//根据app名获取包名
// log(包名);
// let shell输出 = shell("pm path "+包名);//得到包路径
// let 路径输出 = shell输出.result;//取得shell返回
// let 最终路径=路径输出.slice(8,-1);//提取返回字符串中的路径
// let 最终命令 = "cp "+最终路径 + " " + 输出路径+应用名+".apk";//组合命令
// log(最终命令)
// let 最终sjhell输出 = shell(最终命令);//最终将app拷贝到指定路径
// log(最终sjhell输出);
//"pkg=%s\n" +
// let cmd = "enabled=$(settings get system pointer_location)\n" +
                
//             "if [[ $enabled == 1 ]]\n" +
//             "then\n" +
//             "settings put system pointer_location 0\n" +
//             "else\n" +
//             "settings put system pointer_location 1\n" +
//             "fi\n";
//         log(cmd);
//         shell(cmd,true);





var url="https://gitee.com/jixiangxia/reptilian/raw/master/config.json"
var re = http.get(url);
var text = re.body.string();
log(text);

//engines.execScript("name", text);