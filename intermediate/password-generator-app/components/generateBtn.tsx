import Image from "next/image";
import { GenerateBtnProps } from "@/lib/definitions";
import SVGIMG from "../public/images/icon-arrow-right.svg";

export default function GenerateBtn({
  charLength,
  combinedString,
  setPassword,
  setCheckmarkError,
}: GenerateBtnProps) {
  // TODO: fix clicked button styles

  // Generate password based on requirements
  const generatePassword = (): string | void => {
    let pw = "";

    if (combinedString === "") {
      setCheckmarkError("Please make a selection above!");
      return;
    }
    for (let i = 0; i < charLength; i++) {
      pw += combinedString.charAt(
        Math.floor(Math.random() * combinedString.length)
      );
    }
    setPassword(pw);
    return pw;
  };

  // Handles generate button click
  const handleGenerateClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    generatePassword();
  };

  return (
    <button
      onClick={(e) => handleGenerateClick(e)}
      className={`text-preset-4 hover-filter-green cursor-pointer flex justify-center items-center gap-4 h-[65px] w-full
                 bg-green-200 text-grey-800 font-bold uppercase
                //  Mobile: active bg is grey-800 
               active:bg-grey-800 active:border-2 active:border-green-200 active:text-green-200 active-filter-green

                // Desktop: includes hover effects
                lg:hover:bg-grey-800 lg:hover:border-2 lg:hover:border-green-200 lg:hover:text-green-200 
                lg:active:bg-green-200 lg:active:text-grey-800 lg:active:active-filter-revert
                `}
    >
      Generate
      <Image
        width="11"
        height="12"
        src={SVGIMG}
        alt="Right arrow"
        className="w-[11px] h-[12px]"
      />
    </button>
  );
}
