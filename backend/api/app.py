from flask import Flask, request, jsonify
from flask_cors import CORS
from betting_logic import process_bets, generate_performance
from social_api import post_to_social

app = Flask(__name__)
CORS(app)

@app.route('/lock-bets', methods=['POST'])
def lock_bets():
    data = request.json
    response = process_bets(data)
    return jsonify(response)

@app.route('/daily-updates', methods=['POST'])
def daily_updates():
    updates = generate_performance()
    return jsonify(updates)

@app.route('/post-to-social', methods=['POST'])
def post_social():
    data = request.json
    response = post_to_social(data)
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
