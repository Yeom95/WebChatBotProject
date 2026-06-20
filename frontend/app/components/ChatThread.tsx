'use client'

import { useEffect, useRef } from 'react'
import useChatStore from '../store/useChatStore'
import MessageBubble from './MessageBubble'
import TypingIndicator from './TypingIndicator'

export default function ChatThread() {
  const messages = useChatStore((state) => state.messages)
  const isTyping = useChatStore((state) => state.isTyping)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, isTyping])

  return (
    <main
      className="flex flex-1 flex-col gap-3.5 overflow-y-auto px-4 py-5"
      aria-live="polite"
      aria-label="대화 내용"
    >
      <p className="mx-auto rounded-full bg-white/5 px-3 py-1.5 text-xs text-white/40">오늘</p>

      {messages.map((m) => (
        <MessageBubble key={m.id} role={m.role} text={m.text} />
      ))}

      {isTyping && <TypingIndicator />}

      <div ref={bottomRef} />
    </main>
  )
}
