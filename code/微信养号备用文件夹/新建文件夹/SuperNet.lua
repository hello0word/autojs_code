--按键网络插件3.6
--有问题请联系作者QQ771299231

--HttpGet
--成功返回网页内容，失败返回false
function QMPlugin.httpGet(url)
	local f=loadfile(__MQM_RUNNER_LOCAL_PATH_GLOBAL_NAME__.."NetPlugin")
	local re=f(url)
	return re
end
--HttpPost
--成功返回网页内容，失败返回false
function QMPlugin.httpPost(url,data)
	local f=loadfile(__MQM_RUNNER_LOCAL_PATH_GLOBAL_NAME__.."NetPlugin")
	local re=f(url,data)
	return re
end
--FTP上传
--成功返回true,失败返回false
function QMPlugin.ftpUpLoad(ftpUrl,ftpName,ftpPassWord,localPath,ftppath)
	ftppath=string.gsub(ftppath,'/','\\')
	local f=loadfile(__MQM_RUNNER_LOCAL_PATH_GLOBAL_NAME__.."NetPlugin")
	local re=f(ftpUrl,ftpName,ftpPassWord,localPath,ftppath,1)
	return re
end
--FTP下载
--成功返回true,失败返回false
function QMPlugin.ftpDownLoad(ftpUrl,ftpName,ftpPassWord,ftppath,localPath)
	ftppath=string.gsub(ftppath,'/','\\')
	local f=loadfile(__MQM_RUNNER_LOCAL_PATH_GLOBAL_NAME__.."NetPlugin")
	local re=f(ftpUrl,ftpName,ftpPassWord,ftppath,localPath,2)
	return re
end