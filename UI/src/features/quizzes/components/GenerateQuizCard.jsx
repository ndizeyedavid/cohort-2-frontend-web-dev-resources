import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { modules } from "../../../services/catalog.js";
import { generatePersonalQuiz, isConfigured } from "../../../services/groq.js";
import { useVault } from "../../../app/providers/VaultProvider.jsx";
import Button from "../../../ui/Button.jsx";
import Icon from "../../../ui/Icon.jsx";

const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"];
const COUNTS = [5, 8, 10];

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="eyebrow block mb-1.5">{label}</span>
      {children}
    </label>
  );
}

export default function GenerateQuizCard() {
  const navigate = useNavigate();
  const { saveGeneratedQuiz } = useVault();
  const [moduleId, setModuleId] = useState(modules[3]?.id || modules[0].id);
  const [difficulty, setDifficulty] = useState(DIFFICULTIES[0]);
  const [count, setCount] = useState(COUNTS[0]);
  const [busy, setBusy] = useState(false);
  const ready = isConfigured();

  async function generate() {
    const module = modules.find((item) => item.id === moduleId);
    if (!module) return;
    setBusy(true);
    try {
      const result = await generatePersonalQuiz({
        moduleTitle: module.title,
        topics: (module.lessons || []).map((lesson) => lesson.title),
        count,
        difficulty,
      });
      const quiz = {
        id: `gen-${Date.now().toString(36)}`,
        moduleId: module.id,
        title: result.title,
        generated: true,
        questions: result.questions.map((question, index) => ({
          ...question,
          id: `q${index + 1}`,
          options: question.options || [],
          answer: question.type === "mcq" ? Number(question.answer) : question.answer,
        })),
      };
      saveGeneratedQuiz(quiz);
      toast.success("Quiz ready and saved");
      navigate(`/quizzes/${quiz.id}`);
    } catch {
      toast.error("Could not generate a quiz. Check the Groq key and try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="card glass overflow-hidden">
      <div className="h-1.5 bg-gradient-to-r from-accent to-sun" />
      <div className="p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <span
            className="grid place-items-center size-11 sphere border-2 border-white text-white shrink-0"
            style={{
              backgroundImage: "linear-gradient(160deg, #ffe9a8 0%, #ffc42e 100%)",
              boxShadow: "0 10px 22px -10px rgba(255,196,46,0.95)",
            }}
          >
            <Icon name="sparkle" size={19} />
          </span>
          <div>
            <h2 className="font-display font-bold text-[18px] text-water">
              Generate a personal quiz
            </h2>
            <p className="text-[13.5px] text-water/65 mt-1 max-w-lg leading-relaxed">
              Groq writes a fresh practice set on any week. It is saved on your device
              so you can finish it later.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-3 mt-6">
          <Field label="Week">
            <select
              className="select select-sm w-full rounded-pill bg-white border-base-300 focus:border-primary focus:outline-none"
              value={moduleId}
              onChange={(event) => setModuleId(event.target.value)}
            >
              {modules.map((module) => (
                <option key={module.id} value={module.id}>
                  Week {String(module.week).padStart(2, "0")}: {module.title}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Difficulty">
            <select
              className="select select-sm w-full rounded-pill bg-white border-base-300 focus:border-primary focus:outline-none"
              value={difficulty}
              onChange={(event) => setDifficulty(event.target.value)}
            >
              {DIFFICULTIES.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </Field>
          <Field label="Questions">
            <select
              className="select select-sm w-full rounded-pill bg-white border-base-300 focus:border-primary focus:outline-none"
              value={count}
              onChange={(event) => setCount(Number(event.target.value))}
            >
              {COUNTS.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </Field>
        </div>

        <div className="mt-6 flex items-center gap-3 flex-wrap">
          <Button onClick={generate} disabled={busy || !ready}>
            <Icon name="sparkle" size={16} />
            {busy ? "Writing your quiz..." : "Generate quiz"}
          </Button>
          {!ready ? (
            <span className="text-[12.5px] font-semibold text-[#8a5a08] bg-sun-soft border border-sun/50 rounded-pill px-3 py-1.5">
              Add VITE_GROQ_API_KEY in UI/.env to switch this on.
            </span>
          ) : null}
        </div>
      </div>
    </section>
  );
}
