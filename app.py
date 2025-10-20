import os
from flask import Flask, request, jsonify
from openai import OpenAI
from flask_cors import CORS
from scenarios import scenarios

app = Flask(__name__)
CORS(app)

# Environment variable'dan API key al
API_KEY = os.environ.get("OPENAI_API_KEY")
if not API_KEY:
    raise ValueError("OPENAI_API_KEY environment variable is not set!")

client = OpenAI(api_key=API_KEY)


# ---------------------------
# 1️⃣ Tüm senaryoları frontend'e döner
# ---------------------------
@app.route("/api/scenarios", methods=["GET"])
def get_scenarios():
    scenario_list = []
    for sid, scenario in scenarios.items():
        scenario_list.append({
            "id": sid,
            "name": scenario["Senaryo Adı"],
            "story": scenario["Hikaye"],
        })
    return jsonify(scenario_list)


# ---------------------------
# 2️⃣ Kullanıcının mesajını alır ve ChatGPT'den cevap döner
# ---------------------------
@app.route("/api/ask", methods=["POST"])
def ask_scenario():
    data = request.get_json()

    user_input = data.get("message")
    scenario_id = data.get("scenario_id")

    if not user_input or scenario_id not in scenarios:
        return jsonify({"error": "Eksik ya da geçersiz veri gönderildi"}), 400

    scenario = scenarios[scenario_id]
    system_prompt = scenario["System Prompt"]

    try:
        chat_completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_input},
            ],
        )

        ai_reply = chat_completion.choices[0].message.content
        return jsonify({
            "reply": ai_reply,
            "character": scenario["Senaryo Adı"]
        })

    except Exception as e:
        print(f"OpenAI API Error: {e}")
        return jsonify({"error": "OpenAI API isteği başarısız oldu"}), 500


# ---------------------------
# 3️⃣ Ana uygulama
# ---------------------------
if __name__ == "__main__":
    app.run(debug=True)
