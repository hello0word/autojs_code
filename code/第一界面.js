"ui";
showLoginUI()
exports = showLoginUI;

var color = "#009688"

//显示登录界面
function showLoginUI(){
    ui.layout(
      <drawer id ="drawer">
        <vertical>
          <appbar>
            <toolbar id="toolbar" title = "微博工具">  </toolbar>
            <tabs id="tabs"> </tabs>
          </appbar>
          <viewpager id="viewpager">
      
              <frame>
              <vertical h="auto" align="center" margin="0 50">
                <linear>
                  <text w="130" gravity="center" color="#111111" size="16">第一个延时</text>
                  <input id="第一个延时" w="*" h="40"/>
                </linear>
                <linear>
                  <text w="130" gravity="center" color="#111111" size="16">第二个延时</text>
                  <input id="第二个延时" w="*" h="40" />
                </linear>
                <linear>
                  <text w="130" gravity="center" color="#111111" size="16">第三个延时</text>
                  <input id="第三个延时" w="*" h="40" />
                </linear>
                <linear gravity="center">
                  <button id="抢热评" text="抢热评"/>
                  <button id="互动" text="互动"/>
                </linear>
              </vertical>
            
            </frame>
            
            <frame>
              <text text = "抢热评" textColor = "black"></text>
            </frame>
            
          </viewpager>
        </vertical>
       
       </drawer>
    );

    ui.抢热评.click(() => {
       toast("您输入的用户名为");
    });
    ui.互动.click(() => showRegisterUI());  



    ui.eeitter.on("create_options_menu",menu=>{
      menu.add("设置");
      menu.add("关于")
    });
    
}




//显示注册界面
