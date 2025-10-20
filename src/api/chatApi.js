
import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL || "https://convince-app-v1-1.onrender.com";

export const fetchScenarios = async () => {
  const res = await axios.get(`${API_URL}/scenarios`);
  return res.data;
};

export const fetchScenarioDetail = async (id) => {
  const res = await axios.get(`${API_URL}/scenario/${id}`);
  return res.data;
};

export const sendMessage = async (user_input, system_prompt) => {
  const res = await axios.post(`${API_URL}/chat`, { user_input, system_prompt });
  return res.data.reply;
};
