"use client";

import { useState } from "react";

export default function Slider() {
  const maxChar = 20;
  const [char, setChar] = useState(10);
  const [progress, setProgress] = useState((char / maxChar) * 100);
  const [style, setStyle] = useState(
    `linear-gradient(to right, #a4ffaf ${progress}%, #18171F ${progress}%)`
  );

  function progressScript(e: any) {
    setChar(e.target.value);
    setProgress((e.target.value / maxChar) * 100);
    const sliderStyle = `linear-gradient(to right, #a4ffaf ${progress}%, #18171F ${progress}%)`;
    setStyle(sliderStyle);
    return sliderStyle;
  }

  return (
    <div className="w-full px-8 py-6 flex flex-col gap-4">
      <div className="grid grid-cols-[max-content_1fr] items-center">
        <label htmlFor="char-length" className="text-preset-3 text-grey-200">
          Character Length
        </label>
        <div className="text-right text-preset-1 text-green-200">{char}</div>
      </div>
      <input
        type="range"
        id="char-length"
        className="w-full"
        name="char-length"
        min="0"
        style={{ background: style }}
        max="20"
        value={char}
        onChange={(e) => progressScript(e)}
      />
    </div>
  );
}
