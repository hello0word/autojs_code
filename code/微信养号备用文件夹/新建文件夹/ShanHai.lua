---------------------------------------	制作说明	---------------------------------------
--[[
		插件作者	:	山海师、小玮、神梦无痕、天纵少侠
		制作时间	:	2016.03.04
		联系 Q Q	:	1915025270
		交流QQ群	:	153263411
		
		本插件稳定每周更新，发现BUG或有新的功能需求请联系作者（联系方式往上看↑_↑）
--]]




--
---------------------------------------------- 全局数据 ----------------------------------------------
--

local SHver			= "2.8.0"			-- 对外版本号
local Ver_LastUpd	= 20170904		-- 内部版本号 [即最后更新日期]



--
---------------------------------------------- 内部函数 ----------------------------------------------
--

-- 按键精灵缓存目录的上级目录 [无参数] [返回临时文件目录路径, 失败返回空字符串]
function TempPath()
	local iRet, sRet = pcall(function()
		return __MQM_RUNNER_LOCAL_PATH_GLOBAL_NAME__:match("(.+)/[^/]").."/"
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return ""
	end
end

-- 临时文件路径 [fn:文件名] [返回文件路径, 失败返回空字符串]
function TempFile(fn)
	local tPath = TempPath()
	if tPath == "" then
		return ""
	else
		if fn == nil then
			return GetTempFile(tPath, "shtemp_", ".txt", 5)
		else
			return tPath .. fn .. ".txt"
		end
	end
end

-- 执行并返回execute命令的结果 [cmd:执行的命令行] [返回结果文本]
function Execute(cmd)
	sh_init()
	local iRet, sRet = pcall(function()
		local tFile = TempFile()
		if tFile == "" then
			return ""
		else
			cmd = cmd.." > " .. tFile
			return Iif(os.execute(cmd), TrimEx(ReadFile(tFile, true), "\n "), nil)
		end
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return ""
	end
end
QMPlugin.Execute = Execute


function temppath()--按键精灵缓存目录的上级目录
	return __MQM_RUNNER_LOCAL_PATH_GLOBAL_NAME__:match("(.+)/[^/]").."/"
end

-- 复制表 [old:旧表] [返回复制表]
function CopyTable(old)
	local NewTable = {}
	for k, v in pairs(old) do
		NewTable[k] = v
	end
	return NewTable
end

-- 复制数组 [old:旧数组] [返回复制数组]
function CopyArray(old)
	local NewArray = {}
	for k, v in ipairs(old) do
		NewArray[k] = v
	end
	return NewArray
end

function ScanTable(tbl)
    local retStr = ""
	local tRet = {}
    for k, v in pairs(tbl) do
        if type(v) == "table" then
			table.insert(tRet, k .. " : "  .. ScanTable(v))
        else
			table.insert(tRet, k .. " : " .. v )
        end
    end
    return "{" .. table.concat(tRet, " , ") .. "}"
end
function print(...)
	local Ele = {...}
	local sRet = {}
	for _, v in pairs(Ele) do
		if type(v) == "string" then
			table.insert(sRet, v)
		elseif type(v) == "number" then
			table.insert(sRet, tostring(v))
		elseif type(v) == "boolean" then
			table.insert(sRet, tostring(v))
		elseif type(v) == "table" then
			table.insert(sRet, ScanTable(v))
		end
 	end
	local str = table.concat(sRet, " , ")
	LuaAuxLib.TracePrint(":", str)
	return str
end
QMPlugin.Print = print





function match(str,format)
	return str:match(format)
end
function gsub(str,f,s)
	return str:gsub(f,s)
end

-- 统计使用量
function sh_init()
	LuaAuxLib.URL_OperationGet("http://monster.gostats.cn/bin/count/a_480985/t_5/i_1/counter.png", 3)
	sh_init = function() end
end











--
---------------------------------------------- 字符串函数 ----------------------------------------------
--

-- 过滤前导字符 [str:要处理的字符串, filt:要过滤的字符]
function LTrimEx(str, filt, plain)
	sh_init()
	local iRet, sRet = pcall(function()
		local retstr = ""
		for i = 1, string.len(str) do
			if string.find(filt, string.sub(str, i, i), 1, plain) == nil then
				retstr = string.sub(str, i, -1)
				break
			end
		end
		return retstr
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return ""
	end
end
QMPlugin.LTrimEx = LTrimEx

-- 过滤后导字符 [str:要处理的字符串, filt:要过滤的字符]
function RTrimEx(str, filt, plain)
	sh_init()
	local iRet, sRet = pcall(function()
		local retstr = ""
		for i = string.len(str), 1, -1 do
			if string.find(filt, string.sub(str, i, i), 1, plain) == nil then
				retstr = string.sub(str, 1, i)
				break
			end
		end
		return retstr
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return ""
	end
end
QMPlugin.RTrimEx = RTrimEx

-- 过滤前导与后导字符 [str:要处理的字符串, filt:要过滤的字符]
function TrimEx(str, filt, plain)
	sh_init()
	local tmpstr
	tmpstr = LTrimEx(str, filt, plain)
	return RTrimEx(tmpstr, filt, plain)
end
QMPlugin.TrimEx = TrimEx

-- 删除字符中间的一段 [str:要处理的字符串, sval:删除开始位置, eval:删除结束位置]
function QMPlugin.DelPartStr(str, sval, eval)
	sh_init()
	local iRet, sRet = pcall(function()
		local LStr = string.sub(str, 1, sval-1)
		local RStr = string.sub(str, eval+1, -1)
		local RetStr = LStr ..RStr
		return RetStr
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return ""
	end
end

-- 删除指定字符 [str:要处理的字符串, filter:要删除的字符]
function QMPlugin.DelFilStr(str, filter)
	sh_init()
	local iRet, sRet = pcall(function()
		local RetStr, TmpLStr, TmpRStr, s, e
		RetStr = str
		while true do
			s, e = string.find(RetStr, filter, e)
			if s~= nil then
				TmpLStr = string.sub(RetStr, 1, s-1)
				TmpRStr = string.sub(RetStr, e+1, -1)
				RetStr = TmpLStr ..TmpRStr
			else
				break
			end
		end
		return RetStr
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return ""
	end
end
 
-- 统计指定字符数量 [str:要处理的字符串, substr:要查找的子串]
function QMPlugin.CountStr(str, substr)
	sh_init()
	local iRet, sRet = pcall(function()
		local count = 0
		for k in string.gmatch(str, substr) do
			count = count +1
		end
		return count
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return ""
	end
end

-- 从左侧删除指定字符 [str:要处理的字符串, num:要删除的数量] [返回删除后的字符]
function QMPlugin.LeftDel(str, num)
	sh_init()
	local iRet, sRet = pcall(function()
		return str:sub(num + 1, -1)
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return ""
	end
end

-- 从右侧删除指定字符 [str:要处理的字符串, num:要删除的数量] [返回删除后的字符]
function QMPlugin.RightDel(str, num)
	sh_init()
	local iRet, sRet = pcall(function()
		return str:sub(1, str:len() - num)
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return ""
	end
end

--提取路径中包含的文件后缀
function QMPlugin.GetFileType(path)
	sh_init()
	local iRet, sRet = pcall(function()
		s,e = string.find(path,"%.")
		local str = string.sub(path,s+1 ,-1)
		if str then
			return str
		else
			return ""
		end
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return ""
	end
end 

--提取路径中包含的文件名 
function GetFileName(path)
	sh_init()
	local iRet, sRet = pcall(function()
		path = "/" .. path
		local ret
		for w in string.gmatch(path, "/([^/]+)") do
			ret = w
		end
		return ret
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return ""
	end
end
QMPlugin.GetFileName = GetFileName











--
---------------------------------------------- 数组函数 ----------------------------------------------
--

-- 过滤数组 [arr:数组, substr:要过滤掉的字符串, tpe:是包含substr过滤还是不包含过滤] [返回过滤后的数组]
function QMPlugin.ArrayFilter(arr, substr, tpe)
	sh_init()
	local iRet, sRet = pcall(function()
		local tarr = {}
		for k, v in ipairs(arr) do
			if tpe then	--包含过滤条件
				if string.find(v, substr) ~= nil then
					table.insert(tarr, v)
				end
			else			--不包含过滤条件
				if string.find(v, substr) == nil then
					table.insert(tarr, v)
				end
			end
		end
		return tarr
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return arr
	end
end

-- 数组排序 [arr:数组, comp:是否重构数组索引] [返回排序后的数组]
function QMPlugin.ArraySort(arr, comp)
	sh_init()
	local iRet, sRet = pcall(function()
		local t = {}
		local j = 1
		tarr = CopyTable(arr)
		table.sort(tarr)
		if comp then
			for i = #tarr, 1, -1 do
				t[j] = tarr[i]
				j = j + 1
			end
			return t
		else
			return tarr
		end
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return arr
	end
end

-- 删除数组元素 [arr:数组, ipos:删除元素的位置] [返回操作后的数组]
function QMPlugin.ArrayRemove(arr, ipos)
	sh_init()
	local iRet, sRet = pcall(function()
		tarr = CopyTable(arr)
		table.remove(tarr, ipos+1)
		return tarr
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return arr
	end
end

-- 插入数组元素 [arr:数组, ipos:删除元素的位置, value:插入的值] [返回操作后的数组]
function QMPlugin.ArrayInsert(arr, ipos, value)
	sh_init()
	local iRet, sRet = pcall(function()
		tarr = CopyTable(arr)
		table.insert(tarr, ipos+1, value)
		return tarr
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return arr
	end
end

-- 数组去重 [tbl:数组或表] [返回操作后的数组]
function QMPlugin.ArrayRemoveDup(tbl)
	sh_init()
	local iRet, sRet = pcall(function()
		local a = {}
		local b = {}
		for _, v in ipairs(tbl) do
			a[v] = 0
		end
		for k, v in pairs(a) do
			table.insert(b, k)
		end
		return b
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return ""
	end
end

-- 数组元素改变位置 [arr:数组或表, a:交换位置的第一个元素, b:第二个元素] [返回操作后的数组]
function QMPlugin.ArrayChangePos(arr, a, b)
	sh_init()
	local iRet, sRet = pcall(function()
		local tmptbl = arr
		local tmpval = arr[a+1]
		table.remove(tmptbl, a+1)
		table.insert(tmptbl, b+1, tmpval)
		return tmptbl
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return ""
	end
end











--
---------------------------------------------- 随机数函数 ----------------------------------------------
--

--范围随机数 
function QMPlugin.RndEx(min,max)
	sh_init()
	local iRet, sRet = pcall(function()
		return math.random(min,max)
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return 0
	end
end 

--随机取逻辑值
function QMPlugin.RndBool()
	sh_init()
	local iRet, sRet = pcall(function()
		local tmpnum = math.random(2)-1
		if tmpnum == 0 then
			return true
		else 
			return false
		end
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return ""
	end
end 

--随机取数组内容 
function QMPlugin.RandArray(arr)
	sh_init()
	local iRet, sRet = pcall(function()
		local index
		index = math.random(1,#arr)
		return arr[index]
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return ""
	end
end 

--随机生成不重复数字  [作者：小玮]
function QMPlugin.RandArrayEx(arr,num)
	sh_init()
	local iRet, sRet = pcall(function()
		if num == nil or num > #arr then num = #arr end
		local Lines = {}
		for _ = 1,num do
			local n = math.random(#arr)
			Lines[#Lines + 1] = arr[n]
			table.remove(arr,n)
		end
		return Lines
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return ""
	end
end

-- 生成随机汉字
function QMPlugin.RndChr()
	sh_init()
	local iRet, sRet = pcall(function()
		local hight = math.random(16, 55) + 160
		local low = math.random(1, 94) + 160
		hight = string.format("%#x", hight)
		low = string.format("%#x",low)
		local ret = string.char(hight, low)
		-- 转换编码
		return Transcoding("utf-8", "gbk", ret)
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return ""
	end
end












--
---------------------------------------------- 文件函数 ----------------------------------------------
--

-- 判断文件是否存在
function FileExist(path)
	local f = io.open(path, "r")
	return Iif(f, true, false)
end

-- 读取文件 [path:路径, isdel:是否删除] [返回文件内容, 失败返回空字符串]
function ReadFile(path, isdel)
	local iRet, sRet = pcall(function()
		local f = io.open(path, "r")
		if f == nil then return "" end
		local ret = f:read("*all")
		f:close()
		if isdel then
			--先改名之后删除,防止系统IO阻塞
			local tmpfile = string.gsub(path, GetFileName(path), "temp.txt")
			os.rename(path, tmpfile)
			os.remove(tmpfile)
		end
		return ret
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return ""
	end
end
QMPlugin.ReadFile = ReadFile

-- 写文件 [path:路径, str:写入字符, mode:写入模式] [返回成功或失败]
function WriteFile(path, str, mode)
	local iRet, sRet = pcall(function()
		if mode == nil then mode = "w" end
		local f = io.open(path, mode)
		if f == nil then return false end
		local ret = f:write(str)
		f:close()
		return true
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return ""
	end
end
QMPlugin.WriteFile = WriteFile

-- 读取文件存为数组
function ReadFileLines(path)
	local iRet, sRet = pcall(function()
		local Lines = {}
		local f = io.open(path, "r")
		if f == nil then return nil end
		for v in f:lines() do
			table.insert(Lines, v)
		end
		f:close()
		return Lines
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return nil
	end
end
QMPlugin.ReadFileLines = ReadFileLines

-- 数组写入文件
function WriteFileLines(path, tbl)
	local iRet, sRet = pcall(function()
		if type(tbl) ~= "table" then return false end
		local f = io.open(path, "w")
		if f == nil then return nil end
		for _, v in ipairs(tbl) do
			f:write(v .. "\r\n")
		end
		f:close()
		return true
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return nil
	end
end
QMPlugin.WriteFileLines = WriteFileLines

--读取指定行的内容 
function ReadFileLine(path,line)
	local iRet, sRet = pcall(function()
		local Lines = {}
		Lines = ReadFileLines(path)
		if Lines == nil then return false end
		return Lines[line]
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return ""
	end
end 
QMPlugin.ReadFileLine = ReadFileLine

function AppendFileLine(path,line,str)
	local iRet, sRet = pcall(function()
		local Lines = {}
		if FileExist(path) == false then
			f = io.open(path, "w")
			f:close()
		end
		Lines = ReadFileLines(path)
		if line > #Lines then line = #Lines + 1 end
		table.insert(Lines,line,str)
		return WriteFileLines(path, Lines)
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return ""
	end
end
QMPlugin.AppendFileLine = AppendFileLine

function UpdateFileLine(path,line,str)
	local iRet, sRet = pcall(function()
		local Lines = {}
		Lines = ReadFileLines(path)
		if line > #Lines then line = #Lines + 1 end
		Lines[line] = str
		return WriteFileLines(path, Lines)
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return ""
	end
end
QMPlugin.UpdateFileLine = UpdateFileLine

--生成随机名称文件
function GetTempFile(Path, Prefix, Postfix, Lenght)
	sh_init()
	local iRet, sRet = pcall(function()
		local RndText,RetText
		if string.sub(Path, -1, -1) ~= "/" then Path = Path .. "/" end
		for i=1,Lenght do 
			if RndText == nil then
				RndText = math.random(Lenght)
			else 
				RndText = RndText .. math.random(Lenght)
			end 
		end 
		RetText = Path .. Prefix .. RndText .. Postfix
		local f = io.open(RetText,"w")
		f:close()
		return RetText
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return ""
	end
end 
QMPlugin.GetTempFile = GetTempFile

--遍历目录 
function QMPlugin.ScanPath(path,filter)
	sh_init()
	local iRet, sRet = pcall(function()
		if string.sub(path,-1,-1) ~= "/"then
			path = path .. "/"
		end
		local file = {}
		local folder = {}
		local ret = Execute("ls -F -a "..path)
		if ret ~= nil then
			for k, v in ret:gmatch("([^ \n]+) ([^\n]+)") do
				if k == "d" then		--文件夹
					table.insert(folder, v)
				elseif k == "-" then
					table.insert(file, v)
				end
			end
		end
		return Iif(filter, folder, file)
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return ""
	end
end

-- 递归遍历目录 [path:遍历路径] [返回包含完整文件路径的数组]
function QMPlugin.ScanPathEx(path)
	sh_init()
	local iRet, sRet = pcall(function()
		if string.sub(path,-1,-1) ~= "/" then path = path .. "/" end
		local tscan = TempFile("scan")
		os.execute("ls -F -a -R "..path.." > " ..tscan)
		local file = {}
		local tpath = ""
		local f = io.open(tscan,"r")
		for v in f:lines() do
			if v:find("/") ~= null then
				v = RTrimEx(v, ":")
				tpath = v.. "/"
			else
				local s, e =v:find("- ")
				if s then
					v = tpath..v:sub(e + 1, -1)
					v = v:gsub("//", "/")
					table.insert(file,v)
				end
			end
		end
		f:close()
		return file
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return ""
	end
end

--设置文件权限 
function QMPlugin.Chmod(path,per)
	sh_init()
	if per == 0 then		--读写权限
		return ChmodEx(path, 666)
	elseif per == 1 then	--只读权限
		return ChmodEx(path, 444)
	elseif per == 2 then	--可执行权限
		return ChmodEx(path, 777)
	end
end

--设置文件权限[增强]
function ChmodEx(path,per)
	sh_init()
	return os.execute("chmod " ..per.." "..path)
end
QMPlugin.ChmodEx = ChmodEx



--删除指定目录下指定后缀的文件  [作者：小玮]
function QMPlugin.FindFileDelete(findpath,filename)
	sh_init()
	return os.execute(string.format("find %s -name '%s' | xargs rm -rf",findpath,filename))
end

-- 替换文件内容 [path:文件路径, str:原字符串, repl:替换字符串] [返回文本内容]
function ReplaceFile(path, str, repl)
	sh_init()
	local iRet, sRet = pcall(function()
		local result
		local retText = ReadFile(path)
		if retText == "" then return "" end
		if retText:find(str) == nil then return "" end
		local tmpstr = retText:gsub(str,repl)
		WriteFile(path, tmpstr)
		return tmpstr
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return ""
	end
end
QMPlugin.ReplaceFile = ReplaceFile

-- 读取文件大小
function QMPlugin.ReadFileSize(path)
	sh_init()
	local iRet, sRet = pcall(function()
		local size
		local f = io.open(path)
		if f then
			size = f:seek("end")
			f:close()
		else
			return -1
		end
		return size
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return ""
	end
end

--读取文件二进制
function QMPlugin.ReadFileByte(file)
	local f = io.open(file,"rb")
	if f == nil then
		return ""
	end
	local retbyte = f:read("*all")
	f:close()
	return retbyte
end 

-- 获取文件属性
function QMPlugin.GetFileInfo(path, name)
	sh_init()
	local iRet, sRet = pcall(function()
		local lfs = require "lfs"
		if lfs ~= nil then
			return lfs.attributes(path, name)
		end
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return ""
	end
end

--移动文件
function QMPlugin.MoveFile(path1, path2)
	sh_init()
	local iRet, sRet = pcall(function()
		local f = io.open(path1, "rb")
		if f == nil then return false end
		local ret = f:read("*all")
		f:close()
		f = io.open(path2, "wb")
		if f == nil then return false end
		f:write(ret)
		f:close()
		os.remove(path1)
		return true
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return ""
	end
end










--
---------------------------------------------- 界面XML函数 ----------------------------------------------
--

--获取XML文件 
function QMPlugin.GetUIXml()
	sh_init()
	local iRet, sRet = pcall(function()
		os.execute("uiautomator dump ")
		return ReadFile(TempPath() .."window_dump.xml", true)
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return ""
	end
end 

-- XML转Table
function XmlToTable(xml)
	sh_init()
	local iRet, sRet = pcall(function()
		local tXml = {}
		local i = 1
		for k in xml:gmatch("<node[^>]+/?>") do
			tXml[i] = {}
			for w, y in k:gmatch("([^ ]+)=([^ ]+)") do
				tXml[i][w] = y
			end
			i = i + 1
		end
		return tXml
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return ""
	end
end
QMPlugin.XmlToTable = XmlToTable


-- 查找XML字符串 [返回第一个查找到的字符串]
function QMPlugin.FindXmlKey(Xml, key, val, key1)
	local iRet, sRet = pcall(function()
		local tXml = XmlToTable(Xml)
		local i = 1
		for i = 1, #tXml do
			if tXml[i][key] == "\""..val.."\"" then
				return tXml[i][key1]:match("\"(.+)\"")
			end
		end
		return ""
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return ""
	end
end

-- 查找XML字符串增强 [返回数组,包含了所有符合条件的结果]
function QMPlugin.FindXmlKeyA(Xml, key, val, key1)
	local iRet, sRet = pcall(function()
		local tXml = XmlToTable(Xml)
		local tmptable = {}
		for i = 1, #tXml do
			if tXml[i][key] == "\""..val.."\"" then
				table.insert(tmptable, tXml[i][key1]:match("\"(.+)\""))
			end
		end
		if tmptable[1] == nil then
			return nil
		else
			return tmptable
		end
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return nil
	end
end












--
---------------------------------------------- 编码转换函数 ----------------------------------------------
--

-- 编码转换
function Transcoding(to, from, text)
	local iconv = require("iconv")
	local cd = iconv.new(to, from)
	local ostr, err = cd:iconv(text)
	if err == iconv.ERROR_INCOMPLETE then
		print(":", "ERROR: Incomplete input.")
	elseif err == iconv.ERROR_INVALID then
		print(":", "ERROR: Invalid input.")
	elseif err == iconv.ERROR_NO_MEMORY then
		print(":", "ERROR: Failed to allocate memory.")
	elseif err == iconv.ERROR_UNKNOWN then
		print(":", "ERROR: There was an unknown error.")
	end
	return ostr
end
QMPlugin.Transcoding = Transcoding

--Base64加密Encoding
function Base64En(str)
	sh_init()
	local iRet, sRet = pcall(function()
		local bor, band, lshift, rshift = bit32.bor, bit32.band, bit32.lshift, bit32.rshift
		cTable = {
			'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
			'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
			'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
			'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/',
		}
		local RetTbl = {}
		local a1, a2, a3, b1, b2, b3, b4
		local cProc = math.floor((str:len() / 3)) * 3
		local ii = 0
		-- 编码
		for i=1, cProc, 3 do
			ii = ii + 1
			a1 = str:byte(i)
			a2 = str:byte(i + 1)
			a3 = str:byte(i + 2)
			b1 = rshift(a1, 2)		
			b2 = band(bor(lshift(a1, 4), rshift(a2, 4)), 0x3F)
			b3 = band(bor(lshift(a2, 2), rshift(a3, 6)), 0x3F)
			b4 = band(a3, 0x3F)
			--LuaAuxLib.TracePrint(a1, a2, a3, b1, b2, b3, b4)
			RetTbl[ii] = cTable[b1+1] .. cTable[b2+1] .. cTable[b3+1] .. cTable[b4+1]
		end
		-- 补充计算
		ii = ii + 1
		if (str:len() % 3) == 1 then
			a1 = str:byte(cProc + 1)
			b1 = rshift(band(a1, 0xFC), 2)
			b2 = lshift(band(a1, 0x03),4)
			RetTbl[ii] = cTable[b1+1] .. cTable[b2+1] .. "=="
		elseif (str:len() % 3) == 2 then
			a1 = str:byte(cProc + 1)
			a2 = str:byte(cProc + 2)
			b1 = rshift(band(a1, 0xFC), 2)
			b2 = bor(lshift(band(a1, 0x03), 4), rshift(band(a2, 0xF0), 4))
			b3 = lshift(band(a2, 0x0F), 2)
			RetTbl[ii] = cTable[b1+1] .. cTable[b2+1] .. cTable[b3+1] .. "="
		end
		return table.concat(RetTbl)
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return nil
	end
end
QMPlugin.Base64En = Base64En
--Base64解密Decoding  [作者：小玮]
function QMPlugin.Base64De(data)
	sh_init()
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

-- URL编码转uft8字符
function QMPlugin.UrlToChar(str)
	sh_init()
	local iRet, sRet = pcall(function()
		s = string.gsub(str, '%%(%x%x)', function(h) return string.char(tonumber(h, 16)) end)
		return s
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return nil
	end
end	

-- uft8字符转URL编码
function QMPlugin.CharToUrl(str)
	sh_init()
	local iRet, sRet = pcall(function()
		s = string.gsub(str, "([^%w%.%- ])", function(c) return string.format("%%%02X", string.byte(c)) end)
		return string.gsub(s, " ", "+")
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return nil
	end
end

--读取文件转换成base64编码
function QMPlugin.ReadFileBase(path)
	sh_init()
	local iRet, sRet = pcall(function()
		f = io.open(path,"rb")
		if f == null then 
			return null 
		end 
		bytes = f:read("*all")
		f:close()
		return Base64En(bytes)
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return ""
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
--unicode转utf8  [作者：小玮]
function QMPlugin.Unicode2Utf8(us)
	sh_init()
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
--utf8转unicode  [作者：小玮]
function QMPlugin.Utf82Unicode(s, upper)
	sh_init()
	local uec = 0
	s = s:gsub("\\", "\\")
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












--
---------------------------------------------- 网页日志函数 ----------------------------------------------
--



local Html = {}
local isAutoSave = true
local isInit = true
local HtmlData = ""
local HtmlPage = ""

function Init()
	local iRet, sRet = pcall(function()
	-- 0=白色、1=绿色、2=橙色、3=红色
	if Html.HtmlLevel == nil then
		Html.HtmlLevel = 1
	end
	-- 日志模版
	if Html.TempletItem == nil then
		Html.TempletItem = "<p class='class{$level}'>{$data}</p>"
	end
	-- 日志路径
	if Html.HtmlPath == nil then
		Html.HtmlPath = TempPath().."log_"..os.date("%Y%m%d%H%M")..".html"
	end
	-- 日志标题
	if Html.HtmlTitle == nil then
		Html.HtmlTitle = "日志记录系统"
	end
	-- 网页模版
	if Html.TempletPage == nil then
		Html.TempletPage = [[
		<html>
		<head>
		<meta charset='utf-8'>
		<title>{$title}</title>
		<style type='text/css'>
		.title {background-color : #000000;color : #FFFF00;font-family : Microsoft YaHei;font-size : 24pt;margin : 0;padding : 0;text-align : center;}
		.null {background-color : #000000;color : #FFFFFF;font-family : SimSun;font-size : 10pt;margin : 0;padding : 9px;}
		.class0 {background-color : #000000;color : #FFFFFF;font-family : SimSun;font-size : 10pt;margin : 0;padding : 0;text-indent : 16px;text-align : left;}
		.class1 {background-color : #000000;color : #00FF00;font-family : SimSun;font-size : 10pt;margin : 0;padding : 0;text-indent : 16px;text-align : left;}
		.class2 {background-color : #000000;color : #FF8000;font-family : SimSun;font-size : 10pt;margin : 0;padding : 0;text-indent : 16px;text-align : left;}
		.class3 {background-color : #000000;color : #FF0000;font-family : SimSun;font-size : 10pt;margin : 0;padding : 0;text-indent : 16px;text-align : left;}
		</style>
		</head>
		<body>
		<p class='null'></p>
		<p class='title'>{$title}</p>
		<p class='null'></p>
		{$data}
		</body>
		</html>
	]]
	end
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return ""
	end
end

-- 添加日志内容 [LogText:日志内容, Level:等级(可选)]
function QMPlugin.HLog_AddLog(LogText, Level)
	sh_init()
	local iRet, sRet = pcall(function()
		-- 初始化模版
		if isInit then 
			Init()
			isInit = false
		end
		local tmpLevel, tmpCode, tmpData
		tmpLevel = Html.HtmlLevel
		tmpPage  = Html.TempletPage
		if Level ~= nil then 
			tmpLevel = Level
		end
		-- 单条日志
		tmpData  = string.gsub(Html.TempletItem, "{$level}", tmpLevel)
		tmpData  = string.gsub(tmpData, "{$data}", os.date("[%H:%M:%S] ")..LogText)
		HtmlData = HtmlData..tmpData.."\n"
		-- 网页模版
		tmpPage  = string.gsub(Html.TempletPage, "{$title}", Html.HtmlTitle)
		tmpPage  = string.gsub(tmpPage, "{$data}", HtmlData)
		HtmlPage = tmpPage
		if isAutoSave then
			-- 写入日志
			WriteFile(Html.HtmlPath, HtmlPage, "w")
		end
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return ""
	end
end

-- 保存日志 [path:保存路径(可选)]
function QMPlugin.HLog_Save(path)
	sh_init()
	local iRet, sRet = pcall(function()
		Init()
		if Html.HtmlPath == nil then
			Html.HtmlPath = TempPath().."log_"..os.date("%Y%m%d%H%M")..".html"
		end
		if path ~= nil then
			WriteFile(path, HtmlPage, "w")
		else
			WriteFile(Html.HtmlPath, HtmlPage, "w")
		end
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return ""
	end
end

-- 设置是否自动保存 [mode:true自动保存]
function QMPlugin.HLog_AutoSave(mode)
	if mode then
		isAutoSave = mode
	end
end

-- 设置模版 [tbl:包含模版内容的table数据]
function QMPlugin.HLog_SetTemplet(tbl)
	Html.HtmlLevel   = tbl.HtmlLevel
	Html.TempletItem = tbl.TempletItem
	Html.HtmlPath    = tbl.HtmlPath
	Html.HtmlTitle   = tbl.HtmlTitle
	Html.TempletPage = tbl.TempletPage
end

-- 获取模版内容 
function QMPlugin.HLog_GetTemplet()
	Init()
	return Html
end











--
---------------------------------------------- 文本日志函数 ----------------------------------------------
--

--设置日志文件路径 
local Txt_log = {}
function QMPlugin.TLog_LogPath(path, sign)
	sh_init()
	if sign == nil then sign = 0 end
	Txt_log[sign] = path
end 
--日志记录 
function QMPlugin.TLog_OutLog(msg, sign)
	if Txt_log[sign] == nil then sign = 0 end
	local t = os.date("[%H:%M:%S]")
	local f = io.open(Txt_log[sign], "a")
	assert(f, "日志路径错误")
	f:write(t.. "\t"..msg.."\r\n")
    f:close()
end 












--
---------------------------------------------- 设备操作函数 ----------------------------------------------
--

local PROP_INFO		--定义全局的prop配置数据
function ScanGetprop()
	local prop = Execute("getprop")
	local proptbl = {}
	if prop ~= "" then
		for k, v in prop:gmatch("%[([^%]]-)%].-%[([^%]]-)%]\n") do
			proptbl[k] = v
		end
		return proptbl
	else
		return nil
	end
end

--获取MAC地址
function QMPlugin.GetMAC()
	sh_init()
	local iRet, sRet = pcall(function()
		if PROP_INFO == nil then
			PROP_INFO = ScanGetprop()
		end
		for k, v in pairs(PROP_INFO) do
			if k:find("wifi") and k:find("mac") then
				return PROP_INFO[k]
			end
		end
		return ""
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return ""
	end
end

-- 设置MAC地址
function QMPlugin.SetMAC(address)
	sh_init()
	local iRet, sRet = pcall(function()
		if PROP_INFO == nil then
			PROP_INFO = ScanGetprop()
		end
		for k, v in pairs(PROP_INFO) do
			if k:find("wifi") and k:find("mac") then
				Execute(string.format("setprop %s %s", k, address))
				PROP_INFO = nil		--清除全局prop数据
			end
		end
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return ""
	end
end

--设置输入法
function QMPlugin.SetIME(pattern)
	sh_init()
	local iRet, sRet = pcall(function()
		local imelist = {
			"com.baidu.input_mi/.ImeService",										-- 1.百度小米输入法
			"com.iflytek.inputmethod/.FlyIME",										-- 2.讯飞输入法
			"com.google.android.inputmethod.pinyin",								-- 3.谷歌输入法
			"com.xinshuru.inputmethod/.FTInputService",								-- 4.手心输入法
			"com.jb.gokeyboard/.GoKeyboard",										-- 5.GO输入法
			"com.cootek.smartinputv5.tablet/com.cootek.smartinput5.TouchPalIME",	-- 6.触宝输入法
			"com.tencent.qqpinyin/.QQPYInputMethodService",							-- 7.QQ拼音
			"com.baidu.input/.ImeService",											-- 8.百度输入法
			"com.komoxo.octopusime/com.komoxo.chocolateime.LatinIME",				-- 9.章鱼输入法
			"com.cyjh.mobileanjian/.input.inputkb",									-- 10.按键输入法
			"com.sohu.inputmethod.sogou/.SogouIME",									-- 11.搜狗输入法
		}
		local ret = os.execute("settings put secure default_input_method " ..imelist[pattern + 1])
		return ret or false
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return ""
	end
end 	

--获取通知栏信息
function QMPlugin.GetNotification(PackageName)
	sh_init()
	local iRet, sRet = pcall(function()
		local sPos, ePos
		local info = Execute("dumpsys notification")
		if info then
			repeat
				-- 找对应包名的信息
				sPos, ePos = info:find("pkg=" .. PackageName, ePos + 1)
				if sPos then
					-- 先验证图标，图标为0x0的都是空信息
					sPos, ePos, test = info:find("icon=([^ ]+)", ePos + 1)
					if test ~= "0x0" then
						-- 提取信息
						_, _, msg = info:find("tickerText=(.-)contentView", ePos + 1)
						return TrimEx(msg, "\n\t ") 
					end
				else
					return ""
				end
			until sPos == nil
		else
			return ""
		end		
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return ""
	end
end 

--关闭\开启wifi
function QMPlugin.ControlWifi(mode)
	sh_init()
	if mode then
		os.execute("svc wifi enable")
	else 
		os.execute("svc wifi disable")
	end 
end 

--关闭\开启数据流量
function QMPlugin.ControlData(mode)
	sh_init()
	if mode then
		os.execute("svc data enable")
	else 
		os.execute("svc data disable")
	end 
end 

--检测wifi是否开启
function QMPlugin.IsConnectWifi()
	sh_init()
	local iRet, sRet = pcall(function()
		local ret
		ret = Execute("dumpsys wifi")
		if ret:find("enabled") then
			return true
		else
			return false
		end
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return ""
	end
end 

--判断蓝牙是否开启 
function QMPlugin.IsBluetooth()
	sh_init()
	local iRet, sRet = pcall(function()
		local ret = Execute("getprop bluetooth.status")
		if ret == "on" then
			return true
		else
			return false
		end
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return false
	end
end 

--获取安卓系统版本号
function QMPlugin.GetAndroidVer()
	sh_init()
	return Execute("getprop ro.build.version.release")
end 

--重启手机
function QMPlugin.Reboot()
	sh_init()
	os.execute("reboot")
end 

--关机
function QMPlugin.ShutDown()
	sh_init()
	os.execute("reboot -p")
end 

--判断设备是否是虚拟机
function QMPlugin.IsVM()
	sh_init()
	local iRet, sRet = pcall(function()
		local retinfo = Execute("cat /proc/cpuinfo")
		if retinfo ~= "" then
			if retinfo:find("model name")  and retinfo:find("vendor_id") then
				return true
			else
				return false
			end
		else
			return false
		end
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return false
	end
end 

--判断充电状态 
function QMPlugin.GetBatteryState()
	sh_init()
	local iRet, sRet = pcall(function()
		local state
		local ret = Execute("dumpsys battery")
		if string.find(ret,"AC powered: true") then
			state = 1
		elseif string.find(ret,"USB powered: true") then
			state = 2
		elseif string.find(ret,"Wireless powered: true") then
			state = 3
		else 
			state = 0
		end 
		return state
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return 0
	end
end 

--设置手机时间
function QMPlugin.SetTime(d,t)
	sh_init()
	os.execute("date -s "..d.."."..t)
end 

--检测虚拟键高度 
function QMPlugin.GetNavigationBar() 
	sh_init()
	local iRet, sRet = pcall(function()
		local ret = Execute("dumpsys window windows")
		local _, _, pos1, pos2 = ret:find("NavigationBar.-mFrame=%[%d+,(%d+)%]%[%d+,(%d+)%]")
		if pos1 then
			return tonumber(pos2 - pos1)
		else
			return 0
		end
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return 0
	end
end

-- 获取通知栏高度
function QMPlugin.GetStatusBar()
	sh_init()
	local iRet, sRet = pcall(function()
		local ret = Execute("dumpsys window windows")
		local _,_,h,h1 = ret:find("StatusBar.-mFrame=%[%d+,(%d+)%]%[%d+,(%d+)%]")
		if h ~= nil then
			return tonumber(h1-h)
		else 
			return 0
		end 
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return 0
	end
end

--获取屏幕分辨率 
function QMPlugin.GetScreen(par)
	sh_init()
	local ret = Execute("dumpsys window")
	local info = {}
	_,_,info[1],info[2],info[3] = ret:find("init=(%d+)x(%d+) (%d+)dpi")
	if info[1] then
		if par == nil then
			return info
		else
			return info[par + 1]
		end
	else
		if arg[1] == nil then
			return nil
		else
			return 0
		end
	end
end 

--获取剩余内存百分比 
function QMPlugin.GetRAM()
	sh_init()
	local iRet, sRet = pcall(function()
		local Total,Free
		local path = TempFile("RAM")
		os.execute("dumpsys meminfo > "..path)
		local text = ReadFile(path)
		_,_,Total = string.find(text,"Total RAM: (%d+)")
		_,_,Free = string.find(text,"Free RAM: (%d+)")
		if Free ~= nil then
			return string.format("%d",(tonumber(Free)/tonumber(Total))*100)
		else
			return 0
		end		
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return 0
	end
end 

--是否亮屏(原理是检测光感是否开启)  [作者：小玮]
function QMPlugin.IsScreenOn()
	sh_init()
	local ret = Execute("dumpsys power")
	if ret then 
		ret = ret:match("mLightSensorEnabled=(.-) ")
		print(ret)
		if ret:find("ture") then
			return true
		else
			return false
		end
	else
		return false
	end
end

--开启飞行模式  [作者：小玮]
function QMPlugin.OpenAirplane()
	sh_init()
	os.execute("settings put global airplane_mode_on 1")
	os.execute("am broadcast -a android.intent.action.AIRPLANE_MODE --ez state true")
end
--关闭飞行模式  [作者：小玮]
function QMPlugin.CloseAirplane()
	sh_init()
	os.execute("settings put global airplane_mode_on 0")
	os.execute("am broadcast -a android.intent.action.AIRPLANE_MODE --ez state false")
end

--获取是否自动调节亮度 
function QMPlugin.IsAutoBrightness()
	sh_init()
	ret = Execute("settings get system screen_brightness_mode")
	if ret == 1 then
		return true
	elseif ret == 0 then
		return false
	end 
end 

--设置自动调节亮度 
function QMPlugin.SetAutoBrightness(mode)
	sh_init()
	if mode == 0 then --关闭自动调节亮度
		os.execute("settings put system screen_brightness_mode 0")
	elseif mode == 1 then
		os.execute("settings put system screen_brightness_mode 1")
	end 
end 

--获取当前屏幕亮度 
function QMPlugin.GetBrightness()
	sh_init()
	local ret = Execute("settings get system screen_brightness")
	if ret ~= "" then
		return tonumber(ret)
	else
		return -1
	end
end 

--设置当前屏幕亮度  
function QMPlugin.SetBrightness(val)
	sh_init()
	os.execute("settings put system screen_brightness " .. val)
end 

--获取屏幕休眠时间 
function QMPlugin.GetScreenSleep()
	sh_init()
	local itime = Execute("settings get system screen_off_timeout")
	if itime ~= "" then
		return tonumber(itime)/1000
	else
		return -1
	end
end 

--设置屏幕休眠时间 
function QMPlugin.SetScreenSleep(val)
	sh_init()
	os.execute("settings put system screen_off_timeout "..val*1000)
end 

--设置隐藏\显示虚拟键 [isDisplay:是否显示虚拟键]
function QMPlugin.SetNavigationBar(isDisplay)
	sh_init()
	local iRet, sRet = pcall(function()
		local path = "/system/build.prop"
		-- 判断挂载
		if Mount("/system") ~= true then return false end
		-- 判断变量
		local mode
		if isDisplay then mode = 0 else mode = 1 end
		-- 判断设置权限
		if ChmodEx(path, "777") ~= true then return false end
		-- 读取文件内容
		local retText = ReadFile(path)
		-- 判断是否已有相关设置选项
		if retText:find("qemu%.hw%.mainkeys=%w") then
			retText = retText:gsub("qemu%.hw%.mainkeys=%w", "qemu.hw.mainkeys="..mode)
			ReplaceFile(path, "qemu%.hw%.mainkeys=%w", "qemu.hw.mainkeys="..mode)
		else
			WriteFile(path, "\nqemu.hw.mainkeys="..mode, "a+")
		end
		retText = ReadFile(path)
		if retText:find("qemu%.hw%.mainkeys=%w") then
			return true
		else
			return false
		end
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return ""
	end
end

-- 获取sim卡状态
function QMPlugin.GetSIMState()
	sh_init()
	local iRet, sRet = pcall(function()
		local ret = Execute("getprop gsm.sim.state")
		if ret:find("READY") ~= nil then
			return true
		else
			return false
		end
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return false
	end
end


--清理后台,参数:白名单(不清理应用)，table类型
function QMPlugin.KillClean(pgknamearr)
	sh_init()
	local iRet, sRet = pcall(function()
		local locallist = GetAppList(0)
		local RunList = Execute("ps")
		local KeepList = table.concat(pgknamearr, ",")
		for _, v in pairs(locallist) do
			if RunList:find(v) and KeepList:find(v) == nil then
				os.execute("am force-stop "..v)
			end
		end
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return false
	end
end

--清理应用缓存  [作者：小玮]
function QMPlugin.AppClean(packagename)
	sh_init()
	Execute(string.format("pm clear %s",packagename))
end

--获取通话状态，返回值为0，表示待机状态、1表示来电未接听状态、2表示电话占线状态  [作者：小玮]
function QMPlugin.CallState()
	sh_init()
	local ret = Execute("dumpsys telephony.registry")
	if ret ~= "" then
		local retState = ret:match("mCallState=(.-)\n")
		if retState ~= "" then
			return tonumber(retState)
		else
			return -1
		end
	else
		return -1
	end
end

--获取来电号码  [作者：小玮]
function QMPlugin.CallIncomingNumber()
	sh_init()
	local ret = Execute("dumpsys telephony.registry")
	if ret ~= "" then
		local retNum = ret:match("mCallIncomingNumber=(.-)\n")
		if retNum ~= "" then
			return tonumber(retNum)
		else
			return 0
		end
	else
		return 0
	end
end

--获取系统开机时间
function QMPlugin.GetUpTime()
	sh_init()
	local rettime = Execute("cat /proc/uptime ")
	_,_,rettime = string.find(rettime,"([^ ]+)")
	if rettime then
		return tonumber(rettime)
	else
		return 0
	end
end 

--获取系统上输入法 [更新]
function QMPlugin.GetIME()
	sh_init()
	local retstr = Execute("ime list -s")
	local retIME = {}
	for v in string.gmatch(retstr,"([^\n]+)") do 
		table.insert(retIME,v)
	end 
	return retIME
end 

-- 保持屏幕常亮
function QMPlugin.KeepScreenOn(isOn)
	sh_init()
	local iRet, sRet = pcall(function()
		if isOn then
			os.execute("svc power stayon true")
		else
			os.execute("svc power stayon false")
		end
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return ""
	end
end

--获取用户点击屏幕坐标
--参数为横向分辨率,纵向分辨率,扫描周期
--返回值为一个数组，第一个是x坐标，第二个是y坐标  [作者：小玮]
function QMPlugin.Coordinate(ScreenX,ScreenY,Time)
	sh_init()
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












--
---------------------------------------------- 应用处理函数 ----------------------------------------------
--

--安装app
function QMPlugin.Install(path)
	sh_init()
	os.execute("pm install -r " .. string.format("%s",path) )
end 

--卸载app
function QMPlugin.Uninstall(PackageName)
	sh_init()
	os.execute("pm uninstall  " .. string.format("%s",PackageName) )
end 

--获取当前应用包名与组件名
function QMPlugin.GetTopActivity(mode)
	sh_init()
	local iRet, sRet = pcall(function()
	local ret = Execute("dumpsys activity top ")
		if ret ~= "" then
			if mode then
				if mode == 0 then
					return string.match(ret, "ACTIVITY ([^/]+)") 
				elseif mode == 1 then
					return string.match(ret, "ACTIVITY .-/([^ ]+)")
				end
			else
				return string.match(ret,"ACTIVITY ([^ ]+)")
			end
		end
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return ""
	end
end

--获取设备中的应用 
function GetAppList(tpe)
	sh_init()
	local iRet, sRet = pcall(function()
		local sRet
		local appList = {}
		if tpe == 0 then
			sRet = Execute("pm list packages -3")
		elseif tpe == 1 then
			sRet = Execute("pm list packages -s")
		elseif tpe == 2 then
			sRet = Execute("pm list packages")
		end
		for k in sRet:gmatch("package:([^\r\n]+)") do
			table.insert(appList, TrimEx(k, " "))
		end
		return appList
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return ""
	end
end
QMPlugin.GetAppList = GetAppList

--判断设备中是否有安装指定app
function QMPlugin.ExistApp(pkgname)
	sh_init()
	local iRet, sRet = pcall(function()
		local AppList = GetAppList(2)
		for k, v in ipairs(AppList) do
			if v == pkgname then
				return true
			end
		end
		return false
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return false
	end
end 

--指定APP打开网址  [存在部分应用版本不兼容情况]
function QMPlugin.RunUrl(url,ID)
	sh_init()
	local iRet, sRet = pcall(function()
		local AppID = {
			"com.qihoo.browser/org.chromium.chrome.browser.ChromeTabbedActivity",	--360浏览器
			"com.tencent.mtt.x86/.MainActivity",									--QQ浏览器
			"com.dolphin.browser.xf/mobi.mgeek.TunnyBrowser.MainActivity",			--海豚浏览器
			"com.oupeng.browser/com.opera.android.OperaMainActivity",				--欧朋浏览器
			"com.mx.browser/.MxBrowserActivity",									--傲游浏览器
			"com.UCMobile/com.uc.browser.InnerUCMobile",							--UC浏览器
			"com.baidu.searchbox/.MainActivity",									--百度浏览器
		}
		os.execute(string.format("am start -n %s -d '%s'", AppID[ID + 1], url))
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return false
	end
end 

--用微信浏览器打开网页
function QMPlugin.WeiXinUrl(packagename,url)
	sh_init()
	os.execute(string.format("am start -n %s/.plugin.webview.ui.tools.WebViewUI -d '%s'", packagename, url))
end

--用默认浏览器打开网页  [作者：小玮]
function QMPlugin.OpenWeb(url)
	sh_init()
	if url:find(":") == nil then url = "http://"..url end
	os.execute(string.format("am start -a android.intent.action.VIEW -d "..url))
end

--隐藏app
function QMPlugin.DisableApp(pkgname)
	sh_init()
	return os.execute("pm disable "..pkgname)
end 

--显示app
function QMPlugin.EnableApp(pkgname)
	sh_init()
	return os.execute("pm enable  "..pkgname)
end

--获取已安装应用的版本号  [作者：小玮]
function QMPlugin.AppVersion(packagename)
	sh_init()
	local iRet, sRet = pcall(function()
		local retVer = Execute(string.format("dumpsys package %s ", packagename))
		if retVer ~= nil and retVer ~= "" then
			return retVer:match("versionName=(.-)\n")
		else
			return ""
		end
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return ""
	end
end
--获取已安装应用首次安装的时间  [作者：小玮]
function QMPlugin.AppFirstInstallTime(packagename)
	sh_init()
	local iRet, sRet = pcall(function()
		local InsTime = Execute(string.format("dumpsys package %s ", packagename))
		if InsTime ~= nil and InsTime ~= "" then
			return InsTime:match("firstInstallTime=(.-)\n")
		else
			return ""
		end
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return ""
	end
end
--获取已安装应用升级安装的时间  [作者：小玮]
function QMPlugin.AppLastUpdateTime(packagename)
	sh_init()
	local iRet, sRet = pcall(function()
		local UpdateTime = Execute(string.format("dumpsys package %s ", packagename))
		if UpdateTime ~= nil and UpdateTime ~= "" then
			return UpdateTime:match("lastUpdateTime=(.-)\n")
		else
			return ""
		end
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return ""
	end
end
--发送广播强制刷新指定目录下的图片到图库展示  [作者：小玮]
function QMPlugin.UpdatePicture(picturepath)
	sh_init()
	os.execute("am broadcast -a android.intent.action.MEDIA_MOUNTED -d file://"..picturepath)
end











--
---------------------------------------		HTTP请求	---------------------------------------
--

--GetHttp [可自定义头信息]
function QMPlugin.GetHttp(url, t, header)
	sh_init()
	local path = TempFile("GET") 
	t = t or 30
	local ParStr = ""
	if header ~= nil then
		ParStr = " -H '" .. header .. "'"
	end
	os.execute(string.format("curl --connect-timeout %s %s -o %s '%s' ", t, ParStr, path, url))
	local result = ReadFile(path, true)
	return result
end

--GET提交信息，可附带cookie信息
function QMPlugin.GetHttpC(url, cookie_path, t, header)
	sh_init()
	local path = TempFile("GET") 
	t = t or 30
	local ParStr = ""
	if header ~= nil then
		ParStr = " -H '" .. header .. "'"
	end
	os.execute(string.format("curl --connect-timeout %s -b '%s' %s -o %s '%s' ", t, cookie_path, ParStr, path, url))
	local result = ReadFile(path, true)
	return result
end

--GetHttp 下载文件
function QMPlugin.GetHttpFile(url, filepath, t, header)
	sh_init()
	t = t or 30
	local ParStr = ""
	if header ~= nil then
		ParStr = " -H '" .. header .. "'"
	end
	os.execute(string.format("curl --connect-timeout %s %s -o %s '%s' ", t, ParStr, filepath, url))
end

--PostHttp [可自定义头信息]
function QMPlugin.PostHttp(url, post, t, header)
	sh_init()
	local path = TempFile("POST")  
	t = t or 30
	local ParStr = ""
	if header ~= nil then
		ParStr = " -H '" .. header .. "'"
	end
	os.execute(string.format("curl --connect-timeout %s -d '%s' %s -o %s '%s' ", t, post, ParStr, path, url))
	local result = ReadFile(path, true)
	return result
end 

--Post提交信息，可附带cookie信息
function QMPlugin.PostHttpC(url, post, cookie_path, t, header)
	sh_init()
	local path = TempFile("POST")
	t = t or 30
	local ParStr = ""
	if header ~= nil then
		ParStr = " -H '" .. header .. "'"
	end
	os.execute(string.format("curl --connect-timeout %s -b '%s' -d '%s' %s -o %s '%s' ", t, cookie_path, post, ParStr, path, url))
	local result = ReadFile(path, true)
	return result
end 

--获取外网ip
function QMPlugin.GetNetIP()
	sh_init()
	local iRet, sRet = pcall(function()
		local iplist = {
			"http://1212.ip138.com/ic.asp",
			"http://ip.chinaz.com/getip.aspx",
		}
		local retip = ""
		for _, v in ipairs(iplist) do
			retip = LuaAuxLib.URL_OperationGet(v, 5)
			if ret ~= "" then
				return retip:match("%d+%.%d+%.%d+%.%d+")
			end
		end
		return ""
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return ""
	end
end











--
---------------------------------------	LUA正则模式匹配	---------------------------------------
--

--全局正则匹配[包含单子串]
function QMPlugin.RegexFind(str,pattern)
	sh_init()
	local iRet, sRet = pcall(function()
	local ret ={}
	for v in string.gmatch(str,pattern) do 
		table.insert(ret,v)
	end 
	return ret
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return arr
	end
end 

--全局正则匹配多子串 
function QMPlugin.RegexFindEx(str,pattern)
	sh_init()
	local t1 = {}
	local i=1
	local ePos
	repeat
		local ta = {string.find(str, pattern, ePos)}
		ePos = ta[2]
		if ta[1] ~= nil then
			t1[i] = ta
			table.remove(t1[i],1)
			table.remove(t1[i],1)
			i=i+1
		end
	until ta[1]==nil
	return t1
end












--
---------------------------------------------- 数据库函数 ----------------------------------------------
--

--创建表 [DBpath:数据库路径, tbl:表名, field:列名(多列用逗号分隔)]
function SQLCreate(DBpath,tbl, field)
	sh_init()
	local iRet, sRet = pcall(function()
		local sqlite3 = require("sqlite3")
		local sql = string.format("CREATE TABLE %s(%s)",tbl, field)
		print(sql)
		if sqlite3.complete(sql) == nil then return false end
		local db = sqlite3.open(DBpath)
		if db == nil then return false end
		if db:exec(sql) == sqlite3.OK then
			db:close()
			return true
		else
			db:close()
			return false
		end
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return false
	end
end
QMPlugin.SQLCreate = SQLCreate


--添加字段
function SQLAddField(DBpath, tbl, field)
	sh_init()
	local iRet, sRet = pcall(function()
		local sqlite3 = require("sqlite3")
		local db = sqlite3.open(DBpath)
		if db == nil then return false end
		if field:find(",") then
			local fields = LuaAuxLib.StringSplit(field, ",")
			for _, v in ipairs(fields) do
				sql = string.format("ALTER TABLE %s ADD COLUMN %s", tbl, v)
				if sqlite3.complete(sql) == nil then return false end
				if db:exec(sql) ~= sqlite3.OK then
					db:close()
					return false
				end
			end
		else
			sql = string.format("ALTER TABLE %s ADD COLUMN %s", tbl, field)
			if sqlite3.complete(sql) == nil then return false end
			if db:exec(sql) ~= sqlite3.OK then
				db:close()
				return false
			end
		end
		db:close()
		return true
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return false
	end
end
QMPlugin.SQLAddField = SQLAddField

--查询表
function SQLSelect(DBpath, tbl, field, where)
	sh_init()
	local iRet, sRet = pcall(function()
		local result = {}
		local sql
		local sqlite3 = require("sqlite3")
		if field == "" or field == nil then field = "*" end
		where = where or ""
		sql = string.format("SELECT %s FROM %s %s", field, tbl, where)
		if sqlite3.complete(sql) == nil then return nil end
		local db = sqlite3.open(DBpath)
		if db == nil then return nil end
		function GetResult(ud, ncols, values, names)
			local tmptable = {}
			for i=1, ncols do
				key = names[i]
				tmptable[key] = values[i]
				--print(tmptable[key], values[i])
			end
			table.insert(result, tmptable)
			return 0
		end
		db:exec(sql, GetResult)
		db:close()
		return Iif(next(result), result, nil)
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return false
	end
end
QMPlugin.SQLSelect = SQLSelect

--插入数据
function SQLInsert(DBpath, tbl, valtbl)
	sh_init()
	local iRet, sRet = pcall(function()
		local sql
		local sqlite3 = require("sqlite3")
		local keys, vals
		for k, v in pairs(valtbl) do
			if keys == nil then
				keys = k
			else
				keys = keys .."," .. k
			end
			if vals == nil then
				vals = string.format("\"%s\"", v)
			else
				vals = vals .."," .. string.format("\"%s\"", v)
			end
		end
		sql = string.format("INSERT INTO %s(%s) VALUES(%s)", tbl, keys, vals)
		if sqlite3.complete(sql) == nil then return false end
		local db = sqlite3.open(DBpath)
		if db == nil then return nil end
		if db:exec(sql) == sqlite3.OK then
			db:close()
			return true
		else
			db:close()
			return false
		end
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return false
	end
end
QMPlugin.SQLInsert = SQLInsert

--修改数据
function SQLUpdate(DBpath, tbl, valtbl, where)
	sh_init()
	local iRet, sRet = pcall(function()
		local sql
		local sqlite3 = require("sqlite3")
		local str, ret
		for k, v in pairs(valtbl) do
			if str == nil then
				str = string.format("%s=\"%s\"", k, v)
			else
				str = str .. "," ..string.format("%s=\"%s\"", k, v)
			end
		end
		where = where or " "
		sql = string.format("UPDATE %s SET %s %s", tbl, str, where)
		if sqlite3.complete(sql) == nil then return false end
		local db = sqlite3.open(DBpath)
		if db == nil then return nil end
		if db:exec(sql) == sqlite3.OK then
			db:close()
			return true
		else
			db:close()
			return false
		end
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return false
	end
end
QMPlugin.SQLUpdate = SQLUpdate

--删除数据
function SQLDelete(DBpath, tbl, where)
	sh_init()
	local iRet, sRet = pcall(function()
		local sql
		local sqlite3 = require("sqlite3")
		local str, ret
		where = where or " "
		sql = string.format("DELETE FROM %s %s", tbl, where)
		if sqlite3.complete(sql) == nil then return false end
		local db = sqlite3.open(DBpath)
		if db == nil then return nil end
		if db:exec(sql) == sqlite3.OK then
			db:close()
			return true
		else
			db:close()
			return false
		end
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return false
	end
end
QMPlugin.SQLDelete = SQLDelete












--
---------------------------------------------- 通讯录函数 ----------------------------------------------
--

-- 获取最后一条短信
function QMPlugin.LastSMS()
	sh_init()
	local iRet, sRet = pcall(function()
		local dbpath = "/data/data/com.android.providers.telephony/databases/mmssms.db"	
		return SQLSelect(dbpath, "sms", "body", "order by date desc limit 0, 1")
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return ""
	end
end

-- 获取指定号码短信
function QMPlugin.GetSMS(number)
	sh_init()
	local iRet, sRet = pcall(function()
		local dbpath = 	"/data/data/com.android.providers.telephony/databases/mmssms.db"
		-- 组合电话号码
		if number:len() == 11 then number = "+86" .. number end
		return SQLSelect(dbpath, "sms", "body", "WHERE address=\"" .. number .."\" ")
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return ""
	end
end

-- 添加通讯录信息 [contact:联系人信息(table)]
function QMPlugin.AppendPhone(contact)
	sh_init()
	local iRet, sRet = pcall(function()
		local dbpath = "/data/data/com.android.providers.contacts/databases/contacts2.db"
		local maxID, nickname, phone
		local ret
		if Mount("/data") == false then
			return false
		else
			if ChmodEx(dbpath, 777) == false then
				return false
			end
		end
		-- 获取ID最大值
		local maxID = tonumber(SQLSelect(dbpath, "data", "max(raw_contact_id)",  "", ""))
		local i = 1
		for nickname, phone in pairs(contact) do
			--添加姓名
			ret = SQLInsert(dbpath, "data", {["data1"] = nickname, ["raw_contact_id"] = maxID + 1, ["mimetype_id"] = 7, ["data10"] = 2, ["data11"] = 0})
			--添加号码
			phone = tostring(phone)
			if phone:find("|") then
				phone = LuaAuxLib.StringSplit(v, "|")
				for i = 1, #phone do
					ret = SQLInsert(dbpath, "data", {["data1"] = phone[i], ["raw_contact_id"] = maxID + 1, ["mimetype_id"] = 1})
				end
			else
				ret = SQLInsert(dbpath, "data", {["data1"] = phone, ["raw_contact_id"] = maxID + 1, ["mimetype_id"] = 1})
			end
			maxID = maxID + 1
			-- 插入失败时退出
			if ret == false then break end
		end
		if ret then
			return true
		else
			return false
		end
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return false
	end
end











--
---------------------------------------	其他命令	---------------------------------------
--

--判断变量类型
function QMPlugin.Type(varname)
	sh_init()
	return type(varname)
end 

--返回当前插件版本号 
function QMPlugin.GetVer()
	sh_init()
	return SHver
end 

--区域颜色一定时间是否变化
function QMPlugin.IsDisplayChange(x,y,x1,y1,t,delay)
	sh_init()
	local PicPath,t1,intx,inty
	PicPath = __MQM_RUNNER_LOCAL_PATH_GLOBAL_NAME__ .."TmpPic.png"
	t1 = LuaAuxLib.GetTickCount()
	--截取指定范围图片并保存
	LuaAuxLib.SnapShot(PicPath,x,y,x1,y1)
	--在指定的时间内循环找图
	while (LuaAuxLib.GetTickCount() - t1) < t*1000 do 
		LuaAuxLib.KeepReleaseScreenSnapshot(true)
		intx = LuaAuxLib.FindPicture(x-10,y-10,x1+10,y1+10,PicPath,"101010",0,0.8)
		if intx == -1 then
			LuaAuxLib.KeepReleaseScreenSnapshot(false)
			return true
		end 
		LuaAuxLib.Sleep(delay*1000)
	end
	LuaAuxLib.KeepReleaseScreenSnapshot(false)
	return false 
end 

--iif判断
function Iif(exp,rtrue,rfalse)
	sh_init()
	if exp == false or exp == nil then
		return rfalse
	else 
		return rtrue
	end 
end 
QMPlugin.Iif = Iif

--逻辑等价运算[位运算]
function QMPlugin.Eqv(t1, t2)
	sh_init()
	if type(t1) == "boolean" and type(t2) == "boolean" then
		if t1 == t2 then
			return true
		else
			return false
		end
	else
		local i1, i2, ir
		i1 = tonumber(t1)
		i2 = tonumber(t2)
		ir = 0
		for i=0, 31 do
			local b1 = band(2^i, i1)
			local b2 = band(2^i, i2)
			if b1 == b2 then
				ir = bit32.bor(ir, 2^i)
			end
		end
		return ir
	end
end

--逻辑异或运算
function QMPlugin.Xor(t1,t2)
	sh_init()
	local i1, i2
	i1 = tonumber(t1)
	i2 = tonumber(t2)
	return bit32.bxor(i1, i2)
end 


--挂载系统权限
function QMPlugin.Mount(path)
	sh_init()
	local iRet, sRet = pcall(function()
		local ret = Execute("mount")
		if path == nil then
			for _, dir, _, per, _, _ in ret:gmatch("(.-)[ ]+(.-)[ ]+(.-)[ ]+(.-)[ ]+(.-)[ ]+(.-)") do
				print(dir, os.execute("mount -o remount,rw " .. dir))
				
			end
			return true
		else
			for _, dir, _, per, _, _ in ret:gmatch("(.-)[ ]+(.-)[ ]+(.-)[ ]+(.-)[ ]+(.-)[ ]+(.-)") do
				if dir == path then
					local result = os.execute("mount -o remount,rw " .. dir)
					return result
				end
			end
			return false
		end
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return false
	end
end 


-- 返回算式计算结果 [expr:计算公式] [返回计算结果]
function QMPlugin.Eval(expr)
	sh_init()
	local iRet, sRet = pcall(function()
		f = load('return ' .. expr)
		return f()
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return ""
	end
end

--两点经纬度之间的直线距离  [作者：小玮]
function QMPlugin.GetDistance(lat1,lng1,lat2,lng2)
	sh_init()
	local rad = function(d) return d*math.pi/180 end
	local radLat1 = rad(lat1)
	local radLat2 = rad(lat2)
	return math.floor(2*math.asin(math.sqrt(math.pow(math.sin((radLat1-radLat2)/2),2)+math.cos(radLat1)*math.cos(radLat2)*math.pow(math.sin((rad(lng1) - rad(lng2))/2),2)))*6378.137*10000)/10000
--地球是一个近乎标准的椭球体,此处地球半径我们选择的是6378.137km
end









--
---------------------------------------------- 时间函数 ----------------------------------------------
--

--日期转换成时间戳  [作者：小玮]
function QMPlugin.ToTime(Date,format)
	sh_init()
	local iRet, sRet = pcall(function()
		local Year,Month,Day,Hour,Min,Sec
		Time = {}
		_,_,Year,Month,Day,Hour,Min,Sec = Date:find(format)
		Time.year=Year
		Time.month=Month
		Time.day=Day
		Time.hour=Hour
		Time.min = Min
		Time.sec=Sec
		if next(Time) then
			return os.time(Time)
		else
			return 0
		end
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return nil
	end
end

--秒数转换为天数  [作者：小玮]
function QMPlugin.SecToDay(Sec)
	sh_init()
	local iRet, sRet = pcall(function()
		local Day,Hour,Min = 0,0,0
		if Sec < 0 then
			return "0天0小时0分0秒"
		end
		Sec = tonumber(Sec)
		for i =1,Sec/60 do
			Min = Min + 1
			if Min == 60 then Min = 0 Hour = Hour + 1 end
			if Hour == 24 then Hour = 0 Day = Day + 1 end
		end
		Sec=Sec%60
		return Day.."天"..Hour.."小时"..Min.."分"..Sec.."秒"
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return nil
	end
end

--对比是否到期,参数：到期时间的年、月、日、时、分、秒,返回值：到期返回-1,获取网络时间失败返回null,未到期返回距离到期剩余的时间(单位秒)  [作者：小玮]
function QMPlugin.CompareTime(Year,Month,Day,Hour,Min,Sec)
	sh_init()
	local iRet, sRet = pcall(function()
		local NowNetTime
		NowNetTime = GetUnixTime()
		if NowNetTime > 0 then
			local Time = {
				year = Year,
				month = Month,
				day = Day,
				hour = Hour,
				min = Min,
				sec = Sec,
			}
			local ExpireTime = os.time(Time)
			if NowNetTime > ExpireTime then
				return -1
			else
				return ExpireTime - NowNetTime
			end
		else
			return 0
		end
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return nil
	end
end

--计算几天后的日期  [作者：小玮] 
function QMPlugin.LateTime(late,Year,Month,Day)
	sh_init()
	local starttime --
	if Day ~= nil then
		local Time = {};Time.year=Year;Time.month=Month;Time.day=Day
		starttime = os.time(Time)
	else
		starttime = os.time()
	end
	return os.date("%Y-%m-%d",starttime + tonumber(late) * 24 * 60 * 60)
end


--获取网络时间 
function QMPlugin.GetNetTime()
	sh_init()
	local iRet, sRet = pcall(function()
		local UnixTime = GetUnixTime()
		if UnixTime > 0 then
			return os.date("%Y-%m-%d %X", UnixTime)
		else
			return ""
		end
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return nil
	end
end

-- 获取Unix时间戳 [level: 时间等级,true为毫秒级]
function GetUnixTime(level)
	sh_init()
	local iRet, sRet = pcall(function()
		--http://www.114time.com/api/clock.php  *已失效*
		local TimeJson = LuaAuxLib.URL_OperationGet("https://biaozhunshijian.51240.com/web_system/51240_com_www/system/file/biaozhunshijian/time.js/?/", 10)
		_, _, TimeJson = TimeJson:find("{\"time\":(.-)}")
		--获取网络时间失败则返回-1
		if TimeJson ~= nil then
			if level then
				return tonumber(TimeJson)
			else
				return tonumber(TimeJson:sub(1, 10))
			end
		else
			return -1
		end
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return nil
	end
end
QMPlugin.GetUnixTime = GetUnixTime

--定时器 
local TimerInfo={} 
function QMPlugin.TimeSign(id)
	sh_init()
	TimerInfo[id] = os.time()
end 
function QMPlugin.Timer(id,diff)
	local t1 =os.time()
	if t1-TimerInfo[id] >= diff then
		TimerInfo[id] = os.time()
		return true
	else 
		return false
	end 
end 











--
---------------------------------------------- XML库函数 ----------------------------------------------
--

-- 从文件加载XML
function QMPlugin.ParseByXmlFile(path)
	sh_init()
	local iRet, sRet = pcall(function()
		local xfile = xml.load(path) --从文件读取xml内容
		return xfile
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return nil
	end
end

-- 从字符串加载XML
function QMPlugin.ParseByXmlStr(data)
	sh_init()
	local iRet, sRet = pcall(function()
		local xfile = xml.eval(data) --从文件读取xml内容
		return xfile
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return nil
	end
end

-- 查找节点返回table
function QMPlugin.Xml_Find(xmltab,item)
	local iRet, sRet = pcall(function()
		local tmp = xmltab:find(item)
		return tmp
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return nil
	end
end

-- 保存
function QMPlugin.Xml_Save(xmltab,path)
	local iRet, sRet = pcall(function()
		xmltab:save(path)
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return nil
	end
end

-- 创建子节点
function QMPlugin.Xml_New(item)
	local iRet, sRet = pcall(function()
		local ret = xml.new(item)
		return ret
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return nil
	end
end

-- 设置子节点键值
function QMPlugin.Xml_Append(xmltab,item)
	local iRet, sRet = pcall(function()
		local ret = xmltab:append(item)
		return ret
	end)
	if iRet == true then
		return sRet
	else
		print(sRet)
		return nil
	end
end






