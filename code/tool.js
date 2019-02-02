{
/**
 * 获取其他app版本名
 * @param {String} appName 
 */
getAppversionName:function (appName){
	var pm = context.getPackageManager();
	var lp = pm.getInstalledPackages(0).toArray();
	for(let i in lp){
		let name = pm.getApplicationLabel(lp[i].applicationInfo);
		if(name == appName){
			return lp[i].versionName;
		}
	}
}
,
/**
 * 返回 true 表示锁定;
 */
判断屏幕锁:function (){
	let km =context.getSystemService("keyguard");
	return km.inKeyguardRestrictedInputMode();
}
}

var res=http.get("https://gitee.com/jixiangxia/codes/jpwnau7zyrxqfmc61hoe489/raw?blob_name=autojs-tool")
var jsonstr=res.body.string()
var tool=eval('(' + jsonstr + ')')
