export default function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 justify-start" aria-label="입력 중">
      <span
        aria-hidden="true"
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
