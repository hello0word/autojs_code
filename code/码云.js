"ui";
// patch();
importClass(android.graphics.Paint);
var BASE_URL = "https://gitee.com/api/v5/gists/";
var TOKEN = "e7c2845a0fbebd2be9fc7ee82a39392f"
var 所有代码片段信息=[]
ui.layout(
    <frame>
        <vertical>
            <appbar>
                <toolbar id="toolbar" title="Todo" />
            </appbar>
            <list id="todoList">
                <card w="*" h="auto" margin="10 5" cardCornerRadius="2dp"
                    cardElevation="1dp" foreground="?selectableItemBackground">
                    <horizontal gravity="center_vertical">
                        <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                            <text id="title" text="{{this.description}}" textColor="#222222" textSize="16sp"  />
                            <text text="ok" textColor="#999999" textSize="14sp" maxLines="1" />
                        </vertical>
                        {/* <checkbox id="done" marginLeft="4" marginRight="6" checked="{{this.done}}" /> */}
                        <checkbox id="done" marginLeft="4" marginRight="6" checked="true" />
                    </horizontal>

                </card>
            </list>
        </vertical>
        <fab id="add" w="auto" h="auto" src="@drawable/ic_add_black_48dp"
            margin="16" layout_gravity="bottom|right" tint="#ffffff" />
    </frame>
);

var materialColors = ["#e91e63", "#ab47bc", "#5c6bc0", "#7e57c2", "##2196f3", "#00bcd4",
    "#26a69a", "#4caf50", "#8bc34a", "#ffeb3b", "#ffa726", "#78909c", "#8d6e63"];


ui.todoList.setDataSource([{
    "url": "https://gitee.com/api/v5/gists/v4a0w17cgmp5yk8fbxrn396",
    "forks_url": "https://gitee.com/api/v5/gists/v4a0w17cgmp5yk8fbxrn396/forks",
    "commits_url": "https://gitee.com/api/v5/gists/v4a0w17cgmp5yk8fbxrn396/commits",
    "id": "v4a0w17cgmp5yk8fbxrn396",
    "description": "springboot工程maven打包时,如果有依赖工程总是报找不到,解决办法",
    "public": true,
    "owner": {
        "id": 1393597,
        "login": "lch1991",
        "name": "lch1991",
        "avatar_url": "https://gitee.com/assets/no_portrait.png",
        "url": "https://gitee.com/api/v5/users/lch1991",
        "html_url": "https://gitee.com/lch1991",
        "followers_url": "https://gitee.com/api/v5/users/lch1991/followers",
        "following_url": "https://gitee.com/api/v5/users/lch1991/following_url{/other_user}",
        "gists_url": "https://gitee.com/api/v5/users/lch1991/gists{/gist_id}",
        "starred_url": "https://gitee.com/api/v5/users/lch1991/starred{/owner}{/repo}",
        "subscriptions_url": "https://gitee.com/api/v5/users/lch1991/subscriptions",
        "organizations_url": "https://gitee.com/api/v5/users/lch1991/orgs",
        "repos_url": "https://gitee.com/api/v5/users/lch1991/repos",
        "events_url": "https://gitee.com/api/v5/users/lch1991/events{/privacy}",
        "received_events_url": "https://gitee.com/api/v5/users/lch1991/received_events",
        "type": "User",
        "site_admin": false
    },
    "user": {
        "id": 1393597,
        "login": "lch1991",
        "name": "lch1991",
        "avatar_url": "https://gitee.com/assets/no_portrait.png",
        "url": "https://gitee.com/api/v5/users/lch1991",
        "html_url": "https://gitee.com/lch1991",
        "followers_url": "https://gitee.com/api/v5/users/lch1991/followers",
        "following_url": "https://gitee.com/api/v5/users/lch1991/following_url{/other_user}",
        "gists_url": "https://gitee.com/api/v5/users/lch1991/gists{/gist_id}",
        "starred_url": "https://gitee.com/api/v5/users/lch1991/starred{/owner}{/repo}",
        "subscriptions_url": "https://gitee.com/api/v5/users/lch1991/subscriptions",
        "organizations_url": "https://gitee.com/api/v5/users/lch1991/orgs",
        "repos_url": "https://gitee.com/api/v5/users/lch1991/repos",
        "events_url": "https://gitee.com/api/v5/users/lch1991/events{/privacy}",
        "received_events_url": "https://gitee.com/api/v5/users/lch1991/received_events",
        "type": "User",
        "site_admin": false
    },
    "files": {
        "maven": {
            "size": 653,
            "raw_url": "https://gitee.com/lch1991/codes/v4a0w17cgmp5yk8fbxrn396/raw?blob_name=maven",
            "type": "text/plain; charset=utf-8",
            "truncated": false,
            "content": "最近公司使用springboot开发项目，使用的构建工具是maven,项目分了很多模块，并且模块之间还存在一定的依赖，比如说一个项目common是提供各项目通用的工具类，公共的类等\r\n例子：项目root,有module common,front,mall等其中front 和mall都依赖于common，将来需要上线部署的也是front和mall项目,所以两个项目是要进行打包，也就是这个打包操作，让我浪费了好多时间，这里都是我亲身经历的血泪史。。\r\n当使用Maven对front项目直接进行package时，提示依赖于common的jar包找不到。因为直接对front打包，common并没有被打包，依赖关系无法保持。这时你要做的就是，首先对项目common进行install\r\n注意！注意！这里有一个巨坑，我已经义无反顾的跳进去一次了，大家一定不要再往里面跳了：Common打包出来的应该是不可执行的jar包，所以不要在Common的pom中定义spring-boot-maven-plugin插件，因为这个SpringBoot插件会在Maven的package后进行二次打包，目的为了生成可执行jar包，如果C中定义了这个插件，会报错提示没有找到main函数。这时你就可以去打包front项目了，当然打包的时候可能还是不行，这里还有一个小坑，如果还是不能进行打包的话，那么就install一下root项目，也就是总目录下的pom文件对应的install操作，这样再打包front项目基本上就没有问题了"
        }
    },
    "truncated": "false",
    "html_url": "https://gitee.com/lch1991/codes/v4a0w17cgmp5yk8fbxrn396",
    "comments": 0,
    "comments_url": "https://gitee.com/api/v5/gists/v4a0w17cgmp5yk8fbxrn396/commits",
    "git_pull_url": "https://gitee.com/lch1991/v4a0w17cgmp5yk8fbxrn396.code.git",
    "git_push_url": "https://gitee.com/lch1991/v4a0w17cgmp5yk8fbxrn396.code.git",
    "created_at": "2019-06-01T22:37:25+08:00",
    "updated_at": "2019-06-01T22:37:25+08:00"
}]);

