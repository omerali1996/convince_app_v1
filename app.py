import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from scenarios import scenarios

app = Flask(__name__)
CORS(app)

API_KEY = os.environ.get("OPENAI_API_KEY")
if not API_KEY:
    raise ValueError("OPENAI_API_KEY environment variable is not set!")

client = OpenAI(api_key=API_KEY)

# Senaryoları listele
@app.route("/api/scenarios", methods=["GET"])
def get_scenarios():
    return jsonify([{"ad": s["ad"], "hikaye": s["hikaye"]} for s in scenarios])

# Kullanıcının sorusuna cevap ver
@app.route("/api/ask", methods=["POST"])
def ask():
    data = request.json
    question = data.get("question")
    scenario_index = data.get("scenarioIndex")

    if question is None or scenario_index is None:
        return jsonify({"error": "Missing question or scenarioIndex"}), 400
    if scenario_index >= len(scenarios):
        return jsonify({"error": "Invalid scenario index"}), 400

    scenario = scenarios[scenario_index]
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": scenario["system_prompt"]},
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
