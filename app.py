from flask import Flask, render_template, url_for, request, redirect

app = Flask(__name__)

@app.route("/")
def get_home():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True)