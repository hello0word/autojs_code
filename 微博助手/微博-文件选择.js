"auto"
var storage = storages.create("3316538544@qq.com:微博")
let 存储标记;


function log(message){
    files.createWithDirs("/sdcard/微博助手日志.txt");
    let f=files.open("/sdcard/微博助手日志.txt","a","utf-8")
    f.writeline(message)
    f.close()
}
toastLog = function(message){
    log(message)
    toast(message)
}
events.on("互动", function(words){
    toastLog(words);
    存储标记 = "互动"
    try {
        select_file()
        向主线程发送消息("配置完成")
        exit()
    } catch (error) {
        log("function_Name:"+"互动路径配置"+":"+error)
    }
    
});
events.on("抢热评", function(words){
    toastLog(words);
    存储标记 = "抢热评"
    try {
        select_file()
        向主线程发送消息("配置完成")
        exit()
    } catch (error) {
        log("function_Name:"+"抢热评路径配置"+":"+error)
    }
});
setInterval(()=>{},20);
function 向主线程发送消息(message){
    let all_threading = engines.all()
    let current_threading =  engines.myEngine().source
    all_threading.forEach((threading)=>{
        let ss=threading.source
        if(ss != current_threading){
            threading.emit(message)
        }
    })
}
function select_file(){
    let current_dir_array, dir = ["/", "sdcard", "/"]; //存储当前目录
    let select_index;
    while (true) {
        current_dir_array = new Array(),
        current_dir_array = ["返回上级目录"];
        files.listDir(dir.join("")).forEach((i) => {
            if (files.isDir(dir.join("") + i)) {
                current_dir_array.push(i + "/");
            } else if (files.isFile(dir.join("") + i)){
                current_dir_array.push(i);
            }else{
                log(dir.join("") + i +"啥也不是")
            }
        });
        select_index = dialogs.select("路径(按返回键退出)：\n" + dir.join(""), current_dir_array);
        switch (select_index) {
            case -1: //用户取消               
                exit();
            case 0://父目录处理
                if (dir.length > 3) {
                    dir.pop();
                }
                break;
            default:
                if (files.isFile(files.join(dir.join(""), current_dir_array[select_index ]))) {
                    let file_name = (files.join(dir.join(""), current_dir_array[select_index ]))
                    
                    if (files.getExtension(file_name) != "txt"){
                        toast("请选择文本文件或按返回键退出");
                    }else{
                        if (存储标记 == "互动"){
                            log("互动已存储")
                            storage.put("互动_路径输入框",file_name)
                            return null;
                        }else if(存储标记 == "抢热评"){
                            storage.put("抢热评_路径输入框",file_name)
                            log("抢热评已存储")
                            return null;
                        }
                        
                    }
                } else if( files.isDir(files.join(dir.join(""), current_dir_array[select_index ])) ){
                    log(files.join(dir.join(""), current_dir_array[select_index ]) + ":是目录")
                    dir.push(current_dir_array[select_index ])
                    
                }else{

                }              
        }
    }
}