import { BACKEND_URL } from "./config";

export const getScenarios = async () => {
    const res = await fetch(`${BACKEND_URL}/scenarios`);
    return res.json();
};

export const getScenario = async (id) => {
    const res = await fetch(`${BACKEND_URL}/scenario/${id}`);
    return res.json();
};
