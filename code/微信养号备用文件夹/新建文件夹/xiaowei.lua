--2014-5-12
--小玮制作 转载请保留此段内容
--意见或建议请联系邮箱：757142745@qq.com
------------------------------------------------公共配置区---------------------------------
function temppath()--按键精灵缓存目录的上级目录
	return __MQM_RUNNER_LOCAL_PATH_GLOBAL_NAME__:match("(.+)/[^/]").."/"
	end
function readfile(path,isdel)--读取文件内容
	local f,xw
	f = io.open(path, "r")
	if f == nil then
		return "open file bad!!!"
	end
	xw = f:read("*all") 
	f:close()
	if isdel ~= 1 then os.remove(path) end
	return xw
end
function QMPlugin.match(str,format)
	return str:match(format)
end
function QMPlugin.gsub(str,f,s)
	return str:gsub(f,s)
end
------------------------------------------------插件---------------------------------
--挂载/system目录为读写，无参，返回挂载点
function QMPlugin.mount()
	os.remove("/data/system.txt")
	os.execute("mount|grep system > /data/system.txt")
	f = io.open("/data/system.txt", "r") 
	xw = f:read("*all") 
	f:close()
	xw = string.sub(xw,1,string.find(xw," "))
	os.execute("su -c 'mount -o rw "..xw.." /system'")
	return xw
end
--修改权限，参数为权限、文件路径，无返回值
function QMPlugin.ChangeFolder(per,dirname)
	pcall(
	function()
	    os.execute("chmod "..per.." ".. dirname)
	end)
end
--获取外网ip地址
function QMPlugin.GetIP()
	return LuaAuxLib.URL_Operation("http://52xiaov.com/getipinfo.php"):match("ip:(.-)<br/>")
end
--获取通知栏信息
function QMPlugin.Notification(pkgname)
		local localpath = temppath().."Notification"
		os.execute("dumpsys notification > "..localpath)
		xw = readfile(localpath)
		pkg = 1
		notifications = ""
		repeat
			_,pkg = xw:find("pkg="..pkgname,pkg)
			_,text = xw:find("tickerText=",pkg)
			content,_ = xw:find("contentView=",text)
			notification = xw:sub(text + 1,content - 8)
			if notification ~= "null" then
				notifications = notifications..notification.." \n"
			end
		until pkg == nil
		if #notifications == 0 then
			notifications= "null"
		end
		return notifications
end
--清理后台,参数:白名单(不清理应用)，table类型
function QMPlugin.KillClean(pgknamearr)
	local localpath = temppath().."list"
	local localpath1 = temppath().."ps"
	os.execute("ls /data/app/ > "..localpath)
	os.execute("ps > "..localpath1)
	local f
	ReadContent = readfile(localpath)
	ReadContent,_ = ReadContent:gsub("-[12]%.apk","")
	f = io.open(localpath,"w")
	f:write(ReadContent)
	f:close()
	ReadContent = readfile(localpath1)
	for l in io.lines(localpath) do
		n=0
		if string.find(ReadContent,l) then
			for i, v in ipairs(pgknamearr) do
				if v == l then
					n=1
				break
				end
			end
			if n==0 then
				os.execute("am force-stop "..l)
			end
		end
	end
end
--清理应用缓存
function QMPlugin.AppClean(packagename)
	os.execute(string.format("pm clear %s",packagename))
