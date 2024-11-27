import requests

url = "http://host3.dreamhack.games:16660/"

data = {
    'leg' : 'flag'
}

res = requests.post(url+'SHOP', data=data)
print(res.text)