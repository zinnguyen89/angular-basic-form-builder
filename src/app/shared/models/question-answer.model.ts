export class QuestionAndAnswerItem {
  id!: number;
  questionContent!: string;
  questionType!: string;
  isShowAnswer!: boolean;
  answerType!: string;
  answerContent!: string;
  isRequired!: boolean;
  isUserOwn!: boolean;
  answerOptions!: AnswerOptionItem[];
  userOwnAnswerContent!: string;
  isUserOwnSelected!: boolean;
}

export class AnswerOptionItem {
  id!: number;
  content!: string;
  isSelected!: boolean;
}
