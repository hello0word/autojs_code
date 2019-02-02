--插件版本
function QMPlugin.Ver()
	return "2.1"
end
--解码uri
function QMPlugin.decodeURI(s)
    return string.gsub(s, '%%(%x%x)', function(h) return string.char(tonumber(h, 16)) end)
end
--编码uri
function QMPlugin.encodeURI(s)
    s = string.gsub(s, "([^%w%.%- ])", function(c) return string.format("%%%02X", string.byte(c)) end)
    return string.gsub(s, " ", "+")
end
--执行指定命令
function QMPlugin.Cmd(str)
	os.execute(str)
end
--下载文件
function QMPlugin.DownLoadFile(url, filepath)
	os.execute(string.format("curl -o '%s' '%s' ",filepath, url))
end
--安装app
function QMPlugin.InstallApp(path)
	Help.Cmd("pm install -r " .. path)
end
--获取外网ip
function QMPlugin.GetIP()
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
				break
			end
		end
		return retip:match("%d+%.%d+%.%d+%.%d+")
	end)
	if iRet == true then
		return sRet
	else
		--print(sRet)
		return ""
	end
end