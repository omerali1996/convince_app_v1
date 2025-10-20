from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
from scenarios import scenarios
import os

app = FastAPI()

origins = ["*"]  # Vercel frontend için
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

API_KEY = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=API_KEY)

class Message(BaseModel):
    user_input: str
    system_prompt: str

@app.get("/scenarios")
def get_scenarios():
    return {sid: {"Senaryo Adı": s["Senaryo Adı"]} for sid, s in scenarios.items()}

@app.get("/scenario/{scenario_id}")
def get_scenario_detail(scenario_id: str):
    if scenario_id not in scenarios:
        return {"error": "Senaryo bulunamadı"}
    return scenarios[scenario_id]

@app.post("/chat")
def chat_endpoint(message: Message):
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": message.system_prompt},
            {"role": "user", "content": message.user_input}
        ]
    )
    return {"reply": response.to_dict()["choices"][0]["message"]["content"]}
