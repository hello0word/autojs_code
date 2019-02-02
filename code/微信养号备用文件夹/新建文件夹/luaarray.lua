--所有需要供按键精灵使用的插件函数，都必须加 QMPlugin. 前缀
--在按键精灵中采用 Import "插件名.lua" 导入插件后，再用 插件名.函数名 即可调用

--取字符串或数组长度
function QMPlugin.UBound(arr)
return #arr
end



--插入数组成员 
function QMPlugin.insert(arr,value,pos)
     local len=#arr
     if pos==null  or pos >=len then
          pos=len+1
     elseif  pos <=0 then 
          pos=1
     else 
          pos=pos+1
     end
	pcall(
	   function()
                   table.insert(arr,pos,value)
        end)
       if #arr>len then 
              return true
       else 
              return false
       end
end

--删除数组成员
function QMPlugin.remove(arr,pos)
       local len=#arr
       if pos==null  or pos >=len then
            pos=len
       elseif  pos <=0 then 
            pos=1
       else 
            pos=pos+1
       end
          pcall(
	      function()
                     table.remove(arr,pos)
          end)
       if #arr==len-1 then 
              return true
       else 
              return false
       end
end

-- 输出指定位置数组成员
function QMPlugin.concat(arr, sep,  start, end1) 
return table.concat(arr, sep,  start, end1) 
end

--排序
function QMPlugin.sort(arr, comp) 

if comp==null then
comp = null
elseif comp==0 then
comp = function(a, b) return b < a end 
else
comp = function(a, b) return b > a end 
end
return table.sort(arr, comp) 
end

--取cpu运行时间
function clock()
	return math.ceil(os.clock()*1000)
end



function QMPlugin.exect(str,getresult)
local Lines = {}
local Line
if getresult==null or getresult==0  then
os.execute(str)
Line=true
return Line


elseif getresult==1 then
str=str..">  /sdcard/anjian.txt"
os.execute(str)
	pcall(
	function()

	io.input("/sdcard/anjian.txt")
	Line = io.read("*a")
	io.close()

	end)

	return Line
else 
str=str..">  /sdcard/anjian.txt"
os.execute(str)
	pcall(
	function()

	io.input("/sdcard/anjian.txt")
	while true do
		local ReadContent = io.read()
		--为了和按键精灵的语法保持一致，注意 lua 中的 nil 需要写为 null
		if ReadContent == null then
			break
		end
		table.insert(Lines, ReadContent)
	end

	io.close()
        os.execute("rm -f /sdcard/anjian.txt")

	end)

	return Lines
end


end

