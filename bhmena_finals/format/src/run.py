#! /usr/local/bin/python3

from app import app

app.run(host='0.0.0.0', port=5000, debug=False, use_evalex=False)