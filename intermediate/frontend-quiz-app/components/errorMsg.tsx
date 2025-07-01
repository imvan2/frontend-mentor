import Image from "next/image";
import fonts from "@/styles/Fonts.module.css";
import IncorrectSVG from "@/public/images/icon-incorrect.svg";
import { ErrorMsgProps } from "@/lib/definitions";

export default function ErrorMsg({ error }: ErrorMsgProps) {
  return (
    <>
      <Image src={IncorrectSVG} alt="icon" width={24} height={24} />
      <span className={`${fonts.txt_preset_4} ${fonts.font_styles_1}`}>
        {error}
      </span>
    </>
  );
}
