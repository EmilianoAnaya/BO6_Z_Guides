import json
from random import choice, sample, shuffle
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

def get_category_data(category:str) -> json:
    with open(f"data/{category}.json",'r') as f:
        data = json.load(f)
    
    return data[f"{category}"]

def get_sample_items(sub_category: list, sample_size:int) -> list:
    temporal_items = []
    for category in sub_category:
        items = get_category_data(category)
        for item in items:
            temporal_items.append(item)

    items_sample = sample(temporal_items,sample_size)
    return items_sample

def get_random_category(category: str) -> list[str,str]:
    categories = CATEGORIES[:]
    categories.remove(category)
    return categories

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
    id = int(id)
    category = category
    elements = get_category_data(category)

    for element in elements:
        if(element["id"] == id):
            item = element

    sub_categories = get_random_category(category)
    adittional_items = get_sample_items(sub_categories,4)
    return render_template("augments.html", item=item, category=category, adittional_items=adittional_items)

@app.route("/error/<id_error>")
def error_handler(id_error):
    msg = ERROR_MESSAGES.get(int(id_error))
    if msg == None:
        msg = "Unauthorized" 
    return render_template("error.html", msg=msg)

@app.route("/select_item/<category>/<id>", methods=['POST'])
def item_selector(category,id):
    id = int(id)
    category = category
    elements = get_category_data(category)

    new_index = id + int(request.form["value"])

    if new_index > len(elements):
        new_index = 1
    elif new_index < 1:
        new_index = len(elements)

    return redirect(url_for('augments', category=category, id=new_index))

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