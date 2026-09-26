import { useCallback, useEffect, useRef, useState } from "react";
import {
  isConfigured,
  loadTool,
  loadZod,
  startTutorTurn,
} from "../../../services/groq.js";
import { buildTutorContext } from "../../../services/tutorContext.js";
import { useVault } from "../../../app/providers/VaultProvider.jsx";
import { useTutorLocation } from "./useTutorLocation.js";

let callCounter = 0;

export function useTutorChat() {
  const { state, pushTutorMessage, clearTutor, setSetting } = useVault();
  const location = useTutorLocation();
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const [streaming, setStreaming] = useState("");
  const [pointer, setPointer] = useState(null);
  const [snippet, setSnippet] = useState(null);

  const voiceRef = useRef(state.settings.voice);
  const stateRef = useRef(state);

  useEffect(() => {
    voiceRef.current = state.settings.voice;
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const send = useCallback(
    async (rawText) => {
      const text = (rawText ?? "").trim();
      if (!text || busy) return;

      setError(null);
      setInput("");
      setBusy(true);
      setStreaming("");

      function speak(spokenText) {
        if (!voiceRef.current || typeof window === "undefined") return;
        if (!window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(spokenText);
        window.speechSynthesis.speak(utterance);
      }

      const [tool, z] = await Promise.all([loadTool(), loadZod()]);

      const tools = {
        pointAt: tool({
          description: "Move the pointer to a heading in the lesson the student is reading",
          parameters: z.object({
            anchor: z
              .string()
              .describe("The heading text to point at, copied exactly as it appears"),
          }),
          execute: async ({ anchor }) => {
            callCounter += 1;
            setPointer({ anchor, id: callCounter });
            return { pointed: true };
          },
        }),
        showSnippet: tool({
          description: "Show a small code snippet popup to the student",
          parameters: z.object({
            title: z.string().describe("Short title for the snippet"),
            code: z.string().describe("The code to show"),
          }),
          execute: async ({ title, code }) => {
            setSnippet({ title, code });
            return { shown: true };
          },
        }),
        speak: tool({
          description: "Read a short text aloud when voice is enabled",
          parameters: z.object({ text: z.string() }),
          execute: async ({ text: spokenText }) => {
            speak(spokenText);
            return { spoken: true };
          },
        }),
      };

      const userMessage = { role: "user", content: text };
      const prior = stateRef.current.tutorHistory;
      pushTutorMessage(userMessage);

      try {
        if (!isConfigured()) throw new Error("no-key");
        const context = buildTutorContext({
          location,
          state: stateRef.current,
        });
        const messages = [...prior, userMessage]
          .slice(-10)
          .map((item) => ({ role: item.role, content: item.content }));

        const result = startTutorTurn({
          system: context.system,
          messages,
          tools,
        });

        let full = "";
        for await (const part of result.textStream) {
          full += part;
          setStreaming(full);
        }

        pushTutorMessage({ role: "assistant", content: full, chip: context.chip });
      } catch (err) {
        setError(
          err?.message === "no-key"
            ? "The AI key is not set on this device. The tutor cannot answer right now."
            : "The tutor could not reach Groq. Check your connection and try again.",
        );
      } finally {
        setBusy(false);
        setStreaming("");
      }
    },
    [busy, location, pushTutorMessage],
  );

  const history = state.tutorHistory;
  const voiceOn = state.settings.voice;

  return {
    history,
    input,
    setInput,
    busy,
    error,
    streaming,
    pointer,
    snippet,
    send,
    clearTutor,
    voiceOn,
    toggleVoice: () => setSetting({ voice: !voiceOn }),
    closeSnippet: () => setSnippet(null),
    clearPointer: () => setPointer(null),
  };
}
