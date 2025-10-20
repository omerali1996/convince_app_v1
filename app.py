from flask import Flask, jsonify, request
from flask_cors import CORS
from openai import OpenAI
from scenarios import scenarios
import os

app = Flask(__name__)
CORS(app)

API_KEY = os.environ.get("OPENAI_API_KEY")
client = OpenAI(api_key=API_KEY)

@app.route("/api/scenarios", methods=["GET"])
def get_scenarios():
    scenario_list = [v for k, v in scenarios.items()]
    return jsonify(scenario_list)

@app.route("/api/ask", methods=["POST"])
def ask():
    data = request.json
    question = data.get("question")
    scenarioId = data.get("scenarioId")

    if question is None or scenarioId is None:
        return jsonify({"error": "Missing question or scenarioId"}), 400

    scenario = scenarios.get(scenarioId)
    if not scenario:
        return jsonify({"error": "Scenario not found"}), 404

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": scenario["System Prompt"]},
                {"role": "user", "content": question}
            ]
        )
        answer = response.choices[0].message.content
        return jsonify({"answer": answer})
    except Exception as e:
        print("OpenAI API Error:", e)
        return jsonify({"error": "Soru cevaplanırken hata oluştu"}), 500

if __name__ == "__main__":
    app.run(debug=True)
