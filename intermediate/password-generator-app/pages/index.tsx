"use client";

import { useState } from "react";
import Image from "next/image";
import SVGIMG from "../public/images/icon-arrow-right.svg";
import COPYIMG from "../public/images/icon-copy.svg";
import { PwRequirements, PwChecks, Indicators } from "../lib/definitions";

const checks: string[] = [
  "Uppercase Letters",
  "Lowercase Letters",
  "Numbers",
  "Symbols",
];

const indicators: Indicators = {
  1: { label: "Too Weak!", bg: "bg-red-200", border: "border-red-200" },
  2: { label: "Weak", bg: "bg-orange-200", border: "border-orange-200" },
  3: { label: "Medium", bg: "bg-yellow-200", border: "border-yellow-200" },
  4: { label: "Strong", bg: "bg-green-200", border: "border-green-200" },
};

const pwRequirements: PwRequirements = {
  "Uppercase Letters": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "Lowercase Letters": "abcdefghijklmnopqrstuvwxyz",
  Numbers: "0123456789",
  Symbols: "!@#$%^&*()_+",
};

export default function Home() {
  const maxChar = 20;

  const [charLength, setCharLength] = useState<number>(0);
  const [progress, setProgress] = useState<number>(
    (charLength / maxChar) * 100
  );
  const [password, setPassword] = useState<string>("");
  const [copyClicked, setCopyClicked] = useState<boolean>(false);
  const [strength, setStrength] = useState<number>(0);
  const [checkmarks, setCheckMarks] = useState<PwChecks>({
    "Uppercase Letters": false,
    "Lowercase Letters": false,
    Numbers: false,
    Symbols: false,
  });
  const [style, setStyle] = useState<string>(
    `linear-gradient(to right, #a4ffaf ${progress}%, #18171F ${progress}%)`
  );

  const [combinedString, setCombinedString] = useState<string>("");

  const handleCopyClick = () => {
    // Set copy to true
    setCopyClicked(true);

    // Copies the password to clipboard
    navigator.clipboard.writeText(password);

    // Remove copy text after 3 secs
    setTimeout(() => setCopyClicked(false), 3000);
  };

  // Changes range color depending on the characters selected
  const progressScript = (e: React.ChangeEvent<HTMLInputElement>): string => {
    // Change value to be type number
    const value = Number(e.target.value);

    // Set char length
    setCharLength(value);

    // Find progress of the range
    const newProgress = (value / maxChar) * 100;
    setProgress(newProgress);

    // Set linear gradient depending on progress
    const sliderStyle = `linear-gradient(to right, #a4ffaf ${newProgress}%, #18171F ${newProgress}%)`;
    setStyle(sliderStyle);

    return sliderStyle;
  };

  // Setting password requirements and handling checkboxes
  const handleCheckmarks = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckMarks({ ...checkmarks, [e.target.value]: e.target.checked });

    setCombinedString(
      e.target.checked
        ? combinedString + pwRequirements[e.target.value]
        : combinedString.replace(pwRequirements[e.target.value], "")
    );
    setStrength(e.target.checked ? strength + 1 : strength - 1);
  };

  // Generate password based on requirements
  const generatePassword = (): string => {
    let pw = "";

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
    <div className="w-full max-w-[360px] min-w-[360px] md:min-w-[540px] md:max-w-[540px]">
      {/* Heading */}
      <h1 className="font-bold text-center font-display text-preset-4 text-grey-600 w-full mb-4">
        Password Generator
      </h1>

      <div className={`font-display w-full`}>
        {/* Password Output */}
        <div className="flex justify-between items-center px-8 py-4 w-full h-[80px] bg-grey-800 font-bold mb-4">
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

        <div className="w-full bg-grey-800 p-[16px] flex flex-col gap-[32px]">
          {/* Character length range */}
          <div className="w-full flex flex-col gap-4">
            <div className="grid grid-cols-[max-content_1fr] items-center">
              <label
                htmlFor="char-length"
                className="text-preset-3 text-grey-200 font-bold"
              >
                Character Length
              </label>
              <div className="text-right text-preset-1 text-green-200">
                {charLength}
              </div>
            </div>
            <input
              type="range"
              id="char-length"
              className="w-full"
              name="char-length"
              min="0"
              style={{ background: style }}
              max="20"
              value={charLength}
              onChange={(e) => progressScript(e)}
            />
          </div>

          {/* Password Checkmarks */}
          <div className="w-full flex flex-col gap-4 text-grey-200">
            {checks.map((check, key) => {
              return (
                <div
                  key={key}
                  className="flex flex-row gap-[20px] items-center"
                >
                  <input
                    value={check}
                    id={check}
                    name={check}
                    type="checkbox"
                    className="w-[20px] h-[20px] accent-green-200 cursor-pointer hover:border-2 hover:border-green-200"
                    onChange={(e) => handleCheckmarks(e)}
                  />
                  <label
                    htmlFor={check}
                    className="text-preset-4 font-bold cursor-pointer"
                  >
                    Include {check}
                  </label>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-4">
            {/* Strength Indicator */}
            <div
              className={` min-h-[64px] p-4 flex justify-between items-center w-full bg-grey-850 uppercase font-bold`}
            >
              <p className="text-preset-3 text-grey-600">Strength</p>

              <div className="flex min-h-[28px]">
                <p className="text-grey-200 text-preset-2 mr-2 font-normal">
                  {strength === 0
                    ? ""
                    : indicators[strength as keyof Indicators].label}
                </p>
                <div className="flex justify-between items-center gap-2">
                  {Object.entries(indicators).map(([key, value]) => (
                    <div
                      key={key}
                      className={`border-2 w-[10px] h-[28px] ${
                        Number(key) <= strength
                          ? `${indicators[strength as keyof Indicators].bg} ${
                              indicators[strength as keyof Indicators].border
                            }`
                          : "border-white"
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Generate Button */}
            {/* TODO: fix clicked button styles */}
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
          </div>
        </div>
      </div>
    </div>
  );
}
