import { useEffect, useRef, useState } from "react";
import { useTutor } from "../../../app/providers/TutorProvider.jsx";
import { useTutorChat } from "../hooks/useTutorChat.js";
import TutorHeader from "./TutorHeader.jsx";
import TutorComposer from "./TutorComposer.jsx";
import TutorMessage from "./TutorMessage.jsx";
import TutorPointer from "./TutorPointer.jsx";
import SnippetPopup from "./SnippetPopup.jsx";
import Spinner from "../../../ui/Spinner.jsx";

const SUGGESTIONS = [
  "Explain this lesson like I am new to it",
  "Give me a tiny example to try",
  "What is the most common mistake here?",
];

export default function TutorPanel() {
  const { open, closeTutor } = useTutor();
  const chat = useTutorChat();
  const scrollRef = useRef(null);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    const node = scrollRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [chat.history.length, chat.streaming, open]);

  if (!open) return null;

  function submit(text) {
    const value = text.trim();
    if (!value || chat.busy) return;
    setDraft("");
    chat.send(value);
  }

  const showWelcome = !chat.history.length && !chat.streaming;

  return (
    <>
      <TutorPointer pointer={chat.pointer} />
      <SnippetPopup snippet={chat.snippet} onClose={chat.closeSnippet} />

      <div
        className="fixed inset-0 z-40 bg-water-deep/40 sm:hidden"
        onClick={closeTutor}
        aria-hidden="true"
      />

      <aside
        className="fixed top-0 right-0 z-50 h-full w-full sm:w-[430px] bg-white flex flex-col border-l border-base-300 shadow-[0_0_50px_-12px_rgba(10,74,107,0.6)]"
        role="dialog"
        aria-label="AI Tutor"
      >
        <TutorHeader
          voiceOn={chat.voiceOn}
          onToggleVoice={chat.toggleVoice}
          onClear={chat.clearTutor}
          onClose={closeTutor}
        />

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto tutor-scroll px-4 py-4 space-y-3.5"
        >
          {showWelcome ? (
            <div className="py-5">
              <p className="text-[13.5px] text-water/65 leading-relaxed mb-4">
                Ask anything about what you are reading. The tutor can point at
                headings, show snippets, and talk if you turn voice on.
              </p>
              <div className="flex flex-col gap-2 items-start">
                {SUGGESTIONS.map((text) => (
                  <button
                    key={text}
                    type="button"
                    onClick={() => submit(text)}
                    className="text-left text-[12.5px] font-bold text-water bg-white border-2 border-aqua/40 rounded-pill px-4 py-2 hover:border-aqua transition-colors"
                  >
                    {text}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {chat.history.map((message, index) => (
            <TutorMessage key={index} message={message} />
          ))}

          {chat.streaming ? (
            <TutorMessage
              message={{ role: "assistant", content: chat.streaming, streaming: true }}
            />
          ) : null}

          {chat.busy && !chat.streaming ? (
            <div className="pl-1">
              <Spinner label="Thinking" />
            </div>
          ) : null}

          {chat.error ? (
            <div className="alert rounded-inner bg-sun-soft border-sun/50 text-[12.5px] text-[#8a5a08] py-2.5">
              <span>{chat.error}</span>
            </div>
          ) : null}
        </div>

        <TutorComposer
          draft={draft}
          onDraftChange={setDraft}
          busy={chat.busy}
          onSubmit={submit}
        />
      </aside>
    </>
  );
}
