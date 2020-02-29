"ui";
ui.statusBarColor("#FF4FB3FF")
if (!floaty.checkPermission()) {
   toast("请给予悬浮窗权限");
   floaty.requestPermission();
} else if (getDeviceIdentity() == null) {
   toast("获取设备标识失败，请给予获取设备信息权限");
   var intent = new android.content.Intent();
   intent.setAction(android.provider.Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
   var uri = android.net.Uri.fromParts("package", context.getPackageName(), null);
   intent.setData(uri);
   context.startActivity(intent)
} else {
   engines.execScriptFile("main.js")
}
ui.finish()

function getDeviceIdentity() {
   let id = null;
   if (device.sdkInt >= 29) {
      let mac = device.getMacAddress()
      if (mac == null || mac == "" || mac == "00:00:00:00:00:00") return null
      return "M-" + xx(mac.replace(/:/, ""))
   }
   try {
      id = android.os.Build.getSerial();
   } catch (e) {
      if (e.javaException instanceof java.lang.SecurityException)
         return null;
   }
   if (id && id.toLowerCase() != "unknown") {
      id = xx(id)
   } else if (device.serial && device.serial.toLowerCase() != "unknown") {
      id = xx(device.serial)
   } else {
      let iii = null;
      let tm = context.getSystemService("phone");
      if (!tm) return null;
      try {
         iii = tm.getImei(0);
      } catch (e) {
         if (e.javaException instanceof java.lang.SecurityException)
            return null;
      }
      if (iii == null || iii == "000000000000000") {
         iii = device.getIMEI();
      }
      if (iii != null) id = "I-" + xx(iii);
      else return null
   }
   return id;
   function xx(str) {
      var mod = "0123456789ABCDEFGHIGKLMNOPQRSTUVWXYZabcdefghigklmnopqrstuvwxyz"
      var arr = str.split("");
      for (var i in arr) arr[i] = mod[(mod.indexOf(arr[i]) + 10) % mod.length]
      return arr.reverse().join("")
   }
}
