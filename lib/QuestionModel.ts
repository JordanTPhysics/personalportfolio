export class QuestionModel {
    id: number;
    question: string;
    answers: string[];
    extra: string;
    score: number;
    category: string;
    type: string;
    options: string[];
    required: boolean;
    tooltip?: string;
    link?: string;
    source?: string;

    constructor(id: number, question: string, category: string, type: string, options: string[], required: boolean, tooltip?: string, link?: string, source?: string) {
        this.id = id;
        this.question = question;
        this.answers = [];
        this.extra = "";
        this.score = 0;
        this.category = category;
        this.type = type;
        this.options = options;
        this.required = required;
        this.tooltip = tooltip;
        this.link = link;
        this.source = source;
    }

    static fromJson(json: string): QuestionModel[] {
        return JSON.parse(json).map((question: any) =>
            new QuestionModel(question.id, question.question, question.category, question.type, question.options, question.required, question.tooltip, question.link, question.source)
        );
    }

}