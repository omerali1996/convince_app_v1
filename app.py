import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from scenarios import scenarios  # senin verdiğin dict formatındaki nesne

app = Flask(__name__)
CORS(app)  # tüm originlere izin (deploy ortamına göre daraltılabilir)

API_KEY = os.environ.get("OPENAI_API_KEY")
if not API_KEY:
    raise ValueError("OPENAI_API_KEY environment variable is not set!")

# OpenAI client
client = OpenAI(api_key=API_KEY)

# --- Helper: güvenli OpenAI cevap okuma ---
def _extract_openai_answer(response_obj):
    """
    OpenAI SDK dönen objesinden güvenli şekilde cevap çıkarmak için.
    SDK objesi farklı şekillerde gelebileceği için to_dict() ile işleriz.
    """
    try:
        d = response_obj.to_dict()
        # choices -> ilk choice -> message -> content
        return d["choices"][0]["message"]["content"]
    except Exception:
        # Eğer beklenen yoldan erişilemiyorsa fallback
        try:
            return response_obj.choices[0].message.content
        except Exception:
            return None

# --- Endpoints ---

# 1) Tüm senaryoları döndür (kullanıcı arayüzü için)
# Senaryoların key'leri int, jsonify dict'i JSON'a çevirirken key'leri string'e çevirir.
@app.route("/api/scenarios", methods=["GET"])
def get_scenarios():
    # Özet bilgi döndürmek istersen burada sadece ID, Senaryo Adı ve Slug döndür
    summarized = {
        k: {
            "ID": v.get("ID"),
            "Senaryo Adı": v.get("Senaryo Adı"),
            "Slug": v.get("Slug")
        } for k, v in scenarios.items()
    }
    return jsonify(summarized), 200

# 2) Tek bir senaryo detayını döndür (frontend seçince tam hikaye alınır)
@app.route("/api/scenario/<int:scenario_id>", methods=["GET"])
def get_scenario(scenario_id):
    scenario = scenarios.get(scenario_id)
    if not scenario:
        return jsonify({"error": "Scenario not found"}), 404
    return jsonify(scenario), 200

# 3) Kullanıcının mesajını al ve ilgili senaryonun system prompt'u ile OpenAI'ı çağır
# Beklenen POST body: { "question": "...", "scenarioId": 1 }
@app.route("/api/ask", methods=["POST"])
def ask():
    data = request.get_json(force=True) or {}
    question = data.get("question")
    scenario_id = data.get("scenarioId")

    if not question or scenario_id is None:
        return jsonify({"error": "Missing question or scenarioId"}), 400

    # scenario_id int'e dönüştürmeyi güvenli yap
    try:
        scenario_id = int(scenario_id)
    except Exception:
        return jsonify({"error": "scenarioId must be integer"}), 400

    scenario = scenarios.get(scenario_id)
    if scenario is None:
        return jsonify({"error": "Invalid scenarioId"}), 400

    system_prompt = scenario.get("System Prompt") or scenario.get("System Prompt".lower()) or ""

    try:
        # OpenAI çağrısı
        resp = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": question}
            ],
            max_tokens=600
        )

        answer = _extract_openai_answer(resp)
        if answer is None:
            return jsonify({"error": "Could not parse OpenAI response"}), 500

        return jsonify({"answer": answer}), 200

    except Exception as e:
        # Hata logunu konsola bas (deploy ortamında logging tercih et)
        print("OpenAI API Error:", str(e))
        return jsonify({"error": "Soru cevaplanırken hata oluştu", "detail": str(e)}), 500


if __name__ == "__main__":
    # PORT environment variable varsa kullan, yoksa 5000
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
