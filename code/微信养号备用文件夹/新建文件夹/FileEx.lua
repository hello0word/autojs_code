
--在按键精灵中采用 Import "插件名.lua" 导入插件后，再用 插件名.函数名 即可调用
--~ 版权所有,2014.8.13 ------------by zhou164902127
--~ 版权所有,2014.8.21-------------by zhou164902127


--~ 读取文件
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

--~ 读取文件到数组
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
		table.insert(Lines, ReadContent)
	end
	io.close()
	end)
	return Lines
end

--~ 写文件
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

--~ 写多行到文件
function QMPlugin.WriteLines(FileName, Lines)
	pcall(
	function()
		io.output(FileName)
		for i, v in ipairs(Lines) do
			io.write(tostring(v), '\n')
		end
		io.close()
	end)
end

--~ 新建目录
function QMPlugin.CreateFolder(dirname)
	pcall(
	function()
		os.execute("mkdir -p " .. dirname)
	end)
end

--~ 删除文件
function QMPlugin.DeleteFile(filename)
	pcall(function()
		 os.remove (filename)
		end)
end

--~ 删除目录
function QMPlugin.DeleteFolder(dirname)
	pcall(
	function()
		os.execute("rm -r " .. dirname)
	end)
end

--~ 移动文件
function QMPlugin.MoveFile(file1, file2)
	pcall(
	function()
		os.execute("mv " ..file1.." ".. file2)
	end)
end

--~ 新建文件
function QMPlugin.Createfile(file)
	pcall(
	function()
		os.execute("touch " ..file)
	end)
end

--~ 复制文件
function QMPlugin.CopyFile(file1, dirname)
	pcall(
	function()
		 os.execute("cp " ..file1.." "..  dirname)
	end)
end

--~ 重命名文件
function QMPlugin.ReNameFile(oldname, newname)
	pcall(
	function()
		os.rename(oldname, newname)
	end)
end

--~ ~判断文件是否存在
function QMPlugin.IsFileExist(file)
	local x
	pcall(
	function()
		x=io.open(file)
		if x then
		io.close(x)
		x=true
		else
		x=false
		end
	end)
	return x
end

--~ 添加内容到文件
function QMPlugin.WriteEX(filename,str)
	pcall(
	function()
		file = io.open(filename,"a")
		file:write(str)
		file:close()
	end)
end









