import Image from "next/image";
import SVGIMG from "../public/images/icon-arrow-right.svg";

export default function Button() {
  return (
    <div className="hover-filter-green cursor-pointer flex justify-center items-center gap-4 h-[65px] w-full bg-green-200 text-grey-800 font-bold uppercase hover:bg-grey-800 hover:border hover:border-green-200 hover:text-green-200 hover:filter-green">
      Button
      <Image
        width="11"
        height="12"
        src={SVGIMG}
        alt="Right arrow"
        className="w-[11px] h-[12px]"
      />
    </div>
  );
}
