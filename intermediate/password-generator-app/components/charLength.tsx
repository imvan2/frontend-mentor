import { CharLengthProps } from "../lib/definitions";

export default function CharLength({
  charLength,
  setCharLength,
  setProgress,
  maxChar,
  style,
  setStyle,
}: CharLengthProps) {
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

  return (
    <div className="w-full flex flex-col gap-4 mb-2">
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
  );
}
