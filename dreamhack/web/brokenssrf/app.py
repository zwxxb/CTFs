from flask import Flask, request, jsonify
import re
import ipaddress
import socket
import time
import hashlib
import requests
app = Flask(__name__)

flag = "d23b51c4e4d5f7c4e842476fea4be33ba8de9607dfe727c5024c66f78052b70a"

def sha256_hash(text):
    text_bytes = text.encode('utf-8')
    sha256 = hashlib.sha256()
    sha256.update(text_bytes)
    hash_hex = sha256.hexdigest()
    return hash_hex

isSafe = False
def check_ssrf(url,checked):
    global isSafe
    # if "@" in url or "#" in url:
    #     isSafe = False
    #     return "Fail"
    if checked > 3:
        print("3번을 초과하여 redirection되는 URL은 금지됩니다.")
        isSafe = False
        return "Fail"
    protocol = re.match(r'^[^:]+', url)
    if protocol is None:
        isSafe = False
        print("프로토콜이 감지되지 않았습니다.")
        return "Fail"
    print("Protocol :",protocol.group())
    if protocol.group() == "http" or protocol.group() == "https":
        host = re.search(r'(?<=//)[^/]+', url)
        print(host.group())
        if host is None:
            isSafe = False
            print("호스트가 감지되지 않았습니다.")
            return "Fail"
        host = host.group()
        if ":" in host:
            host = host.split(":")
            host = host[0]
        print("Host :",host)
        try:
            ip_address = socket.gethostbyname(host)
        except:
            print("호스트가 올바르지 않습니다.")
            isSafe = False
            return "Fail"
        for _ in range(60):
            print("IP를 검증 중입니다..", _)
            ip_address = socket.gethostbyname(host)
            if ipaddress.ip_address(ip_address).is_private:
                print("내부망 IP가 감지되었습니다. ")
                isSafe = False
                return "Fail"
            time.sleep(1) # 1초 대기
        print("리다이렉션을 확인합니다 : ",url)
        try:
            response = requests.get(url,allow_redirects=False)
            if 300 <= response.status_code and response.status_code <= 309:
                redirect_url = response.headers['location']
                print("리다이렉션이 감지되었습니다.",redirect_url)
                if len(redirect_url) >= 120:
                    isSafe = False
                    return "fail"
                check_ssrf(redirect_url,checked + 1)
        except:
            print("URL 요청에 실패했습니다.")
            isSafe = False
            return "Fail"
        if isSafe == True:
            print("URL 등록에 성공했습니다.")
            return "SUCCESS"
        else:
            return "Fail"

    else:
        print("URL이 HTTP / HTTPS로 시작하는 지 확인하세요.")
        isSafe = False
        return "Fail"

@app.route('/check-url', methods=['POST'])
def check_url():
    global isSafe
    data = request.get_json()
    if 'url' not in data:
        return jsonify({'error': 'No URL provided'}), 400

    url = data['url']
    host = re.search(r'(?<=//)[^/]+', url)
    print(host.group())
    if host is None:
        print("호스트가 감지되지 않았습니다.")
        return "Fail"
    host = host.group()
    if ":" in host:
        host = host.split(":")
        host = host[0]
    if host != "www.google.com":
        isSafe = False
        return "Host는 반드시 www.google.com이어야 합니다."
    isSafe = True
    result = check_ssrf(url,1)
    if result != "SUCCESS" or isSafe != True:
        return "SSRF를 일으킬 수 있는 URL입니다."
    try:
        response = requests.get(url)
        status_code = response.status_code
        return jsonify({'url': url, 'status_code': status_code})
    except requests.exceptions.RequestException as e:
        return jsonify({'error': 'Request Failed.'}), 500
    
@app.route('/admin',methods=['GET'])
def admin():
    global flag
    user_ip = request.remote_addr
    if user_ip != "127.0.0.1":
        return "only localhost."
    if request.args.get('nickname'):
        nickname = request.args.get('nickname')
        flag = sha256_hash(nickname)
        return "success."

@app.route("/flag",methods=['POST'])
def clear():
    global flag
    if flag == sha256_hash(request.args.get('nickname')):
        return "DH{REDACTED}"
    else:
        return "you can't bypass SSRF-FILTER zzlol 😛"

if __name__ == '__main__':
    print("Hash : ",sha256_hash("당신의 창의적인 공격 아이디어를 보여주세요!"))
    app.run(debug=True,host='0.0.0.0',port=80)
