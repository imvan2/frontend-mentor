import Image from "next/image";
import buttons from "@/styles/Buttons.module.css";
import fonts from "@/styles/Fonts.module.css";

interface SecondaryBtnProps {
  content: string;
  svgImage?: string;
  letter?: string;
  bgColor: string;
  value?: string;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

// TODO: Change this back to only secondary buttons
export default function SecondaryBtn({
  content,
  svgImage,
  letter,
  bgColor,
  value,
  handleClick,
}: SecondaryBtnProps) {
  return (
    <button
      onClick={(e) => handleClick(e)}
      value={value}
      className={`${buttons.secondary_button} ${fonts.txt_preset_4}`}
    >
      <div style={{ backgroundColor: `${bgColor}` }}>
        {svgImage ? (
          <Image src={svgImage} alt="HTML icon" width={28} height={28} />
        ) : (
          <p>{letter}</p>
        )}
      </div>

      <span>{content}</span>
    </button>
  );
}
