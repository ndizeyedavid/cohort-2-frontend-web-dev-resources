import { gradeAnswer } from "../../services/groq.js";

function normalize(text) {
  return String(text ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[;."'`]/g, "");
}

export async function gradeOne(question, actual) {
  const empty = actual === null || actual === undefined || actual === "";

  if (empty) {
    return { correct: false, skipped: true, feedback: "You skipped this one." };
  }

  if (question.type === "mcq") {
    const correct = Number(question.answer) === Number(actual);
    return {
      correct,
      feedback: correct ? question.explanation : `Not quite. ${question.explanation}`,
    };
  }

  try {
    const verdict = await gradeAnswer({
      question: question.prompt,
      expected: String(question.answer),
      actual: String(actual),
    });
    return { correct: verdict.correct, feedback: verdict.feedback };
  } catch {
    const match = normalize(actual) === normalize(question.answer);
    return {
      correct: match,
      selfCheck: true,
      feedback:
        "AI grading was unavailable, so this was matched against the model answer. Check it yourself below.",
    };
  }
}

export async function gradeAll(questions, answers) {
  return Promise.all(questions.map((question, index) => gradeOne(question, answers[index])));
}
