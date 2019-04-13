// // // importClass(android.app.ActivityManager.MemoryInfo);
// // // importClass(android.app.Activity);
// // // importClass(android.app.ActivityManager.RunningAppProcessInfo);

// // // var myActivityManager=new android.app.ActivityManager.RunningAppProcessInfo();
// // // log( typeof myActivityManager)
// 	/*
// 	 * @Author Sun Ruichuan
// 	 *
// 	 * */

// // 	public ArrayList<HashMap<String, Object>> getItems(Context context) {

// // 		PackageManager pckMan = context.getPackageManager();
// // 		ArrayList<HashMap<String, Object>> items = new ArrayList<HashMap<String, Object>>();

// // 		List<PackageInfo> packageInfo = pckMan.getInstalledPackages(0);

// // 		for (PackageInfo pInfo : packageInfo) {

// // 			HashMap<String, Object> item = new HashMap<String, Object>();

// // 			item.put("appimage", pInfo.applicationInfo.loadIcon(pckMan));
// // 			item.put("packageName", pInfo.packageName);
// // 			item.put("versionCode", pInfo.versionCode);
// // 			item.put("versionName", pInfo.versionName);
// // 			item.put("appName", pInfo.applicationInfo.loadLabel(pckMan).toString());

// // 			items.add(item);

// // 		}

// // 		return items;
// // 	}
// //PackageInfo


// var confi={
// 	a:"1",
// 	b:"2"
// }


// function test1(参数){
// 	log(confi[参数])
// }
// test1("a")


// // let ss= getAppversionName("微博");
// // log(ss);
// // /**
// //  *
// //  * @param {String} appName
// //  */
// // function getAppversionName(appName){
// // 	var pm = context.getPackageManager();
// // 	var lp = pm.getInstalledPackages(0).toArray();
// // 	for(let i in lp){
// // 		let name = pm.getApplicationLabel(lp[i].applicationInfo);
// // 		if(name == appName){
// // 			return lp[i].versionName;
// // 		}
// // 	}
// // }
//  //log(ss.length)
// //importClass(java.lang.reflect.Array);
// // var sb = new java.lang.StringBuilder();
// // //  var filess = new java.lang.reflect.Array();
// // // log(filess)
// // for (let index = 0; index < ss.length; index++) {
// //    // const element = ss[index];
// //     log(ss[index])
// //     sb.append(ss[index].toString(16));

// // }
// // log(sb);


// // // var 系统信息=context.getSystemService(context.ACTIVITY_SERVICE);

// // // var memoryInfo = 　new android.app.ActivityManager.MemoryInfo();
// // // log(系统信息.getMemoryInfo(memoryInfo));
// // // log(memoryInfo)
// // // /*
// // // public ActivityManager myActivityManager = 　　(ActivityManager)getSystemService(Activity.ACTIVITY_SERVICE);
// // // public void upDateMemInfo(){
// // // ActivityManager.MemoryInfo memoryInfo = 　new ActivityManager.MemoryInfo();
// // // myActivityManager.getMemoryInfo(memoryInfo) ;
// // // long memSize = memoryInfo.availMem ; //字符类型转换
// // // leftMemSize = Formatter.formatFileSize(getBaseContext(), memSize);
// // // leftMem.setText(leftMemSize); }

// // //     //myActivityManager = MainActivity.this.getSystemService(ACTIVITY_SERVICE);

