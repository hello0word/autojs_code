function switch_to_feed(){
    if (className("android.widget.TextView").text("编辑").exists()){
        back();
    }
    };
    function switch_to_hot(){
        id("titlebarTabView_feed").findOne().click()
    }