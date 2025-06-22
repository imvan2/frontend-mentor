import buttons from "@/styles/Buttons.module.css";
import fonts from "@/styles/Fonts.module.css";
interface PrimaryBtnProps {
  content: string;
  handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function PrimaryBtn({ handleClick, content }: PrimaryBtnProps) {
  return (
    <button
      onClick={handleClick}
      className={`${buttons.primary_button} ${fonts.txt_preset_4}`}
    >
      <span>{content}</span>
    </button>
  );
}