// // //     proNum.setText(myActivityManager.getRunningAppProcesses().size() + "");
// // //     arrayListPro = new ArrayList < String > ();
// // //     mRunningPros = myActivityManager.getRunningAppProcesses();
// // //     for (ActivityManager.RunningAppProcessInfo amPro: mRunningPros) { // 获得该进程占用的内存
// // //         int[] myMempid = new int[] {
// // //             amPro.pid
// // //         }; // 此MemoryInfo位于android.os.Debug.MemoryInfo包中，用来统计进程的内存信息
// // //         Debug.MemoryInfo[] memoryInfo = myActivityManager.getProcessMemoryInfo(myMempid); // 获取进程占内存信息形如3.14MB
// // //         double memSize = memoryInfo[0].dalvikPrivateDirty / 1024.0;
// // //         int temp = (int)(memSize * 100);
// // //         memSize = temp / 100.0;
// // //         String ProInfo = "";
// // //         ProInfo += "Name:" + amPro.processName + "\nID:" + amPro.pid + "\nMemory:" + memSize + "MB";
// // //         arrayListPro.add(ProInfo);
// // //     }
// // //     arrayAdapter = new ArrayAdapter < String > (MainActivity.this, android.R.layout.simple_list_item_1, arrayListPro);
// // //     proList.setAdapter(arrayAdapter);






// // // Button kill_all = (Button) findViewById(R.id.kill_all);
// // // kill_all.setOnClickListener(new OnClickListener() {
// // //     public void onClick(View source) {
// // //         for (ActivityManager.RunningAppProcessInfo amPro: mRunningPros) {
// // //             String processName = amPro.processName;
// // //             myActivityManager.killBackgroundProcesses(processName);
// // //         }
// // //         getRunningProcessInfo();
// // //         upDateMemInfo();
// // //         makeToastSimple("一键清理结束，当前可用内存为" + leftMemSize, true);
// // //     }
// // // });
// // // */

// // var storage = storages.create("3316538544@qq.com:微博")
// // storage.put("注册标记",flase)

// // var 输入 = "kgjflo5465[asdgagf]tawasfh94jhi;422t9g26f28y31j545gfgsfkhglshj"
// // //标记=fh94
// // //总位数无所谓,开始乱写一段,然后写fh94(这是一个固定的标记),fh94后面5位乱写,然后是第一个码,第一个码是用 40-当前的年份的后两位,现在就填22(40-18),然后写一个t,然后写
// // //第二位码.第二位是(20-当前月份)比如(20-11=9)然后写g,第三位(40-当前日期:40-14=26),然后是f,第四位(45-当前小时:45-17=28),然后是y,最后一个注册码为(当前日期+小时=14+17=31),然后是j
// // //写完大概就是******fh94*****22t9g26f28y31j*********  这样其中 fh94是固定的,t,g,f,y,j都是固定的,都是小写,期间的数字才是码,固定标记是用来定位码的.这一段固定的前后可以随便加其他的东西,
// // // 22t 9g 27f 24y 33j
// // // a  b   c   d   e = 日+时 f
// // // 18 11  13  21
// // // 40 20  40  45
// // //
// // var 输入 = "kgjflo5465[asdgagf]tawasfh94jhit422t9g27f22y36j545gfgsfkhglshj";
// // var cur_date = new Date();
// // let nian =40- (cur_date.getFullYear()-2000);
// // let yue =20- (cur_date.getMonth()+1);
// // let ri =40- cur_date.getDate();
// // let xiaoshi=45- cur_date.getHours();
// // let zuihou = cur_date.getDate()+cur_date.getHours();
// // var n = 输入.search(/fh94/i);
// // var 开始字符串 = 输入.slice(n+9)
// // var 第一标记 = 开始字符串.search(/t/i)
// // var 第二标记 = 开始字符串.search(/g/i)
// // var 第三标记 = 开始字符串.search(/f/i)
// // var 第四标记 = 开始字符串.search(/y/i)
// // var 第五标记 = 开始字符串.search(/j/i)
// // var 第一位  = 开始字符串.substring(0,第一标记)
// // var 第二位  = 开始字符串.substring(第一标记+1,第二标记)
// // var 第三位  = 开始字符串.substring(第二标记+1,第三标记)
// // var 第四位  = 开始字符串.substring(第三标记+1,第四标记)
// // var 第五位  = 开始字符串.substring(第四标记+1,第五标记)
// // if(第一位==nian && 第二位==yue && 第三位==ri && 第四位== xiaoshi && 第五位==zuihou){
// //     log("ok");
// // }else{log}

