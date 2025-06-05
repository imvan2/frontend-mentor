import Image from "next/image";
import COPYIMG from "../public/images/icon-copy.svg";
import { PasswordProps } from "../lib/definitions";

export default function PasswordOutput({
  password,
  copyClicked,
  setCopyClicked,
}: PasswordProps) {
  const handleCopyClick = () => {
    // Set copy to true
    setCopyClicked(true);

    // Copies the password to clipboard
    navigator.clipboard.writeText(password);

    // Remove copy text after 3 secs
    setTimeout(() => setCopyClicked(false), 3000);
  };
  return (
    <div className="flex justify-between items-center px-4 md:px-8 py-4 w-full h-[80px] bg-grey-800 font-bold mb-4 md:mb-6">
      <span
        className={`max-h-[42px] overflow-hidden text-ellipsis text-preset-1 before:content-["P4$5W0rD!"] ${
          password !== ""
            ? "text-grey-200 before:content-none"
            : "text-grey-700 "
        }`}
      >
        {password}
      </span>

      <div
        className={`z-5 flex justify-center items-center gap-4 hover-filter-green
          ${copyClicked ? "active-filter-green" : "inactive-filter-white"}`}
      >
        {copyClicked && (
          <span className="pl-2 uppercase text-preset-3 text-green-200">
            Copied
          </span>
        )}
        <Image
          width="21"
          height="24"
          alt="Copy Image"
          src={COPYIMG}
          className={`w-[21px] h-[24px] min-w-[21px] min-h-[24px] cursor-pointer `}
          onClick={handleCopyClick}
        />
      </div>
    </div>
  );
}
