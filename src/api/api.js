const BASE_URL = "https://convince-app-v1-1.onrender.com"; // Backend URL

export const getScenarios = async () => {
    const res = await fetch(`${BASE_URL}/scenarios`);
    return res.json();
};

export const getScenario = async (id) => {
    const res = await fetch(`${BASE_URL}/scenario/${id}`);
    return res.json();
};

// OpenAI cevabı backend üzerinden çağrılacaksa buraya eklenebilir
