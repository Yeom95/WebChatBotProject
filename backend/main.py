from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel #요청 바디(JSON) 검증을 위해 필요

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")

def read_root():
    return {"status": "서버 작동중!"}

# 프론트엔드 Composer(입력창)에서 보낸 메세지를 받아 봇 응답을 돌려주는 엔드포인트

class ChatRequest(BaseModel):
    text: str # 프론트 useChatStore.ts에서 보내는 키 이름(text)와 맞춰야한다

@app.post("/api/chat")
def chat(request: ChatRequest):
    """
    지금은 고정된 응답만 돌려주는 더미 로직입니다.
    이 함수 내부를 실제 LLM 호출(OpenAI, Claude API 등)로 교체하면
    프론트엔드 코드는 수정할 필요 없이 바로 실제 AI 챗봇이 됩니다.
    """
    user_text = request.text
    reply = f"('{user_text}'라고 보냈네요)"
    return {"reply": reply}