toastLog("开始")
var ddd= threads.start(function () {
    get_all_code()
    ui.run(function(){
        ui.todoList.setDataSource(所有代码片段信息)
})
// ddd.join()
    
})

ui.todoList.on("item_bind", function (itemView, itemHolder) {
    //绑定勾选框事件
    itemView.done.on("check", function (checked) {
        let item = itemHolder.item;
        item.done = checked;
        let paint = itemView.title.paint;
        //设置或取消中划线效果
        if (checked) {
            paint.flags |= Paint.STRIKE_THRU_TEXT_FLAG;
        } else {
            paint.flags &= ~Paint.STRIKE_THRU_TEXT_FLAG;
        }
        itemView.title.invalidate();
    });
});

ui.todoList.on("item_click", function (item, i, itemView, listView) {
    itemView.done.checked = !itemView.done.checked;
});

ui.todoList.on("item_long_click", function (e, item, i, itemView, listView) {
    confirm("确定要删除" + item.title + "吗？")
        .then(ok => {
            if (ok) {
                todoList.splice(i, 1);
            }
        });
    e.consumed = true;
});

//当离开本界面时保存todoList
ui.emitter.on("pause", () => {
    // storage.put("items", todoList);
});

ui.add.on("click", () => {
    dialogs.rawInput("请输入标题")
        .then(title => {
            if (!title) {
                return;
            }
            dialogs.rawInput("请输入期限", "明天")
                .then(summary => {
                    todoList.push({
                        title: title,
                        summary: summary,
                        color: materialColors[random(0, materialColors.length - 1)]
                    });
                });
        })
});





