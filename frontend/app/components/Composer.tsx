'use client'

import { useRef, useState } from 'react'
import useChatStore from '../store/useChatStore'

export default function Composer() {
  const [draft, setDraft] = useState('')
  const sendMessage = useChatStore((state) => state.sendMessage)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  function handleInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setDraft(e.target.value)
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 104)}px`
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!draft.trim()) return
    sendMessage(draft)
    setDraft('')
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-none items-end gap-2.5 border-t border-white/10 bg-chat-bg-deep/65 px-4 py-3 backdrop-blur-md"
      style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
    >
      <textarea
        ref={textareaRef}
        value={draft}
        onChange={handleInput}
        rows={1}
        required
        placeholder="메시지를 입력하세요..."
        aria-label="메시지 입력"
        className="max-h-26 flex-1 resize-none rounded-[1.4rem] border border-white/10
          bg-white/5 px-4 py-2.5 text-[0.92rem] leading-relaxed text-white font-body
          placeholder:text-white/40 focus:outline-none focus-visible:outline-2
          focus-visible:outline-chat-accent focus-visible:outline-offset-2"
      />
      <button
        type="submit"
        aria-label="전송"
        className="flex h-11 w-11 flex-none items-center justify-center rounded-full
          bg-gradient-to-br from-chat-bot to-chat-user text-white"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-4.5 w-4.5" aria-hidden="true">
          <path
            d="M4 12L20 4L13 20L11 13L4 12Z"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </form>
  )
}
