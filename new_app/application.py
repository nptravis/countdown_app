import os
from flask import Flask, render_template, jsonify, flash, url_for, request, session, redirect
from flask_session import Session 
from passlib.apps import custom_app_context as pwd_context
from tempfile import mkdtemp
from datetime import datetime
import time
import sqlite3
from flask_jsglue import JSGlue

from helpers import *

# instantiate flask app object
app = Flask(__name__)
app.config['DEBUG'] = True
JSGlue(app)

# create connection to database
conn = sqlite3.connect('countdown.db')
c = conn.cursor()

# ensure responses aren't cached
if app.config["DEBUG"]:
    @app.after_request
    def after_request(response):
        response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
        response.headers["Expires"] = 0
        response.headers["Pragma"] = "no-cache"
        return response

# configure session to use filesystem (instead of signed cookies)
app.config["SESSION_FILE_DIR"] = mkdtemp()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

@app.context_processor
def override_url_for():
    return dict(url_for=dated_url_for)

def dated_url_for(endpoint, **values):
    if endpoint == 'static':
        filename = values.get('filename', None)
        if filename:
            file_path = os.path.join(app.root_path,
                                     endpoint, filename)
            values['q'] = int(os.stat(file_path).st_mtime)
    return url_for(endpoint, **values)

@app.route("/", methods=["GET", "POST"])
@app.route("/home", methods=["GET", "POST"])
def home():
    if request.method == "GET":
        return render_template("layout.html")
    if request.method == "POST":
        return redirect(url_for("register"))

@app.route("/login", methods=["GET", "POST"])
def login():

    # forget any user_id
    session.clear()

    if request.method == "GET":
        return render_template("login.html")

    if request.method == "POST":

        # ensure email was submitted
        if not request.form.get('email'):
            return render_template("login.html")

        # ensure password was submitted
        elif not request.form.get('password'):
            return render_template("login.html")

        # query database for email
        rows = c.execute("SELECT * FROM user_data WHERE user_email = :email", {'email': request.form.get('email')} ).fetchall()

        # ensure username exists and password matches the hash stored
        if len(rows) != 1:
            error_message = "Sorry, users doesn't exist"
            return render_template('apology.html', error_message=error_message)

        elif not pwd_context.verify(request.form.get("password"), rows[0][2]):
            error_message = "Sorry, password didn't match"
            return render_template('apology.html', error_message=error_message)

        # remember which user has logged in
        session["user_id"] = rows[0][0]
        print(session["user_id"])

        # redirect to index page
        return redirect(url_for("index"))

@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "GET":
        return render_template("register.html")

    if request.method == "POST":
        
        # make sure password confirmation matches
        if request.form.get('password') != request.form.get('confirmation'):
            print("password and confirmation don't match")
            return render_template("login.html")

        pass_hash = pwd_context.encrypt(request.form.get('password'))
        
        with conn:
            c.execute("INSERT INTO user_data (user_name, user_email, hash) VALUES(:user_name, :user_email, :hash)", {'user_name': request.form.get('user_name'), 'user_email': request.form.get("email"), 'hash': pass_hash,})

        # log the user into the session
        session["user_id"] = c.execute("SELECT user_id FROM user_data WHERE user_email=:email", {'email': request.form.get("email"),}).fetchone()

        if not session["user_id"]:
            error_message = "Sorry, problem logging in, please fix your code!"
            return render_template('apology.html', error_message=error_message)

        return redirect(url_for('create'))

@app.route("/create", methods=["GET", "POST"])
@login_required
def create():
    if request.method == "GET":
        return render_template("create.html")
    if request.method == "POST":
        # set inputs as variables, then put in an array
        finish_date = request.form.get("date") + " " + request.form.get("time")
        created_date = datetime.now().strftime("%Y-%m-%d %H:%M")
        genre = request.form.get("genre")
        
        with conn:
            c.execute("INSERT INTO user_apps ( user_id, created_date, finish_date, genre) VALUES (:user_id, :created_date, :finish_date, :genre)", {
                'user_id': session["user_id"],
                'created_date': created_date,
                'finish_date': finish_date,  
                'genre': genre 
                });

        return redirect(url_for('index'))

@app.route("/index")
@login_required
def index():

    # query database for user name
    user_name = c.execute("SELECT user_name FROM user_data WHERE user_id=:user_id", {'user_id': session["user_id"]}).fetchone()[0]
    
    return render_template("index.html", user_name=user_name)


@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("home"))


@app.route("/showApps")
def showApps():

    # query database for users countdowns
    user_apps = c.execute("SELECT * FROM user_apps WHERE user_id=:user_id", {'user_id': session["user_id"]}).fetchall()

    return jsonify(user_apps)






