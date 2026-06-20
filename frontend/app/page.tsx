'use client';

// ====================== 변경된 부분 ======================
// 기존: useState/useEffect로 백엔드 "/" 엔드포인트를 호출해서
//       상태 문자열만 화면에 찍어주는 페이지였습니다.
// 변경: 그 역할은 store/useChatStore.ts 의 sendMessage()가
//       "/api/chat" 엔드포인트를 호출하는 방식으로 이어받았고,
//       이 페이지는 헤더 + 메시지 스레드 + 입력창으로 구성된
//       실제 채팅 화면을 그리도록 교체했습니다.
import ChatHeader from './components/ChatHeader';
import ChatThread from './components/ChatThread';
import Composer from './components/Composer';

export default function Home() {
  return (
    // 모바일: 화면 전체를 채우는 풀스크린 / sm(640px) 이상: 카드 형태로 중앙 정렬
    <div className="flex min-h-dvh w-full flex-col bg-chat-bg">
      <div
        className="mx-auto flex w-full max-w-2xl flex-1 flex-col"
      >
        <ChatThread />
        <Composer />
      </div>
    </div>
  );
}