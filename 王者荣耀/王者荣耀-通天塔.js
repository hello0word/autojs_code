auto;

if(!requestScreenCapture()){
  toast("请求截图失败");
  exit();
}
sleep(500);

var array = Array();
array[0] = images.read("./跳过.png");
array[1]= images.read("./闯关.png");
array[2]=images.read("./再次挑战.png");
array[3]= images.read("./点击屏幕继续.png");

while(true){
  var img =  captureScreen();
  
  array.forEach((element,index) => {
    if(element != null){
      var point = images.findImage(img, element);
      if (point  !=null){
        press(point.x,point.y,100);
        toast(index);
        if(index==0){
            sleep(1000*5);
        }else{
            sleep(2000);
            }
      }else{
        //console.log("找图失败");
      };
    }else{
      //console.log("元素为空");
    }
  }
  );
  sleep(1000);
}

