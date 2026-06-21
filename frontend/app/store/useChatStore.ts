import { create } from 'zustand'

export type ChatRole = 'bot' | 'user'

export interface ChatMessage {
  id: number
  role: ChatRole
  text: string
}

interface ChatState {
  messages: ChatMessage[]
  isTyping: boolean
  sendMessage: (rawText: string) => Promise<void>
}

// backend/main.py 에서 CORS로 http://localhost:3000 을 허용해뒀기 때문에
// 프론트(3000번 포트)에서 백엔드(8000번 포트)로 바로 fetch 할 수 있습니다.
const API_URL = 'http://localhost:8000/api/chat'

const useChatStore = create<ChatState>((set) => ({
  messages: [
    { id: 1, role: 'bot', text: '안녕하세요?' },
  ],
  isTyping: false,

  sendMessage: async (rawText) => {
    const text = rawText.trim()
    if (!text) return

    const userMsg: ChatMessage = { id: Date.now(), role: 'user', text }
    set((state) => ({
      messages: [...state.messages, userMsg],
      isTyping: true,
    }))

    try {
      // main.py 의 ChatRequest(text: str) 모델과 키 이름을 맞춰서 전송
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })

      if (!res.ok) throw new Error(`서버 응답 오류: ${res.status}`)

      const data: { reply: string } = await res.json()
      const botMsg: ChatMessage = { id: Date.now() + 1, role: 'bot', text: data.reply }

      set((state) => ({
        messages: [...state.messages, botMsg],
        isTyping: false,
      }))
    } catch (err) {
      // 백엔드(uvicorn)가 꺼져있거나 CORS 등 문제가 있을 때 사용자에게 보여줄 메시지
      const errorMsg: ChatMessage = {
        id: Date.now() + 1,
        role: 'bot',
        text: '⚠️ 서버에 연결할 수 없어요. 백엔드(uvicorn)가 실행 중인지 확인해주세요.',
      }
      set((state) => ({
        messages: [...state.messages, errorMsg],
        isTyping: false,
      }))
    }
  },
}))

export default useChatStore
