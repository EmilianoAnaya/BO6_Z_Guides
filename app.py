import json
from random import choice, sample
from flask import Flask, render_template, url_for, request, redirect


app = Flask(__name__)

CATEGORIES = [
    "perks",
    "ammo_mods",
    "field_upgrades"
]

ERROR_MESSAGES:dict = {
    400 : "Bad Request",
    404 : "Page not Found :(",
    403 : "Forbidden"
}

ERROR_CODE_STATUS: dict = {
    FileNotFoundError : 400,
    UnboundLocalError : 400,
    ValueError : 400
}

def get_sample_items(sub_category: str) -> str:
    items = get_category_data(sub_category)
    item_sample = sample(items,4)
    return item_sample

def get_random_category(category: str) -> str:
    categories = CATEGORIES[:]
    categories.remove(category)
    return choice(categories)

def get_category_data(category:str) -> json:
    with open(f"data/{category}.json",'r') as f:
        data = json.load(f)
    
    return data[f"{category}"]

@app.route("/")
def home():
    Field_Upgrades: list = get_category_data("field_upgrades")
    Field_Upgrades.reverse()

    Ammo_Mods: list = get_category_data("ammo_mods")
    Ammo_Mods.reverse()
    
    Perks: list = get_category_data("perks")
    Perks.reverse()

    return render_template("index.html", Perks=Perks, Ammo_Mods=Ammo_Mods, Field_Upgrades=Field_Upgrades)

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/<category>/<id>")
def augments(category, id):
    category = category
    elements = get_category_data(category)

    for element in elements:
        if(element["id"] == int(id)):
            item = element

    sub_category = get_random_category(category)
    items = get_sample_items(sub_category)
    return render_template("augments.html", item=item, category=category, sub_category=sub_category, items=items)

@app.route("/error/<id_error>")
def error_handler(id_error):
    msg = ERROR_MESSAGES.get(int(id_error))
    if msg == None:
        msg = "Unauthorized" 
    return render_template("error.html", msg=msg)

@app.errorhandler(Exception)
def exception_hanlder(e):
    id_error = ERROR_CODE_STATUS.get(type(e))
    return redirect(url_for('error_handler',id_error=id_error))

@app.errorhandler(404)
def page_not_found(e):
    id_error=404
    return redirect(url_for('error_handler',id_error=id_error))

if __name__ == "__main__":
    app.run(debug=True)