"use client";

import { useState } from "react";
import Image from "next/image";
import SVGIMG from "../public/images/icon-arrow-right.svg";
import COPYIMG from "../public/images/icon-copy.svg";
import { PwRequirements, PwChecks, Indicators } from "../lib/definitions";
import PasswordOutput from "@/components/passwordOutput";
import CharLength from "@/components/charLength";
import PasswordRequiments from "@/components/passwordRequirements";
import StrengthIndicator from "@/components/strengthIndicator";
import GenerateBtn from "@/components/generateBtn";

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
  const [checkmarkError, setCheckmarkError] = useState<string>("");

  return (
    <div className="w-full max-w-[360px] min-w-[360px] md:min-w-[540px] md:max-w-[540px]">
      {/* Heading */}
      <h1 className="font-bold text-center font-display text-preset-4 text-grey-600 w-full mb-4">
        Password Generator
      </h1>

      <div className={`font-display w-full`}>
        {/* Password Output */}

        <PasswordOutput
          password={password}
          copyClicked={copyClicked}
          setCopyClicked={setCopyClicked}
        />

        <div className="w-full bg-grey-800 p-[16px] flex flex-col gap-[32px]">
          {/* Character length range */}
          <CharLength
            charLength={charLength}
            setCharLength={setCharLength}
            setProgress={setProgress}
            maxChar={maxChar}
            style={style}
            setStyle={setStyle}
          />

          {/* Password Checkmarks */}
          <PasswordRequiments
            setCheckMarks={setCheckMarks}
            setCombinedString={setCombinedString}
            setStrength={setStrength}
            checkmarks={checkmarks}
            combinedString={combinedString}
            strength={strength}
            checkmarkError={checkmarkError}
            setCheckmarkError={setCheckmarkError}
          />

          <div className="flex flex-col gap-4">
            {/* Strength Indicator */}
            <StrengthIndicator strength={strength} />

            {/* Generate Button */}
            <GenerateBtn
              charLength={charLength}
              combinedString={combinedString}
              setPassword={setPassword}
              setCheckmarkError={setCheckmarkError}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
