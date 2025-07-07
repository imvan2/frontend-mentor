export interface HeaderProps {
  title: string;
  svgImage: string;
  bgColor: string;
}

export interface QuizState {
  submitAnswer: boolean;
  selectedOption: string;
  ifUserIsCorrect: boolean;
  correctAnswer: string;
  resultsBtn?: boolean;
  disableBtns: boolean;
  progress?: number | undefined;
}

export interface ThirdBtnProps extends QuizState {
  content: string;
  letter: string;
  value: string;
  id: string;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface ErrorMsgProps {
  error: string;
}

// useRender Action types
export interface SelectOptionAction {
  type: "SELECT_OPTION";
  selectedOption: string;
  correctAnswer: string;
}

export interface SubmitAction {
  type: "SUBMIT";
  resultsBtn: boolean;
  disableBtns: boolean;
  submitAnswer: boolean;
  ifUserIsCorrect: boolean;
  progress: number | undefined;
}

export interface NextAction {
  type: "NEXT";
  resultsBtn: boolean;
  ifUserIsCorrect: boolean;
  disableBtns: boolean;
  submitAnswer: boolean;
  progress: number | undefined;
}
