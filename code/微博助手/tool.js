/**
 * 获取其他app版本名
 * @param {String} appName 
 */
function getAppversionName(appName){
	var pm = context.getPackageManager();
	var lp = pm.getInstalledPackages(0).toArray();
	for(let i in lp){
		let name = pm.getApplicationLabel(lp[i].applicationInfo);
		if(name == appName){
			return lp[i].versionName;
		}
	}
}

/**
 * 返回 true 表示锁定;
 */
function 判断屏幕锁(){
	let km =context.getSystemService("keyguard");
	return km.inKeyguardRestrictedInputMode();
}