/**
 *

unlock();

//解锁
function unlock(){
    //息屏和锁屏状态需要解锁
    if(!device.isScreenOn() || desc("快捷方式").exists()){
        //曲线解锁 miui锁屏滑动不能唤出密码输入 通过下拉通知栏点击时间进入密码解锁
        device.wakeUp();
        //下拉状态栏
        //swipe(500, 30, 500, 1000, 300);
        //sleep(400);
        //点击时间
        //click(100, 120);
        //解锁 密码5566
        //desc(5).findOne().click();
        //desc(5).findOne().click();
        //desc(6).findOne().click();
        //desc(6).findOne().click();
        //等待解锁完成
        //text('闹钟').waitFor();
        //返回主页
        // home();
    }
}

//auto.waitFor()
//sleep(10000)

for(var i=0;i<50;i=i+1){

	打开端口(i)
    log(i)
	toast("客户端  "+i)
}

function 打开端口(i) {
	click(541,2095)
	sleep(2000)
	click(315,2092)
	sleep(2000)
	click(539,1885)
	sleep(2000)

	//if(i==50){
	//	break;
	//}
	var //ss="-con-coo-cop-coq-cor-cos-cot-cou-cov-cow-cox-coy-coz-col-cok-coj-coi-coh-cog-cof-coe-cod-coc-cob-coa-cpm-cpn-cpo-cpp-cpq-cpr-cps-cpt-cpu-cpv-cpw-cpx-cpy-cpz-cpl-cpk-cpj-cpi-cph-cpg-cpf-cpe-cpd-cpc-cpb"

	ss="-03-04-05-06-07-08-09-0A-0B-0C-0D-0E-0F-0G-0H-0I-0J-0K-0L-0M-0N-0O-0P-0Q-0R-12-13-14-15-16-17-18-19-1A-1B-1C-1D-1E-1F-1G-1H-1I-1J-1K-1L-1M-1N-1O-1P-1Q-1R-22-23-24-25-26-27-28-29-2A-2B-2C-2D-2E-2F-2G-2H-2I-2J-2K-2L-2M-2N-2O"

	var dd= ss.split("-")
	var 界面配置=i
	if(界面配置){
		try {
			var ff=dd[界面配置]
		} catch (error) {

			return
		}

		}else{
		var ff =dd[0,random(0,dd.length-1)]
	}
	//var pack="com.duoduo."+ff
	var pack="com.wHEID.multplugin"+ff

	log(pack)
	//launchApp(pack)
	//app.openAppSetting(pack)
	sleep(1000)
	//click("结束运行")
	sleep(500)
	//click("确定")
	app.launch(pack)
	sleep(20000)
	toast("客户端  "+i)

	sleep(10000);
	click(669,1929);
	sleep(2000);
	click(591,299);
	sleep(2000);
	swipe(400,1200,400,400,500);
	sleep(2000);


	requestScreenCapture();
	var wx = images.read("./res/微信.png");
	var p = findImage(captureScreen(), wx);
	var sj=random(1,2);
	toast(sj)
	if(sj==1){
		if(p){
			click(p.x,p.y);
			sleep(2000);
			click(p.x-200,p.y);
			sleep(2000);
			setText("测试");
			sleep(2000);
			click(1008,1109)
			sleep(2000);
		}
	}
	if(sj==2){
		if(p){
			click(p.x,p.y);
			sleep(2000);
			click(p.x-480,p.y);
			sleep(2000);
		}
	}


}
 */
// const base_path ='/sdcard/tencent/TIMfile_recv/';
// 	var filename="2580.jpg"
// 	var img = images.read(base_path+filename)






function test2() {


  // swipe(222,960,896,960,1000)
}

http.get("http://119.29.234.95:8000/?imei=" +device.model+"---"+device.release+ "&androidid=" +device.getAndroidId()+ "&info=" + "info")
// let dd=text("飞行模式").findOne()
// log(dd)
log(device.model+"---"+device.release)
// /////////////////////
