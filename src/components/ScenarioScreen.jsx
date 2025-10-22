import React, { useEffect, useState } from "react";
import api from "../api";

export default function ScenariosScreen({ onSelect }) {
  const [scenarios, setScenarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScenarios = async () => {
      try {
        const res = await api.get("/api/scenarios");
        setScenarios(res.data || []);
      } catch (err) {
        console.error(err);
        setError("Senaryolar yüklenemedi.");
      } finally {
        setLoading(false);
      }
    };
    fetchScenarios();
  }, []);

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>{error}</div>;
  if (!scenarios.length) return <div>Senaryo bulunamadı.</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Senaryolar</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {scenarios.map((s) => (
          <button
            key={s.id}
            style={{
              padding: "10px 15px",
              fontSize: 16,
              cursor: "pointer",
              backgroundColor: "#0a74da",
              color: "white",
              border: "none",
              borderRadius: 6,
            }}
            onClick={() => onSelect(s)}
          >
            {s.name}
          </button>
        ))}
      </div>
    </div>
  );
}
