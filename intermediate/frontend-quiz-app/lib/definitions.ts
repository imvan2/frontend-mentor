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
  disableBtns: boolean;
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
