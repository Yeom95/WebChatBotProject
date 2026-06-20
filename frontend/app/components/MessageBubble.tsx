import type { ChatRole } from '../store/useChatStore'

interface MessageBubbleProps {
  role: ChatRole
  text: string
  scale: number
}

export default function MessageBubble({ role, text, scale }: MessageBubbleProps) {
  const isBot = role === 'bot'

  /*scale에 비례해서 아바타/말풍선의 실제 px-rem 값을 계산
  기존에 고정값이던 h-9 w-9, text-[0.92rem], px-4 py-2.5 자리를
  동적으로 계산된 inline style 값들이 대신함*/
  const avatarPx = Math.round(36 * scale) //기본 아바타 크기 2.25rem(=36px) 기준
  const avatarFontRem = (1.125 * scale).toFixed(3) //기존 text-lg(1.125rem) 기준
  const bubbleFontRem = (0.92 * scale).toFixed(3) // 기존 text-[0.92rem] 기준
  const bubblePadYRem = (0.625 * scale).toFixed(3) // 기존 py-2.5(0.625rem) 기준
  const bubblePadXRem = (1 * scale).toFixed(3) // 기존 px-4(1rem) 기준

  return (
    <div className={`flex items-end gap-2 transition-all duration-300 ease-out ${isBot ? 'justify-start' : 'justify-end'}`}>
      {isBot && (
        <span
          aria-hidden="true"
          style={{ width: avatarPx, height: avatarPx, fontSize: `${avatarFontRem}rem` }}
          className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-chat-avatar-bot text-lg"
        >
          🐶
        </span>
      )}

      <p
        //동적 크기
        style={{
          fontSize: `${bubbleFontRem}rem`,
          padding: `${bubblePadYRem}rem ${bubblePadXRem}rem`,
        }}
        className={`max-w-[74%] rounded-2xl px-4 py-2.5 text-[0.92rem] leading-relaxed text-white font-body
          ${isBot
            ? 'bg-gradient-to-b from-chat-bot to-chat-bot-deep rounded-bl-md'
            : 'bg-gradient-to-b from-chat-user to-chat-user-deep rounded-br-md'
          }`}
      >
        {text}
      </p>

      {!isBot && (
        <span
          aria-hidden="true"
          style={{ width: avatarPx, height: avatarPx, fontSize: `${avatarFontRem}rem` }}
          className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-chat-avatar-user text-lg"
        >
          🐱
        </span>
      )}
    </div>
  )
}
