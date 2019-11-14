///发送意图启动
importClass(android.content.Intent)
var i = app.intent({
    action: "MAIN",
    flags:["activity_new_task", Intent.FLAG_ACTIVITY_EXCLUDE_FROM_RECENTS,Intent.FLAG_ACTIVITY_NO_HISTORY,Intent.FLAG_ACTIVITY_SINGLE_TOP,Intent.FLAG_ACTIVITY_CLEAR_TOP],
    packageName:"com.vpnduoyue.ld",
    category:"android.intent.category.LAUNCHER",
    className:"com.github.megatronking.netbare.sample.MainActivity",
    extras: {"state":"1"}
});
app.startActivity(i);




