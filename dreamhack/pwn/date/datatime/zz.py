from pwn import *

# Set up the connection to the challenge
conn = process('./datestring')  # Replace with remote('host', port) for actual CTF server

def send_input(prompt, value):
    conn.recvuntil(prompt)
    conn.sendline(str(value))

# We need to satisfy these conditions:
# v13 == 11 (December, as months are 0-indexed)
# v12 == 25 (25th day)
# !v15 (v15 should be 0, which represents Sunday)
# v17 should be non-zero (this might be set by some side effect we're not seeing)

# Let's try a range of years to find one that works
for year in range(1900, 2100):
    conn = process('./datestring')  # Start a new process for each attempt
    
    send_input("Year: ", year)
    send_input("Month: ", 12)  # December
    send_input("Day: ", 25)    # 25th
    send_input("Hour: ", 0)
    send_input("Minute: ", 0)
    send_input("Second: ", 0)

    # Receive the output
    output = conn.recvall().decode()
    print(f"Trying year {year}")
    print(output)

    if "A Present for Admin!" in output:
        print(f"Success! The correct year is {year}")
        break

    conn.close()
else:
    print("Failed to find a working year. The issue might be with v17.")

# If we found a working year, we can try to get the shell
if "A Present for Admin!" in output:
    conn.interactive()