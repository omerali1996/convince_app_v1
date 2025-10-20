const API_BASE = "https://convince-app-v1-1.onrender.com"; // Prod’da backend URL ile değiştir

// Tüm senaryoları getir
export async function fetchScenarios() {
  const res = await fetch(`${API_BASE}/scenarios`);
  if (!res.ok) throw new Error("Senaryolar alınamadı");
  return await res.json();
}

// Tek senaryo detayını getir
export async function fetchScenario(id) {
  const res = await fetch(`${API_BASE}/scenario/${id}`);
  if (!res.ok) throw new Error("Senaryo bulunamadı");
  return await res.json();
}

// Kullanıcı sorusunu gönder ve cevap al
export async function askQuestion(scenarioId, question) {
  const res = await fetch(`${API_BASE}/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ scenarioId, question }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Soru gönderilemedi");
  return data.answer;
}
