// if(!requestScreenCapture()){
//     toast("请求截图失败");
//     exit();
// }

// var img = captureScreen();


// var  c = className("android.support.v7.widget.RecyclerView").packageName("toutiao.yiimuu.appone").findOne().scrollForward();
// console.log(c)
var 评论集合 = textMatches(/\d+ 评论/).find()
评论集合.forEach(function(key){
    console.log(key);

})
console.log(评论集合.size());
var c = textMatches(/\d+ 评论/).findOne().bounds();

//click(c.left, c.top,c.right, c.bottom);
console.log(c)

function test(){

}

function main(){
    //循环
    while (判断继续的条件) {
        
    }

}
function 查找评论(){
    var 评论集合 = textMatches(/\d+ 评论/).find()
    //对
}

function 遍历对象(obj){
    Object.keys(obj).forEach(function(key){

        console.log(key,obj[key]);

    });
}




// var c = textMatches("知乎").findOne().bounds()
// console.log(c)
// var templ = images.read("/Pictures/评论.png");
// var p = findImage(img, templ);
// if(p){
//     toast("找到啦:" + p);
// }else{
//     toast("没找到");
// }

// var ra = new RootAutomator();
// events.on('exit', function(){
//   ra.exit();
// });
// ra.swipe(500, 1000, 500, 500, 10);