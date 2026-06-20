import type { ChatRole } from '../store/useChatStore'

interface MessageBubbleProps {
  role: ChatRole
  text: string
}

export default function MessageBubble({ role, text }: MessageBubbleProps) {
  const isBot = role === 'bot'

  return (
    <div className={`flex items-end gap-2 ${isBot ? 'justify-start' : 'justify-end'}`}>
      {isBot && (
        <span
          aria-hidden="true"
          className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-chat-avatar-bot text-lg"
        >
          🐶
        </span>
      )}

      <p
        className={`max-w-[74%] rounded-2xl px-4 py-2.5 text-[0.92rem] leading-relaxed text-white font-body
          ${
            isBot
              ? 'bg-gradient-to-b from-chat-bot to-chat-bot-deep rounded-bl-md'
              : 'bg-gradient-to-b from-chat-user to-chat-user-deep rounded-br-md'
          }`}
      >
        {text}
      </p>

      {!isBot && (
        <span
          aria-hidden="true"
          className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-chat-avatar-user text-lg"
        >
          🐱
        </span>
      )}
    </div>
  )
}
