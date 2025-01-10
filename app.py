import json
import werkzeug
from flask import Flask, render_template, url_for, request, redirect


app = Flask(__name__)

@app.route("/")
def home():
    with open("data/perks.json", 'r') as f:
        data = json.load(f)
    
    Perks: list = data["perks"]
    Perks.reverse()

    return render_template("index.html", Perks=Perks)

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/<category>/<id>")
def augments(category, id):
    with open(f"data/{category}.json",'r') as f:
        data = json.load(f)
    elements = data[f"{category}"]
    for element in elements:
        if(element["id"] == int(id)):
            item = element
    return render_template("augments.html", item=item)


@app.errorhandler(404)
def page_not_found(e):
    return 'Page Not Found :(', 404


if __name__ == "__main__":
    app.run(debug=True)