'''
@初始配置项
Author:韦玮
---------------
'''
#12306账号
myuser="15369323275"
mypasswd="xia031425"
import urllib.request
import re
import ssl
import urllib.parse
import http.cookiejar
import datetime
import time
import requests
#为了防止ssl出现问题，你可以加上下面一行代码
ssl._create_default_https_context = ssl._create_unverified_context
#查票
#常用三字码与站点对应关系
areatocode={"上海":"SHH","北京":"BJP","南京":"NJH","昆山":"KSH","杭州":"HZH","桂林":"GLZ","沙岭子西":"IXP","大同":"DTV","西安":"XAY"}
# start1=input("请输入起始站:")
start="IXP"
# start=areatocode[start1]
# to1=input("请输入到站:")
to="DTV"
# to=areatocode[to1]
# isstudent=input("是学生吗？是：1，不是：0")
isstudent="1"
# date=input("请输入要查询的乘车开始日期的年月，如2017-03-05：")
date="2019-01-06"
if(isstudent=="0"):
    student="ADULT"
else:
    student="0X00"
url="https://kyfw.12306.cn/otn/leftTicket/query?leftTicketDTO.train_date="+date+"&\
leftTicketDTO.from_station="+start+"&leftTicketDTO.to_station="+to+"&purpose_codes="+student
context = ssl._create_unverified_context()

def loop():
    global start,to,isstudent,date,url,context
    data=urllib.request.urlopen(url).read().decode("utf-8","ignore")
    patrst01='"result":\[(.*?)\]'
    rst01=re.compile(patrst01).findall(data)[0]
    allcheci=rst01.split(",")
    checimap_pat='"map":({.*?})'
    checimap=eval(re.compile(checimap_pat).findall(data)[0])
    #print("车次\t出发站名\t到达站名\t出发时间\t到达时间\t一等座\t二等座\t硬座\t无座")
    for i in range(0,len(allcheci)):
        
        try:
            thischeci=allcheci[i].split("|")
            # print(thischeci)
            #[3]---code
            code=thischeci[3]#车次
            #[6]---fromname
            fromname=thischeci[6]#出发点
            fromname=checimap[fromname]#
            #[7]---toname
            toname=thischeci[7]
            toname=checimap[toname]
            #[8]---stime
            stime=thischeci[8]
            #[9]---atime
            atime=thischeci[9]
            #[28]---yz
            yz=thischeci[31]
            #[29]---wz
            wz=thischeci[30]
            #[29]---硬座
            ze=thischeci[29]
            #[31]---zy
            zy=thischeci[26]#无座
            #[23]--软卧
            rw = thischeci[23]
            #[28]--硬卧
            yw = thischeci[28]
            #print(code+"\t"+fromname+"\t"+toname+"\t"+stime+"\t"+atime+"\t:无座"+str(zy)+"\t:硬座"+str(ze)+"\t:yz"+str(yz)+"\t:wz"+str(wz))
            if(code=="K1277" and ze != "" and ze != "无"):
                url = "https://sc.ftqq.com/SCU21833T9e791d33beae666ff305745f21db2df05a842cefa015a.send?text="
                messagre = "有票了"
                Url = url +messagre
                qinqiu = requests.get(Url)
                print("抢票成功")
            elif(code=="K263" and ze != "" and ze != "无"):
                url = "https://sc.ftqq.com/SCU21833T9e791d33beae666ff305745f21db2df05a842cefa015a.send?text="
                messagre = "有票了"
                Url = url +messagre
                qinqiu = requests.get(Url)
                print("抢票成功")
            else:
                print("失败")
        except Exception as err:
            pass


while(True):
    loop()
    time.sleep(60)