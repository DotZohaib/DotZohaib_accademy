export interface CourseTopic {
  id: number;
  courseId: string;
  questionNumber: number;

  title: string;

  shortAnswer: string;
  easyExplanation: string;
  romanUrduExample: string;

  code: string;
  codeLanguage: string;
  codeExplanation: string[];

  output: string;

  behindTheScenes: string;

  commonMistakes: string[];

  practiceQuestion: string;

  relatedQuestions?: number[];

  // Compatibility aliases for legacy references across components
  Title?: string;
  answer?: string;
  Sample?: string;
  topicName?: string;
  question?: string;
  simpleDefinition?: string;
  romanUrduExplanation?: string;
  realWorldExample?: string;
  codeExample?: string;
  expectedOutput?: string;
  quickRevision?: string;
}
