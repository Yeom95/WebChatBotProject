import os
from dotenv import load_dotenv
from google import genai
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel #요청 바디(JSON) 검증을 위해 필요

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

# 프론트엔드 Composer(입력창)에서 보낸 메세지를 받아 봇 응답을 돌려주는 엔드포인트

class ChatRequest(BaseModel):
    text: str # 프론트 useChatStore.ts에서 보내는 키 이름(text)와 맞춰야한다

chat_session = client.chats.create(model="gemini-3.1-flash-lite")

@app.post("/api/chat")
def chat(request: ChatRequest):
    response = chat_session.send_message(request.text)
    return {"reply": response.text}