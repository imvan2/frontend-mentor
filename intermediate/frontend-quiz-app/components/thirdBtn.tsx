import buttons from "@/styles/Buttons.module.css";
import fonts from "@/styles/Fonts.module.css";
import Image from "next/image";
import { ThirdBtnProps } from "@/lib/definitions";

const AnswerIcon = ({ isCorrect }: { isCorrect: boolean }) => (
  <Image
    src={`../images/icon-${isCorrect ? "correct" : "incorrect"}.svg`}
    alt={isCorrect ? "Correct answer" : "Incorrect answer"}
    width={30}
    height={30}
    className={buttons.icon_img}
  />
);

export default function ThirdBtn({
  content,
  letter,
  value,
  id,
  handleClick,
  // QuizState props
  submitAnswer,
  selectedOption,
  ifUserIsCorrect,
  correctAnswer,
  disableBtns,
}: ThirdBtnProps) {
  const isSelected = selectedOption === content;
  const isCorrectAnswer = correctAnswer === content;

  // if user submitted an answer AND (selected option matches button AND user is correct)
  // OR (user is wrong AND the content matches answer)
  // Basically, show the correct icon when user selected the correct answer
  // or show the correct answer
  const showCorrectIcon =
    submitAnswer &&
    ((isSelected && ifUserIsCorrect) || (!ifUserIsCorrect && isCorrectAnswer));

  // If user submitted an answer AND selected option matches button AND if user is wrong
  const showIncorrectIcon = submitAnswer && isSelected && !ifUserIsCorrect;
  return (
    <button
      onClick={(e) => handleClick(e)}
      value={value}
      className={`${buttons.third_button} ${fonts.txt_preset_4}`}
      id={id}
      disabled={disableBtns}
    >
      <div className={`${buttons.letter_and_answer}`}>
        <div className={`${buttons.letter_bkg}`}>
          <p className={`${buttons.letter}`}>{letter}</p>
        </div>

        <span className={`${fonts.txt_preset_4}`}>{content}</span>
      </div>

      <div id="icon" className={`${buttons.icon_container}`}>
        {showCorrectIcon && <AnswerIcon isCorrect={true} />}
        {showIncorrectIcon && <AnswerIcon isCorrect={false} />}
      </div>
    </button>
  );
}
