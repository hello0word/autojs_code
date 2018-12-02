


importClass(android.content.Context);
importClass(android.os.PowerManager);
// 获取PowerManager的实例
let pm =  context.getSystemService(Context.POWER_SERVICE);
// 得到一个WakeLock唤醒锁
let mWakelock = pm.newWakeLock(PowerManager.FULL_WAKE_LOCK
| PowerManager.ACQUIRE_CAUSES_WAKEUP
| PowerManager.ON_AFTER_RELEASE, "SimpleTimer");
if (!mWakelock.isHeld()) {
// 唤醒屏幕
mWakelock.acquire();
}
// 获得一个KeyguardManager的实例


// log(Context.KEYGUARD_SERVICE)
let km =context.getSystemService("keyguard");
if (!km.inKeyguardRestrictedInputMode()) {
    log("键盘已解锁")
    
}else{
    log("键盘锁定")
}
// 得到一个键盘锁KeyguardLock
 let mKeyguardLock = km.newKeyguardLock("SimpleTimer");
log(mKeyguardLock)
if (km.inKeyguardRestrictedInputMode()) {
// 解锁键盘
mKeyguardLock.disableKeyguard();
}

// release screen

  // 使屏幕休眠
  if (mWakelock.isHeld()) {
    mWakelock.release();
  }