var ra = new RootAutomator();
events.on('exit', function(){
  ra.exit();
});
sleep(2000)
for (let index = 0; index < 10; index++) {
    ra.press(100,500,100)
    sleep(1000)
}
setTimeout(()=>{
    
},1000)