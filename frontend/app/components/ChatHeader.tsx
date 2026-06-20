export default function ChatHeader() {
  return (
    <header
      className="flex flex-none items-center justify-between gap-3 border-b border-white/10
        bg-chat-bg-deep/55 px-4 py-3.5 backdrop-blur-md"
      style={{ paddingTop: 'calc(0.9rem + env(safe-area-inset-top))' }}
    >
      <div className="flex min-w-0 items-center gap-2.5">
        <span
          aria-hidden="true"
          className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-chat-avatar-bot text-lg"
        >
          🐶
        </span>
        <div className="flex min-w-0 flex-col">
          <strong className="truncate font-display text-base font-bold tracking-wide text-white">
            Dawg AI
          </strong>
          <span className="flex items-center gap-1.5 text-xs text-white/60">
            <span className="h-1.5 w-1.5 rounded-full bg-chat-accent shadow-[0_0_0_3px_rgba(52,216,160,0.18)]" />
            온라인
          </span>
        </div>
      </div>

      <button
        type="button"
        aria-label="메뉴 열기"
        className="flex h-10 w-10 flex-none items-center justify-center rounded-full
          border border-white/10 bg-white/5 text-white"
      >
        ⋮
      </button>
    </header>
  )
}
