importClass(android.content.Intent)
var intent = new Intent();
intent.setAction("getcapture");
intent.putExtra("path", "/sdcard/360/a.png");
intent.putExtra("type", "img");
context.sendBroadcast(intent);