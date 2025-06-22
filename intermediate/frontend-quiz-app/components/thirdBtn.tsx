import buttons from "@/styles/Buttons.module.css";
import fonts from "@/styles/Fonts.module.css";
import Image from "next/image";

interface ThirdBtnProps {
  content: string;
  letter: string;
  value: string;
  id: string;
  correctIcon: string;
  incorrectIcon: string;
  disableBtns: boolean;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

// TODO: fix styles for the letter
export default function ThirdBtn({
  content,
  letter,
  value,
  id,
  correctIcon,
  incorrectIcon,
  disableBtns,
  handleClick,
}: ThirdBtnProps) {
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

      <div id="icon" className={`${buttons.icon_container}`}></div>
    </button>
  );
}
