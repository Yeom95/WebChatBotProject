interface TypingIndicatorProps {
  scale: number //MessageBubble과 동일한 배율을 받아 아바타 크기를 맞춤
}

export default function TypingIndicator({ scale }: TypingIndicatorProps) {

  const avatarPx = Math.round(36 * scale)
  const avatarFontRem = (1.125 * scale).toFixed(3)

  return (
    <div className="flex items-end gap-2 justify-start" aria-label="입력 중">
      <span
        aria-hidden="true"
        style={{ width: avatarPx, height: avatarPx, fontSize: `${avatarFontRem}rem` }}
        className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-chat-avatar-bot text-lg"
      >
        🐶
      </span>
      <p className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-gradient-to-b from-chat-bot to-chat-bot-deep px-4 py-3">
        <span className="h-1.5 w-1.5 rounded-full bg-white/90 animate-typing-bounce" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/90 animate-typing-bounce [animation-delay:0.15s]" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/90 animate-typing-bounce [animation-delay:0.30s]" />
      </p>
    </div>
  )
}
