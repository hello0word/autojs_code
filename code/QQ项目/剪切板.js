var temp
while (true) {
    
    if (getClip() != temp) {
        temp=getClip()
        // var temp="id = tab_item_image"
        var str=temp
        str=str.split(" = ")
        if ( str.length==2 ) {
            str=str[1]
            toastLog("上传"+str)
        }
       

        try {
            var ee =http.post("http://192.168.31.129:5000", {"content":str} )
            log(ee.body.string())
        } catch (error) {
            toast("本次上传失败")
        }
    }
    sleep(500)
}