"use client";

import { useState } from "react";
import Question from "@/components/ui/Question";
import { SURVEY_QUESTIONS } from "@/lib/survey-questions";
import { Button } from "@/components/ui/Button";
import { QuestionModel } from "@/lib/QuestionModel";
import { useRouter } from "next/navigation";

function generateSessionId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `session_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
}

export default function SurveyPage() {
  const router = useRouter();
  const [sessionId] = useState(() => generateSessionId());
  const [submitButtonText, setSubmitButtonText] = useState<string>("Submit");
  const [questions, setQuestions] = useState<QuestionModel[]>(SURVEY_QUESTIONS);
  const [email, setEmail] = useState<string>("");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleAnswerChange = (questionId: number, value: string[], extra: string) => {
    setQuestions((prev) => prev.map((q) => q.id === questionId ? { ...q, answers: value, extra: extra } : q));
  };


  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const debugAnswerAll = () => {
    for (const question of SURVEY_QUESTIONS) {
      if (question.type === "radio") {
        setQuestions((prev) => prev.map((q) => q.id === question.id ? { ...q, answers: [question.options[question.id % 3]] } : q));
      } else if (question.type === "checkbox") {
        setQuestions((prev) => prev.map((q) => q.id === question.id ? { ...q, answers: question.options, extra: "Extra text" } : q));
      } else if (question.type === "range") {
        setQuestions((prev) => prev.map((q) => q.id === question.id ? { ...q, answers: ["5"] } : q));
      } else if (question.type === "text") {
        setQuestions((prev) => prev.map((q) => q.id === question.id ? { ...q, answers: [question.name + " test"] } : q));
      }
    }
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = () => {
    setSubmitButtonText("Sending...");
    setSubmitError(null);
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setSubmitError("Please enter your email address.");
      setSubmitButtonText("Submit");
      return;
    }
    if (!validateEmail(trimmedEmail)) {
      setSubmitError("Please enter a valid email address.");
      setSubmitButtonText("Submit");
      return;
    }

    localStorage.setItem("email", trimmedEmail);

    const payload = {
      sessionId,
      email: trimmedEmail,
      answers: questions.map((q) => ({
        questionId: q.id,
        name: q.name,
        question: q.question,
        extra: q.extra ?? "",
        value: q.answers ?? [],
      })),
      metadata: {
        submittedAt: new Date().toISOString(),
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : undefined,
        referrer: typeof document !== "undefined" ? document.referrer || undefined : undefined,
        language: typeof navigator !== "undefined" ? navigator.language : undefined,
      },
    };


    fetch("/api/saveSurvey", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to save survey");
        return response.json();
      })
      .then(() => {
        if (typeof window !== "undefined") {
          sessionStorage.setItem("surveyJustSubmitted", "1");
        }
        router.push("/survey/success");
      })
      .catch((error) => {
        console.error(error);
        setSubmitError("Something went wrong. Please try again.");
      });
  };

  return (
    <main className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto lg:w-2/3 w-full">
        <h1 className="text-h1 font-space-mono font-bold tracking-tight text-foreground mb-12">
          Small-Medium Enterprise Data Survey
        </h1>

        <span className="text-h4 text-center mx-8 flex justify-center bg-slate-300 rounded-md p-4 border-2 border-black">
          Complete the survey to see the data-readiness of your business AND receive a free Ebook: "FOUR Steps to Data Driven Outcomes"
        </span>

        {/* <Button onClick={debugAnswerAll} variant="default" className="rounded-md hover:text-white h-full">Debug: Answer All</Button> */}

        <div className="flex flex-col">
          {questions.map((question) => (
            <Question
              key={question.id}
              question={question}
              value={question.answers}
              onChange={(value, extra) => handleAnswerChange(question.id, value, extra)}
            />
          ))}
        </div>

        <h3 className="text-h3 text-center mb-2">
          Thanks for taking the SME Data Survey! The results and free Ebook will be sent to your email.
        </h3>

        <div className="flex justify-evenly text-h4">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            className="w-full lg:w-1/2 p-2 border-2 border-black rounded-md bg-background"
          />
          <Button onClick={handleSubmit} data-tracker-id="submit-survey" variant="default" className="rounded-md hover:text-white h-full">{}</Button>
        </div>
        {submitError && (
          <p className="text-h4 text-red-500 font-space-mono m-2 flex justify-center bg-background p-4 border border-black rounded-md">{submitError}</p>
        )}
      </div>
    </main>
  );
}
