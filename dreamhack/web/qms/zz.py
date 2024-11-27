import base64 

keys_raw = b'W3siX2lkIjoiNjc0MGFjMTAwMDNhYmJmYzZlOTY2MTQzIiwibmFtZSI6IkRhdDFQaGl0IiwiX192IjowLCJzZWNyZXQiOiI0MjYxODVkN2IwYzQ1N2FiNjNlNTQ2MTg5OTZjMTdiMGYwNDUxM2U5ZDg1NWI5Y2YwYThhMDBmMjkwNTA0MDdjIn0seyJfaWQiOiI2NzQwYWMxMDAwM2FiYmZjNmU5NjYxNDUiLCJuYW1lIjoiRGF0MlBoaXQiLCJfX3YiOjAsInNlY3JldCI6IjI4YjIyMjlmOWRkNWQyMDM5Yjc3NzMxYjQwNWJlYzUwNjNiNGU1NzEzNDJkM2UyNGYyOWNhNzM2MjdhOGJjOGYifSx7Il9pZCI6IjY3NDBhYzEwMDAzYWJiZmM2ZTk2NjE0NyIsIm5hbWUiOiJEYXQzUGhpdCIsIl9fdiI6MCwic2VjcmV0IjoiOWQ2NzU5Mjg2ZmZmMWYyOGFkM2VlOGZjYjllYzQwYzQ3NjNhYzQ4OTYxZmQ3N2JiNTZhZTIzYjZmZDY5NDYzMSJ9LHsiX2lkIjoiNjc0MGFjMTAwMDNhYmJmYzZlOTY2MTQ5IiwibmFtZSI6IkRhdDRQaGl0IiwiX192IjowLCJzZWNyZXQiOiIwY2EwZDQ3NWY0YTc5M2IxMjVhOGUxMTRkN2NiYjhlYWNjNjQ2OGFkNTU4MDE2YTYzN2RkNDY3MTA3NDBjZWFjIn0seyJfaWQiOiI2NzQwYWMxMDAwM2FiYmZjNmU5NjYxNGIiLCJuYW1lIjoiRGF0NVBoaXQiLCJfX3YiOjAsInNlY3JldCI6ImQzMTZmM2MxYjdmNTYwNjhhNDk1MWVlZGM2ZmI3OGJlOTU5MzhmMGJiOWU2MWJjZGU1NDkzNGYzYmFjNzRiOTEifSx7Il9pZCI6IjY3NDBhYzEwMDAzYWJiZmM2ZTk2NjE0ZCIsIm5hbWUiOiJEYXQ2UGhpdCIsIl9fdiI6MCwic2VjcmV0IjoiZTEyYjllNGY0MjUzMTFlNmEyNzcwNWQ0Nzc1YmY5MjFmZjg0ZjQ2MjA1M2M2OWMzNTM0ZWVkMjMxZjM0OTFlOSJ9LHsiX2lkIjoiNjc0MGFjMTAwMDNhYmJmYzZlOTY2MTRmIiwibmFtZSI6IkRhdDdQaGl0IiwiX192IjowLCJzZWNyZXQiOiI5MTJjM2NkMDMxYTYwYmQ1YmI3ZTk3MGQwMzdlYzQ4OTA5OGU1NWNmZDU5NGUxZjRhYjRkM2FlM2I5NDNjZjJhIn1d'

flag_input = 'Dyb9_sJ-IDpaaHhTjQ'

def decode_keys(keys_raw):
    """Decode and extract secrets from the base64 encoded keys"""
    import json
    keys_str = base64.urlsafe_b64decode(keys_raw).decode('utf-8')
    keys_json = json.loads(keys_str)
    return [bytes.fromhex(key['secret']) for key in keys_json]

def decrypt_flag(flag, keys):
    """Try to decrypt the flag by XORing with different keys"""
    flag_bytes = base64.urlsafe_b64decode(flag)
    
    for key in keys:
        decrypted = bytes(f ^ k for f, k in zip(flag_bytes, key * ((len(flag_bytes) // len(key)) + 1)))
        try:
            decoded = decrypted.decode('utf-8')
            if decoded.isprintable():
                return decoded
        except UnicodeDecodeError:
            continue
    
    return "Decryption failed"


keys = decode_keys(keys_raw)

flag = decrypt_flag(flag_input, keys)
print("Decrypted Flag:", flag)