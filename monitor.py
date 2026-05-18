from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/slots")
def slots():

    sample_data = {
        "centres": [
            {"name": "Loughton"},
            {"name": "Goodmayes"}
        ]
    }

    return jsonify(sample_data)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
