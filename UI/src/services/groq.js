export function isConfigured() {
  return Boolean(import.meta.env.VITE_GROQ_API_KEY);
}

const MODEL = import.meta.env.VITE_GROQ_MODEL || "llama-3.3-70b-versatile";

let aiModules = null;

async function loadAi() {
  if (!aiModules) {
    aiModules = Promise.all([
      import("@ai-sdk/groq"),
      import("ai"),
      import("zod"),
    ]).then(([groqModule, aiModule, zodModule]) => ({
      createGroq: groqModule.createGroq,
      streamText: aiModule.streamText,
      generateObject: aiModule.generateObject,
      tool: aiModule.tool,
      z: zodModule.z,
    }));
  }
  return aiModules;
}

async function model() {
  if (!isConfigured()) throw new Error("no-key");
  const { createGroq } = await loadAi();
  return createGroq({ apiKey: import.meta.env.VITE_GROQ_API_KEY })(MODEL);
}

export async function startTutorTurn({ system, messages, tools }) {
  const { streamText } = await loadAi();
  return streamText({
    model: await model(),
    system,
    messages,
    tools,
    temperature: 0.4,
  });
}

export async function loadTool() {
  const { tool } = await loadAi();
  return tool;
}

export async function loadZod() {
  const { z } = await loadAi();
  return z;
}

export async function gradeAnswer({ question, expected, actual }) {
  const { generateObject, z } = await loadAi();
  const result = await generateObject({
    model: await model(),
    temperature: 0.1,
    schema: z.object({
      correct: z.boolean(),
      feedback: z.string(),
    }),
    prompt: [
      "You are grading a web development student's answer.",
      `Question: ${question}`,
      `Model answer: ${expected}`,
      `Student answer: ${actual}`,
      "Judge whether the student answer is substantively correct. Accept different wording.",
      "Give one or two sentences of friendly, specific feedback.",
    ].join("\n"),
  });
  return result.object;
}

export async function generatePersonalQuiz({ moduleTitle, topics, count, difficulty }) {
  const { generateObject, z } = await loadAi();
  const quizSchema = z.object({
    title: z.string(),
    questions: z.array(
      z.object({
        type: z.enum(["mcq", "short", "code"]),
        prompt: z.string(),
        options: z.array(z.string()).optional(),
        answer: z.union([z.string(), z.number()]),
        explanation: z.string(),
      }),
    ),
  });

  const result = await generateObject({
    model: await model(),
    temperature: 0.5,
    schema: quizSchema,
    prompt: [
      "Create a practice quiz for a frontend web development student.",
      `Module: ${moduleTitle}`,
      `Topics to cover: ${topics.join(", ")}`,
      `Difficulty: ${difficulty}`,
      `Number of questions: ${count}`,
      "Use a mix of multiple choice (type mcq, options array of 4, answer is the 0-based index as a number),",
      "short answer (type short, answer is a model answer string),",
      "and code writing (type code, answer is a reference solution string).",
      "Every question needs an explanation. Write for a beginner, be concrete, no tricks.",
    ].join("\n"),
  });
  return result.object;
}
