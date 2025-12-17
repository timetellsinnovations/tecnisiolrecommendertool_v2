export interface QuestionOption {
  id: string;
  text: string;
  description: string;
  icon: string;
}

export interface Question {
  id: number;
  text: string;
  help: string;
  type: 'single' | 'multi';
  options: QuestionOption[];
}

export interface AssessmentAnswers {
  [questionId: number]: string | string[];
}

export interface AssessmentResults {
  primaryIOL: string;
  baseModel: 'eyhance' | 'puresee' | 'odyssey';
  matchScore: number;
  benefits: string[];
  considerations: string[];
  matchReasons: string[];
  isEyeHistoryOverride: boolean;
}

export interface AssessmentState {
  currentQuestion: number;
  totalQuestions: number;
  answers: AssessmentAnswers;
  isLoading: boolean;
  isComplete: boolean;
  results?: AssessmentResults;
}