end
--Base64加密Encoding
function QMPlugin.Base64En(data)
	local key='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
	return ((data:gsub('.', function(x) 
		local r,key='',x:byte()
		for i=8,1,-1 do r=r..(key%2^i-key%2^(i-1)>0 and '1' or '0') end
		return r;
	end)..'0000'):gsub('%d%d%d?%d?%d?%d?', function(x)
		if (#x < 6) then return '' end
		local c=0
		for i=1,6 do c=c+(x:sub(i,i)=='1' and 2^(6-i) or 0) end
		return key:sub(c+1,c+1)
	end)..({ '', '==', '=' })[#data%3+1])
end
--Base64解密Decoding
function QMPlugin.Base64De(data)
	local key='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
	data = string.gsub(data, '[^'..key..'=]', '')
	return (data:gsub('.', function(x)
		if (x == '=') then return '' end
		local r,f='',(key:find(x)-1)
		for i=6,1,-1 do r=r..(f%2^i-f%2^(i-1)>0 and '1' or '0') end
		return r;
	end):gsub('%d%d%d?%d?%d?%d?%d?%d?', function(x)
		if (#x ~= 8) then return '' end
		local c=0
		for i=1,8 do c=c+(x:sub(i,i)=='1' and 2^(8-i) or 0) end
		return string.char(c)
	end))
end
--获取前台应用包名、组件名
function QMPlugin.TopActivityName()
	local localpath = temppath().."TopActivityName"
	os.execute("dumpsys activity top | grep ACTIVITY > "..localpath)
	local TopActivity = readfile(localpath)
	return TopActivity:match("ACTIVITY (.-) ")
end
--遍历文件夹下所有文件
function QMPlugin.Listall(path)
	local localpath = temppath().."listall"
	os.execute(string.format("ls -al %s > %s",path,localpath))
	local listall = readfile(localpath)
	return listall
end
--获取用户点击屏幕坐标
--参数为横向分辨率,纵向分辨率,扫描周期
--返回值为一个数组，第一个是x坐标，第二个是y坐标
function QMPlugin.Coordinate(ScreenX,ScreenY,Time)
	local localpath = temppath().."Coordinate"
	os.execute("getevent -pl>"..localpath)
	file=io.open(localpath, "r+")
	data=file:read("*l")
	while data~=nil do
		data=file:read("*l")
		if data~=nil then
			find=nil
			_,_,find=data:find("ABS_MT_POSITION_X.*max%s+(%d*)")
				if find~=nil then
					maxx=find
				end
			find=nil
			_,_,find=data:find("ABS_MT_POSITION_Y.*max%s+(%d*)")
			if find~=nil then
				maxy=find
			end
		end
	end
	times=tostring(times)
	os.execute("getevent -l -c "..Time..">"..localpath)
	file=io.open(localpath, "r+");
	data=file:read("*l")
	while data~=nil do
		data=file:read("*l")
		if data~=nil then
			if data:find("ABS_MT_POSITION_X")~=nil then
				x= math.floor(tonumber(data:sub(59,62),16)*ScreenX/maxx)
			elseif data:find("ABS_MT_POSITION_Y")~=nil then
				y= math.floor(tonumber(data:sub(59,62),16)*ScreenY/maxy)
			end
		end
	end
	os.remove(localpath)
local C = {}
C[1] = x
C[2] = y
return C
end
--切换输入法
--参数:输入法名字,如sogou、baidu...
function QMPlugin.Switchinput(name)
	name = name:lower()
	if name == "sogou" then
		os.execute("ime set com.sohu.inputmethod.sogou/.SogouIME")--搜狗输入法
	elseif name == "baidu" then
		os.execute("ime set com.baidu.input/.ImeService")--百度输入法
	elseif name == "baidu_miv6" then
		os.execute("ime set com.baidu.input_miv6/.ImeService")--小米v6百度输入法
	elseif name == "qq" then
		os.execute("ime set com.tencent.qqpinyin/.QQPYInputMethodService")--QQ拼音输入法
	elseif name == "chumo" then
		os.execute("ime set net.aisence.Touchelper/.IME")--触摸精灵输入法
	elseif name == "jiaoben" then
		os.execute("ime set com.scriptelf/.IME")--脚本精灵输入法
	elseif name == "anjian" then
		os.execute("ime set com.cyjh.mobileanjian/.input.inputkb")--按键精灵输入法
	elseif name == "xscript" then
		os.execute("ime set com.surcumference.xscript/.Xkbd")--xscript输入法
	elseif name == "tc" then
		os.execute("ime set com.xxf.tc.Activity/api.input.TC_IME")--TC输入法
	elseif name == "zhangyu" then
		os.execute("ime set com.tongmo.octopus.helper/com.tongmo.octopus.api.OctopusIME")--章鱼输入法
	elseif name == "chudong" then
		os.execute("ime set com.touchsprite.android/.core.TSInputMethod")--触动精灵输入法
	end
end
local function digit_to(n,s)
	assert(type(n)=="number", "arg #1 error: need a number value.")
	assert(type(s)=="string", "arg #2 error: need a string value.")
	assert((#s)>1, "arg #2 error: too short.")
	local fl = math.floor
	local i = 0
	while 1 do
		if n>(#s)^i then
			i = i + 1
		else
			break
		end
	end
	local ret = ""
	while i>=0 do
		if n>=(#s)^i then
			local tmp = fl(n/(#s)^i)
			n = n - tmp*(#s)^i
			ret = ret..s:sub(tmp+1, tmp+1)
		else
			if ret~="" then
				ret = ret..s:sub(1, 1)
			end
		end
		i = i - 1
	end
	return ret
end
local function to_digit(ns,s)
	assert(type(ns)=="string", "arg #1 error: need a string value.")
	assert(type(s)=="string", "arg #2 error: need a string value.")
	assert((#s)>1, "arg #2 error: too short.")
	local ret = 0
	for i=1,#ns do
		local fd = s:find(ns:sub(i,i))
		if not fd then
			return nil
		end
		fd = fd - 1
		ret = ret + fd*((#s)^((#ns)-i))
	end
	return ret
end
local function s2h(str,spacer)return (string.gsub(str,"(.)",function (c)return string.format("%02x%s",string.byte(c), spacer or"")end))end
local function h2s(h)return(h:gsub("(%x%x)[ ]?",function(w)return string.char(tonumber(w,16))end))end
--unicode转utf8
function QMPlugin.Unicode2Utf8(us)
	local u16p = {
		0xdc00,
		0xd800,
	}
	local u16b = 0x3ff
	local u16fx = ""
	local padl = {
		["0"] = 7,
		["1"] = 11,
		["11"] = 16,
		["111"] = 21,
	}
	local padm = {}
	for k,v in pairs(padl) do
		padm[v] = k
	end
	local map = {7,11,16,21}
	return (string.gsub(us, "\\[Uu](%x%x%x%x)", function(uc)
		local ud = tonumber(uc,16)
		for i,v in ipairs(u16p) do
			if ud>=v and ud<(v+u16b) then
				ud = ud - v + (i-1) * 0x40
				if (i-1)>0 then
					u16fx = digit_to(ud, "01")
					return ""
				end
				local bi = digit_to(ud, "01")
				uc = string.format("%x", to_digit(u16fx..string.rep("0",10-#bi)..bi,"01"))
				u16fx = ""
				ud = tonumber(uc,16)
				break
			end
		end
		local bins = digit_to(ud,"01")
		local pads = ""
		for _,i in ipairs(map) do
			if #bins<=i then
				pads = padm[i]
				break
			end
		end
		while #bins<padl[pads] do
			bins = "0"..bins
		end
		local tmp = ""
		if pads~="0" then
			tmp = bins
			bins = ""
		end
		while #tmp>0 do
			bins = "10"..string.sub(tmp, -6, -1)..bins
			tmp = string.sub(tmp, 1, -7)
		end
		return (string.gsub(string.format("%x", to_digit(pads..bins, "01")), "(%x%x)", function(w)
			return string.char(tonumber(w,16))
		end))
	end))
end
--utf8转unicode
function QMPlugin.Utf82Unicode(s, upper)
	local uec = 0
	if upper then
		upper = "\\U"
	else
		upper = "\\u"
	end
	local loop1 = string.gsub(s2h(s), "(%x%x)", function(w)
		local wc = tonumber(w,16)
		if wc>0x7F then
			if uec>0 then
				uec = uec - 1
				if uec==0 then
					return w.."/"
				end
				return w
			end
			local bi = digit_to(wc, "01")
			bi = string.sub(bi, 2, -1)
			while string.sub(bi, 1, 1)=="1" do
				bi = string.sub(bi, 2, -1)
				uec = uec + 1
			end
			return "u/"..w
		else
			if uec>0 then
				uec = 0
				return w.."/"
			end
		end
		return w
	end)
	local u16p = {
		0xdc00,
		0xd800,
	}
	local u16id = 0x10000
	local loop2 = string.gsub(loop1, "u/(%x%x*)/", function(w)
		local wc = tonumber(w,16)
		local tmp
		local bi = digit_to(wc, "01")
		tmp = ""
		while #bi>8 do
			tmp = string.sub(bi, -6, -1)..tmp
			bi = string.sub(bi, 1, -9)
		end
		bi = bi..tmp
		while string.sub(bi, 1, 1)=="1" do
			bi = string.sub(bi, 2, -1)
		end
		wc = to_digit(bi, "01")
		if (wc>=u16id) then
			wc = wc - u16id
			tmp = digit_to(wc, "01")
			tmp = string.rep("0", 20-#tmp)..tmp
			local low = to_digit(string.sub(tmp, -10, -1), "01") + u16p[1]
			local high = to_digit(string.sub(tmp, 1, -11), "01") + u16p[2]
			tmp = string.format("%4x", low)
			return s2h(upper..string.format("%4x", high)..upper..string.format("%4x", low))
		end
		local h = string.format("%x", wc)
		if (#h)%2~=0 then
			h = "0"..h
		end
		return s2h(upper..h)
	end)
	return h2s(loop2)
end
--日期转换成时间戳
function QMPlugin.ToTime(Date,format)
local Year,Month,Day,Hour,Min,Sec
Time = {}
_,_,Year,Month,Day,Hour,Min,Sec = Date:find(format)
Time.year=Year
Time.month=Month
Time.day=Day
Time.hour=Hour
Time.min = Min
Time.sec=Sec
return os.time(Time)
end
--秒数转换为天数
function QMPlugin.SecToDay(Sec)
local Day,Hour,Min = 0,0,0
Sec = tonumber(Sec)
for i =1,Sec/60 do
	Min = Min + 1
	if Min == 60 then Min = 0 Hour = Hour + 1 end
	if Hour == 24 then Hour = 0 Day = Day + 1 end
end
Sec=Sec%60
return Day.."天"..Hour.."小时"..Min.."分"..Sec.."秒"
end
--用微信浏览器打开网页
function QMPlugin.WeiXinUrl(packagename,url)
	os.execute(string.format("am start -n %s/.plugin.webview.ui.tools.WebViewUI -d '%s'",packagename,url))
end
--用默认浏览器打开网页
function QMPlugin.OpenWeb(url)
	if url:find("http://") == nil then url = "http://"..url end
	os.execute(string.format("am start -a android.intent.action.VIEW -d "..url))
end
--随机生成不重复数字
function QMPlugin.RanDiffarr(arr,num)
	if num == null or num > #arr then num = #arr end
	local Lines = {}
	for _ = 1,num do
		local n = math.random(#arr)
		Lines[#Lines + 1] = arr[n]
		table.remove(arr,n)
	end
	return Lines
end
--两点经纬度之间的直线距离
function QMPlugin.GetDistance(lat1,lng1,lat2,lng2)
	local rad = function(d) return d*math.pi/180 end
	local radLat1 = rad(lat1)
	local radLat2 = rad(lat2)
	return math.floor(2*math.asin(math.sqrt(math.pow(math.sin((radLat1-radLat2)/2),2)+math.cos(radLat1)*math.cos(radLat2)*math.pow(math.sin((rad(lng1) - rad(lng2))/2),2)))*6378.137*10000)/10000
--地球是一个近乎标准的椭球体,此处地球半径我们选择的是6378.137km
end

--对比是否到期,参数：到期时间的年、月、日、时、分、秒,返回值：到期返回-1,获取网络时间失败返回null,未到期返回距离到期剩余的时间(单位秒)
function QMPlugin.CompareTime(Year,Month,Day,Hour,Min,Sec)
	local NowNetTime = LuaAuxLib.URL_Operation("http://52xiaov.com/getipinfo.php"):match("秒数%):(.-)</body>")
	if NowNetTime == nil then return null else NowNetTime = tonumber(NowNetTime) end
	local Time = {};Time.year=Year;Time.month=Month;Time.day=Day;Time.hour=Hour;Time.min = Min;Time.sec=Sec
	local ExpireTime = os.time(Time)
	if NowNetTime > ExpireTime then return -1 else return (ExpireTime - NowNetTime) end
end
--开启飞行模式
function QMPlugin.OpenAirplane()
	os.execute("settings put global airplane_mode_on 1")
	os.execute("am broadcast -a android.intent.action.AIRPLANE_MODE --ez state true")
end
--关闭飞行模式
function QMPlugin.CloseAirplane()
	os.execute("settings put global airplane_mode_on 0")
	os.execute("am broadcast -a android.intent.action.AIRPLANE_MODE --ez state false")
end
--获取已安装包名
function QMPlugin.ListPackage(issystem)
	local localpath = temppath().."ListPackage"
	os.execute("pm list package -f > "..localpath)
	local ReadContent = readfile(localpath)
	local systempackage={}
	local userpackage={}
	for i in ReadContent:gmatch("(.-)\n(.-)") do
		local _,_,savepath,packagename = i:find("package:/(.-)/.-=(.+)")
		if savepath == "system" then
			systempackage[#systempackage+1]=packagename
		elseif savepath == "data" then
			userpackage[#userpackage+1]=packagename
		end
	end
	issystem = tostring(issystem)
	if issystem == "true" then
		return systempackage
	elseif issystem == "false" then
		return userpackage
	else
		for _,i in pairs(userpackage) do
			table.insert(systempackage,i)
		end
		return systempackage
	end
end
--静默安装apk
function QMPlugin.Install(packagepath)
	os.execute(string.format("pm install %s",packagepath))
end
--静默卸载apk
function QMPlugin.Uninstall(packagename)
	os.execute(string.format("pm uninstall %s",packagename))
end
--删除指定目录下指定后缀的文件
function QMPlugin.FindFileDelete(findpath,filename)
	os.execute(string.format("find %s -name '%s' | xargs rm -rf",findpath,filename))
end
--获取已安装应用的版本号
function QMPlugin.AppVersion(packagename)
	local localpath = temppath().."AppVersion"
	os.execute(string.format("dumpsys package %s > %s",packagename,localpath))
	return readfile(localpath):match("versionName=(.-)\n")
end
--获取已安装应用首次安装的时间
function QMPlugin.AppFirstInstallTime(packagename)
	local localpath = temppath().."AppVersion"
	os.execute(string.format("dumpsys package %s > %s",packagename,localpath))
	return readfile(localpath):match("firstInstallTime=(.-)\n")
end
--获取已安装应用升级安装的时间
function QMPlugin.AppLastUpdateTime(packagename)
	local localpath = temppath().."AppVersion"
	os.execute(string.format("dumpsys package %s > %s",packagename,localpath))
	return readfile(localpath):match("lastUpdateTime=(.-)\n")
end
--发送广播强制刷新指定目录下的图片到图库展示
function QMPlugin.UpdatePicture(picturepath)
	os.execute("am broadcast -a android.intent.action.MEDIA_MOUNTED -d file://"..picturepath)
end
--禁用应用
function QMPlugin.AppDisable(packagename)
	os.execute("pm disable "..packagename)
end
--解禁应用
function QMPlugin.AppEnable(packagename)
	os.execute("pm enable "..packagename)
end
--计算几天后的日期
function QMPlugin.LateTime(late,Year,Month,Day)
	if Day ~= nil then
		local Time = {};Time.year=Year;Time.month=Month;Time.day=Day
		local starttime = os.time(Time)
	else
		local starttime = os.time()
	end
	return os.date("%Y-%m-%d",starttime + tonumber(late) * 24 * 60 * 60)
end
--安卓系统版本号
function QMPlugin.DeviceVersion()
	return readfile("/system/build.prop",1):match("ro.build.version.release=(.-)\n")
end
--获取通话状态，返回值为0，表示待机状态、1表示来电未接听状态、2表示电话占线状态
function QMPlugin.CallState()
	local localpath = temppath().."CallState"
	os.execute("dumpsys telephony.registry > "..localpath)
	return readfile(localpath):match("mCallState=(.-)\n")
end
--获取来电号码
function QMPlugin.CallIncomingNumber()
	local localpath = temppath().."CallIncomingNumber"
	os.execute("dumpsys telephony.registry > "..localpath)
	return readfile(localpath):match("mCallIncomingNumber=(.-)\n")
end
--是否有数据连接
function QMPlugin.DataConnectionPossible()
	local localpath = temppath().."DataConnectionPossible"
	os.execute("dumpsys telephony.registry > "..localpath)
	return readfile(localpath):match("mDataConnectionPossible=(.-)\n")
end
--是否亮屏(原理是检测光感是否开启)
function QMPlugin.IsScreenOn()
	local localpath = temppath().."IsScreenOn"
	os.execute("dumpsys power > "..localpath)
	return readfile(localpath):match("mLightSensorEnabled=(.-) ")
end