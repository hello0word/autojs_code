
# coding: utf-8

# In[ ]:


from selenium import webdriver
import time,os,datetime
from time import sleep
import random
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains #引入ActionChains鼠标操作类
from selenium.webdriver.common.keys import Keys #引入keys类操作
import threading
import  pickle
from pathlib import Path


# In[ ]:


Debug = True
option = webdriver.ChromeOptions()
#这里配置用户文件目录
#option.add_argument("user-data-dir="+str(Path(os.environ['LOCALAPPDATA'],"Google","Chrome","User Data","Default")))
#option.add_argument(r"user-data-dir=C:\Users\Administrator.SKY-20160519IPR\AppData\Local\Google\Chrome\User Data\Default")
option.add_argument('disable-infobars')
#初始化评论文件
评论文件路径 = "D://评论.txt"
result=[]
with open(评论文件路径,'r',encoding="utf-8") as f:
    strlist = f.read().split("|")
    for st in strlist:
        if len(st) > 2:
            st =st.replace('\n','')
            result.append(st)


# In[ ]:


class browser :
    
    def __init__(self,url=None):
        self.Edge = webdriver.Chrome(options=option)
        global Edge
        Edge = self.Edge
        self.flag = True
        if type(url) == str :
            self.Edge.get(url)
                
    def update_current_list(self):
        self.当前列表 = list()
        for count in range(10):
            self.当前列表.append(self.Edge.find_element_by_css_selector("#v6_pl_content_homefeed > div > div.WB_feed.WB_feed_v3.WB_feed_v4 > \
        div:nth-child("+str(count+1)+") > div.WB_feed_detail.clearfix > div.WB_detail > div.WB_text.W_f14").text)
            
    def loop(self):
        self.完成列表 = list()
        self.当前列表 = list()
        while(self.flag):
            #刷新页面 处理当前所有
            self.Edge.refresh()
            第十条定位 = "#v6_pl_content_homefeed > div > div.WB_feed.WB_feed_v3.WB_feed_v4 > \
        div:nth-child(10) > div.WB_feed_detail.clearfix > div.WB_detail > div.WB_text.W_f14"
            WebDriverWait(self.Edge,20,0.5).until(EC.presence_of_element_located((By.CSS_SELECTOR, 第十条定位)))
            self.update_current_list()
            for index, text in enumerate(self.当前列表):
                if text not in self.完成列表:
                    self.完成列表.append(text)
                    评论 = random.sample(result , 1)[0]
                    if 点开并且评论(index+1,评论):
                        delayAndRemind(5,10,"评论完成,等待评论下一条")#每一条评论的延时 15 到50 秒
                    
                if 判断是否有弹窗():
                    randomtime = random.randint(3,15)
                    delayAndRemind(3*60,15*60,"发现弹窗")#3-15分钟
            ##################
            #休眠一段时间
            delayAndRemind(30,180,"等待刷新页面")#3-15分钟
            
        else:
            
            print("线程结束")
    def start(self):
        thread = threading.Thread(target=self.loop)
        thread.start()
    def pause(self):
        self.flag = False
    def stop(self):
        self.flag = False
        self.Edge.quit()
        
    


# In[ ]:


def delayAndRemind(min_time,max_time,content):#单位秒
    #每3秒提醒一次
    global Debug
    time_my = random.randint(min_time,max_time)
    for i in range(int(time_my / 3)):
        nowTime = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')#现在
        if(Debug):
            print(str(nowTime)+ "        信息:" + content +"      还剩:"+  str(int(3*(time_my / 3 - i))) +"秒" )
        sleep(3)


# In[ ]:


def 关注(index):
    index = str(index)
    css = '#Pl_Core_NewMixFeed__3 > div > div.WB_feed.WB_feed_v3.WB_feed_v4 > div:nth-child('+index+') >div.WB_feed_detail.clearfix > div.WB_detail > div.PCD_user_b.S_bg1 > div.user_scroll > ul > li:nth-child(1) > div > p.opt > a'
    #Edge.switch_to_window(Edge.window_handles[0])
    Edge.find_element_by_css_selector(css).send_keys(Keys.ENTER)
    for f in range(30):
        try :    
            index = 15
            for i in range(1000):
                关注(index)
                sleep(2)
        except Exception as e:
            index+=1
            print(index-1)


# In[ ]:


