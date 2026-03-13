import { QuestionModel } from "./QuestionModel";
import questionsJson from "./survey-questions.json";


export const SURVEY_QUESTIONS: QuestionModel[] = questionsJson.map(
  (q: {
    id: number;
    question: string;
    name: string;
    type: string;
    options: string[];
    required: boolean;
    tooltip?: string;
    link?: string;
    source?: string;
  }) =>
    new QuestionModel(
      q.id,
      q.question,
      q.name,
      q.type,
      q.options,
      q.required,
      q.tooltip,
      q.link,
      q.source
    )
);
