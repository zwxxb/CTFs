import os

from flask import Flask, request

app = Flask(__name__)



@app.route('/flag', methods = ['GET','POST'])
def get_flag():
    file = request.form.get("file", None)
    if file and file == "flag":
        return os.getenv("DYN_FLAG", "BHFlagY{test}")
    return "no"


app.run(port=5002)