def 点开并且评论(index,context):
    index = str(index)
    点赞定位 = '#v6_pl_content_homefeed > div > div.WB_feed.WB_feed_v3.WB_feed_v4 > \
    div:nth-child('+index+') > div.WB_feed_handle > div > ul > li:nth-child(4) > a'
    #点赞
    Edge.find_element_by_css_selector(点赞定位).send_keys(Keys.ENTER)
    sleep(0.5)
    try :
        Edge.find_element_by_css_selector('#v6_pl_content_homefeed > div > div.WB_feed.WB_feed_v3.WB_feed_v4 > \
        div:nth-child('+str(index)+') > div.WB_feed_handle > div > ul > li:nth-child(3) > a').send_keys(Keys.ENTER)
    except Exception as e:
        print(e)
    sleep(2)#点击评论框后等下
    评论框定位 = '#v6_pl_content_homefeed > div > div.WB_feed.WB_feed_v3.WB_feed_v4 >\
    div:nth-child('+index+') > div.WB_feed_repeat.S_bg1 > div > div > div.WB_feed_publish.clearfix > div.WB_publish > div.p_input > textarea'
    try :
        WebDriverWait(Edge,20,0.5).until(EC.presence_of_element_located((By.CSS_SELECTOR, 评论框定位)))
        评论框 = Edge.find_element_by_css_selector('#v6_pl_content_homefeed > div > div.WB_feed.WB_feed_v3.WB_feed_v4 >\
        div:nth-child('+index+') > div.WB_feed_repeat.S_bg1 > div > div > div.WB_feed_publish.clearfix > div.WB_publish > div.p_input > textarea')
        评论框.send_keys(context)
        sleep(1)
        评论按钮 = Edge.find_element_by_css_selector('#v6_pl_content_homefeed > div > div.WB_feed.WB_feed_v3.WB_feed_v4 >\
        div:nth-child('+index+') > div.WB_feed_repeat.S_bg1 > div > div > div.WB_feed_publish.clearfix > div.WB_publish > div.p_opt.clearfix > div.btn.W_fr > a')
        评论按钮.send_keys(Keys.ENTER)
        return True
    except Exception as e:
        print(e)
        return False


# In[ ]:


#获取当前有多少条
def 获取当前有多少条():
    所有 = Edge.find_elements_by_css_selector('#v6_pl_content_homefeed > div > div.WB_feed.WB_feed_v3.WB_feed_v4 > div')
    数量= len(所有)
    return 数量


# In[ ]:


def 切换到我的首页():
    all_win = Edge.window_handles
    for win in all_win:
        Edge.switch_to_window(win)
        sleep(1)
        if Edge.title == "我的首页 微博-随时随地发现新鲜事":
            return True
    return False


# In[ ]:


def 判断是否有弹窗():
    try:
        弹窗 =  Edge.find_element_by_css_selector('#layer_15398692976211 > div.content > div.W_layer_btn.S_bg1 > a')
        弹窗.send_keys(Keys.ENTER)
        return True
    except Exception as e:
        return False


# In[ ]:


def 评论():
    切换到我的首页()
    global result
    
    
    brower1 = browser("https://weibo.com/")
    时间标记 = time.time()
    刷新时间 = random.randint(3*60,30*60)#刷新的延时  3 到 30 分钟
    while(True):
        当前时间 = time.time()
        if(当前时间 - 时间标记 > 刷新时间):
            #刷新
            Edge.refresh()
            状态记录 = 1#重置状态记录
            刷新时间 = random.randint(3*60,30*60)
            时间标记 = 当前时间
        评论 = random.sample(result , 1)[0]#随机读取一条评论
        if 点开并且评论(状态记录,评论):
            sleep(random.randint(15,50))#每一条评论的延时 15 到50 秒
        状态记录+=1
        sleep(2)
        if 判断是否有弹窗():
            randomtime = random.randint(3,15)
            print('发现弹窗,等待 %d 分钟' % randomtime)
            sleep(random.randint(3,15) * 60)
  


# In[ ]:


def 抢热评():
    brower1 = browser("https://weibo.com/")
    print("请等待浏览器加载完成,手动登录完成后,输入OK 并enter确定")  # chrome://version  
    while(input()!="ok"):pass
    切换到我的首页()
    brower1.start()


# In[ ]:


抢热评()

