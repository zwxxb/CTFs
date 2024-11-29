from functools import wraps

from flask import Flask, render_template, request, redirect, url_for, flash, session
from flask.templating import render_template_string
from werkzeug.security import generate_password_hash, check_password_hash

from database import mysql, call_procedure, query_db
from utils import get_transactions, isDebugMode

app = Flask(__name__)
app.config.from_object('config.Config')

mysql.init_app(app)

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            flash('Please log in to access this page.', 'warning')
            return redirect(url_for('login', next=request.url))
        return f(*args, **kwargs)
    return decorated_function

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session or 'user_role' not in session:
            flash('Please log in to access this page.', 'warning')
            return redirect(url_for('login', next=request.url))
        if session['user_role'] != 'admin':
            flash('You do not have permission to access this page.', 'danger')
            return redirect(url_for('index'))
        return f(*args, **kwargs)
    return decorated_function

@app.route('/')
@login_required
def index():
    return render_template('index.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        role = 'user'

        try:
            call_procedure('sp_register', (username, email, generate_password_hash(password), role))
            return redirect(url_for('login'))
        except:
            flash('Registration failed. Please try again.', 'danger')

    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        user = query_db('SELECT * from user where username = %s', (username,), one=True)

        if user and check_password_hash(user['password_hash'], password):
            session['user_id'] = user['id']
            session['user_role'] = user['role']
            flash('Logged in successfully.', 'success')
            next_page = request.args.get('next')
            return redirect(next_page or url_for('index'))
        else:
            flash('Invalid username or password.', 'danger')

    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('user_id', None)
    session.pop('user_role', None)
    flash('logged out successfully.', 'success')
    return redirect(url_for('index'))

@app.route('/flights')
@login_required
def flights():
    flights = query_db("SELECT * from flight")
    return render_template('flights.html', flights=flights)

@app.route('/book/<int:flight_id>', methods=['GET', 'POST'])
@login_required
def book_flight(flight_id):
    if request.method == 'POST':
        user_id = session['user_id']
        try:
            result = call_procedure('sp_book_flight', (user_id, flight_id), one=True)
            flash('Flight booked successfully.', 'success')
            return redirect(url_for('my_bookings'))
        except:
            flash('Booking failed. Please try again.', 'danger')

    flight = query_db("SELECT * FROM flight WHERE id = %s", (flight_id,), one=True)

    return render_template('book_flight.html', flight=flight)

@app.route('/my_bookings')
@login_required
def my_bookings():
    user_id = session['user_id']
    bookings= query_db("SELECT b.id, f.flight_number, f.origin, f.destination, f.departure_time, b.booking_date, b.payment_status, f.price FROM booking b JOIN flight f ON b.flight_id = f.id WHERE b.user_id = %s", (user_id,))
    return render_template('my_bookings.html', bookings=bookings)

@app.route('/cancel_booking/<int:booking_id>', methods=['POST'])
@login_required
def cancel_booking(booking_id):
    user_id = session['user_id']

    try:
        call_procedure('sp_cancel_booking', (user_id, booking_id), one=True)
        flash('Booking cancelled successfully.', 'success')
    except:
        flash('Cancellation failed. Please try again.', 'danger')

    return redirect(url_for('my_bookings'))

@app.route('/payment/<int:booking_id>', methods=['GET', 'POST'])
@login_required
def payment(booking_id):
    if request.method == 'POST':
        user_id = session['user_id']
        try:
            call_procedure('sp_process_payment', (user_id, booking_id), one=True)
            call_procedure('sp_add_transaction',(user_id,booking_id),one=True)
            session['has_booked'] = True
            flash('Payment processed successfully.', 'success')
            return redirect(url_for('my_bookings'))
        except Exception as e:
            flash('Payment failed. Please try again.', 'danger')

    booking = query_db("SELECT * FROM booking WHERE id = %s", (booking_id,), one=True)

    return render_template('payment.html', booking=booking)


@app.route("/transactions", methods=['GET'])
@login_required
def transactions():
    user_id = session.get('user_id')
    bookings = query_db("SELECT * FROM booking WHERE user_id = %s AND payment_status = TRUE", (user_id,))

    has_booked = bool(bookings)
    user = query_db("SELECT * FROM user WHERE id = %s", (user_id,), one=True)
    

    if user is None:
        session.clear() 
        return redirect(url_for("login"))
    username=user['username']

    if not has_booked:
        flash('No transactions found.', 'warning')
        return redirect(url_for("my_bookings"))

    transactions = query_db("SELECT * FROM transactions WHERE user_id = %s", (user_id,))
    if not transactions:
        if bookings:
            err= f"Error in the database, please unbook and book again {username}....".format(username=username, isDebugMode=isDebugMode)
            return err,500
    rendered_transactions = get_transactions(transactions)
    return render_template_string(rendered_transactions)

@app.route("/dashboard", methods=['GET'])
@admin_required
def dashboard():
    return open('/flag', 'r').read()