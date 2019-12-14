
// media.playMusic("/sdcard/BaiduNetdisk/音乐/郑智化 - 水手.mp3", 1, true)
console.setGlobalLogConfig({
    "file":"/sdcard/Android/音乐播放log.txt"
})

var music_name = "no.mp3"
if (!files.exists(music_name) ) {
    var res =  http.get("https://gitee.com/jixiangxia_admin/autojs/raw/master/resource/mp3/"+music_name,()=>{
        if (res.statusCode==200) {
            log(res.contentType)
            var no= res.body.bytes()
            files.writeBytes(music_name,no)
            if (files.exists(music_name)) {
                try {
                    media.playMusic(music_name, 1, true)
                } catch (error) {
                   log(error) 
                }
            }
        }
    })
    
}else{
    log("有文件")
    try {
        media.playMusic(music_name, 1, true)
    } catch (error) {
       log(error) 
    }
}


setInterval(()=>{
    log(media.isMusicPlaying())
},1000)