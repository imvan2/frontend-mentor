"use client";
import { useState } from "react";

const indicators = [
  {
    "Too Weak!": "red-200",
    Weak: "orange-200",
    Medium: "yellow-200",
    Strong: "green-200",
  },
];

interface NumCheckboxes {
  num: number;
}

export default function StrengthIndicator() {
  const [strength, setStrenth] = useState<string>("Too Weak!");
  const [fillColor, setFillColor] = useState<string>("");
  return (
    <section
      className={`flex justify-between items-center w-full h-[72px]
    bg-grey-850 px-[32px] py-[16px] uppercase font-bold`}
    >
      <p className="text-preset-3 text-grey-600">Strength</p>

      <div className="flex">
        <p className="text-grey-200 text-preset-2">{strength}</p>
        <div className="flex justify-between items-center gap-2">
          {indicators.map((indicator, i) => {
            return (
              <div
                key={i}
                className={`border border-white w-[10px] h-[28px] ${
                  indicator ? `bg-${indicator}` : ""
                }`}
              ></div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
