from flask import render_template, request, jsonify, session, flash, redirect, url_for,make_response, send_from_directory,g
from app import db, csrf
from app.forms import RegistrationForm, LoginForm
from app.models import User
from flask_login import current_user, login_user, logout_user, login_required
from werkzeug.urls import url_parse
from flask import Blueprint
from flask_wtf.csrf import generate_csrf
from app.config import Config
import json, redis, requests

# Define a Blueprint
bp = Blueprint('main', __name__)

@bp.route('/sw.js')
def sw():
    response=make_response(
                     send_from_directory('static/js',path='sw.js'))
    response.headers['Content-Type'] = 'application/javascript'
    return response

@bp.route('/')
@bp.route('/home')
def home():
    # create the admin user if not already created
    user = User.query.filter_by(username=Config.USERNAME).first()
    if user is None:
        user = User(
            username=Config.USERNAME, 
        )
        user.set_password(Config.PASSWORD)
        db.session.add(user)
        db.session.commit()
    return render_template('home.html', title='Home')

@bp.route('/quick-image-viewer')
@login_required  
def quick_image_viewer():
    response = make_response(render_template('quick_image_viewer.html', title='Quick Image Viewer for Developers'))
    csrf_token = generate_csrf()
    response.set_cookie('csrf_token', csrf_token)
    return response

@bp.route('/api/image-attributes', methods=['GET', 'POST'])
@login_required
def image_attributes():
    if request.method == 'GET':
        user = User.query.filter_by(username=session["username"]).first()
        img_attrs = user.attributes
        return jsonify(json.loads(img_attrs)), 200

    elif request.method == 'POST':
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        filtered_data = {k: v for k, v in data.items() if k.strip().lower() != 'dangerouslysetinnerhtml'}
        user = User.query.filter_by(username=session["username"]).first()
        user.set_attributes(json.dumps(filtered_data))
        db.session.commit()
        return jsonify({'message': 'Image attributes updated successfully'}), 200


@bp.route('/storage',methods=['GET'])
@login_required
def storage():
    return render_template('storage.html', title='Storage')

@bp.route('/signup', methods=['GET', 'POST'])
def signup():
    if current_user.is_authenticated:
        return redirect(url_for('main.home'))
    form = RegistrationForm()
    if form.validate_on_submit():
        user = User(
            username=form.username.data, 
        )
        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()
        flash('Congratulations, you are now a registered user!', 'success')
        return redirect(url_for('main.login'))
    return render_template('signup.html', title='Sign Up', form=form)

@bp.route('/login', methods=['GET', 'POST'])
@csrf.exempt
def login():
    if current_user.is_authenticated:
        return redirect(url_for('main.home'))
    form = LoginForm()
    if request.method=="GET":
            return render_template('login.html', title='Login', form=form)
    else:
        user = User.query.filter_by(username=form.username.data).first()
        if user is None or not user.check_password(form.password.data):
            flash('Invalid username or password', 'danger')
            return redirect(url_for('main.login'))
        login_user(user, remember=form.remember_me.data)
        session["username"]=user.username
        next_page = request.cookies.get('next')
        if next_page and url_parse(next_page).netloc == '':
            return redirect(next_page)
        return render_template('home.html', title='Home')

@bp.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('main.home'))

# Not part of the challenge
def recaptcha(response):
    if Config.RECAPTCHA_KEY is None:
        # Players' environment
        return True
    r = requests.post("https://www.google.com/recaptcha/api/siteverify",
                      params={'secret': Config.RECAPTCHA_KEY,
                              'response': response})
    return json.loads(r.text)['success']

def dbRedis():
    if getattr(g, '_redis', None) is None:
        g._redis = redis.Redis(host=Config.REDIS_HOST, port=Config.REDIS_PORT, db=0)
    return g._redis

@bp.route('/report',methods=['GET', 'POST'])
def report():
    error = ok = ""
    if request.method == 'POST':
        url = str(request.form.get('url', ''))
        response = request.form.get('g-recaptcha-response')
        if not 0 < len(url) < 500:
            error = 'URL is empty or too long'
        elif not recaptcha(response):
            error = "reCAPTCHA failed."
        else:
            toVisit = 'http://127.0.0.1:3002/webhook/view/'+url
            dbRedis().rpush('report', toVisit)
            ok = "Admin will check it soon."
    return render_template("report.html", ok=ok, error=error)
