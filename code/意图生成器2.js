"ui";

var color = "#009688";
ui.layout(
	<drawer id="drawer">
		<vertical h="*" w="*">
			<appbar>
				<toolbar id="toolbar" title="Intent生成器 V0.1"/>
			</appbar>
			<frame id="body" h="*" w="*">
			</frame>
		</vertical>
		<vertical layout_gravity="left" bg="#ffffff" w="280">
			<list id="menu">
				<horizontal bg="?selectableItemBackground" w="*">
					<img w="50" h="50" padding="16" src="{{this.icon}}" tint="{{color}}"/>
					<text textColor="black" textSize="15sp" text="{{this.title}}" layout_gravity="center"/>
				</horizontal>
			</list>
		</vertical>
	</drawer>
);
activity.setSupportActionBar(ui.toolbar);
ui.toolbar.setupWithDrawer(ui.drawer);
ui.menu.on("item_click", item => {
	if (item.onclick) item.onclick();
	ui.drawer.closeDrawers();
});
function setContainer(v) {
	ui.body.removeAllViews();
	ui.body.addView(v, new android.widget.FrameLayout.LayoutParams(-1, -1));
}

ui.menu.setDataSource([{
	title: "首页",
	icon: "@drawable/ic_android_black_48dp",
	onclick: () => aboutUi.activate()
}, {
	title: "启动Activity",
	icon: "@drawable/ic_android_black_48dp",
	onclick: () => launchUi.activate()
}, {
	title: "退出",
	icon: "@drawable/ic_exit_to_app_black_48dp",
	onclick: () => ui.finish()
}]);
var aboutUi = {
	ui : ui.inflate(
		<vertical padding="15dp">
			<text textColor="black" textSize="15sp">本生成器用于生成Auto.js可用的启动Intent的代码</text>
		</vertical>
	),
	activate : function() {
		setContainer(this.ui);
	}
}
function intentAsJson(intent) {
	var r = {};
	if (intent.action) r.action = String(intent.action);
	if (intent.type) r.type = String(intent.type);
	if (intent.data) r.data = String(intent.data);
	if (intent.component) {
		r.packageName = String(intent.component.packageName);
		r.className = String(intent.component.className);
	}
	return r;
}
function copyIntent(json) {
	dialogs.select("操作", ["查看JSON", "复制为app.intent", "复制为app.startActivity", "直接启动"], i => {
		switch (i) {
			case 0:
			dialogs.alert("Intent JSON", JSON.stringify(json, null, 4));
			break;
			case 1:
			setClip("app.intent(" + JSON.stringify(json, null, 4) + ");");
			break;
			case 2:
			setClip("app.startActivity(" + JSON.stringify(json, null, 4) + ");");
			break;
			case 3:
			app.startActivity(json);
			break;
		}
	});
}
var launchUi = {
	ui : ui.inflate(
		<vertical gravity="center">
			<progressbar id="launch_progress" />
			<list id="launch_list" h="*" w="*">
				<vertical padding="8dp" w="*">
					<text textColor="black" textSize="14sp" text="{{this.name}}" />
					<text textSize="12sp" text="{{this.packageName}}" />
				</vertical>
			</list>
		</vertical>
	),
	initList : function() {
		var self = this;
		ui.launch_progress.visibility = android.view.View.VISIBLE;
		ui.launch_list.visibility = android.view.View.GONE;
		threads.start(function() {
			self.listData = self.loadList();
			ui.run(function() {
				ui.launch_list.setDataSource(self.listData);
				ui.launch_progress.visibility = android.view.View.GONE;
				ui.launch_list.visibility = android.view.View.VISIBLE;
			});
		});
		ui.launch_list.on("item_click", item => {
			copyIntent(item.intent);
		});
	},
	loadList : function() {
		var pm = context.getPackageManager();
		var lp = pm.getInstalledPackages(0).toArray();
		var i, r = [], t;
		for (i in lp) {
			if (!lp[i].applicationInfo) continue;
			if (!(t = pm.getLaunchIntentForPackage(lp[i].packageName))) continue;
			log(lp[i].versionCode)
			r.push({
				name : pm.getApplicationLabel(lp[i].applicationInfo),
				packageName : lp[i].packageName,
				versionCode :lp[i].versionCode,
				
				intent : intentAsJson(t)
			});
		}
		return r;
	},
	activate : function() {
		setContainer(this.ui);
		if (!this.inited) this.initList();
		this.inited = true;
	}
}
aboutUi.activate();