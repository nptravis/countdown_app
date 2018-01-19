import os
from flask import Flask, render_template, flash, url_for, request, session, redirect
# from flask_session import Session 
# from passlib.apps import custom_app_context as pwd_context
# from tempfile import mkdtemp
# import datetime
import sqlite3

# from helpers import *

# instantiate flask app object
app = Flask(__name__)

# ensure responses aren't cached
if app.config["DEBUG"]:
    @app.after_request
    def after_request(response):
        response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
        response.headers["Expires"] = 0
        response.headers["Pragma"] = "no-cache"
        return response

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

@app.route("/")
@app.route("/index")
def index():
	return render_template("index.html")


@app.route("/register", methods=["GET", "POST"])
def register():
    """Register user."""
    # session.clear()

    if request.method == "GET":
    	return render_template("register.html")

    if request.method == "POST":
    	return render_template("register.html")



