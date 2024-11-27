from pwn import * 

p = process('./sane-env')
elf = ELF('./sane-env')

#gdb.debug()



p.interactive()