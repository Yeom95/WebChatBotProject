'use client'

import { useEffect, useRef } from 'react'
import useChatStore from '../store/useChatStore'
import MessageBubble from './MessageBubble'
import TypingIndicator from './TypingIndicator'

//메세지가 적을때는 크게 보이다가,점점 늘어날수록 기본크기로 수렴하는 배율을 계산하는 함수
const MAX_SCALE = 1.6 // 메세지가 2개 이하일떄의 배율(시작 배율,1.6배 사이즈)
const MIN_SCALE = 1 //충분히 쌓였을때 수렴하는 기본 배율
const GROW_START = 2 //이 개수까지는 완전히 기본 크기로 수렴
const GROW_END = 12 //이 개수부터는 완전히 기본 크기로 수렴

function getMessageScale(count: number) {
  if (count <= GROW_START) return MAX_SCALE
  if (count >= GROW_END) return MIN_SCALE

  const t = (count - GROW_START) / (GROW_END - GROW_START)
  return MAX_SCALE - (MAX_SCALE - MIN_SCALE) * t
}


export default function ChatThread() {
  const messages = useChatStore((state) => state.messages)
  const isTyping = useChatStore((state) => state.isTyping)
  const bottomRef = useRef<HTMLDivElement>(null)

  const scale = getMessageScale(messages.length) //현재 메세지 개수 기준 배율

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, isTyping])

  return (
    <main
      className="flex flex-1 flex-col gap-3.5 overflow-y-auto px-4 py-5"
      style={{ paddingTop: 'calc(1.25rem + env(safe-area-inset-top))' }} // 추가: 헤더가 없어진 만큼 노치 여백 직접 보정
      aria-live="polite"
      aria-label="대화 내용"
    >
      <p className="mx-auto rounded-full bg-white/5 px-3 py-1.5 text-xs text-white/40">오늘</p>

      {messages.map((m) => (
        <MessageBubble key={m.id} role={m.role} text={m.text} scale={scale} />
      ))}

      {isTyping && <TypingIndicator scale={scale} />}

      <div ref={bottomRef} />
    </main>
  )
}
