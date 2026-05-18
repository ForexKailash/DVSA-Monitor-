from flask import Flask, jsonify
import os

app = Flask(__name__)

@app.route("/")
def home():
    return "DVSA Monitor Running"

@app.route("/slots")
def slots():
    return jsonify({
        "centres": [
            {"name": "Loughton"},
            {"name": "Goodmayes"}
        ]
    })

port = int(os.environ.get("PORT", 8080))

app.run(host="0.0.0.0", port=port)
