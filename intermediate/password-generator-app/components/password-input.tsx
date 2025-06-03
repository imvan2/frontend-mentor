"use client";

import Image from "next/image";
import { useState } from "react";
import CopyImg from "../public/images/icon-copy.svg";

export default function PasswordInput() {
  const [password, setPassword] = useState<string>("P4$5W0rD!");
  const [copyClicked, setCopyClicked] = useState<boolean>(false);

  const handleCopyClick = () => {
    console.log("copied");
    // Set copy to true
    setCopyClicked(true);

    // Remove copy text after 3 secs
    setTimeout(() => setCopyClicked(false), 3000);
  };

  return (
    <div className="flex justify-between items-center px-8 py-4 w-full h-[80px] bg-grey-800 font-bold mb-4">
      <span
        className={`text-preset-1 ${
          password !== "P4$5W0rD!" ? "text-grey-200" : "text-grey-700"
        }`}
      >
        {password}
      </span>

      <div
        className={`flex justify-center items-center gap-4 hover-filter-green 
          ${copyClicked ? "active-filter-green" : "inactive-filter-white"}`}
      >
        {copyClicked && (
          <span className="uppercase text-preset-3 text-green-200">Copied</span>
        )}
        <Image
          width="21"
          height="24"
          alt="Copy Image"
          src={CopyImg}
          className="w-[21px] h-[24px] cursor-pointer"
          onClick={handleCopyClick}
        />
      </div>
    </div>
  );
}
