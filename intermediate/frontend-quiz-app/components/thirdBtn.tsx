import buttons from "@/styles/ThirdBtn.module.css";
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

  console.log("submitAnswer", submitAnswer);
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
      type="button"
      onClick={(e) => handleClick(e)}
      value={value}
      className={`${buttons.third_button} ${fonts.txt_preset_4} ${
        fonts.font_styles_1
      } ${!submitAnswer && isSelected ? `${buttons.selected}` : ""}
      ${
        submitAnswer && ifUserIsCorrect && isSelected
          ? `${buttons.correct}`
          : ""
      }
          ${
            submitAnswer && !ifUserIsCorrect && isSelected
              ? `${buttons.incorrect}`
              : ""
          }`}
      id={id}
      disabled={disableBtns}
    >
      <span className={`${buttons.letter_and_answer}`}>
        <span className={`${buttons.letter_bkg}`}>
          <p className={`${buttons.letter}`}>{letter}</p>
        </span>

        <span className={`${fonts.txt_preset_4} ${fonts.font_styles_1}`}>
          {content}
        </span>
      </span>

      <span id="icon" className={`${buttons.icon_container}`}>
        {showCorrectIcon && <AnswerIcon isCorrect={true} />}
        {showIncorrectIcon && <AnswerIcon isCorrect={false} />}
      </span>
    </button>
  );
}
