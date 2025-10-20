import React, { useState, useEffect } from "react";
import { fetchScenarios, fetchScenario, askQuestion } from "./api";

function App() {
  const [scenarios, setScenarios] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [scenarioDetail, setScenarioDetail] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadScenarios() {
      try {
        const data = await fetchScenarios();
        setScenarios(Object.values(data)); // key-value dict olduğundan values alıyoruz
      } catch (e) {
        setError(e.message);
      }
    }
    loadScenarios();
  }, []);

  useEffect(() => {
    if (selectedId) {
      async function loadScenarioDetail() {
        try {
          const detail = await fetchScenario(selectedId);
          setScenarioDetail(detail);
          setAnswer("");
          setQuestion("");
        } catch (e) {
          setError(e.message);
        }
      }
      loadScenarioDetail();
    }
  }, [selectedId]);

  const handleAsk = async () => {
    if (!question) return;
    setLoading(true);
    setError("");
    try {
      const res = await askQuestion(selectedId, question);
      setAnswer(res);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1>İkna Oyunu</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}

      {/* Senaryo seçim */}
      <div>
        <h2>Senaryolar</h2>
        {scenarios.map((s) => (
          <button
            key={s.ID}
            onClick={() => setSelectedId(s.ID)}
            style={{
              margin: "5px",
              padding: "10px 15px",
              backgroundColor: selectedId === s.ID ? "#4caf50" : "#2196f3",
              color: "white",
              border: "none",
              borderRadius: 5,
              cursor: "pointer",
            }}
          >
            {s["Senaryo Adı"]}
          </button>
        ))}
      </div>

      {/* Senaryo detay ve soru */}
      {scenarioDetail && (
        <div style={{ marginTop: 30 }}>
          <h2>{scenarioDetail["Senaryo Adı"]}</h2>
          <p>{scenarioDetail.Hikaye}</p>

          <div style={{ marginTop: 20 }}>
            <input
              type="text"
              placeholder="Sorunu yaz..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              style={{ width: "70%", padding: 8, fontSize: 16 }}
            />
            <button
              onClick={handleAsk}
              style={{
                marginLeft: 10,
                padding: "8px 16px",
                fontSize: 16,
                cursor: "pointer",
              }}
              disabled={loading}
            >
              {loading ? "Bekleyin..." : "Sor"}
            </button>
          </div>

          {answer && (
            <div
              style={{
                marginTop: 20,
                padding: 15,
                backgroundColor: "#e8f5e9",
                borderRadius: 5,
              }}
            >
              <strong>Cevap:</strong>
              <p>{answer}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
