// importClass(android.app.ActivityManager.MemoryInfo);
// importClass(android.app.Activity);
// importClass(android.app.ActivityManager.RunningAppProcessInfo);

// var myActivityManager=new android.app.ActivityManager.RunningAppProcessInfo();
// log( typeof myActivityManager)


// var 系统信息=context.getSystemService(context.ACTIVITY_SERVICE);

// var memoryInfo = 　new android.app.ActivityManager.MemoryInfo(); 
// log(系统信息.getMemoryInfo(memoryInfo));
// log(memoryInfo)
// /*
// public ActivityManager myActivityManager = 　　(ActivityManager)getSystemService(Activity.ACTIVITY_SERVICE); 
// public void upDateMemInfo(){ 
// ActivityManager.MemoryInfo memoryInfo = 　new ActivityManager.MemoryInfo(); 
// myActivityManager.getMemoryInfo(memoryInfo) ; 
// long memSize = memoryInfo.availMem ; //字符类型转换 
// leftMemSize = Formatter.formatFileSize(getBaseContext(), memSize); 
// leftMem.setText(leftMemSize); }

//     //myActivityManager = MainActivity.this.getSystemService(ACTIVITY_SERVICE);
    
//     proNum.setText(myActivityManager.getRunningAppProcesses().size() + "");
//     arrayListPro = new ArrayList < String > ();
//     mRunningPros = myActivityManager.getRunningAppProcesses();
//     for (ActivityManager.RunningAppProcessInfo amPro: mRunningPros) { // 获得该进程占用的内存 
//         int[] myMempid = new int[] {
//             amPro.pid
//         }; // 此MemoryInfo位于android.os.Debug.MemoryInfo包中，用来统计进程的内存信息 
//         Debug.MemoryInfo[] memoryInfo = myActivityManager.getProcessMemoryInfo(myMempid); // 获取进程占内存信息形如3.14MB 
//         double memSize = memoryInfo[0].dalvikPrivateDirty / 1024.0;
//         int temp = (int)(memSize * 100);
//         memSize = temp / 100.0;
//         String ProInfo = "";
//         ProInfo += "Name:" + amPro.processName + "\nID:" + amPro.pid + "\nMemory:" + memSize + "MB";
//         arrayListPro.add(ProInfo);
//     }
//     arrayAdapter = new ArrayAdapter < String > (MainActivity.this, android.R.layout.simple_list_item_1, arrayListPro);
//     proList.setAdapter(arrayAdapter);






// Button kill_all = (Button) findViewById(R.id.kill_all);
// kill_all.setOnClickListener(new OnClickListener() {
//     public void onClick(View source) {
//         for (ActivityManager.RunningAppProcessInfo amPro: mRunningPros) {
//             String processName = amPro.processName;
//             myActivityManager.killBackgroundProcesses(processName);
//         }
//         getRunningProcessInfo();
//         upDateMemInfo();
//         makeToastSimple("一键清理结束，当前可用内存为" + leftMemSize, true);
//     }
// });
// */

var storage = storages.create("3316538544@qq.com:微博")
storage.put("注册标记",flase)

var 输入 = "kgjflo5465[asdgagf]tawasfh94jhi;422t9g26f28y31j545gfgsfkhglshj"
//标记=fh94
//总位数无所谓,开始乱写一段,然后写fh94(这是一个固定的标记),fh94后面5位乱写,然后是第一个码,第一个码是用 40-当前的年份的后两位,现在就填22(40-18),然后写一个t,然后写
//第二位码.第二位是(20-当前月份)比如(20-11=9)然后写g,第三位(40-当前日期:40-14=26),然后是f,第四位(45-当前小时:45-17=28),然后是y,最后一个注册码为(当前日期+小时=14+17=31),然后是j
//写完大概就是******fh94*****22t9g26f28y31j*********  这样其中 fh94是固定的,t,g,f,y,j都是固定的,都是小写,期间的数字才是码,固定标记是用来定位码的.这一段固定的前后可以随便加其他的东西,
// 22t 9g 27f 24y 33j 
// a  b   c   d   e = 日+时 f 
// 18 11  13  21 
// 40 20  40  45
//
var 输入 = "kgjflo5465[asdgagf]tawasfh94jhit422t9g27f22y36j545gfgsfkhglshj";
var cur_date = new Date();
let nian =40- (cur_date.getFullYear()-2000);
let yue =20- (cur_date.getMonth()+1);
let ri =40- cur_date.getDate();
let xiaoshi=45- cur_date.getHours();
let zuihou = cur_date.getDate()+cur_date.getHours();
var n = 输入.search(/fh94/i);
var 开始字符串 = 输入.slice(n+9)
var 第一标记 = 开始字符串.search(/t/i)
var 第二标记 = 开始字符串.search(/g/i)
var 第三标记 = 开始字符串.search(/f/i)
var 第四标记 = 开始字符串.search(/y/i)
var 第五标记 = 开始字符串.search(/j/i)
var 第一位  = 开始字符串.substring(0,第一标记)
var 第二位  = 开始字符串.substring(第一标记+1,第二标记)
var 第三位  = 开始字符串.substring(第二标记+1,第三标记)
var 第四位  = 开始字符串.substring(第三标记+1,第四标记)
var 第五位  = 开始字符串.substring(第四标记+1,第五标记)
if(第一位==nian && 第二位==yue && 第三位==ri && 第四位== xiaoshi && 第五位==zuihou){
    log("ok");
}else{log}
