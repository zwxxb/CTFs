import os
import re
from functools import wraps

import osquery
from flask import Flask, request, render_template, jsonify

import Safe_Auth

app = Flask(__name__)


def require_username(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.cookies.get("token")
        if not token:
            return jsonify({"Error": "Missing token"}), 401
        
        userdata, error = Safe_Auth.decode_token(token)
        
        if error or not userdata or "username" not in userdata:
            return jsonify({"Error": "Unauthorized: No username found"}), 401
        

        return f(*args, **kwargs)
    return decorated_function

# Middleware to check if the username is 'admin'
def require_admin(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.cookies.get("token")
        if not token:
            return jsonify({"Error": "Missing token"}), 401
        
        userdata, error = Safe_Auth.decode_token(token)
        
        if error or not userdata or userdata.get("username") != "admin":
            return jsonify({"Error": "Unauthorized: Admin access required"}), 403
        
        return f(*args, **kwargs)
    return decorated_function



@app.get('/')
def index():
    return render_template("index.html")


@app.post('/register')
def register():
    data = request.json
    username = data.get("username", None)
    age = data.get("age", None)

    if not username or not age:
        return jsonify({"Error":"Please Fill all fields"}), 400
    if not 20 <= int(age) <= 40:
        return jsonify({"Error":"Sorry, No childs / boomers"}), 400
    elif "admin" in username:
        return jsonify({"Error":"Noooooooooooo"}), 400
    
    username = re.sub("[^A-Za-z0-9]", "", username)[:30]

    token = Safe_Auth.create_token({"username": username, "age": age})
    # Planning to move to osquery
    os.makedirs(f"users/{username}", exist_ok=True)
    with open(f"users/{username}/{token}", "w") as file:
        file.write("Exist")

    return jsonify({"Success": True, "Token": token}), 200


@app.post("/check_token")
def check_token():
    data = request.json

    if not "token" in data:
        return jsonify({"Error":"Not Found"})
    
    try:
        token = data['token']
        userdata  = Safe_Auth.decode_token(token)
        if userdata[0] == None:
            return jsonify({"Error":"Bad Token"}), 400
        userdata = {"username": userdata[0]['username'], "age": userdata[0]['age']}
        return jsonify({"Success": {"UserData": userdata}}), 200
    except:
        return jsonify({"Error":"Bad Token"}), 400
    

@app.get("/welcome")
@require_username
def welcome():
    return render_template("welcome.html")
    
@app.get('/dashboard')
@require_admin
def dashboard():
    return "Welcome, Admin"


@app.post('/query')
@require_admin
def query_endpoint():
    username = request.json.get("username", None)
    token = request.json.get("token", None)

    instance = osquery.SpawnInstance()
    instance.open()
    response = instance.client.query(
        f"SELECT * FROM file WHERE directory = 'users/{username}' AND filename = '{token}'"
    )

    if response.status.message == "OK":
        count = len(response.response)
        if count > 0:
            return jsonify({"Success":"Ok"})
    return jsonify(
        {"Error":":("}
    )
    


app.run(host = '0.0.0.0', port = 5000)
