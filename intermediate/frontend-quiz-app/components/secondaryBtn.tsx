import Image from "next/image";
import buttons from "@/styles/SecondaryBtn.module.css";
import fonts from "@/styles/Fonts.module.css";

interface SecondaryBtnProps {
  content: string;
  svgImage: string;
  bgColor: string;
  value?: string;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

// TODO: Change this back to only secondary buttons
export default function SecondaryBtn({
  content,
  svgImage,
  bgColor,
  value,
  handleClick,
}: SecondaryBtnProps) {
  return (
    <button
      type="button"
      onClick={(e) => handleClick(e)}
      value={value}
      className={`${buttons.secondary_button} ${fonts.txt_preset_4} ${fonts.font_styles_1}`}
    >
      <span style={{ backgroundColor: `${bgColor}` }}>
        <Image
          src={svgImage}
          alt={`${content} icon`}
          width={28}
          height={28}
          className={`${buttons.image}`}
        />
      </span>

      <span>{content}</span>
    </button>
  );
}
