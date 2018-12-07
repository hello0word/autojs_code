let 协议选择框框= className("android.widget.CheckBox").findOne()//这里定位i最初位置
let 协议选择框框_的父控件 = 协议选择框框.parent()//parent方法就是获取一个控件的父控件
let 协议选择框框_的父控件_的子控件个数 = 协议选择框框_的父控件.childCount()//childCount:子控件个数
let 下一步 = 协议选择框框_的父控件.child(协议选择框框_的父控件_的子控件个数-1);//child(i) : 返回第i+1个子控件 //减1 是因为au的数组从0开始数的
//log(ff);
//log(ss);
//className("android.widget.CheckBox").findOne().click()
