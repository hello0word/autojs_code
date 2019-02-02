--所有需要供按键精灵使用的插件函数，都必须加 QMPlugin. 前缀
--在按键精灵中采用 Import "插件名.lua" 导入插件后，再用 插件名.函数名 即可调用

function QMPlugin.Read(FileName)
	local ReadContent

	--下面用pcall把可能产生运行时错误的部分包裹起来，避免文件打开失败的时候，引起脚本中止
	pcall(
	function()

	io.input(FileName)
	ReadContent = io.read("*a")
	io.close()
	
	end)
	
	return ReadContent
end

function QMPlugin.ReadLines(FileName)
	local Lines = {}
	
	pcall(
	function()

	io.input(FileName)
	while true do
		local ReadContent = io.read()
		--为了和按键精灵的语法保持一致，注意 lua 中的 nil 需要写为 null
		if ReadContent == null then 
			break
		end
		ReadContent = string.gsub(ReadContent, "[\r\n]", "")
		table.insert(Lines, ReadContent)
	end
	io.close()
	
	end)
	
	return Lines
end

function QMPlugin.ReadLine(FileName, LineNum)
	local LineContent = ""
	pcall(
	function()
	local curLineNum = 0
	io.input(FileName)
	while true do
		local ReadContent = io.read()
		--为了和按键精灵的语法保持一致，注意 lua 中的 nil 需要写为 null
		if ReadContent == null then 
			break
		end
		curLineNum = curLineNum + 1
		if curLineNum == LineNum then
			LineContent = ReadContent
		end

	end
		io.close()
	end)
	
	LineContent = string.gsub(LineContent, "[\r\n]", "")
	return LineContent
end

function QMPlugin.LinesNumber(FileName)
	local LinesAllNum = 0
	pcall(
	function()
	io.input(FileName)
	while true do
		local ReadContent = io.read()
		--为了和按键精灵的语法保持一致，注意 lua 中的 nil 需要写为 null
		if ReadContent == null then 
			break
		end
		LinesAllNum = LinesAllNum + 1
	end
		io.close()
	end)
	
	return LinesAllNum
end

function QMPlugin.Write(FileName, ...)
	local arg={...}
	pcall(
	function()
		io.output(FileName)
		for i, v in ipairs(arg) do
			io.write(tostring(v))
		end
		io.close()
	end)
end

function QMPlugin.WriteLine(path,line,str)
	local t={}
	f = io.open(path,"r")
	for i in f:lines() do
		table.insert(t,i)
	end
	table.insert(t,line,str)
	f:close()
	f = io.open(path,"w")
	for _,v in ipairs(t) do 
		f:write(v.."\r\n")
	end 
	f:close()
end 

function QMPlugin.WriteLines(FileName, Lines)
	pcall(
	function()
	
		io.output(FileName)
		for i, v in ipairs(Lines) do
			io.write(tostring(v), '\r\n')
		end
		io.close()
		
	end)
end

function QMPlugin.Append(FileName, ...)
	local arg={...}
	pcall(
	function()
		local f = io.open(FileName, "a")
		if f == null then
		    return false
		end
		for i, v in ipairs(arg) do
			f:write(tostring(v))
		end
		f:close()
	end)
	return true
end

function QMPlugin.DeleteLine(FileName, LineNum)
local Lines = {}
pcall(
function()
local curLineNum = 0
io.input(FileName)
while true do
local ReadContent = io.read()
--为了和按键精灵的语法保持一致，注意 lua 中的 nil 需要写为 null
if ReadContent == null then 
break
end
curLineNum = curLineNum + 1
if curLineNum ~= LineNum then
ReadContent=string.gsub(tostring(ReadContent),"\r","")
table.insert(Lines,ReadContent)
end
end
--此处不能调用io.close()，由于后面要继续操作该文件，如果关闭的话后面会报错，提示：操作已关闭的文件
--io.close()
-- write all the lines
io.output(FileName)
for i, v in ipairs(Lines) do
io.write(string.gsub(v,"\r",""), '\r\n')
end
io.close()
end
)
end


function QMPlugin.Bytes(FileName)
	local size = 0
	pcall(
	function()
		local f = io.open(FileName, "r")
		if f == null then
		    return null
		end
		size = f:seek("end")
		f:close()
	end)
	return size
end

function QMPlugin.Length(FileName)
	local fileLength = 0
	pcall(
		function()
			io.input(FileName)
			local ReadContent = io.read("*a")
			local strContent = tostring(ReadContent)
			strContent = string.gsub(strContent, "[\r\n]", "")
			
			--计算strContent中UTF8格式的字符个数
			local len = #strContent
			local left = len
			local cnt = 0
			local arr={0,0xc0,0xe0,0xf0,0xf8,0xfc}
			while left ~= 0 do
				local tmp=string.byte(strContent,-left)
				local i=#arr
				while arr[i] do
					if tmp>=arr[i] then 
						left=left-i
						break
					end
					i=i-1
				end
				cnt=cnt+1
			end
			fileLength = cnt
			
		end
	)
	return fileLength
end