import Image from "next/image";
import styles from "@/styles/Home.module.css";
import fonts from "@/styles/Fonts.module.css";
import IncorrectSVG from "@/public/images/icon-incorrect.svg";

export default function ErrorMsg() {
  return (
    <div className={`${styles.incorrect_container} ${fonts.txt_preset_5}`}>
      <Image src={IncorrectSVG} alt="Incorrect icon" width={20} height={20} />
      <span>Please select an answer</span>
    </div>
  );
}
