import json
from flask import Flask, render_template, url_for, request, redirect

app = Flask(__name__)

@app.route("/")
def home():
    with open("data/perks.json", 'r') as f:
        data = json.load(f)
    
    Perks: list = data["Perks"]
    Perks.reverse()

    return render_template("index.html", Perks=Perks)

@app.route("/about")
def about():
    return render_template("about.html")

@app.errorhandler(404)
def page_not_found(e):
    return 'Page Not Found :(', 404


if __name__ == "__main__":
    app.run(debug=True)