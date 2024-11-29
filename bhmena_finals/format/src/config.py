import os
from utils import generate_secret

class Config(object):
    SECRET_KEY = os.getenv("SECRET_KEY")
    MYSQL_DB = os.environ.get("MYSQL_DB", "flights")
    MYSQL_USER = os.environ.get("MYSQL_USER", 'user')
    MYSQL_PASSWORD = os.environ.get("MYSQL_PASSWORD", "password")
    MYSQL_HOST = os.environ.get("MYSQL_HOST", 'localhost')