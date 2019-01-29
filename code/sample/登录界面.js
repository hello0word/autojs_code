"ui";



function showRegisterUI(){
  ui.layout(
    <frame>
      <vertical h="auto" align="center" margin="0 50">
        <linear>
           <text w="auto" gravity="center" color="#111111" size="50">用户名</text>
           <input w="*" h="40"/>
        </linear>
        <linear>
           <text w="240" gravity="center" color="#111111" size="16">密码</text>
           <input w="*" h="40" />
        </linear>
        <linear>
           <text w="120" gravity="center" color="#111111" size="16">邮箱</text>
           <input w="*" h="40" />
        </linear>
        <linear gravity="center">
           <button>确定</button>
           <button id="cancel">取消</button>
        </linear>
      </vertical>
    </frame>
  );
  //ui.cancel.click(() => showLoginUI());
}

function showRegisterUIbak(){
  ui.layout(
    <frame>
      <vertical h="auto" align="center" margin="0 50">
        <linear>
           <text w="56" gravity="center" color="#111111" size="16">用户名</text>
           <input id="name" w="*" h="40"/>
        </linear>
        <linear>
           <text w="56" gravity="center" color="#111111" size="16">密码</text>
           <input id="password" w="*" h="40" password="true"/>
        </linear>
        <linear gravity="center">
           <button id="login" text="登录2"/>
           <button id="register" text="注册"/>
        </linear>
      </vertical>
    </frame>
  );

  ui.login.click(() => {
     toast("您输入的用户名为" + ui.name.text() + " 密码为" + ui.password.text());
  });
  ui.register.click(() => showRegisterUI());
}



showLoginUI();
ui.statusBarColor("#000000")


exports = showLoginUI;

//显示登录界面
function showLoginUI(){
    ui.layout(
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
    );

    ui.抢热评.click(() => {
       toast("您输入的用户名为");
    });
    ui.互动.click(() => showRegisterUI());
    
    //ui.name.setText()
    
}

//显示注册界面
