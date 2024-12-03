import base64
import hashlib
import json
import os

import pyotp


# Function to generate a secret key from random bytes
def generate_secret_key():
    return int.from_bytes(os.urandom(128), "big")


# Define a SHA-256 hash function
def generate_hash(data):
    return hashlib.sha256(data.encode()).hexdigest()


# Initialize a secret key
SECRET_KEY = generate_secret_key()

totp = pyotp.TOTP(base64.b32encode(str(SECRET_KEY).encode()))

def create_token(userData):
    """
    Create a secure token for a user with a timestamp and hash-based signature.
    
    Args:
    - userinfo (dict): Dictionary of user data containing an "age" key.
    
    Returns:
    - str: Encoded token with user data and secure hash signature.
    """
    userinfo_with_otp = {**userData, "OTP": int(totp.now()) }
    
    salted_secret = (SECRET_KEY ^ userinfo_with_otp["OTP"]) + userinfo_with_otp["age"] 

    user_data_json = json.dumps(userinfo_with_otp)
    user_data_hex = user_data_json.encode().hex()
    
    signature = generate_hash(f"{user_data_json}:{salted_secret}")
    
    return f"{user_data_hex}.{signature}"


def decode_token(token):
    """
    Decode and validate a token, returning the user info if valid.
    
    Args:
    - token (str): The token string to decode and validate.
    
    Returns:
    - tuple: (userinfo, error_message) where userinfo is the decoded data or None if invalid.
    """
    # Ensure the token is provided
    if not token:
        return None, "Invalid token: please log in"

    try:
        user_data_hex, provided_signature = token.split(".")
        
        user_data_json = bytes.fromhex(user_data_hex).decode()
        userinfo = json.loads(user_data_json)
        salted_secret = (SECRET_KEY ^ userinfo["OTP"]) + userinfo["age"]
        
        expected_signature = generate_hash(f"{user_data_json}:{salted_secret}")
        
        if expected_signature != provided_signature:
            return None, "Invalid token: signature did not match data"
        
        return userinfo, None
    # except (ValueError, KeyError, json.JSONDecodeError):
    except Exception as e:
        print(e)
        # Handle parsing errors and missing fields gracefully
        return None, "Invalid token format"
