"use client";

import { useState } from "react";
import Question from "@/components/ui/Question";
import { SURVEY_QUESTIONS } from "@/lib/survey-questions";
import { Button } from "@/components/ui/Button";

function generateSessionId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `session_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
}

export default function SurveyPage() {
  const [sessionId] = useState(() => generateSessionId());
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [extraByQuestion, setExtraByQuestion] = useState<Record<number, string>>({});
  const [email, setEmail] = useState<string>("");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleAnswerChange = (questionId: number, value: string[]) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleExtraChange = (questionId: number, text: string) => {
    setExtraByQuestion((prev) => ({ ...prev, [questionId]: text }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = () => {
    setSubmitError(null);
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setSubmitError("Please enter your email address.");
      return;
    }
    if (!validateEmail(trimmedEmail)) {
      setSubmitError("Please enter a valid email address.");
      return;
    }

    const payload = {
      sessionId,
      email: trimmedEmail,
      answers: SURVEY_QUESTIONS.map((q) => ({
        questionId: q.id,
        category: q.category,
        question: q.question,
        value: answers[q.id] ?? [],
      })),
      extraAnswers: Object.entries(extraByQuestion)
        .filter(([, text]) => text?.trim())
        .reduce<Record<number, string>>((acc, [questionId, text]) => {
          acc[Number(questionId)] = text.trim();
          return acc;
        }, {}),
      metadata: {
        submittedAt: new Date().toISOString(),
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : undefined,
        referrer: typeof document !== "undefined" ? document.referrer || undefined : undefined,
        language: typeof navigator !== "undefined" ? navigator.language : undefined,
      },
    };

    const json = JSON.stringify(payload, null, 2);
    console.log("Survey submission:", json);
    // TODO: send to API (e.g. fetch("/api/survey", { method: "POST", headers: { "Content-Type": "application/json" }, body: json }))
  };

  return (
    <main className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto lg:w-2/3 w-full">
        <h1 className="text-h1 font-space-mono font-bold tracking-tight text-foreground mb-12">
          Small-Medium Enterprise Data Survey
        </h1>

        <span className="text-h4 text-center mx-8 flex justify-center bg-slate-300 rounded-md p-4 border-2 border-black">
          Complete the survey to see the data-readiness of your business AND receive a free Ebook: "First Steps to Data Driven OUTCOMES"
        </span>

        <div className="flex flex-col">
          {SURVEY_QUESTIONS.map((question) => (
            <Question
              key={question.id}
              question={question}
              value={answers[question.id] ?? []}
              onChange={(value) => handleAnswerChange(question.id, value)}
              extraValue={extraByQuestion[question.id] ?? ""}
              onExtraChange={(text) => handleExtraChange(question.id, text)}
            />
          ))}
        </div>

        <h3 className="text-h3 text-center mb-2">
          Thanks for taking the SME Data Survey! The results and free Ebook will be sent to your email.
        </h3>
        {submitError && (
          <p className="text-body text-accent-red font-space-mono mb-2">{submitError}</p>
        )}
        <div className="flex justify-evenly text-h4">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            className="w-full lg:w-1/2 p-2 border-2 border-black rounded-md bg-background"
          />
          <Button onClick={handleSubmit} variant="default" className="rounded-md hover:text-white h-full">Submit</Button>
        </div>
      </div>
    </main>
  );
}
