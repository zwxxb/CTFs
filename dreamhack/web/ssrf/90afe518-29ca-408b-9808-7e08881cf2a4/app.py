from flask import Flask, request, jsonify
import re
import ipaddress
import socket
import time
import hashlib
import requests

app = Flask(__name__)

# Initial flag (presumably for a challenge or security purpose)
flag = "d23b51c4e4d5f7c4e842476fea4be33ba8de9607dfe727c5024c66f78052b70a"

def sha256_hash(text):
    """
    Generates a SHA-256 hash of the provided text.
    """
    text_bytes = text.encode('utf-8')
    sha256 = hashlib.sha256()
    sha256.update(text_bytes)
    hash_hex = sha256.hexdigest()
    return hash_hex

# Global variable to track safety status
isSafe = False

def check_ssrf(url, checked):
    """
    Checks the provided URL for Server-Side Request Forgery (SSRF) vulnerabilities.
    
    Parameters:
    - url (str): The URL to be checked.
    - checked (int): The current depth of redirection checks.
    
    Returns:
    - str: "SUCCESS" if the URL passes all safety checks, otherwise "Fail".
    """
    global isSafe
    if "@" in url or "#" in url:
        isSafe = False
        return "Fail"
    
    if checked > 3:
        print("Redirections exceeding 3 times are prohibited.")
        isSafe = False
        return "Fail"
    
    # Extract protocol from URL
    protocol = re.match(r'^[^:]+', url)
    if protocol is None:
        isSafe = False
        print("Protocol not detected.")
        return "Fail"
    print("Protocol:", protocol.group())
    
    if protocol.group() in ["http", "https"]:
        # Extract host from URL
        host = re.search(r'(?<=//)[^/]+', url)
        if host is None:
            isSafe = False
            print("Host not detected.")
            return "Fail"
        host = host.group()
        print("Host:", host)
        
        try:
            ip_address = socket.gethostbyname(host)
        except:
            print("Host is invalid.")
            isSafe = False
            return "Fail"
        
        # Prevent DNS Rebinding attacks by verifying IP periodically for 60 seconds
        for _ in range(60):
            print("Verifying IP...", _)
            ip_address = socket.gethostbyname(host)
            if ipaddress.ip_address(ip_address).is_private:
                print("Internal network IP detected.")
                isSafe = False
                return "Fail"
            time.sleep(1)  # Wait for 1 second
        
        print("Checking for redirections:", url)
        try:
            # Send a GET request without following redirects
            response = requests.get(url, allow_redirects=False)
            if 300 <= response.status_code <= 309:
                redirect_url = response.headers['location']
                print("Redirection detected:", redirect_url)
                if len(redirect_url) >= 120:
                    isSafe = False
                    return "Fail"
                # Recursively check the redirected URL
                check_ssrf(redirect_url, checked + 1)
        except:
            print("Failed to request the URL.")
            isSafe = False
            return "Fail"
        
        if isSafe:
            print("URL registration succeeded.")
            return "SUCCESS"
        else:
            return "Fail"
    
    else:
        print("Ensure the URL starts with HTTP or HTTPS.")
        isSafe = False
        return "Fail"

@app.route('/check-url', methods=['POST'])
def check_url():
    """
    Endpoint to check the safety of a provided URL.
    
    Expects a JSON payload with a 'url' field.
    """
    global isSafe
    data = request.get_json()
    
    if 'url' not in data:
        return jsonify({'error': 'No URL provided'}), 400

    url = data['url']
    
    # Extract host from URL
    host = re.search(r'(?<=//)[^/]+', url)
    if host is None:
        print("Host not detected.")
        return "Fail"
    host = host.group()
    
    # Ensure the host is exactly 'www.google.com'
    if host != "www.google.com":
        isSafe = False
        return "Host must be www.google.com."
    
    isSafe = True
    result = check_ssrf(url, 1)
    
    if result != "SUCCESS" or not isSafe:
        return "URL may cause SSRF."
    
    try:
        response = requests.get(url)
        status_code = response.status_code
        return jsonify({'url': url, 'status_code': status_code})
    except requests.exceptions.RequestException as e:
        return jsonify({'error': 'Request Failed.'}), 500

@app.route('/admin', methods=['GET'])
def admin():
    """
    Admin endpoint to set the flag based on a provided nickname.
    
    Accessible only from localhost (127.0.0.1).
    
    Parameters:
    - nickname (str): The nickname to be hashed and set as the flag.
    """
    global flag
    user_ip = request.remote_addr
    
    if user_ip != "127.0.0.1":
        return "Access restricted to localhost only."
    
    if request.args.get('nickname'):
        nickname = request.args.get('nickname')
        flag = sha256_hash(nickname)
        return "Flag updated successfully."
    
    # If 'nickname' parameter is not provided
    return "No nickname provided."

@app.route("/flag", methods=['POST'])
def clear():
    """
    Endpoint to retrieve the flag by providing a nickname that hashes to the current flag.
    
    Parameters:
    - nickname (str): The nickname to hash and compare against the current flag.
    """
    global flag
    nickname = request.args.get('nickname')
    
    if nickname is None:
        return "Nickname not provided.", 400
    
    if flag == sha256_hash(nickname):
        return "DH{REDACTED}"
    else:
        return "You can't bypass SSRF-FILTER zzlol 😛"

if __name__ == '__main__':
    # Print the hash of a specific Korean phrase
    print("Hash:", sha256_hash("당신의 창의적인 공격 아이디어를 보여주세요!"))
    app.run(debug=False, host='0.0.0.0', port=80)