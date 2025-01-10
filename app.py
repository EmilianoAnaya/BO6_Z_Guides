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

@app.route("/error/<id_error>")
def error_handler(id_error):
    error_messages:dict = {
        400 : "Bad Request",
        404 : "Page not Found :("
    }
    try:
        msg = error_messages.get(int(id_error))
        
    except ValueError:
        msg = "Unauthorized"

    return render_template("error.html", msg=msg)

@app.errorhandler(Exception)
def exception_hanlder(e):
    error_status_codes: dict = {
        FileNotFoundError : 400,
        UnboundLocalError : 400,
    }

    id_error = error_status_codes.get(type(e))

    return redirect(url_for('error_handler',id_error=id_error))

@app.errorhandler(404)
def page_not_found(e):
    id_error=404
    return redirect(url_for('error_handler',id_error=id_error))

if __name__ == "__main__":
    app.run(debug=True)