function patch(代码片段ID,文件名,文件内容) {
    // var  = ""; //文件id
    let file=new Object()
    file[文件名]={"content": 文件内容 }
    url = BASE_URL + 代码片段ID + "?access_token="+TOKEN; //token
    var json = { "files": file };
    json = JSON.stringify(json);
    var options = { contentType: "application/json", method: "PATCH", body: json };
    var data = http.request(url, options);
    log(data.body.string());
}
//1.获取所有代码片段
//2.新增
//3.修改
//4,一个代码片段内任意修改
//api
// patch("xbme7y60ltv82gnp3rjcq84","456.txt","卧槽骚大叔")
/**
 * 
{
        "url": "https://gitee.com/api/v5/gists/v4a0w17cgmp5yk8fbxrn396",
        "forks_url": "https://gitee.com/api/v5/gists/v4a0w17cgmp5yk8fbxrn396/forks",
        "commits_url": "https://gitee.com/api/v5/gists/v4a0w17cgmp5yk8fbxrn396/commits",
        "id": "v4a0w17cgmp5yk8fbxrn396",
        "description": "springboot工程maven打包时,如果有依赖工程总是报找不到,解决办法",
        "public": true,
        "owner": {
            "id": 1393597,
            "login": "lch1991",
            "name": "lch1991",
            "avatar_url": "https://gitee.com/assets/no_portrait.png",
            "url": "https://gitee.com/api/v5/users/lch1991",
            "html_url": "https://gitee.com/lch1991",
            "followers_url": "https://gitee.com/api/v5/users/lch1991/followers",
            "following_url": "https://gitee.com/api/v5/users/lch1991/following_url{/other_user}",
            "gists_url": "https://gitee.com/api/v5/users/lch1991/gists{/gist_id}",
            "starred_url": "https://gitee.com/api/v5/users/lch1991/starred{/owner}{/repo}",
            "subscriptions_url": "https://gitee.com/api/v5/users/lch1991/subscriptions",
            "organizations_url": "https://gitee.com/api/v5/users/lch1991/orgs",
            "repos_url": "https://gitee.com/api/v5/users/lch1991/repos",
            "events_url": "https://gitee.com/api/v5/users/lch1991/events{/privacy}",
            "received_events_url": "https://gitee.com/api/v5/users/lch1991/received_events",
            "type": "User",
            "site_admin": false
        },
        "user": {
            "id": 1393597,
            "login": "lch1991",
            "name": "lch1991",
            "avatar_url": "https://gitee.com/assets/no_portrait.png",
            "url": "https://gitee.com/api/v5/users/lch1991",
            "html_url": "https://gitee.com/lch1991",
            "followers_url": "https://gitee.com/api/v5/users/lch1991/followers",
            "following_url": "https://gitee.com/api/v5/users/lch1991/following_url{/other_user}",
            "gists_url": "https://gitee.com/api/v5/users/lch1991/gists{/gist_id}",
            "starred_url": "https://gitee.com/api/v5/users/lch1991/starred{/owner}{/repo}",
            "subscriptions_url": "https://gitee.com/api/v5/users/lch1991/subscriptions",
            "organizations_url": "https://gitee.com/api/v5/users/lch1991/orgs",
            "repos_url": "https://gitee.com/api/v5/users/lch1991/repos",
            "events_url": "https://gitee.com/api/v5/users/lch1991/events{/privacy}",
            "received_events_url": "https://gitee.com/api/v5/users/lch1991/received_events",
            "type": "User",
            "site_admin": false
        },
        "files": {
            "maven": {
                "size": 653,
                "raw_url": "https://gitee.com/lch1991/codes/v4a0w17cgmp5yk8fbxrn396/raw?blob_name=maven",
                "type": "text/plain; charset=utf-8",
                "truncated": false,
                "content": "最近公司使用springboot开发项目，使用的构建工具是maven,项目分了很多模块，并且模块之间还存在一定的依赖，比如说一个项目common是提供各项目通用的工具类，公共的类等\r\n例子：项目root,有module common,front,mall等其中front 和mall都依赖于common，将来需要上线部署的也是front和mall项目,所以两个项目是要进行打包，也就是这个打包操作，让我浪费了好多时间，这里都是我亲身经历的血泪史。。\r\n当使用Maven对front项目直接进行package时，提示依赖于common的jar包找不到。因为直接对front打包，common并没有被打包，依赖关系无法保持。这时你要做的就是，首先对项目common进行install\r\n注意！注意！这里有一个巨坑，我已经义无反顾的跳进去一次了，大家一定不要再往里面跳了：Common打包出来的应该是不可执行的jar包，所以不要在Common的pom中定义spring-boot-maven-plugin插件，因为这个SpringBoot插件会在Maven的package后进行二次打包，目的为了生成可执行jar包，如果C中定义了这个插件，会报错提示没有找到main函数。这时你就可以去打包front项目了，当然打包的时候可能还是不行，这里还有一个小坑，如果还是不能进行打包的话，那么就install一下root项目，也就是总目录下的pom文件对应的install操作，这样再打包front项目基本上就没有问题了"
            }
        },
        "truncated": "false",
        "html_url": "https://gitee.com/lch1991/codes/v4a0w17cgmp5yk8fbxrn396",
        "comments": 0,
        "comments_url": "https://gitee.com/api/v5/gists/v4a0w17cgmp5yk8fbxrn396/commits",
        "git_pull_url": "https://gitee.com/lch1991/v4a0w17cgmp5yk8fbxrn396.code.git",
        "git_push_url": "https://gitee.com/lch1991/v4a0w17cgmp5yk8fbxrn396.code.git",
        "created_at": "2019-06-01T22:37:25+08:00",
        "updated_at": "2019-06-01T22:37:25+08:00"
    },
 */



function get_all_code() {
    url = BASE_URL  + "?access_token="+TOKEN; //token
    var data=http.get(url)
    var json_data=data.body.json();
    json_data.forEach(element => {
        所有代码片段信息.push(element)
        // log(element.description)
    });
    // log(json_data.length)
}
// get_all_code()



